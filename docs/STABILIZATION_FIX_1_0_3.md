# BG Apiary 1.0.3 Stabilization Fix

## Co naprawia ta wersja

Ta wersja utrwala poprawki wykonane ręcznie na VPS, żeby nie zniknęły przy kolejnym `git reset` albo deployu. Tak, zapisujemy rzeczy do repozytorium, bo pamięć administratora nie jest strategią wdrożeniową.

## Naprawione problemy

- Backend działa przez Docker na `127.0.0.1:4000`.
- PostgreSQL działa przez Docker.
- Host Nginx serwuje frontend z `/var/www/html`.
- Host Nginx przekierowuje `/api/` do backendu.
- `curl http://127.0.0.1/api/v1/health` zwraca JSON z API, nie HTML frontendu.
- Frontend build ma deklarację `vite-env.d.ts`.
- Frontend build ma stabilne `moduleResolution: Bundler`.
- Frontend ma `src/styles.css`.
- Instalator publikuje frontend do `/var/www/html`.
- Instalator konfiguruje host Nginx.
- Dockerowy kontener `web` jest opcjonalny i działa na profilu `docker-web`, żeby nie walczył z host Nginx o port 80.
- Prisma, gdy nie ma migracji, wykonuje `prisma db push`, dzięki czemu świeża baza dostaje tabele automatycznie.

## Wdrożenie na VPS

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

## Sprawdzenie

```bash
curl http://127.0.0.1:4000/api/v1/health
curl http://127.0.0.1/api/v1/health
curl -I http://127.0.0.1
```

Oczekiwane:

- pierwszy curl: JSON API,
- drugi curl: JSON API przez Nginx,
- trzeci curl: HTTP 200 z frontendu.

## Uwaga o migracjach

W 1.0.3 używamy `prisma db push`, jeśli folder `prisma/migrations` jest pusty. To stabilizuje instalację teraz. Docelowo wersja 1.0.4 powinna dodać prawdziwą migrację początkową.
