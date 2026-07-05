# Sprint 3.3 – Backend API foundation

## Status
Foundation backend prepared. Business logic is intentionally not implemented yet.

## Scope delivered
- Express + TypeScript application skeleton.
- Prisma ORM configuration.
- PostgreSQL schema in `prisma/schema.prisma`.
- API namespace `/api/v1`.
- Health endpoint: `GET /api/v1/health`.
- Planned resources returning `501 Not Implemented`.
- Swagger OpenAPI UI at `/api/docs`.
- Pino request logging.
- Helmet and CORS middleware.
- JWT helper structure for future authentication.
- Dockerfile and Docker Compose for postgres/backend/pgadmin.

## Not included
- Business CRUD logic.
- Database migrations.
- Frontend connection to API.
- Removal of localStorage from React.

These are planned for Sprint 3.4+.
