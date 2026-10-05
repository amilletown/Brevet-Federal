# Brevet Fédéral — Révisions Nottwil

Application de révision hors-ligne pour l'examen du **Brevet fédéral de professeur de sports de neige** (discipline snowboard), session du **vendredi 9 octobre 2026, Nottwil**.

## Contenu

9 sections : déroulement de l'examen, entretien, jeu de rôle, réflexion, les 4 cas pratiques du portfolio, cadre juridique (FIS, SKUS, LAR/OAR, CO), technique snowboard, pédagogie, plus **87 fiches d'auto-test** avec filtrage par thème et mode aléatoire.

## Installation sur téléphone

1. Ouvrir l'URL GitHub Pages dans **Safari** (iPhone) ou **Chrome** (Android).
2. iPhone : bouton Partager → **Sur l'écran d'accueil**. Android : menu ⋮ → **Installer l'application**.
3. L'app fonctionne ensuite **sans réseau** (service worker, cache complet).

## Publication

Repo statique. Activer GitHub Pages : *Settings → Pages → Source : Deploy from a branch → `main` / `(root)`*.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | application complète (HTML/CSS/JS, autonome) |
| `manifest.webmanifest` | métadonnées PWA |
| `sw.js` | service worker, cache-first |
| `icon-*.png` | icônes d'installation |
