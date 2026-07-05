# BG Apiary 1.0 MASTER PLAN

**Status:** dokument strategiczny dla wersji 1.0 Production  
**Projekt:** BG Apiary  
**Cel:** zbudowanie nowoczesnej aplikacji dla pszczelarzy od zera, na stabilnym fundamencie produktowym, technicznym i wizualnym.  
**Wersja dokumentu:** 1.0  
**Data:** 2026-07-05  

---

## 1. Główna decyzja

BG Apiary 1.0 nie będzie łataniem obecnego prototypu.

Obecny projekt traktujemy jako:

- prototyp funkcjonalny,
- źródło wymagań,
- lekcję techniczną,
- dowód, że kierunek ma sens.

Wersję **BG Apiary 1.0 Production** budujemy jako czystą, przemyślaną aplikację:

- z nowoczesnym UI/UX,
- z backendem i PostgreSQL,
- z trybem mobilnym,
- z możliwością pracy offline,
- z instalacją produkcyjną na VPS,
- z jasną architekturą,
- z gotowością do dalszego rozwoju.

Nie robimy kolejnego cyfrowego ula skleconego z przypadkowych desek. Tym razem ma to być konstrukcja, która stoi prosto, nawet gdy ktoś wpisze `npm install`.

---

## 2. Wizja produktu

**BG Apiary** ma być aplikacją do codziennego prowadzenia pasieki, stworzoną z myślą o realnej pracy przy ulach.

Nie ma być tabelką w telefonie.  
Nie ma być notatnikiem udającym system.  
Nie ma być aplikacją, która wygląda dobrze tylko na monitorze programisty w klimatyzowanym pokoju, bo pszczoły, jak wiadomo, nie prowadzą startupu w coworkingu.

BG Apiary ma działać tam, gdzie pszczelarz naprawdę jej potrzebuje:

- przy ulu,
- na telefonie,
- w słońcu,
- często bez internetu,
- szybko,
- czytelnie,
- bez przeklikiwania się przez dziesięć ekranów.

---

## 3. Cel wersji 1.0

Wersja 1.0 ma umożliwiać pełne podstawowe prowadzenie pasieki.

### BG Apiary 1.0 musi obsługiwać:

1. zakładanie konta i logowanie,
2. tworzenie pasiek,
3. tworzenie uli,
4. szybkie przeglądy uli,
5. historię ula,
6. prowadzenie informacji o matkach,
7. karmienia,
8. leczenia,
9. zadania i przypomnienia,
10. notatki,
11. zdjęcia,
12. podstawowe raporty,
13. działanie jako PWA,
14. pracę mobilną,
15. tryb offline,
16. synchronizację danych,
17. stabilne wdrożenie na VPS,
18. automatyczną diagnostykę systemu.

---

## 4. Czego nie robimy w wersji 1.0

Żeby nie zbudować potwora przed zbudowaniem szkieletu, wersja 1.0 nie zawiera:

- sklepu internetowego,
- społeczności pszczelarzy,
- płatności,
- rozbudowanego AI,
- zaawansowanej analityki produkcyjnej,
- map pożytków w czasie rzeczywistym,
- integracji z wagami ulowymi,
- integracji z czujnikami IoT,
- rozbudowanego systemu wielu ról w dużej firmie,
- aplikacji natywnej Android/iOS.

Te rzeczy mogą wejść później, ale dopiero po stabilnej wersji 1.0. Najpierw fundament, potem ozdobny dach i złote klamki.

---

## 5. Grupa docelowa

### 5.1 Początkujący pszczelarz

Potrzebuje:

- prostego prowadzenia uli,
- przypomnień,
- historii przeglądów,
- podpowiedzi, co sprawdzić,
- ograniczenia chaosu.

### 5.2 Pszczelarz hobbystyczny

Potrzebuje:

- szybkich przeglądów,
- historii rodzin,
- zadań,
- informacji o matkach,
- karmienia i leczenia,
- zdjęć,
- eksportu danych.

### 5.3 Pszczelarz półprofesjonalny

Potrzebuje:

- wielu pasiek,
- raportów,
- filtrowania uli,
- statusów rodzin,
- przypomnień,
- pracy w terenie,
- stabilnej synchronizacji.

---

## 6. Fundament emocjonalny marki

BG Apiary ma komunikować:

