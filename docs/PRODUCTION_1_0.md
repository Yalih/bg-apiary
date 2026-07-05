# BG Apiary 1.0 PRO – Production Release

## Cel wydania

Wersja 1.0 PRO kończy etap łatania wdrożenia i porządkuje aplikację jako jeden produkcyjny system:

- React PWA jako frontend,
- Express API jako backend,
- PostgreSQL jako baza danych,
- Prisma jako warstwa bazy,
- Docker Compose jako runtime,
- Nginx jako serwer frontendu i reverse proxy `/api`,
- GitHub Actions jako automatyczny deploy.

## Najważniejsze decyzje

1. Jeden główny plik Docker Compose: `docker-compose.yml` w katalogu głównym.
2. Backend działa na `127.0.0.1:3000` i jest wystawiany publicznie przez Nginx pod `/api`.
3. Frontend w produkcji używa relatywnego adresu API: `/api/v1`.
4. `backend/.env` nie jest trzymany w repozytorium. Installer tworzy go automatycznie.
5. GitHub Actions uruchamia na VPS `scripts/install.sh`.
6. Instalator czyści stare kontenery i uruchamia pełny stack od zera.

## Uruchomienie na VPS

```bash
cd /opt/bg-apiary
bash scripts/install.sh
```

## Sprawdzenie

```bash
bash scripts/check.sh
```

## Endpointy kontrolne

```bash
curl http://127.0.0.1:3000/api/v1/health
curl http://127.0.0.1/api/v1/health
curl http://127.0.0.1
```

## Usługi Docker

- `bg-apiary-postgres`
- `bg-apiary-backend`
- `bg-apiary-pgadmin`

## Status

Wersja 1.0 PRO jest przygotowana jako baza do dalszego rozwoju funkcji aplikacji. Kolejny etap powinien zaczynać się od modułu Ule, już na stabilnym fundamencie produkcyjnym.
