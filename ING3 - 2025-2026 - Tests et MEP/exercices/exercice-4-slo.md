# Exercice 4 — Définir des SLO réalistes

**Durée** : 15 min | **Format** : groupes | **Livrable** : tableau SLI/SLO + error budget + plan de réaction

---

## Contexte

**SportScore** est une application de scoring en direct pour les tournois sportifs inter-établissements.

### Caractéristiques

- **500 utilisateurs simultanés** les weekends (jours de tournoi)
- **20 utilisateurs** en semaine (consultation du calendrier)
- Fonctionnalités : scores en temps réel (WebSocket), calendrier des événements, inscription des équipes
- Infrastructure : 2 serveurs derrière un load balancer, PostgreSQL, Redis pour le temps réel

### Historique du dernier mois

- 3 incidents :
  - Panne base de données : **15 min** d'indisponibilité
  - Pic de charge non anticipé : **45 min** de dégradation (latence x10)
  - Déploiement raté : **2h** d'indisponibilité partielle
- Latence moyenne : **200 ms** (P50), **800 ms** (P95)
- Taux d'erreur moyen : **2%**
- Disponibilité effective le mois dernier : **99.6%**

---

## À produire

### 1. Choisissez 2 SLI pertinents

Parmi les indicateurs possibles : disponibilité, latence (P50, P95, P99), taux d'erreur, throughput (requêtes/seconde).

| SLI | Ce qu'il mesure | Comment le mesurer techniquement |
|-----|-----------------|----------------------------------|
| SLI 1 : | | |
| SLI 2 : | | |

### 2. Définissez vos SLO (objectifs sur 30 jours)

| SLI | SLO cible | Justification |
|-----|-----------|---------------|
| SLI 1 | | |
| SLI 2 | | |

### 3. Calculez l'error budget

| SLO | Budget d'erreur (%) | Budget en minutes (sur 30 jours = 43 200 min) |
|-----|--------------------|-------------------------------------------------|
| SLO 1 | | |
| SLO 2 | | |

### 4. Réaction si le budget est épuisé

Décrivez ce que l'équipe fait concrètement quand l'error budget est consommé :
- ...

---

## Aide-mémoire — Conversion SLO → downtime

| SLO | Downtime autorisé / mois |
|-----|--------------------------|
| 99% | 7h 12min |
| 99.5% | 3h 36min |
| 99.9% | 43 min |
| 99.95% | 21 min |
| 99.99% | 4 min 19s |
