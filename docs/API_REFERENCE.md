# BG Apiary API Reference – Sprint 3.4

## Health

### GET `/api/v1/health`
Zwraca status backendu i połączenia z bazą.

## Apiaries

### GET `/api/v1/apiaries`
Zwraca listę pasiek.

### POST `/api/v1/apiaries`
Tworzy pasiekę.

Body:
```json
{
  "name": "Pasieka główna",
  "address": "Mazowieckie",
  "latitude": 52.2297,
  "longitude": 21.0122
}
```

## Hives

### GET `/api/v1/hives`
Zwraca listę uli.

### POST `/api/v1/hives`
Tworzy ul.

Body:
```json
{
  "apiaryId": "uuid",
  "hiveNumber": "1",
  "hiveType": "Warszawski poszerzany",
  "status": "ACTIVE",
  "frameCount": 7
}
```
