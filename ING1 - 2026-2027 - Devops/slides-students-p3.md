---
theme: seriph
title: "Cloud, Réseaux et DevOps"
info: |
  ## Cloud, Réseaux et DevOps
  Master Ingénierie Informatique et Management — G4 — ING1
class: text-center
transition: slide-left
mdc: true
fonts:
  sans: Inter
  mono: Fira Code
drawings:
  persist: false
layout: course-cover
subtitle: Des fondamentaux réseau aux pipelines automatisés
session: 4 séances de 3h — 12h
instructor: Clément DAOU — Ingénieur Cloud-DevOps (AWS, Azure, Kubernetes...)
presenter: false
---

# Cloud, Réseaux et DevOps

---

# Plan global du module

- **Séance 1** — Réseaux, cloud et haute disponibilité
  <span class="text-sm opacity-70">Couches réseau, IP/DNS, IaaS/PaaS/SaaS/serverless, AWS/Azure/GCP, HA</span>
- **Séance 2** — DevOps, Git, Docker et écosystème cloud-native
  <span class="text-sm opacity-70">Histoire DevOps, Git collaboratif, Infrastructure as Code, Docker, Compose, CNCF, intro Kubernetes</span>
- **Séance 3** — CI/CD avec GitHub Actions et GitLab CI
  <span class="text-sm opacity-70">Anatomie d'un pipeline, workflows YAML, TP pipeline installation → tests → build</span>
- **Séance 4** — Sécurité, observabilité, déploiement et audit IA
  <span class="text-sm opacity-70">TLS, secrets, stratégies de déploiement, logs/métriques/traces, audit IA, TP final</span>

---

# Objectifs

- Expliquer l'adressage IP, le DNS, la passerelle et le routage
- Distinguer IaaS, PaaS, SaaS et serverless
- Comparer VM et conteneur, construire une image Docker, situer Kubernetes
- Décrire les mécanismes de haute disponibilité
- Expliquer les principes de l'Infrastructure as Code (déclaratif, plan, apply) et situer Terraform
- Utiliser Git en flux collaboratif : branches, commits, revue, versionnage
- Construire un pipeline CI qui installe, teste, construit et fabrique une image
- Identifier les risques secrets, dépendances, TLS et images
- Lire des logs et choisir des métriques utiles
- Auditer une configuration Docker/CI générée par une IA

---
layout: section-cover
section: Séance 3 — 3h
---

# CI/CD : GitHub Actions et GitLab CI

Corriger les TP Docker et Compose, puis automatiser la validation du code



---

# Correction Docker — de React à nginx

`tp/docker/react/Dockerfile` · un front statique, sans API

<div class="dockerfile">

<<< ./tp/docker/react/Dockerfile dockerfile

</div>

**Build avec Bun** : TypeScript puis Vite → `/app/dist/`. **Exécution avec nginx** : port `80`, sans Bun.

<style scoped>
.dockerfile {
  --slidev-code-font-size: 14px;
  --slidev-code-line-height: 17px;
}
.dockerfile :deep(pre) {
  columns: 2;
  column-gap: 1rem;
}
.dockerfile :deep(pre code) {
  line-height: inherit;
}
</style>



---

# Correction Docker — lancer et vérifier

Depuis le dossier contenant le Dockerfile, construire et lancer le front :

```bash
docker build -t ing1-tp-react .
docker run --rm -d --name ing1-tp-react -p 127.0.0.1:8081:80 ing1-tp-react
```

Ouvrir **`http://localhost:8081/`** : la page React doit s'afficher.

```bash
docker stop ing1-tp-react
```

`8081` = port de l'hôte (boucle locale) · `80` = port de nginx dans le conteneur.



---

# Correction Compose — suivre `/api/hello`

<div class="card mt-4">

**Navigateur** → **`localhost:8080`** → **nginx (`frontend:80`)** → **Express (`backend:3000`)**

</div>

<v-clicks>

- **Seul le front est publié** (`8080:80`). nginx sert `/` et relaie `/api/hello`.
- **DNS Compose** : nginx résout `backend` sur le réseau interne, pas le navigateur.
- **Express** répond en JSON (`message`, `timestamp`). `expose: 3000` ne publie pas de port sur l'hôte.
- **`depends_on`** ordonne les démarrages ; ici, il ne vérifie pas que l'API est prête.

</v-clicks>



---

# Correction Compose — vérifier les deux réponses

<div style="--slidev-code-font-size: 15px; --slidev-code-line-height: 21px">

Depuis le dossier contenant `compose.yml` :

```bash
docker compose up --build -d
```

Ouvrir **`http://localhost:8080/`** pour voir la page React, puis comparer :

