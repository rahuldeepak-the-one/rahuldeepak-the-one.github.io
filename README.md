# rahuldeepak-the-one.github.io

Personal portfolio + blog of **Rahul Deepak Kuchipudi** — edge-AI inference engineer (NVIDIA DeepStream / TensorRT / CUDA / vLLM), IIT Bombay CSE.

**Live:** [rahuldeepak-the-one.github.io](https://rahuldeepak-the-one.github.io)

## Design — "Blueprint on Paper"

An engineering drawing in electric-blue ink (`#2f4fe0`) on warm paper (`#f7f7f4`):

- DWG-numbered sticky nav (`DWG № RDK-2026 · REV C`) with SHEET 1–4 links
- Dashed `FIG.` boxes for experience, projects, and the circuit-schematic skills section
- A title-block contact bar and dimension-line motifs with travelling charge dots
- Signature **electron-field hero** (`src/components/ElectronField.jsx`): a canvas of drifting electrons over a procedural circuit board — the cursor pulls a conduction path together, clicks fire ripples

Type: **Sora** (display) · **Manrope** (body) · **JetBrains Mono** (annotations), via Google Fonts.

Accessibility: `prefers-reduced-motion` gets a static circuit render and no keyframe animation; the hero's animation loop pauses while off-screen.

## Stack

React 19 · Vite 7 · Tailwind CSS v4 · react-router (HashRouter) · framer-motion

## Develop

```bash
npm install
npm run dev       # local dev server with HMR
npm run lint      # ESLint
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Deploy

```bash
npm run deploy    # builds and publishes dist/ to the gh-pages branch
```

GitHub Pages serves the `gh-pages` branch. `vite.config.js` keeps `base: '/'` (user site).

## Blog ("Field Notes")

- Posts live in `src/data/blogData.js` as markdown-ish strings, rendered by `src/components/BlogPost.jsx`.
- `/#/admin` is a browser-local drafting UI (localStorage), gated by `VITE_BLOG_ADMIN_PASSWORD` (see `.env.example`). Drafts are not published — copy finished posts into `blogData.js`.

## Structure

```
src/
├── App.jsx                  # routes + home page composition
├── index.css                # design tokens (@theme) + FIG-card/trace component classes
├── data/blogData.js         # blog posts (source of truth)
└── components/
    ├── ElectronField.jsx    # canvas hero animation
    ├── DimensionLine.jsx    # dimension-line motif (hero + blog divider)
    ├── Navbar.jsx           # DWG header, sheet links, scroll-spy
    ├── Hero.jsx  StatsBar.jsx  Experience.jsx  Projects.jsx  Skills.jsx
    ├── FieldNotes.jsx       # blog teaser on home
    └── BlogList.jsx  BlogPost.jsx  BlogAdmin.jsx  Footer.jsx
```
