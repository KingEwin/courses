# Notes — TP CineTrack (ING2 2025-2026)

### alexandre_plouzeau

- **Build** : échec code élève
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Liste (`page.tsx` + `CineCard`), ajout/édition/suppression via `Cineform.tsx` et actions Zustand (`addItem`, `updateItem`, `deleteItem`) ; édition pré-remplie testée en dev sur `/modifier-film?id=3` (Fight Club). |
| 2. Fondamentaux React | 19/20 | UI découpée (9 composants, pages < 55 lignes) ; `key={item.id}` ; props/callbacks propres ; `useEffect` absent mais non requis ; -1 pt : recherche en `useState` local alors que `searchFilter` du store n'est pas utilisé. |
| 3. Store | 11/15 | Zustand typé dans `use-cine-store.ts` (47 lignes) avec actions CRUD et filtres ; fourchette 9–12 : `visibleItems`/`searchFilter` morts, filtres UI dans le store, recherche hors store. |
| 4. Architecture | 11/15 | Arborescence claire (`components/`, `models/`, `types/`, `hooks/`) ; `Cineform.tsx` = 200 lignes (logique CRUD + UI) → 2–3/5 taille ; pages fines. |
| 5. Propreté | 11/15 | TS discipliné (`CineItem`, pas de `any`) ; `console.log` L48 `Cineform.tsx` ; `lib/cards.ts` inutilisé ; build prod échoue : `useSearchParams` sans Suspense sur `modifier-film/page.tsx` → 1/3 cohérence/lint. |
| 6. Style | 4/5 | Thème sombre Tailwind, grille responsive `md:grid-cols-3`, cartes et icônes Lucide ; métadonnées layout encore « Create Next App ». |
| 7. Bonus | 3/10 | Recherche (`SearchBar`) + filtres type/statut (`Filters` + store) : ~3 pts ; pas d'API, persistance, tests ni déploiement. |
| **TOTAL** | **79/100** | |

- **Points forts** : CRUD complet avec Zustand ; découpage composants et types métier ; UI soignée avec filtres/recherche.
- **Axes d'amélioration** : Corriger le build (`<Suspense>` autour de `useSearchParams`) ; retirer code mort (`cards.ts`, champs store inutilisés) ; alléger `Cineform` (hook dédié) ; aligner recherche sur le store ou l'inverse.
- **Flags éventuels** : build prod cassé (page édition) ; `modifier-film/page.tsx` exporte encore `AddFilm`.

### alexis_garibaldi

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + Prisma (SQLite)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3001` (alice) : grille `FilmGrid` + détail ; ajout manuel → compteur Tous (4) ; édition métadonnées pré-remplies → titre « Film Test Modifié » ; suppression confirmée → retour liste Tous (3). |
| 2. Fondamentaux React | 19/20 | ~20 composants, `key={film.id}` / `key={r.tmdbId}` ; props/callbacks (`HomeView`, `FilmCard`) ; `useHydrateFilms` + `useTransition` ; -1 pt : erreur d'hydratation visible (`Clock.tsx` horloge locale). |
| 3. Store | 14/15 | Zustand typé `store/films.ts` (102 lignes) : actions CRUD, filtres, `useFilteredFilms` dans `store/selectors.ts` ; sélecteurs ciblés ; filtres UI dans le store (léger fourre-tout). |
| 4. Architecture | 10/15 | Découpage par type cohérent (`app/actions/`, `store/`, `hooks/`) ; `app/page.tsx` 32 lignes ; `FilmDetailView.tsx` 485 lignes (CRUD détail + modales) → 1–2/5 taille composants. |
| 5. Propreté | 13/15 | TS + types Prisma (`lib/types.ts`), pas de `any` applicatif ; fichier mort `components/DSIntro.bak.tsx` (170 lignes) ; `npm run build` OK. |
| 6. Style | 5/5 | Design system custom (`globals.css`, classes `ds-*`), grille responsive, intro GSAP, carousel communauté. |
| 7. Bonus | 10/10 | TMDB (`lib/tmdb.ts` + route API), Prisma/SQLite, auth login/signup, filtres/recherche/tri, animation GSAP — plafond 10. |
| **TOTAL** | **91/100** | |

- **Points forts** : CRUD complet et testé ; Zustand propre avec sélecteurs mémoïsés ; stack avancée (TMDB, BDD, multi-utilisateurs) au-delà du sujet J1.
- **Axes d'amélioration** : Refactoriser `FilmDetailView.tsx` (sous-composants/hooks) ; supprimer `DSIntro.bak.tsx` ; corriger l'hydratation de `Clock` (render client-only).
- **Flags éventuels** : erreur d'hydratation React en dev (horloge) ; dev sur port 3001 si 3000 occupé.

### aymeric_baud

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Context API (useReducer)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 18/20 | Testé sur `http://localhost:3010` : liste 3 cartes, ajout « Film Test Aymeric », statut → En cours, suppression OK ; -2 pts : édition limitée au statut (`UPDATE_STATUS`), pas de modif titre/note/type. |
| 2. Fondamentaux React | 19/20 | `CineCard`, `AddItemForm`, `CineList` dans `page.tsx` (80 L) ; `key={item.id}` ; props/callbacks propres ; -1 pt : erreur hydratation dev (`new Date()` dans `data/cine-items.ts` + `toLocaleDateString` dans `CineCard`). |
| 3. Store | 8/15 | Context+Reducer `store/cine-store.tsx` (50 L) avec actions typées ADD/DELETE/UPDATE_STATUS et `useCineStore` ; fourchette 6–9 : recherche/filtres en `useState` local hors store. |
| 4. Architecture | 13/15 | Arborescence claire (`components/`, `store/`, `types/`, `models/`, `data/`) ; tous les fichiers < 162 L ; filtres/recherche dans `page.tsx` sans hook → 3/5 séparation présentation/logique. |
| 5. Propreté | 13/15 | TS discipliné (`CineItem`, `MediaType`, `Status`, pas de `any`) ; champ `liked` non utilisé dans l'UI ; bloc CSS commenté dans `globals.css` ; `npm run build` OK. |
| 6. Style | 4/5 | Tailwind (cartes blanches, modal, fond `#ADD0EB`), grille `grid-cols-3` ; métadonnées layout encore « Create Next App ». |
| 7. Bonus | 4/10 | Recherche par titre + filtre note min (`page.tsx` L11–18) : ~4 pts ; pas d'API, persistance, tests ni déploiement. |
| **TOTAL** | **79/100** | |

