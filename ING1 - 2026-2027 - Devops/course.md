# Fiche cours — Cloud, Réseaux et DevOps

## Informations générales

- **Intitulé** : Cloud, Réseaux et DevOps
- **Volume horaire** : 12h (4 séances de 3h)
- **Format** : 4 séances en présentiel
- **Découpage** : 4 × 3h, pause de 20 min incluse dans chaque séance
- **Public** : Ingénieur 1 (ING1) — 1ʳᵉ année du cycle ingénieur G4
- **Prérequis** : Linux/Bash niveau B2, notions de développement web et HTTP, capacité à cloner un dépôt et lire un fichier YAML — aucune expérience cloud préalable requise
- **Outils** : Docker, Docker Compose, Git/GitHub ou GitLab, GitHub Actions, GitLab CI
- **Instructeur** : Clément DAOU — Ingénieur Cloud-DevOps (AWS, Azure, Kubernetes)

## Objectifs pédagogiques

À l'issue de ce cours, l'étudiant sera capable de :

1. **Expliquer** l'adressage IP, le sous-réseau, le DNS, la passerelle et le routage
2. **Distinguer** IaaS, PaaS, SaaS et serverless, puis **justifier** un choix simple
3. **Comparer** machine virtuelle et conteneur, **construire** une image Docker, **utiliser** Compose et **situer** Kubernetes comme orchestrateur
4. **Décrire** les mécanismes de haute disponibilité : redondance, répartition de charge, health checks, reprise et réplication orchestrée
5. **Expliquer** les principes de l'Infrastructure as Code (déclaratif, plan, apply, idempotence) et situer Terraform parmi ses alternatives
6. **Utiliser** Git dans un flux de travail collaboratif : branches, commits, revue et versionnage
7. **Construire** un pipeline GitHub Actions ou GitLab CI qui installe, teste, construit puis fabrique l'image Docker
8. **Identifier** les risques courants liés aux secrets, aux dépendances, à TLS et aux images
9. **Lire** des logs et **choisir** quelques métriques utiles pour superviser un service
10. **Auditer** une configuration Docker ou CI générée par une IA et **justifier** les corrections

## Cadre et fil rouge

Ce module relie les fondamentaux réseau, les modèles d'hébergement cloud, la conteneurisation et l'automatisation. L'étudiant suit un fil rouge unique : une application web Node.js simple, versionnée avec Git, exécutée avec Docker, puis vérifiée par un pipeline CI.

Le déploiement public est présenté comme une possibilité et non comme une dépendance bloquante. Le livrable peut être validé avec un pipeline vert et une URL publique lorsque l'environnement et le temps le permettent ; une démonstration locale documentée constitue le repli pédagogique.

## Plan détaillé

---

### Séance 1 — Réseaux, cloud et haute disponibilité (3h)

**Objectifs :** comprendre le trajet d'une requête web, choisir un modèle d'hébergement et expliquer pourquoi une architecture redondante résiste mieux aux pannes.

