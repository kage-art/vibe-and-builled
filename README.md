# MedBridge — Bridging The Gap In Healthcare

> **Live Deployment:** [https://kage-art.github.io/vibe-and-builled/](https://kage-art.github.io/vibe-and-builled/)  
> **Offline Support:** Progressive Web App (PWA) with Service Worker offline caching.

---

## 🚀 Features

- **Verified Specialists & Instant Booking:** Consult top board-certified doctors with real-time slot selection and verified patient recovery ratings.
- **Jan Aushadhi Medicine Price Radar:** Hyperlocal generic medicine comparison saving patients up to 84% compared to branded alternatives.
- **Campus Wellness Hub:** Subsidized, confidential 1-on-1 counseling designed for students with instant booking.
- **24/7 Trauma Emergency Dispatch:** Instant GPS ambulance dispatch simulation and emergency ER pre-arrival bed lock.
- **Daily Pill Tracker & HealthCredits:** Adherence gamification with HealthCredits economy and daily habit tracking.
- **Local & Offline-First:** Progressive Web App (PWA) equipped with a dedicated Service Worker caching shell assets so the application continues to run offline without an internet connection.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Modular CSS Design System
- **Icons:** Lucide React
- **PWA / Offline:** Service Worker (`sw.js`) + Web App Manifest
- **Hosting & CI/CD:** GitHub Pages via GitHub Actions

---

## 💻 Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/kage-art/vibe-and-builled.git
cd vibe-and-builled
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚡ Running Offline

MedBridge is built with offline-first capabilities:
1. **PWA Offline Support:** Once visited or installed on your device, the Service Worker caches HTML, CSS, JavaScript bundles, and core branding assets. If your connection drops, MedBridge continues to run from the local cache.
2. **Local Preview Mode:**
   ```bash
   npm run build
   npm run preview
   ```
   This serves the production bundle locally without requiring any external server dependencies.

---

## 🌐 Automatic GitHub Pages Deployment

Every push to the `main` branch automatically triggers the `.github/workflows/deploy.yml` workflow, which builds and deploys the latest production bundle directly to GitHub Pages.