- **Points forts** : CRUD fonctionnel testé ; store Context+Reducer typé et propre ; projet compact et lisible pour fin de J1.
- **Axes d'amélioration** : Ajouter édition complète (titre, note, type) ; corriger hydratation (dates sérialisées ou rendu client-only) ; déplacer filtres dans le store ou un hook ; exploiter ou retirer `liked`.
- **Flags éventuels** : erreur d'hydratation React en dev (dates) ; aucun

### dylan_aurojo_lopes

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand (persist)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3011` : 3 cartes initiales ; ajout « Film Test Dylan » ; édition pré-remplie → « Film Test Modifié » ; suppression OK (retour à 3) ; changement statut via `<select>` sur carte. |
| 2. Fondamentaux React | 19/20 | 4 composants (`CineCard`, modales, `page.tsx`) ; `key={item.id}` ; props/callbacks propres ; `useEffect` absent mais non requis ; -1 pt : imports morts `Status`, `cineItems` dans `page.tsx` L4–6. |
| 3. Store | 12/15 | Zustand typé `store/CineStore.ts` (81 L) avec `persist`, actions CRUD + `updateStatus` ; fourchette 9–12 : `hasHydrated` (état UI) dans le store, 6 appels `useCineStore` séparés dans `page.tsx`. |
| 4. Architecture | 10/15 | Arborescence claire (`components/`, `store/`, `models/`, `types/`, `data/`) ; `page.tsx` 184 L, `CineCard.tsx` 188 L, `CineCardCreationModal.tsx` 215 L → 2–3/5 taille ; logique d'orchestration (édition/ajout) dans la page. |
| 5. Propreté | 13/15 | TS discipliné (`CineItem`, pas de `any`, pas de `console.log`) ; imports inutilisés `page.tsx` ; styles dupliqués entre modales ; `npm run build` OK. |
| 6. Style | 5/5 | Thème cinéma sombre (`globals.css` : grain, dégradé doré, variables CSS), grille responsive `minmax(300px, 1fr)`, animations `fadeUp`, hover soignés. |
| 7. Bonus | 4/10 | Persistance localStorage via middleware Zustand `persist` (~3 pts) ; animations CSS keyframes (~1 pt) ; pas d'API, filtres, tests ni déploiement. |
| **TOTAL** | **83/100** | |

- **Points forts** : CRUD complet testé ; Zustand avec persist ; identité visuelle soignée et cohérente ; typage métier propre.
- **Axes d'amélioration** : Réduire la taille des composants (extraire header/styles) ; retirer imports morts ; sortir `hasHydrated` du store ou isoler dans un hook ; factoriser les styles des modales.
- **Flags éventuels** : aucun

### dorian_didomenico

- **Build** : non applicable
- **Stack détectée** : aucune (pas de `package.json` ni de code source)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 0/20 | Aucun code source exploitable : dossier `dorian_didomenico/` ne contient qu'un artefact `.next/dev/types/` vide, sans `src/`, `app/` ni composants. |
| 2. Fondamentaux React | 0/20 | Aucun fichier React (`.tsx`/`.jsx`) présent dans le rendu. |
| 3. Store | 0/15 | Aucun store ni state management détectable. |
| 4. Architecture | 0/15 | Pas d'arborescence projet ; seul dossier `.next/` (artefact généré, ignoré). |
| 5. Propreté | 0/15 | Aucun code à évaluer. |
| 6. Style | 0/5 | Aucune UI livrée. |
| 7. Bonus | 0/10 | Aucune fonctionnalité bonus. |
| **TOTAL** | **0/100** | |

- **Points forts** : aucun (rendu vide).
- **Axes d'amélioration** : Soumettre le projet complet (code source, `package.json`, dépendances) et non uniquement le dossier de build `.next/`.
- **Flags éventuels** : rendu vide — aucun code source exploitable

### elias_saadi

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 (useState uniquement, pas de store)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3012` : 3 cartes initiales ; ajout « Nouveau Film » ; édition titre inline → « Film Test Elias Modifié » ; suppression Fast & Furious 1 OK ; statut/note/like modifiables via `<select>`. |
| 2. Fondamentaux React | 19/20 | `page.tsx` (113 L) + `CineCard.tsx` (73 L) ; `key={item.id}` ; props/callbacks typés ; `useEffect` absent mais non requis ; -1 pt : erreur hydratation dev (`new Date()` dans `data/cine-items.ts` + `toLocaleDateString` L23–24 `CineCard.tsx`). |
| 3. Store | 3/15 | Aucun Zustand/Context+Reducer : état centralisé via `useState` dans `page.tsx` L15 ; fourchette 0–4 : fonctions CRUD typées mais pas de store dédié. |
| 4. Architecture | 11/15 | Arborescence claire (`components/`, `models/`, `types/`, `data/`) ; fichiers < 115 L ; logique CRUD (6 handlers) dans `page.tsx` → 3/5 séparation présentation/logique. |
| 5. Propreté | 13/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`/`Liked`, pas de `any`) ; typo UI « Statue » L20 `CineCard.tsx` ; `<select>` statut/like sans `value` initial ; `npm run build` OK. |
| 6. Style | 3/5 | Tailwind basique (bordures, `grid-cols-4`, boutons arrondis) ; dark mode via `prefers-color-scheme` ; pas de design system ni responsive avancé. |
| 7. Bonus | 0/10 | Pas d'API, persistance, filtres, tests ni déploiement. |
| **TOTAL** | **69/100** | |

- **Points forts** : CRUD complet testé ; typage métier propre ; découpage types/models/data cohérent pour fin de J1.
- **Axes d'amélioration** : Introduire un store (Zustand ou Context+Reducer) ; extraire la logique CRUD dans un hook/store ; corriger hydratation (dates sérialisées) ; ajouter `value` aux `<select>` statut/like ; enrichir le style.
- **Flags éventuels** : erreur d'hydratation React en dev (dates) ; aucun

### enzo_daloia

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 (useState uniquement, pas de store)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 18/20 | Liste puis cartes lisibles (`page.tsx` L37-45) ; ajout TMDB via `SearchBar` testé (« The Matrix ») ; -2 pts : édition limitée à la note (`ShowCard.tsx` L34-49, test 8.246→9) ; suppression OK. |
| 2. Fondamentaux React | 19/20 | 3 composants (`ShowCard`, `SearchBar`, `page.tsx` 49 L) ; `key={show.id}` / `key={movie.id}` ; props/callbacks typés sauf `any` TMDB ; `useEffect` absent mais non requis ; -1 pt : `liked` local non synchronisé avec `Show`. |
| 3. Store | 3/15 | Aucun Zustand/Context+Reducer : état centralisé via `useState` dans `page.tsx` L9 ; fourchette 0–4 : handlers CRUD typés mais pas de store dédié. |
| 4. Architecture | 13/15 | Arborescence claire (`components/`, `types/`, `lib/`) ; tous fichiers < 86 L ; 6 handlers CRUD dans `page.tsx` → 3/5 séparation présentation/logique. |
| 5. Propreté | 12.5/15 | Type `Show` défini mais `any` dans `page.tsx` L11 et `SearchBar.tsx` L7-12-44 ; champ `status` jamais exploité dans l'UI ; `console.error` L28 `SearchBar.tsx` ; `npm run build` OK. |
| 6. Style | 4/5 | Tailwind soigné (cartes `rounded-xl shadow-lg`, dropdown recherche sombre, flex-wrap) ; typo titre « CineTrick » vs métadonnées « Cinetrick ». |
| 7. Bonus | 5/10 | Intégration TMDB (`lib/tmdb.ts` + recherche live `SearchBar` avec dropdown affiches) : ~5 pts ; pas de persistance, tests ni déploiement. |
| **TOTAL** | **74.5/100** | |

- **Points forts** : Intégration TMDB fonctionnelle avec recherche live ; CRUD ajout/note/suppression testés ; projet compact et typage métier `Show` ; UI cartes soignée.
- **Axes d'amélioration** : Introduire un store (Zustand ou Context+Reducer) ; édition complète (titre, statut) ; typer les réponses TMDB ; synchroniser `liked`/`status` ou retirer les champs morts.
- **Flags éventuels** : aucun

### erwan_kaczmareck

- **Build** : échec code élève
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + MockAPI

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3013` : 8 cartes + Top 5 ; ajout « Matrix » via TMDB ; édition statut « Terminé » pré-remplie ; suppression Matrix OK. |
| 2. Fondamentaux React | 17/20 | `StarRating.tsx` (24 L) + `page.tsx` (269 L) avec `renderTop5Card`/`renderMediaCard` inline ; `key={media.id}` ; `useEffect` + `fetchMedias` ; -3 pts : UI quasi monolithique (1 composant extrait). |
| 3. Store | 11/15 | Zustand typé `store/useStore.ts` (68 L) : CRUD async MockAPI ; fourchette 9–12 : pas de sélecteurs, `isLoading` UI dans le store, destructuring global dans `page.tsx`. |
| 4. Architecture | 7/15 | Dossiers `store/`, `types/`, `components/` ; `page.tsx` 269 L (filtres TMDB + modales + cartes + Top 5) → 1/5 taille ; logique TMDB et rendu dans la page → 2/5 séparation. |
| 5. Propreté | 10/15 | `Media` sans `posterPath` alors qu'utilisé L49/L79 → build TS échoue ; `any[]` TMDB L21–22 ; import mort `MediaType` L5 ; 4× `console.error` store ; clé API TMDB en dur L8. |
| 6. Style | 5/5 | Thème sombre soigné (dégradé titre, carousel Top 5 `snap-x`, cartes affiches TMDB, modales `backdrop-blur`, responsive `md:`). |
| 7. Bonus | 8/10 | TMDB recherche live (~3 pts) + persistance MockAPI (~3 pts) + section Top 5 triée par note (~2 pts) ; pas de tests ni déploiement. |
| **TOTAL** | **78/100** | |

