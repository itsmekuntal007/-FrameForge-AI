# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🎬 FrameForge AI
### From Imagination to Cinema

**An AI-powered cinematic pre-production co-pilot that transforms creative film concepts into production-ready cinematic blueprints.**

[![Hackathon](https://img.shields.io/badge/GeNarrative_Clash-2026-purple)]()
[![Track](https://img.shields.io/badge/Track-Storytelling_%26_Co--Writers-blue)]()
[![Status](https://img.shields.io/badge/Stage-50%25_MVP-orange)]()
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)]()
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)]()

---

## 📌 Overview

FrameForge AI is a generative AI-powered film pre-production assistant designed to help filmmakers, screenwriters, directors and creative storytellers transform raw ideas into structured cinematic production blueprints.

Instead of starting with disconnected documents, filmmakers can enter a film concept and receive AI-assisted creative material through a unified workspace.

FrameForge AI combines storytelling, screenplay development, character creation, cinematography planning and visual storyboard generation into one platform.

**Our vision:** Empower human creativity through AI-assisted filmmaking, making professional pre-production workflows more accessible, structured and efficient.

## 🎯 Problem Statement

Film pre-production requires multiple creative and technical processes:

- Developing an original story and screenplay.
- Creating consistent characters and character arcs.
- Breaking narratives into individual scenes.
- Planning camera angles, movements and cinematography.
- Visualizing scenes through storyboards.
- Organizing creative decisions into production documents.

These tasks are often handled using separate tools and documents, making the process time-consuming and difficult to coordinate.

## 💡 Our Solution

FrameForge AI provides an integrated creative co-pilot that converts a filmmaker's concept into a structured cinematic blueprint.

The filmmaker remains in control of the creative direction, while AI assists with the development and organization of production materials.

## ✨ Core Features

### 1. AI Story & Screenplay Generation
- Generates original film titles and loglines.
- Develops detailed story synopses.
- Creates three-act story structures.
- Generates scene-by-scene screenplay content.
- Produces character dialogue and action descriptions.

### 2. Character & Lore Bible
- AI-generated character profiles.
- Character descriptions and motivations.
- Character development arcs.
- Supporting and protagonist identification.
- Centralized character references.

### 3. Cinematography & Shot Planning
- Generates structured shotlists.
- Defines shot types and camera angles.
- Suggests camera movements.
- Connects shots with corresponding scenes.
- Provides visual direction for cinematography.

### 4. AI Visual Storyboard
- Generates storyboard frame descriptions.
- Creates cinematic image-generation prompts.
- Generates visual references using Cloudflare FLUX.
- Displays generated storyboard images.
- Persists generated images using browser IndexedDB.

### 5. Director's Deck PDF Export
- Exports a comprehensive production document.
- Includes screenplay and scene breakdowns.
- Includes cinematography plans.
- Embeds generated storyboard images.
- Includes character profiles and director's notes.
- Provides a production checklist.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| Vite | Development and build tooling |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive UI |
| Node.js | Backend runtime |
| Express.js | API development |
| Cloudflare Workers AI | AI inference |
| Llama 3.3 70B | Story and screenplay generation |
| FLUX.1 Schnell | AI storyboard image generation |
| IndexedDB | Browser-side image persistence |
| jsPDF | PDF generation |
| jsPDF AutoTable | Structured PDF tables |
| Lucide React | Interface icons |

## 🏗️ System Architecture

```text
             FILMMAKER
                 |
                 v
        FRAMEFORGE AI FRONTEND
             React + Vite
                 |
                 v
          EXPRESS BACKEND
                 |
          +------+------+
          |             |
          v             v
     CLOUDFLARE      CLOUDFLARE
      LLAMA 3.3        FLUX
          |             |
          v             v
     STORY &         STORYBOARD
     SCREENPLAY       IMAGES
          |             |
          +------+------+
                 |
                 v
        CINEMATIC BLUEPRINT
                 |
       +---------+---------+
       |         |         |
       v         v         v
    Scenes   Characters  Shotlists
                 |
                 v
          DIRECTOR'S DECK
              PDF EXPORT
```

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git
- Cloudflare account with Workers AI access

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/FrameForge-AI.git
```

### 2. Navigate into the project

```bash
cd FrameForge-AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

Never commit this file or share your API credentials publicly.

### 5. Start the backend

```bash
node server/index.js
```

Backend URL:

```text
http://localhost:5000
```

### 6. Start the frontend

Open another terminal:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## 📂 Project Structure

```text
FrameForge-AI/
│
├── public/
│   └── Application assets
│
├── server/
│   └── index.js
│
├── src/
│   ├── assets/
│   ├── utils/
│   │   └── directorDeck.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🔐 Environment & Security

FrameForge AI uses server-side environment variables for Cloudflare authentication.

Security considerations:

- API credentials are stored in `.env`.
- Credentials are not included in frontend source code.
- `.env` is excluded from version control.
- AI requests are routed through the backend.
- Generated storyboard images are stored locally in the browser using IndexedDB.

## 🧪 Current Development Status — 50% MVP

The current MVP demonstrates the core creative workflow:

| Module | Status |
|---|---|
| AI story generation | Implemented |
| Screenplay and scene generation | Implemented |
| Character Bible | Implemented |
| Cinematography and shot planning | Implemented |
| AI storyboard image generation | Implemented |
| Storyboard image persistence | Implemented |
| Director's Deck PDF export | Implemented |

Further improvements will focus on production planning, narrative continuity, richer cinematography specifications and enhanced export quality.

## 🔮 Future Scope

- AI-powered screenplay consistency analysis.
- Character appearance and personality consistency checks.
- Advanced production planning and scheduling.
- Automated location, prop and costume breakdowns.
- More detailed cinematography recommendations.
- Collaborative filmmaking workspace.
- Enhanced director's deck customization.
- Cloud-based project storage and sharing.

## 🎯 Hackathon Information

**Event:** GeNNarative Clash 2026  
**Track:** Storytelling & Co-Writers  
**Submission Stage:** 50% MVP  
**Team Name:** Team Incognova  
**Project:** FrameForge AI

## 👥 Team

**Team Leader:** Kuntal Banerjee

**Team Members:**
Debopriyo Nath

Debosmita Seal

Debojit Neogy


## 🌟 Our Philosophy

We believe AI should not replace human creativity.

It should empower storytellers, support filmmakers and help creative ideas become tangible cinematic experiences.

**FrameForge AI — From Imagination to Cinema.**

---

## 📄 License

This project is currently developed as a hackathon MVP.

Add a license file if you decide to distribute the project under an open-source license.