- spokój,
- kontrolę,
- nowoczesność,
- zaufanie,
- porządek,
- bliskość natury,
- profesjonalizm bez nadęcia.

Aplikacja ma sprawiać wrażenie, że ktoś rozumie pszczelarstwo, a nie tylko dorzucił ikonę pszczoły do formularza. Ludzkość już wystarczająco nacierpiała się od aplikacji, które “są dla branży”, ale wyglądają jak arkusz kalkulacyjny po wypadku.

---

# 7. Pierwsze wrażenie: ekran logowania i rejestracji

To jest bardzo ważne.

Pierwszy ekran BG Apiary ma robić efekt:

> “To wygląda jak prawdziwy produkt. Chcę tego używać.”

Nie ma być zwykłego formularza z dwoma polami i przyciskiem “Zaloguj”. To byłoby technicznie poprawne, czyli najbardziej nudny rodzaj porażki.

---

## 7.1 Cel pierwszego ekranu

Pierwszy ekran ma:

1. pokazać markę BG Apiary,
2. wytłumaczyć, po co istnieje aplikacja,
3. wzbudzić zaufanie,
4. zachęcić do założenia konta,
5. działać świetnie na telefonie,
6. wyglądać nowocześnie,
7. ładować się szybko,
8. nie przytłaczać użytkownika.

---

## 7.2 Układ ekranu startowego

### Mobile first

Na telefonie ekran powinien wyglądać tak:

```text
------------------------------------------------
Logo BG Apiary

Twoja pasieka pod kontrolą.
Przeglądy, matki, karmienia, leczenie i zadania
w jednym miejscu.

[ Załóż konto ]
[ Zaloguj się ]

✓ Działa w terenie
✓ Historia każdego ula
✓ Przypomnienia i zadania
✓ Gotowe na pracę offline

Delikatna grafika / ilustracja uli / pszczół / pasieki
------------------------------------------------
```

### Desktop

Na większym ekranie:

```text
-------------------------------------------------------------
LEWA STRONA                         PRAWA STRONA

Logo BG Apiary                      Karta logowania
Hasło główne                        Email
Opis                                Hasło
Lista korzyści                      [ Zaloguj ]
Ilustracja / mockup aplikacji       [ Załóż konto ]
-------------------------------------------------------------
```

---

## 7.3 Tekst marki na ekranie startowym

### Główne hasło

**BG Apiary**  
**Nowoczesne zarządzanie pasieką.**

### Alternatywne hasła

- **Twoja pasieka pod kontrolą.**
- **Przeglądy, matki, karmienia i leczenie w jednym miejscu.**
- **Mniej chaosu przy ulach. Więcej decyzji opartych na historii.**
- **Pamięć dla Twojej pasieki.**

### Krótki opis

BG Apiary pomaga prowadzić pasiekę w sposób uporządkowany: zapisuj przeglądy, śledź matki, planuj karmienia, kontroluj leczenie i wracaj do historii każdego ula w kilka sekund.

---

## 7.4 Efekt “wow”

Efekt “wow” nie oznacza fajerwerków, konfetti i animacji, które spalą baterię telefonu szybciej niż podkurzacz próchno.

Efekt “wow” ma wynikać z:

- świetnej typografii,
- dużego czytelnego logo,
- eleganckiego tła,
- delikatnej animacji,
- pięknych kart,
- jasnego przekazu,
- poczucia jakości.

### Propozycja wizualna

Motyw:

- ciemny grafit / ciepły krem,
- akcent miodowy,
- subtelny gradient,
- delikatne linie przypominające plastry,
- zdjęcie/ilustracja pasieki w tle,
- karta logowania z efektem szkła lub miękkiego cienia.

### Ważne

Ekran musi być czytelny w słońcu. Jeżeli wygląda pięknie tylko w ciemnym pokoju, to może sobie kandydować do galerii sztuki, nie do pasieki.

---

## 7.5 Rejestracja

Proces rejestracji powinien być krótki.

### Pola podstawowe

- imię,
- email,
- hasło,
- powtórz hasło.

### Po rejestracji

Użytkownik przechodzi przez szybki onboarding:

1. nazwa pasieki,
2. lokalizacja pasieki,
3. typ uli,
4. liczba uli,
5. pierwszy ul,
6. gotowe.

