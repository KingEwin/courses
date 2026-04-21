# Exercice 6 — Analyse de post-mortem

**Durée** : 20 min (12 min analyse + 8 min restitution) | **Format** : groupes | **Livrable** : cause racine + 3 actions correctives

---

## Incident : panne mondiale du service CloudShield

*Adapté d'un incident réel survenu chez un fournisseur de services web en juillet 2019.*

---

### Résumé

Le 2 juillet 2019, le service **CloudShield** (protection et accélération web pour des millions de sites) a subi une panne mondiale de **27 minutes**. Pendant cette période, les sites web protégés par CloudShield renvoyaient des **erreurs 502** à tous leurs visiteurs.

**Impact** :
- Environ **15 millions de sites web** affectés
- Perte estimée à plusieurs dizaines de millions de dollars pour les clients
- Couverture médiatique internationale

---

### Timeline de l'incident

| Heure (UTC) | Événement |
|-------------|-----------|
| 13:42 | L'équipe sécurité déploie une mise à jour d'une règle de filtrage (WAF) sur l'ensemble de l'infrastructure mondiale |
| 13:42:30 | Les dashboards internes montrent une chute brutale du trafic traité |
| 13:43 | Les alertes automatiques se déclenchent : CPU à 100% sur tous les serveurs edge dans toutes les régions |
| 13:45 | L'équipe on-call est notifiée. Premiers signalements clients sur les réseaux sociaux |
| 13:48 | L'équipe identifie que la charge CPU anormale est liée au processus de filtrage WAF |
| 13:52 | Décision de revenir en arrière (rollback) sur la règle déployée à 13:42 |
| 13:55 | Le rollback est initié. Problème : le système de déploiement des règles WAF ne dispose pas d'un mécanisme de rollback automatique |
| 14:00 | L'équipe procède à un rollback manuel, région par région |
| 14:02 | Les premières régions commencent à récupérer |
| 14:09 | Toutes les régions sont revenues à la normale. Le trafic reprend progressivement |
| 14:30 | Confirmation que tous les services fonctionnent normalement |

---

### Détails techniques (simplifiés)

- La règle de filtrage WAF contenait une **expression régulière** particulièrement gourmande en CPU
- Cette expression provoquait un **backtracking excessif** du moteur de regex, consommant 100% du CPU
- La règle a été déployée **simultanément sur toute l'infrastructure mondiale** (pas de déploiement progressif)
- Le processus de filtrage WAF partageait les mêmes ressources CPU que le service de proxy — quand le filtrage saturait le CPU, plus rien ne fonctionnait
- Le mécanisme de déploiement des règles WAF était **différent** de celui du code applicatif et ne disposait pas des mêmes protections (pas de canary, pas de rollback automatique)

---

### Ce que nous savons

- La règle avait été **testée fonctionnellement** (elle bloquait bien les attaques ciblées)
- Elle n'avait **pas été testée en performance** (impact CPU)
- Le déploiement des règles WAF n'avait **pas de procédure de canary** contrairement au code applicatif
- L'équipe sécurité avait l'**autonomie de déployer** les règles sans validation de l'équipe infra

---

## À produire

### 1. Reconstituez les moments clés

Identifiez dans la timeline :
- Le **point de déclenchement** de l'incident
- Le **moment de détection** (combien de temps après le déclenchement ?)
- Le **moment de décision** du rollback
- Le **facteur qui a rallongé** la résolution

### 2. Cause racine vs facteurs aggravants

Distinguez clairement :

| | Description |
|---|---|
| **Cause racine** | (le problème fondamental sans lequel l'incident n'aurait pas eu lieu) |
| **Facteur aggravant 1** | |
| **Facteur aggravant 2** | |
| **Facteur aggravant 3** | |

> **Attention** : "un ingénieur a fait une erreur" n'est PAS une cause racine. Demandez-vous : pourquoi le système a-t-il permis cette erreur ?

### 3. Actions correctives (3 minimum)

Pour chaque action, précisez :

| # | Action | Responsable (rôle) | Délai | Impact attendu |
|---|--------|--------------------|-------|----------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

> Les actions doivent être **mesurables** : pas "améliorer les tests" mais "ajouter un test de performance CPU pour chaque nouvelle règle WAF, exécuté automatiquement avant déploiement".
