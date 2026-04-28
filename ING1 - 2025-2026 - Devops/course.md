# Fiche cours — DevOps

## Informations générales

- **Intitulé** : DevOps
- **Volume horaire** : 14h (4 demi-journées de 3h30, pause de 20 min incluse)
- **Format** : 2 journées en présentiel, espacées de 2 semaines
- **Découpage** : 4 demi-journées de 3h30
- **Public** : Ingénieur 1 — Bac+3 (1re année du cycle ingénieur G4)
- **Prérequis** : OS B2, Git maîtrisé, Linux ligne de commande
- **Outils** : Docker, Docker Compose, Git/GitHub, GitHub Actions, Linux
- **Instructeur** : Yoann (expérience terrain DevOps et conteneurisation)

## Objectifs pédagogiques

À l'issue de ce cours, l'étudiant sera capable de :

1. **Expliquer** la culture DevOps, le mouvement CALMS, les trois voies et les métriques DORA
2. **Appliquer** une stratégie de branching Git en équipe (PR, code review, hooks, SemVer, rebase)
3. **Conteneuriser** une application avec Docker en écrivant un `Dockerfile` optimisé (multi-stage, `.dockerignore`)
4. **Orchestrer** une stack applicative locale avec Docker Compose (services, volumes, réseaux, `.env`)
5. **Construire** un pipeline CI/CD complet avec GitHub Actions (lint → test → build → push image → deploy)
6. **Identifier** les rôles et le vocabulaire de Kubernetes, de l'Infrastructure as Code et de l'observabilité (niveau culturel)
7. **Recommander** des bonnes pratiques de sécurité dans le pipeline (DevSecOps : secrets, dependency scanning)

## Articulation avec le cours « Tests et Déploiement »

Ce cours est **prérequis** du cours Tests et Déploiement (ING1). Pour éviter les redondances :

- **DevOps couvre** : bases de GitHub Actions (workflows, jobs, déclencheurs, runners, marketplace), build et push d'image Docker, déploiement basique
- **Tests reprend** : gating sur les tests, rapports JUnit, parallélisation des tests, stratégies de déploiement avancées (blue/green, canary, feature flags, rollback)

## Plan détaillé

---

### Jour 1 — Culture, collaboration et conteneurisation

#### Demi-journée 1 — Culture DevOps + Git avancé (3h30)

