# Fix OpenCode folder structure
# agents\ should only have gentle.md
# commands\ should have all other skills

$agentsPath = "C:\Users\chad\.config\opencode\agents"
$commandsPath = "C:\Users\chad\.config\opencode\commands"
$geminiPath = "C:\Users\chad\.gemini\skills"

Write-Host "=== Fixing OpenCode folder structure ===" -ForegroundColor Cyan

# 1. Ensure gentle.md exists in agents\
$gentleContent = @"
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

You are in GENTLE MODE. Your behavior rules:

1. **NEVER output extended thinking/reasoning text** - if the model tries to show thinking, collapse it to "thinking..."
2. **Keep responses concise** - answer directly, no preamble, no elaboration unless asked
3. **Skip explanations** - no "Here's what I'll do" or "I've done X" unless explicitly requested
4. **Minimal token usage** - get to the point fast
5. **When thinking is required**, display only: `thinking...` (one line, no expansion)

The user loves your logic but hates the visual distraction of flowing text. Be a silent powerhouse.
"@

Set-Content -Path "$agentsPath\gentle.md" -Value $gentleContent -Encoding UTF8
Write-Host "[OK] gentle.md ensured in agents\" -ForegroundColor Green

# 2. Move all other .md files from agents\ to commands\
$otherFiles = Get-ChildItem "$agentsPath\*.md" -Name | Where-Object { $_ -ne 'gentle.md' }
foreach ($file in $otherFiles) {
    Move-Item -Path "$agentsPath\$file" -Destination $commandsPath -Force
    Write-Host "  Moved: $file → commands\" -ForegroundColor Yellow
}

# 3. Sync Gemini skills to commands\
Copy-Item "$geminiPath\*" -Destination $commandsPath -Force -Recurse
$geminiCount = (Get-ChildItem $geminiPath).Count
Write-Host "[OK] Synced $geminiCount skills from Gemini to commands\" -ForegroundColor Green

# 4. Summary
Write-Host ""
Write-Host "=== Final Structure ===" -ForegroundColor Cyan
Write-Host "agents\:" -ForegroundColor White
Get-ChildItem $agentsPath -Name | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
$cmdCount = (Get-ChildItem $commandsPath).Count
Write-Host "commands\: ($cmdCount items)" -ForegroundColor White

Write-Host ""
Write-Host "[Done] Structure fixed!" -ForegroundColor Green
