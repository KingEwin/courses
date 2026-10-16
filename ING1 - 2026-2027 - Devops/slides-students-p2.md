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
presenter: true # disable presenter mode
---

# Cloud, Réseaux et DevOps

<!--
Durée : 1 min.

Se présenter : Clément DAOU, ingénieur Cloud-DevOps, expérience terrain sur AWS, Azure et Kubernetes. Préciser le contexte professionnel : conception d'architectures cloud, automatisation de pipelines, exploitation de clusters Kubernetes en production.

Objectif du module en une phrase : donner les fondations réseau, cloud et automatisation nécessaires pour comprendre comment une application passe du poste du développeur à un service accessible, supervisé et reproductible.

Exemple concret à partager : raconter un incident réel où un déploiement a cassé en production faute de pipeline fiable, pour ancrer l'intérêt du cours dès la première minute.

Transition : passer au plan global des 4 séances.
-->


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

<!--
Durée : 2 min.

Verbaliser le fil rouge : une application Node.js simple sert de trame sur les 4 séances. Elle est versionnée avec Git, conteneurisée avec Docker, puis validée par un pipeline CI. Le déploiement public reste une option, jamais une obligation bloquante.

Exemple concret : montrer rapidement (sans détailler) le dépôt final attendu — code, Dockerfile, fichier de pipeline, README d'audit — pour donner une cible visuelle dès le départ.

Point important à dire à voix haute : Kubernetes sera vu en introduction pure (vocabulaire), jamais en TP noté ni en installation de cluster.

Transition : détailler les objectifs pédagogiques précis du module.
-->

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

<!--
Durée : 1 min.

Ces 10 objectifs sont ceux évalués par le TP final et les quiz formatifs. Les lire une fois à voix haute, sans les commenter un par un — l'idée est de donner une checklist de référence, pas de noyer le début du cours.

Exemple concret : rappeler qu'un futur chef de projet IT n'a pas besoin de tout coder lui-même, mais doit savoir lire ces éléments pour dialoguer avec une équipe technique — lien direct avec le profil management du master.

Transition : présenter les pré-requis techniques avant les TP.
-->

---

# Pré-requis techniques avant les TP

<div class="grid grid-cols-3 gap-4">
<div>

## 🐳 Docker

- **macOS** : Docker Desktop ou **Colima**
- **Windows** : **WSL**, puis Docker Desktop
- Contrôler : `docker --version` et `docker compose version`
- Terminal **Bash/WSL**

</div>
<div>

## 🟢 Poste de dev

- **Node 22 LTS** + **npm** ou **bun**
- **git** installé
- Angular exige Node, même avec bun

</div>
<div>

## 🐙 GitHub

- Compte **authentifié** (HTTPS/PAT ou SSH)
- **Dépôt public vide** créé avant la séance, **sans README**
- Email Git public ou **noreply**
- **Aucun secret** dans un dépôt public

</div>
</div>

<!--
Durée : 3 min.

Annoncer clairement que la suite du cours suppose ces pré-requis déjà en place : les TP démarrent directement sans temps d'installation dédié en séance.

Docker : sur macOS, Docker Desktop ou Colima (plus léger, en ligne de commande) ; sur Windows, WSL d'abord puis Docker Desktop par-dessus. Ne pas dérouler une installation complète ici : `docker --version` et `docker compose version` doivent répondre avant la séance 2, moment du premier TP Docker. Les commandes des TP sont écrites pour un terminal Bash (macOS, Linux ou WSL) : en PowerShell, la continuation de ligne `\` et `$(pwd)` ne fonctionnent pas telles quelles ; demander aux étudiants Windows d'ouvrir le terminal WSL.

Poste de dev (TP de la séance 2) : chaque étudiant crée son propre frontend ; il faut Node 22 LTS avec npm, ou bun, et git. Même avec bun, Angular CLI s'appuie sur Node : Node reste donc requis pour Angular. Le Dockerfile pédagogique construit lui-même l'application dans Docker avec `npm ci`.

GitHub : créer AVANT la séance un dépôt public vide, sans README, licence ni .gitignore, pour éviter un conflit au premier push. Le compte doit être authentifié depuis le terminal (token personnel ou clé SSH). Rappeler que le dépôt est public : configurer `git config user.email` avec l'adresse noreply GitHub si on ne veut pas publier son email, et ne jamais committer de secret.

Exemple concret : comparer à un cours de cuisine où chacun arrive avec ses ustensiles déjà lavés — le temps de séance sert à cuisiner, pas à faire la vaisselle.

Transition : entrer dans la séance 2, DevOps, Git, Docker et écosystème cloud-native.
-->

---
layout: section-cover
section: Séance 2 — 3h
---

# DevOps, Git, Docker et écosystème cloud-native

De la culture DevOps aux conteneurs et à Compose

