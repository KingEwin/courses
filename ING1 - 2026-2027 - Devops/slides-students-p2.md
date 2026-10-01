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
presenter: false # disable presenter mode
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

De la culture aux premières images exécutables

<!--
Durée : 1 min.

Annoncer le fil de la séance : d'abord la culture DevOps et son histoire, puis Git en équipe, puis Docker, puis un premier pas dans l'écosystème cloud-native avec la CNCF et une introduction à Kubernetes.

Exemple concret : rappeler le fil rouge — l'application Node.js va être versionnée avec Git puis conteneurisée avec Docker dans cette séance.

Transition : retour rapide sur la séance 1.
-->

---

# Retour sur la séance 1

<v-clicks>

- Réseau : couches, IP, DNS, routage — acquis ?
- Cloud : IaaS/PaaS/SaaS/serverless — un exemple retenu ?
- Haute disponibilité — qu'avez-vous observé sur un service que vous utilisez ?

</v-clicks>

<!--
Durée : 2 min (dont ~1 min de tour de table).

Tour de table rapide sur la consigne interséance (observation de haute disponibilité sur un service utilisé). Objectif : réactiver les acquis avant d'enchaîner.

Exemple concret attendu des étudiants : "l'appli de ma banque affiche une page de maintenance par zone", "mon jeu en ligne a un statut serveur public".

Tour de table complet : donner la parole à 4-5 étudiants successivement (pas seulement les volontaires spontanés) pour maximiser la diversité des exemples et vérifier que la consigne a été comprise par l'ensemble du groupe.

Transition : rappeler le scénario applicatif du fil rouge avant d'attaquer le DevOps.
-->

---

# Le scénario applicatif du fil rouge

<v-clicks>

- Une application web **Node.js minimale** : une page, un endpoint de contrôle
- Elle sera **versionnée** avec Git (cette séance)
- Elle sera **conteneurisée** avec Docker (cette séance)
- Elle sera **validée par un pipeline** (séance 3) puis **sécurisée et supervisée** (séance 4)
- Le TP de la séance 2 est **votre propre frontend** (Angular, React ou Vue), un projet autonome distinct du fil rouge

</v-clicks>

<!--
Durée : 3 min.

Ce rappel évite que les étudiants perçoivent Git, Docker et CI/CD comme des blocs isolés — c'est une seule chaîne, appliquée au même projet du début à la fin.

Exemple concret : montrer la structure attendue du dépôt final (code, tests, Dockerfile, fichier de pipeline) pour donner un repère visuel stable.

Vérification rapide : demander qui a déjà cloné le dépôt fil rouge et lancé l'application localement — traiter en direct les deux ou trois blocages d'environnement les plus fréquents avant de continuer.

Support distinct : le TP de la séance 2 est le propre frontend de l'étudiant (Angular, React ou Vue, au choix), créé en séance dans le dossier imposé `frontend/`, conteneurisé puis versionné sur son dépôt GitHub public. Aucun starter n'est fourni. L'application Node.js/API reste le fil rouge (démos Node sur le port 3000, séances 3 et 4, CI). La séance 3 ne réutilise pas le Dockerfile frontend ; ne pas le promettre. Il n'existe pas de frontend dans ce dépôt de slides.

Transition : entrer dans l'histoire du DevOps.
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
Durée : 3 min.

Poser le problème avant la solution : sans culture partagée, chaque livraison devient un conflit d'intérêt entre celui qui code et celui qui exploite.

Exemple concret : une mise en production qui casse un vendredi soir, le développeur injoignable, l'équipe d'exploitation seule pour gérer l'incident — schéma classique pré-DevOps.

Transition : introduire le mouvement DevOps comme réponse à ce silo.
-->

---

# Le besoin : vitesse ET fiabilité

<v-clicks>

- Le marché exige des livraisons **plus fréquentes**
- Le service doit rester **fiable** malgré la fréquence des changements
- Solution : rapprocher développement et exploitation autour d'objectifs communs
- Les leviers : **cloud**, **conteneurs**, **automatisation**, **CI/CD**, **observabilité**

</v-clicks>

<!--
Durée : 3 min.

DevOps n'est pas né d'une mode mais d'une contrainte business réelle : livrer plus vite sans casser la production. Les 5 leviers cités seront chacun développés dans les séances suivantes.

Exemple concret : une équipe qui déployait une fois par trimestre avant, plusieurs fois par jour après adoption de pratiques DevOps — pas une promesse marketing, une conséquence mesurable de l'automatisation.

Transition : préciser que DevOps ne remplace pas la responsabilité, il la partage.
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

Nuance importante à verbaliser : "responsabilité partagée" ne veut pas dire "personne n'est responsable" — c'est l'inverse, chacun reste responsable mais sur un objectif commun.

Exemple concret : un développeur qui ajoute un healthcheck à son service facilite le travail de l'équipe d'exploitation — petit geste, grand effet sur la fiabilité partagée.

Transition : montrer comment ces pratiques ont évolué dans les métiers, sans figer un intitulé universel.
-->

---

# Une évolution des métiers, pas un poste unique

<v-clicks>

- Des pratiques associées à des intitulés variés selon les organisations (ingénieur plateforme, SRE, ingénieur DevOps...)
- Aucun intitulé n'est une norme universelle — le contexte de l'entreprise prime
- Ce qui compte : les **pratiques** (automatisation, mesure, collaboration), pas l'étiquette du poste

</v-clicks>

<!--
Durée : 2 min.

Éviter tout discours prescriptif sur "le" métier DevOps : insister sur la diversité des organisations et des appellations selon les entreprises et les pays.

Exemple concret : deux entreprises comparables peuvent appeler la même fonction "DevOps Engineer" et "Site Reliability Engineer" sans différence pratique majeure — l'intitulé suit la culture de l'entreprise, pas une règle figée.

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

