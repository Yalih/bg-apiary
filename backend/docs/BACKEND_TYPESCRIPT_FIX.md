# Backend TypeScript Fix

## Problem

Podczas budowania backendu TypeScript próbował ładować niepotrzebne typy z frontendu/Babela, m.in. `react`, `react-dom`, `prop-types`, `babel__core`, `babel__generator`, `babel__template`, `babel__traverse`, `estree`.

Backend Express nie powinien tego robić.

## Poprawka

W `backend/tsconfig.json` dodano jawne ograniczenie typów używanych przez backend:

```json
"types": [
  "node",
  "express",
  "cors",
  "jsonwebtoken",
  "swagger-jsdoc",
  "swagger-ui-express"
]
```

Dzięki temu `tsc` nie skanuje przypadkowych typów z frontendu i Babela.

## Sprawdzenie

```bash
cd backend
npm install
npm run build
```
