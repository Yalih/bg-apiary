# BgApiary 2.0 Professional Asset Integration Fix

## Cel

Naprawienie sposobu użycia grafik w UI. Aplikacja ma używać pojedynczych, czystych assetów, a nie całych plansz referencyjnych lub przypadkowo przyciętych fragmentów.

## Struktura assetów

UI korzysta z:

- `public/assets/bgapiary-clean/hives/mini/`
- `public/assets/bgapiary-clean/hives/card/`
- `public/assets/bgapiary-clean/hives/hero/`
- `public/assets/bgapiary-clean/queens/`
- `public/assets/bgapiary-clean/status/`

Pełne plansze referencyjne mogą służyć wyłącznie jako podgląd w dokumentacji.

## Mapping

Dodano:

- `src/logic/bgApiaryCleanAssets.ts`

Funkcje:

- `getCleanHiveAssetByStrength()`
- `getCleanHiveAssetByState()`
- `getCleanQueenAssetByStatus()`
- `getQueenDotByYear()`
- `getStatusOverlayAsset()`

## Komponenty

Dodano:

- `CleanHiveImage`
- `CleanQueenImage`
- `QueenYearDot`
- `HiveStatusOverlay`
- `HiveVisualCard`

## Kropka matki

Kolor opalitki jest liczony z roku:

- 1 / 6: biała,
- 2 / 7: żółta,
- 3 / 8: czerwona,
- 4 / 9: zielona,
- 5 / 0: niebieska.

## Zakaz

W UI nie wolno używać:

- całych plansz referencyjnych,
- plików `preview`,
- assetów z widocznymi podpisami,
- assetów z sąsiednimi ulami.
