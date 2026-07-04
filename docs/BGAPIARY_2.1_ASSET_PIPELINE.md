# BgApiary 2.1 Premium Asset Pipeline

## Cel

Profesjonalne wdrożenie assetów BG APIARY do całej aplikacji bez nowych funkcji biznesowych i bez nowych modeli danych.

## Zasada

UI nie używa całych plansz referencyjnych. Każdy ekran korzysta z pojedynczego assetu przez AssetManager.

## AssetManager

Plik:

`src/logic/assetManager21.ts`

Funkcje:

- `getHiveAsset()`
- `getHeroHive()`
- `getMiniHive()`
- `getSeasonHive()`
- `getQueenAsset()`
- `getQueenDot()`
- `getOverlay()`

## Komponenty

Plik:

`src/components/bgapiary/AssetManagerComponents21.tsx`

Komponenty:

- `CleanHiveImage`
- `HiveHeroImage`
- `HiveCardImage`
- `HiveMiniImage`
- `CleanQueenImage`
- `QueenYearDot`
- `HiveOverlay`
- `WeatherIllustration`
- `NectarIllustration`

## Struktura assetów

- `public/assets/bgapiary21/hive/hero`
- `public/assets/bgapiary21/hive/card`
- `public/assets/bgapiary21/hive/list`
- `public/assets/bgapiary21/hive/mini`
- `public/assets/bgapiary21/hive/seasonal`
- `public/assets/bgapiary21/queen`
- `public/assets/bgapiary21/weather`
- `public/assets/bgapiary21/nectar`
- `public/assets/bgapiary21/overlay`
- `public/assets/bgapiary21/icons`

## Kropka matki

Kolor opalitki jest liczony z roku matki i nakładany dynamicznie, bez zmiany modeli danych.

## Sezonowość

Asset sezonowy jest wybierany z daty. Zmienia się wyłącznie prezentacja grafiki.
