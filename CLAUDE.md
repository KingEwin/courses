# CLAUDE.md — Instructions projet

## Projet

Présentations Slidev pour les cours du Master Ingénierie Informatique et Management (G4).

## Commandes

```bash
# Développement d'un cours
cd <nom-du-cours> && npx slidev --open

# Build statique
cd <nom-du-cours> && npx slidev build

# Export PDF
cd <nom-du-cours> && npx slidev export
```

## Conventions

- **Langue des slides et notes** : français
- **Langue du code** : anglais (commentaires anglais)
- **Termes techniques** : conserver l'anglais consacré (API, CI/CD, DevOps, framework...)
- **Structure cours** : chaque cours dans son propre répertoire avec `slides.md`, `course.md`, `package.json`
- **Template** : `_template/` contient le squelette de référence à copier pour un nouveau cours
- **Nommage répertoires** : kebab-case (ex: `devops-ci-cd`, `archi-microservices`)

## Workflow de création de cours

1. Lire `AGENTS.md` pour les instructions détaillées de génération
2. Collecter les informations du cours (volume horaire, objectifs, prérequis, etc.)
3. Créer `course.md` d'abord (fiche cours avec plan et timing) — faire valider
4. Générer `slides.md` en respectant le timing de `course.md`
5. Chaque slide DOIT avoir des notes présentateur (commentaires HTML `<!-- -->`)
6. Vérifier la checklist de qualité dans `AGENTS.md`

## Slidev — Aide-mémoire

- Séparateur de slides : `---` entouré de lignes vides
- Notes présentateur : `<!-- Notes ici -->` en fin de slide
- Layouts : `default`, `center`, `two-cols`, `image-right`, `section`, `statement`, `fact`, `quote`
- Animations : `v-click`, `v-clicks` pour révélation progressive
- Table des matières : `<Toc columns="2" maxDepth="1" />`
- Diagrammes : blocs mermaid natifs
- Thème par défaut : `seriph`
