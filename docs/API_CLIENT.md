# API Client

Frontend korzysta z `src/api/apiClient.ts`.

## Konfiguracja
Adres backendu ustawiany jest przez:

```env
VITE_API_URL=http://localhost:4000
```

## Zasady
- Komponenty nie wykonują bezpośrednio `fetch`.
- Komponenty korzystają z warstwy API/service.
- Błędy API są mapowane do `ApiError`.
- Timeout wynosi 12 sekund.
