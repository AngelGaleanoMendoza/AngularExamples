# Configura la página de la boda en tu computadora (Windows / PowerShell).
#
# Qué hace:
#   1. Descarga el proyecto (o lo actualiza si ya lo tienes).
#   2. Si tienes GitHub CLI (gh) con sesión iniciada:
#        - pone "main" como rama principal,
#        - renombra el repositorio a "boda-mongalo-anderson",
#        - activa GitHub Pages (publicación con GitHub Actions),
#        - lanza la primera publicación.
#   3. Instala dependencias y abre la página en http://localhost:4200
#
# Cómo usarlo (en PowerShell, dentro de la carpeta donde lo quieras):
#   powershell -ExecutionPolicy Bypass -File .\configurar.ps1

# 'Continue' porque en PowerShell 5.1 los mensajes de git/gh por stderr se tratan como
# errores; revisamos el código de salida de cada comando con Revisar.
$ErrorActionPreference = 'Continue'

$Owner   = 'AngelGaleanoMendoza'
$OldRepo = 'AngularExamples'
$NewRepo = 'boda-mongalo-anderson'
$Folder  = 'boda-mongalo-anderson'

function Paso($texto) { Write-Host "`n==> $texto" -ForegroundColor Cyan }
function Tiene($cmd)  { [bool](Get-Command $cmd -ErrorAction SilentlyContinue) }
function Revisar($que) {
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Falló: $que (código $LASTEXITCODE). Revisa el mensaje de arriba." -ForegroundColor Red
    exit 1
  }
}

Paso 'Revisando programas necesarios'
foreach ($cmd in 'git', 'node', 'npm') {
  if (-not (Tiene $cmd)) {
    Write-Host "Falta '$cmd'. Instala Git (https://git-scm.com) y Node.js 22 (https://nodejs.org) y vuelve a correr el script." -ForegroundColor Red
    exit 1
  }
}
Write-Host "git $(git --version), node $(node --version), npm $(npm --version)"

# --- GitHub: rama principal, nombre y Pages ---------------------------------
$Repo = $OldRepo
if ((Tiene 'gh') -and ((gh auth status 2>&1 | Out-String) -match 'Logged in')) {
  gh repo view "$Owner/$NewRepo" *> $null
  if ($LASTEXITCODE -eq 0) { $Repo = $NewRepo }

  Paso "Poniendo 'main' como rama principal"
  gh repo edit "$Owner/$Repo" --default-branch main
  Revisar 'cambiar la rama principal'

  if ($Repo -ne $NewRepo) {
    Paso "Renombrando el repositorio a '$NewRepo'"
    gh repo rename $NewRepo --repo "$Owner/$Repo" --yes
    Revisar 'renombrar el repositorio'
    $Repo = $NewRepo
  }

  Paso 'Activando GitHub Pages (fuente: GitHub Actions)'
  gh api "repos/$Owner/$Repo/pages" *> $null
  if ($LASTEXITCODE -eq 0) {
    gh api -X PUT "repos/$Owner/$Repo/pages" -f build_type=workflow | Out-Null
  } else {
    gh api -X POST "repos/$Owner/$Repo/pages" -f build_type=workflow | Out-Null
  }
  Revisar 'activar GitHub Pages'

  Paso 'Lanzando la publicación'
  gh workflow run deploy-pages.yml --repo "$Owner/$Repo" --ref main
  Revisar 'lanzar la publicación'
  Write-Host "Progreso: https://github.com/$Owner/$Repo/actions"
  Write-Host "En 1-2 minutos la página estará en: https://$($Owner.ToLower()).github.io/$Repo/" -ForegroundColor Green
} else {
  Write-Host @"

No encontré GitHub CLI con sesión iniciada, así que la parte de GitHub hay que hacerla a mano
(o instala https://cli.github.com, corre 'gh auth login' y vuelve a correr este script):
  1. https://github.com/$Owner/$OldRepo/settings/branches -> Default branch: main
  2. https://github.com/$Owner/$OldRepo/settings          -> Repository name: $NewRepo -> Rename
  3. https://github.com/$Owner/$NewRepo/settings/pages    -> Source: GitHub Actions
"@ -ForegroundColor Yellow
}

# --- Copia local -------------------------------------------------------------
$Url = "https://github.com/$Owner/$Repo.git"
if (Test-Path "$Folder\.git") {
  Paso "Actualizando la carpeta '$Folder'"
  git -C $Folder remote set-url origin $Url
  git -C $Folder fetch origin
  git -C $Folder checkout main
  git -C $Folder pull --ff-only origin main
  Revisar 'actualizar la carpeta'
} else {
  Paso "Descargando el proyecto en '$Folder'"
  git clone --branch main $Url $Folder
  Revisar 'descargar el proyecto'
}

Set-Location $Folder

Paso 'Instalando dependencias'
npm ci
Revisar 'instalar dependencias'

Paso 'Corriendo pruebas'
npx ng test --watch=false
Revisar 'correr las pruebas'

Paso 'Abriendo la página en http://localhost:4200 (Ctrl+C para detener)'
npx ng serve --open
