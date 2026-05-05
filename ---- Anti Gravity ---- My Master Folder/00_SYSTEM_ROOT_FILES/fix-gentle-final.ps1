# Fix: agents\ = only gentle.md, commands\ = all skills

$agentsPath = "C:\Users\chad\.config\opencode\agents"
$commandsPath = "C:\Users\chad\.config\opencode\commands"

Write-Host "=== Cleaning agents\ folder ===" -ForegroundColor Cyan

# 1. Get all items in agents\ except gentle.md
$itemsToRemove = Get-ChildItem $agentsPath | Where-Object { $_.Name -ne "gentle.md" }

Write-Host "Found $($itemsToRemove.Count) items to move to commands\" -ForegroundColor Gray

# 2. Move each to commands\
foreach ($item in $itemsToRemove) {
    $destPath = Join-Path $commandsPath $item.Name
    if (Test-Path $destPath) {
        # Already exists in commands\, just remove from agents\
        Remove-Item $item.FullName -Recurse -Force
        Write-Host "  Removed (duplicate): $($item.Name)" -ForegroundColor Yellow
    } else {
        Move-Item -Path $item.FullName -Destination $commandsPath -Force
        Write-Host "  Moved: $($item.Name) → commands\" -ForegroundColor Yellow
    }
}

# 3. Ensure gentle.md exists in agents\
$gentlePath = Join-Path $agentsPath "gentle.md"
if (-not (Test-Path $gentlePath)) {
    Write-Host "Creating gentle.md..." -ForegroundColor Green
    $content = @"
---
name: gentle
description: Gentle Mode agent - minimal thinking output
model: anthropic/claude-sonnet-4-5
tools:
  write: true
  edit: true
  bash: true
  read: true
  grep: true
  glob: true
---

You are in GENTLE MODE. Keep responses concise. No thinking output.
"@
    Set-Content -Path $gentlePath -Value $content -Encoding UTF8
}

# 4. Final check
Write-Host ""
Write-Host "=== Final agents\ folder ===" -ForegroundColor Cyan
Get-ChildItem $agentsPath -Name | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }

Write-Host ""
Write-Host "=== commands\ count ===" -ForegroundColor Cyan
$cmdCount = (Get-ChildItem $commandsPath).Count
Write-Host "  $cmdCount items" -ForegroundColor White

Write-Host ""
Write-Host "[DONE] Structure fixed!" -ForegroundColor Green