# Git en équipe : au-delà du solo

<v-clicks>

- Les commandes de base (`add`, `commit`, `push`) sont acquises
- En équipe, il faut des **conventions partagées**
- **Branches**, **pull/merge requests**, **revue de code** structurent la collaboration

</v-clicks>

<!--
Durée : 3 min.

Vérifier rapidement les acquis : lever la main qui utilise déjà des branches régulièrement. Adapter le rythme selon la réponse de la salle.

Exemple concret : une équipe qui travaille tous sur `main` sans branche finit par écraser le travail des autres — bon point de départ pour justifier le besoin de convention.

Prolonger l'échange : demander à un étudiant de raconter un conflit de fusion (merge conflict) déjà vécu, en stage ou en projet — sert d'accroche concrète avant de détailler dépôt/commit/branche.

Transition : détailler dépôt, commit, branche et merge/pull request.
-->

---

# Dépôt, commit, branche

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
Durée : 3 min (dont ~1 min de démonstration live).

Insister sur "atomique" : un commit doit correspondre à un changement logique cohérent, pas à un mélange de plusieurs sujets non liés.

Exemple concret : un commit "fix typo + ajoute feature X + change la config CI" est un anti-pattern — trois commits séparés seraient plus lisibles et plus faciles à annuler individuellement si besoin.

Démonstration live : créer une branche, faire deux commits atomiques distincts sur le dépôt fil rouge, puis lancer `git log --oneline --graph` devant la salle pour montrer un historique lisible. Pointer chaque commit et faire deviner son objet avant de l'ouvrir.

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

```text
feat: add health-check endpoint
fix: handle missing environment variable
docs: update README with run instructions
```

<v-clicks>

- Un commit = **un changement logique**, un message clair
- Préfixe sémantique (`feat`, `fix`, `docs`...) → historique navigable
- Historique lisible = diagnostic plus rapide en cas d'incident

</v-clicks>

