# Logic Review 2.1

## Co ma sens

1. **Pasieka jako główny kontekst Pulpitu**  
   To jest poprawne, bo pogoda i pożytek są zależne od lokalizacji pasieki, nie od pojedynczego ula.

2. **Pogoda per pasieka**  
   Logika `getApiaryCoordinates()` obsługuje różne możliwe pola: `latitude`, `longitude`, `location`, `coordinates`. To daje kompatybilność ze starszymi danymi.

3. **Pożytek lokalny, nie globalny**  
   To jest uczciwe. Nie ma udawania globalnego API kwitnienia.

4. **AssetManager**  
   UI idzie w dobrą stronę: grafiki nie powinny być importowane bezpośrednio z plansz referencyjnych.

5. **Mapa pasieki**  
   Używanie istniejącego `mapPosition` bez dodawania pól jest poprawne.

## Do poprawy w kolejnych małych aktualizacjach

1. **Edycja lokalizacji istniejącej pasieki**  
   Obecnie GPS jest dodany w formularzu tworzenia pasieki. Warto dodać identyczny przycisk w ekranie edycji pasieki, jeżeli taki ekran istnieje lub zostanie uporządkowany.

2. **Pobieranie pogody na Pulpicie asynchronicznie**  
   Obecny Pulpit pokazuje stan przygotowany i komunikaty. Docelowo karta pasieki powinna po wejściu odpalić `fetchOpenMeteoWeatherForApiary()` dla każdej widocznej pasieki z lokalizacją, z limitem zapytań.

3. **Jeden aktywny kontekst pasieki**  
   Przy wielu pasiekach warto mieć zapamiętaną ostatnią pasiekę roboczą. Bez nowego modułu, tylko `lastApiaryId` w localStorage.

4. **Edycja pozycji uli na mapie**  
   Mapa wygląda lepiej, ale jeśli użytkownik nie ma ustawionych `mapPosition`, powinna istnieć prosta ścieżka ustawienia pozycji. To osobny update, nie mieszać z GPS.

5. **Czyszczenie starych ekranów i legacy helperów**  
   W source są warstwy kompatybilności. Działają, ale finalnie trzeba zrobić porządek, bo inaczej projekt będzie jak składzik po sezonie.

6. **Pełny test backup/import po nowych polach pasieki**  
   Lokalizacja jest zapisywana w pasiece, więc powinna przejść backup automatycznie. Warto jednak zrobić test E2E eksport/import.

## Wyniki szybkiego skanu

```json
{
  "fallbackWeather": [
    "src/logic/weather20.ts",
    "src/tests/nectarFlowWeather20.test.ts",
    "src/tests/weatherOfflineCache20.test.ts"
  ],
  "missingLocationWeather": [
    "src/logic/weatherAccuracy21.ts",
    "src/logic/apiaryLocation21.ts",
    "src/pages/DashboardPage.tsx",
    "src/pages/WeatherPage.tsx",
    "src/pages/NectarPage.tsx",
    "src/tests/noFakeWeather21.test.ts"
  ],
  "gpsLocation": [
    "src/logic/gpsLocation21.ts",
    "src/pages/CreateApiaryPage.tsx"
  ],
  "dashboardApiaries": [
    "src/logic/apiaryLocation21.ts",
    "src/pages/DashboardPage.tsx",
    "src/tests/dashboardShowsApiaries21.test.ts",
    "src/tests/dashboardDoesNotShowHivesAsMain21.test.ts",
    "src/tests/apiaryCardWeather21.test.ts",
    "src/tests/apiaryCardNectar21.test.ts",
    "src/tests/missingApiaryLocationMessage21.test.ts",
    "src/tests/weatherPerApiary21.test.ts",
    "src/tests/nectarPerApiary21.test.ts"
  ],
  "assetManagerV2": [
    "src/logic/assetManager21.ts",
    "src/tests/hiveVisualOverhaul21.test.ts",
    "src/tests/heroHiveNoWhiteBlob21.test.ts"
  ],
  "oldEmptyText": [
    "src/logic/uxSystem.ts",
    "src/logic/designSystem20.ts",
    "src/logic/rcQuality20.ts",
    "src/tests/emptyStates20.test.ts",
    "src/tests/emptyStatesUxRefresh20.test.ts",
    "src/tests/premiumEmptyStates20.test.ts",
    "src/tests/emptyStatesPremium20.test.ts",
    "src/tests/emptyStatesVisual20.test.ts"
  ]
}
```

## Ocena

Kierunek logiki jest dobry. Najważniejsza zmiana architektoniczna to trzymanie pogody i pożytku przy pasiece, nie przy globalnym Pulpicie. To jest zgodne z realną pracą w pasiece, czyli aplikacja przez chwilę zachowuje się jak ktoś, kto był na zewnątrz.
