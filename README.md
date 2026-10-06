# Cogniva

## Run the app with Groq

The chat API runs locally and keeps `GROQ_API_KEY` on the server. Do not add the key to a `VITE_` variable or commit your `.env` file.

1. Install dependencies with `npm install`.
2. Create a Groq API key in the [Groq console](https://console.groq.com/keys).
3. Copy `.env.example` to `.env` and replace the example value with your key.
4. In one terminal, start the API: `npm run server`.
5. In a second terminal, start the website: `npm run dev`.
6. Open the local URL printed by Vite and visit **AI Assistant** after signing in.

The API uses Groq's OpenAI-compatible Chat Completions endpoint and defaults to `llama-3.3-70b-versatile`. You can set `GROQ_MODEL` in `.env` to another supported model.

For production, deploy the API behind a server-side `/api/groq/chat` route with authentication, request limits, and the Groq key configured as a server secret. The included API binds to localhost for development.
