# Exercice 5 — Analyse de dashboard

**Durée** : 15 min (10 min analyse + 5 min restitution) | **Format** : groupes | **Livrable** : anomalies identifiées + règle d'alerte

---

## Contexte

Vous êtes l'équipe on-call de **SportScore** (app de scoring live). C'est samedi, jour de tournoi inter-établissements. Votre dashboard de monitoring affiche les données ci-dessous pour les dernières 24 heures.

---

## Données du dashboard

### Signal 1 — Trafic (requêtes HTTP / minute)

| Heure | Req/min |
|-------|---------|
| 00:00 | 12 |
| 06:00 | 8 |
| 08:00 | 15 |
| 10:00 | 45 |
| 12:00 | 80 |
| 14:00 | 320 |
| **14:30** | **1 850** |
| **15:00** | **2 100** |
| 15:30 | 450 |
| 16:00 | 380 |
| 18:00 | 120 |
| 20:00 | 25 |

### Signal 2 — Taux d'erreur HTTP (%)

| Heure | Erreur % |
|-------|----------|
| 00:00 – 13:59 | 0.5% |
| 14:00 | 1.2% |
| **14:30** | **12.5%** |
| **15:00** | **18.3%** |
| 15:30 | 3.1% |
| 16:00+ | 0.8% |

### Signal 3 — Latence P95 (ms)

| Heure | P95 (ms) |
|-------|----------|
| 00:00 – 13:59 | 180 |
| 14:00 | 250 |
| **14:30** | **3 200** |
| **15:00** | **4 500** |
| 15:30 | 600 |
| 16:00+ | 200 |

### Signal 4 — Saturation CPU (%)

| Heure | CPU % |
|-------|-------|
| 00:00 – 13:59 | 15-25% |
| 14:00 | 45% |
| **14:30** | **89%** |
| **15:00** | **94%** |
| 15:30 | 55% |
| 16:00+ | 20% |

---

## Questions

### 1. Identifiez les anomalies

Quelles anomalies observez-vous ? À quelle heure ? Quels signaux sont impactés ?

### 2. Corrélation

Quelle est la cause probable de ces anomalies ? Expliquez la chaîne de causalité entre les 4 signaux.

### 3. Rédigez une règle d'alerte

Choisissez le signal le plus pertinent pour détecter ce type de problème et rédigez une règle d'alerte complète :

| Champ | Votre réponse |
|-------|---------------|
| **Signal surveillé** | |
| **Condition** | (ex: "taux d'erreur > X% pendant Y minutes") |
| **Fenêtre de temps** | |
| **Sévérité** | (info / warning / critical) |
| **Action déclenchée** | (qui est notifié, que fait-on) |

### 4. Faux positifs

Un collègue propose d'alerter sur "trafic > 1000 req/min". Pourquoi cette règle serait-elle problématique un jour de tournoi ? Proposez une meilleure alternative.
