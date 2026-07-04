# Changelog

## Sprint 2.0 - UI and branding redesign

- Ustawiono wersję aplikacji jako **BG Apiary v2.0**.
- Dodano oficjalne logo BG Apiary w wariantach: mark, horizontal dark, horizontal light i stacked.
- Dodano favicon, ikony PWA 192x192 oraz 512x512.
- Dodano katalog `public/brand/` z ikonami modułów i grafikami placeholderów.
- Przebudowano dashboard w motywie premium: hero, statystyki, szybkie akcje, pogoda, pożytek, pasieki, zadania i asystent.
- Dodano desktopowy sidebar, topbar oraz spójne użycie brandingu.
- Przygotowano fundament jasnego i ciemnego motywu.
- Dodano dokumentację `docs/SPRINT_2_UI_BRANDING.md` i `docs/DESIGN_SYSTEM.md`.

## Sprint 1 - project cleanup

- Added production-ready README.
- Added `.gitignore` and `.env.example`.
- Added documentation index, architecture overview and roadmap.
- Removed local `.git/` history from the shared package.
- Kept application logic unchanged.


## 2.0 BGS Visual Experience

- Dodano finalny motyw wizualny BG APIARY.
- Naprawiono przejścia kafelków Pogoda i Pożytek.
- Dodano ekran Pogoda i ekran Pożytek.
- Dodano system ikon SVG i lekkie ilustracje CSS.
- Dodano wizualne stany ilustracji ula.
- Dodano testy BGS Visual Experience.


## 2.0 Premium Weather & Nectar

- Poprawiono kontrast ikon na Panelu i w dolnym menu.
- Dodano warstwę Open-Meteo API bez klucza.
- Dodano cache pogody i fallback offline.
- Dodano ocenę pogody dla pszczelarza.
- Dodano połączenie lokalnego kalendarza pożytków z pogodą.
- Dodano testy weather/nectar/icon.


## 2.0 BG Apiary Premium Polish

- Dopracowano szczegóły ula jako ekran premium.
- Dodano układ zakładek Przegląd / Notatki / Historia / Zdjęcia.
- Dodano kafelki premium dla najważniejszych danych ula.
- Przebudowano historię ula jako oś czasu.
- Poprawiono zdjęcia jako miniatury.
- Dopracowano karty uli, Plan, Raporty, formularze i puste stany wizualnie.
- Dodano testy Premium Polish.


## 2.0 BG Apiary Premium

- Dopasowano motyw do drugiej referencji BG APIARY.
- Dodano branding BG APIARY.
- Dodano szybki dostęp na Pulpicie.
- Dodano kartę pożytku i pogodę jako tymczasowy opis techniczny bez API.
- Poprawiono karty rodzin i pasek siły.
- Utrzymano logikę biznesową bez zmian.


## 2.0 BGS Theme

- Dodano motyw Pasieka BGS.
- Dodano paletę: #103B28, #2F6B52, #A7B38A, #D4A017, #F2F4EC, #FFFFFF.
- Przebudowano Pulpit w stylu referencji.
- Dodano karty rodzin pszczelich z paskiem siły.
- Poprawiono dolne menu: Pulpit / Ule / + / Plan / Więcej.
- Dodano klasy bgs-* i testy motywu.


## 2.0 UX Refresh

- Uproszczono Panel główny.
- Dodano układ „Co mam dziś zrobić?”.
- Ograniczono długie listy na ekranie głównym.
- Dodano „Pokaż więcej”.
- Zamieniono puste komunikaty na konkretne akcje.
- Uspokojono kolorystykę.
- Powiększono przyciski, odstępy i pola dotykowe.
- Dodano nowoczesne karty i spokojniejszy design.
- Dodano helpery i testy UX Refresh.


## 2.0 FINAL

- Domknięto poprawki z audytu RC2.
- Rozszerzono usuwanie ula i pasieki na dane zdrowia, miodu, sezonu, AI, synchronizacji, audytu i wersji danych.
- Ujednolicono wersję backupu do `2.0 FINAL`.
- Dodano `version20.ts` z etykietą wydania.
- Dodano `finalAudit20.ts` do zapisu audytu i wersji danych przy operacjach.
- Dodano testy FINAL: kasowanie danych zależnych, audyt, wersjonowanie i backup.
- Dodano dokumenty `AUDYT_FINAL_2.0.md` oraz `TESTY_FINAL_2.0.md`.
- Build produkcyjny przechodzi.


