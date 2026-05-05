# Exercice 3 — Tests d'intégration API (Supertest)

- **Demi-journée** : DJ2 — bloc 1 (tests d'intégration)
- **Durée** : 20 min (3 min consigne / 15 min travail / 2 min restitution)
- **Format** : 🚪 Breakout rooms — binômes, partage d'écran obligatoire
- **Livrable** : `tests/integration/events.api.test.ts` avec les 2 `it.todo` complétés et `npm run test:integration` au vert

## Objectif

Écrire des tests d'intégration sur une API REST avec **Supertest** + **Express**, en couvrant les **chemins d'erreur** (404, 409) et pas uniquement le happy path.

## Mise en place

```bash
cd tp-repo
npm run test:integration
# Le test happy path passe ; les 2 it.todo apparaissent en jaune
```

Ouvrir `tests/integration/events.api.test.ts`.

## Énoncé

Compléter les **2 tests** marqués `it.todo` :

1. **`returns 404 when the event does not exist`**
   - `POST /api/events/does-not-exist/register` avec un payload valide
   - Attendre `status === 404` et `body === { error: 'event_not_found' }`

2. **`returns 409 when the event is full`**
   - `POST /api/events/trail-chamonix/register` (événement seedé comme complet)
   - Attendre `status === 409` et `body === { error: 'event_full' }`

## Critères de réussite

- ✅ `npm run test:integration` → 3 tests verts
- ✅ Chaque test crée sa propre app via `makeApp(okPayment)` (isolation)
- ✅ Vérifier **status ET body** (pas juste le status)

## Indices

```ts
const res = await request(app)
  .post('/api/events/does-not-exist/register')
  .send({ email: 'alice@example.com', amountCents: 5000 });
expect(res.status).toBe(404);
expect(res.body).toEqual({ error: 'event_not_found' });
```

## Question de réflexion (1 min en restitution)

Pourquoi recréer une app/db à chaque test plutôt que de la partager ? Quel risque évite-t-on ?

→ Réponse attendue : **isolation** — si un test modifie la DB, les suivants ne doivent pas en dépendre. Sinon ordre de test = résultat différent = flaky.
