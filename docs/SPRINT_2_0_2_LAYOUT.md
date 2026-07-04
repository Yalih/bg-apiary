# Sprint 2.0.2 – Layout aplikacji

## Status

- Sprint: **2.0.2**
- Wersja aplikacji: **BG Apiary v2.0.2**
- Zakres: **Application Layout**
- Data: 2026-07-04

## Cel

Sprint 2.0.2 wprowadza rzeczywisty, responsywny szkielet aplikacji BG Apiary bez przebudowy istniejących funkcji biznesowych. Celem jest przygotowanie stabilnej ramy pod kolejne aktualizacje dashboardu, komponentów UI i modułów aplikacji.

## Co zostało wykonane

- Dodano `AppLayout` jako główną ramę aplikacji.
- Dodano górny pasek `TopBar` z logo, wersją i aktualnym widokiem.
- Dodano boczną nawigację desktop `Sidebar`.
- Dodano dolną nawigację mobilną `MobileNav`.
- Dodano wspólną konfigurację elementów nawigacji.
- Dodano `src/styles/layout.css` z responsywnym układem desktop/tablet/mobile.
- Podłączono layout przez istniejący `AppShell`, bez zmiany logiki routingu i danych.
- Zaktualizowano wersję aplikacji do `BG Apiary v2.0.2`.

## Pliki dodane

- `src/layouts/AppLayout.tsx`
- `src/components/navigation/TopBar.tsx`
- `src/components/navigation/Sidebar.tsx`
- `src/components/navigation/MobileNav.tsx`
- `src/components/navigation/navigationItems.ts`
- `src/styles/layout.css`
- `docs/SPRINT_2_0_2_LAYOUT.md`

## Pliki zmodyfikowane

- `src/components/AppShell.tsx`
- `src/main.tsx`
- `index.html`
- `public/manifest.webmanifest`
- `package.json`
- `README.md`
- `docs/CHANGELOG.md`

## Kryteria akceptacji

- Aplikacja zachowuje dotychczasowe funkcje.
- Desktop korzysta z bocznego menu.
- Telefon korzysta z dolnej nawigacji.
- Topbar pokazuje branding i wersję `v2.0.2`.
- Build produkcyjny przechodzi bez błędów.

## Sprawdzenie

```bash
npm install
npm run build
```

## Wdrożenie

```bash
git add .
git commit -m "Sprint 2.0.2 - application layout"
git push
```
