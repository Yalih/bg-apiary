# BgApiary 2.0 - Architektura

## Cel

BgApiary 2.0 przygotowuje aplikację do pracy jako platforma pasieczna z kontami produkcyjnymi, synchronizacją, współdzieleniem, uprawnieniami i Asystentem 2.0.

## Konta

Modele:

- CloudUserProfile
- AuthProvider
- CloudAccountStatus

Obsługiwane kierunki:

- e-mail,
- potwierdzenie e-mail,
- reset hasła,
- Google,
- Apple.

Wersja 2.0 nie podłącza zewnętrznego backendu. Przygotowuje architekturę danych i UI.

## Synchronizacja

Modele:

- SyncQueueItem,
- SyncHistoryItem,
- SyncConflict.

Założenia:

- offline-first,
- kolejka zmian lokalnych,
- historia synchronizacji,
- konflikty lokalne/zdalne,
- migracja localStorage do cloud-ready.

## Współdzielenie

Modele:

- SharedApiaryMember,
- PermissionRule.

Role:

- Administrator,
- Manager,
- Pracownik,
- Obserwator.

Uprawnienia:

- odczyt,
- edycja,
- usuwanie.

## Audit Log

Model:

- AuditLogEntry.

Każdy wpis może przechowywać:

- kto,
- kiedy,
- co zmienił,
- encję,
- stan przed,
- stan po.

## Wersjonowanie

Model:

- DataVersion.

Cel:

- przygotowanie cofania zmian,
- historia wersji wpisów,
- snapshoty encji.

## AI i Asystent 2.0

Modele:

- HiveAIProfile,
- ColonyScore,
- Recommendation,
- Prediction,
- PhotoAnalysis.

Asystent 2.0 lokalnie liczy:

- ranking rodzin,
- ocenę 0-100,
- ryzyko,
- rekomendacje,
- priorytet dnia,
- prognozy.

## Zdjęcia AI-ready

PhotoAnalysis przechowuje tagi:

- ramki,
- matka,
- czerw,
- pyłek,
- warroza,
- miód.

## Migracja 1.9 → 2.0

Dodawane kolekcje:

- cloudProfile,
- syncQueue,
- syncHistory,
- syncConflicts,
- sharedMembers,
- permissionRules,
- auditLog,
- dataVersions,
- hiveAIProfiles,
- colonyScores,
- recommendations20,
- predictions,
- photoAnalyses.

Istniejące dane 1.9 pozostają bez zmian.


## Release Candidate

Wersja 2.0 RC stabilizuje architekturę 2.0 i doprecyzowuje komunikaty w UI.

Aplikacja jasno rozróżnia:

- gotowe pod chmurę,
- brak podłączonego backendu,
- gotowe pod AI,
- brak realnej analizy zdjęć online.

Dodatkowe warstwy RC:

- Design System,
- raport jakości danych,
- centrum powiadomień,
- globalna wyszukiwarka,
- generator dużych danych,
- testy RC.


## 2.0 FINAL

Wydanie finalne stabilizuje lokalną aplikację, ujednolica wersję backupu i domyka czyszczenie danych zależnych. Funkcje chmury i AI pozostają przygotowane architektonicznie bez podłączonego backendu.
