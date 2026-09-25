@echo off
title 24Shoots - Comprimir videos para web
cd /d "%~dp0scripts"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\compress-videos.ps1"
echo.
pause
