# Cogniva

**A calmer, more intentional space to study.** Cogniva brings your study plans, tasks, exams, and focus sessions together in one elegant workspace.

## What you can do

- **Plan your day** with a study dashboard, tasks, and a calendar.
- **Track subjects** and preparation progress for upcoming exams.
- **Focus with Pomodoro** sessions, breaks, and session goals.
- **Review your habits** with study analytics and progress summaries.
- **Build a study routine** with the AI Study Planner.
- **Ask for help** with the Groq-powered AI Study Assistant.

## Built with

- React and Vite
- React Router
- Recharts
- Lucide React
- Node.js for the local Groq API server
- Groq Chat Completions API

## Run Cogniva locally

### 1. Get the code and install packages

```bash
git clone https://github.com/aairahparvaiz78-hub/COGNIVA.git
cd COGNIVA
npm install
```

You need Node.js and npm installed.

### 2. Add your Groq API key

Create a key in the [Groq Console](https://console.groq.com/keys). Copy `.env.example` to a new file named `.env` in the project root (the same folder as `package.json`).

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS, Linux, or Git Bash:

```bash
cp .env.example .env
```

Open `.env` and fill it in like this:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
PORT=8787
```

Keep the API key private. Do not put it in a `VITE_` variable, paste it into a screenshot, or commit `.env` to GitHub. The `.gitignore` file excludes `.env`.

### 3. Start the API server

Open a terminal in the project folder and run:

```bash
npm run server
```

Leave this terminal running. It should report that the Cogniva Groq API is listening on `http://127.0.0.1:8787`.

### 4. Start the website

Open a second terminal in the same project folder and run:

```bash
npm run dev
```

Open the local address Vite prints in the terminal. It is usually `http://localhost:5173/`; if that port is busy, Vite may choose another one, such as `5174`.

Sign in and open **AI Assistant** to try the Groq connection. Keep both terminals running while using the local app. If you edit `.env`, restart the API server.

## Useful commands

```bash
npm run dev       # Start the Vite development website
npm run server    # Start the local Groq API server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

## Notes

- The included API server is for local development and listens on `127.0.0.1`. A deployed website needs a separately hosted server-side API route and a securely configured API key.
- Login and signup in this project are a lightweight browser-storage demo, not production authentication. User data is stored in the browser and does not sync between devices.
- Never publish API keys or other secrets. If a key is exposed, revoke it in the Groq Console and create a replacement.

## License

No license has been added yet. Add a `LICENSE` file before allowing others to reuse or redistribute the project.

