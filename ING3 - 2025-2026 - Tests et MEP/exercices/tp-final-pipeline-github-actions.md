# TP Final — Pipeline GitHub Actions

**Durée** : 30 min | **Format** : groupes | **Livrable** : workflow fonctionnel + justification des quality gates

---

## Contexte

Votre équipe doit mettre en place la CI/CD pour l'application **SportEvents**. Un fichier workflow existe déjà dans `.github/workflows/ci.yml` mais il est incomplet. Votre mission : le compléter pour obtenir un pipeline fonctionnel en 3 étapes : **build → test → deploy**.

---

## Setup

Ouvrez le fichier `.github/workflows/ci.yml` dans votre éditeur. Vous y trouverez **5 TODOs** numérotés.

---

## TODO par TODO

### TODO 1 — Job "build"

Créez un job `build` qui vérifie que l'application s'installe et démarre correctement.

```yaml
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: |
          node src/server.js &
          sleep 2
          curl --fail http://localhost:3000/api/events
          kill %1
```

> **Explication** : on démarre le serveur en arrière-plan (`&`), on attend 2 secondes, on vérifie que l'API répond, puis on arrête le serveur.

---

### TODO 2 — Dépendance entre jobs

Ajoutez la dépendance pour que le job `test` ne s'exécute qu'après le succès du job `build`.

```yaml
  test:
    runs-on: ubuntu-latest
    needs: build          # ← ajouter cette ligne
```

---

### TODO 3 — Tests unitaires

Ajoutez la commande pour exécuter les tests unitaires dans le job `test` :

```yaml
      - run: npm test
```

---

### TODO 4 — Tests E2E

Ajoutez les étapes pour installer Playwright et lancer les tests E2E :

```yaml
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
```

> **Note** : `--with-deps` installe aussi les dépendances système nécessaires au navigateur sur Ubuntu.

---

### TODO 5 — Job "deploy"

Créez un job `deploy` qui simule un déploiement :

```yaml
  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - run: echo "Deploying version ${{ github.sha }}..."
      - run: echo "Health check OK"
```

> **Points clés** :
> - `needs: test` → le deploy ne se lance que si les tests passent
> - `if: github.ref == 'refs/heads/main'` → on ne déploie que depuis la branche main (pas les PRs)

---

## Validation

Votre pipeline complété doit former cette chaîne :

```
build  →  test  →  deploy (main uniquement)
```

Vérifiez :
- [ ] Le fichier YAML est syntaxiquement valide (pas d'erreur d'indentation)
- [ ] Le job `test` dépend de `build`
- [ ] Le job `deploy` dépend de `test`
- [ ] Le deploy ne s'exécute que sur la branche `main`
- [ ] Les tests unitaires ET E2E sont exécutés dans le job `test`

---

## Bonus

Ajoutez un **quality gate** sur la couverture de code :

1. Modifiez la commande de test pour générer un rapport de couverture :
   ```yaml
   - run: npx vitest run --coverage
   ```

2. Ajoutez une étape qui échoue si la couverture est en dessous de 70% (nécessite le package `@vitest/coverage-v8`).

---

## Pour aller plus loin

Questions de réflexion (pas de livrable attendu) :
- Que se passe-t-il si le deploy échoue ? Comment ajouteriez-vous un rollback automatique ?
- Comment ajouteriez-vous un déploiement canary dans ce pipeline ?
- Quels secrets faudrait-il configurer pour un vrai déploiement (pas simulé) ?