<!--
Durée : 1 min (introduction : 5 min au total avec le rappel de la séance 1 et l'annonce des deux TP).

Annoncer le déroulé : la culture DevOps et les métiers, Git et les commandes de base, l'Infrastructure as Code et le GitOps, les fondamentaux Docker, une pause, les bonnes pratiques d'images, Docker Compose, un premier aperçu de l'écosystème cloud-native avec la CNCF et Kubernetes, puis le lancement de deux TP et le QCM de clôture.

Transition : rappel factuel de la séance 1.
-->

---

# Rappel de la séance 1

<v-clicks>

- **Réseau** : couches TCP/IP, adresse IP + masque (CIDR), DNS qui traduit un nom en adresse, ports
- **Cloud** : IaaS, PaaS, SaaS, serverless ; responsabilité partagée entre fournisseur et client
- **Haute disponibilité** : redondance, health checks, retrait des instances malades, redémarrage
- **Aujourd'hui** : ces notions reviennent avec les conteneurs (ports, DNS interne, probes)

</v-clicks>

<!--
Durée : 2 min.

Rappel purement factuel, sans interroger la salle : on remet en mémoire le vocabulaire utile pour la suite. Le réseau (ports, DNS) servira à comprendre la communication entre conteneurs ; le cloud et la haute disponibilité donnent le contexte de l'automatisation et de Kubernetes.

Exemple concret : un nom comme `api` résolu en adresse IP par un DNS, vu en séance 1 pour Internet, existe aussi à l'intérieur d'un réseau de conteneurs, ce que l'on verra avec Compose.

Transition : annoncer les deux TP qui rythment la fin de la séance.
-->

---

# Cette séance : théorie, puis deux TP

<div class="grid grid-cols-3 gap-4 mt-4">
  <div class="card">
    <div class="text-3xl mb-2">📚</div>
    <div class="font-bold text-accent mb-1">Comprendre</div>
    <div class="text-sm">DevOps, Git, Infrastructure as Code, GitOps, Docker, Compose, Kubernetes</div>
  </div>
  <div class="card">
    <div class="text-3xl mb-2">🛠️</div>
    <div class="font-bold text-accent mb-1">Deux TP</div>
    <div class="text-sm"><strong>TP Docker</strong> puis <strong>TP Compose</strong> : énoncés présentés en fin de séance, démarrage en séance</div>
  </div>
  <div class="card">
    <div class="text-3xl mb-2">📦</div>
    <div class="font-bold text-accent mb-1">À rendre avant la séance 3</div>
    <div class="text-sm">Dépôt(s) <strong>GitHub public(s)</strong>, corrigés au début de la séance 3</div>
  </div>
</div>

<v-clicks>

- Les deux TP se terminent **hors séance** : la séance sert à bien démarrer
- Un compte **GitHub** et un poste avec Docker et Git sont nécessaires

</v-clicks>

<!--
Durée : 2 min.

Annoncer dès maintenant que la séance se termine par le lancement de deux TP : un TP Docker puis un TP Compose. Ils sont à terminer en dehors du cours et à rendre AVANT la séance 3 sous forme de dépôt(s) GitHub public(s), pour correction. Les énoncés détaillés, les attendus de remise et 15 minutes de mise en pratique viennent en fin de séance, juste avant le QCM : inutile d'entrer dans le détail maintenant.

Les prérequis (Docker, Git, Node ou bun, compte GitHub) ont été annoncés à la séance 1 ; vérifier d'un mot que chacun a Docker opérationnel, car le temps de séance ne permet pas de dépanner une installation.

Exemple concret : le travail terminé à la maison sera relu comme une revue de code, d'où l'importance d'un dépôt lisible.

Transition : commençons par la culture DevOps, avec les métiers d'hier.
-->

---

# Métiers d'hier : Dev d'un côté, Ops de l'autre

<Comparison left="Dev" right="Ops" leftColor="blue" rightColor="orange">
  <template #left>

  - Conçoit et écrit les fonctionnalités
  - Teste sur son poste ou un environnement de recette
  - Livre une version, puis passe au sujet suivant

  </template>
  <template #right>

  - Administre les systèmes et serveurs, physiques puis machines virtuelles
  - Gère le réseau, le stockage, les sauvegardes
  - Déploie, surveille, répond aux incidents

  </template>
</Comparison>

<v-clicks>

- La livraison passait de main en main : **tickets**, fenêtres de mise en production, procédures manuelles
- Chaque équipe optimisait **son** objectif : nouveauté d'un côté, stabilité de l'autre

</v-clicks>

<!--
Durée : 3 min.

Présenter les deux métiers historiques sans caricature : chacun avait une vraie expertise et des contraintes légitimes. Les développeurs étaient jugés sur les fonctionnalités livrées ; les administrateurs systèmes sur la disponibilité des serveurs, avec des machines physiques à racker puis, plus tard, des machines virtuelles, et un réseau à maintenir.

Exemple concret : une nouvelle version demandait un ticket pour obtenir un serveur, un autre pour ouvrir un port, un troisième pour la mise en production : chaque délai était raisonnable, leur somme ne l'était plus.

Transition : voir ce que cette séparation provoque quand les changements deviennent fréquents.
-->

---

# Avant DevOps : des silos Dev et Ops

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A["Dev<br/>livre vite, veut du changement"] -->|Livraison| B["Ops<br/>stabilise, refuse le risque"]
  B -->|Tickets, incidents| A
```

<v-clicks>

- **Dev** : ajoute des fonctionnalités, veut livrer vite
- **Ops** : maintient le service stable, redoute chaque changement
- Objectifs structurellement opposés → tensions, lenteurs, blâme mutuel

</v-clicks>

<!--
Durée : 2 min.

Poser le problème avant la solution : sans objectifs partagés, chaque livraison devient un conflit d'intérêt entre celui qui code et celui qui exploite.

Exemple concret : une mise en production qui casse un vendredi soir, le développeur injoignable, l'équipe d'exploitation seule pour gérer l'incident — schéma classique pré-DevOps.

Transition : pourquoi ce problème est-il devenu critique ces dernières années ?
-->

---

# Pourquoi DevOps aujourd'hui ?

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-1">⏱️ Fréquence</div>
    <div class="text-sm">Les produits évoluent en continu : on livre chaque semaine, voire chaque jour, plus chaque trimestre</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🧩 Complexité</div>
    <div class="text-sm">Services multiples, cloud, conteneurs, dépendances : impossible de tout gérer à la main</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🛡️ Fiabilité</div>
    <div class="text-sm">Les utilisateurs attendent un service disponible en permanence, même pendant les changements</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🔁 Feedback</div>
    <div class="text-sm">Un retour rapide (tests, métriques, incidents) permet de corriger tôt, quand c'est peu coûteux</div>
  </div>
</div>

<!--
Durée : 3 min.

DevOps n'est pas né d'une mode mais d'une contrainte réelle : livrer plus souvent, dans des systèmes plus complexes, sans dégrader la fiabilité. Les leviers qui l'ont rendu possible sont le cloud, les conteneurs, l'automatisation, le CI/CD et l'observabilité, développés dans ce cours.

Exemple concret : une équipe qui déployait une fois par trimestre avec une longue nuit de mise en production peut, avec des changements petits, automatisés et testés, livrer plusieurs fois par semaine ; un petit changement échoue moins gravement qu'un gros.

Transition : DevOps ne supprime pas les rôles, il partage la responsabilité du résultat.
-->

---

# Responsabilité partagée, pas diluée

<KeyConcept title="Responsabilité partagée" icon="🤝">
DevOps ne supprime pas les rôles : il fait porter conjointement le résultat de bout en bout, du code au service en production.
</KeyConcept>

<v-clicks>

- Le développeur pense à l'exploitabilité de son code
- L'exploitant participe aux choix qui impactent la fiabilité
- L'automatisation absorbe les tâches répétitives, pas la responsabilité humaine

</v-clicks>

<!--
Durée : 2 min.

Nuance importante à verbaliser : « responsabilité partagée » ne veut pas dire « personne n'est responsable » — chacun reste responsable, mais sur un objectif commun.

Exemple concret : un développeur qui ajoute un healthcheck à son service facilite le travail de l'équipe d'exploitation — petit geste, grand effet sur la fiabilité partagée.

Transition : à quoi ressemblent concrètement les métiers aujourd'hui.
-->

---

# Métiers d'aujourd'hui : collaboration et automatisation

<div class="grid grid-cols-3 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-1">🤝 Collaborer</div>
    <div class="text-sm">Dev et Ops travaillent sur les mêmes outils, relisent les mêmes changements, partagent les astreintes et les incidents</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">⚙️ Automatiser</div>
    <div class="text-sm">Tests, builds, déploiements et infrastructure décrits en code, versionnés et rejouables</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🧭 Partager</div>
    <div class="text-sm">Le résultat de bout en bout est porté ensemble : le code, mais aussi son exploitation</div>
  </div>
</div>

<v-clicks>

- L'expertise **système, réseau et sécurité** reste indispensable : elle s'exprime davantage en code et en plateformes
- Les intitulés varient (ingénieur DevOps, SRE, ingénieur plateforme, administrateur système...) : ce sont les **pratiques** qui comptent

</v-clicks>

<!--
Durée : 3 min.

Message à faire passer : les compétences d'administration restent précieuses ; ce qui change, c'est la manière de les exercer (automatisation, code, collaboration) et le partage du résultat. Ne pas laisser croire que le métier d'administrateur disparaît, ni qu'un « poste DevOps » unique résoudrait seul les problèmes de l'organisation.

Exemple concret : le même besoin, « ouvrir un port et déployer une nouvelle version », passe d'un ticket entre deux équipes à un changement relu dans un dépôt, appliqué automatiquement et observable.

Transition : une courte remarque sur les intitulés, puis le cycle DevOps.
-->

---

# Des intitulés variés, un même état d'esprit

<v-clicks>

- Ingénieur plateforme, SRE, ingénieur DevOps : des appellations selon les organisations
- Aucun intitulé n'est une norme universelle — le contexte de l'entreprise prime
- Ce qui compte : les **pratiques** (automatisation, mesure, collaboration), pas l'étiquette du poste

</v-clicks>

<!--
Durée : 1 min.

Éviter tout discours prescriptif sur « le » métier DevOps : insister sur la diversité des organisations et des appellations selon les entreprises et les pays.

Exemple concret : deux entreprises comparables peuvent appeler la même fonction « DevOps Engineer » et « Site Reliability Engineer » sans différence pratique majeure.

Transition : formaliser le cycle DevOps et introduire les métriques DORA.
-->

---
class: flex flex-col items-center justify-center text-center
---

# Le cycle DevOps

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620', fontSize: '18px'}}
flowchart TB
  subgraph DEV["Côté Dev : construire"]
    direction LR
    A[Plan] --> B[Code] --> C[Build] --> D[Test]
  end
  subgraph OPS["Côté Ops : livrer et exploiter"]
    direction LR
    E[Release] --> F[Deploy] --> G[Operate] --> H[Monitor]
  end
  DEV ==>|"version testée"| OPS
  OPS -.->|"retours terrain : le Monitor alimente le prochain Plan"| DEV
```

<!--
Durée : 3 min.

Ce cycle est un visuel classique du domaine, volontairement réparti sur deux lignes pour rester lisible en projection : Plan → Code → Build → Test en haut (côté Dev), Release → Deploy → Operate → Monitor en bas (côté Ops). Insister : c'est un cycle, pas une ligne droite — la flèche pointillée de retour montre que le monitoring nourrit le plan suivant (boucle de rétroaction), et le découpage Dev/Ops n'est qu'un repère : les deux moitiés sont portées ensemble.

Exemple concret : un pic d'erreurs observé en Monitor déclenche une nouvelle tâche en Plan — la boucle se referme concrètement.

Transition : présenter les métriques DORA comme façon de mesurer ce cycle.
-->

---

# Les métriques DORA

<KeyConcept title="DORA" icon="📊">
Quatre métriques qui caractérisent la performance d'une organisation logicielle (DevOps Research and Assessment).
</KeyConcept>

<v-clicks>

- **Fréquence de déploiement** — à quelle cadence on livre en production
- **Délai de mise en œuvre** — du commit au déploiement
- **Taux d'échec des changements** — proportion de déploiements causant un incident
- **Temps moyen de rétablissement (MTTR)** — vitesse de retour à la normale

</v-clicks>

<!--
Durée : 3 min.

DORA est devenu un standard de référence pour évaluer objectivement une organisation, au-delà des impressions subjectives ("on livre vite" n'est pas mesurable sans ces métriques).

Exemple concret pour le profil management du master : ces 4 métriques permettent à un chef de projet de dialoguer avec une DSI sur la performance réelle d'une équipe, sans jargon technique excessif.

Transition : refermer le bloc DevOps, ouvrir le bloc Git.
-->

---

# Git : un historique versionné et distribué

<KeyConcept title="Git" icon="🌿">
Un outil qui enregistre l'historique d'un projet sous forme de **commits** et permet de travailler à plusieurs sur les mêmes fichiers.
</KeyConcept>

<v-clicks>

- **Historique** : chaque commit est un instantané identifié, daté et attribué à son auteur
- **Distribué** : chaque clone contient l'historique complet, on travaille d'abord **en local**
- **Local puis distant** : on partage ses commits avec un dépôt distant quand on le décide
- **Git ≠ GitHub** : Git est l'outil ; GitHub et GitLab sont des plateformes qui hébergent des dépôts Git et ajoutent PR/MR, issues, CI

</v-clicks>

<!--
Durée : 3 min.

Poser la distinction fondamentale avant tout flux collaboratif : Git fonctionne sans réseau et sans plateforme. Une plateforme comme GitHub ou GitLab héberge un dépôt distant de référence et ajoute des services (pull/merge requests, revue, tickets, intégration continue).

Exemple concret : on peut créer un dépôt, committer dix fois et consulter l'historique dans un avion, sans connexion ; le partage ne vient qu'ensuite.

Transition : situer précisément où vivent les changements, du fichier modifié au dépôt distant.
-->

---

# Local et distant : où vivent les changements ?

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A["Répertoire de travail<br/>fichiers modifiés"] -->|"git add"| B["Index<br/>prochain commit"]
  B -->|"git commit"| C["Dépôt local<br/>historique"]
  C -->|"git push"| D["Dépôt distant<br/>plateforme"]
  D -->|"git pull / clone"| C
```

<v-clicks>

- Le **commit** enregistre uniquement ce qui a été préparé avec `add`
- Le **dépôt local** et le **dépôt distant** sont deux copies distinctes de l'historique
- `push` envoie ses commits ; `pull` récupère ceux des autres

</v-clicks>

<!--
Durée : 3 min.

Parcourir le schéma de gauche à droite. Le répertoire de travail contient les fichiers que l'on édite ; l'index (staging) liste ce qui sera inclus dans le prochain commit ; le dépôt local stocke l'historique ; le dépôt distant sert de point d'échange.

Exemple concret : modifier deux fichiers mais n'ajouter que l'un d'eux à l'index permet de produire un commit propre sur un seul sujet, l'autre modification restant à traiter ensuite — c'est la base du commit atomique.

Transition : les commandes qui matérialisent ce schéma.
-->

---

# Commandes Git (1/2) : démarrer et enregistrer

```bash
git init                      # crée un dépôt dans le dossier courant
git clone <url>               # copie un dépôt distant (historique inclus)
git status                    # fichiers modifiés, préparés ou non suivis
git diff                      # changements pas encore ajoutés à l'index
git add README.md             # prépare un fichier pour le prochain commit
git commit -m "docs: ajoute un README"   # enregistre un instantané
git log --oneline             # historique résumé, un commit par ligne
```

<v-clicks>

- `status` est le **réflexe** : avant `add`, avant `commit`, en cas de doute
- `diff` relit ce qui va être enregistré ; `add` choisit ce qui y entre
- Un message de commit décrit **le pourquoi** du changement

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 4 min (dont ~2 min de démonstration enseignant).

Démonstration sur un dépôt d'exemple jetable, distinct des TP : `git init` dans un dossier vide, créer un fichier, `git status` (fichier non suivi), `git add`, `git status` (fichier préparé), `git commit`, `git log --oneline`, modifier le fichier puis `git diff`. `git clone` est présenté mais exécuté seulement si un dépôt public d'exemple est disponible.

Les chevrons `<url>` sont un paramètre à remplacer ; ne pas coller de jeton d'accès dans une URL.

Exemple concret : `git status` avant chaque commit évite d'embarquer par mégarde un fichier généré ou un fichier de configuration local.

Transition : travailler avec des branches et un dépôt distant.
-->

---

# Commandes Git (2/2) : brancher et partager

```bash
git switch -c feature/page-accueil   # crée une branche et s'y place
git switch main                      # revient sur la branche main
git branch                           # liste les branches locales
git remote add origin <url>          # déclare un dépôt distant nommé origin
git remote -v                        # affiche les dépôts distants connus
git push -u origin feature/page-accueil   # envoie la branche et mémorise le suivi
git pull                             # récupère et intègre les changements distants
```

<v-clicks>

- Une **branche** isole un travail sans toucher à `main`
- `origin` n'est qu'un **nom par convention** pour le dépôt distant principal
- `pull` avant de reprendre le travail, `push` quand un lot de commits est prêt

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.68em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 4 min (dont ~2 min de démonstration enseignant).

Exemples volontairement génériques (nom de branche, nom du dépôt) et sans lien avec les TP. `switch -c` crée et sélectionne une branche ; `remote add` relie le dépôt local à un dépôt distant dont l'URL vient de la plateforme ; `push -u` envoie la branche et mémorise sa correspondance distante, ce qui permet ensuite un simple `git push`.

Sécurité : l'authentification (jeton personnel ou clé SSH) se configure en dehors de la commande ; ne jamais coller un jeton dans l'URL ni dans un message partagé. Un dépôt public expose son historique à tous.

Exemple concret : deux personnes travaillent chacune sur leur branche, publient avec `push`, puis une PR/MR propose la fusion sur `main`.

Transition : voir comment une branche arrive sur main dans un travail d'équipe.
-->

---

# Du commit à la fusion : le cycle d'une branche

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[main] --> B[Branche feature]
  B --> C[Commits successifs]
  C --> D[Merge / Pull Request]
  D --> A
```

<v-clicks>

- **Dépôt** — historique complet du projet
- **Commit** — un instantané logique et atomique du code
- **Branche** — une ligne de travail isolée, fusionnée ensuite

</v-clicks>

<!--
Durée : 2 min (dont ~1 min de démonstration live).

Insister sur "atomique" : un commit doit correspondre à un changement logique cohérent, pas à un mélange de plusieurs sujets non liés.

Exemple concret : un commit "fix typo + ajoute feature X + change la config CI" est un anti-pattern — trois commits séparés seraient plus lisibles et plus faciles à annuler individuellement si besoin.

Démonstration live : créer une branche, faire deux commits atomiques distincts sur un dépôt d'exemple, puis lancer `git log --oneline --graph` devant la salle pour montrer un historique lisible. Pointer chaque commit et faire deviner son objet avant de l'ouvrir.

Transition : détailler le flux de pull/merge request et la revue de code.
-->

---

# Pull Request / Merge Request et revue

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Branche feature] -->|Push| B[PR/MR ouverte]
  B --> C[Revue de code]
  C -->|Approuvée| D[Merge sur main]
  C -->|Changements demandés| A
```

<v-clicks>

- La **revue** vérifie objectif, tests, lisibilité et sécurité
- Le style (espaces, formatage) relève d'un outil automatique, pas de la revue humaine
- Une **petite PR/MR** se relit mieux qu'une PR/MR massive

</v-clicks>

<!--
Durée : 3 min.

La revue de code est un filet technique ET un transfert de connaissance dans l'équipe, pas du flicage.

Exemple concret : une PR de plus de 500 lignes modifiées voit son taux de détection de bugs chuter fortement en revue — découper le travail est une compétence à part entière.

Point d'échange : demander si quelqu'un a déjà reçu une demande de changement en revue qu'il jugeait injustifiée, et comment il l'a gérée — ouvre sur la posture professionnelle attendue en équipe.

Transition : détailler commits atomiques et SemVer.
-->

---

# Commits atomiques et historique lisible

**Conventional Commits** : `type(scope optionnel): description`

```text
feat: add health-check endpoint
fix: handle missing environment variable
docs: update README with run instructions
```

<v-clicks>

- `feat` fonctionnalité, `fix` correction, `docs` documentation → historique navigable
- Un commit = **un changement logique**, un message clair
- [Spécification Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Historique lisible = diagnostic plus rapide en cas d'incident

</v-clicks>

<!--
Durée : 2 min (dont ~1 min d'exercice écrit).

Cette convention n'est pas imposée par Git ; elle facilite la lecture de l'historique et l'usage d'outils de release, sans déclencher à elle seule un versionnement automatique.

Exemple concret : un `git log` lisible permet de répondre en 30 secondes à "qui a changé ce fichier et pourquoi", contre plusieurs minutes sur un historique de commits vagues ("update", "fix", "wip").

Exercice écrit rapide : donner 3 changements en une phrase (ex. "corrige le crash au démarrage", "ajoute le endpoint /health", "met à jour la doc d'installation") et demander à chacun d'écrire le message de commit correspondant avec le bon préfixe — corriger collectivement.

Transition : introduire SemVer pour le versionnage des livrables.
-->

---

# SemVer — versionnage sémantique

```bash
v1.4.2
│ │ └── PATCH — correction rétrocompatible
│ └──── MINOR — fonctionnalité rétrocompatible
└────── MAJOR — changement incompatible
```

<v-clicks>

- Communique clairement l'impact d'une nouvelle version
- Un changement **incompatible** force un incrément **MAJOR**
- Référence : semver.org

</v-clicks>

<!--
Durée : 1 min.

Poser la question à la salle : "renommer un endpoint d'API, c'est quel type de changement ?" — réponse attendue : MAJOR (breaking change).

Exemple concret : un client qui consomme une API et valide strictement le format de réponse verra son intégration casser si un champ obligatoire est ajouté sans bump MAJOR — impact direct sur la confiance du versionnage.

Si le temps le permet, un cas supplémentaire (ajouter un champ optionnel : MINOR) consolide MAJOR/MINOR/PATCH.

Transition : passer de Git à une autre forme de code versionné — celui qui décrit l'infrastructure elle-même.
-->

---

# Infrastructure as Code : le problème

<Comparison left="Infra manuelle" right="Infra as Code" leftColor="orange" rightColor="green">
  <template #left>

  - Créée à la main (console, SSH) — pas de trace écrite
  - Dérive silencieuse entre environnements (dev ≠ prod)
  - Aucune revue avant changement, dépendance à une personne

  </template>
  <template #right>

  - Décrite dans des fichiers versionnés avec Git
  - Relue comme du code (pull/merge request)
  - Reproductible : recréer l'environnement à l'identique

  </template>
</Comparison>

<!--
Durée : 2 min.

Verbaliser le problème avant la solution : sans trace écrite, la configuration réelle d'un serveur finit par ne vivre que dans la tête d'une seule personne — le jour où elle est absente ou part, plus personne ne sait reproduire l'environnement.

Exemple concret : deux serveurs censés être identiques (dev et prod) qui divergent après plusieurs interventions manuelles étalées sur plusieurs mois — un bug n'apparaît qu'en production parce qu'un paquet a été mis à jour à la main sur un seul des deux.

Transition : voir comment l'Infrastructure as Code répond à ce problème avec quatre principes simples.
-->

---

# Déclaratif, plan, apply, idempotence

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Code déclaratif<br/>état voulu] --> B[Plan<br/>prévoir les changements]
  B --> C[Apply<br/>appliquer réellement]
  C --> D[Infra réelle]
  D -.->|Ré-exécution| B
```

<KeyConcept title="Le state, un fichier sensible" icon="🗄️">
Terraform garde la correspondance entre le code et l'infra réelle dans un fichier d'état (**state**). Il peut contenir des informations sensibles : à protéger et à partager prudemment, jamais commité tel quel dans un dépôt public — un sujet approfondi hors de ce module.
</KeyConcept>

<v-clicks>

- **Déclaratif** — on décrit l'état voulu, pas les étapes pour y arriver
- **Plan** — prévisualiser les changements avant de les appliquer
- **Apply** — exécuter le changement réel sur l'infrastructure
- **Idempotence** — ré-exécuter le même code ne crée pas de dérive

</v-clicks>

<!--
Durée : 2 min.

Verbaliser la boucle : on décrit ce qu'on veut (déclaratif), l'outil calcule ce qui doit changer (plan) sans encore rien toucher, puis applique réellement le changement (apply) ; ré-exécuter le même code sur une infra déjà conforme ne doit rien changer (idempotence).

Exemple concret : demander « 3 machines virtuelles » ; si une existe déjà, le plan ne recrée que les deux manquantes — pas les trois, contrairement à un script impératif qui rejouerait bêtement toutes les étapes depuis le début.

Transition : voir maintenant qui propose ce genre d'outil, à commencer par Terraform.
-->

---

# Terraform et son écosystème

| Terrain | Terraform et alternatives | Exemple couvert |
|---|---|---|
| Provisioning cloud public | **Terraform** (multi-cloud), OpenTofu, Pulumi, CloudFormation/Bicep | Réseaux, VM, stockage (AWS/Azure/GCP) |
| Provisioning hors cloud | **Terraform** (via providers dédiés) | VMware, matériel on-premise |
| Configuration de serveurs | Ansible (hors Terraform) | Installer un paquet, éditer un fichier de config |

<Tip type="info">
Terraform et ses alternatives <strong>provisionnent</strong> des ressources (créer une VM, un réseau) ; un outil comme Ansible <strong>configure</strong> ensuite ce qui tourne dessus (installer, paramétrer). Les deux rôles sont complémentaires, pas concurrents.
</Tip>

<!--
Durée : 2 min.

Terraform reste l'outil dominant et multi-cloud : un seul langage pour AWS, Azure, GCP et bien d'autres providers, y compris VMware pour du hors-cloud. Les alternatives sont positionnées sans être détaillées : OpenTofu est un fork open source né après un changement de licence de Terraform ; Pulumi permet d'écrire l'infra dans un langage de programmation classique (Python, TypeScript) plutôt qu'un langage déclaratif dédié ; CloudFormation (AWS) et Bicep (Azure) sont les équivalents propriétaires liés à un seul fournisseur.

Exemple concret : une entreprise avec des serveurs VMware en interne ET des ressources AWS peut utiliser Terraform pour les deux, avec un provider différent pour chaque cible — un seul outil, deux terrains.

Transition : voir le cycle Terraform en pratique, sans compte cloud, avec une ressource locale.
-->

---

# Terraform — un premier fichier, sans cloud

```hcl
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "local_file" "bienvenue" {
  filename = "${path.module}/bienvenue.txt"
  content  = "Infrastructure décrite en code\n"
}
```

<v-clicks>

- Fichier `main.tf` dans un dossier vide
- Le provider `local` crée un fichier sur le poste : aucun compte cloud, aucun coût
- Une **ressource** = un type (`local_file`) + un nom (`bienvenue`) + des arguments

</v-clicks>

<!--
Durée : 2 min.

Objectif : montrer la structure d'un projet Terraform avec une ressource sans risque. `local_file` est l'équivalent pédagogique d'une VM ou d'un bucket : même cycle, aucun impact hors du dossier de travail.

Exemple concret : remplacer mentalement `local_file` par `aws_s3_bucket` ou `azurerm_resource_group` — seul le provider change, la démarche (décrire, planifier, appliquer) reste identique.

Point d'attention : `terraform init` télécharge le provider depuis le registre public, donc nécessite un accès réseau ; prévoir un plan B (projecteur seul) si le réseau de la salle bloque. Ne rien exécuter qui touche un vrai cloud.

Démonstration enseignant uniquement sur la slide suivante ; les étudiants qui ont Terraform installé peuvent reproduire en autonomie, les autres suivent à l'écran.

Transition : parcourir les commandes qui font vivre ce fichier.
-->

---

# Terraform — le cycle de commandes

```bash
terraform fmt              # formate le code
terraform init             # télécharge le provider, crée .terraform/
terraform validate         # vérifie la syntaxe et la cohérence
terraform plan -out=tfplan # calcule les changements, les enregistre
terraform apply tfplan     # applique exactement le plan relu
terraform destroy          # supprime ce que Terraform a créé
```

<v-clicks>

- **`plan`** : relire les lignes `+` (créé), `~` (modifié), `-` (détruit) **avant** d'appliquer
- **`apply tfplan`** applique le plan enregistré, pas un nouveau calcul
- `destroy` affiche aussi un plan : le relire et confirmer à la main

</v-clicks>

<Tip type="warning">
N'utilisez pas <code>-auto-approve</code> en apprentissage : il supprime la relecture, c'est-à-dire le garde-fou principal de Terraform.
</Tip>

<style scoped>
.slidev-code { font-size: 0.8em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 3 min (dont ~2 min de démonstration enseignant, abrégée).

Dérouler dans l'ordre : `fmt` (style), `init` (prépare le dossier), `validate` (erreurs de syntaxe sans toucher à rien), `plan -out=tfplan` (le "diff" de l'infrastructure), `apply tfplan` (exécute ce plan précis, donc ce qui a été relu), `destroy` (nettoyage).

Démonstration enseignant : lancer la séquence dans un dossier vide contenant le `main.tf` précédent. Après `plan`, lire à voix haute la ligne `+ resource "local_file" "bienvenue"` et le résumé « 1 to add ». Après `apply`, afficher `bienvenue.txt`. Relancer `plan` : « No changes » — c'est l'idempotence vue plus tôt. Modifier `content`, relancer `plan` : la ressource est remplacée (`-/+`). Terminer par `destroy` et constater que le fichier disparaît.

Mise en garde `-auto-approve` : à ne pas montrer ni conseiller ici ; en production un plan non relu peut détruire une base de données. Si un étudiant le connaît, expliquer qu'il est réservé à des pipelines avec des garde-fous explicites.

Transition : que doit-on versionner dans Git et que doit-on laisser de côté ?
-->

---

# Terraform — que versionner dans Git ?

| Fichier / dossier | Git ? | Pourquoi |
|---|---|---|
| `*.tf` | ✅ Oui | La description de l'infrastructure |
| `.terraform.lock.hcl` | ✅ Oui | Fige les versions de providers utilisées |
| `.terraform/` | ❌ Non | Cache téléchargé, regénéré par `init` |
| `*.tfstate`, `*.tfstate.*` | ❌ Non | Peut contenir des données sensibles |
| `tfplan` | ❌ Non | Plan local, peut contenir des valeurs sensibles |

<!--
Durée : 1 min.

Rappel du lien avec la slide précédente sur le fichier d'état (state) : il sert de mémoire à Terraform mais peut contenir des secrets en clair, donc jamais dans Git. En équipe, on le stocke dans un backend distant protégé — hors périmètre du module.

Exemple concret : deux étudiants qui clonent le dépôt obtiennent les mêmes versions de provider grâce au fichier `.terraform.lock.hcl` commité ; sans lui, chacun pourrait télécharger une version différente.

Vérification rapide : demander de proposer les lignes du `.gitignore` Terraform (`.terraform/`, `*.tfstate`, `*.tfstate.*`, `tfplan`) avant de les afficher.

Transition : GitOps, qui prolonge l'idée de décrire et versionner l'état voulu.
-->

---

# GitOps : Git comme source de vérité de l'état désiré

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  E["Équipe"] -->|"PR/MR relue puis fusionnée"| A["Dépôt Git<br/>état désiré versionné"]
  B["Agent GitOps"] -->|"lit l'état désiré"| A
  B -->|"observe l'état réel"| C["Environnement<br/>état réel"]
  B ==>|"réconcilie : corrige l'écart"| C
```

<v-clicks>

- L'**état désiré** (ce qui doit tourner) est décrit dans Git, relu et historisé comme du code
- Un **agent** compare en continu l'état **réel** à l'état **désiré**
- Un écart (**drift**), par exemple une modification manuelle, est détecté puis réconcilié ou signalé

</v-clicks>

<!--
Durée : 2 min.

GitOps étend l'idée d'Infrastructure as Code : l'état voulu du système vit dans Git, et c'est un agent qui travaille à faire coïncider l'environnement avec cet état. La boucle compare-réconcilie rappelle celle des orchestrateurs vue en séance 1. Un drift est un écart entre ce qui est décrit et ce qui existe réellement ; selon la configuration, l'agent le corrige automatiquement ou le signale.

Exemple concret : quelqu'un modifie à la main le nombre de réplicas d'un service ; l'agent constate que l'état réel diffère de l'état décrit dans Git et le ramène à la valeur versionnée, ou lève une alerte.

Transition : situer GitOps par rapport à l'IaC vue juste avant.
-->

---

# IaC et GitOps : deux approches complémentaires

| | Infrastructure as Code (ex. Terraform) | GitOps |
|---|---|---|
| Idée | Décrire l'infrastructure en fichiers | Faire de Git la source de vérité de l'état désiré |
| Qui applique ? | Une personne ou un pipeline lance `plan` / `apply` | Un agent compare et réconcilie en continu |
| Détection du drift | À la prochaine exécution du plan | Fait partie du fonctionnement de l'agent |
| Outils typiques | Terraform, OpenTofu, Pulumi | Argo CD, Flux (concept, sans démonstration) |

<Tip type="warning">
Un <code>git push</code> ne signifie pas que l'infrastructure est déjà déployée : l'agent doit détecter le changement, les contrôles doivent passer et l'application peut échouer. Revenir à un état Git précédent est possible, mais n'annule pas forcément les effets déjà produits (données, migrations).
</Tip>

<!--
Durée : 2 min.

Les deux approches se combinent : l'IaC décrit des ressources, le GitOps fournit le mode de livraison (changement par PR/MR, application par un agent, détection de dérive). Argo CD et Flux sont cités comme exemples d'agents, notamment dans Kubernetes : aucune installation ni démonstration ici, seulement le principe.

Nuances à verbaliser : un dépôt à jour ne prouve pas que l'environnement l'est — il faut observer le statut de réconciliation. Le « retour arrière » consiste à ramener l'état désiré à une version antérieure, ce qui n'efface pas les données écrites ni ne défait certaines migrations.

Exemple concret : fusionner une PR qui change la version d'une image déclenche, quelques instants plus tard, la mise à jour par l'agent ; si l'image est introuvable, le dépôt est correct mais l'environnement reste sur l'ancienne version.

Transition : retour à la conteneurisation, avec les fondamentaux Docker.
-->

---

# VM versus conteneur

<Comparison left="Machine virtuelle" right="Conteneur" leftColor="orange" rightColor="green">
  <template #left>

  - OS complet par VM
  - Démarrage en minutes
  - Isolation forte, via hyperviseur
  - Empreinte en gigaoctets

  </template>
  <template #right>

  - Partage le noyau de la machine hôte
  - Démarrage en secondes
  - Isolation par espaces de noms (namespaces)
  - Empreinte en mégaoctets

  </template>
</Comparison>

<!--
Durée : 3 min (dont ~1 min de discussion comparée).

Le point à faire comprendre : un conteneur n'embarque pas un système d'exploitation complet, il partage le noyau de la machine hôte — c'est ce qui explique sa légèreté.

Exemple concret : le fameux "ça marche sur ma machine" des années 2000-2010, quand chaque développeur avait un environnement légèrement différent — la conteneurisation résout ce problème en figeant l'environnement d'exécution.

Discussion comparée : reprendre chaque ligne du tableau une par une et demander à la salle d'expliquer, dans ses propres mots, pourquoi le conteneur gagne sur ce critère (démarrage, empreinte, isolation) — transforme la lecture passive du tableau en vérification active de compréhension avant de plonger dans Docker.

Transition : introduire l'architecture Docker (image, couche, registre, conteneur).
-->

---

# Architecture Docker

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Client Docker] -->|Commandes| B[Démon Docker]
  B -->|Récupère| C[Registre d'images]
  B -->|Crée| D[Conteneur]
```

<v-clicks>

- **Image** — modèle figé, en lecture seule
- **Couche (layer)** — chaque instruction du Dockerfile ajoute une couche, mise en cache
- **Registre** — stockage distant des images (Docker Hub, GitHub Container Registry...)
- **Conteneur** — instance vivante, exécutée à partir d'une image

</v-clicks>

<!--
Durée : 3 min (dont ~1 min de manipulation guidée).

Analogie utile : image = classe en programmation orientée objet, conteneur = instance de cette classe. Une image ne change pas, un conteneur a un état d'exécution propre.

Exemple concret : dix conteneurs peuvent démarrer depuis la même image, chacun avec ses propres logs et son propre état mémoire, sans interférer entre eux.

Manipulation guidée courte : `docker version` pour repérer client et démon, puis `docker run hello-world` pour observer la récupération d'image et la création du conteneur ; `docker info` reste optionnel.

Transition : écrire un premier Dockerfile.
-->

---

# Anatomie d'un Dockerfile

```dockerfile {all|1|3|5-6|8-9|11|all}
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000

CMD ["node", "server.js"]
```

<!--
Durée : 3 min (démonstration live resserrée).

Dérouler chaque instruction : image de base, répertoire de travail, copie ciblée des fichiers de dépendances avant le reste du code (pour préserver le cache), exposition documentaire du port, commande de démarrage.

Exemple concret : si le code applicatif change mais pas `package.json`, l'étape `npm ci` n'est pas rejouée — gain de temps de build significatif sur un projet qui grossit.

Démonstration live resserrée : écrire ce Dockerfile ligne par ligne devant la salle sur une petite application Node d'exemple, en commentant chaque choix ; lancer `docker build` et montrer les couches se construire une par une dans le terminal ; lancer `docker run` avec la publication du port, puis vérifier l'endpoint exposé avec `curl localhost:3000` ou dans le navigateur ; enfin modifier une ligne du code applicatif et relancer un build pour observer le cache en action sur les couches inchangées.

Transition : récapituler les commandes qui accompagnent ce Dockerfile au quotidien.
-->

---

# Docker — le cycle de commandes

```bash
docker build -t demo-app:1.0 .                       # construit l'image
docker run -d --name demo -p 9090:80 demo-app:1.0   # lance un conteneur
docker ps                                           # conteneurs actifs
docker logs -f demo                                  # suit les logs (Ctrl+C)
docker exec -it demo sh                              # shell dans le conteneur
docker stop demo && docker rm demo                    # arrête puis supprime
docker images                                       # images locales
```

<v-clicks>

- **Image** : `build`, `images` — **conteneur** : `run`, `ps`, `logs`, `exec`, `stop`, `rm`
- `-p 9090:80` : port de l'**hôte** : port du **conteneur**
- `stop` n'efface pas le conteneur : `rm` est nécessaire pour libérer le nom

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.68em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 3 min.

Regrouper en deux familles pour la mémorisation : commandes sur l'image, commandes sur le conteneur. Distinguer `docker ps` (actifs) de `docker ps -a` (tous, y compris arrêtés).

Exemple concret : lancer deux fois `docker run --name demo` provoque une erreur de nom déjà utilisé — d'où `stop` puis `rm`, ou l'option `--rm` pour les essais jetables.

Les noms d'image et de conteneur ainsi que le port publié sont purement illustratifs : rien n'est imposé.

Rappel de sécurité : ne jamais passer de secret en clair dans une commande partagée  ; les TP publient sur un dépôt public.

Transition : pause de 20 minutes, puis bonnes pratiques Docker.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Répondre aux questions individuelles sur Git ou Docker pendant la pause.

Transition au retour : construire de bonnes images (principes, cache, .dockerignore, utilisateur non privilégié, multi-stage).
-->

---

# Construire une image : principes généraux

<div class="grid grid-cols-4 gap-3 mt-2 text-sm">
  <div class="card"><div class="font-bold text-accent mb-1">🌐 API</div>Runtime + dépendances de production + code, port d'écoute</div>
  <div class="card"><div class="font-bold text-accent mb-1">⚙️ Worker</div>Même base qu'une API, mais sans port : il consomme des tâches</div>
  <div class="card"><div class="font-bold text-accent mb-1">⌨️ CLI</div>Un exécutable et son point d'entrée, lancé à la demande</div>
  <div class="card"><div class="font-bold text-accent mb-1">🖼️ Front statique</div>Fichiers construits + un serveur web pour les servir</div>
</div>

<v-clicks>

- **Reproductible** : version de l'image de base choisie (pas de `latest`), fichier de verrouillage des dépendances
- **Séparer** les dépendances, les outils de construction et les artefacts : l'image finale n'embarque que le nécessaire à l'exécution
- **Sans secret** dans l'image ; la configuration arrive à l'exécution
- Le **cache** de build est un confort de vitesse, secondaire par rapport à la reproductibilité

</v-clicks>

<!--
Durée : 3 min.

Le raisonnement est le même pour tout type d'application : que faut-il, et seulement quoi, pour EXÉCUTER ? Une API et un worker partagent les mêmes dépendances ; un worker n'écoute aucun port. Une CLI est un exécutable lancé ponctuellement. Un front construit est un ensemble de fichiers statiques à servir. Dans tous les cas, ce qui sert à construire (compilateur, gestionnaire de paquets, dépendances de développement) n'a pas à finir dans l'image d'exécution.

Reproductibilité : épingler la version de l'image de base et utiliser le fichier de verrouillage des dépendances donne le même résultat d'un jour à l'autre ; `latest` change sans prévenir.

Exemple concret : deux builds du même code à un mois d'intervalle produisent des images différentes si la base n'est pas épinglée, ce qui complique le diagnostic d'un incident.

Transition : le cache de build d'abord, puis `.dockerignore` et le multi-stage, qui formalise la séparation entre construction et exécution.
-->

---

# Ordonner les couches : un gain de vitesse

```dockerfile
# Moins optimal — tout invalidé au moindre changement de code
COPY . .
RUN npm ci

# Préférable — l'installation survit aux changements de code
COPY package*.json ./
RUN npm ci
COPY . .
```

<v-clicks>

- Les instructions **les moins susceptibles de changer** en premier
- Un changement de code ne doit pas invalider l'installation des dépendances
- Le cache accélère les rebuilds, mais **ne remplace pas** une construction reproductible

</v-clicks>

<!--
Durée : 3 min (comparaison à commenter rapidement ou à montrer en une seule exécution).

Chaque instruction crée une couche mise en cache tant que ses entrées ne changent pas ; dès qu'une couche est invalidée, toutes les suivantes sont reconstruites. Copier d'abord les fichiers de dépendances puis le code préserve donc le cache d'installation.

Exemple concret : un changement d'une ligne de code peut faire passer un rebuild de plusieurs minutes à quelques secondes, simplement grâce à cet ordre.

Comparaison chronométrée possible : même changement de code avec chacun des deux ordres, chronomètre à l'appui.

Transition : `.dockerignore` et utilisateur non privilégié.
-->

---

# `.dockerignore` et utilisateur non privilégié

```text
node_modules
.git
.env
dist
```

```dockerfile
# Éviter de tourner en root dans le conteneur
USER node
```

<v-clicks>

- `.dockerignore` évite de copier des fichiers inutiles ou sensibles dans l'image
- Un `.env` copié par erreur peut fuiter des secrets dans les couches de l'image
- `USER` bascule sur un compte non privilégié — réduit l'impact d'une éventuelle évasion de conteneur

</v-clicks>

<!--
Durée : 3 min (vérification pratique brève).

Deux bonnes pratiques de sécurité et de propreté à traiter ensemble : elles sont souvent oubliées par des débutants, avec un vrai coût en sécurité et en taille d'image.

Exemple concret : un `.env` copié dans l'image reste présent dans les couches même s'il est supprimé plus tard dans le Dockerfile — d'où l'importance de ne jamais le copier du tout.

Vérification pratique : construire l'image sans puis avec `.dockerignore`, comparer la taille avec `docker images`, puis, seulement si le Dockerfile de l'image contient bien `USER node`, lancer `docker exec <conteneur> whoami` : la valeur attendue est `node`.

Transition : le multi-stage build, qui sépare construction et exécution.
-->

---

# Multi-stage build : le principe

```dockerfile {all|1-4|6-9|all}
# Étape 1 : construction (outils nécessaires au build)
FROM <image-avec-outils> AS build
COPY . /src
RUN <commande-de-build>

# Étape 2 : exécution (image finale)
FROM <image-runtime>
COPY --from=build /src/<artefact> /app/<artefact>
CMD ["<commande-de-démarrage>"]
```

<v-clicks>

- Plusieurs `FROM` : chaque étape repart d'une **image de base** propre
- `COPY --from=build` ne récupère que des **artefacts** de l'étape précédente
- L'image finale est celle de la **dernière étape** : outils et sources de build n'y figurent pas, sauf si on les copie

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 3 min.

Les éléments entre chevrons sont des paramètres de l'exemple : image avec compilateur ou gestionnaire de paquets, commande de build, artefact produit, image d'exécution, commande de démarrage. Insister sur les deux notions clés : `FROM ... AS` nomme une étape, `COPY --from=` en extrait des fichiers.

L'intérêt est de séparer clairement construction et exécution : image finale plus simple à auditer, avec moins de paquets inutiles. Le gain de taille dépend du projet et se mesure avec `docker images` ; ne pas promettre un chiffre.

Un multi-stage n'a de sens que s'il y a un vrai build à isoler : ajouter une étape qui ne produit aucun artefact utile n'apporte rien.

Exemple concret : un projet compilé produit un binaire ou un dossier statique dans l'étape 1 ; l'étape 2 ne reçoit que ce résultat.

Transition : un exemple explicite avec un frontend.
-->

---

# Exemple : frontend construit avec Node, servi par Nginx

```dockerfile {all|1-6|8-9|all}
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN echo "G4"
COPY . .
RUN npm run build

FROM nginx:1.28-alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

<v-clicks>

- **Étape build** : Node installe les dépendances et produit les fichiers statiques
- **Étape finale** : Nginx sert ces fichiers ; Node et `node_modules` n'y figurent pas
- Le dossier de sortie (`dist` ici) et les versions sont **illustratifs** : ils dépendent du projet et de l'outil

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 3 min.

Exemple d'illustration d'un seul cas, pas un modèle à recopier : un frontend dont le build produit des fichiers statiques. Étape 1 : `npm ci` (reproductible grâce au fichier de verrouillage) puis `npm run build`. Étape 2 : Nginx repart d'une image propre et reçoit uniquement la sortie statique dans le dossier qu'il sert.

Dossier de sortie : il dépend de l'outil et de la version (par exemple `dist` pour un projet Vite, un sous-dossier propre au projet pour Angular) ; il se vérifie dans son propre projet après un build, jamais par supposition. Les numéros de version des images sont eux aussi des exemples à adapter.

Note SPA : une application à routes côté client peut renvoyer 404 au rechargement d'une route si le serveur ne redirige pas vers `index.html` ; on le mentionne sans le détailler.

Transition : un conteneur est jetable ; voir comment conserver des données avec les volumes.
-->

---

# Volumes : volume nommé ou bind mount ?

| | Volume nommé | Bind mount |
|---|---|---|
| Syntaxe | `-v db-data:/var/lib/postgresql/data` | `-v "$(pwd)/site:/usr/share/nginx/html:ro"` |
| Géré par | Docker | Votre dossier sur l'hôte |
| Usage typique | Données persistantes (base de données) | Code ou fichiers en développement |
| Portabilité | Bonne | Dépend de l'arborescence de l'hôte |

<Tip type="warning">
Le contenu d'un conteneur disparaît avec lui ; seul un volume (ou un bind mount) survit à <code>docker rm</code>.
</Tip>

<!--
Durée : 3 min (dont ~1 min de démonstration).

Message clé : le système de fichiers d'un conteneur est éphémère. Pour persister, on monte soit un volume géré par Docker (nommé), soit un dossier de l'hôte (bind mount).

Démonstration enseignant : `docker volume create demo-data`, lancer un conteneur `alpine` qui écrit un fichier dans le volume (`docker run --rm -v demo-data:/data alpine sh -c "echo bonjour > /data/note.txt"`), puis un second conteneur qui lit ce fichier (`docker run --rm -v demo-data:/data alpine cat /data/note.txt`) : la donnée survit à deux conteneurs supprimés. Nettoyer ensuite avec `docker volume rm demo-data`. Variante bind mount : monter un dossier local `site/` en lecture seule dans `nginx:alpine` et modifier la page sans reconstruire d'image.

Exemple concret : une base PostgreSQL sans volume perd toutes ses données au `docker rm` ; un bind mount est pratique pour le développement mais dépend du chemin de la machine, donc peu portable.

Transition : une application réunit plusieurs conteneurs — pourquoi et comment les décrire avec Compose.
-->

---

# Pourquoi plusieurs conteneurs ?

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  U["Navigateur"] --> F["Front<br/>pages statiques"]
  U --> A["API<br/>logique métier"]
  A --> D[("Base de données")]
```

<v-clicks>

- Une application réelle réunit plusieurs **services**, chacun avec sa responsabilité (front, API, base de données, cache...)
- Un conteneur = en général **un processus principal** : on en lance donc plusieurs
- À la main, il faut enchaîner des `docker run` avec réseau, ports, volumes et variables : **long et sujet aux erreurs**

</v-clicks>

<!--
Durée : 2 min.

Partir du besoin avant l'outil. Une application web classique est faite de plusieurs briques qui communiquent ; les isoler dans des conteneurs distincts permet de les mettre à jour, de les remplacer et de les superviser séparément. Mais lancer chacune à la main implique de créer un réseau, de retenir l'ordre de démarrage, les ports publiés, les volumes et les variables : chaque oubli devient un problème de reproductibilité.

Exemple concret : un nouveau collègue doit lancer quatre conteneurs avec une dizaine d'options chacun, copiées depuis un vieux message ; au moindre écart, rien ne fonctionne.

Transition : Compose décrit cet ensemble de façon déclarative.
-->

---

# Compose : décrire l'ensemble, de façon déclarative

<Comparison left="Commandes à la main" right="Fichier Compose" leftColor="orange" rightColor="green">
  <template #left>

  - Suite de `docker run` à rejouer dans le bon ordre
  - Réseau, ports et volumes à gérer soi-même
  - Connaissance dans la tête ou dans un vieux message

  </template>
  <template #right>

  - Un fichier **versionné** décrit services, réseau et volumes
  - Une commande démarre l'ensemble, une autre l'arrête
  - Même description pour toute l'équipe, relue comme du code

  </template>
</Comparison>

<v-clicks>

- On décrit l'**état souhaité** ; Compose crée ce qui manque (même idée que l'Infrastructure as Code)
- Compose cible **une seule machine** : développement, démonstration, petits environnements