| Temps | Contenu et activité | Modalité |
|---:|---|---|
| 00:00–00:05 | Accueil, présentation de l'instructeur, plan global des 4 séances, fil rouge et critères du TP final | Échange |
| 00:05–00:06 | Introduction séance 1 : fil réseau → cloud → haute disponibilité | Échange |
| 00:06–00:13 | Modèle en couches : TCP/IP (4 couches) et OSI (7 couches), correspondance OSI→TCP/IP | Cours + schéma |
| 00:13–00:17 | OSI : les 7 couches en détail | Cours |
| 00:17–00:19 | Correspondance OSI ↔ TCP/IP | Cours |
| 00:19–00:28 | Encapsulation et rôle des ports | Cours + schéma |
| 00:28–00:37 | IPv4 : structure d'une adresse, adresse privée/publique | Cours + exercices |
| 00:37–00:45 | Lire un CIDR simplement | Cours + exercices |
| 00:45–00:48 | IPv6 : pourquoi et à quoi ça ressemble | Cours |
| 00:48–00:51 | DNS : résolution d'un nom en adresse | Démonstration |
| 00:51–00:55 | Enregistrements DNS courants (A, AAAA, CNAME, MX) | Cours |
| 00:55–00:59 | Routage et passerelle par défaut | Cours |
| 00:59–01:01 | Pare-feu : règles de filtrage (IP source/destination, port, protocole, direction) | Cours |
| 01:01–01:03 | Pare-feu réseau vs applicatif : port ouvert ≠ application saine | Cours |
| 01:03–01:11 | Manipulation guidée 1 — `ping`, `traceroute`/`tracert` : nom vs IP, limites de l'ICMP | TP guidé |
| 01:11–01:16 | Parcours concret : de l'URL à la réponse HTTPS (schéma compact) | Cours + schéma |
| 01:16–01:24 | Manipulation guidée 2 — `nslookup`, `curl -I` : adresse résolue et statut HTTP | TP guidé |
| 01:24–01:44 | Pause | — |
| 01:44–01:51 | Cloud : élasticité, mutualisation, paiement à l'usage, responsabilité partagée | Cours |
| 01:51–01:54 | FinOps : valeur business, tags, budgets/alertes, rightsizing, coût total | Cours |
| 01:54–01:57 | IaaS, PaaS, SaaS et serverless : le curseur de responsabilité | Cours + schéma |
| 01:57–02:00 | Exemple concret : héberger une API Node sur les 4 modèles | Cours |
| 02:00–02:03 | Étude de cas : quel modèle choisir ? | Étude de cas |
| 02:03–02:07 | Qui gère quoi ? Tableau des responsabilités On-Premise/IaaS/PaaS/SaaS | Cours + tableau |
| 02:07–02:11 | Serverless : objectifs et principes — événement, scalabilité auto (y compris zéro), paiement à l'usage réel | Cours |
| 02:11–02:16 | Serverless chez les hyperscalers : du déclencheur au service (Lambda/Azure Functions/Cloud Functions, API Gateway/API Management/API Gateway, Step Functions/Durable Functions/Workflows, EventBridge/Event Grid/Eventarc) | Cours + schéma |
| 02:16–02:20 | AWS, Azure, GCP : calcul, stockage, BDD, serverless, réseau, conteneurs | Cours |
| 02:20–02:23 | Identité et organisation cloud : comptes/IAM (AWS, Azure, GCP) | Cours |
| 02:23–02:25 | Choisir un fournisseur cloud : critères de décision | Cours |
| 02:25–02:31 | SecNumCloud : qualification ANSSI d'une offre, pas d'un fournisseur | Cours + comparaison |
| 02:31–02:34 | Haute disponibilité : health check HTTP vs TCP | Cours + schéma |
| 02:34–02:37 | Réaction automatique : retrait, restart, boucle de réconciliation | Cours |
| 02:37–02:40 | Synthèse de la séance 1 | Synthèse |
| 02:40–03:00 | QCM de clôture (Kahoot ou équivalent, 30 questions) : réseau, pare-feu, cloud, responsabilités, FinOps, AWS/Azure/GCP, SecNumCloud, haute disponibilité | Quiz |

**Exemples publics à présenter avec prudence :** architectures cloud publiquement décrites par Netflix (AWS), Microsoft (Azure), Google (GCP), ainsi que des retours d'expérience clients publiés par les fournisseurs. Ce sont des exemples documentés publiquement, pas des modèles exclusifs ni des prescriptions universelles ; dater et sourcer chaque cas cité.

**SecNumCloud :** qualification délivrée par l'ANSSI à une offre cloud précise (pas à une entreprise dans son ensemble) ; à présenter en comparaison nuancée avec un cloud public hyperscaler, sans conseil juridique définitif et en renvoyant vers la liste ANSSI en vigueur.

---

### Séance 2 — DevOps, Git, Docker et écosystème cloud-native (3h)

**Objectifs :** relier collaboration et automatisation, versionner proprement le fil rouge et produire une image exécutable.

