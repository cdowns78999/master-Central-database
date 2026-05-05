# Fix PowerShell profile for clawdbot-chad

# Remove old function if it exists
if (Get-Command clawdbot-chad -ErrorAction SilentlyContinue) {
    Write-Host "Removing old clawdbot-chad function..." -ForegroundColor Yellow
}

# Update PowerShell profile
$profilePath = "$env:USERPROFILE\OneDrive\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1"
$functionDef = 'function clawdbot-chad { & "C:\Users\chad\.clawdbot\scripts\clawdbot-chad.ps1" @args }'

# Read current profile
if (Test-Path $profilePath) {
    $content = Get-Content $profilePath
    
    # Remove any existing clawdbot-chad function
    $content = $content -replace 'function clawdbot-chad.*?\{.*?\}', ''
    
    # Add new function
    $content += "`n`n$functionDef"
    
    # Write back
    $content | Set-Content $profilePath
    
    Write-Host "Updated PowerShell profile!" -ForegroundColor Green
} else {
    # Create new profile
    $functionDef | Set-Content $profilePath
    Write-Host "Created new PowerShell profile!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Please restart PowerShell to use clawdbot-chad command" -ForegroundColor Cyan
Write-Host "Or run: . `"$profilePath`"" -ForegroundColor Cyan