</v-clicks>

<!--
Durée : 2 min.

Faire le lien avec l'Infrastructure as Code vue plus tôt : on déclare ce que l'on veut, l'outil se charge de l'obtenir. Compose ne remplace pas un orchestrateur multi-machines ; il simplifie la description et le lancement d'un ensemble de conteneurs sur une machine.

Exemple concret : le même fichier lance la pile à l'identique sur le poste de chaque membre de l'équipe.

Transition : lire un fichier Compose, d'abord à titre d'exemple pédagogique.
-->

---

# Lire un fichier Compose

`compose.yaml`

```yaml
name: demo

services:
  web:
    image: nginx:1.28-alpine
    ports:
      - "9090:80"
    depends_on:
      - whoami

  whoami:
    image: traefik/whoami:v1.11.0
```

<v-clicks>

- **`services`** : un bloc par conteneur ; **`image`** : l'image utilisée
- **`ports: "9090:80"`** : port de l'**hôte** 9090 → port **interne** 80 du conteneur
- `whoami` n'a **pas** de `ports:` : il n'est pas publié sur l'hôte
- `depends_on` règle l'**ordre de démarrage**, pas la disponibilité (≠ readiness)

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.3 !important; }
</style>

<!--
Durée : 3 min.

Exemple purement pédagogique, sans rapport avec une architecture front + API + base de données : un serveur web et un petit service de démonstration. `name: demo` fixe le nom du projet, donc le réseau par défaut s'appellera `demo_default`. `traefik/whoami` est un petit serveur HTTP open source qui répond avec le nom et l'adresse de son conteneur ; tag explicite, jamais `latest`. Les valeurs (nom de projet, ports, versions) sont illustratives.

