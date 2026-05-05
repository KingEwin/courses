# QCM — Tests et Déploiement (ING1)

- **Format** : 30 questions à choix multiples
- **Couverture** : DJ1 (Q1–10), DJ2 (Q11–20), DJ3 (Q21–30)
- **Mix** : théorie (~60%), lecture de code (~30%), cas pratique (~10%)
- **Durée recommandée** : 30 min
- **Notation suggérée** : 1 point par bonne réponse, 0 sinon (pas de point négatif)
- **Bonnes réponses marquées** ✅

---

## DJ1 — Stratégie de test + tests unitaires Jest

### Q1 — Pyramide des tests

Dans la pyramide des tests classique, quel niveau doit contenir **le plus de tests** ?

- A) Tests E2E
- B) Tests d'intégration
- C) ✅ Tests unitaires
- D) Tests manuels exploratoires

### Q2 — Critères FIRST

Le `I` de **FIRST** signifie :

- A) Independent (les tests doivent être autonomes)
- B) Integrated (intégrés au pipeline)
- C) ✅ Isolated (isolés les uns des autres)
- D) Idempotent

### Q3 — Coût d'un bug

Selon la règle classique, un bug détecté **en production** coûte par rapport à un bug détecté **en développement** :

- A) Environ le même coût
- B) 2 à 5 fois plus cher
- C) ✅ 10 à 100 fois plus cher
- D) Toujours moins cher car on a déjà livré

### Q4 — TDD

Le cycle TDD est :

- A) Refactor → Red → Green
- B) Green → Red → Refactor
- C) ✅ Red → Green → Refactor
- D) Test → Code → Deploy

### Q5 — Lecture de code Jest

```ts
test('addition', () => {
  expect(1 + 1).toBe(3);
});
```

Que se passe-t-il quand on lance ce test ?

- A) Le test passe car `1 + 1` est défini
- B) ✅ Le test échoue (expected 3, received 2)
- C) Le test passe car aucune exception n'est levée
- D) Erreur de syntaxe

### Q6 — `jest.fn()` vs `jest.mock()`

Quelle affirmation est vraie ?

- A) `jest.fn()` mock un module entier
- B) ✅ `jest.fn()` crée une fonction mock isolée ; `jest.mock()` mock un module entier
- C) Les deux sont équivalents
- D) `jest.mock()` ne fonctionne que sur les modules ES6

### Q7 — Pattern AAA

Le pattern AAA pour structurer un test est :

- A) Assert / Act / Analyse
- B) ✅ Arrange / Act / Assert
- C) Arrange / Assert / Act
- D) Action / Assertion / Acceptance

### Q8 — Couverture de code

Une couverture **de lignes** à 100% garantit-elle l'absence de bugs ?

- A) Oui, c'est la définition de la couverture totale
- B) Oui, si elle est combinée à des tests d'intégration
- C) ✅ Non, elle ne mesure pas la qualité des assertions ni les cas non testés (ex : valeurs limites)
- D) Non, mais une couverture **de branches** à 100% le garantit

### Q9 — Couverture branches

`if (a && b) { ... }` — combien de branches faut-il couvrir au minimum ?

- A) 1
- B) 2
- C) ✅ 4 (a=true/false × b=true/false)
- D) 8

### Q10 — Lecture de code mock

```ts
const charge = jest.fn().mockResolvedValue({ success: true });
await service.register('event-1', 'a@b.c');
expect(charge).toHaveBeenCalledTimes(1);
```

Que vérifie-t-on ici ?

- A) Que `charge` retourne bien `{ success: true }`
- B) ✅ Que la fonction mockée a été appelée exactement une fois
- C) Que le service utilise async/await
- D) Que la base de données est isolée

---

## DJ2 — Tests d'intégration + E2E

### Q11 — Intégration vs unitaire

Lequel est un test d'**intégration** typique ?

- A) Tester `formatDate(d)` avec 5 dates
- B) ✅ Tester `POST /users` avec une vraie DB SQLite et vérifier l'insertion
- C) Cliquer sur "S'inscrire" dans le navigateur et vérifier l'écran de bienvenue
- D) Compiler le code TypeScript

### Q12 — Supertest

Que fait Supertest ?

- A) Lance un navigateur headless
- B) ✅ Permet d'envoyer des requêtes HTTP à une app Express **sans démarrer de serveur réel**
- C) Mock automatiquement la base de données
- D) Génère des données de test aléatoires

### Q13 — Isolation DB

Pourquoi recréer une base SQLite **in-memory** à chaque test plutôt qu'utiliser une DB partagée ?

- A) C'est plus rapide en disque
- B) ✅ Pour garantir l'isolation : un test ne doit pas dépendre de l'ordre d'exécution
- C) SQLite ne supporte pas les tests partagés
- D) Pour économiser la mémoire

### Q14 — `beforeEach` vs `beforeAll`

`beforeEach` s'exécute :

- A) Une fois avant tous les tests du fichier
- B) ✅ Avant chaque `it()` du bloc `describe` parent
- C) Uniquement avant le premier test
- D) Après chaque test

### Q15 — Cypress sélecteurs

Quel sélecteur est **le plus robuste** au refactor ?

