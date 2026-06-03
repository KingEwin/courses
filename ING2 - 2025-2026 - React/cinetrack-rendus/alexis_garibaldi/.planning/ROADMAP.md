# Roadmap: CineTrack

**Created:** 2026-05-03
**Granularity:** Coarse (4 phases, ship-tonight project)
**Coverage:** 45/45 v1 requirements mapped

## Core Value

Permettre à un cinéphile de tenir un journal personnel de films (statut + note + avis) en partant d'un catalogue mondial (TMDB), dans une interface qui rappelle l'esthétique Nintendo DS. Si tout le reste échoue, le **CRUD complet sur des films** doit fonctionner — c'est le cœur du barème (40/90 points).

## Strategic Ordering

The phase order is calibrated so that any cut-off point still produces a gradeable deliverable:

- After **Phase 1**: Schema + Docker stack run; project boots.
- After **Phase 2**: TMDB search returns results, Zustand store hydrates from server, architectural seams exist.
- After **Phase 3**: Full CRUD path works end-to-end (this is the safety floor — 40/90 pts secured).
- After **Phase 4**: DS aesthetic applied + submission artifacts ready.

If time runs out in Phase 4, the project is still submittable (the rubric only awards 5 pts to style).

## Phases

- [ ] **Phase 1: Foundation** - Docker Postgres, Prisma schema/migrations, Next.js bootstrap, env wiring
- [ ] **Phase 2: Data Layer & Store** - TMDB server proxy + Zustand store (cache, filters, optimistic CRUD actions)
- [ ] **Phase 3: CRUD UI & Tracking** - Library list/detail/create/edit/delete + status/rating/review + browse filters
- [ ] **Phase 4: DS Aesthetic & Submission** - Pixel typography, palette, pixelated borders, grid background, README + AI usage doc

## Phase Details

### Phase 1: Foundation
**Goal**: Le correcteur peut cloner le repo et lancer la stack en moins de 5 minutes (`docker compose up`, `npx prisma migrate deploy`, `npm run dev`) sans friction.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. `docker compose up` démarre un Postgres local accessible depuis l'app sur le port attendu.
  2. `npx prisma migrate deploy` applique les migrations versionnées et crée la table `Film` avec les champs métier (titre, année, réalisateur, synopsis, posterUrl, tmdbId, status, rating, review, createdAt, updatedAt).
  3. `.env.example` liste `DATABASE_URL` et `TMDB_API_KEY`, et `npm run dev` boote sans erreur quand `.env.local` est rempli.
  4. Le `README.md` contient une section "Run" en 5 lignes max qui suffit à un correcteur pour lancer le projet.
**Plans**: TBD

### Phase 2: Data Layer & Store
**Goal**: L'utilisateur peut chercher un film via TMDB et voir des résultats live, et le client maintient un cache Zustand cohérent qui exposera des actions CRUD optimistes pour la phase suivante. Les fondations architecturales (séparation `app/` / `components/` / `lib/` / `store/`, server actions, typage strict) sont en place.
**Depends on**: Phase 1
**Requirements**: TMDB-01, TMDB-02, TMDB-03, TMDB-04, STATE-01, STATE-02, STATE-03, STATE-04, ARCH-01, ARCH-02, ARCH-03, ARCH-04
**Success Criteria** (what must be TRUE):
  1. L'utilisateur tape un titre dans la barre de recherche et voit s'afficher les résultats TMDB (affiche, titre, année) avec un bouton "Ajouter à ma cinémathèque".
  2. Un clic "Ajouter" persiste le film en base via une server action en pré-remplissant titre/année/réalisateur/synopsis/posterUrl/tmdbId, et le store Zustand reflète l'ajout immédiatement (update optimiste).
  3. La clé `TMDB_API_KEY` n'apparaît jamais dans le bundle client (vérifiable via DevTools Network : tous les appels TMDB passent par une route serveur Next.js).
  4. L'arborescence respecte `app/` (routes/UI), `components/`, `lib/` (clients TMDB & Prisma), `store/` (Zustand) ; aucun `any` dans le code livré ; le store gère films + filtres (statut, recherche locale, tri).
**Plans**: TBD

