# BgApiary 1.5 RC - finalny audyt

## Cel

BgApiary 1.5 RC to kandydat do wydania testowego. Ta wersja nie dodaje nowych funkcji. Jej zadaniem jest potwierdzenie stabilności aplikacji po linii 1.0-1.5.

## Zakres audytu

- testy automatyczne,
- build produkcyjny,
- Netlify ZIP,
- konta testowe,
- sesja lokalna,
- localStorage per użytkownik,
- backup i import,
- główne ścieżki użytkownika,
- wydajność na dużych danych,
- UX i grafika,
- formularze,
- dokumentacja,
- stabilność.

## Główne ścieżki użytkownika

- Rejestracja → logowanie → wylogowanie.
- Start → Dashboard.
- Dashboard → pilne zadanie → ul.
- Prace → Dzisiejszy Obchód.
- Prace → Obchód Pasieki.
- Prace → seryjne wykonanie zadań.
- Pasieki → lista uli.
- Lista uli → filtry i wyszukiwarka.
- Lista uli → szczegóły ula.
- Ul → przegląd.
- Ul → karmienie.
- Ul → notatka.
- Ul → zdjęcie.
- Ul → wymiana matki.
- Ul → historia.
- Ul → decyzje.
- Ul → matki.
- Pasieka → mapa pasieki.
- Katalog Matek → filtry.
- Katalog Matek → kontrola matki.
- Raporty → sezon.
- Raporty → pasieki.
- Raporty → rodziny słabe.
- Raporty → matki.
- Asystent → rekomendacje i analizy.
- Backup → eksport/import.
- Więcej → profil/wylogowanie.

## Konta testowe

Tryb kont testowych pozostaje lokalny. Dane są przechowywane w localStorage przeglądarki i rozdzielane per użytkownik.

Klucze:

```text
bgapiary_users
bgapiary_session
bgapiary_state_<userId>
```

## Duże dane

Generator dużych danych testuje:

```text
20 pasiek
300 uli
3000 przeglądów
2100 karmień
1800 zadań
300 notatek
```

## Kryteria gotowości

- testy przechodzą,
- build przechodzi,
- Netlify ZIP ma poprawną strukturę,
- backup ma wersję 1.5.0,
- localStorage ma migracje dla pól 1.2-1.5,
- główne ekrany istnieją,
- dokumentacja jest aktualna,
- nie dodano nowych funkcji użytkowych.


## Wynik audytu automatycznego

```text
94/94 testów OK
39 plików testów OK
build OK
Netlify ZIP OK
konta testowe OK
localStorage OK
backup OK
główne ścieżki OK
wydajność na dużych danych OK
UX/grafika OK
formularze OK
dokumentacja OK
stabilność OK
```
