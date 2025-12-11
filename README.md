# HG Partners - Commercial Marketing Platform Demo

Interactive demo showing the first-time user journey through the Commercial Marketing Platform.

## Quick Deploy to Vercel

### Option 1: Direct from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   cd hg-platform-demo
   git init
   git add .
   git commit -m "Initial commit: Platform demo"
   gh repo create hg-platform-demo --public --push
   ```
   
   Or create repo manually at github.com, then:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hg-platform-demo.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repo
   - Vercel auto-detects Vite — just click Deploy
   - Done! You'll get a URL like `hg-platform-demo.vercel.app`

### Option 2: Vercel CLI

```bash
npm install -g vercel
cd hg-platform-demo
vercel
```

Follow the prompts. Takes about 60 seconds.

## Local Development

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## What's in the Demo

The demo walks through "Jordan" — a Sr. Product Marketing Manager at a $15M SaaS company — experiencing the platform for the first time:

1. **Pre-populated diagnosis** from observable website data
2. **Real-time score refinement** as Jordan answers questions
3. **Prioritized action plan** based on diagnosed gaps
4. **Value Story workstream** — AI-guided step-by-step
5. **ROI Calculator generation** from Jordan's inputs
6. **Expert escalation** when Jordan gets stuck
7. **Updated dashboard** showing progress and new priorities

## Tech Stack

- React 18
- Vite
- Tailwind CSS

## Customization

The demo component is in `src/PlatformDemo.jsx`. Key things you might want to customize:

- Company name (TechFlow Solutions → your demo company)
- Score values and thresholds
- Workstream content
- Color scheme (currently using Indigo as primary)
