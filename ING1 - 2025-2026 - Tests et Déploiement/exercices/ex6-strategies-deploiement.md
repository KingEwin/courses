# Exercice 6 — Choisir une stratégie de déploiement

- **Demi-journée** : DJ3 — bloc 2 (stratégies de déploiement)
- **Durée** : 15 min (3 min consigne / 10 min travail / 2 min restitution)
- **Format** : 🚪 Breakout rooms — groupes de 3-4
- **Livrable** : tableau partagé (3 lignes × 3 colonnes : contexte / stratégie / justification)

## Objectif

Savoir **distinguer** les principales stratégies de déploiement (blue/green, canary, rolling, feature flags) et **choisir** la plus adaptée à un contexte donné.

## Énoncé

Pour chaque contexte ci-dessous :
- Choisir **une** stratégie principale (parmi : blue/green, canary, rolling, feature flags, big bang)
- Justifier en **2 phrases max** (contraintes, risques, bénéfices)

### Contexte A — E-commerce Black Friday

> Site e-commerce qui réalise 40% de son CA annuel le vendredi du Black Friday.
> L'équipe doit déployer un correctif de panier le mardi précédent.
> SLA : zéro downtime, rollback en < 2 min en cas de pépin.

### Contexte B — SaaS B2B avec 3 gros clients

> Plateforme RH B2B, 3 clients représentent 80% du revenu.
> Une nouvelle version du moteur de paie doit être déployée.
> Risque métier élevé (calcul de salaire faux = catastrophe), mais peu d'utilisateurs simultanés.

### Contexte C — App interne RH (1000 collaborateurs)

> Outil interne de gestion des congés, utilisé en horaires de bureau.
> Refonte majeure de l'UI prévue. L'équipe veut activer la nouvelle UI **uniquement pour la team Tech** d'abord, avant un rollout général.

## Critères de réussite

- ✅ Une stratégie cohérente avec les contraintes (pas de "blue/green" partout par défaut)
- ✅ Justification mentionnant **au moins 1 risque** et **1 bénéfice**
- ✅ Distinction claire entre **blue/green** (bascule infra) et **feature flags** (bascule logique)

## Pistes de réponse (à ne pas distribuer avant restitution)

- **A** → **Blue/Green** : besoin de rollback ultra-rapide (switch DNS/load-balancer), zéro downtime confirmé. Canary ok aussi mais plus complexe à orchestrer en 24h.
- **B** → **Canary** ou **déploiement client par client** : limiter le blast radius, valider sur 1 client pilote avant les 2 autres.
- **C** → **Feature flags** : permet de cibler la team Tech via attribut user, rollback instantané sans redéploiement.

## Discussion (si temps en restitution)

Peut-on **combiner** les stratégies ? (ex : blue/green + feature flags)

→ Oui : blue/green sécurise le déploiement infra, les feature flags pilotent l'activation fonctionnelle. Combo classique en prod mature.
