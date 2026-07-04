# BgApiary 2.0 Visual Polish Fix

## Cel

Dopracowanie grafiki, spójności UI i jakości wizualnej bez dodawania nowych funkcji, modułów biznesowych ani modeli danych.

## Co poprawiono

- powiększono grafiki uli na kartach i w szczegółach ula,
- dopracowano proporcje grafika/tekst,
- ujednolicono promienie kart,
- ujednolicono cienie,
- dopracowano puste stany,
- dodano subtelne mikroanimacje,
- poprawiono mobile UX,
- utrzymano grafiki referencyjne jako główny styl.

## Grafiki referencyjne

Używane są assety z:

- `public/assets/bgapiary-reference/hives/`
- `public/assets/bgapiary-reference/queens/`
- `public/assets/bgapiary-reference/status/`

## Kropka matki

Kropka jest liczona z `queen.year`:

- 1 / 6: biała,
- 2 / 7: żółta,
- 3 / 8: czerwona,
- 4 / 9: zielona,
- 5 / 0: niebieska.

## Zasady kolorów

- butelkowa zieleń: główny kolor,
- jasna zieleń: akcent,
- złoto: CTA i wyróżnienia,
- krem: tła,
- grafit: tekst,
- czerwony: tylko alarm.

## Zasady cieni

Używana jest jedna skala:

- XS,
- SM,
- MD,
- LG.

## Podgląd techniczny

`docs/BG_APIARY_VISUAL_ASSET_PREVIEW.html`
