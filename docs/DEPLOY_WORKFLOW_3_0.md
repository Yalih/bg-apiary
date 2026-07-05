# Deploy Workflow 3.0

## Cel

Nowy pipeline buduje aplikację BG Apiary w GitHub Actions i wysyła na VPS wyłącznie gotowy katalog `dist`. VPS nie instaluje już zależności npm i nie wykonuje builda.

## Najważniejsze zmiany

- Node.js 20 LTS w GitHub Actions.
- Cache npm na podstawie `package-lock.json`.
- Wymuszenie publicznego rejestru npm: `https://registry.npmjs.org/`.
- Walidacja `package-lock.json`, żeby wykryć wewnętrzne adresy typu `applied-caas`.
- Build wykonywany na GitHubie.
- Upload tylko katalogu `dist` na VPS.
- Publikacja przez Nginx po stronie VPS.
- Test `nginx -t` przed przeładowaniem usługi.

## Problem naprawiony

Poprzedni `package-lock.json` zawierał adresy wewnętrznego rejestru:

```txt
packages.applied-caas-gateway...
```

To powodowało timeouty podczas `npm install` i `npm ci` poza środowiskiem, w którym lock został pierwotnie wygenerowany.

## Komenda wdrożenia

```bash
git add .
git commit -m "Deploy 3.0 - stable GitHub Actions pipeline"
git push
```

## Oczekiwany przebieg GitHub Actions

1. Checkout repository
2. Setup Node.js 20 LTS
3. Show environment
4. Force public npm registry
5. Validate package lock
6. Install dependencies
7. Build application
8. Verify dist
9. Upload dist to VPS
10. Publish on VPS