Nie wolno wrzucać użytkownika do pustego dashboardu. Pusty dashboard to cyfrowe “no i radź sobie człowieku”.

---

## 7.6 Onboarding po założeniu konta

### Ekran 1: Powitanie

```text
Witaj w BG Apiary.
Zacznijmy od utworzenia Twojej pierwszej pasieki.
```

### Ekran 2: Dane pasieki

- nazwa pasieki,
- miejscowość,
- opcjonalnie opis.

### Ekran 3: Typ uli

- Warszawski poszerzany,
- Dadant,
- Wielkopolski,
- Langstroth,
- inny.

### Ekran 4: Dodaj pierwsze ule

Opcje:

- dodaj jeden ul,
- dodaj zakres, np. ul 1-5,
- później.

### Ekran 5: Gotowe

```text
Pasieka gotowa.
Możesz dodać pierwszy przegląd albo przejść do dashboardu.
```

---

# 8. UI/UX Design System

## 8.1 Założenia

Design system ma być:

- nowoczesny,
- prosty,
- czytelny,
- mobilny,
- elegancki,
- szybki,
- odporny na realne warunki pracy.

Nie projektujemy aplikacji do oglądania na Behance. Projektujemy narzędzie do używania przy ulu.

---

## 8.2 Styl wizualny

### Kolory główne

- **Miodowy akcent:** kolor głównych akcji, statusów pozytywnych, elementów marki.
- **Grafit:** tło trybu ciemnego, nagłówki, mocny kontrast.
- **Krem:** tło trybu jasnego, naturalna miękkość.
- **Zieleń:** zdrowa rodzina / OK.
- **Żółty:** obserwuj.
- **Czerwony:** interwencja.
- **Niebieski:** informacja / pogoda.
- **Szary:** brak danych.

### Tryby

- jasny,
- ciemny,
- automatyczny według systemu.

### Ważne

Tryb jasny musi być priorytetem dla pracy w słońcu. Tryb ciemny jest świetny wieczorem, ale przy ulu telefon w ciemnym motywie często wygląda jak czarna cegła z ikonami.

---

## 8.3 Typografia

Zasady:

- duże nagłówki,
- krótkie etykiety,
- czytelne liczby,
- minimum drobnego tekstu,
- wysoki kontrast,
- dobre odstępy.

### Przykłady

- H1: nazwa ekranu,
- H2: sekcje,
- body: opisy,
- label: pola formularzy,
- status: krótka informacja,
- badge: stan ula.

---

## 8.4 Komponenty

Wersja 1.0 potrzebuje własnego zestawu komponentów:

- Button,
- Card,
- Input,
- Select,
- Checkbox,
- Switch,
- Badge,
- StatusPill,
- HiveCard,
- ApiaryCard,
- InspectionCard,
- QueenCard,
- TaskCard,
- BottomNavigation,
- MobileHeader,
- EmptyState,
- LoadingState,
- ErrorState,
- OfflineBanner,
- SyncStatus,
- FloatingActionButton.

---

## 8.5 Nawigacja

### Mobile

Dolny pasek:

1. Dashboard,
2. Ule,
3. Dodaj,
4. Zadania,
5. Więcej.

Środkowy przycisk “Dodaj” powinien prowadzić do szybkich akcji:

- dodaj przegląd,
- dodaj karmienie,
- dodaj leczenie,
- dodaj notatkę,
- dodaj zdjęcie.

### Desktop

Lewy sidebar:

- Dashboard,
- Pasieki,
- Ule,
- Przeglądy,
- Matki,
- Karmienia,
- Leczenie,
- Zadania,
- Raporty,
- Ustawienia.

---

# 9. Najważniejsze flow użytkownika

## 9.1 Flow: pierwszy start

1. Wejście na aplikację.
2. Ekran wow z logo i opisem.
3. Rejestracja.
4. Onboarding.
5. Utworzenie pierwszej pasieki.
6. Dodanie uli.
7. Dashboard z realnymi danymi.

## 9.2 Flow: szybki przegląd ula

1. Otwieram aplikację.
2. Wybieram ul.
3. Klikam “Dodaj przegląd”.
4. Wypełniam szybkie pola.
5. Dodaję notatkę lub zdjęcie.
6. Tworzę zadanie po przeglądzie.
7. Zapisuję.
8. Aplikacja aktualizuje status ula.

