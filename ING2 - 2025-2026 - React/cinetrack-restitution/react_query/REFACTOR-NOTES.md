# React Query — refactor démo

Cette branche montre comment **remplacer un store Zustand chargé de fetch** par **React Query**, en gardant exactement la même UX.

Base de départ : le rendu CineTrack qui mélange Zustand + fetch manuel dans `src/store/items-store.ts` (82 lignes, 4 actions async).

## Diff résumé

| Avant | Après |
|---|---|
| `src/store/items-store.ts` (82 lignes) | ❌ supprimé |
| — | `src/lib/api.ts` (45 lignes) — fonctions plates |
| — | `src/hooks/useItems.ts` (60 lignes) — `useQuery` + `useMutation` |
| — | `src/app/components/QueryProvider.tsx` (25 lignes) |
| `useEffect(() => fetchItems(), [...])` dans `page.tsx` | ❌ supprimé (auto par React Query) |
| `isLoading` du store | `isPending` de `useQuery` |
| `set({ items: ... })` dans chaque action | `invalidateQueries({ queryKey: ['items'] })` |

**Score** : suppression de 82 lignes de plomberie, 1 `useEffect` orphelin en moins, gestion du cache et de la dédup gagnées **gratuitement**.

## Architecture cible

```
src/
├── lib/api.ts                       # fetchers purs, typés
├── hooks/useItems.ts                # useQuery + 4 useMutation + queryKey
└── app/
    ├── components/QueryProvider.tsx # client component (provider)
    ├── layout.tsx                   # wrappe children dans QueryProvider
    └── page.tsx                     # consomme les hooks (plus de useEffect)
```

## Points pédagogiques pour la démo

### 1. Le `useEffect` disparaît

**Avant** :
```ts
useEffect(() => {
  fetchItems();
}, [fetchItems]);
```

**Après** : rien. `useQuery` se déclenche automatiquement au mount du composant.

### 2. La normalisation des dates est isolée

Avant, la même conversion `new Date(...)` était répétée **3 fois** (fetch, add, update).
Maintenant, elle vit dans une seule fonction `parseItem()` à la frontière (`src/lib/api.ts:13`).

### 3. Le `isLoading` manuel devient `isPending`

Avant :
```ts
fetchItems: async () => {
  set({ isLoading: true });
  // ... fetch ...
  set({ items, isLoading: false });
}
```

Après : zéro ligne — `useQuery` calcule `isPending` tout seul.

### 4. Les mutations utilisent l'**invalidation**

Avant : chaque action patche le state à la main avec `set((state) => ...)`.

Après :
```ts
useMutation({
  mutationFn: createItem,
  onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
});
```

→ React Query refetch tout seul. Si 5 composants montrent la liste, ils se mettent tous à jour.

### 5. Le store Zustand est devenu inutile

Le store ne contenait que du **server state** (`items` + `isLoading` + 4 actions de fetch).
React Query gérant le cache, le store n'a plus de raison d'exister → suppression complète.

> **Message à passer aux élèves** : *server state ≠ client state*. Si Zustand devait rester, il ne contiendrait que des données purement client (filtres, modal ouverte, etc. — qui dans ce TP sont déjà en `useState` local).

## Fichiers à projeter pendant le live

Ordre suggéré (split-screen avec le code original côté gauche) :

1. **`src/lib/api.ts`** — "voici les 4 fonctions de fetch isolées, sans React"
2. **`src/hooks/useItems.ts`** — "voici les hooks. Note la `queryKey: ['items']`, c'est l'URL du cache"
3. **`src/app/components/QueryProvider.tsx`** — "le seul prérequis : un provider à la racine"
4. **`src/app/layout.tsx`** — "branché en 2 lignes"
5. **`src/app/page.tsx`** — diff par rapport à l'original :
   - Le bloc `useEffect(fetchItems)` disparaît
   - `isLoading` → `isPending`
   - Les actions sont des hooks, leurs effets sont des `mutate()`
6. **DevTools** : ouvrir l'extension React Query (bouton bas-droit), montrer le cache vivant, déclencher une mutation, voir l'invalidation se faire en temps réel

## Lancer la démo

```bash
cd cinetrack-restitution/react_query
npm install
npm run dev
```

Prérequis : la base SQLite (`dev.db`) doit exister à la racine. Si elle n'est pas là :
```bash
npx prisma migrate dev
```

## À noter pendant le live

