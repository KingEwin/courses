# Exercice 3 — Pipeline CI/CD

**Durée** : 20 min | **Format** : groupes | **Livrable** : schéma corrigé + quality gates + stratégie de rollback

---

## Partie A — Dessiner le pipeline idéal

### Contexte

Vous êtes une équipe de **3 développeurs** travaillant sur une application web (API + frontend). Vous faites des **releases hebdomadaires** chaque mercredi. Vous avez deux environnements : **staging** et **production**.

**Consigne** : dessinez (sur papier ou tableau) le pipeline CI/CD complet, du commit à la production. Listez chaque étape et précisez :
- Ce que l'étape fait
- Ce qui bloque le passage à l'étape suivante (quality gate)
- Qui est responsable (automatique ou humain)

---

## Partie B — Corrigez ce pipeline

Voici le pipeline actuellement en place dans l'équipe. Il a **plusieurs problèmes** — à vous de les identifier et les corriger.

```
Pipeline actuel :

  1. Le développeur pousse son code sur main
  2. GitHub Actions se déclenche
  3. Installation des dépendances (npm ci)
  4. Build de l'application
  5. Déploiement en production
  6. L'équipe vérifie manuellement le lendemain
```

### Questions

1. **Identifiez au moins 4 problèmes** dans ce pipeline.

2. **Ajoutez 2 quality gates** indispensables. Pour chaque gate, précisez :
   - À quel moment du pipeline elle se situe
   - Ce qu'elle vérifie
   - Ce qui se passe si elle échoue

3. **Définissez une stratégie de rollback** : que faites-vous si le déploiement cause un problème en production ? Décrivez les étapes concrètes.

---

## Aide-mémoire

Étapes possibles dans un pipeline (non exhaustif) :
- Checkout, Install, Lint, Build
- Tests unitaires, Tests intégration, Tests E2E
- Analyse de sécurité (SAST, dependency scan)
- Déploiement staging, Tests de fumée, Validation
- Déploiement production, Health check, Monitoring
- Notification, Rollback
