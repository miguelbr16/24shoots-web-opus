$ErrorActionPreference = "Continue"
Set-Location $PSScriptRoot

$linkFile = Join-Path $PSScriptRoot "ENLACE-PUBLICO.txt"

Write-Host ""
Write-Host " ============================================"
Write-Host "  COMPARTIR WEB CON ALGUIEN FUERA DE CASA"
Write-Host " ============================================"
Write-Host ""

# Comprobar que la web local responde
try {
    $null = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    Write-Host " [OK] Web detectada en localhost:3000" -ForegroundColor Green
} catch {
    Write-Host " [ERROR] La web NO esta corriendo." -ForegroundColor Red
    Write-Host ""
    Write-Host "  1. Abre primero: iniciar-web.bat"
    Write-Host "  2. Espera a ver 'Ready' en esa ventana"
    Write-Host "  3. Luego vuelve a ejecutar compartir-web.bat"
    Write-Host ""
    Read-Host "Pulsa Enter para cerrar"
    exit 1
}

Write-Host ""
Write-Host " Generando enlace publico... (15-30 segundos)"
Write-Host " NO CIERRES esta ventana mientras compartes"
Write-Host ""

$shown = $false

& npx --yes cloudflared tunnel --url http://localhost:3000 2>&1 | ForEach-Object {
    $line = "$_"
    Write-Host $line

    if (-not $shown -and $line -match "(https://[a-z0-9-]+\.trycloudflare\.com)") {
        $publicUrl = $Matches[1]
        $shareUrl = "$publicUrl/es"
        $shown = $true

        $banner = @"

 ============================================
   ENLACE PARA COMPARTIR (copia y envia):
 ============================================

   $shareUrl

 ============================================
   Tambien guardado en: ENLACE-PUBLICO.txt
 ============================================

"@

        $banner | Out-File -FilePath $linkFile -Encoding utf8
        Write-Host $banner -ForegroundColor Yellow

        try {
            notepad.exe $linkFile
        } catch {
            # ignorar si notepad no abre
        }
    }
}
