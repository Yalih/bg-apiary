# Changelog

## BG Apiary 1.0 PRO

### Production stabilization

- Ujednolicono wersję projektu do `1.0.0`.
- Dodano produkcyjny `docker-compose.yml` z usługami PostgreSQL, backend i pgAdmin.
- Naprawiono uruchamianie backendu w Dockerze.
- Ujednolicono port backendu do `3000`.
- Naprawiono zmienne środowiskowe backendu: `JWT_ACCESS_SECRET` i `JWT_REFRESH_SECRET`.
- Frontend w produkcji używa relatywnego API `/api/v1` zamiast `localhost`.
- Dodano produkcyjny installer `scripts/install.sh`.
- Dodano diagnostykę `scripts/check.sh`.
- Dodano konfigurację Nginx z reverse proxy `/api`.
- GitHub Actions uruchamia pełny installer na VPS.
- Usunięto wymaganie ręcznego uruchamiania backendu po wdrożeniu.

### Status

Wersja 1.0 PRO jest przygotowana jako stabilna baza produkcyjna pod dalszy rozwój modułów aplikacji.
