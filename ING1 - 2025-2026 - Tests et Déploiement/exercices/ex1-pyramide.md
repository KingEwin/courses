# Exercice 1 — Pyramide des tests

- **Demi-journée** : DJ1 — fin du bloc 1 (stratégie de test)
- **Durée** : 15 min (5 min consigne / 8 min travail / 2 min restitution)
- **Format** : 🚪 Breakout rooms — groupes de 3-4
- **Livrable** : tableau partagé (chat ou doc collaboratif) avec la classification

## Objectif

Savoir distinguer les niveaux de la pyramide (unitaire / intégration / E2E) et identifier les **trous** d'une stratégie de test.

## Énoncé

### Partie A — Classer (8 min)

Pour chaque scénario ci-dessous, indiquer :
- Le **niveau de test** approprié (unitaire / intégration / E2E)
- Une **justification courte** (1 phrase max)

1. Vérifier que la fonction `computeFee(base, discount)` retourne le bon montant pour 5 cas
2. Vérifier que `POST /api/events/:id/register` renvoie `409` quand l'événement est complet
3. Valider qu'un utilisateur peut se connecter, naviguer vers son tableau de bord et déclencher une inscription
4. Vérifier que `isValidEmail()` rejette les chaînes sans `@`
5. Vérifier qu'une migration SQL ajoute bien la colonne `paid` sans casser les rows existantes
6. Tester que le composant `<RegistrationButton>` se désactive quand `event.full === true` (RTL)
7. Vérifier que le webhook Stripe → notre API → DB enregistre bien la transaction
8. Vérifier que la barre de navigation reste visible sur mobile (responsive)

### Partie B — Identifier les trous (5 min)

Une équipe a la stratégie de test suivante pour une app de paiement :

> "On a 95% de couverture unitaire sur le service `Payment`. Pas de tests d'intégration car on a confiance dans nos mocks. On lance Cypress une fois par mois sur le staging pour vérifier que le tunnel d'achat fonctionne."

Identifier **2 risques majeurs** et proposer **1 amélioration concrète**.

## Restitution

Un groupe au hasard partage son tableau ; les autres ajoutent leurs désaccords dans le chat.

## Indices

- "Logique pure et déterministe" → unitaire
- "Plusieurs composants qui collaborent" → intégration
- "Parcours utilisateur traversant plusieurs écrans" → E2E
- Une stratégie sans intégration laisse passer les **bugs aux frontières** (DB, HTTP, sérialisation)