## 9.3 Flow: praca offline

1. Jadę do pasieki.
2. Brak internetu.
3. Aplikacja działa.
4. Dodaję przegląd.
5. Dane zapisują się lokalnie.
6. Pojawia się status “Do synchronizacji”.
7. Po powrocie internetu aplikacja synchronizuje dane.
8. Użytkownik widzi, czy wszystko poszło poprawnie.

---

# 10. Moduły aplikacji

## 10.1 Dashboard

Dashboard ma odpowiadać na pytania:

- co wymaga uwagi?
- co mam dziś zrobić?
- które ule nie były dawno sprawdzane?
- gdzie są problemy?
- jaka jest kondycja pasieki?

### Elementy

- liczba pasiek,
- liczba uli,
- liczba rodzin wymagających uwagi,
- zadania na dziś,
- ostatnie przeglądy,
- alerty,
- pogoda,
- szybkie akcje.

---

## 10.2 Pasieki

### Dane pasieki

- nazwa,
- lokalizacja,
- opis,
- typ pasieki,
- liczba uli,
- status,
- ostatni przegląd,
- aktywność.

### Funkcje

- dodaj pasiekę,
- edytuj pasiekę,
- archiwizuj pasiekę,
- lista uli w pasiece,
- filtrowanie.

---

## 10.3 Ule

### Dane ula

- numer/nazwa,
- typ ula,
- pasieka,
- status,
- siła rodziny,
- matka,
- ostatni przegląd,
- ostatnie karmienie,
- ostatnie leczenie,
- notatki,
- zdjęcia.

### Statusy ula

- OK,
- obserwuj,
- wymaga działania,
- brak danych,
- nieaktywny.

### Karta ula

Karta ula musi dawać szybki obraz:

```text
Ul 3
Status: Obserwuj
Siła: 7/10
Matka: 2026, widziana 5 dni temu
Czerw: OK
Pokarm: średni
Ostatni przegląd: 05.07.2026
```

---

## 10.4 Przeglądy

To główny moduł aplikacji.

### Pola przeglądu

- data,
- ul,
- pogoda,
- temperatura,
- nastrój rodziny,
- siła rodziny,
- matka widziana,
- jajka,
- czerw otwarty,
- czerw kryty,
- pokarm,
- pyłek,
- mateczniki,
- choroby,
- warroza,
- dodane ramki,
- zabrane ramki,
- poddana matka,
- notatka,
- zdjęcia,
- zadania po przeglądzie.

### Tryby formularza

1. szybki,
2. pełny,
3. głosowy w przyszłości.

W wersji 1.0 robimy szybki i pełny.

---

## 10.5 Matki

### Dane matki

- numer,
- linia,
- rasa,
- rok,
- znakowanie,
- kolor opalitka,
- pochodzenie,
- data poddania,
- data przyjęcia,
- status,
- ocena czerwienia,
- notatki.

### Statusy

- aktywna,
- poddana,
- przyjęta,
- nieprzyjęta,
- wymieniona,
- brak matki,
- do obserwacji.

---

## 10.6 Karmienia

### Dane karmienia

- data,
- ul,
- typ pokarmu,
- ilość,
- jednostka,
- cel,
- notatka.

### Typy

- syrop 1:1,
- syrop 3:2,
- ciasto,
- inwert,
- miód,
- inne.

---

## 10.7 Leczenie

### Dane leczenia

- data,
- ul,
- preparat,
- dawka,
- metoda,
- etap leczenia,
- termin kontroli,
- notatki.

### Ważne

Moduł leczenia musi być neutralny i dokumentacyjny. Aplikacja nie ma udawać lekarza weterynarii dla pszczół, bo tego jeszcze brakowało do pełnego absurdu.

---

## 10.8 Zadania

### Zadanie

- tytuł,
- opis,
- ul lub pasieka,
- termin,
- priorytet,
- status,
- powiązanie z przeglądem.

### Automatyczne zadania

Po przeglądzie aplikacja może zaproponować:

- sprawdzić matkę za 3 dni,
- dodać ramkę,
- skontrolować mateczniki,
- uzupełnić pokarm,
- wykonać leczenie,
- sprawdzić przyjęcie matki.

---

## 10.9 Notatki

Notatki mogą dotyczyć:

- ula,
- pasieki,
- matki,
- sezonu,
- leczenia,
- karmienia.

---

## 10.10 Zdjęcia

Zdjęcia mogą być dodawane do:

- ula,
- przeglądu,
- matki,
- leczenia,
- problemu.

W 1.0 zdjęcia mogą być przechowywane lokalnie/serwerowo w prostym wariancie. W przyszłości można dodać S3 albo inny storage.

---

## 10.11 Raporty

W wersji 1.0:

- raport pasieki,
- raport ula,
- historia przeglądów,
- karmienia,
- leczenia,
- zadania,
- eksport CSV,
- eksport PDF jako etap opcjonalny.

---

# 11. Architektura techniczna

## 11.1 Frontend

Rekomendowany stack:

- React,
- TypeScript,
- Vite,
- PWA,
- Tailwind CSS,
- własny design system lub shadcn/ui,
- TanStack Query,
- Zustand,
- React Hook Form,
- Zod,
- IndexedDB,
- Service Worker.

### Zasada

Frontend nie jest źródłem prawdy.  
Frontend jest interfejsem i lokalną kopią danych offline.

Źródłem prawdy jest backend + PostgreSQL.

---

## 11.2 Backend

Rekomendowany stack:

- Node.js,
- Fastify,
- TypeScript,
- Prisma,
- PostgreSQL,
- JWT,
- OpenAPI,
- Zod,
- Docker.

### Dlaczego Fastify

- jest szybki,
- jest lekki,
- dobrze pasuje do API,
- nie narzuca przesadnej struktury,
- łatwiej go utrzymać przy tym rozmiarze projektu.

NestJS jest solidny, ale dla BG Apiary 1.0 może być zbyt ciężki. Nie potrzebujemy pałacu, tylko mocnej, dobrze zrobionej pracowni.

---

## 11.3 Baza danych

### Główne tabele

- users,
- apiaries,
- hives,
- queens,
- inspections,
- inspection_items,
- feedings,
- treatments,
- tasks,
- notes,
- photos,
- weather_logs,
- sync_events,
- audit_logs.

### Zasady

- UUID jako ID,
- timestamps,
- soft delete dla ważnych danych,
- relacje przez owner/user,
- indeksy na user_id, apiary_id, hive_id,
- osobne migracje,
- seed dla środowiska dev.

---

## 11.4 API

API powinno mieć wersjonowanie:

```text
/api/v1
```

### Endpointy 1.0

#### Auth

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/refresh`
- POST `/api/v1/auth/logout`
- GET `/api/v1/auth/me`

#### Apiaries

- GET `/api/v1/apiaries`
- POST `/api/v1/apiaries`
- GET `/api/v1/apiaries/:id`
- PATCH `/api/v1/apiaries/:id`
- DELETE `/api/v1/apiaries/:id`

#### Hives

- GET `/api/v1/hives`
- POST `/api/v1/hives`
- GET `/api/v1/hives/:id`
- PATCH `/api/v1/hives/:id`
- DELETE `/api/v1/hives/:id`

#### Queens

- GET `/api/v1/queens`
- POST `/api/v1/queens`
- GET `/api/v1/queens/:id`
- PATCH `/api/v1/queens/:id`
- DELETE `/api/v1/queens/:id`

#### Inspections

- GET `/api/v1/inspections`
- POST `/api/v1/inspections`
- GET `/api/v1/inspections/:id`
- PATCH `/api/v1/inspections/:id`
- DELETE `/api/v1/inspections/:id`

#### Feedings

- GET `/api/v1/feedings`
- POST `/api/v1/feedings`
- PATCH `/api/v1/feedings/:id`
- DELETE `/api/v1/feedings/:id`

#### Treatments

- GET `/api/v1/treatments`
- POST `/api/v1/treatments`
- PATCH `/api/v1/treatments/:id`
- DELETE `/api/v1/treatments/:id`

#### Tasks

- GET `/api/v1/tasks`
- POST `/api/v1/tasks`
- PATCH `/api/v1/tasks/:id`
- DELETE `/api/v1/tasks/:id`

#### System

- GET `/api/v1/health`
- GET `/api/v1/version`

---

# 12. Offline first

## 12.1 Założenie

BG Apiary musi działać bez internetu.

Przy ulu użytkownik nie może być zakładnikiem zasięgu. Pszczoły raczej nie mają litości dla LTE.

---

## 12.2 Mechanizm

```text
Użytkownik
    ↓