```bash
# Depuis l'hôte : requête relayée par nginx
curl -fsS http://localhost:8080/api/hello
# Depuis le conteneur nginx : accès direct via le DNS interne de Compose
docker compose exec -T frontend curl -fsS http://backend:3000/api/hello
```

**JSON** : `{"message":"Hello World!","timestamp":"2026-11-23T14:00:00.000Z"}` (heure variable).

```bash
docker compose logs --tail=30 frontend backend
docker compose down
```

**Correction partielle** : deux services, **sans base de données** ni persistance.

</div>



---

# Pourquoi automatiser ?

<v-clicks>

- **Intégrer de petits changements souvent** : une erreur est plus facile à isoler.
- **Obtenir un retour rapide** : un statut et des journaux associés au commit.
- **Automatiser les contrôles répétitifs** : installation, tests disponibles, build.
- **Rejouer les mêmes vérifications** en local et en CI : commandes, versions et lockfile connus.

</v-clicks>



---

# CI, livraison continue, déploiement continu

| Pratique | Ce que l'équipe automatise | Production |
|---|---|---|
| **CI — intégration continue** | Intégrer souvent et vérifier automatiquement les changements | Pas de mise en production impliquée |
| **Livraison continue** | Garder une version validée et déployable à tout moment | Mise en production sur décision humaine |
| **Déploiement continu** | Mettre en production chaque changement qui franchit les contrôles | Mise en production automatique |

**Notre démo : CI seule.** Un build vert et un artefact ne sont pas un déploiement.



---

# Du commit à la CI/CD

```mermaid {theme: 'base', flowchart: {nodeSpacing: 28, rankSpacing: 16, padding: 8}, themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', edgeLabelBackground: '#ffffff', textColor: '#2b2620', fontSize: '17px'}}
flowchart LR
  commit["Commit local"] --> push["Push vers le dépôt<br/>Déclenche la CI<br/>si configuré"]
  push --> job["Job sur un runner<br/>Récupère le commit<br/>Installe · lint · build<br/>Vérifie"]
  job -->|Échec| echec["Statut et logs<br/>Corriger puis<br/>pousser à nouveau"]
  job -->|Succès| artefact["Artefact archivé"]
  artefact -.-> livraison["Livraison continue<br/>Déploiement sur<br/>décision humaine"]
  artefact -.-> deploiement["Déploiement continu<br/>Déploiement automatique<br/>si configuré"]
  classDef etapeTP fill:#e08a63,stroke:#8f3a1f,stroke-width:2px,color:#2b2620
  class artefact etapeTP
```

**Le TP s'arrête à l'artefact.** Les tests ne tournent que s'ils existent et sont configurés.



---

# Panorama — quatre façons d'exécuter un pipeline

| Outil | Point de repère | Fichier usuel |
|---|---|---|
| **GitLab CI/CD** | Intégré aux projets GitLab ; exécution par des runners | `.gitlab-ci.yml` |
| **GitHub Actions** | Intégré à GitHub ; actions réutilisables | `.github/workflows/*.yml` |
| **Jenkins** | Serveur CI open source à exploiter ; jobs sur des agents | `Jenkinsfile` |
| **Azure Pipelines** | Service Azure DevOps ; agents hébergés ou autogérés | `azure-pipelines.yml` |

Pour cette séance : lire **GitHub Actions et GitLab CI**.



---

# Anatomie commune d'un pipeline

```text
push de branche → job sur un runner → commandes → statut et journaux
                                          └─ si succès : artefact
```

<v-clicks>

- **Déclencheur** : événement qui lance le pipeline ; ici, un push de branche, pas un tag.
- **Job** : travail confié à un **runner**, la machine qui l'exécute.
- **Étape** : commande ou action dans le job. Dans nos exemples, un échec empêche les étapes de build ou d'archivage suivantes.
- **Artefact** : résultat conservé par la CI, téléchargeable après l'exécution.

</v-clicks>



---

# Les quatre commandes des exemples React

Ces exemples de démo exécutent les commandes **à la racine du dépôt React**.

```bash {all|1|2|3|4|all}
bun install --frozen-lockfile
bunx --no-install eslint .
bun run build
test -s dist/index.html
```

**Linux · Node.js 24 · Bun 1.4.3** → artefact **`react-dist`** (`dist/`).

Le lint analyse le code ; le contrôle de sortie vérifie que `dist/index.html` n'est pas vide.



---

# GitHub Actions — lire un `workflow` (1/2)

Exemple de démo React, **début** du workflow.

```yaml {all|3-5|7-8|10-15|all}
name: CI React

on:
  push:
    branches: ['**']

permissions:
  contents: read

jobs:
  react-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with: { persist-credentials: false }
```



---

# GitHub Actions — produire `react-dist` (2/2)

