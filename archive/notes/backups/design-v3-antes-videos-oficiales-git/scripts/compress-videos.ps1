param(
  [string]$InputDir = "..\media-source\oficiales",
  [string]$OutputDir = "..\public\videos\web"
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$portable = Join-Path $scriptDir "ffmpeg-portable\ffmpeg.exe"
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue

if ($ffmpeg) {
  $ffmpegExe = $ffmpeg.Source
} elseif (Test-Path $portable) {
  $ffmpegExe = $portable
} else {
  Write-Host "FFmpeg no encontrado."
  Write-Host "Lee INSTALAR-FFMPEG.txt en la raiz del proyecto."
  exit 1
}

$inputPath = Resolve-Path $InputDir -ErrorAction SilentlyContinue
if (-not $inputPath) {
  Write-Host "Carpeta de entrada no encontrada: $InputDir"
  Write-Host "Crea media-source\oficiales y mete ahi los mp4 originales."
  exit 1
}

$outputPath = Join-Path (Get-Location) $OutputDir
New-Item -ItemType Directory -Force -Path $outputPath | Out-Null

$files = Get-ChildItem $inputPath -File -Include *.mp4,*.mov,*.mkv -Recurse
if ($files.Count -eq 0) {
  Write-Host "No hay videos en $inputPath"
  exit 1
}

Write-Host "Comprimiendo $($files.Count) videos para web..."
Write-Host "Salida: $outputPath"
Write-Host ""

foreach ($file in $files) {
  $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
  $safe = ($base -replace '[^a-zA-Z0-9_-]+', '-').ToLower().Trim('-')
  $out = Join-Path $outputPath "$safe-web.mp4"

  Write-Host "-> $($file.Name)"

  & $ffmpegExe -y -i $file.FullName `
    -vf "scale='min(1920,iw)':-2" `
    -c:v libx264 -preset slow -crf 28 `
    -movflags +faststart `
    -c:a aac -b:a 128k `
    -pix_fmt yuv420p `
    $out 2>$null

  if ($LASTEXITCODE -ne 0) {
    Write-Host "   ERROR comprimiendo $($file.Name)" -ForegroundColor Red
    continue
  }

  $inMb = [math]::Round($file.Length / 1MB, 1)
  $outMb = [math]::Round((Get-Item $out).Length / 1MB, 1)
  Write-Host "   $inMb MB -> $outMb MB ($safe-web.mp4)"
}

Write-Host ""
Write-Host "Listo. Usa las rutas /videos/web/nombre-web.mp4 en portfolio.json"