## 2.0.0 RC2

- Naprawiono integrację UI wersji 2.0 RC.
- Ustawiono Panel właściciela jako główne doświadczenie aplikacji.
- Zmieniono dolne menu na: Panel, Pasieki, Prace, Asystent, Więcej.
- Uporządkowano „Więcej” jako centrum administracyjne.
- Zintegrowano raport jakości danych z Panelem.
- Zintegrowano centrum powiadomień z Panelem.
- Zintegrowano globalną wyszukiwarkę z Panelem.
- Zintegrowano Asystenta 2.0 z Panelem.
- Dodano widoczne komunikaty: gotowe pod chmurę / gotowe pod AI.
- Dodano testy RC2 integracji głównych ścieżek użytkownika.


## 2.0.0 RC

- Ustabilizowano wersję 2.0 jako Release Candidate.
- Dodano warstwę Design System 2.0 RC.
- Dodano puste stany, polskie terminy UI i pomocnicze elementy UX mobilnego.
- Dodano Dashboard właściciela na bazie danych 2.0.
- Dodano raport jakości danych.
- Dodano centrum powiadomień z istniejących sygnałów.
- Dodano globalną wyszukiwarkę.
- Dodano generator dużych danych 10/50/100/250/500/1000 uli.
- Dodano testy RC: język, mobile, Design System, jakość danych, powiadomienia, wyszukiwarka, migracja i wydajność.
- Dodano dokumenty RC_2.0_AUDIT.md, MIGRACJA_1.9_DO_2.0.md, DESIGN_SYSTEM_2.0.md i TESTY_RC_2.0.md.


## 2.0.0

- Dodano architekturę kont produkcyjnych cloud-ready.
- Dodano modele synchronizacji, kolejkę zmian, historię synchronizacji i konflikty.
- Dodano tryb offline-first jako architekturę danych.
- Dodano współdzielenie pasiek, role i uprawnienia.
- Dodano audit log i wersjonowanie danych.
- Dodano Asystenta 2.0: oceny rodzin 0-100, ranking, rekomendacje i prognozy.
- Dodano metadane zdjęć AI-ready.
- Rozszerzono Raporty i Asystenta o sygnały 2.0.
- Rozszerzono localStorage i backup o dane 2.0.
- Dodano dokument ARCHITEKTURA_2.0.md.
- Dodano testy modułów 2.0.


## 1.9.0

- Dodano moduł Plan Sezonu.
- Dodano harmonogram prac miesięcznych i szablony sezonowe.
- Dodano automatyczne zadania sezonowe i checklisty.
- Dodano cele pasieki i pasek postępu sezonu.
- Dodano raport realizacji planu.
- Dodano kalendarz pożytków dla pasiek.
- Dodano porównanie bieżącego sezonu z poprzednimi sezonami.
- Dodano okna pogodowe dla prac bez zewnętrznego API.
- Dodano scenariusze prowadzenia pasieki.
- Rozszerzono Asystenta, Raporty, localStorage i backup o dane planu sezonu.
- Dodano testy modułów 1.9.


## 1.8.0

- Dodano Centrum Zdrowia Pasieki.
- Dodano rejestr warrozy, osyp, test cukrowy i test alkoholowy.
- Dodano procent porażenia i poziomy ryzyka.
- Dodano leczenie, preparaty, dawki, terminy kontroli i historię leczenia.
- Dodano alerty zdrowotne i raport zdrowia pasieki.
- Dodano powiązanie leczenia z magazynem pasiecznym.
- Dodano przenoszenie uli między pasiekami z historią, matką i siłą rodziny.
- Dodano obserwację/kwarantannę ula.
- Potwierdzono obsługę daty wprowadzenia matki przy zakładaniu ula.
- Rozszerzono backup o dane zdrowotne i przeniesienia uli.
- Dodano testy modułów 1.8.


## 1.7.0

