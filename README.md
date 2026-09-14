# 🌸 Kreo — Official Web Platform & Dashboard

<div align="center">

![Kreo Web Banner](public/banner.webp)

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Discord](https://img.shields.io/badge/Discord.js-v14-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**A high-fidelity, ultra-modern dark aesthetic web platform and documentation portal engineered for the [Kreo Discord Music Bot](https://github.com/MohsinAli088/Kreo).**

[Live Website Demo](https://kreo-website.vercel.app) • [Add Kreo to Discord](https://discord.com/oauth2/authorize?client_id=1533705359938682941&permissions=8&integration_type=0&scope=bot+applications.commands) • [Support Server](https://discord.gg/9wRBcsfK9Z)

</div>

---

## 🌟 Overview

The **Kreo Web Platform** provides communities with a sleek, cyber-glassmorphic destination to explore Kreo's studio-grade lossless audio features, browse all 54+ commands, check real-time cluster telemetry, and manage premium tiers.

Built with **React 18**, **Vite 6**, and **Lucide Icons**, this project is fully optimized for speed, responsive design, and seamless deployment on **Vercel**, **Netlify**, or any static web host.

---

## ✨ Features

- 🎧 **Interactive Music Player Mockup**: Simulated real-time waveform progress bar, lossless audio badge, interactive play/pause, loop, like, and skip controls.
- ⚡ **Multi-Tier Live & Static Telemetry Engine**:
  - Automatically fetches real-time bot statistics (Global Users, Servers, Ping, Uptime, Audio Clusters, Active Players).
  - Multi-tier resilient fallback cascade ensures the website **never displays 0 or broken counters** even if the bot is offline or redeploying.
- 🎰 **Rolling Slot-Machine Number Counters**: Smooth, cascading vertical rolling digit animations when metrics update.
- 🔍 **Interactive Command Explorer**: Instant category filters (`Config`, `Music`, `Utility`, `Information`, `Favourite`) and real-time search across 54+ bot commands.
- 💎 **Interactive Premium Showcase**: Tier switcher (`Basic`, `Pro`, `Lifetime`) with customizable duration selectors and direct checkout navigation.
- 👥 **Discord-Synced Team Cards**: Lead developer cards with custom glow accents, Discord avatar decorations, and live status dots.
- 📱 **Mobile-First Responsive Layout**: Smooth slide-in mobile navigation drawer, fluid typography, and glassmorphic modal popups.
- 🚀 **Serverless Edge Ready**: Bundled with high-performance Vercel serverless functions with CDN edge caching (`s-maxage=30`).

---

## 📡 Live & Static Telemetry Architecture

The website features an automated, fail-safe 4-tier telemetry resolution pipeline:

```text
┌─────────────────────────────────────────────────────────┐
│                    Kreo Frontend UI                     │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   [Tier 1: Bot HTTP API]          [Tier 2: Vercel Serverless]
   Direct VPS/Docker REST & SSE    /api/stats (Discord REST / Mongo)
            │                                 │
            └───────────────┬─────────────────┘
                            │ (If upstream unavailable or offline)
                            ▼
               [Tier 3: Static Edge JSON]
               /api/stats.json (Public CDN cached)
                            │
                            │ (If network offline)
                            ▼
               [Tier 4: Validated UI Defaults]
               Non-zero baseline metrics in memory
```

### Fallback Priority Logic:
1. **Direct Bot API / SSE (`/api/stats/stream` & `/api/stats`)**: If `VITE_BOT_API_URL` or a local bot instance on port `4000` is active, telemetry streams in real time via Server-Sent Events.
2. **Serverless Function (`api/stats.js`)**: Queries the official Discord REST API directly via bot token, or reads MongoDB Atlas synced state with a 30s CDN cache.
3. **Resilient Static Fallback (`/api/stats.json`)**: If no token is provided or upstream Discord is rate-limited, the endpoint and frontend seamlessly fall back to static cached baseline metrics.
4. **Zero-Flicker Baseline State**: Initial React state is pre-populated with verified baseline stats (`14,650+` users, `27+` servers) so counters never flash empty zeroes on page load.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Cyber Glassmorphism, CSS Custom Properties, Responsive CSS Grid
- **Fonts**: [Orbitron](https://fonts.google.com/specimen/Orbitron) & [Outfit](https://fonts.google.com/specimen/Outfit)
- **Deployment**: [Vercel](https://vercel.com/) (Serverless + Static CDN)

---

## 📁 Project Structure

```text
website/
├── api/
│   └── stats.js              # Vercel Serverless Function (Live Discord & Mongo fetch)
├── public/
│   ├── api/
│   │   ├── stats             # Static fallback endpoint
│   │   ├── stats.json        # Static JSON telemetry fallback
│   │   └── team.json         # Team profile configuration
│   ├── assets/emojis/        # 3D glossy light-purple squircle emojis
│   ├── avatar.webp           # Bot mascot logo
│   └── banner.webp           # Platform banner
├── src/
│   ├── components/
│   │   ├── CommandExplorer.jsx # Searchable command list
│   │   ├── Faq.jsx             # FAQ accordion
│   │   ├── FeatureModal.jsx    # Feature inspection modal
│   │   ├── Features.jsx        # Grid of Kreo key capabilities
│   │   ├── Footer.jsx          # Footer with live stats counters & links
│   │   ├── Hero.jsx            # Hero section with interactive music player
│   │   ├── LiveStats.jsx       # 8-card live metrics grid with animated counters
│   │   ├── Navbar.jsx          # Floating glassmorphic navbar & mobile drawer
│   │   ├── PremiumPlans.jsx    # Premium tier pricing & perks
│   │   └── Team.jsx            # Team member cards with Discord decorations
│   ├── data/
│   │   ├── commands.js         # Command documentation registry
│   │   ├── features.js         # Features registry
│   │   └── plans.js            # Pricing & subscription data
│   ├── pages/
│   │   ├── CallbackPage.jsx    # OAuth2 callback handler
│   │   ├── DocumentationPage.jsx # Full documentation view
│   │   ├── HomePage.jsx        # Landing page
│   │   └── PremiumPage.jsx     # Dedicated premium purchase portal
│   ├── App.jsx                 # Root router component
│   ├── index.css               # Core styling & resets
│   ├── kreo.css                # Glassmorphic cyber theme stylesheet
│   └── main.jsx                # React DOM root entry
├── index.html                  # HTML5 template
├── package.json                # Project scripts & dependencies
├── vercel.json                 # Vercel routing, rewrites & headers
└── vite.config.js              # Vite configuration & dev proxy plugin
```

---

## 🚀 Quick Start & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/MohsinAli088/kreo-website.git
cd kreo-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
Create a `.env` file in the root directory:

```env
# Optional: Remote or local Bot HTTP API URL
VITE_BOT_API_URL=http://localhost:4000

# Optional: Discord Bot Token for real-time Discord REST guild counting
DISCORD_TOKEN=your_bot_token_here

# Optional: MongoDB connection URI if bot syncs live stats to DB
MONGODB_URL=mongodb+srv://...
```

> **Note**: Even without any environment variables, the website runs with 100% functionality using the built-in resilient static fallback engine.

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. The build settings are auto-detected:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. (Optional) Add your `DISCORD_TOKEN` or `BOT_API_URL` under **Project Settings → Environment Variables**.
5. Click **Deploy**. Vercel will host both the static frontend and the `/api/stats` serverless function automatically.

---

## 🔒 Security & Optimization

- **Zero-Token Exposure**: The Discord Bot Token is only used inside the backend serverless function (`api/stats.js`) or local Vite proxy. It is **never** bundled into the client-side JavaScript.
- **Edge Cache Invalidation**: Serverless endpoints utilize `Cache-Control: public, s-maxage=30, stale-while-revalidate=60` to safeguard against Discord API rate limits while keeping metrics fresh.
- **Asset Optimization**: High-efficiency `.webp` images and vector icons ensure sub-second page loads.

---

## 👨‍💻 Author & Credits

- **Developer**: [Mohsin.Exe](https://github.com/MohsinAli088)
- **Discord Community**: [Join Kreo Support](https://discord.gg/9wRBcsfK9Z)
- **Bot Repository**: [Kreo Music Bot](https://github.com/MohsinAli088/Kreo)

---

<div align="center">
  <sub>Built with ❤️ and extreme precision for high-fidelity Discord music communities.</sub>
</div>
