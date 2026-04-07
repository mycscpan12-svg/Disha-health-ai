# 🌿 Disha — AI Health Coach

A full-featured AI health coach web app built for Indian users. Works as a PWA (Progressive Web App) on iPhone and Android — feels like a native app. Powered by Claude AI.

---

## ✨ Features

- **AI Chat** — Ask Disha anything about health, diet, yoga, fitness (powered by Claude)
- **Onboarding** — Personalised profile with BMI, goal, health conditions
- **Health Log** — Track water, steps, sleep, weight, BP, blood sugar, mood, notes
- **Dashboard** — Daily stats at a glance
- **Google Sheets Sync** — Auto-sync every log entry to your Google Sheet
- **PWA** — Install on iPhone or Android home screen, works offline
- **100% Private** — All data stored on your device (localStorage)

---

## 🚀 Quick Start (5 minutes)

### Step 1 — Get your OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up / log in → click **Create new secret key**
3. Copy the key (starts with `sk-...`)

### Step 2 — Set up the project

```bash
# Unzip the project
unzip disha-health-coach.zip
cd disha-health-coach

# Copy environment file
cp .env.example .env

# Open .env and paste your API key
# REACT_APP_OPENAI_API_KEY=sk-your-key-here

# Install dependencies
npm install

# Run locally
npm start
```

Open [http://localhost:3000](http://localhost:3000) — Disha is running!

---

## 📤 Deploy to Vercel (Free)

### Option A — Via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Disha app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/disha-health-coach.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [https://vercel.com](https://vercel.com) → **Add New Project**
   - Import your GitHub repo
   - Click **Environment Variables** → Add:
     - `REACT_APP_OPENAI_API_KEY` = your OpenAI API key
     - `REACT_APP_SHEETDB_URL` = your SheetDB URL (optional)
   - Click **Deploy** → Done!

3. **Your app is live** at `https://disha-health-coach.vercel.app`

### Option B — Via Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts, then set env vars in Vercel dashboard
```

---

## 📱 Install on iPhone (PWA)

1. Open your Vercel URL in **Safari** on iPhone
2. Tap the **Share** button (box with arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add** → Disha appears on your home screen!

It will work like a native app with full-screen mode.

---

## 📱 Android App (TWA — Trusted Web Activity)

To publish as a real Android APK on Google Play:

### Option A — Bubblewrap (Recommended)

```bash
# Install Bubblewrap
npm install -g @bubblewrap/cli

# Initialize (use your Vercel URL)
bubblewrap init --manifest https://your-app.vercel.app/manifest.json

# Build APK
bubblewrap build
```

This generates an APK you can install or publish to Google Play.

### Option B — PWABuilder (Easiest)

1. Go to [https://www.pwabuilder.com](https://www.pwabuilder.com)
2. Enter your Vercel URL
3. Click **Package for Android** → Download APK
4. Install on any Android device via ADB or share the APK file

---

## 📊 Google Sheets Sync Setup

### Step 1 — Create your Google Sheet

Create a Google Sheet with these exact column headers in Row 1:
```
Date | Time | Type | Value | Unit | Notes
```

### Step 2 — Connect via SheetDB

1. Go to [https://sheetdb.io](https://sheetdb.io) → Sign up (free)
2. Click **Create API** → paste your Google Sheet URL
3. Copy the API URL (looks like `https://sheetdb.io/api/v1/abc123`)

### Step 3 — Add to your .env

```bash
REACT_APP_SHEETDB_URL=https://sheetdb.io/api/v1/abc123
```

Redeploy on Vercel (add the env variable in Vercel dashboard → Redeploy).

Every health log entry will now automatically sync to your Google Sheet in real time!

---

## 📁 Project Structure

```
disha-health-coach/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── App.js              # Complete app (all screens in one file)
│   └── index.js            # React entry point
├── .env.example            # Environment variable template
├── .gitignore              # Excludes .env and node_modules
├── package.json            # Dependencies
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

---

## 🔒 Security Notes

- **NEVER commit your `.env` file** — it is in `.gitignore` for safety
- **Add env variables in Vercel Dashboard**, not in code
- The Anthropic API key is used client-side — this is okay for personal/family apps
- For a public app with many users, build a backend proxy (Node.js/Express)

---

## 🛠 Customisation

### Change the AI personality
Edit the `buildSystem()` function in `src/App.js` to change Disha's name, language, or specialty.

### Add more log types
Add entries to the `LOG_TYPES` array in `src/App.js`.

### Change language
The app is in English. To add Hindi support, modify the system prompt and UI strings.

### Change colours
Edit the `:root` CSS variables at the top of `src/App.js`.

---

## 📞 Support

If you face any issues:
1. Check that your `.env` file has the correct API key
2. Make sure `REACT_APP_` prefix is on all env variables
3. Run `npm install` if you see module errors
4. Check browser console (F12) for error messages

---

*Built with React • Claude AI • Deployed on Vercel*