| Temps | Contenu et activité | Modalité |
|---:|---|---|
| 00:00–00:12 | Retour réseau/cloud et rappel du scénario applicatif | Échange |
| 00:12–00:30 | DevOps : histoire, silos Dev/Ops, culture, responsabilité partagée, flux/feedback et métriques DORA | Cours |
| 00:30–00:44 | Git : dépôt, commit, branche, merge request/pull request et revue | Démonstration |
| 00:44–00:56 | Branches, commits atomiques, SemVer et historique lisible | Cours + exercice |
| 00:56–01:06 | Infrastructure as Code : le problème résolu, déclaratif/plan/apply/idempotence, Terraform et écosystème | Cours + schéma |
| 01:06–01:24 | VM versus conteneur ; image, couche, registre, conteneur et isolation | Cours + schéma |
| 01:24–01:44 | Pause | — |
| 01:44–02:07 | Dockerfile : contexte, image de base, dépendances, commande de démarrage et port | Démonstration |
| 02:07–02:25 | Bonnes pratiques : `.dockerignore`, utilisateur non privilégié, cache et multi-stage | Cours + comparaison |
| 02:25–02:30 | Docker Compose : services, réseau, variables d'environnement et volumes | Démonstration |
| 02:30–02:38 | CNCF : fondation open source cloud-native, gouvernance et maintien des projets ; statuts sandbox, incubating, graduated comme signaux de maturité sans garantie absolue | Cours + schéma |
| 02:38–02:42 | Kubernetes : pourquoi un orchestrateur, lien avec Docker, cluster/node/pod/deployment/service ; limites du module | Cours + quiz oral |
| 02:42–03:00 | QCM de clôture (Kahoot ou équivalent, 20 questions) : DevOps, Git, Infrastructure as Code, Docker, cloud-native | Quiz |

**TP guidé :** partir de l'application Node.js fournie, créer une image, lancer le service, vérifier un endpoint HTTP, puis comparer une image naïve et une image améliorée.

**Introduction progressive à Kubernetes :** partir du problème de plusieurs conteneurs ou machines, puis présenter l'orchestrateur comme la couche qui déploie, réplique et supervise des conteneurs à grande échelle. Docker crée et exécute les conteneurs ; Kubernetes organise leur déploiement et leur fonctionnement. Cas d'usage retenus : application multi-services, haute disponibilité, montée en charge, mises à jour. Vocabulaire limité à **cluster**, **node**, **pod**, **deployment**, **service**. Hors scope : installation d'un cluster, manifestes complexes, TP Kubernetes évalué.

**Introduction cloud-native :** la CNCF est présentée **avant** Kubernetes comme une fondation open source qui accueille des projets cloud-native, organise leur gouvernance et contribue à leur maintien. Les statuts **sandbox**, **incubating** et **graduated** sont des signaux de maturité et de gouvernance, pas des garanties absolues de sécurité, de qualité ou d'adéquation à un besoin. Cette mise en contexte évite de réduire l'écosystème cloud-native à un seul orchestrateur.

---

### Séance 3 — CI/CD : GitHub Actions et GitLab CI (3h)

**Objectifs :** lire un pipeline déclaratif et construire une chaîne reproductible de validation et de fabrication.

| Temps | Contenu et activité | Modalité |
|---:|---|---|
| 00:00–00:12 | Retour sur l'image Docker et diagnostic d'erreurs fréquentes | Échange |
| 00:12–00:30 | CI, livraison continue et déploiement continu ; bénéfices et limites | Cours |
| 00:30–00:48 | Anatomie commune : événement, job, étape, runner, artefact et statut | Cours + schéma |
| 00:48–01:06 | GitHub Actions : workflow YAML, déclencheurs, actions réutilisables et cache | Démonstration |
| 01:06–01:19 | GitLab CI : `.gitlab-ci.yml`, stages, jobs, runners et variables | Démonstration comparative |
| 01:19–01:39 | Pause | — |
| 01:39–01:59 | Pipeline cible : installation → tests → build applicatif → build image Docker | Cours |
| 01:59–02:29 | TP : construire le pipeline choisi (GitHub Actions **ou** GitLab CI), déclencher sur commit, lire les logs | TP guidé |
| 02:29–02:42 | Matrices, conditions, parallélisation et artefacts ; ce qui reste hors scope ING1 | Cours |
| 02:42–03:00 | QCM de clôture (Kahoot ou équivalent, 20 questions) : CI/CD, anatomie de pipeline, GitHub Actions, GitLab CI | Quiz |

**Choix pédagogique :** chaque groupe implémente **GitHub Actions ou GitLab CI** afin de tenir le temps. L'autre outil est lu et comparé, sans exiger une double implémentation. Le déploiement public n'est pas obligatoire dans le pipeline de séance ; le build de l'image est l'étape minimale commune.

---

### Séance 4 — Sécurité, observabilité, déploiement et audit IA (3h)

**Objectifs :** sécuriser et expliquer le résultat, lire des logs et choisir une métrique utile pour superviser un service, et exercer un jugement critique sur une configuration générée par IA.

