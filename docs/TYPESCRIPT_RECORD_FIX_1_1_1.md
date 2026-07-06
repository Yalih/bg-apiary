# BG Apiary 1.1.1 - TypeScript record render fix

## Naprawiony błąd

Deploy 1.1.0 padał podczas budowania frontendu:

```text
src/App.tsx:654,672 - error TS2339:
Property 'product' does not exist on type 'Queen | Treatment'.
```

## Przyczyna

W widoku prostych modułów jeden renderer próbował odczytać różne pola z różnych typów danych:

- `Queen.line`,
- `Feeding.type`,
- `Treatment.product`,
- `Task.title`.

TypeScript nie był w stanie bezpiecznie zawęzić typu i zatrzymał build. Komputer wygrał zawody w byciu przesadnie ostrożnym.

## Poprawka

- Dodano `recordTitle(...)`.
- Dodano `recordSubtitle(...)`.
- `RecordsView` używa jawnego typu `Array<Queen | Feeding | Treatment | Task>`.
- Frontend build nie powinien już paść na polu `product`.

## HTTP 502 po nieudanym deployu

502 oznacza, że Nginx nie dostał odpowiedzi z API. Po nieudanym deployu API mogło zostać zatrzymane albo wymienione częściowo.

Dodano skrypt awaryjny:

```bash
bash scripts/recover-api-502.sh
```

## Deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```
