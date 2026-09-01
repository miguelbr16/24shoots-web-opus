@echo off
title 24Shoots - Restaurar diseño V3 (antes videos oficiales git)
cd /d "%~dp0..\.."

set SRC=%~dp0

echo.
echo  Restaurando diseño V3 (portfolio oficial, mailto, contacto cliente)...
echo.

xcopy /E /Y /I "%SRC%src" "src" >nul
xcopy /E /Y /I "%SRC%content\es" "content\es\" >nul
xcopy /E /Y /I "%SRC%content\en" "content\en\" >nul
xcopy /Y "%SRC%config\*" "config\" >nul

echo  [OK] Diseño V3 restaurado.
echo  Ejecuta reiniciar-web.bat para ver los cambios.
echo.
pause