- **Points forts** : CRUD complet testé avec backend MockAPI ; intégration TMDB fonctionnelle ; Zustand typé avec actions async ; UI cinéma soignée (Top 5, affiches, notes étoiles).
- **Axes d'amélioration** : Corriger le typage (`posterPath` dans `Media`) pour débloquer le build ; extraire cartes/modales en composants ; ajouter sélecteurs Zustand ; déplacer la logique TMDB dans un hook/lib dédié.
- **Flags éventuels** : build prod cassé (erreur TS `posterPath`) ; clé API TMDB en clair dans le code source

### fabio_voliani

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Context API (useReducer)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3014` : 3 cartes initiales ; ajout « Film Test Fabio » ; édition → « Film Test Fabio Modifié » (formulaire + `updateItem`) ; suppression OK (retour à 3). |
| 2. Fondamentaux React | 19/20 | 6 composants + `CineDashboard` (111 L) ; `key={item.id}` ; props/callbacks propres ; `useEffect` hydrate/persist store + sync `useCineForm` ; -1 pt : erreur hydratation dev (`new Date()` dans `data/cine-items.ts` + `toLocaleDateString` L100 `CineCard.tsx`). |
| 3. Store | 9/15 | Context+Reducer `store/cine-store.tsx` (228 L) : CRUD, filtres, tri, `getVisibleItems` ; fourchette 6–9 : pas de sélecteurs ciblés (`useCineStore` expose tout le contexte), état UI `isHydrated` à part. |
| 4. Architecture | 14/15 | Arborescence claire (`components/`, `store/`, `hooks/`, `services/`, `models/`, `types/`) ; logique formulaire dans `useCineForm.ts`, persistance dans `cine-storage.ts` ; tous composants < 150 L ; `page.tsx` 5 L. |
| 5. Propreté | 14/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any` ni `console.log`) ; validation formulaire dans hook ; métadonnées layout encore « Create Next App » ; `npm run build` OK. |
| 6. Style | 5/5 | Tailwind soigné (cartes gradient/hover/shadow, badges type/statut, grille responsive `md:`/`xl:`, layout `max-w-7xl`). |
| 7. Bonus | 6/10 | Persistance localStorage structurée (`services/cine-storage.ts`, ~3 pts) + recherche/filtres statut-type/tri (`CineFilters` + store, ~3 pts) ; pas d'API, tests ni déploiement. |
| **TOTAL** | **87/100** | |

- **Points forts** : CRUD complet testé ; Context+Reducer typé avec filtres/tri intégrés ; architecture lisible (hooks, services, sélecteur `getVisibleItems`) ; UI soignée et responsive.
- **Axes d'amélioration** : Corriger hydratation (dates sérialisées ou rendu client-only) ; ajouter sélecteurs/hooks ciblés pour limiter les re-renders ; mettre à jour les métadonnées `layout.tsx`.
- **Flags éventuels** : erreur d'hydratation React en dev (dates) ; aucun

