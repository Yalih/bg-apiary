# BG Apiary – Architektura

## Warstwy

```text
React PWA
  → src/services
  → src/api
  → Backend REST API
  → Prisma ORM
  → PostgreSQL
```

## Frontend
- `src/api/` – klient HTTP i moduły API.
- `src/services/` – warstwa użycia API przez aplikację.
- `src/features/` – docelowe moduły biznesowe.
- `src/components/` – komponenty UI.
- `src/pages/` – ekrany aplikacji.
- `src/types/` – wspólne typy API i DTO.
- `src/styles/` – style globalne i modułowe.

## Backend
- `backend/src/routes/` – definicje tras REST.
- `backend/src/controllers/` – obsługa HTTP.
- `backend/src/services/` – logika aplikacyjna.
- `backend/src/repositories/` – dostęp do danych.
- `backend/src/validators/` – walidacja Zod.
- `backend/src/models/` – DTO, odpowiedzi API i typy.
- `backend/src/database/` – klient Prisma.
- `backend/prisma/` – schema, migracje, seed.

## Zasada danych
Dane biznesowe nie są przechowywane w localStorage. Źródłem prawdy jest PostgreSQL przez backend API.
