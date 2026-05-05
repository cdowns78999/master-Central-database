# Fix OpenCode folder structure v2
# agents\ = only gentle.md (flat file)
# commands\ = all skill subfolders

$agentsPath = "C:\Users\chad\.config\opencode\agents"
$commandsPath = "C:\Users\chad\.config\opencode\commands"

Write-Host "=== Fixing folder structure ===" -ForegroundColor Cyan

# 1. Get all SUBFOLDERS in agents\ (these are the skills)
$skillFolders = Get-ChildItem $agentsPath -Directory
Write-Host "Found $($skillFolders.Count) subfolders in agents\" -ForegroundColor Gray

# 2. Move each subfolder to commands\
foreach ($folder in $skillFolders) {
    $dest = Join-Path $commandsPath $folder.Name
    if (-not (Test-Path $dest)) {
        Move-Item -Path $folder.FullName -Destination $commandsPath -Force
        Write-Host "  Moved: $($folder.Name) → commands\" -ForegroundColor Yellow
    } else {
        Write-Host "  Skip: $($folder.Name) already in commands\" -ForegroundColor DarkGray
    }
}

# 3. Ensure gentle.md exists in agents\
$gentlePath = Join-Path $agentsPath "gentle.md"
if (-not (Test-Path $gentlePath)) {
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
    Set-Content -Path $gentlePath -Value $content -Encoding UTF8
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
