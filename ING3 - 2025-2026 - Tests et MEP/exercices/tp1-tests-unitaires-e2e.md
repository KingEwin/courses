# TP1 — Tests unitaires + E2E

**Durée** : 45 min | **Format** : binômes | **Livrable** : tests verts + courte explication des choix

---

## Prérequis

- **Node.js 20+** installé (`node -v` pour vérifier)
- **Git** installé

## Setup

```bash
# 1. Cloner le repo
git clone <URL_DU_REPO> sport-events
cd sport-events

# 2. Installer les dépendances
npm install

# 3. Installer le navigateur pour les tests E2E
npx playwright install --with-deps chromium

# 4. Vérifier que l'app fonctionne
npm start
# Ouvrir http://localhost:3000 dans le navigateur
# Ctrl+C pour arrêter
```

---

## Partie 1 — Test unitaire (20 min)

### Objectif

Compléter le test manquant dans `tests/unit/events.service.test.js`.

### Étapes

1. **Lisez les tests existants** dans le fichier pour comprendre le pattern utilisé (describe, it, expect)

2. **Regardez aussi** `tests/unit/validation.test.js` — c'est un exemple complet de tests unitaires bien écrits

3. **Trouvez le TODO** dans `events.service.test.js` : il s'agit de tester le comportement de `registerParticipant()` quand l'événement n'existe pas

4. **Écrivez le test** en remplaçant le `it.todo(...)` :

   ```javascript
   it('returns an error when the event does not exist', () => {
     // Appelez registerParticipant avec un eventId inexistant (ex: 9999)
     // Vérifiez que result.success === false
     // Vérifiez que result.error === 'Event not found'
   });
   ```

5. **Lancez les tests** :
   ```bash
   npm test
   ```
   Tous les tests doivent passer (plus de "todo").

### Indices

- La fonction `registerParticipant` prend 2 arguments : `eventId` (number) et `participant` (objet avec name, school, email)
- Vous pouvez utiliser n'importe quel participant valide, c'est l'eventId qui compte ici
- Regardez les tests existants pour le format exact des assertions

---

## Partie 2 — Test E2E (25 min)

### Objectif

Écrire un test E2E dans `tests/e2e/registration.spec.js` qui vérifie le parcours d'inscription.

### Étapes

1. **Lisez le test existant** dans `tests/e2e/example.spec.js` pour comprendre le pattern Playwright

2. **Ouvrez** `tests/e2e/registration.spec.js` — vous y trouverez un squelette avec les instructions

3. **Écrivez un test** qui fait le parcours suivant :
   - Aller sur la page d'accueil
   - Sélectionner un événement dans le menu déroulant
   - Remplir le nom, l'école et l'email
   - Cliquer sur le bouton d'inscription
   - Vérifier qu'un message de succès apparaît

4. **Lancez le test** :
   ```bash
   npm run test:e2e
   ```

### Sélecteurs disponibles

| Élément | data-testid |
|---------|-------------|
| Titre de la page | `page-title` |
| Liste des événements | `events-list` |
| Carte d'événement | `event-card` |
| Formulaire | `registration-form` |
| Menu déroulant événement | `event-select` |
| Champ nom | `input-name` |
| Champ école | `input-school` |
| Champ email | `input-email` |
| Bouton inscription | `submit-btn` |
| Zone de message | `message` |

### Rappels Playwright

```javascript
// Naviguer
await page.goto('/');

// Remplir un champ
await page.locator('[data-testid="input-name"]').fill('Mon Nom');

// Sélectionner une option (par valeur)
await page.locator('[data-testid="event-select"]').selectOption('2');

// Cliquer
await page.locator('[data-testid="submit-btn"]').click();

// Vérifier du texte
await expect(page.locator('[data-testid="message"]')).toContainText('Inscription réussie');
```

---

## Checkpoints

| Temps | Vous devriez en être là |
|-------|-------------------------|
| 20 min | Test unitaire écrit et vert |
| 35 min | Test E2E en cours d'écriture |
| 45 min | Les deux tests passent |

## Bonus (si terminé en avance)

Ajoutez un test supplémentaire pour un **cas d'erreur** :
- Tentez d'inscrire quelqu'un à un événement déjà complet (événement 3 dans les données)
- Vérifiez que le message d'erreur s'affiche correctement
