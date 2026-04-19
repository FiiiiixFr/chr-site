#!/bin/bash
# Init du repo Git + push initial vers GitHub
# Usage: ./init-git.sh <github_repo_url>
# Ex:    ./init-git.sh git@github.com:FiiiiixFr/chr-site.git

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <github_repo_url>"
  echo "Ex:    $0 git@github.com:FiiiiixFr/chr-site.git"
  exit 1
fi

REPO_URL="$1"

cd "$(dirname "$0")"

echo "→ Initialisation Git..."
git init
git branch -M main

echo "→ Ajout des fichiers..."
git add .
git status

echo ""
echo "→ Commit initial..."
git commit -m "Initial commit — site vitrine CHR Solution v1

- Home FR + EN
- Fonctionnalités (overview + 2 modules détaillés)
- Pour qui (overview + 3 personas)
- Tarifs (3 formules × 3 paliers + Free Stock + add-ons)
- À propos, Contact, Blog
- Pages légales (mentions, CGV, confidentialité)
- Versions EN miroirs
- Design system : palette CHR, Barlow, responsive
- .htaccess OVH : cache, gzip, HTTPS, 404, headers sécurité
- sitemap.xml + robots.txt"

echo ""
echo "→ Ajout de la remote..."
git remote add origin "$REPO_URL"

echo ""
echo "→ Push initial..."
git push -u origin main

echo ""
echo "✅ Repo poussé sur $REPO_URL"
echo ""
echo "Prochaine étape : côté OVH"
echo "1. Aller dans Hosting → Multisite → Ajouter un domaine"
echo "2. Domaine : chrsolution.fr"
echo "3. Cible : dossier où tu veux (ex: /www ou /site/chrsolution.fr)"
echo "4. Onglet Git : coller l'URL du repo, branche main"
echo "5. OVH génère un webhook — le coller dans GitHub → Settings → Webhooks"
echo "6. Vérifier DNS chrsolution.fr → cluster129.hosting.ovh.net"
echo "7. Activer SSL Let's Encrypt depuis OVH"
