# BG Apiary Design System v2.0.1

Sprint 2.0.1 wprowadza pierwszy rzeczywisty design system dla BG Apiary. System jest oparty o tokeny CSS w pliku:

```text
src/styles/design-tokens.css
```

## Założenia wizualne

BG Apiary ma wyglądać jak profesjonalna aplikacja premium dla pszczelarzy: spokojna, czytelna, nowoczesna i wygodna w użyciu w terenie.

## Branding

- Nazwa: **BG Apiary**
- Wersja: **v2.0.1**
- Slogan: **Smart Beekeeping Management**
- Motyw: pszczoła + sześciokąt/plaster miodu

## Kolory główne

| Token | Zastosowanie |
|---|---|
| `--color-honey-500` | główny kolor marki |
| `--color-honey-400` | akcenty i highlight |
| `--color-honey-700` | mocny akcent, tekst na jasnym tle |
| `--color-graphite-950` | ciemne tło premium |
| `--color-graphite-900` | powierzchnie ciemne |
| `--color-white` | biel i powierzchnie jasne |

## Statusy

| Token | Znaczenie |
|---|---|
| `--status-ok` | stan dobry, wykonane, zdrowe |
| `--status-warning` | ostrzeżenie, wymaga uwagi |
| `--status-danger` | problem, pilne działanie |
| `--status-info` | informacja, neutralny komunikat |

## Tryby

Design system obsługuje:

- tryb jasny jako domyślny,
- tryb ciemny przez `.theme-dark` lub `[data-theme="dark"]`,
- automatyczny tryb ciemny przez `prefers-color-scheme`, jeśli aplikacja nie wymusi `data-theme="light"`.

## Typografia

Główna rodzina fontów:

```css
--font-sans: Inter, Poppins, ui-sans-serif, system-ui, ...
--font-display: Poppins, Inter, ui-sans-serif, system-ui, ...
```

## Spacing

Tokeny spacingu od `--space-1` do `--space-12` pozwalają utrzymać rytm i porządek w kolejnych sprintach.

## Radiusy

- `--radius-sm` - małe elementy,
- `--radius-md` - przyciski i karty kompaktowe,
- `--radius-lg` - większe karty,
- `--radius-xl` - hero, panele, layout premium,
- `--radius-pill` - badge i pill buttons.

## Cienie

- `--shadow-sm`
- `--shadow-md`
- `--shadow-lg`
- `--shadow-brand`

## Pliki brandingu

```text
public/brand/bg-apiary-logo.svg
public/brand/bg-apiary-logo-dark.svg
public/brand/bg-apiary-icon.svg
public/favicon.svg
public/icons/icon-192.png
public/icons/icon-512.png
```

## Kolejny krok

Sprint 2.0.2 powinien wykorzystać te tokeny do realnej przebudowy dashboardu. Nie należy już dopisywać nowych kolorów bezpośrednio w komponentach, bo wtedy znowu powstanie wizualny bazar, a takich atrakcji mamy w życiu wystarczająco dużo.
