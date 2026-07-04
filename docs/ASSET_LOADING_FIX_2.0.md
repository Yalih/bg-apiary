# Asset Loading Fix 2.0

## Problem

Po wdrożeniu część grafik nie wczytywała się, ponieważ pipeline nadpisał katalog `assets/bgapiary`, a nie przeniósł wszystkich plików używanych przez starszą warstwę UI.

Brakowało głównie:

- ikon SVG w `assets/bgapiary/icons/`,
- ilustracji pogody w `assets/bgapiary/weather/`,
- ilustracji pożytków w `assets/bgapiary/nectar/`.

## Naprawa

Dodano brakujące pliki SVG do:

- `public/assets/bgapiary/icons/`,
- `public/assets/bgapiary/weather/`,
- `public/assets/bgapiary/nectar/`,
- `src/assets/bgapiary/icons/`,
- `src/assets/bgapiary/weather/`,
- `src/assets/bgapiary/nectar/`.

## Test

Sprawdzono ścieżki assetów w gotowym `dist`:

- `/assets/bgapiary/hive/card/srednia.png` OK,
- `/assets/bgapiary/hive/hero/silna.png` OK,
- `/assets/bgapiary/hive/mini/64/bardzo_silna.png` OK,
- `/assets/bgapiary/hive/seasonal/summer/silna.png` OK,
- `/assets/bgapiary/queen/base/queen_base.png` OK,
- `/assets/bgapiary/queen/dots/yellow.png` OK,
- `/assets/bgapiary/overlays/ok.png` OK,
- `/assets/bgapiary/weather/pogoda-slonce.svg` OK,
- `/assets/bgapiary/nectar/pozytek-lipa.svg` OK,
- `/assets/bgapiary/icons/01_pulpit.svg` OK.

Wynik: brak brakujących statycznych assetów w gotowym ZIP-ie Netlify.