### florent_dacunto

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 18/20 | Testé sur `http://localhost:3015` : 3 cartes initiales ; ajout « Film Test Florent » ; statut → Vu via `updateStatus` ; suppression OK ; -2 pts : pas d'édition titre/note/type sur carte existante (seul statut modifiable). |
| 2. Fondamentaux React | 19/20 | 6 composants (`CineCard`, `AddCard`, `SearchBar`, UI) + `page.tsx` (110 L) ; `key={item.id}` ; props/callbacks typés ; `useEffect` absent mais non requis ; -1 pt : hydratation dev (`new Date()` dans `data/cine-items.ts`). |
| 3. Store | 10/15 | Zustand typé `hooks/use-cine-store.ts` (97 L) : CRUD, filtres, recherche ; fourchette 9–12 : `isFilterOpen` mort, état UI (`isAdding`) dans le store, 10 sélecteurs `useCineStore` dans `page.tsx`. |
| 4. Architecture | 13/15 | Arborescence claire (`components/`, `hooks/`, `models/`, `types/`, `data/`, `constants/`) ; tous fichiers < 110 L ; orchestration filtres dans `page.tsx` → 3/5 séparation présentation/logique. |
| 5. Propreté | 14/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any` ni `console.log`) ; champ `isFilterOpen` inutilisé ; métadonnées layout « Create Next App » ; `next build` OK. |
| 6. Style | 4/5 | Tailwind soigné (cartes blanches, badges statut colorés, upload affiche overlay) ; grille `grid-cols-3` fixe sans breakpoint responsive. |
| 7. Bonus | 5/10 | Recherche titre (`SearchBar` + `handleSearch`) + filtres type/statut (`page.tsx` + store) : ~5 pts ; pas d'API, persistance, tests ni déploiement. |
| **TOTAL** | **83/100** | |

- **Points forts** : CRUD ajout/suppression/statut testé ; Zustand typé avec filtres et recherche ; découpage composants UI (PosterUpload, StarRating) ; build prod OK.
- **Axes d'amélioration** : Ajouter édition complète (titre, note) ; corriger hydratation (dates sérialisées) ; retirer `isFilterOpen` ; responsive grille ; mettre à jour `layout.tsx`.
- **Flags éventuels** : erreur d'hydratation React en dev (dates) ; aucun

### imrane_sahab

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 (useState uniquement, pas de store)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 18/20 | Testé sur `http://localhost:3016` : 3 cartes initiales ; ajout « Film Test Imrane » ; statut → Completed via `updateStatus` ; suppression OK ; -2 pts : pas d'édition titre/note/type (seul statut modifiable sur carte). |
| 2. Fondamentaux React | 18/20 | `page.tsx` (217 L) + `CineCard.tsx` (68 L) ; `key={item.id}` ; props/callbacks typés ; `useEffect` absent mais non requis ; -2 pts : UI quasi monolithique (formulaire + filtres dans la page) ; hydratation dev (`new Date()` dans `data/cine-items.ts` + `toLocaleDateString` L43 `CineCard.tsx`). |
| 3. Store | 3/15 | Aucun Zustand/Context+Reducer : état centralisé via `useState` dans `page.tsx` L14–24 ; fourchette 0–4 : handlers CRUD typés mais pas de store dédié. |
| 4. Architecture | 11/15 | Arborescence claire (`components/`, `models/`, `types/`, `data/`) ; `page.tsx` 217 L (filtres + formulaire ajout + handlers CRUD) → 2–3/5 taille ; logique métier dans la page → 3/5 séparation. |
| 5. Propreté | 13/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any` ni `console.log`) ; `key` redondant L19 `CineCard.tsx` ; métadonnées layout « Create Next App » ; `npm run build` OK. |
| 6. Style | 4/5 | Tailwind soigné (cartes `rounded-xl shadow-sm`, filtres header, grille responsive `sm:`/`lg:`, dark mode) ; métadonnées layout par défaut. |
| 7. Bonus | 4/10 | Filtres type/statut (`page.tsx` L16–17, L75–78) : ~4 pts ; pas d'API, persistance, tests ni déploiement. |
| **TOTAL** | **71/100** | |

- **Points forts** : CRUD ajout/suppression/statut testé ; typage métier propre ; filtres fonctionnels ; UI Tailwind cohérente et responsive.
- **Axes d'amélioration** : Introduire un store (Zustand ou Context+Reducer) ; édition complète (titre, note) ; extraire formulaire/filtres en composants ou hook ; corriger hydratation (dates sérialisées) ; mettre à jour `layout.tsx`.
- **Flags éventuels** : erreur d'hydratation React en dev (dates) ; aucun

### janick_lazasoa

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + TMDB

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3017` : 3 cartes TMDB au chargement ; ajout « Film Test Janick » ; édition pré-remplie → « Film Test Janick Modifié » ; suppression OK ; recherche « Obsession » filtre la liste. |
| 2. Fondamentaux React | 19/20 | `CineCard`, `CineForm`, `page.tsx` (136 L) ; `key={item.id}` / `key={movie.id}` ; `useEffect` seed TMDB + hook `useTMDB` (debounce 400 ms) ; -1 pt : `useCineStore()` sans sélecteur dans `CineCard`/`CineForm` (re-renders larges). |
| 3. Store | 12/15 | Zustand typé `store/useCineStore.ts` (32 L) : `addItem`/`updateItem`/`deleteItem` ; fourchette 9–12 : recherche et `isAdding` en `useState` local (`page.tsx` L11–12), pas de sélecteurs dédiés dans les composants enfants. |
| 4. Architecture | 11/15 | Arborescence claire (`components/`, `store/`, `hooks/`, `models/`, `types/`) ; `hooks/useTMDB.ts` extrait l'API ; `CineCard.tsx` 243 L et `CineForm.tsx` 256 L → 2–3/5 taille ; seed TMDB dans `page.tsx` L14–47. |
| 5. Propreté | 14/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any` ni `console.log`) ; métadonnées `layout.tsx` à jour ; `npm run build` OK. |
| 6. Style | 5/5 | Thème néomorphisme (`globals.css` variables CSS), polices Noto Serif JP + Inter, header stats, grille responsive `sm:`/`lg:`, cartes affiches TMDB. |
| 7. Bonus | 7/10 | TMDB recherche live + détails (`useTMDB.ts`, `fetchMovieDetails`) + préchargement 3 films populaires (~5 pts) ; recherche locale (~2 pts) ; pas de persistance, tests ni déploiement. |
| **TOTAL** | **88/100** | |

- **Points forts** : CRUD complet testé ; Zustand propre sans état UI parasite ; intégration TMDB aboutie (seed, recherche, affiches) ; UI néomorphisme soignée et responsive.
- **Axes d'amélioration** : Réduire `CineCard`/`CineForm` (sous-composants `StarRating`, modale) ; sélecteurs Zustand ciblés ; extraire le seed TMDB dans un hook ; centraliser recherche/filtres dans le store.
- **Flags éventuels** : aucun

### lucas_bianciotto

- **Build** : échec externe
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + TanStack Form

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | CRUD jugé sur lecture du code (build externe) : liste `filteredItems()` + `CineCard` ; ajout via `AddCineItemForm` → `addItem` ; édition modale `EditCineItemForm` pré-remplie (`defaultValues: item.*`) → `updateItem` ; suppression `deleteItem` ; statut via `updateStatus`. |
| 2. Fondamentaux React | 19/20 | 4 composants + `page.tsx` (70 L) ; `key={item.id}` ; props/callbacks typés ; `useEffect` absent mais non requis ; -1 pt : hydratation dev probable (`new Date()` dans `data/cine-items.ts`). |
| 3. Store | 12/15 | Zustand typé `store/cine-store.ts` (49 L) : CRUD, recherche (`search`/`filteredItems`) ; fourchette 9–12 : pas de sélecteurs ciblés, destructuring global `useCineStore()` dans `page.tsx`. |
| 4. Architecture | 12/15 | Arborescence claire (`components/`, `store/`, `models/`, `types/`, `data/`) ; `page.tsx` 70 L ; `AddCineItemForm.tsx` 197 L et `EditCineItemForm.tsx` 176 L → 2–3/5 taille ; logique formulaire isolée (TanStack Form). |
| 5. Propreté | 14/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any` ni `console.log`) ; métadonnées `layout.tsx` à jour ; build échoue sur binaire natif `lightningcss` manquant (externe), pas d'erreur TS dans le code source. |
| 6. Style | 5/5 | Thème Netflix sombre (`#141414`, accent `#E50914`), header sticky, grille responsive `sm:`/`lg:`/`xl:`, cartes poster + hover + étoiles. |
| 7. Bonus | 3/10 | Recherche par titre dans le store (`setSearch` + `filteredItems`) : ~3 pts ; pas d'API, persistance, tests ni déploiement. |
| **TOTAL** | **85/100** | |

