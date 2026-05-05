# Sélection de TPs pour la revue collective J2

Analyse de 13 rendus CineTrack pour préparer la séance de revue collective du J2 (matin, 1h10).

## Méthode

Critères d'évaluation alignés sur le contenu du J2 :

- **Store** : Zustand utilisé, typé, sélecteurs ciblés, actions claires
- **Architecture** : découpage feature/type, séparation présentation/logique, taille des composants
- **Propreté** : TypeScript discipliné, nommage, fichiers raisonnables

## Vue d'ensemble (13 rendus)

| Étudiant | Store | Archi | Propreté | Plus gros composant | Note |
|---|:---:|:---:|:---:|:---:|---|
| dorian_didomenico | — | — | — | — | 🚫 dossier vide (.next seul) |
| dylan_aurojo_lopes | ⭐⭐ | ⭐⭐ | ⭐⭐ | 215 | Pas de Zustand, composants longs |
| enzo_daloia | ⭐ | ⭐⭐ | ⭐⭐⭐ | 84 | Pas de store, intégration API |
| erwan_kaczmareck | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 269 | Bon store, mais page géante |
| fabio_voliani | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 228 | Context + Reducer, hooks bien faits |
| **florent_dacunto** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 109 | **TP n°2 — intermédiaire** |
| janick_lazasoa | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 256 | Zustand minimal, hook TMDB custom |
| lucas_bianciotto | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 197 | Zustand propre, TanStack Form |
| lucas_da_silveira | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 268 | Zustand + Prisma + auth |
| **lucas_viola** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 187 | **TP n°1 — solide** |
| mathys_nourry | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 302 | Zustand + Prisma + auth, riche |
| **rayane_boudaoudi** | ⭐ | ⭐⭐ | ⭐⭐ | 458 | **TP n°3 — à améliorer** |
| xavier_trouche | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 475 | Pas de store, types excellents, page géante |

> 5 ont utilisé Zustand correctement, 1 a utilisé Context+Reducer, 6 sont restés sur du `useState` local. 3 ont une page > 250 lignes.

---

## TP n°1 — `lucas_viola` (rendu solide)

> **Objectif pédagogique** : montrer ce qu'on cherche à reproduire — store minimal, séparation propre, composants courts.

### Fichiers à projeter

- `src/store/movieStore.ts` (33 lignes)
- `src/app/page.tsx` (~50 lignes)
- `src/components/MovieList.tsx` + `MovieForm.tsx` + `MovieCard.tsx`

### ✅ Bon

- **Store Zustand minimal et typé** : 5 actions seulement (`addMovie`, `updateMovie`, `deleteMovie`, `getMovieById`), aucune logique UI dedans
- **Page `page.tsx` ≈ 50 lignes** — purement orchestrateur, délègue à 3-4 composants enfants
- **Composants tous < 100 lignes** (sauf shadcn/ui, normal)
- **Types stricts** : `Movie` et `MovieInput` séparés (input ≠ entité), aucun `any`
- **Naming clair** : `useMovieStore`, `addMovie`, `getMovieById`
- **Bon réflexe** : `crypto.randomUUID()` pour les IDs (vs `Date.now()` ailleurs)
- **shadcn/ui** intégré proprement → composants UI réutilisables et accessibles

### ⚠️ Pas si bon (points pour la discussion)

- **Découpage par type** (`components/`, `store/`, `types/`) — fonctionne ici parce que l'app est petite, mais ne scale pas. Bonne occasion de transition vers le découpage par feature qu'on verra l'après-midi.
- **Pas de custom hook** — c'est le bon choix vu la simplicité, mais à mentionner : "ce n'est pas obligatoire d'avoir des hooks pour avoir une bonne archi"
- **Initial movies en dur dans le store** — OK pour un J1 sans backend, mais à pointer comme "ce qu'on va remplacer avec React Query cet après-midi"

### 🔍 Autre / à souligner

- À utiliser comme **gabarit mental** pour la suite : "quand vous écrivez un store, regardez ce store-là, pas un store de 200 lignes"
- Inviter les autres élèves : "qu'est-ce qui vous frappe en lisant ce store ?" → laisser émerger "il est court", "il fait juste ce qu'il faut"

---

## TP n°2 — `florent_dacunto` (rendu intermédiaire)

> **Objectif pédagogique** : déclencher un débat sur les zones grises — quelle frontière entre store et state local ?

### Fichiers à projeter

- `src/app/hooks/use-cine-store.ts` (98 lignes)
- `src/app/page.tsx` (109 lignes)
- `src/app/components/AddCard.tsx`
- `src/app/constants/labels.ts`

### ✅ Bon

- **Zustand bien typé** avec interface `CineStore` complète
- **Découpage modulaire** : `components/`, `hooks/`, `models/`, `types/`, `constants/`, `data/` — un effort de structuration visible
- **`constants/labels.ts`** : mapping enum → label séparé du reste → bonne pratique i18n-ready
- **Types unions** : `FilterType`, `FilterValue`, `Status` — typage solide
- **Distinction `items` / `visibleItems`** : computed state pour les filtres → idée intéressante
- **Page de 109 lignes** : c'est lisible, dans la cible

