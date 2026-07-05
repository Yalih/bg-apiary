# BG Apiary 1.0 API Contract

Base URL:

```text
/api/v1
```

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## System

- `GET /health`
- `GET /version`

## CRUD

- `/apiaries`
- `/hives`
- `/queens`
- `/inspections`
- `/feedings`
- `/treatments`
- `/tasks`
- `/notes`
- `/photos`

Każdy zasób obsługuje:

- `GET /resource`
- `POST /resource`
- `GET /resource/:id`
- `PATCH /resource/:id`
- `DELETE /resource/:id`

DELETE wykonuje soft delete, nie fizyczne usunięcie danych.
