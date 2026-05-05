# Karpathy Wiki Lab — claude.ps1
# Interactive launcher for the LLM Wiki + Pinecone RAG hybrid test lab

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$LabRoot    = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogDir     = Join-Path $LabRoot "logs"
$BackupDir  = Join-Path $LabRoot ".backups"
$SourcesDir = Join-Path $LabRoot "sources"
$WikiDir    = Join-Path $LabRoot "wiki"
$SchemaFile = Join-Path $LabRoot "CLAUDE.md"
$ConfigFile = Join-Path $LabRoot ".pinecone-config"
$GuideFile  = Join-Path $LabRoot "guide.html"

$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$LogFile   = Join-Path $LogDir "session-$Timestamp.log"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $line = "[$((Get-Date).ToString('HH:mm:ss'))] [$Level] $Message"
    Write-Host $line
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

function Show-Banner {
    Clear-Host
    Write-Host ""
    Write-Host "  +==============================================+" -ForegroundColor Cyan
    Write-Host "  |    KARPATHY WIKI LAB                         |" -ForegroundColor Cyan
    Write-Host "  |    LLM Wiki + Pinecone RAG  ·  v0.1          |" -ForegroundColor Cyan
    Write-Host "  +==============================================+" -ForegroundColor Cyan
    Write-Host ""
}

function Test-HealthChecks {
    Write-Log "Running health checks..."
    $ok = $true
    foreach ($d in @($SourcesDir, $WikiDir, $LogDir, $BackupDir)) {
        if (-not (Test-Path $d)) {
            Write-Log "Missing folder: $d" "WARN"
            $ok = $false
        } else {
            Write-Log "  OK  $(Split-Path $d -Leaf)"
        }
    }
    if (-not (Test-Path $SchemaFile)) {
        Write-Log "Missing CLAUDE.md schema file" "WARN"
        $ok = $false
    } else {
        Write-Log "  OK  CLAUDE.md"
    }
    if (Test-Path $ConfigFile) {
        Write-Log "  OK  Pinecone config present"
    } else {
        Write-Log "  --  Pinecone config NOT set (run menu 5)" "INFO"
    }
    if ($ok) { Write-Log "Health check PASSED" } else { Write-Log "Health check FAILED" "WARN" }
    return $ok
}

function Invoke-DryRun {
    Write-Log "DRY-RUN MODE - no files will change"
    $sources = Get-ChildItem $SourcesDir -File -ErrorAction SilentlyContinue
    Write-Log "  Sources found: $($sources.Count)"
    foreach ($s in $sources) {
        Write-Log "    - Would process: $($s.Name)"
    }
    $existing = Get-ChildItem $WikiDir -File -ErrorAction SilentlyContinue
    Write-Log "  Existing wiki articles: $($existing.Count)"
    Write-Log "Dry-run complete."
}

function Invoke-Index {
    Write-Log "Index action started"
    $sources = Get-ChildItem $SourcesDir -File -ErrorAction SilentlyContinue
    if ($sources.Count -eq 0) {
        Write-Log "No sources to index - drop files into sources/ first" "WARN"
        return
    }
    Write-Log "Backing up current wiki state..."
    # Fresh timestamp per-backup so repeated runs don't collide
    $bts = Get-Date -Format "yyyyMMdd-HHmmss"
    $bpath = Join-Path $BackupDir $bts
    New-Item -ItemType Directory -Path $bpath -Force | Out-Null
    $wikiItems = Get-ChildItem $WikiDir -ErrorAction SilentlyContinue
    if ($wikiItems -and $wikiItems.Count -gt 0) {
        $srcPattern = Join-Path $WikiDir "*"
        Copy-Item -Path $srcPattern -Destination $bpath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Log "  Backup -> $bpath ($($wikiItems.Count) items)"
    } else {
        Write-Log "  Backup -> $bpath (empty wiki, nothing to copy)"
    }
    Write-Log "Ready for Claude to process $($sources.Count) source(s)."
    Write-Log "Next step: ask Claude in this directory to read sources/ and write wiki/ per CLAUDE.md"
}

function Show-Logs {
    $latest = Get-ChildItem $LogDir -Filter "*.log" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    if (-not $latest) {
        Write-Log "No logs yet." "WARN"
        return
    }
    Write-Host ""
    Write-Host "  Latest log: $($latest.Name)" -ForegroundColor Yellow
    Write-Host "  --------------------------------" -ForegroundColor DarkGray
    Get-Content $latest.FullName | ForEach-Object { Write-Host "  $_" }
    Write-Host ""
}

