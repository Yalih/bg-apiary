# BG Apiary v2.0.9

**Smart Beekeeping Management**

BG Apiary to aplikacja dla pszczelarzy do prowadzenia pasiek, uli, przeglądów, zadań, pogody, pożytków i raportów.

## Aktualna wersja

- Sprint: **2.0.9**
- Wersja aplikacji: **BG Apiary v2.0.9**
- Zakres: **Final polish Sprintu 2.0 i przygotowanie do Sprintu 3.0**

## Co zawiera Sprint 2.0

- `2.0.1` - branding i design system.
- `2.0.2` - layout aplikacji.
- `2.0.3` - dashboard v2.
- `2.0.4` - system komponentów UI.
- `2.0.5` - ikony i grafiki aplikacyjne.
- `2.0.6` - tryb jasny/ciemny/systemowy.
- `2.0.7` - responsywność i mobile polish.
- `2.0.8` - PWA i instalacja aplikacji.
- `2.0.9` - final polish UI, porządek wersji i przygotowanie do modułu Ule.

## Sprint 2.0.9

- Ujednolicono numerację wersji w aplikacji, topbarze, `index.html`, manifeście i dokumentacji.
- Dodano `src/version.ts` jako jedno miejsce prawdy dla wersji widocznej w UI.
- Dodano `src/styles/final-polish.css` dla spójności layoutu, dashboardu, PWA/offline i trybów kolorystycznych.
- Uporządkowano dokumentację końcową Sprintu 2.0.
- Przygotowano wejście do Sprintu 3.0: Moduł Ule.

## Development

```bash
npm install
npm run build
```

## Wdrożenie

```bash
git add .
git commit -m "Sprint 2.0.9 - final UI polish"
git push
```

Po `git push` GitHub Actions wdraża aplikację na `https://bgapiary.pro`.