| Temps | Contenu et activité | Modalité |
|---:|---|---|
| 00:00–00:10 | Revue des pipelines et objectifs du livrable final | Échange |
| 00:10–00:28 | TLS/HTTPS : chiffrement, intégrité, authentification, certificat, chaîne de confiance et Let's Encrypt | Cours |
| 00:28–00:46 | Secrets : variables protégées, jetons, `.env`, rotation et interdiction de versionner un secret | Cas pratique |
| 00:46–01:04 | Sécurité CI/CD : dépendances, secret scanning, image de base, permissions minimales ; audit express sur un pipeline fourni | Cours + audit |
| 01:04–01:17 | Déploiement et versionnage : environnements, release, rollback, recreate, rolling, blue/green et canary | Cours |
| 01:17–01:37 | Pause | — |
| 01:37–01:51 | Observabilité : distinguer logs, métriques et traces ; chaîne OpenTelemetry → Prometheus → Grafana → Alertmanager | Cours + démonstration |
| 01:51–02:07 | Feature flags : activer sans redéployer, complément du canary, dette technique et de sécurité | Cours + étude de cas |
| 02:07–02:19 | Grille d'audit d'une configuration générée par IA (reproductibilité, permissions, exposition réseau, secrets, provenance, cohérence), avec démonstration en direct sur une proposition réelle | Cours + démonstration |
| 02:19–02:34 | Finalisation du dépôt, preuves, restitution en binômes | TP noté |
| 02:34–02:52 | QCM de clôture (Kahoot ou équivalent, 20 questions) : TLS, secrets, sécurité CI/CD, déploiement, observabilité, feature flags, audit IA | Quiz |
| 02:52–03:00 | Bilan, limites du module et synthèse globale des 4 séances | Synthèse |

**Audit IA attendu :** l'étudiant ne note pas la capacité de l'IA à produire du YAML. Il vérifie la reproductibilité, les versions, les permissions, l'exposition réseau, les secrets, la provenance de l'image, le cache et la cohérence avec le besoin. Toute suggestion est traitée comme une proposition à vérifier.

**Cadrage de l'observabilité :** OpenTelemetry fournit l'instrumentation et la collecte des traces, métriques et logs ; Prometheus collecte et stocke les métriques ; Grafana les représente dans des tableaux de bord ; Alertmanager regroupe, déduplique et achemine les notifications issues des règles d'alerte. Les logs décrivent des événements, les métriques mesurent des valeurs agrégées dans le temps, les traces suivent le parcours d'une requête entre composants. Le traitement reste conceptuel : pas de déploiement de stack complète, pas de PromQL avancé, pas d'installation de ces outils en séance. OpenTelemetry et Prometheus sont référencés comme exemples de projets de l'écosystème cloud-native vu en séance 2, sans reprendre l'explication de la CNCF.

## Fil rouge et livrable TP

### Scénario

Une application web Node.js minimale expose une page et un endpoint de contrôle. Le dépôt contient le code, les tests, le Dockerfile et le fichier de pipeline choisi. Le travail privilégie la compréhension des relations entre code, image, pipeline et service ; il ne demande pas d'implémenter une architecture distribuée complète.

### Livrable final

- dépôt Git identifiable et historique compréhensible ;
- application lançable localement ;
- Dockerfile fonctionnel et, si possible, optimisé ;
- pipeline GitHub Actions **ou** GitLab CI vert ;
- étapes visibles : installation des dépendances, tests, build applicatif et construction de l'image Docker ;
- secrets absents du dépôt et configuration sensible documentée ;
- courte preuve d'observabilité : logs analysés, endpoint de santé ou métrique choisie ;
- audit écrit d'une configuration générée par IA, avec corrections justifiées ;
- URL publique fonctionnelle si un hébergement pédagogique est disponible, sinon preuve locale reproductible et explication de la limite.

## Évaluation

### TP pipeline CI/CD et application (évaluation principale)

| Critère | Pondération |
|---|---:|
| Application et exécution reproductible | 20 % |
| Dockerfile, image et bonnes pratiques | 20 % |
| Pipeline : installation, tests, build, image | 30 % |
| Sécurité : secrets, permissions, dépendances, TLS expliqué | 15 % |
| Logs/monitoring et diagnostic | 10 % |
| Audit IA et qualité de la documentation | 5 % |

