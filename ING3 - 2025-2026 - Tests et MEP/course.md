# Fiche cours — Recette et Mise en Production

## Informations générales

- **Intitulé** : Recette et Mise en Production
- **Volume horaire** : 14h (2 journées de 7h)
- **Format** : 2 journées en présentiel, espacées d'un mois
- **Découpage** : 4 demi-journées de 3h30 (pause de 20 min incluse)
- **Public** : Master Ingénierie Informatique et Management — BAC+5 (promo de 20 élèves)
- **Prérequis** : bases en programmation, notions de Git, sensibilisation CI/CD (niveau variable)
- **Instructeur** : Yoann (expérience terrain en recette et mise en production)

## Objectifs pédagogiques

À l'issue de ce cours, l'étudiant sera capable de :

1. **Concevoir** une stratégie de test adaptée à un projet (pyramide des tests, choix des types de tests)
2. **Rédiger** un plan de recette structuré (cas de test, critères d'acceptation, PV de recette)
3. **Implémenter** des tests automatisés (unitaires, intégration, E2E) dans un projet existant
4. **Analyser** un pipeline CI/CD et identifier ses forces et faiblesses
5. **Comparer** les stratégies de déploiement (blue/green, canary, rolling, feature flags) et recommander la plus adaptée à un contexte donné
6. **Définir** des indicateurs de fiabilité (SLA/SLO/SLI) et une stratégie de monitoring
7. **Diagnostiquer** un incident de production à partir d'un post-mortem et proposer des actions correctives

## Plan détaillé

---

### Jour 1 — La Recette

#### Demi-journée 1 — Stratégie et culture de la qualité (3h30)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Ouverture — tour rapide : "c'est quoi la recette pour vous ?" | Icebreaker |
| 15 min | Pourquoi la recette ? Coût d'un bug selon la phase de détection. Exemples de fails célèbres (Knight Capital, Ariane 5, Crowdstrike) | Cours magistral |
| 15 min | Qualité logicielle — les dimensions de la qualité (ISO 25010 en survol), notion de Definition of Done | Cours magistral |
| 20 min | La pyramide des tests — unitaires, intégration, E2E, exploratoires. Trade-offs coût vs confiance, vitesse vs couverture | Cours magistral |
| 15 min | **Exercice 1** — Classer des scénarios de test dans la pyramide. Identifier les trous dans une stratégie de test donnée | Travail en groupes de 4 |
| 10 min | Shift-left testing — tester tôt, tester souvent. Lien avec les méthodologies agiles | Cours magistral |
| **20 min** | **Pause** | |
| 10 min | Rôles et responsabilités QA — QA engineer, développeur, PO, testeur. RACI simplifié | Cours magistral |
| 20 min | Le plan de recette — cahier de recette, cas de test, critères d'acceptation, procès-verbal de recette. Lien avec les user stories | Cours magistral |
| 20 min | **Exercice 2** — Rédiger un mini-plan de recette pour la fonctionnalité "inscription à un événement sportif" (clin d'oeil à leur projet annuel) | Solo puis mise en commun |
| 15 min | Les environnements de recette — dev / staging / preprod / prod. Gestion des données de test, anonymisation, RGPD | Cours magistral |
| 15 min | Discussion projet — Comment leur projet annuel gère-t-il la recette aujourd'hui ? Forces, faiblesses, pistes d'amélioration | Échange collectif |
| 5 min | Récap du matin — points clés à retenir | Synthèse |

#### Demi-journée 2 — Tests automatisés en pratique (3h30)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 15 min | Tests unitaires et d'intégration — bonnes pratiques : isolation, mocking, fixtures. Ce que la couverture de code dit (et ne dit pas) | Cours magistral |
| 10 min | TDD et BDD — principes, quand c'est pertinent, exemple concret Given/When/Then | Cours magistral |
| 15 min | Tests E2E — principes, outils (Playwright, Cypress, Selenium). Le problème des flaky tests | Cours magistral |
| 10 min | Démo live — exécution d'un test E2E sur le repo pré-préparé | Démonstration |
| 15 min | Gestion des données de test — factories, seeders, fixtures. Comment gérer l'état entre les tests | Cours magistral |
| **20 min** | **Pause** | |
| 45 min | **TP** — Sur le repo pré-préparé : compléter un test unitaire manquant + écrire un test E2E simple. Le repo contient des "trous" volontaires à combler | TP guidé |
| 15 min | Revue collective du TP — comparaison des approches choisies, discussion sur les difficultés rencontrées | Échange collectif |
| 15 min | Non-régression et reporting — intégrer les tests dans la CI, rapports de couverture, badges, quality gates | Cours magistral |
| 10 min | Métriques de test — que mesurer et pourquoi. Mutation testing (mention). Les pièges de la couverture à 100% | Cours magistral |
| 10 min | Transition vers le Jour 2 — teaser mise en production. Consigne : observer comment se passent les déploiements sur leur projet d'ici le Jour 2 | Échange |
| 5 min | Récap de la journée | Synthèse |

---

### Jour 2 — La Mise en Production (1 mois plus tard)

#### Demi-journée 3 — Stratégies de déploiement (3h30)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 15 min | Retour d'expérience — tour de table : qu'ont-ils observé sur leur projet depuis le Jour 1 ? Problèmes rencontrés lors des déploiements ? | Discussion ouverte |
| 25 min | Le pipeline CI/CD — anatomie complète : build, test, package, deploy, promote, rollback. Concepts : artefact, environnement, promotion | Cours magistral |
| 20 min | **Exercice 3** — Dessiner le pipeline idéal pour une application donnée. Identifier les étapes manquantes dans un pipeline volontairement incomplet | Travail en groupes |
| 15 min | Sécurité dans le pipeline — SAST, DAST, dependency scanning, supply chain attacks. Pourquoi c'est incontournable en 2026 | Cours magistral |
| **20 min** | **Pause** | |
| 25 min | Stratégies de déploiement — blue/green, canary, rolling update, feature flags. Avantages, inconvénients, critères de choix | Cours magistral |
| 10 min | Conteneurisation express — Docker en 10 min : pourquoi ça a changé le déploiement, image vs conteneur, registry. Culture, pas TP | Cours magistral |
| 15 min | Infrastructure as Code et GitOps — pourquoi "cliquer dans la console" ne scale pas. Mention Terraform, Ansible, ArgoCD | Cours magistral |
| 10 min | Démo live — déploiement blue/green ou canary simulé sur le repo pré-préparé | Démonstration |
| 15 min | SLA / SLO / SLI — définitions, error budgets, exemples concrets. Le pont entre technique et business | Cours magistral |
| 15 min | **Exercice 4** — Définir des SLO réalistes pour une application donnée. Calculer un error budget | Travail en groupes |
| 5 min | Récap du matin | Synthèse |

#### Demi-journée 4 — Monitoring, incidents et gouvernance (3h30)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 20 min | Monitoring et observabilité — logs, métriques, traces (les 3 piliers). Les 4 golden signals : latence, trafic, erreurs, saturation | Cours magistral |
| 10 min | Panorama d'outils — Grafana, Datadog, Sentry, ELK, Prometheus. Survol visuel, pas de TP | Cours magistral |
| 15 min | Alerting — quoi alerter (et quoi ne pas alerter), fatigue d'alerte, culture on-call | Cours magistral |
| 15 min | **Exercice 5** — Analyser un dashboard : identifier les anomalies, décider quoi alerter, rédiger une règle d'alerte | Travail en groupes |
| **20 min** | **Pause** | |
| 15 min | Gestion des incidents — cycle complet : détection, triage, communication, résolution, post-mortem. Culture blameless | Cours magistral |
| 20 min | **Exercice 6** — Analyse d'un post-mortem réel (ex: incident GitHub, Cloudflare). Identifier la cause racine, la timeline, les actions correctives | Groupes + restitution |
| 15 min | Gouvernance — change management, CAB (Change Advisory Board), ITIL en survol, séparation des rôles dev/ops/QA, compliance | Cours magistral |
| 30 min | **TP final** — Sur le repo pré-préparé : compléter un pipeline GitHub Actions (build + test + déploiement simulé). Mise en pratique de bout en bout | TP guidé |
| 15 min | Retour sur leur projet — qu'est-ce qu'ils changeraient maintenant ? Quick wins identifiés ? | Échange collectif |
| 10 min | Synthèse des 2 jours — récapitulatif global, ressources pour aller plus loin, conseils pour la vie pro | Cours magistral |
| 5 min | Mot de fin | |

---

## Évaluation

- **Type** : QCM
- **Moment** : à préparer après la finalisation du contenu du cours
- **Périmètre** : l'ensemble des 2 journées (recette + mise en production)
- **Format** : questions à choix multiples couvrant théorie et cas pratiques

## Supports pédagogiques

### À préparer

| Support | Description |
|---------|-------------|
| Slides Slidev | Présentation pour les 4 demi-journées |
| Repo pré-préparé | App web avec tests manquants + pipeline incomplet à compléter |
| Énoncés exercices | Exercices 1 à 6 avec consignes détaillées |
| Post-mortems | 2-3 post-mortems publics sélectionnés et annotés |
| Dashboard exemple | Screenshot ou dashboard simulé pour l'exercice 5 |

### Ressources recommandées

- **Livre** : "Continuous Delivery" — Jez Humble & David Farley
- **Livre** : "Accelerate" — Nicole Forsgren, Jez Humble & Gene Kim
- **Livre** : "Site Reliability Engineering" — Google (disponible gratuitement en ligne)
- **Web** : ISTQB Syllabus (référentiel international du test logiciel)
- **Web** : Post-mortems publics (GitHub, Cloudflare, GitLab — blogs d'ingénierie)
- **Web** : The Twelve-Factor App (méthodologie pour les apps cloud-native)

## Points d'attention pour l'instructeur

- **Profils mixtes** : certains élèves sont orientés dev, d'autres management. Ancrer chaque concept technique dans un impact business concret
- **Niveau CI/CD variable** : ne pas supposer que tout le monde maîtrise Git et les pipelines. Prendre le temps sur les fondamentaux
- **Projet annuel** : les élèves ont un projet commun (site d'événements sportifs inter-établissements) avec repo, CI/CD et plans de test. S'en servir comme point de discussion, pas comme support de TP (pour éviter la dispersion)
- **Mois d'écart** : la consigne d'observation entre J1 et J2 crée de la continuité. Relancer le sujet en ouverture du J2
- **Anecdotes terrain** : les blocs "Échange" sont les moments privilégiés pour injecter du vécu professionnel
