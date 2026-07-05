# BG Apiary 1.0 PRO

BG Apiary to aplikacja PWA do zarządzania pasieką. Wersja 1.0 PRO porządkuje projekt jako produkcyjny stack:

- frontend: React + Vite,
- backend: Node.js + Express + TypeScript,
- baza danych: PostgreSQL,
- ORM: Prisma,
- runtime: Docker Compose,
- serwer WWW: Nginx,
- deploy: GitHub Actions → VPS.

## Architektura

```text
Browser / PWA
   ↓
Nginx
   ├── /         → frontend /var/www/html
   └── /api      → backend 127.0.0.1:3000
                     ↓
                  PostgreSQL
```

## Instalacja produkcyjna na VPS

Projekt powinien znajdować się w:

```bash
/opt/bg-apiary
```

Uruchomienie:

```bash
cd /opt/bg-apiary
bash scripts/install.sh
```

Sprawdzenie:

```bash
bash scripts/check.sh
```

## Lokalny frontend

```bash
npm install
npm run dev
```

Dla lokalnego API ustaw:

```bash
cp .env.development.example .env.development
```

## Backend

```bash
cd backend
npm install
npm run build
npm run start
```

## Docker

```bash
docker compose up -d --build
```

Usługi:

- `bg-apiary-postgres`
- `bg-apiary-backend`
- `bg-apiary-pgadmin`

## API health

```bash
curl http://127.0.0.1:3000/api/v1/health
curl http://127.0.0.1/api/v1/health
```

## Dokumentacja

- `docs/PRODUCTION_1_0.md`
- `docs/ARCHITECTURE.md`
- `docs/API_REFERENCE.md`
