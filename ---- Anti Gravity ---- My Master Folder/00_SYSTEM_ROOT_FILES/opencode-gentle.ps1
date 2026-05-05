# OpenCode Gentle Mode - First Fire Logic
# Level 2 Debug Pass Applied

# 1. Clean the visual environment
Clear-Host

# 2. Render the Spectrum Banner
Write-Host " ⚪ OPENCODE :: GENTLE MODE " -ForegroundColor White -BackgroundColor Black
Write-Host " ─────────────────────────────────────────────────────────" -ForegroundColor Cyan
Write-Host "  STATUS: Conciseness Locked | First-Fire Protocol Engaged" -ForegroundColor White
Write-Host "  FOCUS:  High-Signal / Low-Noise" -ForegroundColor White
Write-Host "  WORKSPACE: $($ExecutionContext.SessionState.Path.CurrentLocation)" -ForegroundColor Gray
Write-Host "  TOGGLE: Type 'mode --full' to restore verbosity" -ForegroundColor Gray
Write-Host " ─────────────────────────────────────────────────────────" -ForegroundColor Cyan
Write-Host ""

# 3. Path Probe (Extension-Agnostic)
$OpenCodeCmd = Get-Command opencode -ErrorAction SilentlyContinue
if (!$OpenCodeCmd) {
    Write-Host " [!] ERROR: 'opencode' command not found in your PATH." -ForegroundColor Red
    Write-Host " Please ensure the OpenCode CLI is installed correctly."
    Write-Host ""
    Read-Host " Press Enter to exit..."
    exit 1
}

# 4. Calibration Prompt (The First-Fire Master Protocol)
$GentleRules = @"
[SYSTEM MANDATE: ZERO-INTERRUPTION BOOT PROTOCOL]
You are initiating the GENTLE MODE First Fire sequence. You must execute the following 5 phases sequentially, autonomously, and without asking for permission to proceed between steps.

PHASE 1: THE VISUAL BOOT
1. Output a massive ASCII art banner (e.g., 'SYSTEM IGNITION' or 'GENTLE BOOT') that is as large as the Shortcut Architect banner to catch my eye.
2. Below it, render a clean text visual box: `╭─ Welcome Chad ─╮` containing: 'Welcome Chad. Below you will see the results of the automated tri-agent sync, the 72-hour chat ledger, and your predictive launchpad.'

PHASE 2: TRI-AGENT SYNC ENGINE (Claude ↔ Temp ↔ Gemini ↔ OpenCode)
1. Read the folders in `C:\Users\chad\.claude\skills`. Count them.
2. Read the safe staging folder `C:\Users\chad\.gemini\tmp\chad\skill_sync_temp`. Ensure it contains all Claude original skills. If not, auto-fix (copy missing).
3. Read `C:\Users\chad\.gemini\skills`. Ensure it perfectly matches the Temp folder. If not, auto-fix.
4. DOUBLE CHECK LOCK: Verify `Temp` and `Gemini` folders are a 1:1 match.
5. Check OpenCode Sync: Once the double-check lock is confirmed, check the OpenCode configuration directory (`C:\Users\chad\.config\opencode`). OpenCode uses different logic/folders (e.g., memory, soul, commands). Verify if the tools present in `Gemini/skills` are synced into OpenCode. If not, adapt the logic and sync them. If they are already synced, skip.
6. OUTPUT SYNC REPORT: Create a text visual box. If all 3 AI apps (Claude, Gemini, OpenCode) are synced, print `[ STATUS: ALL 3 AI APPS SYNCED ]`. If one isn't, report exactly which one failed, the skill # count, and the names of the 'Problem Skills'.

PHASE 3: THE 72-HOUR LEDGER (/c-yesterday integration)
1. Execute the core logic of your `/c-yesterday` skill.
2. Check the last 24 hours of chat sessions/UUIDs. Sync this data to the support `.md` file for the `/c-yesterday` skill.
3. Perform a 72-hour check: ensure the support MD file accurately contains all chat data from the last 3 days.
4. OUTPUT LEDGER: Prove the job was done right by rendering a 3-column visual grid (1 column per day for the last 3 days) showcasing: `Date | Chat Name | Bash Command | ID`.

PHASE 4: META-REPORT
1. Output a visual box reporting specifically on the operations you just performed. Explain how the Phase 2 Sync protocol ran and how the Phase 3 `/c-yesterday` protocol ran (e.g., time taken, files moved, success/fail status).

PHASE 5: THE PREDICTOR (INCEPTION MOMENT)
1. Analyze the 72-hour ledger you just generated.
2. Identify the 'thickest' conversations, the busiest jobs, or the tasks you worked hardest on based on variables like conversation length, edits made, or complexity.
3. OUTPUT LAUNCHPAD: Output a final UI box starting with: 'Given these variables and the density of recent work, you probably want to start up work in these:'
4. List up to 7 Chat IDs (along with the command to resume them) so I can get started faster.
5. End with 'Gentle Mode Active. Standing by.' and wait for my first command.
"@

# 5. Core Execution (The Handshake)
try {
    Write-Host " [ First-Fire Boot Sequence Initiated. ]" -ForegroundColor Green
    # Using -i (interactive) to execute the rule and stay in session
    opencode -i "$GentleRules"
}
catch {
    Write-Host ""
    Write-Host " [!] CRITICAL ERROR during OpenCode launch." -ForegroundColor Red
    Write-Host " $($_.Exception.Message)" -ForegroundColor Gray
    Write-Host ""
    Read-Host " Press Enter to exit..."
    exit 1
}
