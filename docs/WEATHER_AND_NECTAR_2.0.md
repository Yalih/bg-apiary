# Weather & Nectar 2.0

## Pogoda

Źródło: Open-Meteo API, bez klucza.

Pobierane dane:

- temperatura,
- opad,
- wiatr,
- wilgotność,
- UV,
- zachmurzenie.

## Ocena dla pszczelarza

Status:

- idealnie,
- możliwe,
- niezalecane.

Przykłady:

- dobre warunki: ciepło, bez deszczu, mały wiatr,
- odłóż prace: deszcz, silny wiatr, zimno.

## Cache offline

Pogoda jest zapisywana w localStorage. Gdy API nie odpowiada, aplikacja pokazuje ostatnią prognozę albo fallback.

## Pożytek

Nie ma globalnego API pożytków. BgApiary korzysta z lokalnego kalendarza pożytków użytkownika i łączy go z pogodą.

Status pożytku:

- start,
- pełnia,
- końcówka,
- brak.

Siła:

- słaby,
- średni,
- mocny.
