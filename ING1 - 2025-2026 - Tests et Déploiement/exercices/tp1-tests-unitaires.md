# TP1 — Tests unitaires Jest + TypeScript

- **Demi-journée** : DJ1 — bloc 2 (tests unitaires Jest)
- **Durée** : 40 min (5 min setup / 30 min travail / 5 min restitution)
- **Format** : 🚪 Breakout rooms — binômes, partage d'écran obligatoire
- **Livrable** : 5 `it.todo` complétés + `npm run test:unit` 100% au vert + lecture rapide du rapport de couverture

> Ce TP **remplace** l'exercice ex2 court. Il couvre l'écriture de tests unitaires de bout en bout : matchers, mocking, async/rejects, vérification des effets de bord, lecture de couverture.

## Objectifs

À la fin du TP vous saurez :

- Écrire des assertions Jest avec les bons matchers (`toBe`, `toThrow`, `rejects.toThrow`)
- Mocker une dépendance externe avec `jest.fn()` + `mockResolvedValue`
- Vérifier les **effets de bord** (compteur incrémenté, état préservé en cas d'erreur)
- Lire un rapport de couverture et identifier les zones non couvertes

## Prérequis

```bash
cd tp-repo
npm install
npm run test:unit
# → 5 tests it.todo apparaissent en jaune (skipped)
# → 3 tests existants sont au vert
```

Ouvrir dans l'IDE :
- `tests/unit/events.service.test.ts` — fichier à compléter
- `tests/unit/validation.test.ts` — **exemple de référence** à imiter
- `src/services/events.service.ts` — code à tester (inutile de le modifier)

---

## Partie A — Lecture (8 min)

### A.1 — `throws EventNotFoundError for an unknown id`

Tester que `service.get('does-not-exist')` lève `EventNotFoundError`.

**Indices** :
```ts
expect(() => service.get('does-not-exist')).toThrow(EventNotFoundError);
```

**Critères** :
- ✅ Utilise `toThrow` avec la **classe** d'erreur (pas le message)

---

## Partie B — Happy path inscription (12 min)

### B.1 — `charges the payment gateway with email and amount`

Vérifier que `registerParticipant('marathon-paris', 'alice@example.com', 5000)` :
1. Appelle `charge` avec les bons arguments
2. Retourne le `transactionId` du paiement

**Indices** :
```ts
const charge = jest.fn().mockResolvedValue({ success: true, transactionId: 'tx_123' });
const service = setup({ charge });

const result = await service.registerParticipant('marathon-paris', 'alice@example.com', 5000);

expect(charge).toHaveBeenCalledWith('alice@example.com', 5000);
expect(charge).toHaveBeenCalledTimes(1);
expect(result.transactionId).toBe('tx_123');
```

### B.2 — `increments the registered count after a successful registration`

Vérifier que **après** une inscription réussie sur `marathon-paris`, le compteur `registered` est passé de `0` à `1`.

**Indices** :
- Lire l'état avant : `service.get('marathon-paris').registered`
- Faire l'inscription
- Lire l'état après et asserter

---

## Partie C — Chemins d'erreur (12 min)

### C.1 — `throws PaymentFailedError when the gateway returns success=false`

Quand la passerelle retourne `{ success: false, error: 'card_declined' }`, l'inscription doit lever `PaymentFailedError`.

**Indices** :
```ts
const charge = jest.fn().mockResolvedValue({ success: false, error: 'card_declined' });
const service = setup({ charge });
await expect(
  service.registerParticipant('marathon-paris', 'alice@example.com', 5000)
).rejects.toThrow(PaymentFailedError);
```

### C.2 — `does not increment registered count when payment fails`

Vérifier que **après un échec de paiement**, le compteur `registered` est **resté à 0**. C'est le test le plus important : il vérifie qu'on ne corrompt pas l'état en cas d'erreur.

**Indices** :
- Mémoriser le compteur avant
- Faire l'appel qui doit échouer (entouré d'un `await expect(...).rejects.toThrow(...)`)
- Vérifier que le compteur après est **identique** à avant

---

## Partie D — Couverture (5 min)

```bash
npm run test:coverage
```

Ouvrir `coverage/lcov-report/index.html` dans le navigateur.

**Questions** (à discuter en restitution) :

1. Quelle est la couverture **lignes** sur `src/services/events.service.ts` ?
2. Quelle est la couverture **branches** ? Pourquoi est-elle plus pertinente ici ?
3. Y a-t-il une ligne de `events.service.ts` **non couverte** ? Si oui, quel test faudrait-il ajouter ?
4. La couverture du fichier `payment.gateway.ts` est très basse. Est-ce un problème ?
   → *Réponse : non, c'est un wrapper d'une lib externe destiné à être mocké en test, pas testé directement.*

---

## Critères de réussite globaux

- ✅ `npm run test:unit` → 8 tests verts (3 existants + 5 complétés)
- ✅ Aucun `it.todo` restant
- ✅ Tests respectent **AAA** (Arrange / Act / Assert visuellement séparés)
- ✅ Mocks utilisent `jest.fn()` + `.mockResolvedValue` ou `.mockRejectedValue`
- ✅ Couverture branches > 80% sur `events.service.ts`

## Checkpoints (rythme indicatif)

| Temps | Vous devriez en être là |
|-------|-------------------------|
| 10 min | Setup OK + Partie A terminée (1 test vert) |
| 22 min | Partie B terminée (3 tests verts) |
| 32 min | Partie C terminée (5 tests verts) |
| 40 min | Couverture lue + questions D discutées |

## Anti-patterns à éviter

❌ **Tester l'implémentation, pas le comportement** : ne pas vérifier qu'on a appelé `db.prepare(...)` — vérifier l'effet observable (compteur, exception, retour).

❌ **Oublier `await` sur les promesses** : `expect(service.register(...)).rejects.toThrow(...)` sans `await` → le test passe à tort.

❌ **Partager une DB entre tests** : chaque test crée la sienne via `setup()`. Sinon ordre des tests = résultats différents.

❌ **Asserter uniquement l'erreur, pas l'état** : un test qui dit "ça lève une erreur" sans vérifier que l'état n'a pas été corrompu rate la moitié de l'intérêt du test.

## Bonus (si terminé en avance)

1. **Test paramétré** : avec `it.each`, écrire un seul test qui vérifie que les 3 IDs `marathon-paris`, `trail-chamonix`, `semi-lyon` retournent bien un événement avec un `name` non vide.

2. **Mock partiel** : utiliser `jest.spyOn(service, 'get')` pour vérifier que `registerParticipant` appelle bien `get()` une fois — sans changer son comportement (`mockReturnThrough()` n'existe pas, utiliser `.mockImplementation` ou pas de mock du tout, juste un spy).

3. **Tester l'isolation** : exécuter `npm run test:unit -- --runInBand` puis `npm run test:unit` et vérifier que les résultats sont identiques même en parallèle. Pourquoi ? (→ chaque test crée sa propre DB in-memory)
