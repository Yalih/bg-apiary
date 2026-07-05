# BG Apiary 1.0.1 local Windows build fix
# Uruchom z katalogu głównego projektu: PowerShell -> .\scripts\dev-clean-build.ps1

$ErrorActionPreference = "Stop"

Write-Host "BG Apiary 1.0.1 - clean local build" -ForegroundColor Yellow

if (!(Test-Path ".\frontend\package.json")) {
  throw "Nie widzę frontend/package.json. Uruchom skrypt z katalogu głównego projektu."
}

if (!(Test-Path ".\backend\package.json")) {
  throw "Nie widzę backend/package.json. Uruchom skrypt z katalogu głównego projektu."
}

Write-Host "Cleaning old dependencies..." -ForegroundColor Cyan
Remove-Item -Recurse -Force ".\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\frontend\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ".\backend\node_modules" -ErrorAction SilentlyContinue
Remove-Item -Force ".\package-lock.json" -ErrorAction SilentlyContinue
Remove-Item -Force ".\frontend\package-lock.json" -ErrorAction SilentlyContinue
Remove-Item -Force ".\backend\package-lock.json" -ErrorAction SilentlyContinue
Remove-Item -Force ".\frontend\tsconfig.tsbuildinfo" -ErrorAction SilentlyContinue

Write-Host "Cleaning npm cache..." -ForegroundColor Cyan
npm cache clean --force

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm --prefix frontend install --include=dev --no-audit --no-fund --prefer-online

Write-Host "Building frontend..." -ForegroundColor Cyan
npm --prefix frontend run build

Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
$env:PRISMA_SKIP_POSTINSTALL_GENERATE="true"
npm --prefix backend install --include=dev --no-audit --no-fund --prefer-online

Write-Host "Building backend..." -ForegroundColor Cyan
npm --prefix backend run build

Write-Host "OK - lokalny build przeszedł." -ForegroundColor Green
