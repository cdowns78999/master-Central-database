@echo off
chcp 65001 >nul
title Karpathy Wiki Lab
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0claude.ps1"
echo.
echo [session ended - press any key to close]
pause >nul
