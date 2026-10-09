import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadLocalEnv() {
  try {
    const contents = readFileSync(resolve(projectRoot, ".env"), "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || process.env[match[1]]) continue;
      const value = match[2].replace(/^(["'])(.*)\1$/, "$2");
      process.env[match[1]] = value;
    }
  } catch {
    // Environment variables can also be supplied by the hosting environment.
  }
}

loadLocalEnv();

const port = Number(process.env.PORT || 8787);
const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const requestCounts = new Map();
const MAX_BODY_BYTES = 24_000;
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 60_000;

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(payload));
}

function isRateLimited(ip) {
  const now = Date.now();
  for (const [address, entry] of requestCounts) {
    if (now - entry.startedAt >= RATE_WINDOW_MS) requestCounts.delete(address);
  }
  const entry = requestCounts.get(ip);
  if (!entry || now - entry.startedAt >= RATE_WINDOW_MS) {
    requestCounts.set(ip, { startedAt: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("BODY_TOO_LARGE");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = createServer(async (request, response) => {
  const isChatRequest = request.method === "POST" && request.url === "/api/groq/chat";
  const isFlashcardRequest = request.method === "POST" && request.url === "/api/groq/flashcards";
  if (!isChatRequest && !isFlashcardRequest) {
    sendJson(response, 404, { error: "Not found." });
    return;
  }

  const ip = request.socket.remoteAddress || "local";
  if (isRateLimited(ip)) {
    sendJson(response, 429, { error: "Too many messages. Please wait a minute and try again." });
    return;
  }

  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "add_your_groq_api_key_here") {
    sendJson(response, 503, { error: "Add your Groq API key to the project’s .env file, then restart the API server." });
    return;
  }

  try {
    const body = await readJson(request);
    if (isFlashcardRequest) {
      const { subject, topic, kind = "mixed", count = 8 } = body || {};
      const cardCount = Number(count);
      if (
        typeof subject !== "string" || !subject.trim() || subject.length > 100 ||
        typeof topic !== "string" || !topic.trim() || topic.length > 180 ||
        !["definitions", "formulas", "mixed"].includes(kind) ||
        !Number.isInteger(cardCount) || cardCount < 3 || cardCount > 12
      ) {
        sendJson(response, 400, { error: "Choose a subject, enter a topic, and select 3–12 cards." });
        return;
      }

      const flashcardResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          temperature: 0.45,
          max_completion_tokens: 2600,
          messages: [
            {
              role: "system",
              content: "Create accurate study flashcards. Return only a JSON object with a cards array. Each array item must have exactly two string fields: front (a concise question, term, or formula prompt) and back (a concise answer, definition, or formula with a brief explanation). Do not use markdown fences. Stay within the requested subject and topic. Never invent a formula if unsure; use a conceptual card instead.",
            },
            {
              role: "user",
              content: `Create exactly ${cardCount} ${kind} flashcards for the subject “${subject.trim()}” and topic “${topic.trim()}”. For formulas, put a recall prompt on the front and the correctly formatted formula with variable meanings on the back. For definitions, put the term or a clear question on the front and a concise accurate definition on the back. For mixed, combine useful definitions and formulas when appropriate. Return JSON shaped like {"cards":[{"front":"...","back":"..."}]}.`,
            },
          ],
        }),
        signal: AbortSignal.timeout(45_000),
      });

      const flashcardResult = await flashcardResponse.json().catch(() => ({}));
      if (!flashcardResponse.ok) {
        console.error("Groq flashcard request failed:", flashcardResponse.status, flashcardResult?.error?.message || "unknown error");
        sendJson(response, 502, { error: "Groq could not generate these cards. Check your API key and model, then try again." });
        return;
      }

      const generatedText = flashcardResult?.choices?.[0]?.message?.content?.trim() || "";
      let generated;
      try {
        generated = JSON.parse(generatedText.replace(/^```(?:json)?\s*|\s*```$/g, ""));
      } catch {
        sendJson(response, 502, { error: "The AI returned cards in an unreadable format. Please try again." });
        return;
      }

      const cards = Array.isArray(generated?.cards)
        ? generated.cards
            .filter((card) => typeof card?.front === "string" && typeof card?.back === "string")
            .slice(0, cardCount)
            .map((card) => ({ front: card.front.trim().slice(0, 500), back: card.back.trim().slice(0, 1200) }))
            .filter((card) => card.front && card.back)
        : [];
      if (cards.length < 1) {
        sendJson(response, 502, { error: "The AI did not return usable flashcards. Please try another topic." });
        return;
      }
      sendJson(response, 200, { cards });
      return;
    }

    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 24) {
      sendJson(response, 400, { error: "Send between 1 and 24 chat messages." });
      return;
    }

    const safeMessages = messages.map((message) => {
      if (!message || !["user", "assistant"].includes(message.role) || typeof message.content !== "string") {
        throw new Error("INVALID_MESSAGE");
      }
      const content = message.content.trim();
      if (!content || content.length > 5_000) throw new Error("INVALID_MESSAGE");
      return { role: message.role, content };
    });

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.65,
        max_completion_tokens: 1200,
        messages: [
          {
            role: "system",
            content: "You are Cogniva, a thoughtful and encouraging study tutor. Explain ideas clearly, use examples, and format longer answers with short headings or steps. Help students learn rather than simply doing assessed work for them. If a question is ambiguous, ask one concise clarifying question. Be honest when you are unsure.",
          },
          ...safeMessages,
        ],
      }),
      signal: AbortSignal.timeout(45_000),
    });

    const result = await groqResponse.json().catch(() => ({}));
    if (!groqResponse.ok) {
      console.error("Groq API request failed:", groqResponse.status, result?.error?.message || "unknown error");
      sendJson(response, 502, { error: "Groq could not answer right now. Check your API key and model setting, then try again." });
      return;
    }

    const answer = result?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      sendJson(response, 502, { error: "Groq returned an empty answer. Please try again." });
      return;
    }
    sendJson(response, 200, { answer });
  } catch (error) {
    if (error.message === "BODY_TOO_LARGE") {
      sendJson(response, 413, { error: "That conversation is too long. Clear the chat and try again." });
    } else if (error.message === "INVALID_MESSAGE") {
      sendJson(response, 400, { error: "One of the chat messages is invalid or too long." });
    } else if (error instanceof SyntaxError) {
      sendJson(response, 400, { error: "The chat request was not valid JSON." });
    } else {
      console.error("Chat API error:", error.message);
      sendJson(response, 502, { error: "I couldn’t reach Groq. Check that the API server is running, then try again." });
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Cogniva Groq API listening on http://127.0.0.1:${port}`);
});
