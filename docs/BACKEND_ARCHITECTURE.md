# Backend architecture

BG Apiary backend follows a layered structure:

- `routes` – HTTP route registration.
- `controllers` – request/response handling.
- `validators` – Zod schemas.
- `services` – business rules.
- `repositories` – Prisma/database access.
- `database` – Prisma client and connection lifecycle.
- `auth` – JWT and role-based architecture.
- `middleware` – logging, errors, 404, security.
- `logger` – Pino logger.

## Data source
PostgreSQL is the source of truth. Frontend localStorage must not store business data after Sprint 3 migration.

## API versioning
All endpoints are placed under `/api/v1`.
