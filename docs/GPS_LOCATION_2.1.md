# GPS Location 2.1

## Cel

Dodano przycisk „Dodaj lokalizację GPS” w formularzu dodawania pasieki.

## Działanie

- przeglądarka pyta użytkownika o zgodę na lokalizację,
- aplikacja pobiera `latitude` i `longitude`,
- pola lokalizacji pasieki wypełniają się automatycznie,
- dane są zapisywane bezpośrednio w pasiece,
- pogoda Open-Meteo korzysta potem ze współrzędnych tej pasieki.

## Komunikaty

- „Pobieram lokalizację GPS...”
- „Zapisano lokalizację GPS...”
- „Nie udzielono zgody na lokalizację GPS.”
- „Ta przeglądarka nie obsługuje lokalizacji GPS.”

## Bez zmian

Nie zmieniono modeli biznesowych uli, backupu, importu/eksportu, zdrowia, magazynu ani miodobrań.
