# BG Apiary 1.0.2 Prisma Binary Fix

## Naprawiony błąd

Deployment potrafił kończyć się błędem:

```text
PrismaClientInitializationError:
Prisma Client could not locate the Query Engine for runtime "linux-musl-openssl-3.0.x"
```

## Przyczyna

Backend działa w kontenerze `node:20-alpine`, czyli w środowisku `linux-musl` z OpenSSL 3.
Prisma Client był wygenerowany dla innego runtime i w obrazie Dockera brakowało właściwego Query Engine.

## Poprawka

W `backend/prisma/schema.prisma` ustawiono:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x", "debian-openssl-3.0.x"]
}
```

Dodatkowo:

- Dockerfile backendu instaluje `openssl` już w etapie build,
- `prisma generate` wskazuje jawnie `prisma/schema.prisma`,
- entrypoint backendu wykonuje `prisma generate` dla aktualnego runtime przed migracjami,
- instalator usuwa stare kontenery API/WEB przed ponownym buildem.

## VPS

Po wdrożeniu tej paczki uruchom:

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

Nie usuwaj volume bazy, chyba że chcesz absolutnie czysty start.
