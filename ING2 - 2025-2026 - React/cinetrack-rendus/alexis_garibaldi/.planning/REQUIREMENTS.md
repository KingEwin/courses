# Requirements: CineTrack

**Defined:** 2026-05-03
**Core Value:** Permettre à un cinéphile de tenir un journal personnel de films (statut + note + avis) en partant d'un catalogue mondial (TMDB), dans une interface qui rappelle l'esthétique Nintendo DS.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation (Database & Stack)

- [ ] **FOUND-01**: La base SQLite est créée localement par Prisma migrate (zéro setup réseau ; pivot acté en cours de Phase 1 pour cause de daemon Docker instable)
- [ ] **FOUND-02**: Le projet utilise Prisma avec un `schema.prisma` modélisant un film (titre, année, réalisateur, synopsis, posterUrl, tmdbId, status, rating, review, timestamps)
- [ ] **FOUND-03**: Les migrations Prisma sont versionnées dans `prisma/migrations/`
- [ ] **FOUND-04**: Un fichier `.env.example` documente les variables requises (`DATABASE_URL`, `TMDB_API_KEY`)
- [ ] **FOUND-05**: Le README explique en 5 lignes max comment lancer la stack (install, prisma migrate, dev server)

### TMDB Integration

- [ ] **TMDB-01**: L'utilisateur peut chercher un film par titre via une barre de recherche, avec résultats live de l'API TMDB
- [ ] **TMDB-02**: Les résultats TMDB affichent affiche, titre, année, et un bouton "Ajouter à ma cinémathèque"
- [ ] **TMDB-03**: L'import depuis TMDB pré-remplit titre/année/réalisateur/synopsis/posterUrl/tmdbId dans la base
- [ ] **TMDB-04**: La clé API TMDB n'est jamais exposée côté client (appels via route serveur Next.js)

### CRUD Films

- [ ] **CRUD-01**: L'utilisateur peut consulter la liste de sa cinémathèque (page d'accueil)
- [ ] **CRUD-02**: L'utilisateur peut consulter le détail d'un film (page dédiée ou modal)
- [ ] **CRUD-03**: L'utilisateur peut ajouter un film manuellement (formulaire titre + année + réalisateur, sans TMDB)
- [ ] **CRUD-04**: L'utilisateur peut éditer les champs personnels d'un film (statut, note, avis) et les champs métadonnées (titre, année, réalisateur, synopsis)
- [ ] **CRUD-05**: L'utilisateur peut supprimer un film de sa cinémathèque, avec confirmation

### Tracking (Statut + Note + Avis)

- [ ] **TRACK-01**: Chaque film a un statut de visionnage parmi : `À voir`, `En cours`, `Vu` (default: `À voir`)
- [ ] **TRACK-02**: L'utilisateur peut changer le statut d'un film en un clic depuis la liste ou la fiche détail
- [ ] **TRACK-03**: Chaque film peut recevoir une note sur 10 (ou 5 étoiles, équivalent) — éditable inline
- [ ] **TRACK-04**: Chaque film peut recevoir un avis texte libre (multi-lignes, ~2000 caractères max)
- [ ] **TRACK-05**: La note et l'avis ne sont visibles que si le statut est `Vu` ou `En cours` (logique métier visible)

### Browse & Filter

- [ ] **BROWSE-01**: La liste affiche les films sous forme de tuiles avec affiche, titre, année, statut, note
- [ ] **BROWSE-02**: L'utilisateur peut filtrer la liste par statut (tabs ou chips : Tous / À voir / En cours / Vu)
- [ ] **BROWSE-03**: L'utilisateur peut trier la liste (par titre A→Z, année récente→ancienne, note haute→basse)
- [ ] **BROWSE-04**: Une recherche locale permet de filtrer la cinémathèque par titre

### State Management (Zustand Store)

- [ ] **STATE-01**: Un store Zustand centralise l'état des films côté client (cache hydraté depuis le serveur)
- [ ] **STATE-02**: Le store gère les filtres actifs (statut, recherche locale, tri)
- [ ] **STATE-03**: Le store expose des actions CRUD qui synchronisent avec les server actions / routes API
- [ ] **STATE-04**: Le store applique des updates optimistes pour les changements de statut / note (UX fluide)

### Architecture & Code Quality

- [ ] **ARCH-01**: Séparation claire : `app/` (routes/UI), `components/` (UI réutilisable), `lib/` (services TMDB, Prisma client), `store/` (Zustand)
- [ ] **ARCH-02**: Le CRUD passe par des server actions Next.js 16 (pas de fetch côté client vers nos propres routes API quand possible)
- [ ] **ARCH-03**: Aucune logique métier dans les composants UI — la logique vit dans le store ou les server actions
- [ ] **ARCH-04**: Composants typés strictement avec TypeScript (`any` interdit en code livré)
- [ ] **ARCH-05**: Hooks personnalisés extraits si une logique se répète (ex: `useFilteredFilms`, `useTmdbSearch`)

### React Fundamentals