Exemple React, **suite de `steps`** dans le même job `react-build`.

```yaml {all|1-4|5-8|9-12|13-17|all}
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
          package-manager-cache: false
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: '1.4.3'
          no-cache: true
      - run: bun install --frozen-lockfile
      - run: bunx --no-install eslint .
      - run: bun run build
      - run: test -s dist/index.html
      - uses: actions/upload-artifact@v6
        with:
          name: react-dist
          path: dist/
          if-no-files-found: error
```

**Archive `react-dist`** : `index.html` et `assets/` sont à la racine de l'archive.



---

# GitHub Actions — `on` : événement et filtre

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

Le filtre ne vise pas la même branche selon l'événement :

- `push` : branche **poussée** ; ici `main` uniquement.
- `pull_request` : branche **cible** ; ici les PR qui visent `main`.
- `workflow_dispatch` : lancement **manuel**.



---

# GitHub Actions — `jobs`, `runs-on`, `steps`

```yaml
jobs:
  react-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with: { persist-credentials: false }
      - run: bun run build
```

**Extrait** · Les étapes d'installation ne sont pas affichées.

- `jobs` contient les jobs nommés ; `runs-on` choisit le type de **runner**.
- `steps` sont ordonnées dans le job. `uses` appelle une action ; `with` lui passe des paramètres. `run` exécute une commande shell.



---

# GitHub Actions — `permissions` au minimum

```yaml
permissions:
  contents: read
```

**Extrait de l'exemple React** · `permissions` règle les droits du jeton automatique du workflow.

- `contents: read` permet à `checkout` de lire les sources ; aucun droit d'écriture n'est demandé.
- `persist-credentials: false` demande à `checkout` de ne pas conserver ses identifiants Git pour les étapes suivantes.

**Question** : un job qui compile et archive `dist/` doit-il pouvoir modifier le dépôt ?



---
layout: pause
duration: 20 min
---



---

# GitLab CI — le même job au complet

Exemple de démo React (fichier actif usuel : **`.gitlab-ci.yml`** à la racine).

```yaml {all|1-3|5-8|9-13|14-16|all}
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_COMMIT_BRANCH'

react-build:
  image: node:24-bookworm
  before_script:
    - npm install --global bun@1.4.3
  script:
    - bun install --frozen-lockfile
    - bunx --no-install eslint .
    - bun run build
    - test -s dist/index.html
  artifacts:
    name: react-dist
    paths: [dist/]
```



---

# GitLab CI — `stages`, runner et `image`

```yaml
stages: [verify, build]

check-sources:
  stage: verify
  image: node:24-bookworm
  script: [test -s package.json]
```

Un stage regroupe des jobs ; ce n'est pas une étape shell.

- Sans dépendance explicite, les jobs d'un même stage peuvent tourner en parallèle ; le stage suivant attend.
- Le **runner** exécute le job. Avec un exécuteur compatible, `image` définit son environnement ; elle ne construit pas une image.



---

# GitLab CI — `rules` : la première règle gagne

```yaml
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_OPEN_MERGE_REQUESTS'
      when: never
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_COMMIT_BRANCH'
```

`workflow.rules` décide si le **pipeline** existe. Les `rules` d'un job décident s'il y participe.

**De haut en bas** : accepter la MR ; refuser le push si une MR est ouverte ; sinon accepter le push de branche. Sans règle applicable, pas de pipeline ici.



---

# GitLab CI — `when` : succès, échec ou clic

```yaml
resume-echec:
  stage: diagnostics
  when: on_failure
  script: [echo "Un stage précédent a échoué."]

verification-manuelle:
  stage: diagnostics
  when: manual
  script: [node --version]
```

`diagnostics` est un stage déclaré après `build`.

- **`on_success`** : comportement par défaut, après succès des stages précédents.
- **`on_failure`** : après échec d'un stage précédent ; **`manual`** : sur clic dans l'interface.



---

# GitLab CI — préparer, exécuter, diagnostiquer

```yaml
before_script:
  - npm install --global bun@1.4.3
script:
  - bun install --frozen-lockfile
  - bun run build
after_script:
  - ls -la
```

**Extrait d'un job** · `before_script` prépare ; `script` fait le travail ; `after_script` peut ajouter des diagnostics au **journal**.

`before_script` et `script` partagent un shell. `after_script` s'exécute dans un **nouveau shell** : les variables exportées dans `script` n'y sont pas conservées.



---

# GitLab CI — `parallel:matrix` : répéter un job

```yaml
verifier-runtime:
  image: node:${NODE_MAJOR}-bookworm
  parallel:
    matrix:
      - NODE_MAJOR: ['22', '24']
        MODE: [development, production]
  script:
    - echo "Mode $MODE"
    - node --version
```

