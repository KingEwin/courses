# Fiche cours — Tests et Déploiement

## Informations générales

- **Intitulé** : Tests et Déploiement
- **Volume horaire** : 10h30 (3 demi-journées de 3h30, pause de 20 min incluse)
- **Format** : 1,5 jour en distanciel
- **Découpage** : 3 demi-journées de 3h30
- **Public** : Ingénieur 1 — Bac+3 (1re année du cycle ingénieur G4)
- **Prérequis** : Dev B1/B2 (TypeScript opérationnel), DevOps ING1, Git maîtrisé
- **Stack imposée** : TypeScript — Jest, Cypress, GitHub Actions
- **Instructeur** : Yoann (expérience terrain en qualité logicielle et déploiement continu)

## Objectifs pédagogiques

À l'issue de ce cours, l'étudiant sera capable de :

1. **Expliquer** la pyramide des tests, les critères FIRST et le coût d'un bug selon la phase de détection
2. **Implémenter** des tests unitaires en TypeScript avec Jest, en utilisant les matchers, les fixtures et le mocking
3. **Mesurer** la couverture de code d'un projet et **interpréter** ses limites
4. **Écrire** des tests d'intégration sur une API REST avec Supertest et une base de données de test
5. **Automatiser** des tests end-to-end avec Cypress (sélecteurs, actions, assertions, gestion des flaky tests)
6. **Concevoir** un pipeline CI/CD GitHub Actions complet (build, test, déploiement, gating)
7. **Comparer** les principales stratégies de déploiement (blue/green, canary, rolling, feature flags) et **recommander** la plus adaptée à un contexte donné

## Plan détaillé

---

### Demi-journée 1 — Stratégie de test et tests unitaires (3h30)

#### Bloc 1 — Pourquoi et comment tester (90 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 5 min | Ouverture — tour rapide : "tu testes déjà ton code ? Comment ?" | Icebreaker |
| 15 min | Pourquoi tester ? Coût d'un bug selon la phase. Fails célèbres (Knight Capital, Crowdstrike, Ariane 5) | Cours magistral |
| 20 min | La pyramide des tests — unitaires, intégration, E2E, exploratoires. Trade-offs vitesse/coût/confiance | Cours magistral |
| 15 min | Critères FIRST (Fast, Isolated, Repeatable, Self-validating, Timely) | Cours magistral |
| 15 min | TDD — cycle Red-Green-Refactor. Quand l'utiliser, quand l'éviter | Cours magistral + démo |
| 10 min | Shift-left testing + mention BDD (Gherkin, Given-When-Then) | Cours magistral |
| 10 min | Synthèse bloc 1 + transition vers la pratique | Échange |

#### Pause (20 min)

#### Bloc 2 — Tests unitaires avec Jest et TypeScript (100 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Setup Jest + TypeScript — ts-jest, structure d'un projet typé | Démo |
| 20 min | Anatomie d'un test — `describe`, `it`/`test`, `expect`, matchers courants | Cours + démo live |
| 25 min | Mocking — `jest.fn`, `jest.mock`, spies, stubs. Tester un module qui dépend d'un autre | Cours + démo live |
| 15 min | Fixtures, factories et données de test. AAA (Arrange-Act-Assert) | Cours magistral |
| 15 min | Couverture de code — Istanbul/`--coverage`, lecture d'un rapport, lignes vs branches | Cours + démo |
| 10 min | Les pièges du 100% — couverture ≠ qualité. Mutation testing (mention) | Cours magistral |
| 5 min | Récap de la demi-journée + teaser DJ2 | Synthèse |

---

### Demi-journée 2 — Tests d'intégration et end-to-end (3h30)

#### Bloc 1 — Tests d'intégration (90 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 5 min | Retour DJ1 — questions, blocages | Échange |
| 15 min | Intégration vs unitaire — périmètre, coût, quand basculer | Cours magistral |
| 20 min | Tester une API REST avec Supertest (TypeScript) — structure, requêtes, assertions | Cours + démo live |
| 15 min | Base de données de test — SQLite in-memory, fixtures, seeds, migrations | Cours + démo |
| 15 min | Isolation des tests — `beforeEach`/`afterEach`, transactions, parallélisation sûre | Cours magistral |
| 15 min | Tests de composants front — React Testing Library (mention, démo flash) | Cours magistral |
| 5 min | Synthèse bloc 1 | Synthèse |

#### Pause (20 min)

#### Bloc 2 — Tests end-to-end avec Cypress (100 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Tests E2E — promesse, valeur, coût. Quand en écrire (et combien) | Cours magistral |
| 15 min | Cypress — installation, configuration TypeScript, structure d'un projet `cypress/` | Cours + démo |
| 20 min | Sélecteurs (`cy.get`, `cy.contains`, `data-testid`) et actions (`click`, `type`, `submit`) | Cours + démo live |
| 20 min | Assertions (`should`, `expect`) — chaînage, retry-ability, anti-patterns | Cours + démo live |
| 15 min | Flaky tests — causes, détection, stratégies de mitigation | Cours magistral |
| 10 min | Playwright — comparatif rapide, multi-navigateurs, quand le choisir | Cours magistral |
| 10 min | Récap DJ2 + teaser DJ3 (CI/CD) | Synthèse |

