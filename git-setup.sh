#!/bin/bash
set -euo pipefail

if [ -z "${1-}" ]; then
  echo "Uso: ./git-setup.sh <git-remote-url>"
  echo "Ex: ./git-setup.sh git@github.com:usuario/repositorio.git"
  exit 1
fi

REMOTE_URL="$1"

if [ ! -d .git ]; then
  git init
  echo "Repositório Git inicializado."
else
  echo "Repositório Git já existe."
fi

git add .
git commit -m "Initial commit" || echo "Nada para commitar"

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"

echo "Remote 'origin' definido para $REMOTE_URL"

echo "Pushing to origin main (creating branch if needed)..."

git branch -M main

git push -u origin main

echo "Feito. Se houver problemas de autenticação, configure suas credenciais SSH ou use HTTPS URL."