**Critère référentiel :** conteneuriser et automatiser la validation d'une application via un pipeline CI/CD. **Indicateur observable :** pipeline vert et URL publique fonctionnelle lorsque le déploiement en ligne est retenu ; à défaut, exécution locale documentée comme aménagement pédagogique. Le déploiement public n'est jamais une obligation bloquante.

### Évaluations formatives

- quiz courts sur réseau, cloud, Docker et CI/CD ;
- correction collective des schémas d'architecture ;
- lecture collective de journaux de pipeline ;
- revue croisée de l'audit IA.

## Supports pédagogiques

| Support | Description |
|---------|-------------|
| Slides Slidev | Présentation pour les 4 séances (`slides.md`) |
| Repo TP fil rouge | Application Node.js minimale, réutilisée séances 2 à 4 |
| Repo TP CI/CD | Squelette de pipeline GitHub Actions et GitLab CI à compléter (séance 3) |
| Repo TP final | Dépôt à compléter avec Dockerfile, pipeline, preuves et audit IA (séance 4) |

## Ressources recommandées

- Documentation officielle Docker — https://docs.docker.com
- Documentation officielle Git — https://git-scm.com/book
- Documentation officielle GitHub Actions — https://docs.github.com/actions
- Documentation officielle GitLab CI — https://docs.gitlab.com/ee/ci/
- Documentation AWS, Azure, Google Cloud (pages produits et architectures de référence)
- MDN — HTTP et TLS — https://developer.mozilla.org
- Rapports DORA / State of DevOps — https://dora.dev
- Documentation OWASP — https://owasp.org
- CNCF Cloud Native Landscape — https://landscape.cncf.io
- Kubernetes Basics — https://kubernetes.io/docs/tutorials/kubernetes-basics/

## Points d'attention pour l'instructeur

- **Public ING1 sans expérience cloud** : les prérequis réseau/Linux sont posés, mais l'expérience cloud est nulle par hypothèse. Démarrer chaque nouveau concept par un exemple concret avant la formalisation.
- **Infrastructure as Code = repères conceptuels, pas de TP** : déclaratif/plan/apply/idempotence et l'écosystème Terraform restent une mise en contexte de 12 minutes ; aucun fichier IaC fonctionnel, aucune installation ni commande Terraform en séance.
- **CNCF avant Kubernetes** : toujours présenter la fondation, sa gouvernance et ses statuts de maturité avant d'introduire l'orchestrateur, pour éviter de réduire le cloud-native à un seul outil.
- **Kubernetes = introduction, pas TP** : vocabulaire limité à cluster/node/pod/deployment/service. Aucune installation de cluster, aucun manifeste complexe, aucune évaluation dessus.
- **Prudence sur les exemples d'entreprises** : ne jamais présenter une relation entreprise/hyperscaler comme exclusive ; dater et sourcer chaque cas public cité (Netflix/AWS, Microsoft/Azure, Google/GCP, etc.).
- **Aucun déploiement public obligatoire** : le pipeline vert et l'image construite suffisent à valider ; le déploiement en ligne est un bonus documenté, jamais un blocage de note.
- **GitHub Actions et GitLab CI en miroir** : chaque groupe choisit un outil pour l'implémentation, l'autre est lu et comparé collectivement — pas de double implémentation exigée.
- **Observabilité conceptuelle** : logs, métriques, traces et la chaîne OpenTelemetry/Prometheus/Grafana/Alertmanager restent expliqués sur schéma et exemples commentés ; pas de déploiement de stack Prometheus/Grafana complète en séance.
- **Audit IA = esprit critique, pas prouesse IA** : la grille de correction porte sur la capacité de l'étudiant à repérer les failles d'une configuration générée, pas sur la qualité de la génération elle-même.
- **Rythme dense en séance 3 et 4** : prévoir des snippets de rattrapage pour les groupes qui bloquent sur une erreur de pipeline, afin de ne pas perdre 20 minutes sur un incident isolé.

## Direction visuelle

- Palette slides : anthracite, terracotta et ambre, sans dominante bleue ; les couleurs vives (vert succès, rouge alerte, ambre avertissement) restent réservées aux états.
- Schémas Mermaid progressifs pour les flux réseau, cloud, Infrastructure as Code, Git, Docker, CI/CD et observabilité, dans l'esprit du support historique.
- Icônes ou pictogrammes toujours accompagnés d'un libellé texte ; aucun repère visuel seul.
