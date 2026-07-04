# Sprint 2.0.5 - Icons and visual assets

## Status

- Sprint: 2.0.5
- Wersja aplikacji: BG Apiary v2.0.5
- Zakres: spójny zestaw ikon modułów i grafik aplikacyjnych.

## Dodane ikony modułów

Wszystkie ikony SVG znajdują się w `public/brand/icons/`:

- `dashboard.svg`
- `hives.svg`
- `queens.svg`
- `inspections.svg`
- `tasks.svg`
- `calendar.svg`
- `statistics.svg`
- `weather.svg`
- `settings.svg`
- `notes.svg`
- `gps.svg`
- `alerts.svg`

## Dodane grafiki aplikacyjne

Wszystkie placeholdery SVG znajdują się w `public/brand/placeholders/`:

- `hive-placeholder.svg`
- `queen-placeholder.svg`
- `apiary-placeholder.svg`
- `empty-state.svg`
- `error-state.svg`
- `success-state.svg`

## Integracja w kodzie

Dodano manifest assetów:

- `src/assets/visualAssets.ts`

Dodano komponenty UI:

- `Icon`
- `PlaceholderGraphic`

Eksport znajduje się w `src/components/ui/index.ts`.

## Zasady użycia

- Ikony modułów stosować w nawigacji, kafelkach akcji, pustych stanach i ekranach szczegółów.
- Placeholdery stosować tam, gdzie użytkownik nie dodał jeszcze zdjęć lub danych.
- Nie mieszać losowych emoji z ikonami SVG w nowych widokach, bo aplikacja ma wyglądać jak produkt, a nie tablica korkowa po burzy.

## Testy

Wymagane komendy:

```bash
npm install
npm run build
```