<!--
Durée : 4 min (dont ~2 min d'exercice écrit).

Ce format de message n'est pas obligatoire par Git lui-même, mais devient vite un standard d'équipe efficace, notamment pour retrouver rapidement quel commit a introduit un bug.

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
Durée : 3 min (dont ~1 min de questions-réponses).

Poser la question à la salle : "renommer un endpoint d'API, c'est quel type de changement ?" — réponse attendue : MAJOR (breaking change).

Exemple concret : un client qui consomme une API et valide strictement le format de réponse verra son intégration casser si un champ obligatoire est ajouté sans bump MAJOR — impact direct sur la confiance du versionnage.

Prolonger avec 2-3 cas supplémentaires à la volée (ajouter un champ optionnel, corriger un bug sans changer l'API, changer le format d'une date en réponse) et faire trancher la salle à main levée avant de donner la réponse — consolide la compréhension MAJOR/MINOR/PATCH avant de basculer sur l'Infrastructure as Code.

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
Durée : 3 min.

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
Durée : 3 min.

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
Terraform et ses alternatives **provisionnent** des ressources (créer une VM, un réseau) ; un outil comme Ansible **configure** ensuite ce qui tourne dessus (installer, paramétrer). Les deux rôles sont complémentaires, pas concurrents.
</Tip>

<!--
Durée : 3 min.

Terraform reste l'outil dominant et multi-cloud : un seul langage pour AWS, Azure, GCP et bien d'autres providers, y compris VMware pour du hors-cloud. Les alternatives sont positionnées sans être détaillées : OpenTofu est un fork open source né après un changement de licence de Terraform ; Pulumi permet d'écrire l'infra dans un langage de programmation classique (Python, TypeScript) plutôt qu'un langage déclaratif dédié ; CloudFormation (AWS) et Bicep (Azure) sont les équivalents propriétaires liés à un seul fournisseur.

Exemple concret : une entreprise avec des serveurs VMware en interne ET des ressources AWS peut utiliser Terraform pour les deux, avec un provider différent pour chaque cible — un seul outil, deux terrains.

Transition : voir le cycle Terraform en pratique, sans compte cloud, avec une ressource locale, puis retour à Docker.
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
Durée : 3 min.

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
N'utilisez pas `-auto-approve` en apprentissage : il supprime la relecture, c'est-à-dire le garde-fou principal de Terraform.
</Tip>

<style scoped>
.slidev-code { font-size: 0.8em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 6 min (dont ~3 min de démonstration enseignant).

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
Durée : 2 min.

Rappel du lien avec la slide précédente sur le fichier d'état (state) : il sert de mémoire à Terraform mais peut contenir des secrets en clair, donc jamais dans Git. En équipe, on le stocke dans un backend distant protégé — hors périmètre du module.

Exemple concret : deux étudiants qui clonent le dépôt obtiennent les mêmes versions de provider grâce au fichier `.terraform.lock.hcl` commité ; sans lui, chacun pourrait télécharger une version différente.

Vérification rapide : demander de proposer les lignes du `.gitignore` Terraform (`.terraform/`, `*.tfstate`, `*.tfstate.*`, `tfplan`) avant de les afficher.

Transition : retour à Docker — VM versus conteneur.
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
Durée : 4 min (dont ~2 min de discussion comparée).

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
Durée : 3 min (dont ~1 min de manipulation guidée ; 1 min regagnée pour financer le TP frontend, aucune notion supprimée).

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
Durée : 6 min (démonstration live resserrée ; 2 min regagnées pour financer le TP frontend : un seul étudiant au clavier, aucune notion supprimée).

Dérouler chaque instruction : image de base, répertoire de travail, copie ciblée des fichiers de dépendances avant le reste du code (pour préserver le cache), exposition documentaire du port, commande de démarrage.

Exemple concret : si le code applicatif change mais pas `package.json`, l'étape `npm ci` n'est pas rejouée — gain de temps de build significatif sur un projet qui grossit.

Démonstration live pas à pas (bloc le plus dense de la séance, prévoir le temps complet) : écrire ce Dockerfile ligne par ligne devant la salle sur le dépôt fil rouge, en commentant chaque choix ; lancer `docker build` et montrer les couches se construire une par une dans le terminal ; lancer `docker run` avec la publication du port, puis vérifier l'endpoint exposé avec `curl localhost:3000` ou dans le navigateur ; enfin modifier une ligne du code applicatif et relancer un build pour observer le cache en action sur les couches inchangées. Faire venir un étudiant au clavier pour reproduire une étape en conditions réelles avant de conclure.

Transition : récapituler les commandes qui accompagnent ce Dockerfile au quotidien.
-->

---

# Docker — le cycle de commandes

```bash
docker build -t devops-web:1.0 ./frontend            # construit l'image
docker run -d --name web -p 8080:80 devops-web:1.0   # lance un conteneur
docker ps                                           # conteneurs actifs
docker logs -f web                                  # suit les logs (Ctrl+C)
docker exec -it web sh                              # shell dans le conteneur
docker stop web && docker rm web                    # arrête puis supprime
docker images                                       # images locales
```

<v-clicks>

- **Image** : `build`, `images` — **conteneur** : `run`, `ps`, `logs`, `exec`, `stop`, `rm`
- `-p 8080:80` : port de l'**hôte** : port du **conteneur**
- `stop` n'efface pas le conteneur : `rm` est nécessaire pour libérer le nom

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.68em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 3 min (1 min regagnée pour financer le TP frontend, aucune notion supprimée).

Regrouper en deux familles pour la mémorisation : commandes sur l'image, commandes sur le conteneur. Distinguer `docker ps` (actifs) de `docker ps -a` (tous, y compris arrêtés).

Exemple concret : lancer deux fois `docker run --name web` provoque une erreur de nom déjà utilisé — d'où `stop` puis `rm`, ou l'option `--rm` pour les essais jetables.

Cohérence des supports : cette slide utilise `./frontend` et le port 8080 (support du TP frontend, pas le fil rouge). Les démos précédentes sur l'application Node.js utilisaient le port 3000 ; ne pas mélanger les deux exemples.

Rappel de sécurité : ne jamais passer de secret en clair dans une commande partagée ; le TP qui suit n'en utilise aucun et publie sur un dépôt public.

Transition : pause de 20 minutes, puis bonnes pratiques Docker.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Répondre aux questions individuelles sur Git ou Docker pendant la pause.

Transition au retour : bonnes pratiques Docker (cache, .dockerignore, utilisateur non privilégié, multi-stage).
-->

---

# Ordonner les couches intelligemment

```dockerfile
# Moins optimal — tout invalidé au moindre changement de code
COPY . .
RUN npm ci

# Préférable — le cache npm ci survit aux changements de code
COPY package*.json ./
RUN npm ci
COPY . .
```

<v-clicks>

- Les instructions **les moins susceptibles de changer** en premier
- Le cache de build accélère radicalement les reconstructions
- Un changement de code ne doit pas invalider l'installation des dépendances

</v-clicks>

<!--
Durée : 2 min (comparaison chronométrée à commenter rapidement ou à montrer en une seule exécution ; 1 min regagnée pour financer le TP frontend).

Ce pattern d'ordre des couches est LE réflexe à ancrer chez les étudiants — il a un impact direct et mesurable sur la vitesse de build en local et en CI.

Exemple concret : un changement d'une ligne dans le code applicatif peut faire passer un rebuild de 2 minutes à 2 secondes, simplement grâce à cet ordre.

Comparaison chronométrée : relancer un build avec l'ordre "moins optimal" puis avec l'ordre "préférable" sur le même changement de code, chronomètre à l'appui, pour rendre visible et mesurable le gain de cache devant la salle.

Transition : présenter .dockerignore et l'utilisateur non privilégié.
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
Durée : 2 min (vérification pratique brève, le `.dockerignore` est pratiqué ensuite dans le TP frontend ; 1 min regagnée pour financer le TP).

Deux bonnes pratiques de sécurité et de propreté à traiter ensemble : elles sont souvent oubliées par des débutants, avec un vrai coût en sécurité et en taille d'image.

Exemple concret : un `.env` copié dans l'image reste présent dans les couches même s'il est supprimé plus tard dans le Dockerfile — d'où l'importance de ne jamais le copier du tout.

Vérification pratique : construire l'image sans puis avec `.dockerignore`, comparer la taille avec `docker images`, puis, seulement si le Dockerfile de l'image contient bien `USER node`, lancer `docker exec <conteneur> whoami` : la valeur attendue est `node`.

Transition : introduire le multi-stage build pour réduire drastiquement la taille finale.
-->

---

# Multi-stage build

```dockerfile {all|1-6|8-12|all}
# --- Stage 1 : construction ---
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# --- Stage 2 : exécution ---
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

<v-clicks>

- **Stage de construction** — image lourde avec tout l'outillage
- **Stage d'exécution** — image minimale, ne contient que le nécessaire
- Résultat final = uniquement le **dernier stage**

</v-clicks>

<!--
Durée : 3 min (dont ~1 min de comparaison de tailles ; 1 min regagnée pour financer le TP frontend).

L'idée clé : on n'a pas besoin des outils de build en production, seulement du résultat compilé/installé. Le multi-stage sépare proprement les deux mondes.

Exemple concret : gain typique de x5 à x10 en taille d'image finale entre une version naïve et une version multi-stage optimisée avec une base alpine.

Comparaison rapide : afficher côte à côte la taille de l'image mono-stage construite plus tôt et celle du multi-stage via `docker images`, pour rendre le gain concret et chiffré.

Transition : appliquer le même principe à un frontend, où la différence de taille est encore plus nette.
-->

---

# Frontend : build statique → Nginx

```dockerfile {all|1-6|8-11|all}
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.28-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=2s --retries=3 CMD wget -q --spider http://127.0.0.1/ || exit 1
```

<v-clicks>

- **Stage build** : Node produit les fichiers statiques ; **image runtime** : Nginx seul
- **React/Vue (Vite)** : sortie `dist` ; **Angular** : `dist/<nom>/browser`
- Angular : adapter la copie → `/app/dist/<nom>/browser`

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.65em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 2 min (1 min regagnée pour financer le TP frontend).

Dockerfile de référence à lire avant le TP, où les étudiants écrivent le leur pour leur propre frontend (Angular, React ou Vue). Le Node du Dockerfile sert uniquement à construire dans Docker ; le poste de l'étudiant a aussi Node 22 LTS ou bun pour générer le projet et contrôler le build local.

Lire en deux temps : le premier stage lance `npm ci` (reproductible grâce à `package-lock.json`) puis `npm run build`. Le second repart de Nginx et ne copie que la sortie statique vers `/usr/share/nginx/html`. Node et `node_modules` ne sont pas dans l'image finale : image plus petite, surface d'attaque réduite.

Dossier de sortie : Vite (React et Vue) produit `dist` ; Angular produit `dist/<nom>/browser` (`<nom>` = nom du projet, `frontend` avec `ng new frontend`). Pour Angular, remplacer la ligne de copie par `COPY --from=build /app/dist/<nom>/browser /usr/share/nginx/html`. Toujours vérifier le dossier réel après `npm run build` (le dossier réel dépend du projet et de la version de l'outil).

Healthcheck : `wget -q --spider` vérifie que Nginx répond en HTTP sans télécharger le contenu ; intervalle de 10 s pour voir `healthy` rapidement. Il est facultatif dans le TP.

Note SPA : une application à routes côté client (ex. `/profil`) renvoie 404 au rechargement car Nginx cherche un fichier ; il faut une configuration Nginx de repli vers `index.html` (`try_files`). On la mentionne sans la détailler.

Transition : un conteneur est jetable ; voir comment conserver des données avec les volumes avant de passer à Compose.
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
Le contenu d'un conteneur disparaît avec lui ; seul un volume (ou un bind mount) survit à `docker rm`.
</Tip>

<!--
Durée : 3 min (dont ~1 min de démonstration ; 1 min regagnée pour financer le TP frontend, volumes conservés comme notion générale).

Message clé : le système de fichiers d'un conteneur est éphémère. Pour persister, on monte soit un volume géré par Docker (nommé), soit un dossier de l'hôte (bind mount).

Démonstration enseignant : `docker volume create demo-data`, lancer un conteneur `alpine` qui écrit un fichier dans le volume (`docker run --rm -v demo-data:/data alpine sh -c "echo bonjour > /data/note.txt"`), puis un second conteneur qui lit ce fichier (`docker run --rm -v demo-data:/data alpine cat /data/note.txt`) : la donnée survit à deux conteneurs supprimés. Nettoyer ensuite avec `docker volume rm demo-data`. Variante bind mount : monter un dossier local `site/` en lecture seule dans `nginx:alpine` et modifier la page sans reconstruire d'image.

Exemple concret : une base PostgreSQL sans volume perd toutes ses données au `docker rm` ; un bind mount est pratique pour le développement mais dépend du chemin de la machine, donc peu portable.

Transition : Compose décrit plusieurs services et leur réseau dans un seul fichier ; les volumes déclarés au même endroit relèvent de la notion générale vue ici.
-->

---

# Docker Compose — plusieurs services, un fichier

`compose.yaml`

```yaml
name: devops-lab

services:
  web:
    build: ./frontend
    image: devops-web:1.0
    ports:
      - "8080:80"
    depends_on:
      - backend

  backend:
    image: traefik/whoami:v1.11.0
```

<v-clicks>

- **`web`** : construit depuis `./frontend` et publié sur l'hôte (**8080**)
- **`backend`** : image open source `traefik/whoami`, sans `ports:` donc **non publié** sur l'hôte
- `depends_on` règle seulement l'**ordre de démarrage**, pas la disponibilité

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.3 !important; }
</style>

<!--
Durée : 3 min.

Compose décrit une stack multi-conteneurs de façon déclarative : un fichier versionné, une commande pour démarrer et arrêter. `name: devops-lab` fixe le nom du projet, donc le réseau s'appellera `devops-lab_default` quel que soit le dossier de travail.

Exemple concret : sans Compose, il faudrait créer un réseau puis enchaîner deux `docker run` dans le bon ordre ; ici tout tient dans ce fichier.

Points à pointer : `build: ./frontend` réutilise le Dockerfile du TP (compose.yaml placé dans le dossier parent de `frontend/`) et `image: devops-web:1.0` donne à l'image construite le même nom que précédemment. `web` est le seul service publié (`8080:80`). `backend` utilise `traefik/whoami` en tag explicite `v1.11.0` (tag vérifié sur Docker Hub, jamais `latest`) : un petit serveur HTTP open source qui répond avec le nom et l'IP de son conteneur, écoute sur le port 80 et n'a pas de `ports:`.

Précision importante : `depends_on` simple ne garantit que l'ordre de démarrage des conteneurs, pas qu'un service soit prêt ; `whoami` n'a pas de healthcheck dans ce parcours, donc on ne parle pas de `service_healthy`. Le frontend n'appelle pas fonctionnellement `backend` : c'est un exercice de connectivité et de DNS, pas une vraie application à deux niveaux.

Transition : voir comment `web` trouve `backend` sans connaître son IP.
-->

---

# Réseau Compose : DNS par nom de service

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  H["Hôte<br/>localhost:8080"] -->|"8080 → 80"| W
  subgraph N["Réseau devops-lab_default"]
    W["web<br/>Nginx :80"] -->|"http://backend:80"| B["backend<br/>whoami :80"]
  end
```

<v-clicks>

- Compose crée le réseau **`devops-lab_default`** et y attache les deux services
- Le DNS interne résout le **nom du service** (`backend`) vers l'IP de son conteneur
- Port **80** = port interne du conteneur ; **8080** = port publié sur l'hôte
- Entre services, on utilise le port interne ; `backend` n'est pas joignable depuis l'hôte

</v-clicks>

<Tip type="info">
Les volumes restent une notion à part : ils persistent des données, ils ne servent pas à faire communiquer les services.
</Tip>

<!--
Durée : 3 min.

Lire le schéma de gauche à droite : seul `web` est atteint depuis l'hôte via 8080 vers 80. À l'intérieur du réseau `devops-lab_default`, `web` joint `backend` par son nom et par le port interne 80. Ne pas confondre : `8080` n'existe que sur l'hôte ; entre conteneurs, aucun mapping de port n'est nécessaire.

Les IP des conteneurs changent à chaque recréation : c'est pourquoi on utilise le nom du service, résolu par le DNS intégré de Docker. Même idée que le nom DNS de Service en Kubernetes, vu juste après.

Rappel court sur les volumes : ils sont traités dans la slide dédiée précédente (volume nommé vs bind mount) ; aucun volume, aucune variable d'environnement ni secret dans ce parcours Compose.

Transition : les commandes Compose du quotidien, puis le TP frontend.
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
`down -v` supprime aussi les volumes déclarés dans le fichier : à réserver aux environnements jetables.
</Tip>

<style scoped>
.slidev-code { font-size: 0.8em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 3 min (dont ~1 min de démonstration).

Montrer le cycle complet : `up -d --build`, `ps`, `logs -f web` (Ctrl+C pour quitter), `exec web sh` pour entrer dans un service, puis `down`, qui supprime conteneurs et réseau.

Distinction à retenir : `down` supprime conteneurs et réseau mais conserve les volumes nommés ; `down -v` les efface aussi. Notre stack d'exemple n'en déclare aucun, mais le réflexe doit être pris.

Exemple concret : un `down -v` lancé par réflexe sur une stack de préproduction efface ses données ; on vérifie toujours l'option `-v` avant de valider.

Transition : le TP frontend de la séance, du projet vide jusqu'au dépôt GitHub public.
-->

---

# TP — Votre frontend conteneurisé : feuille de route

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A["1. Init<br/>frontend/"] --> B["2. Build local"] --> C["3. Dockerfile"] --> D["4. Run<br/>8080:80"] --> E["5. GitHub<br/>public"]
```

<v-clicks>

- Dossier imposé : **`frontend/`** ; framework au choix : **Angular, React ou Vue**
- Image : **`devops-web:1.0`** ; conteneur : **`web`** ; port **8080 → 80**
- Preuve 1 : l'**URL publique** de votre dépôt GitHub
- Preuve 2 : `docker image ls devops-web:1.0` (image **locale**)

</v-clicks>

<!--
Durée : 3 min.

Cadrer le TP : c'est le propre frontend de l'étudiant, créé de zéro avec npm ou bun, sans starter fourni, et indépendant du fil rouge Node.js/API (port 3000) qui revient en séances 3 et 4. Les cinq étapes se suivent ; chaque étape a un contrôle visible. Binômes autorisés, mais chacun pousse son propre dépôt.

Budget indicatif du TP obligatoire : 31 min au total = feuille de route 3 + initialisation 6 + installation/build 4 + Dockerfile 5 + build/run/contrôle 5 + dépôt GitHub 6 + checkpoint 2. Le Compose est un bonus non chronométré (0 min dans le budget).

Coupes de repli à annoncer dès maintenant :
- À T+15 min (fin de la partie Dockerfile) : un étudiant sans projet qui build encore passe en mode copier-coller du Dockerfile projeté ; le bonus Compose est abandonné.
- Réseau coupé ou registres inaccessibles (npm, Docker Hub) : démonstration enseignant de 6 min sur un frontend préparé (build, run, `curl -I`, `docker image ls`), les étudiants suivent et reprennent le TP à la maison.
- Push reporté : si l'authentification GitHub bloque, commit local validé en séance (`git log`), push et URL publique à rendre avant la prochaine séance.
Pause et QCM jamais réduits.

Transition : étape 1, créer le projet.
-->

---

# TP 1/6 — Créer le projet dans `frontend/`

| Framework | npm | bun |
|---|---|---|
| **Angular** | `npm create @angular@latest frontend` | `bunx @angular/cli new frontend --package-manager bun` |
| **React** | `npm create vite@latest frontend -- --template react` | `bun create vite frontend --template react` |
| **Vue** | `npm create vue@latest frontend` | `bun create vue frontend` |

<v-clicks>

- **Angular** : Node reste requis, même avec bun ; répondre **non** à SSR/SSG
- **React / Vue** : options facultatives → **non**
- Ensuite : `cd frontend`

</v-clicks>

<style scoped>
table { font-size: 0.78em; }
</style>

<!--
Durée : 6 min (dont ~4 min de manipulation en autonomie).

Choisir UNE ligne (un framework) et UNE colonne (npm ou bun). Le dossier doit s'appeler `frontend`, pour que toutes les commandes suivantes soient identiques pour toute la salle.

Angular : même avec `bunx`, Angular CLI s'exécute sur Node, donc Node 22 LTS doit être installé. Aux questions SSR/SSG (rendu serveur / prérendu), répondre non : un site statique suffit pour Nginx. Les autres questions (style, etc.) : valeurs par défaut. Angular CLI initialise aussi un dépôt Git et un premier commit dans `frontend/` ; ce n'est pas gênant pour l'étape GitHub.

React / Vue : les assistants proposent des options facultatives (TypeScript, routeur, tests, lint, démarrage immédiat, etc.) : répondre non, ou valeur la plus simple. Aucun framework n'est plus « juste » qu'un autre pour ce TP.

Les commandes de génération sont celles documentées par les outils au moment de la rédaction ; les assistants évoluent, donc les questions posées peuvent légèrement varier. Vérifier avant la séance sur un poste de test (non exécuté lors de la rédaction de ces slides).

Erreurs fréquentes : mauvais dossier (le dossier ne s'appelle pas `frontend`), version de Node trop ancienne, proxy ou réseau bloquant npm.

Transition : installer les dépendances et construire en local.
-->

---

# TP 2/6 — Installer et construire en local

<div class="grid grid-cols-2 gap-4">
<div>

**npm**

```bash
cd frontend
npm install
npm run build
```

</div>
<div>

**bun**

```bash
cd frontend
bun install
bun run build
```

</div>
</div>

Contrôler la sortie statique :

```bash
ls dist            # React / Vue (Vite)
ls dist/*/browser  # Angular
```

<v-clicks>

- Un dossier avec **`index.html`** doit exister
- Notez le chemin exact : il servira au `Dockerfile`

</v-clicks>

<!--
Durée : 4 min.

`install` récupère les dépendances ; `build` produit les fichiers statiques. Ce contrôle local évite de découvrir une erreur de code au milieu d'un build Docker plus lent.

React et Vue (Vite) : sortie dans `dist`. Angular : `dist/<nom>/browser` (avec `ng new frontend`, `dist/frontend/browser`). Dans le doute, `ls dist` puis explorer. Si le nom du dossier diffère, c'est ce chemin qu'il faudra copier dans le Dockerfile.

Erreurs fréquentes : commande lancée hors de `frontend/` ; version de Node insuffisante ; avertissements de budget Angular (sans gravité pour le TP) ; dépendances inaccessibles faute de réseau.

Transition : écrire le Dockerfile qui reproduit ce build dans Docker.
-->

---

# TP 3/6 — Dockerfile et `.dockerignore`

<div class="grid grid-cols-2 gap-4">
<div>

```dockerfile
# frontend/Dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:1.28-alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

</div>
<div>

```text
# frontend/.dockerignore
node_modules
dist
.git
.env
```

</div>
</div>

<v-clicks>

- **Angular** : copier `/app/dist/<nom>/browser`
- **bun** : `npm ci` exige un `package-lock.json` → `npm install --package-lock-only`

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 5 min (dont ~4 min d'écriture ; modèle : slide « Frontend : build statique → Nginx »).

Les étudiants écrivent eux-mêmes `frontend/Dockerfile` et `frontend/.dockerignore`. `EXPOSE 80` et le healthcheck de la slide modèle sont facultatifs dans ce TP : les ajouter si le temps le permet.

Angular : remplacer la ligne de copie par `COPY --from=build /app/dist/<nom>/browser /usr/share/nginx/html`, `<nom>` étant le dossier constaté à l'étape précédente.

Note bun : le Dockerfile pédagogique utilise `npm ci`, qui exige `package-lock.json` synchronisé avec `package.json`. Un projet initialisé avec bun a un `bun.lock`, pas de `package-lock.json` : générer le fichier avec `npm install --package-lock-only`, sans toucher à `node_modules`, puis le versionner. Sinon `npm ci` échoue.

`.dockerignore` : exclut `node_modules` (build plus rapide, pas de dépendances de l'hôte copiées), `dist`, `.git` et surtout `.env` (jamais de secret copié dans une couche d'image).

Erreurs fréquentes : mauvais chemin de copie (Nginx affiche alors sa page par défaut ou 403/404) ; `npm ci` en échec (lockfile absent) ; fichiers créés au mauvais endroit (hors `frontend/`).

Coupe de repli : à T+15 min, Dockerfile projeté en copier-coller.

Transition : construire l'image, la lancer et la contrôler.
-->

---

# TP 4/6 — Construire, lancer, contrôler

```bash
docker build -t devops-web:1.0 .
docker run -d --name web -p 8080:80 devops-web:1.0
curl -I localhost:8080
docker ps
docker image ls devops-web:1.0
docker stop web && docker rm web
```

<v-clicks>

- Dans `frontend/`, le `.` final de `docker build` est le **contexte**
- `curl -I` doit répondre **`200 OK`** ; `http://localhost:8080` dans le navigateur
- `-p 8080:80` : port **hôte** 8080 → port **conteneur** 80
- Gardez l'**image** (preuve) ; supprimez le **conteneur**

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.75em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 5 min (dont ~4 min de manipulation ; le premier build est le plus long).

Déroulé : build, run, `curl -I`, navigateur, `docker ps` (état `healthy` après ~10 s si le healthcheck a été ajouté), `docker image ls devops-web:1.0` (taille, preuve locale), puis nettoyage du conteneur. L'image reste pour le checkpoint.

Contrôle optionnel du runtime : `docker exec web sh -c 'command -v node || echo "node absent"'` (avant l'arrêt) montre que Nginx ne contient pas Node, donc image petite et surface réduite.

Erreurs fréquentes : port 8080 occupé (changer le côté hôte, ex. `8081:80`, et adapter `curl`) ; nom `web` déjà utilisé (oubli du `rm`) ; 403/404 (chemin de copie du build incorrect) ; build très lent sans `.dockerignore` ; 404 au rechargement d'une route côté client (SPA fallback, `try_files` Nginx, hors périmètre).

Coupe de repli : réseau coupé ou image Node indisponible → démonstration enseignant de 6 min (build, run, `curl -I`, `docker image ls`), reprise à la maison.

Transition : versionner ce projet sur le dépôt GitHub public.
-->

---

# TP 5/6 — Versionner sur GitHub (public)

<div class="grid grid-cols-2 gap-4">
<div>

```bash
echo ".env" >> .gitignore
git init
git status
git add .
git commit -m "chore: frontend conteneurisé"
git branch -M main
git remote add origin <URL>
git push -u origin main
```

</div>
<div>

- `git status` : ni `node_modules`, ni `dist`, ni `.env`
- Dépôt **public** : l'historique est visible par tous
- Secret poussé = **secret à révoquer**
- `<URL>` : l'URL de **votre** dépôt vide

</div>
</div>

<style scoped>
.slidev-code { font-size: 0.68em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 6 min (dont ~4 min de manipulation).

Commandes à lancer dans `frontend/`. Avant `git add .`, `git status` doit montrer le code source, `Dockerfile`, `.dockerignore`, `.gitignore` et le lockfile ; pas `node_modules`, `dist` ni `.env`. Les assistants Vite/Angular/Vue génèrent déjà un `.gitignore` ; la ligne `echo ".env"` garantit que `.env` est ignoré. Angular a déjà fait `git init` : `git init` est alors sans danger.

Message de commit au format Conventional Commits : `chore: frontend conteneurisé`. `git branch -M main` aligne le nom de branche sur GitHub ; `git remote add origin <URL>` relie le dépôt public vide créé avant la séance (sans README, sinon `push` rejeté).

Sécurité : le dépôt est public. Vérifier l'email Git (`git config user.email`, idéalement l'adresse noreply GitHub) et qu'aucun secret ni `.env` n'est suivi. Un secret poussé doit être considéré comme compromis : le révoquer, puis nettoyer l'historique ; supprimer le fichier dans un nouveau commit ne suffit pas.

Authentification : HTTPS avec token personnel ou SSH selon la configuration. Ne jamais coller de token dans une commande partagée ou dans l'URL du remote.

Coupe de repli (push reporté) : commit local validé par `git log --oneline`, push et URL publique à rendre avant la prochaine séance.

Transition : checkpoint des preuves.
-->

---

# TP 6/6 — Checkpoint : preuves et critères

<div class="grid grid-cols-2 gap-4">
<div>

## Preuves à montrer

- **URL publique** du dépôt, ouverte en navigation privée
- **Image locale** : `docker image ls devops-web:1.0`

</div>
<div>

## Critères de réussite

- Projet dans `frontend/`, build local OK
- `Dockerfile` + `.dockerignore` versionnés
- `localhost:8080` répond **200**
- Aucun `.env` ni secret, commit conventionnel

</div>
</div>

<!--
Durée : 2 min.

Tour rapide : chaque étudiant (ou binôme) montre l'URL publique ouverte en navigation privée, qui prouve que le dépôt est bien public et contient les fichiers attendus, et la sortie de `docker image ls devops-web:1.0`, preuve locale que l'image existe. L'image n'est pas publiée dans un registre dans ce TP.

Critères : projet dans `frontend/`, build local qui passe, Dockerfile et `.dockerignore` versionnés (avec `package-lock.json` pour `npm ci`), réponse 200 sur 8080 observée, pas de secret ni de `.env`, commit `chore: frontend conteneurisé` sur `main`.

Cas non terminés : push reporté (commit local prouvé par `git log`, URL à rendre avant la séance 3) ; build impossible faute de réseau (démonstration enseignant, reprise à la maison).

Rappel : ce frontend est distinct du fil rouge Node.js/API (port 3000) qui reprend en séance 3. La séance 3 ne réutilise pas ce Dockerfile frontend.

Transition : bonus Compose pour ceux qui ont terminé ; les autres passent directement à la CNCF.
-->

---

# Bonus (non chronométré) — Compose : web + whoami

Hors livrable obligatoire. `compose.yaml` dans le **dossier parent**, **hors dépôt `frontend/`**.

```bash
docker compose up -d --build
docker compose ps
curl -I localhost:8080
docker compose exec web wget -qO- http://backend
curl http://backend    # depuis l'hôte : échec attendu
docker compose down
```

<v-clicks>

- `ps` : `web` publié en `8080->80`, `backend` **sans port publié**
- `wget` depuis `web` : le nom `backend` est résolu par le DNS Compose
- Échec de `curl` depuis l'hôte : **normal**

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 0 min (bonus non chronométré, hors budget : seulement pour les étudiants qui ont terminé le checkpoint ; les autres passent à la suite sans interruption).

Prérequis : le `compose.yaml` de la slide Compose (`name: devops-lab`, `web` en `build: ./frontend` + `image: devops-web:1.0`, `backend` en `traefik/whoami:v1.11.0`), placé dans le dossier PARENT de `frontend/` et non dans le dépôt versionné : le dépôt public contient seulement le frontend. Le conteneur `web` du TP doit être supprimé, sinon le port 8080 est occupé. Terminal Bash/WSL.

Points à faire noter : le frontend n'appelle pas `backend` ; c'est un exercice de connectivité et de DNS. Seul `web` est publié ; entre services, on utilise le port interne 80, pas 8080. `depends_on` ne règle que l'ordre de démarrage.

Variantes pour les plus rapides : `docker compose exec web getent hosts backend`, `docker compose exec web hostname -i`, `docker network inspect devops-lab_default --format '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{"\n"}}{{end}}'`, et `docker compose exec web ping -c 2 backend` (peut être absent ou filtré ; la preuve de référence est `wget`). Alternative sans outil dans l'image : `docker run --rm --network devops-lab_default curlimages/curl -s http://backend`.

Erreurs fréquentes : Compose lancé hors du dossier contenant `compose.yaml` ; nom de réseau `<dossier>_default` si `name:` est absent ; `exec` lancé avant la fin du démarrage.

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
Durée : 2 min (échange court sur un projet connu ; 1 min regagnée pour financer le TP frontend).

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
Durée : 2 min.

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
Durée : 2 min (1 min regagnée pour financer le TP frontend ; lire le tableau, ne pas détailler le YAML).

Message central : liveness = « redémarre-moi si je suis bloqué » ; readiness = « ne m'envoie pas de trafic tant que je ne suis pas prêt ». Un Pod qui démarre lentement, ou qui perd temporairement sa dépendance, doit être NotReady, pas redémarré.

Le YAML est un extrait à lire, pas à écrire : exemple générique avec un endpoint `/health` sur le port 3000, sans lien avec le TP frontend. Dans la pratique, on règle aussi des délais et des seuils ; hors périmètre ici.

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
Durée : 3 min.

Lire le schéma : le client s'adresse toujours au Service (nom DNS et IP stables), jamais à un Pod, dont l'adresse change. Le Pod C NotReady est exclu tant que sa readiness échoue.

HA : avec un seul réplica ou un seul node, une panne coupe le service. Avec au moins 2 réplicas répartis sur 2 nodes, le Service continue vers le Pod restant. Un nouveau Pod remplaçant n'est servi qu'après sa readiness, donc sans envoyer de requêtes à un Pod pas prêt.

Nuance : un Service interne au cluster n'est pas un load balancer cloud externe ; l'exposition vers Internet relève d'autres objets ou du fournisseur cloud, hors périmètre de cette introduction.

Liens : health check/load balancer de la séance 1 ; et le nom DNS de service Compose (`web`, `backend`) vu plus tôt joue un rôle comparable, à l'échelle d'une seule machine.

Aucun cluster, aucun TP.

Transition : conclure sur les limites de cette introduction et faire la synthèse de séance.
-->

---
layout: recap
section: Séance 2 — DevOps, Git, Infrastructure as Code (1/3)
---

# Ce qu'il faut retenir — DevOps, Git, IaC

- **DevOps** : vitesse ET fiabilité, responsabilité partagée
- **Git en équipe** : branches, PR/MR, commits atomiques, SemVer
- **IaC** : déclaratif, plan, apply, idempotence
- **Terraform** : `fmt`, `init`, `validate`, `plan -out`, `apply`, `destroy`

<!--
Durée : 1 min.

Premier recap : la culture et l'automatisation de l'infrastructure. DevOps répond à un besoin de vitesse ET de fiabilité via cloud, conteneurs, automatisation, CI/CD et observabilité ; la responsabilité est partagée, sans intitulé de poste universel. Git en équipe : branches, PR/MR, revue, commits atomiques, SemVer. Terraform : l'état et `.terraform/` ne sont jamais versionnés. Faire reformuler à voix haute la différence entre `plan` et `apply`.

Transition : recap Docker, Compose et Git public.
-->

---
layout: recap
section: Séance 2 — Docker, Compose, Git public (2/3)
---

# Ce qu'il faut retenir — Docker, Compose, Git public

- **Docker** : image, couche, registre, conteneur ; `build`, `run`, `exec`
- **Frontend statique** : build Node, runtime **Nginx** (`dist` ou `dist/<nom>/browser`)
- **Compose** : `up -d --build`, DNS par nom de service, `web` publié seul
- **Git public** : `.gitignore` avec `.env` ; secret poussé = **révoqué**

<!--
Durée : 2 min.

Docker : image, couche, registre, conteneur ; cycle `build`/`run`/`logs`/`exec`/`stop`/`rm`. Multi-stage : build avec Node, runtime léger Nginx pour un frontend statique ; sortie `dist` pour Vite (React, Vue), `dist/<nom>/browser` pour Angular ; `npm ci` demande un `package-lock.json`. Volumes : volume nommé (persistance) vs bind mount (développement).

Compose : `up -d --build`, `ps`, `logs`, `down` ; réseau `devops-lab_default`, DNS par nom de service, port interne 80 vs port hôte 8080 ; seul `web` publié, `depends_on` = ordre de démarrage ; `down -v` supprime les volumes. Rappeler que le Compose du TP était un bonus.

Git public : `.gitignore` incluant `.env`, dépôt public, aucun secret ; un secret poussé est compromis, il faut le révoquer. Commit conventionnel `chore: frontend conteneurisé`. Le frontend du TP est distinct du fil rouge Node.js/API (port 3000).

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

Rappeler explicitement les limites du module sur Kubernetes : pas d'installation de cluster, pas de manifeste complexe, pas de TP évalué dessus ; uniquement du vocabulaire et les idées de haute disponibilité (probes, Service). Les statuts CNCF sont des signaux de gouvernance, pas des garanties.

Transition : lancer le QCM de clôture de la séance 2.
-->

---
layout: qcm
duration: 18 min
questions: 20
cover: DevOps/DORA, Git (PR/MR, commit atomique, SemVer), Infrastructure as Code (cycle déclaratif, plan/apply, idempotence), Docker (image, couche, registre, volumes, multi-stage frontend statique/Nginx, bonnes pratiques), Git public (secrets, .gitignore), Compose (deux services, réseau par défaut, DNS par nom de service, port publié vs interne), CNCF (statuts de maturité), Kubernetes (vocabulaire, liveness/readiness, Service)
---

# QCM de clôture — Séance 2


<!--
Durée : 18 min (lancement 2 min, jeu 13 min, débrief 3 min) pour 20 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 20 questions de la section « Séance 2 » de `qcm-kahoot.md`, puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : ce quiz couvre un volume de notions plus large que celui de la séance 1 (DevOps, Git, Infrastructure as Code, Docker, cloud-native) — signaler explicitement les questions à réponses multiples avant de démarrer.

Exemple concret de question possible : "Quelle commande construit une image à partir d'un Dockerfile ?" (réponse attendue : `docker build`) — à adapter selon les questions réellement configurées dans le quiz.

Transition : débriefer collectivement les 1-2 questions les plus ratées, puis annoncer la séance 3 — CI/CD avec GitHub Actions et GitLab CI.
-->
