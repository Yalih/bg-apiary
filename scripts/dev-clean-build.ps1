# BG Apiary 1.0.3 local Windows build
$ErrorActionPreference = "Stop"

Write-Host "BG Apiary 1.0.3 - clean local build" -ForegroundColor Yellow

if (!(Test-Path ".\frontend\package.json")) { throw "Uruchom z katalogu głównego projektu." }
if (!(Test-Path ".\backend\package.json")) { throw "Uruchom z katalogu głównego projektu." }

Remove-Item -Recurse -Force ".\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\frontend\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\backend\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Force ".\package-lock.json" -ErrorAction SilentlyContinue
Remove-Item -Force ".\frontend\package-lock.json" -ErrorAction SilentlyContinue
Remove-Item -Force ".\backend\package-lock.json" -ErrorAction SilentlyContinue
Remove-Item -Force ".\frontend\tsconfig.tsbuildinfo" -ErrorAction SilentlyContinue

npm cache clean --force

npm --prefix frontend install --include=dev --no-audit --no-fund --prefer-online
npm --prefix frontend run build

$env:PRISMA_SKIP_POSTINSTALL_GENERATE="true"
npm --prefix backend install --include=dev --no-audit --no-fund --prefer-online
npm --prefix backend run build

Write-Host "OK - lokalny build przeszedł." -ForegroundColor Green
