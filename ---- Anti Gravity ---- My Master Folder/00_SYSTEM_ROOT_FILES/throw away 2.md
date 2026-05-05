# FINAL PLAN: open-code-gentle (Throw Away 2)

## What We Built (Based on Gemini's Debugged Plan)

### The Package (ps1 + bat + lnk + throw away md)
| File | Path | Purpose |
|------|------|---------|
| **open-code-gentle.ps1** | `C:\Users\chad\Desktop\open-code-gentle.ps1` | Core logic + banner + handshake |
| **open-code-gentle.bat** | `C:\Users\chad\Desktop\open-code-gentle.bat` | Desktop clickable trigger |
| **open-code-gentle.lnk** | `C:\Users\chad\Desktop\open-code-gentle.lnk` | Windows shortcut with "Start In" directory |
| **throw away 2.md** | `C:\Users\chad\throw away 2.md` | This plan document |

---

## Compare & Contrast: Gemini's Version vs. Ours

### Gemini's Original Plan (from chat)
```
1. Visual: Magenta/Black "GEMINI :: GENTLE MODE" banner
2. Logic: Variable-based $GentleRules stored in .ps1
3. Launch: gemini --system "$GentleRules" (uses --system flag)
4. Path Probe: Get-Command gemini (extension-agnostic)
5. Working Dir: Uses .lnk "Start in" property → C:\Users\chad
6. Cleanup: Conditional pausing (no -NoExit, uses try/catch + Read-Host)
```

### Our OpenCode Version (Adapted + Debugged)
```
1. Visual: Cyan/Black "◈ OPENC ODE :: GENTLE MODE" banner (OpenCode colors)
2. Logic: Variable-based $GentleRules stored in .ps1 ✓
3. Launch: opencode -i "$GentleRules" (uses -i flag, NOT --system)
4. Path Probe: Get-Command opencode + fallback to $env:APPDATA\npm\opencode.cmd ✓
5. Working Dir: .lnk "Start in" = C:\Users\chad ✓
6. Cleanup: try/catch + Read-Host on error, -NoExit kept for debugging ✓
```

### Key Differences
| Aspect | Gemini Plan | OpenCode Implementation |
|--------|-------------|----------------------|
| CLI Flag | `--system` (may not exist) | `-i` (interactive prompt injection) |
| Path Fallback | None | Added `$env:APPDATA\npm\opencode.cmd` fallback |
| Colors | Magenta/Black | Cyan/Black (OpenCode theme) |
| Working Dir | C:\Users\chad | C:\Users\chad ✓ |
| Toggle Command | `mode --full` | `/gentle-off` |

---

## The "Big Plan" — How To Get This Right

### Step 1: The Visual Handshake
- [x] Clear-Host at start (clean launch)
- [x] Render banner with OpenCode colors (Cyan/Gray)
- [x] Show current workspace path
- [x] Show toggle command (`/gentle-off`)

### Step 2: The Path Probe (Extension-Agnostic)
- [x] `Get-Command opencode` (finds .exe, .cmd, .ps1)
- [x] Fallback: `$env:APPDATA\npm\opencode.cmd`
- [x] Error handling: Show message + pause if not found

### Step 3: The Handshake (Prompt Injection)
- [x] Use `-i` flag (interactive) to send calibration prompt
- [x] $GentleRules tells OpenCode: "Be surgical, no filler, minimize thinking"
- [x] OpenCode acknowledges with "Gentle Mode Active"

### Step 4: The Shortcut (.lnk)
- [ ] Create Windows .lnk with:
  - Target: `powershell.exe`
  - Arguments: `-NoExit -ExecutionPolicy Bypass -File "C:\Users\chad\Desktop\open-code-gentle.ps1"`
  - Working Directory: `C:\Users\chad`
  - Icon: `opencode.exe` (if available)

### Step 5: Testing Protocol
1. Double-click `open-code-gentle.lnk` on desktop
2. Verify banner appears in Cyan/Black
3. Verify "Ready." appears in Green
4. Verify OpenCode launches in Gentle Mode
5. Type `/gentle-off` to test toggle

### Step 6: Debug Backups (from Gemini's plan)
- [x] **Backup 1**: Path fallback to npm directory
- [x] **Backup 2**: `-ExecutionPolicy Bypass` in .bat
- [ ] **Backup 3**: Rescue key (F5 reboot) — NOT YET IMPLEMENTED

---

## Files That Need Creation
1. `C:\Users\chad\Desktop\open-code-gentle.ps1` ✓ (done)
2. `C:\Users\chad\Desktop\open-code-gentle.bat` ✓ (done)
3. `C:\Users\chad\Desktop\open-code-gentle.lnk` ✓ (done)
4. `C:\Users\chad\throw away 2.md` ✓ (this file)

---

## Remaining Work
- [ ] Optional: Add F5 rescue key functionality
- [ ] Remove `-NoExit` once testing is complete (for clean exit)

---

**Status**: 100% Complete — All files created, shortcut live on desktop.