- **Anonymisation** : ce projet est dérivé d'un rendu d'élève — le présenter comme "**un rendu type avec une vraie API**", sans nommer l'auteur
- **Auth** : NextAuth est branché → soit logger un user de test, soit commenter temporairement le check `auth()` dans `layout.tsx` pour simplifier la démo
- **TMDB & register** : tous les `fetch` côté JSX ont été migrés (cf. section "Vague 2" plus bas)

---

## Vague 2 — TMDB search & Register

Après la vague 1 (items store), les 2 derniers `fetch` restants côté JSX ont été migrés vers React Query.

### Fichiers ajoutés

| Fichier | Rôle |
|---|---|
| `src/hooks/useTmdbSearch.ts` | `useQuery` dynamique avec `enabled` + `staleTime` |
| `src/hooks/useRegister.ts` | `useMutation` sans invalidation (auth) |
| `src/hooks/useDebouncedValue.ts` | Helper UX — débouncer la valeur saisie avant de la passer à React Query |

### TMDB search (`AddItemModal.tsx`)

**Avant** (~30 lignes de plomberie)
```tsx
const [tmdbResults, setTmdbResults] = useState<TmdbResult[]>([]);
const [tmdbLoading, setTmdbLoading] = useState(false);
const debounceRef = useRef<...>(null);

useEffect(() => {
  if (tmdbQuery.trim().length < 2) { setTmdbResults([]); return; }
  if (debounceRef.current) clearTimeout(debounceRef.current);
  debounceRef.current = setTimeout(async () => {
    setTmdbLoading(true);
    try {
      const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(tmdbQuery)}`);
      const data = await res.json();
      setTmdbResults(data.results ?? []);
    } finally {
      setTmdbLoading(false);
    }
  }, 400);
}, [tmdbQuery]);
```

**Après** (3 lignes)
```tsx
const debouncedQuery = useDebouncedValue(tmdbQuery, 400);
const { data: tmdbResults = [], isFetching: tmdbLoading } =
  useTmdbSearch(debouncedQuery);
