# Ishant Goyal — Portfolio Website

A fully animated, aesthetic, full-stack portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Three.js / React Three Fiber** particles.

## ✨ Features

- **Light & Dark themes** — circular toggle in the navbar, light mode by default, choice persisted in `localStorage` with no flash on load.
- **Hero** — highlighted gradient domain pills (*Full Stack Developer / Software Developer / AI Specialist*, white text on glowing gradients), fluid-sized name that never clips on any screen, static gradient-ring photo with an "Available for work" badge only, and an always-visible contact strip (phone, email, LinkedIn, LeetCode). Includes **View Resume** (no Download button).
- **About** — short, AI-focused bio, animated count-up stats, trait pills (single ⚡ AI-First floating badge on the portrait, which has a rotating conic aura + scan-sweep effect), education timeline, and "What I Do Best" service cards (incl. **Deployments**).
- **Experience** — left-rail full-width timeline (not centered) so cards fill the laptop screen. Dream Mantra (Work from Office, no tech listed, company + role explained), Lohiya Suppliers, Bussi Bees. No tech stacks shown.
- **Projects** — 7 production projects, each with:
  - Real screenshots captured from the live sites (5 per project)
  - Real demo videos recorded from the live sites with scripted feature tours and a glowing cursor + click-ripple effect, **each with its own unique ambient music track** (7 different tracks, Opus in WebM; plays with sound on hover and in the modal)
  - Filter pills (All / Full Stack / AI & Agents / Web Apps), live search, feature list, live + code links, video modal with screenshot gallery — **no tech-stack chips**
- **Skills** — 3D-tilt category cards, shimmer chips, dual-direction marquees, and a **fully animated full-width AI Tools card** with a continuously **rotating orbit** (chips stay upright while circling a pulsing brain core, glowing boxed pills — Claude, Cursor, Antigravity, N8N, Codex, Blackbox AI, Kiwi, Twilio, Hermes Agent, OpenAI, LangChain, CrewAI, Hugging Face, Copilot, LiveKit, Zapier, and **Freebuff**). Plus **Hosting & Deployment**, **Payment Gateway**, and **Database** (incl. Supabase & AWS Cloud).
- **Achievements** — gradient-bordered "Hall of Fame" cards with shine sweep, medals, and year badges.
- **Mid-page CTA banner** — "Have a project in mind? Let's build it together" with Hire Me / Let's Connect / View Resume.
- **Resume** — live-hosted, up-to-date PDF at `/resume/Ishant_Goyal_Resume.pdf` (also viewable at `/resume/resume.html`).
- **Contact** — prominent phone / email / LinkedIn / LeetCode cards, WhatsApp CTA, and a working contact form wired to `POST /api/contact`.
- Effects: custom glow-follower cursor, scroll progress bar, preloader, **site-wide live background** (interactive particle network + drifting gradient orbs + hue-shifting aurora wash), animated aurora blobs per section, grid + noise textures, marquees, and a floating **Top** button (bottom-left) that smooth-scrolls back to the top.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🛠 Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## 📁 Structure

```
src/
  app/            # Next.js app router (page, layout, globals.css, api/contact)
  components/
    effects/      # Cursor, preloader, particles, scroll progress, marquee, theme toggle
    layout/       # Navbar, Footer
    sections/     # Hero, About, Experience, Projects, CtaBanner, Skills, Contact
    ui/           # SectionHeading, TiltCard, Reveal
  data/
    portfolio.ts  # ALL content — edit this file to update the site
  lib/            # Utilities
public/
  images/         # Profile photo + project screenshots
  videos/         # Demo videos with music for each project (WebM)
  resume/         # Ishant_Goyal_Resume.pdf + resume.html
```

> **To update content** (projects, skills, experience, contact info), edit `src/data/portfolio.ts` — the whole site renders from that single source of truth.

## 🎵 Regenerating media

- `node gen-resume.js` — rebuilds the ATS-optimized 2-page PDF from `public/resume/resume.html`.
- `node gen-audio.js` — regenerates a unique ambient track per project video and muxes it in (requires `ffmpeg-static`, already a devDependency).

## 📸 Media

Project screenshots (`public/images/projects/<project>/shot-1..4.png`, `full.png`) and demo videos (`public/videos/<project>.webm`) were captured directly from the live deployments using Playwright. The demo videos include a generated ambient soundtrack (muxed with ffmpeg).
