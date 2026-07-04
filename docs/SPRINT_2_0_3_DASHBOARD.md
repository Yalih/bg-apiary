# Sprint 2.0.3 - Dashboard v2

## Cel

Sprint 2.0.3 przebudowuje ekran główny BG Apiary tak, aby użytkownik od razu widział najważniejsze dane pasieki: liczbę uli, prace do wykonania, alerty, ostatni przegląd, pogodę, pożytek i kondycję rodzin.

## Zakres wykonany

- Dodano nowy dashboard mobile-first.
- Dodano hero z wersją aplikacji i priorytetem dnia.
- Dodano karty statystyk: ule, otwarte zadania, alerty, ostatni przegląd.
- Dodano panel szybkich akcji: przegląd, ul, zadanie, pasieka.
- Dodano panel stanu pasieki z listą rodzin i paskami siły.
- Dodano sekcję ostatnich przeglądów.
- Dodano widget pogody i pożytku jako UI placeholder pod dalszą integrację.
- Dodano panel najbliższych zadań z możliwością otwarcia lub oznaczenia zadania jako wykonane.
- Dodano osobny arkusz `src/styles/dashboard-v203.css`.

## Pliki dodane

- `src/components/dashboard/DashboardStatCard.tsx`
- `src/components/dashboard/QuickActionsPanel.tsx`
- `src/components/dashboard/WeatherWidget.tsx`
- `src/components/dashboard/InspectionTimeline.tsx`
- `src/components/dashboard/ApiaryStatusPanel.tsx`
- `src/styles/dashboard-v203.css`

## Pliki zmienione

- `src/pages/DashboardPage.tsx`
- `src/App.tsx`
- `index.html`
- `package.json`
- `public/manifest.webmanifest`
- `README.md`
- `CHANGELOG.md`
- `docs/CHANGELOG.md`

## Nie zmieniono

- Nie dodawano backendu.
- Nie dodawano bazy danych.
- Nie zmieniano modeli danych.
- Nie usuwano istniejących funkcji.

## Sprawdzenie

```bash
npm install
npm run build
```

Build produkcyjny musi przejść bez błędów przed wdrożeniem.
