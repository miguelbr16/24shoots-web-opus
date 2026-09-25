@echo off
title 24Shoots - Web local
cd /d "%~dp0"
set PATH=C:\Program Files\nodejs;%PATH%
echo.
echo  Iniciando web 24Shoots en local...
echo  Abre: http://localhost:3000
echo  Para parar: cierra esta ventana o pulsa Ctrl+C
echo.
npm run dev
pause
