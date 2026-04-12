# Plan de cours — Recette et Mise en Production

## Vue d'ensemble

- **Cours** : Recette et Mise en Production
- **Public** : BAC+5 — Master Ingénierie Informatique et Management (promo de 20 élèves)
- **Format** : 2 journées en présentiel, espacées d'un mois
- **Volume horaire** : 14h (4 demi-journées de 3h30)
- **Ratio** : ~60% cours/échanges, ~40% exercices/TP
- **Evaluation** : QCM en fin de parcours
- **Stack** : Agnostique (outils incontournables détaillés dans les TPs)

### Organisation d'une demi-journée

- Durée : 3h30 = 210 min
- Pause : 20 min (vers le milieu)
- Temps effectif : ~190 min
- Marge prévue : ~20 min pour échanges et débordements

### Découpage

| Demi-journée | Thème principal |
|---|---|
| Jour 1 — Matin | La Recette : stratégie et culture de la qualité |
| Jour 1 — Après-midi | La Recette : tests automatisés en pratique |
| Jour 2 — Matin | Mise en production : stratégies de déploiement |
| Jour 2 — Après-midi | Mise en production : monitoring, incidents et gouvernance |

---

## JOUR 1 — La Recette

### Matin (3h30) — Stratégie et culture de la qualité

| Durée | Contenu | Format |
|-------|---------|--------|
| 10 min | **Ouverture** — tour rapide : "c'est quoi la recette pour vous ?" | Icebreaker |
| 15 min | **Pourquoi la recette ?** — coût d'un bug selon la phase, fails célèbres (Knight Capital, Ariane 5) | Cours |
| 15 min | **Qualité logicielle** — dimensions (ISO 25010 en survol), Definition of Done | Cours |
| 20 min | **Pyramide des tests** — unitaires, intégration, E2E, exploratoires, trade-offs coût/confiance | Cours |
| 15 min | **Exercice 1** — classer des scénarios dans la pyramide, identifier les trous d'une stratégie | Groupes de 4 |
| 10 min | **Shift-left testing** — tester tôt, lien avec l'agilité | Cours |
| **20 min** | **Pause** | |
| 10 min | **Rôles QA** — QA engineer, dev, PO, testeur, RACI simplifié | Cours |
| 20 min | **Plan de recette** — cahier de recette, cas de test, critères d'acceptation, PV | Cours |
| 20 min | **Exercice 2** — rédiger un plan de recette pour "inscription à un événement sportif" | Solo puis mise en commun |
| 15 min | **Environnements** — dev / staging / preprod / prod, données de test, anonymisation | Cours |
| 15 min | **Discussion projet** — comment leur projet gère la recette aujourd'hui ? Forces / faiblesses | Echange |
| 5 min | **Récap matin** | |

> Total effectif : 170 min + 20 min pause = 190 min (marge ~20 min)

### Après-midi (3h30) — Tests automatisés en pratique

| Durée | Contenu | Format |
|-------|---------|--------|
| 15 min | **Tests unitaires & intégration** — bonnes pratiques, mocking, fixtures, couverture de code | Cours |
| 10 min | **TDD / BDD** — principes, quand c'est pertinent, exemple concret | Cours |
| 15 min | **Tests E2E** — principes, outils (Playwright, Cypress, Selenium), flaky tests | Cours |
| 10 min | **Démo live** — un test E2E sur le repo pré-préparé | Démo |
| 15 min | **Données de test** — factories, seeders, fixtures, comment gérer l'état | Cours |
| **20 min** | **Pause** | |
| 45 min | **TP** — sur le repo pré-préparé : combler un test unitaire manquant + écrire un test E2E simple | TP guidé |
| 15 min | **Revue collective du TP** — comparaison des approches | Echange |
| 15 min | **Non-régression & reporting** — CI, rapports de couverture, quality gates | Cours |
| 10 min | **Métriques de test** — que mesurer, mutation testing (mention), pièges de la couverture | Cours |
| 10 min | **Transition J2** — teaser MEP + consigne : observer les déploiements sur leur projet d'ici J2 | Echange |
| 5 min | **Récap journée** | |

