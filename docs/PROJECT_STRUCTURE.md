# BG Apiary – Struktura projektu

## Root
- `.github/workflows/` – CI/CD.
- `src/` – frontend React.
- `backend/` – API Node/Express/Prisma.
- `public/` – statyczne assety PWA.
- `docs/` – dokumentacja projektu.

## Frontend
- `api/` – komunikacja z backendem.
- `services/` – operacje aplikacyjne.
- `features/` – moduły domenowe od Sprintu 4.0.
- `components/` – komponenty wielokrotnego użytku.
- `pages/` – widoki aplikacji.
- `hooks/` – hooki React.
- `types/` – DTO i typy odpowiedzi API.
- `utils/` – pomocnicze funkcje techniczne.
- `styles/` – CSS.

## Backend
- `src/app.ts` – konfiguracja Express.
- `src/server.ts` – start serwera.
- `src/routes` – routing.
- `src/controllers` – kontrolery.
- `src/services` – logika biznesowa.
- `src/repositories` – Prisma access layer.
- `src/models` – DTO, response models, pagination.
- `src/middleware` – logger, error handler, 404.
- `prisma` – schema i migracje.
