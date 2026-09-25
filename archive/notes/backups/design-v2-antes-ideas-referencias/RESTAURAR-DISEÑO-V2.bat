@echo off
title 24Shoots - Restaurar diseño V2 (antes ideas referencias)
cd /d "%~dp0..\.."

set SRC=%~dp0

echo.
echo  Restaurando diseño V2 (color refinado, sin ideas Behance)...
echo.

xcopy /E /Y /I "%SRC%src" "src" >nul
xcopy /E /Y /I "%SRC%content\es" "content\es\" >nul
xcopy /E /Y /I "%SRC%content\en" "content\en\" >nul
xcopy /Y "%SRC%config\*" "config\" >nul

echo  [OK] Diseño V2 restaurado.
echo  Ejecuta reiniciar-web.bat para ver los cambios.
echo.
pause
