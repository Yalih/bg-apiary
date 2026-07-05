# Sprint 3.4 – PostgreSQL, Prisma i pierwsze działające API

## Zakres
Sprint 3.4 uruchamia pierwszy realny backend BG Apiary oparty o PostgreSQL i Prisma.

## Działające endpointy
- `GET /api/v1/health`
- `GET /api/v1/apiaries`
- `POST /api/v1/apiaries`
- `GET /api/v1/hives`
- `POST /api/v1/hives`

Pozostałe endpointy z fundamentu backendu nadal mogą zwracać `501 Not Implemented`.

## Prisma
Dodano:
- `prisma/migrations/20260705120000_init/migration.sql`
- `prisma/seed.ts`

Seed tworzy:
- administratora `admin@bgapiary.local`,
- pasiekę demo,
- pierwszy ul demo.

## Uwaga testowa
W tym środowisku nie można było uruchomić Dockera ani pobrać silników Prisma z `binaries.prisma.sh`, więc migracja nie została wykonana tutaj na prawdziwej bazie. Kod backendu został zbudowany przez `npm run build`.
