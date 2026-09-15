# Cours — Master Ingénierie Informatique et Management (G4)

Présentations [Slidev](https://sli.dev) pour les cours du Master Ingénierie Informatique et Management.

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- npm ou pnpm

## Installation

```bash
npm install
```

## Structure

```
courses/
├── _template/          # Template de référence pour un nouveau cours
├── <nom-du-cours>/     # Un répertoire par cours
│   ├── slides.md       # Présentation Slidev
│   ├── course.md       # Fiche cours (plan, timing, objectifs)
│   ├── package.json    # Scripts npm
│   ├── public/         # Images et assets
│   └── snippets/       # Extraits de code
```

## Créer un nouveau cours

1. Copier le répertoire `_template/` :
   ```bash
   cp -r _template/ mon-nouveau-cours/
   ```

2. Éditer `course.md` avec les informations du cours (objectifs, plan détaillé, timing)

3. Générer les slides dans `slides.md`

4. Lancer en mode développement :
   ```bash
   cd mon-nouveau-cours
   npx slidev --open
   ```

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npx slidev --open` | Lancer le serveur de développement |
| `npx slidev build` | Construire la version statique |
| `npx slidev export` | Exporter en PDF |
| `npx slidev --remote` | Activer l'accès distant |
