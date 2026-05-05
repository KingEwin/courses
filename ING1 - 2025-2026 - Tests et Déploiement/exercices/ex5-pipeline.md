# Exercice 5 — Compléter un pipeline GitHub Actions

- **Demi-journée** : DJ3 — bloc 1 (CI/CD GitHub Actions)
- **Durée** : 20 min (5 min consigne / 12 min travail / 3 min restitution)
- **Format** : 🚪 Breakout rooms — groupes de 3-4
- **Livrable** : `.github/workflows/ci.yml` complété, push sur une branche → CI verte

## Objectif

Lire un workflow CI/CD volontairement incomplet, **identifier les manques**, et les compléter pour obtenir un pipeline qui : (1) cache les deps, (2) lance les tests, (3) bloque sur seuil de couverture, (4) déploie sur main uniquement.

## Mise en place

Ouvrir `.github/workflows/ci.yml` dans le repo TP. Lire les commentaires `TODO`.

## Énoncé

Ajouter les **4 étapes manquantes** :

### 1. Cache des dépendances npm

Dans le step `Setup Node.js`, ajouter `cache: 'npm'` (option de `actions/setup-node@v4`).
→ Évite de réinstaller `node_modules` à chaque run.

### 2. Step "Run tests with coverage"

Lancer `npm run test:coverage` pour générer le rapport dans `coverage/`.

### 3. Gating couverture

Ajouter un step qui **fait échouer le job** si la couverture lignes est < 70%.

```yaml
- name: Enforce coverage threshold (70%)
  run: |
    COVERAGE=$(node -e "console.log(require('./coverage/coverage-summary.json').total.lines.pct)")
    awk "BEGIN { exit !($COVERAGE >= 70) }"
```

> Astuce : pour générer `coverage-summary.json`, ajouter `'json-summary'` dans `coverageReporters` du `jest.config.ts`.

### 4. Job `deploy`

Ajouter un nouveau job nommé `deploy` qui :
- `needs: test` (ne tourne qu'après le job test au vert)
- `if: github.event_name == 'push' && github.ref == 'refs/heads/main'`
- Utilise un `environment: production` (protection GitHub)
- Pour cet exo : un simple `echo "Deploying..."` suffit

## Critères de réussite

- ✅ Workflow YAML valide (pas d'erreur de parsing GitHub)
- ✅ Sur PR : le job `test` tourne, `deploy` est skippé
- ✅ Sur push main : les deux jobs tournent
- ✅ Si on dégrade la couverture sous 70%, le step de gating échoue

## Question de restitution

Pourquoi mettre le déploiement dans un **job séparé** plutôt qu'un step à la fin de `test` ?

→ Réponses attendues :
- **Re-run** indépendant possible (re-déployer sans relancer les tests)
- `if:` plus clair (déploiement = condition de branche)
- **Environment GitHub** = protections, secrets dédiés, approval manuel possible

## Bonus

Ajouter un step qui **upload le rapport de couverture** comme artefact (`actions/upload-artifact@v4`).