2 versions × 2 modes = **4 jobs**. L'un reçoit `NODE_MAJOR=24` et `MODE=production`.



---

# GitLab CI — `cache` : accélérer, pas garantir

```yaml
variables:
  BUN_INSTALL_CACHE_DIR: .bun-cache/
cache:
  key:
    files: [bun.lock]
  paths: [.bun-cache/]
```

La **clé** dépend du contenu de `bun.lock` ; le chemin désigne les fichiers à réutiliser.

- Cache retrouvé : l'installation peut réutiliser les paquets téléchargés.
- Cache absent : l'installation doit réussir quand même. C'est le **lockfile**, pas le cache, qui fixe les versions.



---

# GitLab CI — `artifacts` : conserver la sortie

```yaml
artifacts:
  name: react-dist
  paths: [dist/]
  expire_in: 1 week
```

**Extrait avec rétention explicite** · `paths` sélectionne la sortie du job ; `expire_in` règle sa durée de conservation.

- **Artefact** : récupérer le `dist/` produit par un job précis, dans l'interface ou dans un job suivant.
- **Cache** : tenter de réutiliser des fichiers pour **gagner du temps**.



---

# Les deux exemples en miroir

Comparer les deux exemples complets.

| Repère | GitHub Actions | GitLab CI |
|---|---|---|
| Déclencheur | `on.push.branches` | `workflow.rules` |
| Environnement | `runs-on`, actions de préparation | runner compatible, `image`, `before_script` |
| Commande de build | `run` dans `steps` | `script` dans le job |
| Archive `react-dist` | `uses` avec `upload-artifact` | `artifacts` |

**À vérifier à deux** : si `bun run build` échoue, dans quel journal et à quelle étape regarder ?



---
layout: recap
section: Séance 3 — CI/CD, GitHub Actions et GitLab CI
---

# Ce qu'il faut retenir

- <span>**Docker** : Bun fabrique `dist/` ; nginx le sert.</span>
- <span>**Compose** : seul le front est publié ; nginx atteint Express par le DNS interne.</span>
- <span>**CI** : petits changements, contrôles automatisés, retour rapide sur le commit.</span>
- <span>**GitHub Actions** : `on` déclenche le workflow ; `jobs` et `steps` décrivent le travail.</span>
- <span>**GitLab CI** : `rules` sélectionne ; `stages` groupe les jobs ; `script` exécute les commandes.</span>
- <span>**Artefact ≠ cache** : l'un conserve une sortie (`react-dist`), l'autre accélère les exécutions.</span>



---

# TP — construire le front avec GitHub Actions

**Défi** : au push d'une branche, construire le front de votre choix dans votre dépôt étudiant.

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="card">
    <div class="font-bold text-accent mb-1">1 · Déclencher</div>
    <div class="text-sm">Écrire <code>.github/workflows/ci.yml</code> avec un seul job, déclenché au push de branche.</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">2 · Construire et vérifier</div>
    <div class="text-sm">Compiler le front choisi avec l'outillage adapté et vérifier la sortie produite.</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">3 · Garder la preuve</div>
    <div class="text-sm">Fournir le lien du run réussi et télécharger l'artefact de build.</div>
  </div>
</div>

**Périmètre** : seul le build du front choisi est demandé. Aucune construction ou publication d'image Docker, aucun déploiement.



---
layout: exercise
duration: 20 min
type: solo
---

# Mise en pratique — du push à l'artefact

1. **Préparer** : choisir votre projet et placer son front à la racine du dépôt étudiant ou dans un sous-dossier.
2. **Écrire et pousser** : ajouter à la racine du dépôt `.github/workflows/ci.yml`, avec un job déclenché au push de branche.
3. **Lire le résultat** : ouvrir le run de votre commit, vérifier le build et télécharger l'artefact correspondant à la sortie produite.

**Si ça bloque** : pas de run → vérifier le chemin et `on` ; job rouge → lire la première étape en échec.



---

# Remise du TP — grille de vérification

| À fournir | Ce qui doit être visible |
|---|---|
| **Lien vers le dépôt accessible** | Sources du front choisi, `.github/workflows/ci.yml` à la racine et lockfile choisi si applicable, au commit du run |
| **Lien vers le run GitHub Actions** | Bon commit, déclencheur `push` de branche et job de build réussi |
| **Résultat téléchargeable** | Build et contrôle réussis ; artefact contenant la sortie attendue du framework |

**Avant d'envoyer** : vérifier que l'enseignant a accès au dépôt et au run.



---
layout: qcm
duration: 18 min
questions: 20
cover: Correction Docker et Compose, CI et CD, déclencheurs et jobs, GitHub Actions et GitLab CI, cache et artefacts
---

# QCM de clôture — Séance 3
