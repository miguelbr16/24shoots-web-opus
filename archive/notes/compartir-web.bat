@echo off

title 24Shoots - Compartir web con un amigo

cd /d "%~dp0"

set PATH=C:\Program Files\nodejs;%PATH%



powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0compartir-web.ps1"



echo.

pause