Précision importante : `depends_on` simple garantit seulement que le conteneur démarre après l'autre, pas que le service à l'intérieur soit prêt à répondre ; pour attendre un service prêt, il faut un healthcheck et une condition dédiée, hors périmètre ici.

Exemple concret : une API qui démarre avant que sa base soit prête échoue à sa première connexion même avec `depends_on` ; il faut une logique de nouvelle tentative ou une condition de santé.

Transition : comment ces services se parlent, et comment le navigateur les atteint.
-->

---

# Réseau Compose : DNS interne, navigateur dehors

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  B["Navigateur<br/>sur l'hôte"] -->|"localhost:9090"| W
  subgraph N["Réseau Docker du projet"]
    W["web<br/>port interne 80"] -->|"http://whoami:80"| Q["whoami<br/>port interne 80"]
  end
```

<v-clicks>

- Compose crée un **réseau par défaut** et y attache tous les services
- Entre services, le **DNS interne** résout le **nom du service** vers l'IP de son conteneur
- Le **navigateur** est sur l'hôte, **hors** du réseau Docker : il n'utilise que les ports **publiés**
- Port **hôte** (9090) ≠ port **interne** (80) : entre conteneurs, on utilise le port interne

</v-clicks>

<Tip type="info">
Les volumes persistent des données ; ils ne servent pas à faire communiquer les services.
</Tip>

<!--
Durée : 3 min.

Lire le schéma : le navigateur se trouve sur la machine hôte et n'atteint que ce qui est publié (`localhost:9090`). À l'intérieur du réseau du projet, `web` joint `whoami` par son nom et par le port interne 80 ; aucun mapping de port n'est nécessaire entre conteneurs. Les adresses IP des conteneurs changent à chaque recréation, d'où l'usage du nom de service. Même idée que le nom DNS d'un Service Kubernetes, vu ensuite.

Conséquence à retenir : un service non publié n'est pas joignable depuis le navigateur ; un navigateur ne sait pas résoudre le nom d'un service interne ; et dans un conteneur, `localhost` désigne le conteneur lui-même, pas la machine hôte ni un autre service.

Exemple concret : depuis le conteneur `web`, `http://whoami` répond ; depuis le navigateur de l'hôte, `http://whoami` ne se résout pas.