### ⚠️ Pas si bon (points pour la discussion)

- **🟠 Le store mélange data ET UI state** : `isAdding`, `isFilterOpen`, `filterBy`, `filterValue` cohabitent avec `items`
  - **Question à poser à la classe** : "est-ce que `isAdding` (modal ouverte ou pas) doit être dans le store global ?"
  - Réponse attendue : non, c'est du state UI éphémère, ça vit dans le composant
  - C'est pile l'anti-pattern n°1 vu le matin (store fourre-tout)
- **Nommage hook trompeur** : le fichier s'appelle `use-cine-store.ts` mais c'est un store, pas un hook custom. Ambiguïté à clarifier.
- **Sélecteurs inline dans la page** : `useCineStore((s) => s.items)` × N fois → opportunité de montrer comment extraire un custom hook `useCineItems()`

### 🔍 Autre / à souligner

- Excellent terrain pour le **live refactor** d'extraction de UI state hors du store
- Demander aux élèves : "qui a fait pareil dans son TP ?" → main levée probable
- Conclusion : "ce TP est très bien parti, il manque juste le tri local/global qu'on a vu ce matin"

---

## TP n°3 — `rayane_boudaoudi` (rendu à améliorer)

> **Objectif pédagogique** : illustrer concrètement les anti-patterns vus le matin (page géante, prop drilling, store ignoré). Bienveillance maximale.

### Fichiers à projeter

- `src/app/page.tsx` (**458 lignes** — c'est le point d'accroche)
- `src/components/posters/PosterCard.tsx` (138 lignes)
- `src/components/posters/PosterForm.tsx` (172 lignes)
- `src/lib/posters-store.ts` (faux store — wrapper localStorage)

### ✅ Bon (à valoriser d'abord)

- **Effort fonctionnel important** : export/import JSON, "roulette random movie", animations Framer Motion → ambition produit réelle
- **TypeScript propre** : `MoviePoster`, `WatchStatus` bien définis
- **Naming clair** : `filteredPosters`, `sortedPosters`, `loadPosters` — l'intention est lisible
- **UI travaillée** : Framer Motion, modal personnalisée, composants `Button`/`Modal` extraits dans `ui/`
- **Découpage `components/posters/` vs `components/ui/`** : début de séparation par domaine

### ❌ Pas bon (cœur de la revue)

- **🚨 `page.tsx` = 458 lignes** : tout est dedans (filtres, tri, modal, CRUD, toast, layout)
- **🚨 Pas de Zustand** alors que le TP en demandait un (mention dans `package.json` mais pas utilisé)
- **🚨 15+ `useState` empilés** dans `page.tsx` (lignes 35-50) :
  ```tsx
  const [posters, setPosters] = useState<MoviePoster[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(...);
  const [decade, setDecade] = useState(...);
  // ... 10+ autres
  ```
  → c'est exactement le signal qu'un store devient nécessaire
- **🚨 Prop drilling massif** : `onEdit`, `onDelete`, `onStatusChange` créés dans la page, passés à 3-4 niveaux
- **🚨 Logique métier dans le composant** : `filteredPosters` et `sortedPosters` (40 lignes de useMemo) devraient vivre dans un sélecteur ou un hook
- **`lib/posters-store.ts` est un wrapper localStorage**, pas un state manager → confusion "store" vs "persistance"

### 🔍 Autre / à souligner

- **Cadre absolument bienveillant** : ce code marche, l'élève a beaucoup donné
- **Présenter comme un cas d'école** : "ce TP nous offre un terrain idéal pour pratiquer le refactor"
- **Live refactor mental** (5 min) à proposer en classe :
  1. Sortir les 15 `useState` dans un Zustand `usePostersStore`
  2. Extraire `filteredPosters` / `sortedPosters` en sélecteurs computed
  3. Créer `usePosterFilters()` custom hook pour la logique
  4. Réduire `page.tsx` de 458 → ~80 lignes
- **Demander à la classe** : "qui a une `page.tsx` qui ressemble à ça ?" → mains levées probables → "OK, voici comment on en sort"

---

## Anonymisation avant la séance

⚠️ **À faire impérativement** avant de projeter :

- [ ] Renommer les dossiers (`tp-1/`, `tp-2/`, `tp-3/`) — ne jamais montrer le nom des élèves
- [ ] Vérifier les `README.md` et `package.json` (champs `author`, `name`)
- [ ] Vérifier les commits Git si projetés (cacher l'historique ou repartir d'un commit propre)
- [ ] Fermer les onglets parasites de l'IDE (autres élèves visibles dans la barre latérale)

## Timing indicatif (1h10 total)

| Bloc | Durée | TP |
|---|:---:|---|
| Cadre + grille | 10 min | — |
| Revue n°1 | 15 min | lucas_viola (anonymisé) |
| Revue n°2 | 15 min | florent_dacunto (anonymisé) |
| Revue n°3 | 15 min | rayane_boudaoudi (anonymisé) |
| Synthèse + top 5 | 15 min | transverse |
