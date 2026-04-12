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
3. Copier `_template/` dans un nouveau répertoire
4. Créer `course.md` d'abord (fiche cours avec plan et timing) — faire valider
5. Générer `slides.md` en respectant le timing de `course.md`
6. Chaque slide DOIT avoir des notes présentateur (commentaires HTML `<!-- -->`)
7. Vérifier la checklist de qualité dans `AGENTS.md`

## Slidev — Aide-mémoire

- Séparateur de slides : `---` entouré de lignes vides
- Notes présentateur : `<!-- Notes ici -->` en fin de slide
- Animations : `v-click`, `v-clicks` pour révélation progressive
- Table des matières : `<Toc columns="2" maxDepth="1" />`
- Diagrammes : blocs mermaid natifs
- Thème de base : `seriph` + styles custom (`styles/index.css`, `uno.config.ts`)
- Polices : Inter (sans), Fira Code (mono)

## Layouts custom disponibles

| Layout | Usage | Props |
|--------|-------|-------|
| `course-cover` | Première slide du cours | `subtitle`, `session`, `instructor` |
| `section-cover` | Début de section (fond bleu) | `section` (numéro) |
| `exercise` | Slide d'exercice | `duration`, `type` (solo/group/demo) |
| `pause` | Slide de pause | `duration` (défaut: "15 min") |
| `recap` | Récapitulatif de section | `section` (nom de la section) |
| `end` | Dernière slide | — |

Layouts Slidev natifs aussi disponibles : `default`, `center`, `two-cols`, `two-cols-header`, `image-right`, `image-left`, `section`, `statement`, `fact`, `quote`, `full`

## Composants custom disponibles

| Composant | Usage | Props |
|-----------|-------|-------|
| `<KeyConcept>` | Mettre en valeur un concept clé | `title`, `icon` (défaut: "💡") |
| `<Tip>` | Info, warning, danger, success | `type` (info/warning/danger/success) |
| `<Exercise>` | Bloc exercice inline | `title`, `duration`, `type` (solo/group/demo) |
| `<Comparison>` | Comparaison côte à côte | `left`, `right`, `leftColor`, `rightColor` |
| `<Timeline>` | Déroulé chronologique | `:steps` (array: time, title, desc, active) |
| `<Recap>` | Bloc récapitulatif inline | `title` |
| `<Credit>` | Source/attribution | `author`, `source` |

## Éléments globaux

- **Barre de progression** : dégradé bleu-violet en haut de chaque slide (sauf covers, pause, end)
- **Footer** : "Master IIM — G4" + numéro de page (sauf covers, pause, end)

## Structure du slides.md type

```
headmatter (config + layout: course-cover)
→ Plan de la séance (<Toc>)
→ section-cover (Section 1)
  → slides de contenu (default, two-cols, etc.)
  → exercise
  → pause
→ section-cover (Section 2)
  → slides de contenu
→ recap
→ end
```