Transition : les commandes Compose du quotidien.
-->

---

# Docker Compose — le cycle de commandes

```bash
docker compose up -d --build   # construit puis démarre en arrière-plan
docker compose ps              # état des services
docker compose logs -f web     # suit les logs d'un service
docker compose exec web sh     # shell dans un service en cours
docker compose down            # arrête et supprime conteneurs et réseau
docker compose down -v         # idem + SUPPRIME les volumes déclarés
```

<Tip type="warning">
<code>down -v</code> supprime aussi les volumes déclarés dans le fichier : à réserver aux environnements jetables.
</Tip>

<style scoped>
.slidev-code { font-size: 0.8em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 2 min.

Montrer le cycle complet : `up -d --build`, `ps`, `logs -f web` (Ctrl+C pour quitter), `exec web sh` pour entrer dans un service, puis `down`, qui supprime conteneurs et réseau.

Distinction à retenir : `down` supprime conteneurs et réseau mais conserve les volumes nommés ; `down -v` les efface aussi. Notre stack d'exemple n'en déclare aucun, mais le réflexe doit être pris.

Exemple concret : un `down -v` lancé par réflexe sur une stack de préproduction efface ses données ; on vérifie toujours l'option `-v` avant de valider.

Transition : prendre de la hauteur avec la CNCF et l'écosystème cloud-native.
-->

---

# La CNCF — fondation de l'écosystème cloud-native

<KeyConcept title="CNCF" icon="🏛️">
Fondation open source qui héberge des projets cloud-native, organise leur gouvernance et contribue à leur maintien dans la durée.
</KeyConcept>

<v-clicks>

- Héberge de nombreux projets : Kubernetes, Prometheus, OpenTelemetry, et d'autres
- Statuts de maturité : **sandbox**, **incubating**, **graduated**
- Ces statuts sont des **signaux de gouvernance**, pas des garanties absolues

</v-clicks>

<!--
Durée : 2 min (échange court possible sur un projet connu).

Point important à verbaliser clairement : la CNCF est présentée AVANT Kubernetes volontairement, pour éviter de réduire tout l'écosystème cloud-native à un seul outil. Kubernetes n'est qu'un projet hébergé parmi d'autres.

Exemple concret : un projet "graduated" a démontré une gouvernance mature et une large adoption, mais ce statut n'est ni une certification de sécurité ni une garantie d'adéquation à un besoin précis — toujours évaluer au cas par cas.

Échange avec la salle : demander si certains connaissent déjà l'un des projets cités (Kubernetes, Prometheus, OpenTelemetry) et faire décrire en une phrase à quoi il sert, sans entrer dans le détail technique — prépare le terrain pour l'introduction Kubernetes qui suit et pour l'observabilité vue en séance 4.

Transition : introduire Kubernetes comme l'un des projets hébergés par la CNCF.
-->

---

# Kubernetes — pourquoi un orchestrateur ?

<Tip type="info">
Docker crée et exécute les conteneurs ; Kubernetes organise leur déploiement, leur réplication et leur supervision à grande échelle.
</Tip>

<v-clicks>

- Docker gère **un conteneur** sur **une machine**
- Compose gère **plusieurs conteneurs** sur **une machine**
- Kubernetes gère **de nombreux conteneurs** répartis sur **plusieurs machines**

</v-clicks>

<!--
Durée : 2 min.

Progression pédagogique volontaire : Docker (1 machine) → Compose (1 machine, plusieurs services) → Kubernetes (plusieurs machines). Cette montée en échelle rend le "pourquoi" de Kubernetes évident.

Exemple concret de cas d'usage : une application avec plusieurs services qui doit rester disponible malgré une panne de machine, absorber un pic de trafic, ou se mettre à jour sans coupure — Kubernetes répond à ces besoins.

Transition : présenter le vocabulaire minimal de Kubernetes.
-->

---

# Vocabulaire minimal de Kubernetes

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph TB
  subgraph Cluster
    subgraph Node1[Machine 1]
      P1[Pod]
    end
    subgraph Node2[Machine 2]
      P2[Pod]
    end
  end
  S[Service] --> P1
  S --> P2
```

<!--
Durée : 1 min.

Lire le schéma de haut en bas : un cluster regroupe des machines (nodes) ; chaque node héberge des Pods ; le Service est le point d'entrée unique qui répartit les requêtes vers les Pods. Les Pods sont répartis sur deux machines : si l'une tombe, l'autre continue de répondre.

Aucun `kubectl` ni manifeste : on lit le schéma, rien de plus.

Transition : nommer précisément ces 5 termes dans le tableau qui suit.
-->

---

# Vocabulaire minimal de Kubernetes

| Terme | Sens simple |
|---|---|
| **Cluster** | Le parc de machines |
| **Node** | Une machine du parc |
| **Pod** | Le conteneur qui tourne (unité de base) |
| **Deployment** | La consigne de réplication et mise à jour |
| **Service** | La porte d'entrée stable vers l'application |

<!--
Durée : 1 min.

Se limiter strictement à ces 5 mots — c'est le vocabulaire visé par le module, pas plus. Aucune démonstration de `kubectl`, aucun manifeste YAML complexe à ce stade.

Exemple concret : pointer chaque terme sur le schéma en le nommant à voix haute, pour ancrer visuellement le vocabulaire plutôt que de réciter une définition académique.

Transition : voir comment Kubernetes sait si un Pod est vivant et prêt à servir — le lien direct avec la haute disponibilité de la séance 1.
-->

---

# Probes : liveness et readiness

<div class="grid grid-cols-2 gap-4">
<div>

<Tip type="info">
Deux questions distinctes : « le conteneur est-il encore sain ? » et « peut-il recevoir du trafic maintenant ? »
</Tip>

| Probe | Si elle échoue |
|---|---|
| **Liveness** | Le conteneur est **redémarré** |
| **Readiness** | Le Pod est **retiré du Service**, sans redémarrage |

</div>
<div>

```yaml
# À lire seulement — pas d'exécution
livenessProbe:
  httpGet: { path: /health, port: 3000 }
readinessProbe:
  httpGet: { path: /health, port: 3000 }
```

</div>
</div>

<v-clicks>

- Même idée que le **health check** d'un load balancer vu en séance 1
- Ne jamais mettre la disponibilité de la **base de données** dans la liveness : une panne DB redémarrerait toute l'application en boucle

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 2 min (lire le tableau, ne pas détailler le YAML).

Message central : liveness = « redémarre-moi si je suis bloqué » ; readiness = « ne m'envoie pas de trafic tant que je ne suis pas prêt ». Un Pod qui démarre lentement, ou qui perd temporairement sa dépendance, doit être NotReady, pas redémarré.

Le YAML est un extrait à lire, pas à écrire : exemple générique avec un endpoint `/health` sur le port 3000, sans lien avec les TP. Dans la pratique, on règle aussi des délais et des seuils ; hors périmètre ici.

Lien HA de la séance 1 : c'est le même principe que le health check d'un load balancer, qui retire du trafic une instance malade.

Avertissement : une liveness qui interroge la base de données transformerait une panne DB en redémarrages en cascade de tous les Pods, ce qui aggrave l'incident. Pour la dépendance DB, la readiness est le bon outil, avec prudence.

Aucun cluster, aucun `kubectl` : introduction seulement.

Transition : voir comment le Service exploite cette notion de Pod prêt.
-->

---

# Services et haute disponibilité

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  C[Client] --> S["Service<br/>nom DNS + IP stables"]
  S --> P1["Pod A — Ready"]
  S --> P2["Pod B — Ready"]
  S -.->|exclu| P3["Pod C — NotReady"]
```

<v-clicks>

- Le **Service** reste stable pendant que les Pods changent
- Seuls les Pods **Ready** reçoivent du trafic
- Disponibilité : **au moins 2 réplicas**, idéalement sur **2 nodes**
- Service ≠ load balancer cloud externe

</v-clicks>

<!--
Durée : 2 min.

Lire le schéma : le client s'adresse toujours au Service (nom DNS et IP stables), jamais à un Pod, dont l'adresse change. Le Pod C NotReady est exclu tant que sa readiness échoue.

HA : avec un seul réplica ou un seul node, une panne coupe le service. Avec au moins 2 réplicas répartis sur 2 nodes, le Service continue vers le Pod restant. Un nouveau Pod remplaçant n'est servi qu'après sa readiness, donc sans envoyer de requêtes à un Pod pas prêt.

Nuance : un Service interne au cluster n'est pas un load balancer cloud externe ; l'exposition vers Internet relève d'autres objets ou du fournisseur cloud, hors périmètre de cette introduction.

Liens : health check/load balancer de la séance 1 ; et le nom DNS de service Compose (`web`, `whoami`) vu plus tôt joue un rôle comparable, à l'échelle d'une seule machine.

Aucun cluster, aucun TP.

Transition : conclure sur les limites de cette introduction et faire la synthèse de séance.
-->

---
layout: recap
section: Séance 2 — DevOps, Git, IaC et GitOps (1/3)
---

# Ce qu'il faut retenir — DevOps, Git, IaC, GitOps

- **DevOps** : vitesse ET fiabilité, métiers qui collaborent, responsabilité partagée
- **Git** : historique distribué, local puis distant ; Git ≠ GitHub ; cycle de base : consulter, indexer, valider, partager, récupérer
- **Collaboration** : branches, PR/MR, commits atomiques, SemVer
- **IaC** : déclaratif, plan, apply, idempotence
- **GitOps** : état désiré dans Git, agent qui réconcilie

<!--
Durée : 1 min.

Premier recap : culture, Git et automatisation de l'infrastructure. DevOps répond à un besoin de vitesse ET de fiabilité ; les métiers évoluent vers la collaboration et l'automatisation sans disparaître. Git : historique distribué, travail local puis partage ; ne pas confondre l'outil et la plateforme. Commandes de base à citer à l'oral : `status`, `add`, `commit`, `push`, `pull`. Terraform : état et `.terraform/` jamais versionnés. GitOps : l'état désiré est dans Git, un agent compare et réconcilie, un push ne vaut pas déploiement réussi.

Transition : recap Docker et Compose.
-->

---
layout: recap
section: Séance 2 — Docker, images et Compose (2/3)
---

# Ce qu'il faut retenir — Docker, images, Compose

- **Docker** : image, couche, registre, conteneur ; cycle de vie : construire, lancer, observer, entrer, arrêter
- **Images** : reproductibles, sans secret ; outils de build séparés des artefacts (multi-stage)
- **Volumes** : volume nommé (données) vs bind mount (développement)
- **Compose** : plusieurs services dans un fichier ; DNS par nom de service ; port hôte ≠ port interne ; ordre de démarrage ≠ service prêt

<!--
Durée : 1 min.

Docker : image, couche, registre, conteneur ; cycle `build`/`run`/`ps`/`logs`/`exec`/`stop`/`rm`. Images : principes valables pour une API, un worker, une CLI ou un front ; le multi-stage (`FROM`, `COPY --from`) sépare construction et exécution, l'exemple Node vers Nginx illustre un frontend statique. Volumes : persistance des données. Compose : description déclarative de plusieurs conteneurs, réseau et DNS internes, navigateur hors réseau Docker, `depends_on` limité à l'ordre de démarrage, `down -v` supprime les volumes.

Transition : recap cloud-native et Kubernetes.
-->

---
layout: recap
section: Séance 2 — Cloud-native, Kubernetes (3/3)
---

# Ce qu'il faut retenir — Cloud-native, Kubernetes

- **CNCF** : gouvernance, statuts de maturité, sans garantie absolue
- **Kubernetes** : cluster, node, pod, deployment, service
- **Liveness** : redémarre ; **readiness** : retire du Service

<!--
Durée : 1 min.

Rappeler les limites du module sur Kubernetes : pas d'installation de cluster, pas de manifeste complexe, pas de TP évalué dessus ; uniquement du vocabulaire et les idées de haute disponibilité (probes, Service). Les statuts CNCF sont des signaux de gouvernance, pas des garanties.

Transition : place aux deux TP de la séance, dont les énoncés suivent.
-->

---

# TP Docker — votre image multi-stage

<div class="grid grid-cols-4 gap-3 mt-2">
  <div class="card">
    <div class="text-2xl mb-1">1️⃣ 🧱</div>
    <div class="font-bold text-accent mb-1">Créer</div>
    <div class="text-sm">Une application web simple, dont le build produit des fichiers statiques</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">2️⃣ 🐳</div>
    <div class="font-bold text-accent mb-1">Construire</div>
    <div class="text-sm">Une image <strong>multi-stage</strong> : une étape construit, l'étape finale sert les artefacts</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">3️⃣ 🔍</div>
    <div class="font-bold text-accent mb-1">Tester</div>
    <div class="text-sm">Démarrer un conteneur depuis votre image et constater que l'application répond</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">4️⃣ 📤</div>
    <div class="font-bold text-accent mb-1">Versionner</div>
    <div class="text-sm">Sources, Dockerfile et README sur un dépôt GitHub <strong>public</strong></div>
  </div>
</div>

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="card-accent text-sm">🎨 <strong>Vous choisissez</strong> : framework (Angular, React, Vue ou autre), structure des dossiers, noms, images, ports</div>
  <div class="card-accent text-sm">🔒 <strong>Garde-fous</strong> : aucun secret, ni <code>node_modules</code>, ni donnée personnelle versionnés</div>
</div>

<!--
Durée : 2 min.

Énoncé volontairement ouvert : l'objectif est de produire une image multi-stage dont l'étape finale sert des artefacts frontend réellement construits (un vrai build, pas une étape décorative). Aucun nom de dossier, d'image, de conteneur ni de port n'est imposé. Le test consiste à lancer un conteneur depuis son image et à vérifier que l'application répond, dans le navigateur ou avec un client HTTP. Le dépôt GitHub public contient les sources, le Dockerfile et un README qui explique comment construire, lancer et vérifier.

Sécurité : le dépôt est public ; aucun secret, aucun `node_modules`, aucune donnée personnelle ne doit être versionné ; vérifier aussi l'adresse email configurée dans Git. Un secret poussé est à considérer comme compromis.

Les attendus de remise sont détaillés juste avant le QCM. Ne fournir aucune solution : les étudiants s'appuient sur les slides de cours et leur documentation.

Transition : un rappel sur quelques exemples de commandes d'initialisation d'un frontend.
-->

---

# Exemples : initialiser un frontend

| Framework | npm | bun |
|---|---|---|
| **Angular** | `npm create @angular@latest mon-front` | `bunx @angular/cli new mon-front --package-manager bun` |
| **React** | `npm create vite@latest mon-front -- --template react` | `bun create vite mon-front --template react` |
| **Vue** | `npm create vue@latest mon-front` | `bun create vue mon-front` |

<v-clicks>

- `mon-front` est un **nom purement illustratif** : choisissez le vôtre
- **Angular** : Node reste requis, même avec bun ; répondre **non** à SSR/SSG
- **React / Vue** : options facultatives → **non**

</v-clicks>

<style scoped>
table { font-size: 0.78em; }
</style>

<!--
Durée : 1 min.

Ces commandes ne sont que des exemples pour démarrer un projet frontend ; d'autres outils sont acceptés. Choisir UNE ligne (un framework) et UNE colonne (npm ou bun). Le nom du dossier est libre : `mon-front` n'est qu'un nom d'illustration.

Angular : même avec `bunx`, Angular CLI s'exécute sur Node, donc Node 22 LTS doit être installé. Aux questions SSR/SSG (rendu serveur / prérendu), répondre non : un site statique suffit à être servi. React / Vue : les assistants proposent des options facultatives (TypeScript, routeur, tests, lint, démarrage immédiat...) : répondre non ou prendre la valeur la plus simple. Aucun framework n'est plus « juste » qu'un autre.

Les commandes de génération sont celles documentées par les outils au moment de la rédaction ; les assistants évoluent, donc les questions posées peuvent légèrement varier. Vérifier avant la séance sur un poste de test.

Transition : l'énoncé du second TP.
-->

---

# TP Compose — front + API + base de données

<div class="grid grid-cols-4 gap-3 mt-2">
  <div class="card">
    <div class="text-2xl mb-1">1️⃣ 🧩</div>
    <div class="font-bold text-accent mb-1">Trois services</div>
    <div class="text-sm">Un front, une API backend, une base de données ; un <strong>Hello World</strong> suffit</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">2️⃣ 📄</div>
    <div class="font-bold text-accent mb-1">Un fichier Compose</div>
    <div class="text-sm">Il décrit l'ensemble et le démarre de façon reproductible</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">3️⃣ 🔗</div>
    <div class="font-bold text-accent mb-1">Communications</div>
    <div class="text-sm">Prouver que l'API atteint la base, et que le navigateur atteint un endpoint adapté de l'API</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">4️⃣ 📝</div>
    <div class="font-bold text-accent mb-1">Documenter</div>
    <div class="text-sm">README : lancement, tests, preuves ; paramètres factices expliqués</div>
  </div>
</div>

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="card-accent text-sm">🗄️ <strong>Rôle de la base</strong> : illustratif (ex. conserver une valeur simple) — pas de CRUD complet, pas d'accès direct depuis le navigateur</div>
  <div class="card-accent text-sm">🎨 <strong>Libre</strong> : langages, frameworks, structure, noms, images, ports — <strong>GitHub public</strong>, sans secret réel</div>
</div>

<!--
Durée : 2 min.

Second TP, plus ambitieux dans l'architecture mais minimal dans la fonctionnalité : trois services qui communiquent. Un Hello World suffit : le front affiche un résultat obtenu auprès de l'API, l'API interroge la base (ou y écrit/lit une valeur simple). La base a un rôle illustratif (stockage ou persistance simple) : pas de CRUD complet, et le navigateur ne doit jamais accéder directement à la base.

À prouver : la communication entre services (API vers base) et celle du navigateur vers l'API par un endpoint approprié. Aucun nom de service, de port, de dossier, d'image ni de langage n'est imposé. Les paramètres de configuration (identifiants de base, par exemple) doivent être factices et documentés dans le README ; aucun secret réel n'est versionné.

Le fichier Compose, les sources et le README sont publiés sur un dépôt GitHub public. Le TP Docker précédent peut servir de base pour le front, sans obligation. Les attendus de remise suivent.

Ne pas fournir de solution ni de recette : les étudiants mobilisent la partie Compose du cours.

Transition : lancer la mise en pratique.
-->

---
layout: exercise
duration: 15 min
type: solo
---

# Mise en pratique — démarrez votre TP

<div class="grid grid-cols-3 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-1">🎯 1. Choisir</div>
    <div class="text-sm">Votre technologie, la structure du projet, et par quel TP vous commencez</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🚀 2. Obtenir un premier résultat</div>
    <div class="text-sm">Une application qui répond, ou un premier essai de construction d'image</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">📌 3. Noter les blocages</div>
    <div class="text-sm">Ce qui coince : à résoudre ensuite, hors séance, ou à poser avant la fin</div>
  </div>
</div>

<div class="card-accent text-sm mt-4">⏭️ La suite se fait <strong>hors séance</strong> ; les deux TP sont à rendre <strong>avant la séance 3</strong>.</div>

<!--
Durée : 15 min.

Temps de démarrage encadré, pas d'objectif d'achèvement : le travail se finalise hors cours, ce qui est explicitement autorisé. Circuler, aider à débloquer l'environnement (Docker opérationnel, accès réseau, authentification GitHub), et renvoyer les étudiants à la documentation et aux slides plutôt qu'à une solution toute faite.

Si Docker ou les registres sont inaccessibles (réseau de la salle), poursuivre la conception et le code applicatif et reporter les builds à la maison. Si l'authentification GitHub bloque, versionner en local et publier plus tard : seule la remise avant la séance 3 compte.

Modalités individuelles ou en binôme à confirmer avec l'enseignant ; dans tous les cas, les auteurs doivent être identifiables dans le dépôt rendu.

Transition : rappel des attendus de remise.
-->

---

# Remise des TP — attendus avant la séance 3

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-2">📦 À remettre</div>

- L'**URL de chaque dépôt GitHub public** (un ou plusieurs dépôts)
- Des travaux **identifiables** : TP Docker et TP Compose distincts
- Un **README** par TP : description, lancement, tests
- Les **preuves de fonctionnement** : captures ou sorties de commandes

</div>
</div>

<!--
Durée : 2 min.

Récapituler les attendus : les deux TP sont rendus AVANT la séance 3, pour correction. Un ou plusieurs dépôts GitHub publics au choix, à condition que le TP Docker et le TP Compose soient clairement identifiables. Chaque TP s'accompagne d'un README qui explique comment lancer, comment tester et ce qui prouve le fonctionnement (sorties de commandes, captures).

Pour le TP Docker : sources, Dockerfile multi-stage et README. Pour le TP Compose : fichier Compose, sources des services et README. Les preuves incluent la communication entre services demandée dans l'énoncé.

Sécurité : dépôt public, donc aucune donnée sensible ; les identifiants d'exemple sont factices et expliqués. Aucune image n'est à publier dans un registre et aucun déploiement cloud n'est demandé.

Le canal de remise des URL (plateforme, courriel...) est précisé par l'enseignant. En cas de difficulté, prévenir avant la date limite plutôt qu'après.

Transition : lancer le QCM de clôture de la séance 2.
-->

---
layout: qcm
duration: 20 min
questions: 30
cover: DevOps et métiers, Git, Infrastructure as Code et GitOps, Docker et images, Compose, CNCF et Kubernetes
---

# QCM de clôture — Séance 2

<!--
Durée : 20 min (lancement 2 min, jeu 15 min, débrief 3 min) pour 30 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 30 questions de la section « Séance 2 » de `qcm-kahoot.md` (temps proposé par question indiqué dans la banque), puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : objectif individuel de vérification des acquis, pas une compétition à forte pression ; signaler explicitement les questions à réponses multiples ; laisser de la marge sur le temps par question pour absorber une connexion lente en salle.

Transition : débriefer collectivement les 2-3 questions les plus ratées, rappeler la date de remise des deux TP (avant la séance 3), puis annoncer la séance 3 — CI/CD avec GitHub Actions et GitLab CI.
-->
