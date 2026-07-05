# BG Apiary 1.0 Production

Nowoczesna aplikacja PWA dla pszczelarzy do prowadzenia pasiek, uli, matek, przeglądów, karmień, leczeń, zadań i historii rodzin pszczelich.

To jest czysty projekt napisany od zera na podstawie `docs/BG_APIARY_1_0_MASTER_PLAN.md`. Nie jest to łatka do starego prototypu, bo czasem trzeba przestać malować zgniłą deskę i wziąć nową.

## Stack

### Frontend

- React
- TypeScript
- Vite
- PWA
- mobile first UI
- IndexedDB pod podstawowy offline
- `/api/v1` jako jeden kontrakt komunikacji

### Backend

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- JWT
- Zod
- Swagger/OpenAPI

### Production

- Docker Compose
- Nginx container dla frontendu i proxy `/api`
- PostgreSQL
- backend jako osobny kontener
- skrypty `install`, `update`, `check`
- GitHub Actions pod deploy na VPS

## Szybki start lokalny

```bash
cp .env.example .env
docker compose up -d --build
```

Aplikacja:

```text
http://localhost
```

API health:

```text
http://localhost/api/v1/health
```

Swagger:

```text
http://localhost/api/docs
```

## Instalacja na VPS

```bash
cd /opt/bg-apiary
bash scripts/install.sh
```

Sprawdzenie:

```bash
bash scripts/check.sh
```

Aktualizacja:

```bash
bash scripts/update.sh
```

## Konta i dane

Po uruchomieniu załóż konto na ekranie rejestracji. Aplikacja przeprowadzi przez pierwsze utworzenie pasieki i uli.

## Ważne

Dane biznesowe nie są trzymane w `localStorage`. Źródłem prawdy jest PostgreSQL. Frontend używa IndexedDB do podstawowego trybu offline i kolejki synchronizacji.
