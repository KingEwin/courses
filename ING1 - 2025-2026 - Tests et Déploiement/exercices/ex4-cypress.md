# Exercice 4 — Test E2E Cypress

- **Demi-journée** : DJ2 — bloc 2 (E2E Cypress)
- **Durée** : 20 min (3 min consigne / 15 min travail / 2 min restitution)
- **Format** : 🚪 Breakout rooms — binômes, partage d'écran obligatoire
- **Livrable** : `cypress/e2e/registration.cy.ts` avec le test complété et `npx cypress run` au vert

## Objectif

Écrire un **scénario E2E complet** d'inscription avec Cypress en utilisant les bonnes pratiques : **`data-testid` first**, assertions retry-able, pas de `cy.wait(ms)` arbitraire.

## Mise en place

Dans **deux terminaux** :

```bash
# Terminal 1 — démarre le serveur
cd tp-repo
npm run dev

# Terminal 2 — lance Cypress
cd tp-repo
npm run cypress:open
# OU en headless : npx cypress run --spec cypress/e2e/registration.cy.ts
```

## Énoncé

Compléter le test `inscrit un participant et affiche un message de succès` :

1. Cliquer sur `[data-testid=register-marathon-paris]`
2. Saisir un email valide dans `[data-testid=email-input]`
3. Soumettre via `[data-testid=submit-btn]`
4. Vérifier qu'un message de succès s'affiche avec `[data-testid=success-message]` contenant "confirmée"
5. **Bonus** : vérifier que le compteur d'inscrits a augmenté de 1 après fermeture de la modale

## Critères de réussite

- ✅ Le test passe (`npx cypress run` ou clic dans Cypress UI)
- ✅ Aucun `cy.wait(<nombre>)` — Cypress gère le retry tout seul
- ✅ Sélecteurs uniquement `data-testid`, pas de classes CSS / nth-child
- ✅ Assertions chaînées avec `.should()`, pas de `expect()` en dehors d'un `.then()`

## Indices

```ts
cy.get('[data-testid=register-marathon-paris]').click();
cy.get('[data-testid=email-input]').type('alice@example.com');
cy.get('[data-testid=submit-btn]').click();
cy.get('[data-testid=success-message]').should('contain', 'confirmée');
```

## Anti-patterns à éviter

❌ `cy.wait(2000)` pour attendre l'API → utiliser `cy.intercept()` + `.wait('@alias')` si vraiment nécessaire
❌ `cy.get('.btn-primary')` → fragile, casse au refactor CSS
❌ `cy.get('button').eq(2).click()` → invisible, dépend de l'ordre

## Question de réflexion

À votre avis, **combien** de tests E2E faut-il pour cette app ? Pourquoi pas un test par endpoint ?

→ Réponse attendue : **peu** — E2E couvre les parcours critiques (inscription, paiement). Le reste va en intégration/unitaire (plus rapide, plus stable).
