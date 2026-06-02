# COREPILOT — Frontend

Lightweight React frontend built with Vite and TailwindCSS used by the COREPILOT project.

Quick reference
- Node: 18+ recommended
- Package manager: npm or yarn

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the development server (HMR)

```bash
npm run dev
```

Production build

```bash
npm run build
# serve the production build locally
npm run preview
```

Linting

```bash
npm run lint
```

Environment
- Local secrets and API keys must live in `backend/.env` or in your environment — do NOT commit `.env` to the repo. The repository already ignores `.env`.

Deployment
- Build artifacts are produced in `dist/` by `npm run build`. Deploy `dist/` to your static host or include it in your overall deployment pipeline.

Contributors
- Sync with the canonical remote before working: fetch and reset to avoid merge problems after history rewrites.

```bash
git fetch origin
git checkout main
git reset --hard origin/main
```

Notes
- This project uses Vite, React 19, TailwindCSS and a small set of UI dependencies. See `package.json` for exact versions and scripts.

If you want, I can add a short development checklist or CI guidance next.
