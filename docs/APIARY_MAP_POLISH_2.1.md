# BgApiary 2.1 Apiary Map Polish

## Cel

Poprawa wyłącznie ekranu Mapy pasieki bez dodawania nowych funkcji, modułów i modeli danych.

## Zmieniono

- przebudowano widok mapy na styl premium BG APIARY,
- dodano nagłówek z nazwą pasieki, lokalizacją i liczbą uli,
- dodano legendę OK / Uwaga / Alarm / Bez pozycji,
- kafel ula pokazuje miniaturę ula, status, opalitkę matki, pasek siły i ostatni przegląd,
- ule bez `mapPosition` są pokazane w sekcji „Bez pozycji na mapie”,
- puste stany używają konkretnych akcji zamiast „Brak danych”,
- poprawiono mobile dla 390 px i 430 px,
- kafle są przyciskami z `aria-label`.

## Zachowano

- istniejące `mapPosition`,
- modele danych,
- backup,
- import/export,
- logikę uli.

## Zasady statusów

- OK: zielony,
- Uwaga: złoty,
- Alarm: czerwony,
- Brak pozycji: szary.
