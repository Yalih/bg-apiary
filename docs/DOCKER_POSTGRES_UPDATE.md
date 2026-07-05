# BG Apiary Docker PostgreSQL Update

Ten update dodaje brakującą konfigurację Docker Compose dla PostgreSQL.

## Dodane pliki

- `docker-compose.yml`
- `backend/.env.example`
- `scripts/install-env.sh`
- `scripts/start-db.sh`
- `docs/DOCKER_POSTGRES_UPDATE.md`

## Instalacja na VPS

Rozpakuj ZIP w katalogu:

```text
/opt/bg-apiary
```

Potem:

```bash
cd /opt/bg-apiary
bash scripts/install-env.sh
bash scripts/start-db.sh
```

Po starcie bazy:

```bash
cd /opt/bg-apiary/backend
npx prisma validate
npx prisma migrate dev --name init
npx prisma generate
npm run build
```

## Dostęp

PostgreSQL:
- host: localhost
- port: 5432
- database: bg_apiary
- user: postgres
- password: postgres

pgAdmin:
- http://IP_SERWERA:5050
- login: admin@bgapiary.pro
- password: admin

## Ważne

To jest konfiguracja startowa/development. Przed produkcją trzeba zmienić hasła.
