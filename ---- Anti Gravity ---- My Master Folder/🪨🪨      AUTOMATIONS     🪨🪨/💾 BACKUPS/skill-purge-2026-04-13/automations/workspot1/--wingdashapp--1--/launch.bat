@echo off
:: Kill any existing python servers
taskkill /F /IM python.exe >nul 2>&1
timeout /t 1 /nobreak >nul

:: Start server from repo root
cd /d "C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database"
start "WingDashServer" /min python -m http.server 3000
timeout /t 2 /nobreak >nul

:: Open dashboard via PowerShell (handles URL encoding cleanly)
powershell -command "Start-Process 'http://localhost:3000/----%20Anti%20Gravity%20----%20My%20Master%20Folder/%F0%9F%AA%A8%F0%9F%AA%A8%20%20%20%20%20%20AUTOMATIONS%20%20%20%20%20%F0%9F%AA%A8%F0%9F%AA%A8/workspot1/--wingdashapp--1--/index.html?v=$([int](Get-Date -UFormat %%s))'"
