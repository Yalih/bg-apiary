# BG Apiary ENV Fix

Ten update dodaje brakujący plik:

- `backend/.env`

Naprawia błąd Prisma:

```text
Environment variable not found: DATABASE_URL
```

## Jak użyć na VPS

Będąc w katalogu `/opt/bg-apiary`, rozpakuj ZIP tak, aby plik trafił tutaj:

```text
/opt/bg-apiary/backend/.env
```

Potem uruchom:

```bash
cd /opt/bg-apiary/backend
npx prisma validate
```

Jeżeli przejdzie, kolejne kroki:

```bash
npx prisma generate
docker compose config
```

Uwaga: to jest konfiguracja startowa/development. Przed produkcją trzeba zmienić hasła i sekrety.
