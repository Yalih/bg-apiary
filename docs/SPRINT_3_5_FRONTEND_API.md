# Sprint 3.5 – Integracja Frontend ↔ Backend API

## Cel
Frontend BG Apiary został przełączony z zapisu danych biznesowych w `localStorage` na komunikację z backendem API.

## Wykonane
- Dodano warstwę `src/api/` z klientem API opartym o Axios.
- Dodano `VITE_API_URL` dla środowisk development, test i production.
- Dodano health check `GET /api/v1/health` przy starcie aplikacji.
- Dodano ekran `Backend unavailable` z opcją ponowienia połączenia.
- Dane pasiek i uli są pobierane z endpointów backendu.
- Tworzenie pasieki i ula wysyła dane do backendu przez API.
- Usunięto helper `src/storage/localStore.ts`.
- Usunięto testy zależne od localStorage dla danych biznesowych.
- Cache pogody został przeniesiony do pamięci procesu, bez localStorage.

## Co zostało świadomie tymczasowe
- Auth pozostaje bramką testową w pamięci aplikacji do czasu Sprintu JWT.
- Endpointy notatek, karmień, leczeń i przeglądów są przygotowane jako API client, ale backend 3.4 zwraca jeszcze 501 dla części zasobów.

## Endpointy wykorzystywane realnie
- `GET /api/v1/health`
- `GET /api/v1/apiaries`
- `POST /api/v1/apiaries`
- `GET /api/v1/hives`
- `POST /api/v1/hives`

## Kryterium odbioru
`npm install` oraz `npm run build` przechodzą poprawnie.
