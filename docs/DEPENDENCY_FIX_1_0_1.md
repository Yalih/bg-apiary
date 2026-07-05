# BG Apiary 1.0.1 Dependency Fix

## Przyczyna

Build frontendu potrafił zatrzymać się z błędem:

```text
Cannot find package '@vitejs/plugin-react'
```

Problem wynikał z zależności frontendu i starych locków zależności. Projekt używa `vite.config.ts`, który importuje:

```ts
import react from '@vitejs/plugin-react';
```

Dlatego paczka musi być dostępna podczas builda.

## Poprawka

- `@vitejs/plugin-react` jest w `frontend/devDependencies`.
- Dodano `.npmrc` z publicznym npm registry.
- Usunięto stare `package-lock.json`.
- Dockerfile frontendu i backendu używa `npm install`, a nie `npm ci`.
- Dodano root `package.json`, więc komenda `npm run build` działa z katalogu głównego.
- Dodano skrypty czyszczenia i builda dla Windows/Linux.

## Komenda Windows

```powershell
.\scripts\dev-clean-build.ps1
```

## Komenda Linux/VPS

```bash
bash scripts/install.sh
```
