# 🔥 Resume Roaster — AI-Powered Resume Feedback

> Get your resume brutally honest feedback from AI. Section scores, targeted roasts, and instant rewrites — tailored to any job description.


---

## ✨ Features

- 📄 **Upload PDF or paste text** — flexible resume input
- 🎯 **Job Description matching** — tailored analysis for each role
- 🔥 **Brutal honest feedback** — no sugarcoating, just truth
- 📊 **Section scores** — Summary, Skills, Experience, Format & ATS
- ✍️ **Instant AI rewrites** — improved versions you can copy directly
- 🔑 **Missing keywords** — exactly what's missing from the JD
- 💪 **Strengths & critical fixes** — know what to keep and what to fix

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TailwindCSS + Framer Motion |
| Backend | FastAPI + Python 3.11 |
| AI | Google Gemini 1.5 Flash (free tier) |
| PDF Parsing | PyMuPDF |
| Deploy (Frontend) | Vercel (free) |
| Deploy (Backend) | Render (free) |

---

### Prerequisites
- Node.js 18+
- Python 3.11+
- A free [Google Gemini API key]

---

## 🧠 How It Works

```
User uploads resume (PDF or text)
        +
User pastes Job Description
        ↓
FastAPI receives the request
        ↓
PyMuPDF extracts text from PDF (if uploaded)
        ↓
Prompt is crafted with resume + JD context
        ↓
Gemini 1.5 Flash analyzes and returns structured JSON
        ↓
React frontend renders scores, roasts, and rewrites
```

---

## 🤝 Contributing

PRs welcome! If you find a bug or want to add a feature, open an issue first.



## 👨‍💻 Built by

Built with ❤️ By Madan Y [madanmadany2004@gmail.com].  
If this helped you, give it a ⭐ on GitHub!