> Total effectif : 165 min + 20 min pause = 185 min (marge ~25 min)

---

## JOUR 2 — La Mise en Production (1 mois plus tard)

### Matin (3h30) — Stratégies de déploiement

| Durée | Contenu | Format |
|-------|---------|--------|
| 15 min | **Retour d'expérience** — qu'ont-ils observé sur leur projet ? Problèmes de déploiement ? | Discussion |
| 25 min | **Pipeline CI/CD** — anatomie complète : build, test, package, deploy, promote, rollback | Cours |
| 20 min | **Exercice 3** — dessiner le pipeline idéal + corriger un pipeline volontairement incomplet | Groupes |
| 15 min | **Sécurité dans le pipeline** — SAST, DAST, dependency scanning, supply chain | Cours |
| **20 min** | **Pause** | |
| 25 min | **Stratégies de déploiement** — blue/green, canary, rolling update, feature flags | Cours |
| 10 min | **Conteneurisation express** — Docker : pourquoi, image vs conteneur, registry | Cours |
| 15 min | **IaC & GitOps** — pourquoi "cliquer dans la console" ne scale pas, Terraform/Ansible/ArgoCD | Cours |
| 10 min | **Démo live** — déploiement blue/green ou canary simulé | Démo |
| 15 min | **SLA / SLO / SLI** — définitions, error budgets, exemples concrets | Cours |
| 15 min | **Exercice 4** — définir des SLO réalistes pour une app donnée | Groupes |
| 5 min | **Récap matin** | |

> Total effectif : 170 min + 20 min pause = 190 min (marge ~20 min)

### Après-midi (3h30) — Monitoring, incidents et gouvernance

| Durée | Contenu | Format |
|-------|---------|--------|
| 20 min | **Monitoring & observabilité** — logs, métriques, traces, les 4 golden signals | Cours |
| 10 min | **Outils** — Grafana, Datadog, Sentry, ELK, Prometheus (survol visuel) | Cours |
| 15 min | **Alerting** — quoi alerter, fatigue d'alerte, culture on-call | Cours |
| 15 min | **Exercice 5** — analyser un dashboard : identifier les anomalies et décider quoi alerter | Groupes |
| **20 min** | **Pause** | |
| 15 min | **Gestion des incidents** — détection, communication, résolution, post-mortem, blameless culture | Cours |
| 20 min | **Exercice 6** — analyse d'un post-mortem réel (GitHub, Cloudflare...) | Groupes + restitution |
| 15 min | **Gouvernance** — change management, CAB, ITIL survol, séparation des rôles, compliance | Cours |
| 30 min | **TP final** — compléter un pipeline GitHub Actions (build + test + deploy simulé) | TP guidé |
| 15 min | **Retour sur leur projet** — qu'est-ce qu'ils changeraient maintenant ? Quick wins ? | Echange |
| 10 min | **Synthèse des 2 jours** — récap, ressources pour aller plus loin | Cours |
| 5 min | **Mot de fin** | |

> Total effectif : 170 min + 20 min pause = 190 min (marge ~20 min)

---

## Matériel à préparer

| Elément | Description | Priorité |
|---------|-------------|----------|
| Repo pré-préparé | Petite app web avec tests manquants + pipeline à compléter | Haute |
| Slides (slidev) | Présentation pour les 4 demi-journées | Haute |
| Exercices 1-6 | Enoncés détaillés pour chaque exercice | Haute |
| Post-mortems | 2-3 post-mortems publics sélectionnés et annotés | Moyenne |
| Dashboard exemple | Screenshot ou dashboard simulé pour l'exercice 5 | Moyenne |
| QCM | Questions d'évaluation (à préparer après les slides) | Après cours |
