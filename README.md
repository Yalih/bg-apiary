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


## BG Apiary 1.0.1 Dependency Fix

Ta paczka naprawia problem z lokalnym buildem:

```text
Cannot find package '@vitejs/plugin-react'
```

### Windows, test lokalny

Uruchom PowerShell w katalogu głównym projektu:

```powershell
.\scripts\dev-clean-build.ps1
```

albo ręcznie:

```powershell
npm run build
```

Root `package.json` sam zainstaluje zależności frontendu i backendu przed buildem.

### VPS, czysty deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

### Ważne

W tej wersji celowo usunięto `package-lock.json`, ponieważ wcześniejsze locki mogły zawierać adresy wewnętrznego registry niedostępnego na komputerze i VPS. Instalacja zależności idzie przez publiczny npm registry.


## BG Apiary 1.0.2 Prisma Binary Fix

Ta wersja naprawia błąd backendu:

```text
Prisma Client could not locate the Query Engine for runtime "linux-musl-openssl-3.0.x"
```

Po aktualizacji na VPS wykonaj:

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
docker compose down --remove-orphans
docker rm -f bg-apiary-api bg-apiary-web 2>/dev/null || true
docker builder prune -f
bash scripts/install.sh
bash scripts/check.sh
```


## BG Apiary 1.0.3 Stabilization Fix

Domyślny model produkcyjny:

```text
Host Nginx :80
  ├── frontend z /var/www/html
  └── /api/ -> 127.0.0.1:4000/api/

Docker
  ├── bg-apiary-postgres
  └── bg-apiary-api
```

### Deploy na VPS

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

### Testy

```bash
curl http://127.0.0.1:4000/api/v1/health
curl http://127.0.0.1/api/v1/health
curl -I http://127.0.0.1
```

### Lokalny build

Windows:

```powershell
.\scripts\dev-clean-build.ps1
```

Linux:

```bash
bash scripts/dev-clean-build.sh
```


## BG Apiary 1.0.4 UI/API Hotfix

Ta wersja naprawia:
- HTTP 405 przy logowaniu/rejestracji,
- mobilny wygląd pierwszego ekranu,
- stare cache/PWA po aktualizacji.

### Deploy na VPS

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

### Test 405

```bash
curl -i -X POST http://127.0.0.1/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}'
```

Dobry wynik to `401 Unauthorized`, bo backend odrzuca nieistniejące konto. Zły wynik to `405`, bo wtedy Nginx nadal blokuje POST do API.


## BG Apiary 1.0.5 TypeScript Build Fix

Ta wersja naprawia błąd builda:

```text
error TS5103: Invalid value for '--ignoreDeprecations'
```

### Deploy na VPS

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```


## BG Apiary 1.0.6 Nginx HTTPS API Fix

Ta wersja naprawia przypadek, w którym przeglądarka dalej widzi HTTP 405 mimo że lokalne `/api` działa. Powód: stary albo osobny blok Nginx dla HTTPS.

### Szybka naprawa na VPS

```bash
cd /opt/bg-apiary
bash scripts/fix-nginx-api-proxy.sh
```

### Pełny deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

### Test

```bash
curl -i -X POST https://bgapiary.pro/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}'
```

Wynik ma być `401` albo `400`, nie `405`.


## BG Apiary 1.1.0 - Moduł Ule + Historia Ula

Pierwszy moduł funkcjonalny po stabilizacji 1.0.

### Najważniejsze

- lista uli,
- karta ula,
- status i siła rodziny,
- szybkie akcje przy ulu,
- historia ula,
- endpoint `/api/v1/hives/:id/timeline`.

### Deploy na VPS

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```
