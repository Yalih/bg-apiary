# Weather Accuracy 2.1

## Cel

Pogoda jest liczona dla lokalizacji pasieki, a nie jako stały fallback.

## Zasady

- Jeżeli jest jeden ul lub jedna pasieka, aplikacja wybiera pasiekę automatycznie.
- Jeżeli użytkownik jest w kontekście ula, pogoda dotyczy pasieki tego ula.
- Jeżeli pasieka nie ma współrzędnych, aplikacja pokazuje komunikat: „Dodaj lokalizację pasieki, aby pokazać dokładną pogodę”.
- Dane pobierane są z Open-Meteo bez klucza API.
- Cache jest zapisywany w localStorage.
- Offline pokazywana jest ostatnia prognoza.

## Algorytm pracy

- dobre warunki: temperatura powyżej 15°C, brak deszczu, wiatr słaby lub umiarkowany,
- możliwe: chłodno lub mniej idealne warunki,
- niezalecane: deszcz, silny wiatr, zimno, burza lub upał.
