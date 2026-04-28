# 🔥 Resume Roaster — AI-Powered Resume Feedback

> Get your resume brutally honest feedback from AI. Section scores, targeted roasts, and instant rewrites — tailored to any job description.

![Resume Roaster Demo](https://via.placeholder.com/900x500/0f0e0d/faf9f7?text=Resume+Roaster+Demo)

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

## 📁 Project Structure

```
resume-roaster/
├── client/                     # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadZone.jsx  # PDF upload + paste toggle
│   │   │   ├── RoastCard.jsx   # Per-section feedback card
│   │   │   ├── ScoreRing.jsx   # Animated circular score
│   │   │   └── RewritePanel.jsx # Strengths, fixes, keywords
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Upload form page
│   │   │   └── Results.jsx     # Full roast results page
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── server/                     # FastAPI backend
│   ├── main.py                 # API routes
│   ├── roaster.py              # Gemini AI logic
│   ├── parser.py               # PDF text extraction
│   ├── requirements.txt
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- A free [Google Gemini API key](https://aistudio.google.com/app/apikey)

---

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/resume-roaster.git
cd resume-roaster
```

---

### 2. Backend Setup

```bash
cd server

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
```

Open `server/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend runs at → `http://localhost:8000`

Test it: open `http://localhost:8000/health` — should return `{"status": "ok"}`

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

For local dev, `VITE_API_URL` can stay empty — Vite proxies `/api` to `localhost:8000` automatically.

Start the frontend:

```bash
npm run dev
```

Frontend runs at → `http://localhost:5173`

---

## 🌐 Deployment (Free)

### Backend → Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your repo, set **Root Directory** to `server`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variable: `GEMINI_API_KEY=your_key`
7. Deploy — copy the URL (e.g. `https://resume-roaster-api.onrender.com`)

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo, set **Root Directory** to `client`
3. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com`
4. Deploy

**Important:** Update `allow_origins` in `server/main.py` to include your Vercel URL.

---

## 🔑 Getting a Free Gemini API Key

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy it into your `server/.env` file

**Free tier limits:** 1,500 requests/day, 1 million tokens/minute — more than enough.

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

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Built by

Built with ❤️ and Gemini AI.  
If this helped you, give it a ⭐ on GitHub!