### Phase 3: CRUD UI & Tracking
**Goal**: Un visiteur peut gérer sa cinémathèque de bout en bout — lister, voir, créer (manuellement OU depuis TMDB), éditer, supprimer ses films, et leur attacher statut/note/avis avec un filtrage et tri fluides. C'est la phase qui sécurise les 40 points CRUD + 20 points React du barème.
**Depends on**: Phase 2
**Requirements**: CRUD-01, CRUD-02, CRUD-03, CRUD-04, CRUD-05, TRACK-01, TRACK-02, TRACK-03, TRACK-04, TRACK-05, BROWSE-01, BROWSE-02, BROWSE-03, BROWSE-04, ARCH-05, REACT-01, REACT-02, REACT-03, REACT-04, REACT-05
**Success Criteria** (what must be TRUE):
  1. Sur la page d'accueil, l'utilisateur voit la liste de sa cinémathèque sous forme de tuiles (affiche, titre, année, statut, note), peut filtrer par statut (Tous / À voir / En cours / Vu), trier (titre A→Z, année récente→ancienne, note haute→basse), et chercher localement par titre.
  2. L'utilisateur peut créer un film manuellement via un formulaire contrôlé (titre + année + réalisateur), consulter son détail, éditer ses champs (statut, note, avis, métadonnées), et le supprimer avec confirmation.
  3. L'utilisateur peut changer le statut d'un film en un clic depuis la liste ou la fiche, attribuer une note inline (sur 10 ou 5 étoiles), et écrire un avis multi-lignes ; la note et l'avis ne sont visibles/éditables que si le statut est `Vu` ou `En cours`.
  4. Le code démontre les fondamentaux React : un custom hook (ex: `useTmdbSearch` debounced ou `useFilteredFilms`), composition via `children`, formulaire contrôlé, `key` stables sur les listes, et usage pertinent de `useState`/`useEffect`/`useMemo`/`useCallback`.
**Plans**: TBD
**UI hint**: yes

### Phase 4: DS Aesthetic & Submission
**Goal**: L'app a l'identité visuelle Nintendo DS promise (palette crème/pastel, typo pixel, bordures pixelisées, fond grille, en-tête menu DS) et le rendu est prêt à être envoyé : build/lint clean, README à jour, doc usage IA présente.
**Depends on**: Phase 3
**Requirements**: STYLE-01, STYLE-02, STYLE-03, STYLE-04, STYLE-05, SUBMIT-01, SUBMIT-02, SUBMIT-03
**Success Criteria** (what must be TRUE):
  1. L'app charge des polices pixel via Google Fonts (titres + corps), applique la palette crème/blanc + bleu pastel + accents rouge week-end, et utilise des bordures pixelisées 1-2px (zéro `border-radius` arrondi style 2024) sur les tuiles.
  2. La page d'accueil a un fond texturé "grille whiteboard" subtil et un en-tête style menu DS avec horloge live et titre du jour.
  3. La racine du repo contient `AI_USAGE.md` (doc d'utilisation IA conforme à l'exigence prof) et un `README.md` à jour avec description + instructions de lancement.
  4. `npm run build` compile sans erreur et `npm run lint` ne remonte aucun warning bloquant.
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/0 | Not started | - |
| 2. Data Layer & Store | 0/0 | Not started | - |
| 3. CRUD UI & Tracking | 0/0 | Not started | - |
| 4. DS Aesthetic & Submission | 0/0 | Not started | - |

## Coverage Map

All 45 v1 requirements mapped to exactly one phase. No orphans, no duplicates.

| Category | Count | Phase(s) |
|----------|-------|----------|
| Foundation (FOUND) | 5 | Phase 1 |
| TMDB | 4 | Phase 2 |
| State (Zustand) | 4 | Phase 2 |
| Architecture (ARCH-01..04) | 4 | Phase 2 |
| CRUD | 5 | Phase 3 |
| Tracking (TRACK) | 5 | Phase 3 |
| Browse | 4 | Phase 3 |
| Architecture (ARCH-05) | 1 | Phase 3 |
| React fundamentals | 5 | Phase 3 |
| Style | 5 | Phase 4 |
| Submission | 3 | Phase 4 |
| **Total** | **45** | **4 phases** |

## Parallelization Notes

Phase 2 and Phase 3 share the Prisma models established in Phase 1. The TMDB server route (Phase 2) and the manual-CRUD UI (Phase 3) consume the same `Film` model, so once Phase 1 is done, the data layer (TMDB proxy + store skeleton) and the CRUD UI shell can progress in parallel sub-tracks if time pressure demands it. Treat Phase 3 as the "safety net": even if Phase 2 TMDB integration is cut, Phase 3 manual CRUD (CRUD-03) keeps the rubric's 40 CRUD points reachable.

## Descope Strategy (deadline tonight)

If at any checkpoint the deadline is in real danger, descope in this order (least painful first):

1. **STYLE-04, STYLE-05** (grid background, DS header clock) — visual flourishes, ~2 pts of style.
2. **TMDB-01..04** entirely — fall back on CRUD-03 manual entry only. Lose differentiator, keep CRUD floor.
3. **STATE-04** (optimistic updates) — store still works, UX less smooth.
4. **BROWSE-03** (sort) — keep filter + search, drop tri.

Never descope: FOUND-*, CRUD-*, TRACK-*, STATE-01..03, ARCH-01..04, REACT-*, SUBMIT-*.

---
*Roadmap created: 2026-05-03*
*Last updated: 2026-05-03*
