# Exercice 2 — Mini plan de recette

**Durée** : 20 min (10 min solo + 10 min mise en commun) | **Format** : solo puis groupe | **Livrable** : plan de recette rempli

---

## Contexte

**UniSport** est la plateforme d'événements sportifs utilisée par 5 établissements scolaires. Une nouvelle fonctionnalité vient d'être développée : **l'inscription en ligne à un événement sportif**.

### Parcours utilisateur

1. L'étudiant se connecte à la plateforme
2. Il consulte le catalogue d'événements disponibles
3. Il sélectionne un événement et clique sur "S'inscrire"
4. Il remplit le formulaire : nom, école, email
5. Il confirme son inscription
6. Il reçoit un email de confirmation

### Contraintes métier

- Maximum **30 participants** par événement
- Les inscriptions ferment **48h avant** la date de l'événement
- **Une seule inscription** par étudiant et par événement (vérification sur l'email)
- Les événements marqués "complet" ne doivent plus proposer le bouton d'inscription

---

## À produire

### 1. Cas de test prioritaires (5 minimum)

| ID | Description | Précondition | Étapes | Résultat attendu | Priorité |
|----|-------------|--------------|--------|-------------------|----------|
| REC-01 | | | | | |
| REC-02 | | | | | |
| REC-03 | | | | | |
| REC-04 | | | | | |
| REC-05 | | | | | |

> **Conseil** : couvrez le chemin nominal ET au moins 2 cas d'erreur. Les résultats attendus doivent être observables et vérifiables (pas "ça marche").

### 2. Critères d'acceptation (3 minimum, format Given/When/Then)

Exemple :
> **Given** un événement avec 29/30 participants
> **When** un nouvel étudiant s'inscrit
> **Then** l'inscription est acceptée et le compteur passe à 30/30

- Critère 1 : ...
- Critère 2 : ...
- Critère 3 : ...

### 3. Risques et mitigation (2 minimum)

| Risque | Probabilité | Impact | Plan de mitigation |
|--------|-------------|--------|--------------------|
| | | | |
| | | | |

### 4. Décision Go / No-Go

Sur la base de vos cas de test et risques, formulez les conditions pour donner un **Go** à la mise en production de cette fonctionnalité. Quels critères doivent absolument être remplis ?
