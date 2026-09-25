@echo off
title 24Shoots - Restaurar diseño V1 (antes refinamiento color)
cd /d "%~dp0.."

set SRC=%~dp0

echo.
echo  Restaurando paleta y estilos del diseño V1...
echo.

copy /Y "%SRC%globals.css" "src\app\globals.css"
copy /Y "%SRC%site.json" "config\site.json"
copy /Y "%SRC%layout.tsx" "src\app\layout.tsx"

echo.
echo  [OK] Diseño V1 restaurado.
echo  Reinicia la web con reiniciar-web.bat para ver los cambios.
echo.
pause