Frontend React
    ↓
IndexedDB
    ↓
Kolejka synchronizacji
    ↓
API
    ↓
PostgreSQL
```

### Dane offline

W 1.0 offline powinny działać:

- lista pasiek,
- lista uli,
- szczegóły ula,
- dodawanie przeglądu,
- dodawanie karmienia,
- dodawanie leczenia,
- zadania,
- notatki.

### Status synchronizacji

Użytkownik musi widzieć:

- online,
- offline,
- synchronizacja w toku,
- zapisano lokalnie,
- błąd synchronizacji,
- wszystko zsynchronizowane.

---

# 13. Bezpieczeństwo

## 13.1 Konto użytkownika

- hasła hashowane bcrypt/argon2,
- JWT access token,
- refresh token,
- rotacja tokenów,
- sesje,
- wylogowanie,
- podstawowe zabezpieczenia przed brute force.

## 13.2 Backend

- Helmet,
- CORS,
- rate limit,
- walidacja Zod,
- logowanie błędów,
- brak sekretów w repo,
- `.env.example`,
- osobne sekrety produkcyjne.

## 13.3 Dane

- użytkownik widzi tylko swoje dane,
- każda tabela ma owner/user scope,
- backup bazy,
- migracje kontrolowane.

---

# 14. Production i DevOps

## 14.1 Środowiska

- local development,
- staging opcjonalnie,
- production VPS.

## 14.2 Docker

Kontenery:

- frontend/nginx lub statyczny frontend przez Nginx hosta,
- backend,
- PostgreSQL,
- pgAdmin opcjonalnie,
- backup service opcjonalnie.

## 14.3 GitHub Actions

Proces:

```text
git push
   ↓
GitHub Actions
   ↓
SSH VPS
   ↓
git pull / reset
   ↓
docker compose build
   ↓
migrations
   ↓
restart containers
   ↓
