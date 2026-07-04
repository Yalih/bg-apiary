# Migracja BgApiary 1.9 do 2.0 RC

## Zasada

Dane 1.9 pozostają nienaruszone. Migracja dodaje kolekcje 2.0.

## Dodawane kolekcje

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

## Backup

Backup 2.0 RC zawiera pełny stan aplikacji razem z kolekcjami 2.0.

## Ryzyko

Brak zewnętrznego backendu oznacza, że synchronizacja jest przygotowana architektonicznie, ale nie wysyła danych do chmury.


## 2.0 FINAL

Wydanie finalne stabilizuje lokalną aplikację, ujednolica wersję backupu i domyka czyszczenie danych zależnych. Funkcje chmury i AI pozostają przygotowane architektonicznie bez podłączonego backendu.
