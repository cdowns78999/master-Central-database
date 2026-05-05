# Ngrok Combo Setup & Debug Utility
# Run this to check your setup and start a tunnel 1-by-1

Write-Host "--- 1. Checking Ngrok Installation ---" -ForegroundColor Cyan
ngrok version

Write-Host "`n--- 2. Validating Configuration File ---" -ForegroundColor Cyan
ngrok config check

Write-Host "`n--- 3. Configuration Details ---" -ForegroundColor Cyan
Write-Host "Config Path: $env:LOCALAPPDATA\ngrok\ngrok.yml"
Get-Content "$env:LOCALAPPDATA\ngrok\ngrok.yml"

Write-Host "`n--- 4. Launching Tunnel ---" -ForegroundColor Cyan
$port = Read-Host "Enter local port to expose (default 3000)"
if (-not $port) { $port = "3000" }

Write-Host "`nStarting tunnel for port $port... (Press Ctrl+C to stop)" -ForegroundColor Yellow
ngrok http $port
