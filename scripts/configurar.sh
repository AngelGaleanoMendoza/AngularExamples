#!/usr/bin/env bash
# Configura la página de la boda en tu computadora (Mac / Linux).
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
# Cómo usarlo:  bash configurar.sh
set -euo pipefail

OWNER=AngelGaleanoMendoza
OLD_REPO=AngularExamples
NEW_REPO=boda-mongalo-anderson
FOLDER=boda-mongalo-anderson

paso()  { printf '\n\033[36m==> %s\033[0m\n' "$1"; }
tiene() { command -v "$1" >/dev/null 2>&1; }

paso 'Revisando programas necesarios'
for cmd in git node npm; do
  if ! tiene "$cmd"; then
    echo "Falta '$cmd'. Instala Git y Node.js 22 (https://nodejs.org) y vuelve a correr el script." >&2
    exit 1
  fi
done
echo "$(git --version), node $(node --version), npm $(npm --version)"

# --- GitHub: rama principal, nombre y Pages ---------------------------------
REPO=$OLD_REPO
if tiene gh && gh auth status >/dev/null 2>&1; then
  if gh repo view "$OWNER/$NEW_REPO" >/dev/null 2>&1; then REPO=$NEW_REPO; fi

  paso "Poniendo 'main' como rama principal"
  gh repo edit "$OWNER/$REPO" --default-branch main

  if [ "$REPO" != "$NEW_REPO" ]; then
    paso "Renombrando el repositorio a '$NEW_REPO'"
    gh repo rename "$NEW_REPO" --repo "$OWNER/$REPO" --yes
    REPO=$NEW_REPO
  fi

  paso 'Activando GitHub Pages (fuente: GitHub Actions)'
  if gh api "repos/$OWNER/$REPO/pages" >/dev/null 2>&1; then
    gh api -X PUT "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null
  else
    gh api -X POST "repos/$OWNER/$REPO/pages" -f build_type=workflow >/dev/null
  fi

  paso 'Lanzando la publicación'
  gh workflow run deploy-pages.yml --repo "$OWNER/$REPO" --ref main
  echo "Progreso: https://github.com/$OWNER/$REPO/actions"
  echo "En 1-2 minutos la página estará en: https://$(echo "$OWNER" | tr '[:upper:]' '[:lower:]').github.io/$REPO/"
else
  cat <<MSG

No encontré GitHub CLI con sesión iniciada, así que la parte de GitHub hay que hacerla a mano
(o instala https://cli.github.com, corre 'gh auth login' y vuelve a correr este script):
  1. https://github.com/$OWNER/$OLD_REPO/settings/branches -> Default branch: main
  2. https://github.com/$OWNER/$OLD_REPO/settings          -> Repository name: $NEW_REPO -> Rename
  3. https://github.com/$OWNER/$NEW_REPO/settings/pages    -> Source: GitHub Actions
MSG
fi

# --- Copia local -------------------------------------------------------------
URL="https://github.com/$OWNER/$REPO.git"
if [ -d "$FOLDER/.git" ]; then
  paso "Actualizando la carpeta '$FOLDER'"
  git -C "$FOLDER" remote set-url origin "$URL"
  git -C "$FOLDER" fetch origin
  git -C "$FOLDER" checkout main
  git -C "$FOLDER" pull --ff-only origin main
else
  paso "Descargando el proyecto en '$FOLDER'"
  git clone --branch main "$URL" "$FOLDER"
fi

cd "$FOLDER"

paso 'Instalando dependencias'
npm ci

paso 'Corriendo pruebas'
npx ng test --watch=false

paso 'Abriendo la página en http://localhost:4200 (Ctrl+C para detener)'
npx ng serve --open