- **Points forts** : CRUD complet (ajout/édition modale/suppression/statut) ; Zustand typé avec recherche intégrée ; formulaires validés TanStack Form ; UI Netflix soignée et responsive.
- **Axes d'amélioration** : Sélecteurs Zustand ciblés pour limiter les re-renders ; factoriser les champs communs Add/Edit ; corriger hydratation (dates sérialisées) ; vérifier install native `lightningcss` pour le build prod.
- **Flags éventuels** : build prod bloqué (module natif `lightningcss.darwin-x64.node` absent — environnement)

### lucas_da_silveira

- **Build** : échec code élève
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + Prisma (SQLite) + NextAuth + OMDB

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 15/20 | Testé sur `http://localhost:3020` : liste + ajout « Film Test Lucas » OK ; édition statut et suppression → `PATCH`/`DELETE` `/api/movies/3` en 500 (`params.id` non awaité, Next.js 16) : 2,5/5 chacun ; pas d'édition titre/note/type dans l'UI. |
| 2. Fondamentaux React | 18/20 | `page.tsx` (155 L), `CineCard.tsx` (205 L), `CineForm.tsx` (269 L) ; `key={item.id}` ; `useEffect` fetch + recherche OMDB debounce ; -2 pts : composants volumineux, erreur hydratation dev (`login/page.tsx`). |
| 3. Store | 10/15 | Zustand typé `hooks/use-cine-store.ts` (150 L) : fetch/add/delete/updateStatus async + filtres ; fourchette 9–12 : `any` dans `fetchItems`, pas de `updateItem` complet, actions PATCH/DELETE cassées côté API. |
| 4. Architecture | 11/15 | Découpage `components/`, `hooks/`, `models/`, `types/`, `api/` ; `page.tsx` 155 L ; `CineForm`/`CineCard` > 200 L → 2–3/5 taille ; logique OMDB isolée dans `CineForm`. |
| 5. Propreté | 10/15 | Interface `CineItem` propre mais `any` répétés (`page.tsx` L47, routes API, callbacks NextAuth) ; 7× `console.error` ; typo CSS `w-fulltext-left` L157 `CineForm.tsx` ; `next build` échoue (signature `params` Promise sur `api/movies/[id]/route.ts`). |
| 6. Style | 5/5 | Thème sombre custom (`globals.css` variables), dégradé titre, modales backdrop-blur, grille `sm:flex-row`, cartes affiches — UI soignée et responsive. |
| 7. Bonus | 10/10 | OMDB recherche live (`CineForm.tsx`) + Prisma/SQLite + auth NextAuth (login/register) + filtres/recherche store — plafond 10. |
| **TOTAL** | **79/100** | |

- **Points forts** : Stack avancée (BDD, auth multi-utilisateur, OMDB) ; Zustand async typé avec filtres ; UI cinéma cohérente ; ajout et consultation fonctionnels en dev.
- **Axes d'amélioration** : Corriger routes dynamiques (`const { id } = await params` sur PATCH/DELETE) pour débloquer build et CRUD ; ajouter édition complète (titre, note) ; réduire `CineCard`/`CineForm` ; typer les réponses API ; retirer les `console.error` de prod.
- **Flags éventuels** : build prod et PATCH/DELETE cassés (`params` Promise Next.js 16) ; erreur d'hydratation React en dev (login)

