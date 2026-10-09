import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Brain,
  BookOpen,
  Check,
  Copy,
  Lightbulb,
  MessageCircle,
  RefreshCw,
  Send,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const starterMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I’m Cogniva. What are you working through today? I can help break a topic into simpler steps, shape a revision plan, or give you a few questions to try.",
  },
];

const quickPrompts = [
  {
    icon: Brain,
    title: "Explain a concept",
    prompt: "Explain virtual memory in simple words with an example.",
  },
  {
    icon: BookOpen,
    title: "Make notes",
    prompt: "Make short exam-friendly notes on CPU scheduling.",
  },
  {
    icon: Lightbulb,
    title: "Practice questions",
    prompt: "Give me 5 important questions for my upcoming exam.",
  },
  {
    icon: Sparkles,
    title: "Study advice",
    prompt: "Give me a focused study plan for today.",
  },
];

function AIAssistant() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [teachTopic, setTeachTopic] = useState("");
  const [teachExplanation, setTeachExplanation] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("cogniva_ai_chat");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch {
        localStorage.removeItem("cogniva_ai_chat");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cogniva_ai_chat", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message = input) => {
    const cleanMessage = message.trim();

    if (!cleanMessage || isTyping) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: cleanMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const conversation = [...messages, userMessage]
        .filter((item) => ["user", "assistant"].includes(item.role))
        .slice(-24)
        .map(({ role, text }) => ({ role, content: text }));
      const apiResponse = await fetch(`${API_BASE_URL}/api/groq/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      const responseText = await apiResponse.text();
      let result = {};
      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            `The chat server returned an unreadable response (HTTP ${apiResponse.status}). Check that the Groq API server is running, then try again.`
          );
        }
      }
      if (!apiResponse.ok) {
        throw new Error(result.error || `The chat server returned HTTP ${apiResponse.status}. Check the API server terminal for details.`);
      }
      if (typeof result.answer !== "string" || !result.answer.trim()) {
        throw new Error(
          "The chat server returned an empty answer. Check the API server terminal and confirm its .env file has your Groq key."
        );
      }
      const response = {
        id: Date.now() + 1,
        role: "assistant",
        text: result.answer,
      };

      setMessages((current) => [...current, response]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: error.message || "I couldn’t reach Groq. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const reviewTeachBack = (event) => {
    event.preventDefault();
    const topic = teachTopic.trim();
    const explanation = teachExplanation.trim();
    if (!topic || !explanation || isTyping) return;
    sendMessage(`TEACH-IT-BACK REVIEW\nTopic: ${topic}\nMy explanation: ${explanation}\n\nPlease respond warmly and specifically: first say what I understood correctly, then identify any important gap or misconception, then give one small question that would help me check my understanding. If my explanation is already accurate, say so clearly. Do not rewrite it into a long lecture.`);
    setTeachTopic("");
    setTeachExplanation("");
  };

  const clearChat = () => {
    setMessages(starterMessages);
    localStorage.removeItem("cogniva_ai_chat");
  };

  const copyMessage = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch {
      // Clipboard may not be available in some browsers.
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="page-container ai-assistant-page">
          {/* HEADER */}
          <div className="page-header">
            <div>
              <Link to="/dashboard" className="back-link">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>

              <div className="page-title-row">
                <div className="page-icon ai-icon">
                  <Bot size={25} />
                </div>

                <div>
                  <h1>AI Study Assistant</h1>
                  <p>Your Groq-powered study companion for explanations, revision, practice, and study advice.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="secondary-btn"
              onClick={clearChat}
            >
              <Trash2 size={17} />
              Clear Chat
            </button>
          </div>

          <div className="assistant-layout">
            {/* CHAT */}
            <section className="glass assistant-chat-card">
              <div className="assistant-chat-header">
                <div className="assistant-profile">
                  <div className="assistant-avatar">
                    <Bot size={21} />
                  </div>

                  <div>
                    <strong>Cogniva AI</strong>
                    <span>
                      <span className="online-dot" />
                      Study assistant
                    </span>
                  </div>
                </div>

                <div className="assistant-status">
                  <Sparkles size={15} />
                  Groq · Study mode
                </div>
              </div>

              <div className="assistant-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`assistant-message-row ${
                      message.role === "user" ? "user-row" : "ai-row"
                    }`}
                  >
                    <div
                      className={`assistant-message-avatar ${
                        message.role === "user"
                          ? "user-avatar"
                          : "ai-message-avatar"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>

                    <div className="assistant-message-content">
                      <div className="assistant-message-bubble">
                        {message.text.split("\n").map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < message.text.split("\n").length - 1 && (
                              <br />
                            )}
                          </span>
                        ))}
                      </div>

                      {message.role === "assistant" && (
                        <button
                          type="button"
                          className="copy-message-btn"
                          onClick={() =>
                            copyMessage(message.id, message.text)
                          }
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check size={13} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              Copy
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="assistant-message-row ai-row">
                    <div className="assistant-message-avatar ai-message-avatar">
                      <Bot size={16} />
                    </div>

                    <div className="assistant-message-content">
                      <div className="assistant-message-bubble typing-bubble">
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form
                className="assistant-input-area"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask Cogniva AI anything about your studies..."
                  disabled={isTyping}
                />

                <button
                  type="submit"
                  className="assistant-send-btn"
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                >
                  <Send size={19} />
                </button>
              </form>

              <p className="assistant-disclaimer">
                <Sparkles size={13} />
                Answers are generated by Groq. Check important academic guidance against your course materials.
              </p>
            </section>

            {/* SIDEBAR */}
            <aside className="assistant-tools">
              <div className="glass quick-prompts-card">
                <div className="assistant-section-title">
                  <div>
                    <span className="eyebrow">
                      <MessageCircle size={14} />
                      Quick Prompts
                    </span>

                    <h2>What can I help with?</h2>
                  </div>
                </div>

                <div className="quick-prompts-list">
                  {quickPrompts.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.title}
                        className="quick-prompt"
                        onClick={() => sendMessage(item.prompt)}
                        disabled={isTyping}
                      >
                        <div className="quick-prompt-icon">
                          <Icon size={18} />
                        </div>

                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.prompt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="glass assistant-capabilities">
                <div className="assistant-section-title">
                  <div className="capability-title-icon">
                    <Sparkles size={17} />
                  </div>

                  <div>
                    <h3>Cogniva can help you</h3>
                  </div>
                </div>

                <ul>
                  <li>
                    <Check size={15} />
                    Understand difficult concepts
                  </li>

                  <li>
                    <Check size={15} />
                    Create exam-friendly notes
                  </li>

                  <li>
                    <Check size={15} />
                    Generate practice questions
                  </li>

                  <li>
                    <Check size={15} />
                    Explain programming code
                  </li>

                  <li>
                    <Check size={15} />
                    Build revision strategies
                  </li>

                  <li>
                    <Check size={15} />
                    Give study productivity tips
                  </li>
                </ul>
              </div>

              <form className="glass teachback-card" onSubmit={reviewTeachBack}>
                <span className="eyebrow"><Brain size={13} /> TEACH IT BACK</span>
                <h3>Put it in your own words.</h3>
                <p>Explain a topic from memory. Cogniva will reflect what you understood and what to revisit.</p>
                <label className="teachback-field">
                  <span>Topic</span>
                  <input value={teachTopic} onChange={(event) => setTeachTopic(event.target.value)} maxLength={100} placeholder="e.g. Virtual memory" />
                </label>
                <label className="teachback-field">
                  <span>Your explanation</span>
                  <textarea value={teachExplanation} onChange={(event) => setTeachExplanation(event.target.value)} maxLength={1200} placeholder="Explain it as if you were teaching a friend…" rows={4} />
                </label>
                <button className="primary-btn teachback-submit" type="submit" disabled={isTyping || !teachTopic.trim() || !teachExplanation.trim()}>
                  <Sparkles size={15} /> Review my explanation
                </button>
              </form>

              <div className="glass assistant-planner-link">
                <div className="planner-link-icon">
                  <RefreshCw size={19} />
                </div>

                <div>
                  <strong>Need a full schedule?</strong>
                  <p>
                    Let Cogniva create a personalized study plan.
                  </p>

                  <Link to="/ai-planner">
                    Open AI Planner →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AIAssistant;
