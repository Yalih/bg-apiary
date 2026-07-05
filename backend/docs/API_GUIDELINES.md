# API guidelines

## Base path
`/api/v1`

## Response format
Success responses should return JSON objects. Errors should return:

```json
{
  "message": "Human readable error",
  "code": "OPTIONAL_MACHINE_CODE"
}
```

## Planned resources
- `/health`
- `/auth`
- `/users`
- `/apiaries`
- `/hives`
- `/queens`
- `/inspections`
- `/tasks`
- `/notes`
- `/feedings`
- `/treatments`
- `/photos`

## Validation
Use Zod at request boundaries.

## Authentication
Use JWT access token + refresh token architecture.

## Roles
- `ADMIN`
- `BEEKEEPER`
- `OBSERVER`
