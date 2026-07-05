# BG Apiary 1.0 Production deployment

## 1. Wymagania VPS

- Ubuntu 22.04/24.04/26.04
- minimum 2 GB RAM
- minimum 20 GB dysku
- Docker
- Docker Compose
- Git
- domena kierująca na VPS, np. `bgapiary.pro`

## 2. Pierwsza instalacja

```bash
sudo mkdir -p /opt/bg-apiary
sudo chown -R "$USER:$USER" /opt/bg-apiary
cd /opt/bg-apiary
git clone https://github.com/Yalih/bg-apiary.git .
bash scripts/install.sh
```

## 3. Aktualizacja

```bash
cd /opt/bg-apiary
bash scripts/update.sh
```

## 4. Diagnostyka

```bash
cd /opt/bg-apiary
bash scripts/check.sh
```

## 5. Adresy

- Frontend: `http://SERVER_IP`
- API health: `http://SERVER_IP/api/v1/health`
- Swagger: `http://SERVER_IP/api/docs`
- pgAdmin lokalnie na VPS: `http://127.0.0.1:5050`

## 6. HTTPS

W wersji produkcyjnej najlepiej dodać reverse proxy z Certbotem albo Caddy przed kontener `web`. Ten projekt celowo startuje na porcie 80, żeby najpierw potwierdzić stabilne działanie aplikacji. HTTPS dokładamy jako następny krok produkcyjny, nie jako loterię w pierwszym wdrożeniu.

## 7. Backup bazy

Minimalny backup:

```bash
docker exec bg-apiary-postgres pg_dump -U bg_apiary bg_apiary > bg_apiary_backup_$(date +%F).sql
```

Docelowo należy dodać cron i rotację backupów.


## Aktualizacja 1.0.3

Od wersji 1.0.3 domyślnie używamy host Nginx, a nie kontenera web na porcie 80. Powód jest prosty: na VPS i tak działa systemowy Nginx, więc nie zmuszamy dwóch Nginxów do walki o port jak dwie matki w jednym ulu.

```text
Nginx hosta:
- /var/www/html dla frontendu
- /api/ proxy do 127.0.0.1:4000/api/

Docker:
- postgres
- api
```
