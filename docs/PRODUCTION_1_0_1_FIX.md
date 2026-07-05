# BG Apiary 1.0.1 PRO Production Fix

## Cel poprawki

Wersja 1.0.1 naprawia problem instalatora zatrzymującego się na kroku `7/16 Installing frontend dependencies` oraz kilka błędów produkcyjnych wokół Docker Compose i zmiennych środowiskowych.

## Najważniejsze zmiany

- Instalator nie wisi bez końca na `npm install`:
  - używa `npm ci`, jeśli istnieje `package-lock.json`,
  - ustawia timeout 25 minut,
  - zapisuje logi do `/tmp/bg-apiary-frontend-npm.log` i `/tmp/bg-apiary-backend-npm.log`,
  - używa wspólnego cache `/opt/bg-apiary/.npm-cache`,
  - ma większe timeouty i retry dla sieci npm.

- Poprawione `.env`:
  - instalator tworzy `backend/.env`,
  - kopiuje go także do `.env` w katalogu głównym,
  - Docker Compose uruchamia się z `--env-file .env`.

- Poprawione `docker-compose.yml`:
  - backend ma `env_file: ./backend/.env`,
  - pgAdmin ma `env_file: ./backend/.env`,
  - backend ma dłuższy `start_period` w healthchecku.

- Poprawione `scripts/check.sh`:
  - pokazuje status plików `.env`,
  - pokazuje logi backendu i Postgresa,
  - pokazuje ostatnie logi npm,
  - sprawdza API bezpośrednio i przez Nginx.

## Instalacja

Po wrzuceniu tej wersji do GitHub uruchom na VPS:

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env -e backend/.env -e '.npm-cache/**'
bash scripts/install.sh
```

## Diagnostyka

Jeśli instalator przerwie pracę:

```bash
bash scripts/check.sh
```

Log frontend npm:

```bash
tail -120 /tmp/bg-apiary-frontend-npm.log
```

Log backend npm:

```bash
tail -120 /tmp/bg-apiary-backend-npm.log
```
