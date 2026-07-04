# BG Apiary architecture

## Current architecture

BG Apiary is currently a frontend-first React application built with Vite and TypeScript.

```text
User browser
   ↓
Nginx on VPS
   ↓
Static build from /var/www/html
   ↓
React application
```

Deployment is handled by GitHub Actions. A push to `main` triggers SSH deployment to the VPS and runs the deployment script:

```bash
/usr/local/bin/deploy-bgapiary
```

## Current source layout

```text
src/
├── App.tsx
├── main.tsx
├── styles.css
└── vite-env.d.ts
```

This structure works for the current stage, but future sprints should split the app into feature modules.

## Target source layout

```text
src/
├── assets/
├── components/
├── features/
│   ├── apiary/
│   ├── hives/
│   ├── inspections/
│   ├── queens/
│   ├── feeding/
│   ├── treatments/
│   └── statistics/
├── hooks/
├── layouts/
├── pages/
├── services/
├── styles/
├── types/
├── utils/
└── App.tsx
```

## Deployment flow

```text
Developer PC
   ↓ git push
GitHub
   ↓ GitHub Actions
VPS
   ↓ deploy-bgapiary
Nginx
   ↓ HTTPS
https://bgapiary.pro
```

## Production notes

- Do not commit `.env` files.
- Do not commit `node_modules/`.
- Do not commit `dist/` unless explicitly needed for a static handoff.
- Do not share `.git/` in ZIP archives.
- Keep deployment credentials only in GitHub repository secrets.