---

### Demi-journée 3 — CI/CD et stratégies de déploiement (3h30)

#### Bloc 1 — Pipeline CI/CD avec GitHub Actions (90 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Retour DJ2 — questions, observations sur les tests. Tour rapide : "tu as déjà déclenché un pipeline ?" | Échange |
| 15 min | Anatomie d'un pipeline CI/CD — build, test, package, deploy, promote, rollback | Cours magistral |
| 20 min | GitHub Actions — workflows YAML, déclencheurs (`push`, `pull_request`), jobs, steps | Cours + démo live |
| 15 min | Matrix builds, runners, services, caching des dépendances | Cours + démo |
| 15 min | Secrets, environments, protections, GITHUB_TOKEN | Cours magistral |
| 10 min | Gating — rapports JUnit, GitHub Checks, badges, statuts requis | Cours magistral |
| 5 min | Synthèse bloc 1 | Synthèse |

#### Pause (20 min)

#### Bloc 2 — Stratégies de déploiement et qualité en production (100 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 15 min | Environnements — dev, staging, preprod, prod. Promotion d'artefacts | Cours magistral |
| 15 min | Blue/Green — bascule sans interruption, schémas, prérequis | Cours + diagramme |
| 10 min | Canary release — déploiement progressif, métriques de bascule | Cours magistral |
| 10 min | Feature flags — activation sélective, dark launch | Cours magistral |
| 10 min | Rollback automatique — détection de régression, retour arrière | Cours magistral |
| 10 min | Sécurité CI/CD — SAST (mention), dependency scanning (Dependabot, Snyk) | Cours magistral |
| 15 min | Monitoring & observabilité (mention) — logs, métriques, traces, 4 golden signals | Cours magistral |
| 15 min | Synthèse globale des 3 demi-journées + ressources pour aller plus loin | Synthèse |
| 10 min | Modalités du QCM + mot de fin | Échange |

---

## Évaluation

- **Type** : QCM
- **Moment** : à préparer après la finalisation du contenu du cours
- **Périmètre** : l'ensemble des 3 demi-journées (stratégie, tests unitaires, intégration, E2E, CI/CD, stratégies de déploiement)
- **Format** : questions à choix multiples couvrant théorie et lecture de code

## Supports pédagogiques

### À préparer

| Support | Description |
|---------|-------------|
| Slides Slidev | Présentation pour les 3 demi-journées (`slides.md`) |
| Snippets de démo | Projet TypeScript minimal avec Jest + Supertest + Cypress |
| Workflow GitHub Actions exemple | YAML commenté à projeter en démo live |
| QCM | 25-30 questions couvrant les 3 DJ |

### Ressources recommandées

- **Doc officielle Jest** — https://jestjs.io/docs/getting-started
- **Doc officielle Cypress** — https://docs.cypress.io
- **Doc officielle GitHub Actions** — https://docs.github.com/actions
- **Livre** : "Testing JavaScript" — Kent C. Dodds (testingjavascript.com)
- **Article** : Martin Fowler — "Test Pyramid" (martinfowler.com/bliki/TestPyramid.html)
- **Livre** : "Continuous Delivery" — Jez Humble & David Farley (sélection de chapitres)
- **Web** : The Twelve-Factor App (12factor.net)
- **Web** : Google Testing Blog (testing.googleblog.com)

## Points d'attention pour l'instructeur

- **Public ING1 technique** : moins de digressions management qu'en Master, mais ancrer chaque concept dans un cas concret (bug en prod, déploiement raté, etc.)
- **Niveau TypeScript hétérogène** : certains élèves seront à l'aise, d'autres moins. Privilégier des snippets simples au début, monter en complexité progressivement
- **Première exposition aux tests automatisés** : beaucoup d'élèves n'ont jamais écrit de test. Insister sur la mécanique avant la stratégie
- **Cypress en démo live** : prévoir un projet pré-configuré qui marche pour éviter le piège du setup. Le but n'est pas qu'ils installent Cypress en cours
- **CI/CD demande Git solide** : si le prérequis Git n'est pas acquis, prévoir 5-10 min de rappel rapide en début de DJ3
- **Rythme soutenu** : 1,5 jour pour couvrir tests + déploiement, c'est dense. Ne pas chercher à tout démontrer — privilégier la compréhension des concepts
- **Stratégies de déploiement = survol** : on ne fait pas de TP blue/green. L'objectif est qu'ils sachent **distinguer** les stratégies, pas les implémenter
