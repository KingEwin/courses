# CineTrack

Cinémathèque sociale façon Letterboxd, esthétique Nintendo DS. Projet de fin de cours React pour l'Institut G4.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Prisma 7 ORM + SQLite
- Zustand (store client)
- TMDB API (recherche / import films)

## Run

```bash
cp .env.example .env                    # remplir TMDB_API_KEY + SESSION_SECRET
npm install                             # installe les dépendances
npx prisma migrate deploy               # crée la base SQLite + applique les migrations
npx prisma db seed                      # 3 users de demo + films + reviews
npm run dev                             # http://localhost:3000
```

> Une clé TMDB v3 (32-hex) **ou** un v4 read access token (JWT) marche — détecté automatiquement. À récupérer depuis [TMDB API settings](https://www.themoviedb.org/settings/api).
> `SESSION_SECRET` peut être généré via `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`.

## Comptes de démonstration (post-seed)

| Username | Mot de passe |
|----------|--------------|
| alice    | alice123     |
| bob      | bob12345     |
| chiara   | chiara99     |

Tu peux aussi créer ton propre profil via `/signup`. Le mode invité (sans connexion) permet de parcourir les reviews mais pas d'écrire.

## Architecture

- `app/` — routes App Router (pages + server actions + route handlers)
  - `app/actions/` — server actions (`films.ts`, `reviews.ts`, `auth.ts`)
  - `app/api/tmdb/` — proxy serveur vers TMDB (la clé reste côté serveur)
  - `app/login/`, `app/signup/`, `app/films/[id]/` — pages
- `components/` — composants UI réutilisables (FilmCard, FilmCarousel, FilmLikedByUserCard, Modal, RatingEditor, etc.)
- `lib/` — services (`prisma.ts`, `tmdb.ts`, `auth.ts`, `types.ts`)
- `lib/generated/prisma/` — client Prisma généré (gitignored, recréé via `postinstall`)
- `store/` — store Zustand (`films.ts` + selectors `selectors.ts`)
- `hooks/` — hooks réutilisables (`useTmdbSearch.ts`)
- `prisma/schema.prisma` + `prisma/migrations/` — modèle de données et migrations versionnées
- `prisma/seed.ts` — données de démo

## Modèle de données

- **User** : `id, username (unique), displayName, passwordHash, …`
- **Film** : catalogue partagé (`id, title, year, director, synopsis, posterUrl, tmdbId, …`)
- **Review** : `userId × filmId` (unique), avec `status`, `rating` 0..10, `comment`. Une review est créée automatiquement à l'ajout d'un film (statut `TO_WATCH`) et éditée depuis la fiche film.

## Scripts

```bash
npm run dev        # serveur de développement
npm run build      # build production
npm run lint       # ESLint
npx prisma studio  # GUI base de données
npx prisma db seed # rejoue le seed
```

## AI usage

Voir [`AI_USAGE.md`](./AI_USAGE.md).