### lucas_viola

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + shadcn/ui

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3021` : 4 cartes initiales ; ajout « Film Test Lucas » ; édition pré-remplie → « Film Test Lucas Modifié » ; suppression confirmée (retour à 4). |
| 2. Fondamentaux React | 19/20 | 4 composants + `page.tsx` (50 L) ; `key={movie.id}` ; props/callbacks typés ; `useEffect` absent mais non requis ; -1 pt : erreur hydratation dev (`new Date().getFullYear()` L23 `MovieForm.tsx`). |
| 3. Store | 14/15 | Zustand typé `store/movieStore.ts` (32 L) : CRUD + sélecteurs ciblés (`state.movies`, `addMovie`, `updateMovie`, `deleteMovie`) ; pas d'état UI dans le store ; `getMovieById` défini mais non utilisé. |
| 4. Architecture | 14/15 | Arborescence claire (`components/`, `store/`, `types/`, `lib/ui/`) ; `page.tsx` 50 L (orchestration modales) ; tous composants < 100 L ; validation formulaire dans `MovieForm.tsx` → 4/5 séparation. |
| 5. Propreté | 14/15 | TS discipliné (`Movie`, `MovieInput`, pas de `any` ni `console.log`) ; `getMovieById` mort ; métadonnées layout « Create Next App » ; `npm run build` OK. |
| 6. Style | 4/5 | shadcn/ui (Card, Dialog, AlertDialog), grille responsive `sm:`/`lg:`, étoiles visuelles ; thème par défaut, pas de design custom. |
| 7. Bonus | 0/10 | Pas d'API, persistance, filtres, tests ni déploiement. |
| **TOTAL** | **85/100** | |

- **Points forts** : CRUD complet testé ; Zustand propre avec sélecteurs ciblés et sans état UI parasite ; page fine (50 L) et composants bien découpés ; validation formulaire (titre, année, note).
- **Axes d'amélioration** : Corriger hydratation (année par défaut fixe ou rendu client-only) ; retirer `getMovieById` ou l'exploiter ; mettre à jour `layout.tsx` (titre, lang) ; enrichir le thème visuel.
- **Flags éventuels** : erreur d'hydratation React en dev (`MovieForm.tsx`) ; aucun

### marco_bon

- **Build** : échec code élève
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Prisma/SQLite + NextAuth (pas de Zustand)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 17.5/20 | CRUD jugé sur lecture du code (runtime bloqué : Prisma client non généré après `npm install`, `params` non awaité) : liste `page.tsx` + `CineItemCard` ; ajout via `AddCineItemForm` (229 L) → `addItem` ; suppression `deleteItem` ; -2,5 pts : édition limitée au statut/note sur carte (`updateItem`), pas de formulaire d'édition titre/type. |
| 2. Fondamentaux React | 18/20 | 3 composants CRUD + `page.tsx` (172 L) ; `key={item.id}` ; props/callbacks typés ; 2× `useEffect` auth/fetch ; -2 pts : `handleAddItem` en `any` L45 `page.tsx`, import `useEffect` inutilisé L1 `useCineItems.ts`. |
| 3. Store | 3/15 | Aucun Zustand/Context+Reducer : état via `useState` dans `hooks/useCineItems.ts` (142 L) ; fourchette 0–4 : hook custom avec actions CRUD async mais pas de store dédié. |
| 4. Architecture | 12/15 | Découpage `components/`, `hooks/`, `lib/`, `app/api/`, `prisma/` ; logique API extraite dans `useCineItems` → 4/5 séparation ; `AddCineItemForm.tsx` 229 L, `marketplace/page.tsx` 237 L → 3/5 taille ; `library/page.tsx` = simple `redirect("/")`. |
| 5. Propreté | 11/15 | TS : interface `CineItem` dans le hook, mais `any` dans `page.tsx` L45, `auth.ts` L55–61, `api/cine-items/route.ts` L21 ; deps inutilisées (`axios`, `react-hook-form` dans `package.json`) ; `next build` échoue : `params` doit être `Promise` dans `api/cine-items/[id]/route.ts` → 1/3 cohérence. |
| 6. Style | 4/5 | Tailwind soigné (header dégradé purple/pink, stats, grille `md:`/`lg:`, cartes) ; marketplace et profil cohérents ; formulaires basiques. |
| 7. Bonus | 8/10 | Persistance Prisma/SQLite (~3 pts) + auth NextAuth register/login (~3 pts) + filtres avancés `FilterPanel` (recherche, type, statut, genre, notes min/max, ~2 pts) ; marketplace mock local (`MOCK_THEMES`, API `/api/marketplace/themes` non branchée) ~0 pts suppl. |
| **TOTAL** | **73.5/100** | |

- **Points forts** : Stack full-stack (API routes CRUD, Prisma, auth multi-utilisateur) ; hook `useCineItems` centralise les appels ; filtres riches ; UI cohérente et responsive.
- **Axes d'amélioration** : Corriger `await params` sur les routes dynamiques pour débloquer build et PATCH/DELETE ; introduire un store (Zustand ou Context+Reducer) ; formulaire d'édition complet ; générer Prisma client (`prisma generate`) / aligner config Prisma 7 ; retirer deps mortes et brancher le marketplace sur l'API.
- **Flags éventuels** : build prod cassé (`params` Promise Next.js 16) ; CRUD non testé en navigateur (erreur `.prisma/client` après install)

### mathys_nourry

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + Prisma (SQLite) + NextAuth + TMDB

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 18/20 | Liste `page.tsx` + `CineCard` ; ajout via `AddItemModal` → `addItem` (TMDB ou manuel) ; suppression `deleteItem` ; -2 pts : édition limitée au statut (select carte), note (`DetailsModal` L166–168) et favori — `AddItemModal` supporte `initialItem`/`isEdit` (L22–30) mais jamais branché dans `page.tsx`. |
| 2. Fondamentaux React | 19/20 | 7 composants + `page.tsx` (152 L) ; `key={item.id}` / `key={r.tmdbId}` ; `useEffect` fetch + debounce TMDB ; `useMemo` filtres ; -1 pt : destructuring global `useItemsStore()` L14–15 sans sélecteurs ciblés. |
| 3. Store | 12/15 | Zustand typé `store/items-store.ts` (81 L) : CRUD async Prisma, `toggleFavorite`/`updateStatus` ; fourchette 9–12 : `isLoading` (état UI) dans le store, pas de sélecteurs, filtres en `useState` local (`page.tsx` L16). |
| 4. Architecture | 11/15 | Découpage cohérent (`components/`, `store/`, `models/`, `types/`, `app/api/`, `lib/`) ; logique API centralisée dans le store → 4/5 séparation ; `AddItemModal.tsx` 302 L (> 250) + `DetailsModal.tsx` 238 L → 2/5 taille composants. |
| 5. Propreté | 14/15 | TS discipliné (`CineItem`, interfaces TMDB, pas de `any` applicatif) ; `zod` importé dans `register/route.ts` L3 mais absent de `package.json` ; 1× `console.error` serveur ; `npm run build` OK. |
| 6. Style | 5/5 | Design Material (`globals.css` variables `--md-*`), dark mode `ThemeToggle`, grille responsive `sm:`/`lg:`, cartes affiches, modales `backdrop-blur`. |
| 7. Bonus | 10/10 | TMDB (`api/tmdb/search` + recherche live `AddItemModal`) + Prisma/SQLite + auth NextAuth (login/register) + filtres avancés `FilterBar` (nom, type, statut, notes min/max, favoris) + dark mode — plafond 10. |
| **TOTAL** | **89/100** | |

- **Points forts** : Stack full-stack aboutie (BDD, auth multi-utilisateur, TMDB) ; Zustand async typé ; UI Material soignée avec filtres riches ; build prod OK (`params` awaité Next.js 16).
- **Axes d'amélioration** : Brancher le mode édition (`AddItemModal` + `updateItem` pour titre/type) ; ajouter sélecteurs Zustand ; découper `AddItemModal`/`DetailsModal` ; ajouter `zod` en dépendance directe ; déplacer filtres dans le store ou un hook.
- **Flags éventuels** : aucun

### nasser_zerbane

- **Build** : échec externe
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Zustand + API route (JSON)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 18/20 | CRUD jugé sur lecture du code (build/dev bloqués : `lightningcss.darwin-x64.node` absent) : liste `loadItems` + `CineCard` ; ajout `CineCardAdd` → POST `/api/cine-items` ; suppression `deleteItem` ; -2 pts : édition limitée au statut (`updateStatus`), pas de modif titre/note/type. |
| 2. Fondamentaux React | 19/20 | 4 composants actifs (`CineCard` 94 L, `CineCardAdd` 175 L, `CustomSelect` 87 L, `page.tsx` 155 L) ; `key={item.id}` ; 6 sélecteurs Zustand ciblés ; `useEffect` `loadItems` + click-outside `CustomSelect` ; -1 pt : `SearchCard.tsx` (32 L) jamais importé. |
| 3. Store | 12/15 | Zustand typé `store/cine-store.ts` (120 L) : actions async CRUD + sélecteurs ciblés (`page.tsx` L26–31) ; fourchette 9–12 : `isLoading` (état UI) dans le store, recherche/filtres en `useState` local, pas d'`updateItem` complet. |
| 4. Architecture | 12/15 | Arborescence claire (`components/`, `store/`, `api/`, `types/`, `models/`) ; logique API centralisée dans le store + route `api/cine-items/route.ts` (88 L) ; tous fichiers < 176 L ; filtres/recherche dans `page.tsx` → 3/5 séparation ; fichiers morts `SearchCard.tsx`, `data/cine-items.ts`, `types/filter-type.Ts`. |
| 5. Propreté | 13/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any` ni `console.log`, `tsc --noEmit` OK) ; 3 fichiers inutilisés ; `filter-type.Ts` (casse `.Ts`) ; build échoue sur binaire natif `lightningcss` manquant (externe). |
| 6. Style | 5/5 | Thème sombre Netflix (`globals.css` variables `--accent`/`--gold`), navbar sticky, hero dégradé, grille responsive `md:`/`lg:`, animations `fade-in`/`modal-in`, `CustomSelect` custom. |
| 7. Bonus | 6/10 | Persistance fichier JSON via API route fs read/write (`cine-items.json`, ~3 pts) + recherche titre + filtres type/statut (`page.tsx` L34–48, ~3 pts) ; pas d'API externe, tests ni déploiement. |
| **TOTAL** | **85/100** | |

