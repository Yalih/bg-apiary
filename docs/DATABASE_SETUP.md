# Database setup

## Lokalnie / VPS

```bash
cd backend/docker
docker compose up -d postgres pgadmin
cd ..
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run build
npm run start
```

## Dostęp
- Backend: `http://localhost:4000`
- Swagger: `http://localhost:4000/api/docs`
- pgAdmin: `http://localhost:5050`

## Środowiska
- development: `bg_apiary_dev`
- production: `bg_apiary_prod`
- test/staging: `bg_apiary_test`

## Zasada
Dane biznesowe nie są przechowywane w `localStorage`. Źródłem prawdy jest PostgreSQL przez Backend API.