- A) `cy.get('.btn-primary')`
- B) `cy.get('button:nth-child(2)')`
- C) ✅ `cy.get('[data-testid=submit-btn]')`
- D) `cy.get('#submit')`

### Q16 — Cypress retry

Cypress retry-ability signifie :

- A) Cypress relance le test entier en cas d'échec
- B) ✅ Les commandes `cy.get(...).should(...)` réessaient automatiquement jusqu'au timeout
- C) Cypress ignore les erreurs réseau
- D) Cypress relance les assertions 3 fois maximum

### Q17 — Anti-pattern Cypress

Quel pattern est **déconseillé** dans un test Cypress ?

- A) Utiliser `data-testid`
- B) Chaîner `.should()` après `.get()`
- C) ✅ Utiliser `cy.wait(2000)` pour attendre une réponse API
- D) Utiliser `cy.intercept()` pour mocker une API externe

### Q18 — Flaky tests

Une cause **fréquente** de tests flaky en E2E est :

- A) ✅ Une dépendance temporelle non gérée (l'app n'a pas fini de charger)
- B) Trop de `data-testid` dans le HTML
- C) Une couverture trop élevée
- D) Le navigateur Chrome

### Q19 — Lecture de code Supertest

```ts
const res = await request(app).post('/login').send({ user: 'a' });
expect(res.status).toBe(401);
```

Que teste-t-on ?

- A) Que le login réussit
- B) ✅ Que l'API rejette le login (401 Unauthorized) avec un payload incomplet
- C) Que le serveur démarre sur le port 401
- D) Que `app` est défini

### Q20 — Cypress vs Playwright

Lequel est un **avantage** de Playwright sur Cypress ?

- A) Cypress est plus rapide
- B) Cypress est gratuit
- C) ✅ Playwright supporte nativement Chromium, Firefox et WebKit
- D) Playwright a plus de plugins

---

## DJ3 — CI/CD et stratégies de déploiement

### Q21 — CI vs CD

**CI** (Continuous Integration) signifie :

- A) Continuous Deployment
- B) ✅ Intégrer fréquemment les changements et les valider automatiquement (build + tests)
- C) Déployer en production à chaque commit
- D) Compiler le code en continu

### Q22 — GitHub Actions — déclencheur

```yaml
on:
  pull_request:
    branches: [main]
```

Quand le workflow se déclenche-t-il ?

- A) À chaque push sur main
- B) ✅ À chaque PR ouverte/mise à jour qui cible main
- C) Une fois par jour
- D) Manuellement uniquement

### Q23 — Caching deps

Pourquoi cacher `node_modules` (ou `~/.npm`) dans le pipeline ?

- A) Pour éviter de commit `node_modules`
- B) ✅ Pour réduire le temps d'installation des dépendances entre runs
- C) C'est obligatoire dans GitHub Actions
- D) Pour économiser l'espace disque local

### Q24 — Secrets

Comment référencer un secret GitHub `STRIPE_KEY` dans un workflow ?

- A) `$STRIPE_KEY`
- B) `env.STRIPE_KEY`
- C) ✅ `${{ secrets.STRIPE_KEY }}`
- D) `process.env.STRIPE_KEY`

### Q25 — Gating

Le **gating** dans un pipeline signifie :

- A) Ouvrir un ticket Jira automatiquement
- B) ✅ Bloquer la suite du pipeline si une condition n'est pas remplie (tests KO, couverture < seuil)
- C) Verrouiller le repo Git
- D) Limiter le nombre de runs simultanés

### Q26 — Blue/Green

Avantage **principal** de blue/green ?

- A) Moins de serveurs nécessaires
- B) ✅ Rollback quasi-instantané (bascule du trafic vers l'ancien environnement)
- C) Zéro coût d'infrastructure
- D) Pas besoin de tests en production

### Q27 — Canary

Une release **canary** consiste à :

- A) Déployer sur tous les serveurs en parallèle
- B) ✅ Déployer la nouvelle version sur un petit % du trafic, puis augmenter progressivement
- C) Déployer uniquement le vendredi
- D) Déployer dans un container isolé

### Q28 — Feature flags

Quel est le **bénéfice principal** des feature flags ?

- A) Remplacent les tests unitaires
- B) ✅ Découpler le **déploiement** (livrer le code) de la **release** (activer la fonctionnalité)
- C) Compilation plus rapide
- D) Couverture de code automatique

### Q29 — Rollback automatique

Un rollback automatique se déclenche typiquement sur :

- A) Une PR mergée
- B) Un `git push --force`
- C) ✅ Une dégradation détectée par le monitoring (taux d'erreur, latence p95) au-delà d'un seuil
- D) Une fois par semaine

### Q30 — Cas pratique

Une équipe veut **livrer une nouvelle UI** uniquement à 5% des utilisateurs avant un rollout général. Quelle stratégie est la **plus adaptée** ?

- A) Blue/Green
- B) Big bang
- C) ✅ Feature flag (ciblage par segment d'utilisateurs)
- D) Rolling update

---

## Barème indicatif

| Score | Appréciation |
|-------|--------------|
| 27–30 | Excellente maîtrise |
| 21–26 | Bonne maîtrise |
| 15–20 | Acquis avec lacunes ciblées |
| < 15 | Reprendre les notions clés (pyramide, mocking, CI/CD) |