- **Points forts** : Zustand typé avec sélecteurs ciblés et actions async ; API route CRUD complète avec persistance JSON ; UI soignée (thème cinéma, composants réutilisables) ; typage TS sans erreur.
- **Axes d'amélioration** : Ajouter édition complète (titre, note, type) ; déplacer filtres/recherche dans le store ou un hook ; retirer fichiers morts (`SearchCard`, `cine-items.ts`, `filter-type.Ts`) ; éviter posters base64 dans le JSON (taille fichier).
- **Flags éventuels** : build/dev bloqués (module natif `lightningcss` absent — environnement) ; `cine-items.json` ~982 Ko (posters base64)

### rayane_boudaoudi

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Motion (pas de store client React)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3022` : 16 affiches en grille ; ajout « Film Test Rayane » → Total 17 ; édition API PUT → « Film Test Rayane Modifié » + `PosterForm` pré-rempli (`initialData`, L28–57) ; suppression confirmée → retour à 16. |
| 2. Fondamentaux React | 19/20 | 9 composants posters + 7 UI ; `key={poster.id}` ; props/callbacks typés ; 3× `useEffect` (fetch, raccourci clavier, fallback affiche) ; -1 pt : erreur hydratation dev (`new Date().getFullYear()` L21 `PosterForm.tsx`). |
| 3. Store | 3/15 | Aucun Zustand/Context+Reducer : 15× `useState` dans `page.tsx` L35–49 ; `lib/posters-store.ts` (107 L) = couche serveur fs, pas un store React client → fourchette 0–4. |
| 4. Architecture | 7/15 | Arborescence claire (`components/posters/`, `components/ui/`, `lib/`, `app/api/`) ; composants < 173 L ; `page.tsx` 458 L (fetch + filtres + tri + modales + handlers CRUD) → 1/5 taille et 2/5 séparation présentation/logique. |
| 5. Propreté | 13/15 | TS discipliné (`MoviePoster`, `MoviePosterInput`, pas de `any` ni `console.log`) ; 5 fichiers template morts (`CineCard.tsx`, `cine-items.ts`, `cine-item.ts`, `status.ts`, `media-type.ts`) ; `npm run build` OK. |
| 6. Style | 5/5 | Thème sombre custom (`globals.css`), hero dégradé, grille responsive `sm:`/`lg:`, animations Motion, vue liste/grille, modales backdrop-blur. |
| 7. Bonus | 10/10 | Persistance JSON serveur (`data/posters.json` + routes API) + filtres/recherche/tri/décennie + import/export JSON + animations Motion + duplication/roulette — plafond 10. |
| **TOTAL** | **77/100** | |

- **Points forts** : CRUD complet testé avec persistance serveur ; UI très soignée et riche (stats, tri, export, roulette) ; typage métier propre ; build prod OK.
- **Axes d'amélioration** : Introduire un store client (Zustand ou Context+Reducer) ; refactoriser `page.tsx` (hook `usePosters` + composant orchestrateur) ; retirer les fichiers template morts ; corriger l'hydratation (année par défaut fixe ou rendu client-only).
- **Flags éventuels** : erreur d'hydratation React en dev (`PosterForm.tsx`) ; aucun

### tom_victor

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 + Context API (useState, pas de reducer)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 10/20 | Testé sur `http://localhost:3023` : consultation OK (30 films TMDB trending + recherche « Matrix ») ; ajout/suppression partiels via toggle favoris (❤️, compteur 0→1) — pas de formulaire d'ajout manuel ; aucune édition (statut/titre/note immuables). |
| 2. Fondamentaux React | 17/20 | 2 composants + 2 pages (`CineCard` 49 L, `SearchBar` 83 L, `page.tsx` 142 L) ; `key={item.id}` ; `useEffect` fetch TMDB + debounce recherche ; -3 pts : logique API dans `page.tsx`/`SearchBar`, erreur hydratation dev (`favorites.length` / `localStorage` L15–25 `CineContext.tsx`). |
| 3. Store | 3/15 | Context `CineContext.tsx` (56 L) avec `useState` uniquement (pas de reducer) : `toggleFavorite`/`isFavorite` + persist localStorage ; fourchette 0–4 : pas de store dédié au sens grille. |
| 4. Architecture | 10/15 | Arborescence claire (`components/`, `context/`, `models/`, `types/`) ; tous fichiers < 150 L ; fetch TMDB et pagination dans `page.tsx` L32–81 → 2/5 séparation ; `data/cine-items.ts` duplique `CineItem` sans usage. |
| 5. Propreté | 12/15 | TS discipliné (`CineItem`, unions `MediaType`/`Status`, pas de `any`) ; clé API TMDB en dur L30 `page.tsx` + L21 `SearchBar.tsx` ; 2× `console.error` ; fichier mort `data/cine-items.ts` ; `npm run build` OK. |
| 6. Style | 4/5 | Tailwind soigné (cartes hover/shadow, grille responsive `md:grid-cols-5`, scrollbar custom `globals.css`, pagination) ; champ `status` jamais affiché/modifiable. |
| 7. Bonus | 6/10 | TMDB trending + recherche multi (`page.tsx` + `SearchBar`, ~3 pts) + persistance localStorage favoris (`CineContext.tsx`, ~2 pts) + pagination (~1 pt) ; pas de tests ni déploiement. |
| **TOTAL** | **62/100** | |

