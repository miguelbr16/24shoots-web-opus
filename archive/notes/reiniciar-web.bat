@echo off
title 24Shoots - Reiniciar web
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%
echo.
echo  Reiniciando servidor (limpia cache y puerto 3000)...
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr LISTENING') do (
  taskkill /F /PID %%a >nul 2>&1
)

if exist ".next" (
  rmdir /s /q ".next"
  echo  Cache .next eliminada.
)

echo  Iniciando en http://localhost:3000
echo  Para parar: Ctrl+C
echo.
npm run dev
pause