- [ ] **REACT-01**: Le projet démontre l'usage de `useState`, `useEffect`, `useMemo`, `useCallback` à des endroits où c'est pertinent (pas forcé)
- [ ] **REACT-02**: Au moins un composant gère un formulaire contrôlé (édition film)
- [ ] **REACT-03**: Au moins un composant utilise la composition (children) plutôt que la duplication
- [ ] **REACT-04**: Les listes utilisent `key` correct (id stable, pas l'index)
- [ ] **REACT-05**: Un custom hook est exposé (ex: `useTmdbSearch` qui debounce la recherche TMDB)

### Style (DS Aesthetic)

- [ ] **STYLE-01**: Polices pixel chargées via Google Fonts (titre + corps)
- [ ] **STYLE-02**: Palette appliquée : fond crème/blanc, accents bleu pastel, rouge week-end, gris pixelisé
- [ ] **STYLE-03**: Bordures pixelisées 1-2px sur les tuiles/cards (pas de border-radius arrondi style 2024)
- [ ] **STYLE-04**: Fond de page texturé "grille whiteboard" (subtil) sur l'accueil
- [ ] **STYLE-05**: La home affiche un en-tête style menu DS avec horloge live et titre du jour (clin d'œil esthétique)

### Submission

- [ ] **SUBMIT-01**: Un fichier `AI_USAGE.md` à la racine documente comment l'IA a été utilisée sur le projet (exigence du prof)
- [ ] **SUBMIT-02**: Le `README.md` est mis à jour avec instructions de lancement et description du projet
- [ ] **SUBMIT-03**: Le projet build sans erreur (`npm run build`) et lint sans warning bloquant (`npm run lint`)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Auth & Multi-user

- **AUTH-01**: User can create account
- **AUTH-02**: User session persists
- **AUTH-03**: Each user has their own private list

### Lists & Collections

- **LIST-01**: User can create custom lists ("Top 2026", "À voir avec X")
- **LIST-02**: User can add film to multiple lists

### Series Support

- **SERIES-01**: Support TV series alongside movies
- **SERIES-02**: Track season/episode progress

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentification multi-user | Hors scope barème, app solo, économise 4-6h |
| Séries TV | Choix de scope explicite films-only |
| Listes / collections custom | Statut de visionnage suffit pour v1 |
| Réseau social (followers, partage public) | Hors scope projet noté solo |
| Notifications / emails | Aucune valeur ajoutée, app local |
| Mobile responsive avancé | Le prof corrige sur desktop |
| Tests automatisés | Non requis par le barème |
| Frame DS double-écran complet | Choix d'esthétique : accents seulement, ergonomie d'app classique |
| Affichage public d'avis | App perso single-user |
| OAuth / SSO | Aucune auth requise |

## Traceability

Every v1 requirement is mapped to exactly one phase. Coverage = 45/45.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| TMDB-01 | Phase 2 | Pending |
| TMDB-02 | Phase 2 | Pending |
| TMDB-03 | Phase 2 | Pending |
| TMDB-04 | Phase 2 | Pending |
| STATE-01 | Phase 2 | Pending |
| STATE-02 | Phase 2 | Pending |
| STATE-03 | Phase 2 | Pending |
| STATE-04 | Phase 2 | Pending |
| ARCH-01 | Phase 2 | Pending |
| ARCH-02 | Phase 2 | Pending |
| ARCH-03 | Phase 2 | Pending |
| ARCH-04 | Phase 2 | Pending |
| CRUD-01 | Phase 3 | Pending |
| CRUD-02 | Phase 3 | Pending |
| CRUD-03 | Phase 3 | Pending |
| CRUD-04 | Phase 3 | Pending |
| CRUD-05 | Phase 3 | Pending |
| TRACK-01 | Phase 3 | Pending |
| TRACK-02 | Phase 3 | Pending |
| TRACK-03 | Phase 3 | Pending |
| TRACK-04 | Phase 3 | Pending |
| TRACK-05 | Phase 3 | Pending |
| BROWSE-01 | Phase 3 | Pending |
| BROWSE-02 | Phase 3 | Pending |
| BROWSE-03 | Phase 3 | Pending |
| BROWSE-04 | Phase 3 | Pending |
| ARCH-05 | Phase 3 | Pending |
| REACT-01 | Phase 3 | Pending |
| REACT-02 | Phase 3 | Pending |
| REACT-03 | Phase 3 | Pending |
| REACT-04 | Phase 3 | Pending |
| REACT-05 | Phase 3 | Pending |
| STYLE-01 | Phase 4 | Pending |
| STYLE-02 | Phase 4 | Pending |
| STYLE-03 | Phase 4 | Pending |
| STYLE-04 | Phase 4 | Pending |
| STYLE-05 | Phase 4 | Pending |
| SUBMIT-01 | Phase 4 | Pending |
| SUBMIT-02 | Phase 4 | Pending |
| SUBMIT-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 45 total
- Mapped to phases: 45
- Unmapped: 0 ✓

**Distribution:**
- Phase 1 (Foundation): 5 reqs
- Phase 2 (Data Layer & Store): 12 reqs
- Phase 3 (CRUD UI & Tracking): 20 reqs
- Phase 4 (DS Aesthetic & Submission): 8 reqs

---
*Requirements defined: 2026-05-03*
*Last updated: 2026-05-03 — traceability populated by gsd-roadmapper*
