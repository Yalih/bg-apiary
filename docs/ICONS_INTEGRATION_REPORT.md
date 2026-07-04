# ICONS_INTEGRATION_REPORT.md

## Cel

Realne podpięcie ikon i ilustracji BG APIARY w aplikacji, a nie tylko dodanie plików do katalogu.

## Podmienione miejsca

- `src/components/BottomNav.tsx`
  - dolne menu używa `BgApiaryIcon`
  - stabilne nazwy: pulpit, ule, zadania, planSezonu, wiecej

- `src/pages/DashboardPage.tsx`
  - logo / ikona marki
  - ikona zdrowia / powiadomień
  - ikona planu dnia
  - ikony szybkiego dostępu
  - status kart uli
  - ilustracje uli przez `BgApiaryHiveIllustration`

- `src/components/HiveCard.tsx`
  - karty uli używają `BgApiaryHiveIllustration`

- `src/pages/HiveDetailsPage.tsx`
  - kafelki Matka / Czerw / Zapasy / Temperatura / Zdrowie / Pożytek / Magazyn / Plan używają `BgApiaryIcon`
  - hero ula używa `BgApiaryHiveIllustration`

- `src/pages/WeatherPage.tsx`
  - ekran Pogoda używa `BgApiaryIcon`

- `src/pages/NectarPage.tsx`
  - ekran Pożytek używa `BgApiaryIcon` i `BgApiaryIllustration`

## Dodane pliki

- `src/logic/bgApiaryAssets.ts`
- `src/components/bgapiary/BgApiaryIcon.tsx`
- `src/components/bgapiary/BgApiaryIllustration.tsx`
- `src/components/bgapiary/BgApiaryPremiumCards.tsx`
- `src/styles/bgApiaryAssetPack.css`

## Poprawione mapowanie

Dodano stabilne aliasy ikon:

- pulpit
- ule
- pasieki
- matka
- czerw
- pogoda
- pozytek
- zdrowie
- magazyn
- miod
- raporty
- planSezonu
- zadania
- historia
- zdjecia
- notatki
- backup
- synchronizacja
- konto
- alarmy
- wiecej

## Pozostałości

Nie usuwano znaków `!` w plikach logiki, testów i operatorach TypeScript, bo nie są to widoczne ikony UI.

## Braki ikon

Niektóre miejsca mogą używać najbliższych ikon zastępczych, np.:

- centralny plus: `zadania`
- rekomendacja: `zdrowie`
- historia techniczna: `historia`

## Decyzje do zatwierdzenia

- Czy centralny plus ma dostać osobną ikonę SVG?
- Czy wszystkie ikony menu „Więcej” mają być podmienione w następnym kroku ekran po ekranie?
- Czy ilustracje uli mają być użyte także w raportach i historii?
