$TargetDir = "C:\Projekty\bg-apiary\backend"
$EnvFile = Join-Path $TargetDir ".env"

if (!(Test-Path $TargetDir)) {
    Write-Host "ERROR: backend directory not found: $TargetDir"
    exit 1
}

$AccessSecret = [guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")
$RefreshSecret = [guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N")

@"
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bg_apiary?schema=public"
JWT_ACCESS_SECRET="$AccessSecret"
JWT_REFRESH_SECRET="$RefreshSecret"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"
CORS_ORIGIN="http://localhost:5173"
LOG_LEVEL="info"
"@ | Set-Content -Path $EnvFile -Encoding UTF8

Write-Host "Created: $EnvFile"
