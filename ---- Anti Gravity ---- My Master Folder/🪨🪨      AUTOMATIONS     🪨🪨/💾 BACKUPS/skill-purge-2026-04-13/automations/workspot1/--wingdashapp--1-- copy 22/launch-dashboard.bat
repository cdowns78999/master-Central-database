@echo off
:: ============================================================
::  Wing Dashboard Launcher
::  - Starts save-result-server on port 3003 (if not running)
::  - Opens index.html in Chrome with cache-buster
:: ============================================================

set "DASH_DIR=C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨      AUTOMATIONS     🪨🪨\workspot1\--wingdashapp--1--"
set "PYTHON=C:\Users\chad\AppData\Local\Programs\Python\Python312\python.exe"
set "SERVER_SCRIPT=%DASH_DIR%\ADMIN\tools\save-result-server.py"
set "INDEX_FILE=%DASH_DIR%\index.html"

:: ── Check if port 3003 is already in use ──
netstat -an | findstr ":3003" >nul 2>&1
if %errorlevel%==0 (
    echo [Wing] Save-result-server already running on port 3003. Skipping start.
) else (
    echo [Wing] Starting save-result-server on port 3003...
    start "WingDashServer" /min "%PYTHON%" "%SERVER_SCRIPT%"
    echo [Wing] Waiting for server to boot...
    timeout /t 1 /nobreak >nul
)

:: ── Build cache-buster value ──
set /a "CACHEBUST=%random%%random%"

:: ── Open dashboard in Chrome ──
echo [Wing] Opening Wing Dashboard in Chrome...
start "" chrome "%INDEX_FILE%?v=%CACHEBUST%"

echo [Wing] Done. Server stays running in background.