- **Points forts** : Intégration TMDB fonctionnelle (trending + recherche debounce) ; UI cartes soignée avec favoris et page dédiée ; typage métier propre ; build prod OK.
- **Axes d'amélioration** : Implémenter le CRUD complet (formulaire ajout/édition/suppression d'items) ; introduire un vrai store (Zustand ou Context+Reducer) ; corriger hydratation localStorage (useEffect post-mount) ; externaliser la clé API ; retirer `data/cine-items.ts` mort.
- **Flags éventuels** : clé API TMDB en clair dans le code source ; erreur d'hydratation React en dev

### xavier_trouche

- **Build** : OK
- **Stack détectée** : Next.js 16 + React 19 + TypeScript + Tailwind 4 (useState uniquement, pas de store)

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | 20/20 | Testé sur `http://localhost:3024` : 6 cartes par statut ; ajout « Film Test Xavier » (Library size 7) ; édition pré-remplie → « Film Test Xavier Modifié » ; suppression confirmée (retour à 6). |
| 2. Fondamentaux React | 19/20 | 9 composants (`MovieCard`, `FilterBar`, modales…) ; `key={item.id}` ; `useEffect` toasts + `DropdownSelect` ; `useTransition`/`useDeferredValue` ; -1 pt : erreur hydratation dev (`formatDate` + dates `data/cine-items.ts`). |
| 3. Store | 3/15 | Aucun Zustand/Context+Reducer : 8× `useState` dans `page.tsx` L39–50 ; `lib/cine-track.ts` (128 L) = helpers/métadonnées uniquement → fourchette 0–4. |
| 4. Architecture | 8/15 | Arborescence claire (`components/`, `lib/`, `models/`, `types/`, `data/`) ; composants < 160 L ; `page.tsx` 475 L (CRUD + filtres + stats + sections) → 1/5 taille ; logique métier dans la page → 2/5 séparation. |
| 5. Propreté | 14/15 | TS discipliné (`CineItem`, `MovieFormValues`, pas de `any` ni `console.log`) ; métadonnées `layout.tsx` à jour ; `posterUrl` optionnel non utilisé dans les seeds ; `npm run build` OK. |
| 6. Style | 5/5 | Thème sombre premium (`globals.css`, dégradés violet), polices Space Grotesk/DM Sans, stats header, grille responsive `sm:`/`lg:`/`xl:`, cartes et modales soignées. |
| 7. Bonus | 6/10 | Recherche (`useDeferredValue`) + filtres type/statut + tri 4 options + reset (~4 pts) ; toasts + sections par statut + dashboard stats (~2 pts) ; pas d'API, persistance, tests ni déploiement. |
| **TOTAL** | **75/100** | |

- **Points forts** : CRUD complet testé avec modales et confirmation ; UI très soignée (streaming-inspired) ; typage TS propre ; composants UI réutilisables (`DropdownSelect`, `StatusBadge`).
- **Axes d'amélioration** : Introduire un store (Zustand ou Context+Reducer) ; extraire logique CRUD/filtres dans un hook (`useCineTrack`) ; réduire `page.tsx` (475 L) ; corriger hydratation (dates sérialisées ou rendu client-only).
- **Flags éventuels** : erreur d'hydratation React en dev (dates/stats) ; `.git/` et `.next/` présents dans le rendu

## Synthèse

| Élève | Total | Build |
|---|:---:|---|
| alexandre_plouzeau | 79/100 | échec code élève |
| alexis_garibaldi | 91/100 | OK |
| aymeric_baud | 79/100 | OK |
| dylan_aurojo_lopes | 83/100 | OK |
| dorian_didomenico | 0/100 | non applicable |
| elias_saadi | 69/100 | OK |
| enzo_daloia | 74.5/100 | OK |
| erwan_kaczmareck | 78/100 | échec code élève |
| fabio_voliani | 87/100 | OK |
| florent_dacunto | 83/100 | OK |
| imrane_sahab | 71/100 | OK |
| janick_lazasoa | 88/100 | OK |
| lucas_bianciotto | 85/100 | échec externe |
| lucas_da_silveira | 79/100 | échec code élève |
| lucas_viola | 85/100 | OK |
| marco_bon | 73.5/100 | échec code élève |
| mathys_nourry | 89/100 | OK |
| nasser_zerbane | 85/100 | échec externe |
| rayane_boudaoudi | 77/100 | OK |
| tom_victor | 62/100 | OK |
| xavier_trouche | 75/100 | OK |
