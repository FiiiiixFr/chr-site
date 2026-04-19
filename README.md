# CHR Solution — Site vitrine

Site statique HTML/CSS/JS déployé sur [chrsolution.fr](https://chrsolution.fr) via OVH + GitHub webhook.

## Stack

- HTML5 statique pur, pas de framework
- CSS vanilla avec variables (palette CHR : brun/turquoise/bleu/rouge/vert, typo Barlow)
- JS minimal (menu mobile, scroll reveal, toggle tarifs)
- FR + EN avec détection/bascule manuelle
- Images : Unsplash en hotlink (à remplacer par des photos maison quand dispo)

## Structure

```
/
├── index.html                 Home FR
├── fonctionnalites.html       Overview modules
├── gestion-achats.html        Module Achats (détail)
├── gestion-stock.html         Module Stock (détail)
├── pour-qui.html              Overview personas
├── restaurateurs.html
├── distributeurs.html
├── chaines.html
├── tarifs.html                Pricing avec toggle Stock / Achats / Suite
├── a-propos.html
├── contact.html               Form demande démo
├── blog.html                  Blog index
├── blog/bienvenue.html        Article #1
├── mentions-legales.html
├── cgv.html
├── confidentialite.html
├── 404.html
├── en/                        Versions anglaises
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   └── img/favicon.svg
├── .htaccess                  Cache, gzip, force HTTPS, 404
├── sitemap.xml
├── robots.txt
└── README.md
```

## Déploiement

Pattern identique à `support.chrsolution.app` :
1. Push sur `main` du repo GitHub `chr-site`
2. Webhook GitHub → OVH pull automatique
3. Fichiers servis depuis le multisite `chrsolution.fr` → dossier `/www` (ou `/site`) sur cluster129

### Déploiement initial

```bash
cd chr-site-repo
git init
git remote add origin git@github.com:FiiiiixFr/chr-site.git
git add .
git commit -m "Initial commit — site vitrine v1"
git branch -M main
git push -u origin main
```

Ensuite côté OVH : Hosting → Multisite → Ajouter un domaine → `chrsolution.fr` → pointer sur le dossier + activer Git + coller l'URL du repo + générer le webhook.

## Domaines à connecter

- `chrsolution.fr` → CNAME / A → cluster129 OVH (à configurer dans Domaines → DNS)
- Éventuellement rediriger `www.chrsolution.fr` → `chrsolution.fr`

## Points d'attention

- **Forms** : remplacer `https://formspree.io/f/VOTRE_ID` dans `/contact.html` et `/en/contact.html` par ton vrai ID Formspree (ou équivalent).
- **Images** : les photos Unsplash sont en hotlink — OK pour démarrer, à remplacer par tes propres photos (cuisine, restaurant, équipe) pour la version finale.
- **Mentions légales / CGV / Confidentialité** : templates à compléter par ton juriste avant mise en production publique.
- **Tarifs** : indicatifs, à valider.

## Pages EN miroir

Chaque page FR a son équivalent EN dans `/en/`. Les canonical / hreflang sont en place pour le SEO multilingue.