- Dodano Centrum Miodobrań.
- Dodano rejestr miodobrań i partie miodu.
- Dodano automatyczne numery partii.
- Dodano typ miodu, wilgotność i ilość kg.
- Dodano identyfikowalność partii od uli i pasiek.
- Dodano partie mieszane.
- Dodano rozlew do słoików i magazyn słoików.
- Dodano sprzedaż, klientów i etykiety.
- Dodano raport sprzedaży i magazyn miodu.
- Rozszerzono backup o dane miodowe.
- Dodano testy modułów 1.7.


## 1.6.0

- Dodano Magazyn Pasieczny.
- Dodano kategorie: ramki, korpusy, pokarm, leki, matki, odkłady i sprzęt.
- Dodano stany minimalne i optymalne.
- Dodano ruchy magazynowe i historię zmian.
- Dodano listę zakupów i alerty braków.
- Dodano raport magazynu.
- Dodano propozycje zużycia materiałów przy pracach w ulu.
- Rozszerzono backup o dane magazynu.
- Dodano testy magazynu 1.6.


## 1.5.0 RC-RealUser

- Usunięto automatyczne ładowanie danych demo dla nowych kont.
- Nowe konto startuje z pustym stanem.
- Dodano ekran pierwszego uruchomienia: dodaj pasiekę lub importuj backup.
- Dodano zarządzanie danymi w menu Więcej.
- Dodano usuwanie pasieki z powiązanymi ulami i historią.
- Dodano usuwanie ula z powiązaną historią, zadaniami, przeglądami, karmieniami, notatkami, zdjęciami, decyzjami i kontrolami matki.
- Dodano testy pustego konta, separacji użytkowników, czyszczenia i usuwania danych.


## 1.5.0 RC

- Przygotowano release candidate przed wydaniem testowym 1.5.
- Nie dodano nowych funkcji użytkowych.
- Zaktualizowano README i dokument audytu RC.
- Potwierdzono zakres audytu: testy, build, Netlify ZIP, konta testowe, localStorage, backup, główne ścieżki, wydajność, UX, dokumentacja i stabilność.


## 1.5.0

- Wykonano finalny polish UX i grafiki.
- Ujednolicono ikony, kolory, przyciski, formularze i puste stany.
- Poprawiono mobile layout i safe-area.
- Dodano generator dużych danych testowych.
- Dodano testy wydajności, pustych stanów, spójności UX, backupu/migracji i mobile layoutu.
- Zaktualizowano backup do wersji 1.5.0.
- Nie dodano nowych modułów użytkowych.


## 1.4.0

- Dodano nowe Centrum Raportów.
- Dodano raport sezonu i raporty pasiek.
- Dodano raport rodzin słabych oraz rodzin do wymiany matki.
- Dodano statystyki prac, karmienia i przeglądów.
- Poprawiono wygląd kafelków, wykresów i czytelność raportów.
- Rozszerzono Asystenta o analizy raportowe.
- Dodano testy modułów 1.4.


## 1.3.0

- Dodano Katalog Matek.
- Dodano globalną historię matek.
- Dodano kontrole i oceny jakości matek.
- Dodano statusy przyjęcia matki.
- Dodano automatyczne zadania kontroli po poddaniu matki.
- Dodano raport wymian matek.
- Rozszerzono Asystenta, raporty i backup o dane matek.
- Dodano testy modułów 1.3.


## 1.2.0

- Dodano Tryb Obchodu Pasieki.
- Dodano Dzisiejszy Obchód i pasek postępu dnia.
- Dodano seryjne oznaczanie zadań jako wykonane.
- Dodano inteligentną kolejność uli według mapy pasieki.
- Ulepszono Centrum Prac, wyszukiwarkę i filtry.
- Rozszerzono backup, raporty i Asystenta o dane prac dziennych.
- Dodano testy modułów 1.2.


## 1.1.0

- Dodano Centrum Prac Pasiecznych.
- Dodano grupowanie zadań według typu pracy, pasieki, priorytetu i terminu.
- Dodano filtry i wyszukiwarkę uli.
- Dodano statusy rodzin.
- Dodano wymianę matki i historię matek.
- Dodano oś czasu decyzji.
- Dodano mapę pasieki.
- Rozszerzono backup o dane 1.1.
- Dodano testy modułów 1.1.


