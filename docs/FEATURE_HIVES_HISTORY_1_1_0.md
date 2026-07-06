# BG Apiary 1.1.0 - Moduł Ule + Historia Ula

## Cel

Wersja 1.1.0 przenosi do nowej aplikacji pierwszy prawdziwy moduł pracy pszczelarza: **Ule + Historia Ula**.

To jest kręgosłup aplikacji. Bez dobrej karty ula reszta modułów tylko krąży bez celu jak pszczoła w samochodzie.

## Funkcje

### Lista uli

- wyszukiwarka uli,
- filtr statusu,
- karty uli z:
  - nazwą,
  - pasieką,
  - typem ula,
  - statusem,
  - siłą,
  - ostatnim przeglądem,
  - liczbą otwartych zadań,
  - informacją o matce.

### Karta ula

Po wybraniu ula pojawia się panel szczegółów:

- status rodziny,
- siła rodziny,
- ostatni przegląd,
- aktywna/obserwowana matka,
- liczba zdarzeń w historii.

### Szybka aktualizacja

Z karty ula można:

- zmienić status,
- zmienić siłę rodziny,
- zapisać stałą notatkę o ulu.

### Szybkie akcje

Z karty ula można dodać:

- szybki przegląd,
- zadanie „sprawdzić matkę” za 3 dni,
- karmienie 1 l syropu 1:1,
- notatkę do ula.

### Historia ula

Historia łączy dane z:

- przeglądów,
- karmień,
- leczeń,
- zadań,
- notatek,
- matek.

Dane są sortowane od najnowszych.

## Backend

Dodano endpoint:

```http
GET /api/v1/hives/:id/timeline
```

Endpoint zwraca:

- dane ula,
- podsumowanie,
- zagregowaną historię.

Frontend w 1.1.0 buduje historię lokalnie z istniejących list, ale endpoint jest przygotowany pod dalszą optymalizację.

## Brak migracji

Nie dodano nowych tabel. Wersja wykorzystuje istniejące modele:

- Hive,
- Inspection,
- Feeding,
- Treatment,
- Task,
- Note,
- Queen.

## Deploy

```bash
cd /opt/bg-apiary
git fetch origin main
git reset --hard origin/main
git clean -fd -e .env
bash scripts/install.sh
bash scripts/check.sh
```

## Test po deployu

```bash
curl http://127.0.0.1/api/v1/health
curl -i -X POST http://127.0.0.1/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"missing-user@bgapiary.local","password":"x"}'
```

Dla użytkownika: zaloguj się, wejdź w **Ule**, wybierz ul i użyj szybkich akcji.
