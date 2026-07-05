# Changelog

## 1.0.2 - Prisma binary fix

### Fixed
- Naprawiono błąd Prisma Query Engine dla runtime `linux-musl-openssl-3.0.x`.
- Dodano `binaryTargets` w `backend/prisma/schema.prisma`.
- Backend Dockerfile instaluje `openssl` w build stage.
- Backend entrypoint uruchamia `prisma generate` przed migracjami jako zabezpieczenie runtime.
- Instalator usuwa stare kontenery API/WEB przed pełnym buildem.

## 1.0.1 - dependency/install fix

### Fixed
- Naprawiono błąd `Cannot find package '@vitejs/plugin-react'`.
- Przeniesiono `@vitejs/plugin-react` do `frontend/devDependencies`.
- Usunięto stare `package-lock.json`, które mogły wskazywać na niedostępny wewnętrzny registry.
- Dodano `.npmrc` wymuszające publiczny `https://registry.npmjs.org/`.
- Dockerfile frontendu i backendu używa teraz czystego `npm install` z publicznego registry.
- Dodano root `package.json`, więc `npm run build` z katalogu głównego działa poprawnie.
- Dodano skrypty:
  - `scripts/dev-clean-build.ps1`
  - `scripts/dev-clean-build.sh`

# Changelog

## 1.0.0 Production from zero

- Utworzono czysty projekt BG Apiary 1.0 od zera.
- Dodano frontend React + TypeScript + Vite + PWA.
- Dodano nowoczesny ekran logowania i rejestracji z pierwszym wrażeniem marki.
- Dodano onboarding po rejestracji.
- Dodano dashboard, pasieki, ule, przeglądy, matki, karmienia, leczenia, zadania i historię ula.
- Dodano podstawową obsługę offline przez IndexedDB.
- Dodano backend Fastify + Prisma + PostgreSQL.
- Dodano JWT auth, walidację Zod i Swagger.
- Dodano CRUD dla modułów 1.0.
- Dodano Docker Compose z web, api, postgres i pgAdmin.
- Dodano skrypty produkcyjne install/update/check.
- Dodano GitHub Actions deploy.
- Dodano dokumentację produkcyjną.