**Bloc 1 — Culture et principes DevOps (90 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 5 min | Ouverture — tour rapide : "DevOps, ça veut dire quoi pour toi ?" | Icebreaker |
| 15 min | Origine du DevOps — silos Dev vs Ops, mouvement CALMS (Culture, Automation, Lean, Measurement, Sharing) | Cours magistral |
| 15 min | Les trois voies DevOps — flux, feedback, apprentissage continu. Cycle de vie : Plan → Code → Build → Test → Release → Deploy → Operate → Monitor | Cours magistral |
| 15 min | DevSecOps — pourquoi intégrer la sécurité dès le pipeline. Shift-left sécurité | Cours magistral |
| 20 min | Métriques DORA — deployment frequency, lead time, MTTR, change failure rate. Lecture de l'État DevOps | Cours + discussion |
| 10 min | Synthèse bloc 1 + transition vers Git | Échange |

**Pause (20 min)**

**Bloc 2 — Git avancé et collaboration (100 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 15 min | Branching strategies — Git Flow, GitHub Flow, Trunk Based Development. Avantages/inconvénients | Cours magistral |
| 25 min | Pull Requests / Merge Requests — workflow de revue de code, checklist de PR, tailles de PR, conventions de commits | Cours + démo |
| 15 min | Hooks Git — pre-commit, pre-push. Husky + lint-staged en pratique | Cours + démo |
| 15 min | Tags, releases et versioning sémantique (SemVer) — MAJOR.MINOR.PATCH, breaking changes | Cours magistral |
| 15 min | Merge vs rebase — concepts et impacts sur l'historique. Illustration via outil UI (GitKraken / GitHub Desktop / VS Code Git) | Cours + visuel |
| 10 min | Cherry-pick et "undo" — quand récupérer un commit isolé, comment annuler proprement (revert vs reset). Vu côté concept, pas marathon CLI | Cours magistral |
| 5 min | Récap DJ1 + teaser Docker | Synthèse |

---

#### Demi-journée 2 — Docker et optimisation d'images (3h30)

**Bloc 1 — Docker fondamentaux (90 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Pourquoi conteneuriser ? Comparatif VM vs conteneur. Le problème "ça marche sur ma machine" | Cours magistral |
| 15 min | Architecture Docker — daemon, client, registre, image vs conteneur, layers | Cours + schéma |
| 25 min | Dockerfile — instructions FROM, RUN, COPY, ENV, EXPOSE, CMD, WORKDIR, USER. Bonnes pratiques d'ordre des couches | Cours + démo live |
| 15 min | Gestion des conteneurs — `run`, `ps`, `logs`, `exec`, `stop`, `rm`. Cycle de vie et flags utiles (`-d`, `-p`, `--rm`) | Démo live |
| 15 min | Volumes et réseaux Docker — bind mount vs volume nommé, bridge network, communication inter-conteneurs | Cours magistral |
| 10 min | Synthèse + présentation du TP optimisation | Synthèse |

**Pause (20 min)**

**Bloc 2 — TP construction et optimisation d'image (100 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Brief TP — application Node/TS à conteneuriser. Image de référence à battre en taille | Présentation |
| 30 min | TP étape 1 — écrire un Dockerfile fonctionnel naïf. Build + run | TP guidé |
| 15 min | Multi-stage builds — concept, syntaxe `FROM ... AS builder`, copie sélective entre stages | Cours + démo |
| 25 min | TP étape 2 — refactoriser en multi-stage + ajouter `.dockerignore`. Comparer la taille | TP guidé |
| 10 min | Restitution collective — qui a la plus petite image ? Discussion des techniques | Échange |
| 10 min | Récap DJ2 + consigne d'observation pour les 2 semaines (regarder les pipelines de leurs projets) | Synthèse |

---

### Jour 2 — Orchestration locale et CI/CD (2 semaines plus tard)

#### Demi-journée 3 — Docker Compose et bases CI/CD (3h30)

**Bloc 1 — Docker Compose (90 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Retour Jour 1 — observations sur les projets, questions accumulées | Échange ouvert |
| 15 min | Pourquoi Compose ? Limites du `docker run` à la main. Cas d'usage (dev local, intégration, démo) | Cours magistral |
| 15 min | Anatomie de `docker-compose.yml` — services, volumes, networks, `depends_on`, `healthcheck` | Cours + exemple |
| 10 min | Variables d'environnement — `.env`, override de fichiers, profils Compose | Cours magistral |
| 10 min | Compose pour le dev — hot-reload, montage du code source, exposition de ports de debug | Cours + démo |
| 25 min | TP — stack `app + base de données + reverse proxy` (nginx ou traefik) en Compose | TP guidé |
| 5 min | Synthèse bloc 1 | Synthèse |

**Pause (20 min)**

**Bloc 2 — Concepts CI/CD et bases GitHub Actions (100 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 15 min | CI vs CD — intégration continue, livraison continue, déploiement continu. Pyramide DevOps | Cours magistral |
| 15 min | GitHub Actions — anatomie d'un workflow YAML : `name`, `on`, `jobs`, `steps`, `runs-on` | Cours + démo |
| 15 min | Déclencheurs — `push`, `pull_request`, `schedule`, `workflow_dispatch`. Filtres de branches | Cours magistral |
| 15 min | Marketplace — `actions/checkout`, `actions/setup-node`, `docker/build-push-action`. Quand publier sa propre action | Cours + exemple |
| 25 min | Mini-TP — écrire un premier workflow `lint + test` sur un repo fourni | TP guidé |
| 10 min | Synthèse bloc 2 | Synthèse |
| 5 min | Transition DJ4 — teaser TP pipeline complet | Échange |

---

#### Demi-journée 4 — Pipeline CI/CD complet et écosystème (3h30)

**Bloc 1 — TP pipeline GitHub Actions complet (90 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Brief TP final — pipeline `lint → test → build Docker → push image → deploy` | Présentation |
| 50 min | TP — construire le pipeline étape par étape, avec validation à chaque step | TP guidé |
| 15 min | Secrets, environments et `GITHUB_TOKEN` — gestion sécurisée des credentials | Cours + démo |
| 10 min | Restitution + correction collective. Erreurs fréquentes | Échange |
| 5 min | Synthèse bloc 1 | Synthèse |

**Pause (20 min)**

**Bloc 2 — Survol de l'écosystème + clôture (100 min)**

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 20 min | Kubernetes (survol culturel) — cluster, node, pod, service, deployment. À quoi ça sert vraiment, quand basculer | Cours magistral |
| 15 min | Infrastructure as Code (notions) — pourquoi l'IaC. Survol Terraform vs Ansible vs CloudFormation. Pas de TP | Cours magistral |
| 20 min | Monitoring et observabilité — 3 piliers (logs, métriques, traces). Prometheus + Grafana, ELK. Alerting | Cours magistral |
| 10 min | DevSecOps en pratique — Dependabot, Snyk, secret scanning, signed commits | Cours magistral |
| 15 min | Synthèse globale des 2 jours — vocabulaire à maîtriser, lien avec le cours Tests et Déploiement à venir | Synthèse |
| 15 min | Modalités du QCM + ressources pour aller plus loin | Échange |
| 5 min | Mot de fin / questions ouvertes | Échange |

---

## Évaluation

- **Type 1** : TP noté — pipeline CI/CD complet pour une application web
  - Étapes attendues : tests, build Docker, push registry, déploiement automatique
  - Évalué sur : fonctionnement du pipeline, qualité du `Dockerfile`, structure du workflow YAML
- **Type 2** : QCM final — Docker, Git, CI/CD, Kubernetes, vocabulaire DevOps
- **Périmètre** : l'ensemble des 2 journées

## Supports pédagogiques

### À préparer

| Support | Description |
|---------|-------------|
| Slides Slidev | Présentation pour les 4 demi-journées (`slides.md`) |
| Repo TP Docker | App Node/TS minimale à conteneuriser (DJ2) |
| Repo TP Compose | App + DB + reverse proxy à composer (DJ3) |
| Repo TP CI/CD | Repo avec un `Dockerfile` valide, à automatiser via GitHub Actions (DJ4) |
| QCM final | 25-30 questions couvrant culture, Git, Docker, Compose, CI/CD, K8s/IaC/monitoring |

### Ressources recommandées

- **Doc officielle Docker** — https://docs.docker.com
- **Doc officielle GitHub Actions** — https://docs.github.com/actions
- **Livre** : "The Phoenix Project" — Gene Kim (roman DevOps fondateur)
- **Livre** : "Accelerate" — Forsgren, Humble, Kim (métriques DORA)
- **Web** : Pro Git Book — https://git-scm.com/book (gratuit, référence)
- **Web** : 12-Factor App — https://12factor.net
- **Web** : Docker Best Practices — https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- **Web** : Kubernetes Basics — https://kubernetes.io/docs/tutorials/kubernetes-basics/

## Points d'attention pour l'instructeur

- **Public ING1 technique** : la plupart n'ont jamais utilisé Docker en autonomie. Démos systématiques avant de lâcher en TP
- **Niveau Linux/Git hétérogène** : les prérequis sont posés, mais en pratique certains élèves auront des trous. Prévoir 5-10 min de rappel rapide en début de DJ1 si besoin
- **L'an passé a marché** : la séquence "présentation DevOps + Git + Docker + TP image multi-stage" a fonctionné — la garder comme colonne vertébrale du Jour 1
- **IaC volontairement minoré** : tu n'es pas à l'aise sur Terraform/Ansible. On en fait un survol culturel court, pas de démo pratique. C'est cohérent avec un public ING1
- **Git côté concepts plus que CLI** : tu utilises Git majoritairement via des outils UI (VS Code, GitHub Desktop, GitKraken). Le bloc Git insiste sur les concepts (merge vs rebase, semver, hooks) plutôt que sur des démos lourdes en ligne de commande. Si un élève demande la commande exacte, redirige vers la doc Pro Git
- **Kubernetes = vocabulaire** : à ce niveau, l'objectif est qu'ils sachent ce qu'est un Pod, savoir qu'`kubectl` existe, et reconnaître un manifeste. Pas plus
- **Articulation cours Tests** : prévenir les élèves dès la DJ1 que GitHub Actions sera réapprofondi dans le cours Tests. Évite la frustration "on a déjà vu ça"
- **2 semaines de pause** : donner une consigne d'observation sur leurs projets entre J1 et J2 (regarder les pipelines existants, identifier ce qui est versionné/automatisé vs cliqué à la main). Relancer en ouverture du J2
- **Rythme TP** : 4 TP guidés sur 2 jours, c'est dense. Préparer des fallbacks (snippets pré-écrits) pour les élèves qui décrochent — éviter qu'ils décrochent toute la session sur un bug d'install