```

**Points pédagogiques**
- `queryKey: ['tmdb', debouncedQuery]` : key dynamique → cache automatique par recherche, pas de doublon réseau
- `enabled: trimmed.length >= 2` : la query ne se déclenche que si pertinente
- `staleTime: 5 min` : revenir sur "Inception" 30s plus tard → 0 fetch, résultats déjà en cache
- **React Query ne debounce pas** : c'est de l'UX, pas du cache → le hook `useDebouncedValue` reste explicitement séparé. Bonne occasion de marquer la frontière de responsabilité.
- `useRef` + `setTimeout` + `useEffect` → disparaissent

### Register (`register/page.tsx`)

**Avant**
```tsx
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  const res = await fetch("/api/auth/register", { ... });
  if (!res.ok) {
    let message = "Erreur lors de l'inscription";
    try { message = (await res.json()).error ?? message; } catch {}
    setError(message);
    setLoading(false);
    return;
  }
  await signIn("credentials", { email, password, redirect: false });
  router.push("/");
};
```

**Après**
```tsx
const register = useRegister();
const errorMessage = register.error?.message ?? null;

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register.mutateAsync({ email, password, name });
  } catch {
    return; // error already exposed via register.error
  }
  await signIn("credentials", { email, password, redirect: false });
  router.push("/");
  router.refresh();
};
```

**Points pédagogiques**
- `useMutation` **sans invalidation** : montre que les mutations ne servent pas qu'à invalider du cache. Ici elles encapsulent juste un appel asynchrone.
- L'extraction du message d'erreur côté `registerUser()` (dans `lib/api.ts`) → le composant n'a plus à parser la réponse, il lit `mutation.error.message` directement
- `loading` / `setError` → remplacés par `register.isPending` / `register.error.message`
- `mutateAsync` au lieu de `mutate` car on enchaîne avec `signIn`

### Bilan combiné des 2 vagues

| Métrique | Vague 1 (items) | Vague 2 (tmdb + register) |
|---|---|---|
| Fichiers supprimés | `items-store.ts` (82 L) | — |
| `fetch` côté JSX éliminés | 4 (dans le store) | 2 |
| `useEffect` de fetch éliminés | 1 (dans `page.tsx`) | 1 (dans `AddItemModal`) |
| `useState` de plomberie éliminés | `isLoading` du store | `tmdbResults`, `tmdbLoading`, `loading`, `error` |

**Tous les fetch côté JSX passent désormais par React Query.** Les seuls `fetch()` restants vivent dans `src/lib/api.ts` (couche I/O) et dans la route TMDB serveur (normal).

### Ordre de projection mis à jour pour le live

1. `src/lib/api.ts` — toutes les fonctions fetcher au même endroit
2. `src/hooks/useItems.ts` — exemple `useQuery` + `useMutation` avec invalidation **+ optimistic update** sur `useToggleFavorite`
3. `src/hooks/useTmdbSearch.ts` — exemple `useQuery` dynamique (queryKey + enabled + staleTime)
4. `src/hooks/useRegister.ts` — exemple `useMutation` sans invalidation
5. `src/hooks/useDebouncedValue.ts` — où s'arrête la responsabilité de React Query
6. Diff `AddItemModal.tsx` (avant 30 lignes / après 3) et `register/page.tsx` (avant `loading`/`error` / après `register.isPending`/`register.error`)
7. DevTools React Query — observer les 3 types d'entrées en parallèle (`['items']`, `['tmdb', q]`, mutation register)

---

## Vague 3 — Optimistic update sur le toggle favori

`useToggleFavorite` est désormais un `useMutation` à part entière, avec **optimistic update + rollback automatique**.

### Le diff

**Avant** (mutation simple)
```ts
export function useToggleFavorite() {
  const update = useUpdateItem();
  const qc = useQueryClient();
  return (id) => {
    const items = qc.getQueryData(itemsKey);
    const current = items?.find((i) => i.id === id);
    if (!current) return;
    update.mutate({ id, data: { isFavorite: !current.isFavorite } });
  };
}
```
→ comportement : clic → spinner mental ⏳ → réponse serveur → invalidation → refetch → cœur enfin rempli. Latence visible.

**Après** (optimistic)
```ts
useMutation({
  mutationFn: ({ id, isFavorite }) => patchItem(id, { isFavorite }),
  onMutate: async ({ id, isFavorite }) => {
    await qc.cancelQueries({ queryKey: itemsKey });
    const previous = qc.getQueryData(itemsKey);
    qc.setQueryData(itemsKey, (old) =>
      old?.map((i) => (i.id === id ? { ...i, isFavorite } : i))
    );
    return { previous };
  },
  onError: (_err, _vars, ctx) => {
    if (ctx?.previous) qc.setQueryData(itemsKey, ctx.previous);
  },
  onSettled: () => qc.invalidateQueries({ queryKey: itemsKey }),
});
```
→ comportement : clic → cœur **immédiatement** rempli → réponse serveur → reconciliation silencieuse. Si erreur réseau → cœur revient à son état précédent.

### Le pattern en 4 temps (à projeter pendant le live)

1. **`onMutate`** : on **anticipe** le succès en patchant le cache localement. L'UI réagit en 0 ms.
2. **`onError`** : si ça plante côté serveur, on **rollback** vers le snapshot pris dans `onMutate` (retourné via `ctx`).
3. **`onSettled`** : succès ou échec, on **invalide** la query pour récupérer la vérité serveur (gère les cas où le serveur a transformé la donnée).
4. **`cancelQueries`** : indispensable au début de `onMutate` — sinon un refetch en cours peut écraser notre patch optimiste avec de la donnée stale.

### Comment montrer l'effet en live

Pour que la différence soit visible (sinon le réseau local est trop rapide) :

1. Ouvrir Chrome DevTools → onglet **Network** → throttle "Slow 3G" (ou "Fast 3G")
2. Cliquer sur le cœur **avant** la migration optimiste (sur la branche d'avant) → cœur attend ~2 secondes pour bouger
3. Refaire la même chose sur la version optimiste → cœur **instantané**, et la requête met toujours 2s en arrière-plan (visible dans Network)
4. Bonus rollback : couper temporairement l'API (commenter le `PATCH` dans `route.ts`) → le cœur se remplit puis **revient en arrière** quand la 500 arrive

### Quand utiliser ce pattern

✅ Bon candidat
- Toggle binaire (favori, like, suivi/désuivi)
- Ajout instantané dans une liste (commentaire, message)
- Action très probablement réussie

❌ Mauvais candidat
- Action avec validation serveur complexe (paiement, création unique avec contraintes)
- Donnée critique où afficher un faux état temporairement induit en erreur
- Action irréversible côté UX (suppression définitive sans confirmation)

### Limite à mentionner aux élèves

L'optimistic update **promet** un résultat avant qu'il soit acquis. Si la promesse est rompue, l'utilisateur voit un retour en arrière. À doser : 95% de succès → super UX. 30% de succès → catastrophe.
