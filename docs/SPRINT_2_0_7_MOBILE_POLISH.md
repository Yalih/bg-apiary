# Sprint 2.0.7 - Mobile responsive polish

## Cel

Dopracowanie interfejsu BG Apiary na telefonach i tabletach bez dodawania nowych funkcji biznesowych. Ten sprint poprawia wygodę użycia aplikacji w terenie, czyli dokładnie tam, gdzie pszczelarz używa telefonu przy ulu, zamiast walczyć z miniaturowym przyciskiem jak z trutniem w rękawie.

## Zakres wykonany

- Dodano `src/styles/mobile-polish.css`.
- Dopracowano mobile-first dashboard.
- Poprawiono topbar na telefonie.
- Dopracowano mobile bottom nav.
- Poprawiono odstępy, wielkości kart i przycisków na małych ekranach.
- Dodano obsługę `safe-area` dla iPhone/Android.
- Poprawiono widok tabletowy.
- Zaktualizowano wersję do `BG Apiary v2.0.7`.

## Pliki

- `src/styles/mobile-polish.css`
- `src/main.tsx`
- `src/components/navigation/TopBar.tsx`
- `src/pages/DashboardPage.tsx`
- `index.html`
- `package.json`
- `public/manifest.webmanifest`
- `README.md`
- `CHANGELOG.md`
- `docs/CHANGELOG.md`
- `docs/SPRINT_2_0_7_MOBILE_POLISH.md`

## Założenia UI

- Minimalna szerokość aplikacji: 320 px.
- Większe pola dotyku dla elementów interaktywnych.
- Mobile nav pozostaje czytelny na małych ekranach.
- Topbar pozostaje sticky i nie zasłania treści.
- Dashboard zachowuje hierarchię informacji na telefonie i tablecie.

## Sprawdzenie

```bash
npm install
npm run build
```

## Commit

```bash
git add .
git commit -m "Sprint 2.0.7 - mobile responsive polish"
git push
```
