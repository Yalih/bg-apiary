# Sprint 2.0.8 - PWA i instalacja aplikacji

## Cel

Przygotować BG Apiary do instalacji jako aplikacja PWA na telefonach i komputerach bez dodawania backendu ani zmiany istniejących modułów biznesowych.

## Zakres wykonany

### Manifest PWA

Zaktualizowano `public/manifest.webmanifest`:

- `name`: `BG Apiary v2.0.8`,
- `short_name`: `BG Apiary`,
- `theme_color`: `#ffb703`,
- `background_color`: `#fff8e6`,
- `id`, `scope`, `orientation`, `categories`, `lang`,
- ikony `192x192`, `512x512` i favicon SVG,
- skróty aplikacji dla dashboardu i zadań.

### Meta tagi

W `index.html` dodano i uporządkowano:

- `theme-color`,
- `apple-mobile-web-app-capable`,
- `apple-mobile-web-app-status-bar-style`,
- `apple-mobile-web-app-title`,
- `application-name`,
- manifest,
- Apple touch icons.

### Service worker

Dodano `public/sw.js`:

- cache app shell,
- cache plików brandingu i ikon,
- usuwanie starych cache przy aktywacji,
- fallback do `offline.html` dla nawigacji bez internetu,
- prosty runtime cache dla plików statycznych.

### Rejestracja

Dodano `src/pwa/registerServiceWorker.ts` i podłączono go w `src/main.tsx`.

### Offline fallback

Dodano `public/offline.html` jako prosty komunikat offline z brandingiem BG Apiary.

## Pliki dodane

- `public/sw.js`
- `public/offline.html`
- `src/pwa/registerServiceWorker.ts`
- `docs/SPRINT_2_0_8_PWA.md`

## Pliki zmienione

- `index.html`
- `public/manifest.webmanifest`
- `src/main.tsx`
- `src/components/navigation/TopBar.tsx`
- `package.json`
- `README.md`
- `CHANGELOG.md`
- `docs/CHANGELOG.md`

## Sprawdzenie

```bash
npm install
npm run build
```

## Wdrożenie

```bash
git add .
git commit -m "Sprint 2.0.8 - PWA installation support"
git push
```