function Set-PineconeConfig {
    Write-Host ""
    Write-Host "  PINECONE SETUP" -ForegroundColor Green
    Write-Host "  ---------------" -ForegroundColor DarkGray
    Write-Host "  Free tier: 1 Starter index, ~100K vectors, serverless." -ForegroundColor Gray
    Write-Host "  Sign up   -> https://app.pinecone.io (email or Google)" -ForegroundColor Gray
    Write-Host "  Create idx-> dimensions 1536, metric cosine" -ForegroundColor Gray
    Write-Host "  API keys  -> https://app.pinecone.io/keys" -ForegroundColor Gray
    Write-Host ""
    $key = Read-Host "  Paste API key (or press Enter to skip)"
    if ([string]::IsNullOrWhiteSpace($key)) {
        Write-Log "Pinecone setup skipped" "INFO"
        return
    }
    $idx = Read-Host "  Index name (default: karpathy-lab)"
    if ([string]::IsNullOrWhiteSpace($idx)) { $idx = "karpathy-lab" }
    $cfg = @"
# Pinecone configuration - generated $Timestamp
PINECONE_API_KEY=$key
PINECONE_INDEX=$idx
PINECONE_DIMENSIONS=1536
PINECONE_METRIC=cosine
"@
    Set-Content -Path $ConfigFile -Value $cfg -Encoding UTF8
    Write-Log "Pinecone config saved -> .pinecone-config"
    Write-Log "  Index: $idx"
}

function Open-Guide {
    if (-not (Test-Path $GuideFile)) {
        Write-Log "guide.html not found" "WARN"
        return
    }
    Write-Log "Opening guide.html in default browser..."
    Start-Process $GuideFile
}

function Show-Menu {
    Write-Host "  +--------------------------------------+" -ForegroundColor DarkCyan
    Write-Host "  |  MENU                                |" -ForegroundColor DarkCyan
    Write-Host "  +--------------------------------------+" -ForegroundColor DarkCyan
    Write-Host "  |  [1] Health check                    |" -ForegroundColor White
    Write-Host "  |  [2] Dry-run (no writes)             |" -ForegroundColor White
    Write-Host "  |  [3] Index sources -> wiki           |" -ForegroundColor White
    Write-Host "  |  [4] View latest log                 |" -ForegroundColor White
    Write-Host "  |  [5] Pinecone setup (login + API)    |" -ForegroundColor White
    Write-Host "  |  [6] Open interactive guide          |" -ForegroundColor White
    Write-Host "  |  [q] Quit                            |" -ForegroundColor White
    Write-Host "  +--------------------------------------+" -ForegroundColor DarkCyan
    Write-Host ""
}

# ---- Main loop ----
# Auto-create ALL lab folders at startup so a fresh clone never fails
foreach ($d in @($LogDir, $SourcesDir, $WikiDir, $BackupDir)) {
    New-Item -ItemType Directory -Path $d -Force | Out-Null
}
Write-Log "Session start - Lab root: $LabRoot"

$running = $true
try {
    while ($running) {
        Show-Banner
        Show-Menu
        $choice = Read-Host "  Choose"
        switch ($choice) {
            "1" { Test-HealthChecks | Out-Null; Read-Host "  [Enter to continue]" }
            "2" { Invoke-DryRun; Read-Host "  [Enter to continue]" }
            "3" { Invoke-Index; Read-Host "  [Enter to continue]" }
            "4" { Show-Logs; Read-Host "  [Enter to continue]" }
            "5" { Set-PineconeConfig; Read-Host "  [Enter to continue]" }
            "6" { Open-Guide; Read-Host "  [Enter to continue]" }
            "q" { Write-Log "Session end"; $running = $false }
            default { Write-Host "  Unknown choice." -ForegroundColor Red; Start-Sleep -Milliseconds 800 }
        }
    }
} catch {
    Write-Log "FATAL: $($_.Exception.Message)" "ERROR"
    Write-Host ""
    Write-Host "  ! Script crashed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  ! Full log: $LogFile" -ForegroundColor Red
    Write-Host ""
    Read-Host "  [Enter to close]"
}
