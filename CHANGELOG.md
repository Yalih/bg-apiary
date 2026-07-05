# Changelog

## 1.0.4 - UI/API hotfix

### Fixed
- Naprawiono ryzyko `HTTP 405` przy logowaniu i rejestracji przez Nginx.
- `scripts/install-nginx-host.sh` generuje konfigurację HTTP oraz HTTPS, jeśli certyfikaty istnieją.
- Dodano test `POST /api/v1/auth/login` do instalatora i `scripts/check.sh`.
- Ulepszono komunikat błędu frontendu dla HTTP 405.
- Poprawiono mobilny ekran logowania/rejestracji.
- Ukryto mockup telefonu na mobile, żeby nie zasłaniał formularza.
- Dodano czyszczenie starych service workerów i cache po zmianie wersji.
- Zmieniono cache PWA na `bg-apiary-1-0-4`.

## 1.0.3 - VPS stabilization fix

### Fixed
- Utrwalono działający model VPS: Docker dla PostgreSQL/API + host Nginx dla frontendu i proxy `/api`.
- Dodano `docker/nginx-host.conf`.
- Dodano `scripts/install-nginx-host.sh`.
- Przepisano `scripts/install.sh` pod rzeczywisty deploy na VPS.
- Przepisano `scripts/update.sh`.
- Zaktualizowano `scripts/check.sh`, żeby sprawdzał API direct, API through Nginx i frontend.
- Dodano `frontend/src/vite-env.d.ts`.
- Ustawiono `moduleResolution: Bundler` w `frontend/tsconfig.json`.
- Utrwalono `frontend/src/styles.css`.
- Dockerowy kontener `web` przeniesiono do profilu opcjonalnego `docker-web`, port 8080.
- Backend entrypoint używa `prisma db push`, jeśli nie ma migracji.
- Przypięto wersje Vite/TypeScript/React/Prisma, żeby instalacja nie ściągała losowych większych wersji.

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
