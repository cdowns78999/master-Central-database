@echo off
echo ══════════════════════════════════════
echo   Wing Dashboard — Local Server
echo ══════════════════════════════════════
echo.

cd /d "C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database"

:: Start Python HTTP server in a minimized window
start "WingDashServer" /min python -m http.server 3000

:: Wait for server to spin up
timeout /t 2 /nobreak >nul

:: Open dashboard in default browser
start "" "http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%AA%A8%F0%9F%AA%A8%20%20%20%20%20%20AUTOMATIONS%20%20%20%20%20%F0%9F%AA%A8%F0%9F%AA%A8/workspot1/--wingdashapp--1--/index.html"

echo Server running on http://localhost:3000
echo Close the minimized "WingDashServer" window to stop.
