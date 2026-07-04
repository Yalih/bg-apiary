# Sprint 1 - project cleanup

## Goal

Prepare BG Apiary for clean, repeatable development without changing application behavior.

## Completed changes

- Removed local `.git/` history from the shared project package.
- Added `.gitignore` for Node, Vite, editor files, logs, builds and environment files.
- Added `.env.example`.
- Rebuilt `README.md` into a production-ready project overview.
- Added `docs/INDEX.md`.
- Added `docs/ROADMAP.md`.
- Added `docs/ARCHITECTURE.md`.
- Kept app logic unchanged.

## Deployment command after merge

```bash
git add .
git commit -m "Sprint 1 - project cleanup"
git push
```

GitHub Actions should deploy automatically after push to `main`.

## Verification

Run locally:

```bash
npm install
npm run build
```

Then check production:

```text
https://bgapiary.pro
```
