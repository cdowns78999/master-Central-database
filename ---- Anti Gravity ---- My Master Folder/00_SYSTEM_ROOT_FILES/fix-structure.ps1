# Fix OpenCode folder structure
# agents\ = only gentle.md
# commands\ = all other skills

$agentsPath = "C:\Users\chad\.config\opencode\agents"
$commandsPath = "C:\Users\chad\.config\opencode\commands"

Write-Host "=== Fixing folder structure ===" -ForegroundColor Cyan

# 1. Get all .md files in agents\ except gentle.md
$skillsToMove = Get-ChildItem "$agentsPath\*.md" | Where-Object { $_.Name -ne "gentle.md" }

Write-Host "Found $($skillsToMove.Count) skills to move to commands\" -ForegroundColor Gray

# 2. Move them to commands\
foreach ($file in $skillsToMove) {
    Move-Item -Path $file.FullName -Destination $commandsPath -Force
    Write-Host "  Moved: $($file.Name)" -ForegroundColor Yellow
}

# 3. Ensure gentle.md is in agents\
if (-not (Test-Path "$agentsPath\gentle.md")) {
    Write-Host "Creating gentle.md in agents\" -ForegroundColor Green
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
    Set-Content -Path "$agentsPath\gentle.md" -Value $content -Encoding UTF8
}

# 4. Summary
Write-Host ""
Write-Host "=== Final structure ===" -ForegroundColor Cyan
Write-Host "agents\:" -ForegroundColor White
Get-ChildItem $agentsPath -Name | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
$cmdCount = (Get-ChildItem $commandsPath).Count
Write-Host "commands\: ($cmdCount items)" -ForegroundColor White

Write-Host ""
Write-Host "[Done] Structure fixed!" -ForegroundColor Green
