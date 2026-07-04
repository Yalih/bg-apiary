# BG Apiary

**BG Apiary** is a beekeeping management web application for apiaries, hives, inspections, queens, feeding, treatments, weather notes and seasonal planning.

Production: https://bgapiary.pro

## Current status

Version: **2.1.0 Apiary Edit GPS Fix**  
Deployment: **GitHub Actions → VPS → Nginx → HTTPS**

## Main features

- apiary dashboard,
- hive cards and hive details,
- inspection notes,
- queen marking dot system,
- apiary location and GPS fixes,
- weather and nectar screens,
- visual asset system,
- local data persistence in the current frontend version.

## Tech stack

- React 18,
- TypeScript,
- Vite,
- CSS,
- GitHub Actions,
- Nginx on VPS.

## Project structure

```text
bg-apiary/
├── .github/workflows/      # CI/CD deployment workflow
├── docs/                   # technical documentation and roadmap
├── public/                 # PWA manifest and static files
├── src/                    # application source code
├── index.html              # Vite entry HTML
├── package.json            # scripts and dependencies
├── vite.config.ts          # Vite config
└── README.md
```

## Local development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

## Tests

```bash
npm test
```

## Deployment

Deployment is automated through GitHub Actions.

Typical workflow:

```bash
git add .
git commit -m "Describe change"
git push
```

After pushing to `main`, GitHub Actions connects to the VPS and runs:

```bash
/usr/local/bin/deploy-bgapiary
```

The site is then updated at:

```text
https://bgapiary.pro
```

## Documentation

Start here:

- `docs/INDEX.md` - documentation map,
- `docs/ROADMAP.md` - sprint roadmap,
- `docs/ARCHITECTURE.md` - architecture overview,
- `docs/CHANGELOG.md` - release history.