## 1.0 RC-UserTest

- Dodano lokalne konta testowe.
- Dodano rejestrację, logowanie i wylogowanie.
- Dodano prosty profil użytkownika.
- Dodano osobny localStorage per użytkownik.
- Dodano lokalną sesję.
- Dodano testy auth/session/userStorage.
- Nie zmieniono logiki pasiek, uli, zadań, Asystenta, raportów ani backupu.


## 1.0 RC

- Przygotowano release candidate przed wersją 1.1.
- Wykonano finalny audyt głównych ekranów, localStorage, backupu, raportów, Asystenta, zadań, zdjęć, formularzy i dokumentacji.
- Nie dodano nowych funkcji.


## 1.0.9

- Wykonano finalne szlify raportów, statystyk i backupu.
- Poprawiono komunikaty eksportu/importu oraz opis localStorage.
- Uporządkowano dokumentację i finalny UX linii 1.0.x.
- Nie dodano nowych funkcji.


## 1.0.8

- Poprawiono ekran Asystenta, rekomendacje, ryzyko i analizę matek.
- Uczytelniono priorytety, powody ryzyka i podsumowanie sezonu.
- Poprawiono układ mobilny Asystenta.
- Nie dodano nowych funkcji.


## 1.0.7

- Poprawiono karty zadań, priorytety, filtry i kalendarz.
- Dodano wizualne grupowanie zadań z istniejących danych.
- Poprawiono czytelność przejść z zadań do ula lub formularza.
- Nie dodano nowych funkcji.


## 1.0.6

- Poprawiono historię ula i oś czasu.
- Dodano czytelniejsze ikony wizualne dla typów zdarzeń.
- Poprawiono karty przeglądów, karmienia, notatek i zdjęć.
- Poprawiono galerię i miniatury zdjęć.
- Nie dodano nowych funkcji.


## 1.0.5

- Poprawiono formularze pasiek, uli, przeglądów, karmienia, notatek, zdjęć i zadań.
- Zwiększono pola, przyciski, checkboxy i czytelność błędów.
- Poprawiono wygodę użycia na telefonie.
- Nie dodano nowych funkcji.


## 1.0.4

- Poprawiono ekran szczegółów ula.
- Uczytelniono nagłówek, status, dane matki, szybkie akcje i zakładki.
- Wyróżniono następne działanie i kafelki statusu.
- Nie dodano nowych funkcji.


## 1.0.3

- Poprawiono karty pasiek i uli.
- Uczytelniono statusy, metryki uli, oznaczenia matek i alerty.
- Dodano wizualny skrót do ostatnio otwartego ula na podstawie istniejącego `lastOpenedHiveId`.
- Nie dodano nowych funkcji.


## 1.0.2

- Poprawiono stronę startową i Panel.
- Uporządkowano kolejność sekcji: pilne akcje, alerty, kalendarz i statystyki.
- Poprawiono czytelność kart pilnych akcji, alertów i kafelków statystyk.
- Nie dodano nowych funkcji.


## 1.0.1

- Uporządkowano system graficzny aplikacji.
- Poprawiono kolory, typografię, karty, przyciski, formularze i odstępy.
- Poprawiono dolne menu i responsywność.
- Nie dodano nowych funkcji.


## 1.0

- Dodano inteligentnego asystenta pasieki.
- Dodano analizę ryzyka rodzin.
- Dodano rekomendacje działań.
- Dodano propozycje przeglądów, karmienia i wymiany matek.
- Dodano analizę rozwoju rodzin.
- Dodano analizę matek.
- Dodano podsumowanie sezonu.
- Dodano tworzenie zadań z rekomendacji.
- Dodano roadmapę 1.1+.

## 0.9

- Zdjęcia, raporty, statystyki, eksport/import JSON.

## 0.8

- Zadania, przypomnienia, kalendarz, pilne akcje, sezonowy harmonogram i centrum alertów.

## 0.7c

- Przeglądy, karmienie, notatki, historia i szybkie akcje.

## 0.7b

- Kreator pasieki i dodawanie ula.

## 0.7a

- Start, panel, pasieki, ule i szczegóły ula.
