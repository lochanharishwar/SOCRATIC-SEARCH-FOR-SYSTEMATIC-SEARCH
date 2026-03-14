# 🔍 Socratic Search — A Systematic Search Intelligence Tool

> *"The unexamined query is not worth searching."*

A **personalized intelligence agency** that puts inquiry before information. Instead of dumping raw search results at you, Socratic Search first learns *who you are* — your background, learning style, and intent — through a series of Socratic questions. Then it deploys **Gemini 2.5 Pro** with live web data to synthesize a bespoke, cinematic **Discovery Brief** built specifically for you.

---

## ✨ What Makes This Different

Most search tools answer **what** you asked. Socratic Search answers **what you actually need**.

| Traditional Search | Socratic Search |
|---|---|
| Returns a list of links | Returns a curated Discovery Brief |
| Same results for everyone | Tailored to your learning profile |
| You filter the noise | AI filters the noise for you |
| Query in → results out | Dialogue in → insight out |
YOU MODIFY AS YOU ANT IT ACCORDING TO YOUR FIELD 

---

## 🧠 How It Works

```
You → Socratic Dialogue → Your Profile Mapped
                                    ↓
              Gemini 2.5 Pro + Live Web Data
                                    ↓
              Personalized "Discovery Brief"
              (Formatted to your learning style)
```

1. **Profile Mapping** — The app opens a Socratic dialogue to understand your expertise level, goals, and preferred way of receiving information.
2. **Intelligent Retrieval** — Gemini 2.5 Pro searches the live web with your profile as context.
3. **Discovery Brief** — Results are synthesized into a structured, narrative-driven brief tailored to you — not a generic user.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript (Vite)
- **AI Model:** Google Gemini 2.5 Pro (via Gemini API)
- **Styling:** CSS / Tailwind
- **Build Tool:** Vite
- **Language split:** ~86% TypeScript, ~14% HTML

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A **Gemini API Key** — get one free at [Google AI Studio](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/lochanharishwar/SOCRATIC-SEARCH-FOR-SYSTEMATIC-SEARCH.git

# 2. Navigate into the project
cd SOCRATIC-SEARCH-FOR-SYSTEMATIC-SEARCH

# 3. Install dependencies
npm install
```

### Configuration

Open `.env.local` and set your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

> 💡 **Tip:** If your API key runs out of quota, simply generate a new one at [Google AI Studio](https://aistudio.google.com/apikey) — it's free.

### Running the App

```bash
npm run dev
```

Then open your browser at `http://localhost:5173`.

> 🖥️ **Best experienced in fullscreen mode** for the smoothest search and reading experience.

---

## 🌐 Live Demo

Try it directly in Google AI Studio:
👉 [Open in AI Studio](https://ai.studio/apps/drive/1Lv4BQMfnGRfs70-XMWqjWgajDDJ0EYU6)

---

## 📁 Project Structure

```
SOCRATIC-SEARCH-FOR-SYSTEMATIC-SEARCH/
├── App.tsx            # Main application component
├── index.tsx          # App entry point
├── index.html         # HTML shell
├── types.ts           # TypeScript type definitions
├── metadata.json      # App metadata
├── package.json       # Dependencies & scripts
├── tsconfig.json      # TypeScript config
├── vite.config.ts     # Vite build config
└── .env.local         # Environment variables (API keys)
```

---

## 💡 Tips for Best Results

- **Go fullscreen** — the UI is designed for a cinematic, immersive experience.
- **Answer the Socratic questions honestly** — the more context you give, the sharper your Discovery Brief.
- **Be specific about your expertise level** — it changes how information is presented to you dramatically.
- **If you hit API quota limits**, generate a new free API key from Google AI Studio.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open an [issue](https://github.com/lochanharishwar/SOCRATIC-SEARCH-FOR-SYSTEMATIC-SEARCH/issues) for bugs or feature requests
- Fork the repo and submit a pull request
- Star ⭐ the project if you find it useful

---

## 📜 License

This project is open source. Check the repository for license details.

---

## 👤 Author

**Lochan Harishwar**
- GitHub: [@lochanharishwar](https://github.com/lochanharishwar)

---

*Built with curiosity. Powered by questions. Delivered as insight.*
