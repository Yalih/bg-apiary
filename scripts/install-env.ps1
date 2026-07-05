$TargetDir = "C:\Projekty\bg-apiary\backend"
$EnvFile = Join-Path $TargetDir ".env"

Write-Host "=== BG Apiary ENV installer for Windows ==="

if (!(Test-Path $TargetDir)) {
    Write-Host "ERROR: backend directory not found: $TargetDir"
    Write-Host "Change `$TargetDir in this script if your project is elsewhere."
    exit 1
}

@"
# BG Apiary backend environment
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bg_apiary"

JWT_SECRET="change-this-before-production-bg-apiary"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CORS_ORIGIN="https://bgapiary.pro,http://localhost:5173"
"@ | Set-Content -Path $EnvFile -Encoding UTF8

Write-Host "Created: $EnvFile"
Write-Host ""
Write-Host "Now run:"
Write-Host "cd C:\Projekty\bg-apiary\backend"
Write-Host "npx prisma validate"
