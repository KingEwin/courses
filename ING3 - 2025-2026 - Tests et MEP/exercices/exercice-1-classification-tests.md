# Exercice 1 — Classification de scénarios de test

**Durée** : 15 min | **Format** : groupes de 4 | **Livrable** : tableau + restitution orale (3 min)

---

## Contexte

Vous travaillez sur **SportEvents**, une application web permettant d'organiser des événements sportifs inter-établissements. L'app propose : un catalogue d'événements, un formulaire d'inscription, un espace de gestion pour les organisateurs, et des notifications par email.

---

## Partie A — Classez les 10 scénarios

Pour chaque scénario, indiquez son type de test : **Unitaire**, **Intégration**, **E2E** ou **Exploratoire**. Justifiez votre choix en une phrase.

| # | Scénario | Type | Justification |
|---|----------|------|---------------|
| 1 | Vérifier que `calculateRegistrationFee()` retourne 0 pour les événements gratuits | | |
| 2 | Vérifier que l'API POST `/register` retourne 400 quand le nom est vide | | |
| 3 | Un utilisateur s'inscrit à un événement, reçoit un email de confirmation, et retrouve l'événement dans son espace personnel | | |
| 4 | Naviguer dans l'app comme un nouvel utilisateur et tenter de casser le formulaire d'inscription | | |
| 5 | Vérifier que `isEventFull()` retourne `true` quand le nombre de participants atteint le maximum | | |
| 6 | Vérifier que l'API écrit correctement un participant en base et que le GET retourne le participant ajouté | | |
| 7 | Vérifier que la page d'inscription s'affiche correctement sur mobile (viewport 375px) | | |
| 8 | Que se passe-t-il si deux utilisateurs s'inscrivent en même temps pour la dernière place ? | | |
| 9 | Vérifier que `formatEventDate()` gère correctement les fuseaux horaires | | |
| 10 | Vérifier que l'intégration avec la passerelle de paiement retourne le bon statut après un paiement réussi | | |

---

## Partie B — Analysez la stratégie de test existante

Voici la stratégie de test actuelle de l'équipe SportEvents :

> **Tests en place** :
> - 45 tests unitaires sur la logique métier (calculs, validations)
> - 2 tests E2E : page d'accueil et page de login
> - Couverture de code : 62%
>
> **Ce qui manque** :
> - Aucun test d'intégration (API + base de données)
> - Les tests E2E ne couvrent que le chemin nominal (pas d'erreur)
> - Pas de tests sur les cas limites (événement complet, doublon, timeout)
> - Pas de tests sur les notifications email

**Questions** :

1. Identifiez les **2 trous les plus critiques** dans cette stratégie.
2. Proposez **2 ajustements prioritaires** avec une justification (quel type de test ajouter, sur quoi, et pourquoi c'est prioritaire).