health checks
```

## 14.4 Instalator

Instalator musi:

- sprawdzić system,
- sprawdzić porty,
- sprawdzić Docker,
- stworzyć `.env`,
- zbudować frontend,
- zbudować backend,
- uruchomić kontenery,
- wykonać migracje,
- sprawdzić health,
- pokazać raport końcowy.

## 14.5 Diagnostyka

Polecenie:

```bash
bash scripts/check.sh
```

lub docelowo:

```bash
bgapiary doctor
```

Powinno sprawdzać:

- Docker,
- kontenery,
- porty,
- backend health,
- frontend,
- PostgreSQL,
- migracje,
- miejsce na dysku,
- pamięć RAM,
- logi błędów.

---

# 15. Testy

## 15.1 Frontend

- test renderowania,
- test formularzy,
- test nawigacji,
- test offline,
- test zapisu przeglądu.

## 15.2 Backend

- test auth,
- test CRUD pasiek,
- test CRUD uli,
- test CRUD przeglądów,
- test uprawnień,
- test walidacji.

## 15.3 Smoke test produkcyjny

Po wdrożeniu:

- strona działa,
- login działa,
- register działa,
- health działa,
- baza działa,
- można dodać pasiekę,
- można dodać ul,
- można dodać przegląd,
- dane zostają po odświeżeniu.

---

# 16. Struktura repozytorium

Rekomendowana struktura:

```text
bg-apiary/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── shared/
│   └── ui/
├── docker/
├── docs/
├── scripts/
├── .github/
│   └── workflows/
├── docker-compose.yml
├── README.md
└── CHANGELOG.md
```

### Alternatywa prostsza

Jeżeli chcemy ograniczyć złożoność:

```text
bg-apiary/
├── frontend/
├── backend/
├── docker/
├── docs/
├── scripts/
├── docker-compose.yml
└── README.md
```

Dla wersji 1.0 rekomenduję prostszą strukturę:

```text
frontend/
backend/
docker/
docs/
scripts/
```

Nie budujemy monorepo tylko dlatego, że ładnie wygląda na diagramie. Diagramy nie miodują.

---

# 17. Priorytety wdrożeniowe

## Must have

- auth,
- dashboard,
- pasieki,
- ule,
- przeglądy,
- matki,
- karmienia,
- leczenie,
- zadania,
- backend,
- PostgreSQL,
- Docker,
- PWA,
- offline podstawowy,
- instalator,
- check script.

## Should have

- zdjęcia,
- eksport CSV,
- raporty,
- pogoda,
- lepsze filtry,
- statusy zdrowia rodziny,
- onboarding.

## Could have

- PDF,
- QR kody uli,
- notatki głosowe,
- AI podsumowania przeglądu,
- integracja mapy,
- wiele użytkowników w jednej pasiece.

## Won’t have w 1.0

- marketplace,
- płatności,
- IoT,
- zaawansowane AI,
- natywna aplikacja mobilna.

---

# 18. Roadmapa

## Etap 0: Specyfikacja

- master plan,
- makiety,
- architektura,
- model danych,
- kontrakt API.

## Etap 1: Fundament

- repozytorium,
- frontend shell,
- backend shell,
- Docker,
- PostgreSQL,
- auth,
- health check.

## Etap 2: Core pasieki

- pasieki,
- ule,
- dashboard,
- statusy,
- podstawowa historia.

## Etap 3: Przeglądy

- szybki przegląd,
- pełny przegląd,
- historia ula,
- zadania po przeglądzie.

## Etap 4: Matki, karmienie, leczenie

- matki,
- karmienia,
- leczenia,
- automatyczne przypomnienia.

## Etap 5: Offline i PWA

- IndexedDB,
- service worker,
- kolejka synchronizacji,
- status online/offline.

## Etap 6: Production

- Docker,
- Nginx,
- HTTPS,
- GitHub Actions,
- backup,
- check script,
- dokumentacja.

## Etap 7: Release 1.0

- testy,
- stabilizacja,
- poprawki UI,
- publikacja.

---

# 19. Kryteria gotowości wersji 1.0

Wersję 1.0 uznajemy za gotową, gdy:

- użytkownik może założyć konto,
- użytkownik może się zalogować,
- użytkownik może utworzyć pasiekę,
- użytkownik może dodać ule,
- użytkownik może dodać przegląd,
- użytkownik może zobaczyć historię ula,
- użytkownik może dodać matkę,
- użytkownik może dodać karmienie,
- użytkownik może dodać leczenie,
- użytkownik może dodać zadanie,
- aplikacja działa na telefonie,
- aplikacja działa jako PWA,
- podstawowe dane działają offline,
- synchronizacja działa po odzyskaniu internetu,
- backend działa stabilnie,
- baza zapisuje dane,
- instalator działa na czystym VPS,
- `scripts/check.sh` pokazuje status OK,
- po restarcie VPS aplikacja wraca sama.

---

# 20. Najważniejsza zasada projektu

Nie dodajemy funkcji, dopóki fundament nie jest stabilny.

Każda funkcja musi mieć:

- ekran,
- model danych,
- endpoint,
- walidację,
- test podstawowy,
- obsługę błędu,
- zachowanie offline, jeśli dotyczy,
- miejsce w historii użytkownika.

Jeżeli funkcja nie spełnia tych warunków, to nie jest funkcją. To jest mina z opóźnionym zapłonem.

---

# 21. Decyzja końcowa

Rekomendacja:

**BG Apiary 1.0 Production piszemy od zera.**

Obecną wersję traktujemy jako prototyp i materiał analityczny.

Nowa wersja ma być:

- prostsza,
- stabilniejsza,
- ładniejsza,
- mobilna,
- offline first,
- gotowa produkcyjnie,
- łatwa do wdrożenia,
- łatwa do rozwijania.

---

# 22. Następny dokument

Po tym master planie powinny powstać:

1. `BG_APIARY_1_0_UI_UX_SPEC.md`
2. `BG_APIARY_1_0_DATABASE_SCHEMA.md`
3. `BG_APIARY_1_0_API_CONTRACT.md`
4. `BG_APIARY_1_0_TECHNICAL_ARCHITECTURE.md`
5. `BG_APIARY_1_0_IMPLEMENTATION_PLAN.md`

Dopiero potem zaczynamy kod.

Tak, to mniej romantyczne niż “dawaj kod”. Za to ma większą szansę nie umrzeć przy pierwszym wdrożeniu, co w świecie aplikacji jest już niemal przejawem luksusu.
