# BgApiary 2.1 Hive Visual Overhaul

## Cel

Wymiana słabych grafik ula i matki na czyste, autorskie assety SVG bez zmiany logiki aplikacji.

## Co zmieniono

- Dodano katalog `public/assets/bgapiary21v2`.
- Ule są pojedynczymi assetami SVG, bez podpisów i bez sąsiednich grafik.
- Matka jest jedną bazową grafiką `queen_base.svg`.
- Opalitka jest nakładana dynamicznie jako osobny asset SVG według roku.
- Kropka została ustawiona na tułowiu królowej, nie jako przypadkowy znacznik obok.
- Overlay statusu jest osobnym SVG.
- AssetManager 2.1 wskazuje na nowe assety `bgapiary21v2`.

## Zasady

- Jeden ul = jeden asset.
- Hero, card, list i mini korzystają z tej samej rodziny assetów.
- Kropka matki:
  - 2021/2026 biała,
  - 2022/2027 żółta,
  - 2023/2028 czerwona,
  - 2024/2029 zielona,
  - 2025/2030 niebieska.
- Nie używać pełnych plansz referencyjnych w UI.
