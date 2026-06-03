# CineTrack

## What This Is

Une application web personnelle de gestion de films inspirée de Letterboxd, livrée comme projet noté de fin de cours React. L'utilisateur cherche un film via TMDB, l'importe dans sa cinémathèque, et y associe un statut de visionnage (Vu / À voir / En cours), une note et un avis texte. L'expérience visuelle rappelle l'esthétique du menu Nintendo DS — palette crème/pastel, bordures pixelisées, typographie rétro.

## Core Value

Permettre à un cinéphile de tenir un journal personnel de films (statut + note + avis) en partant d'un catalogue mondial (TMDB), dans une interface qui transforme une corvée de saisie en moment plaisant grâce à son esthétique nostalgique. Si tout le reste échoue, le **CRUD complet sur des films** doit fonctionner — c'est le cœur du barème (40/90 points).

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Recherche de films via API TMDB + import dans la cinémathèque locale
- [ ] CRUD complet sur les films de la cinémathèque (créer manuellement, lire, mettre à jour, supprimer)
- [ ] Statut de visionnage par film (Vu / À voir / En cours)
- [ ] Note par film (sur 10 ou 5 étoiles)
- [ ] Avis / review texte libre par film
- [ ] Filtrage / tri de la cinémathèque (par statut, note, titre, année)
- [ ] Persistance PostgreSQL via Prisma
- [ ] Store Zustand pour l'état client (filtres, UI, cache films)
- [ ] Esthétique Nintendo DS (palette crème/bleu pastel, typographie pixel, bordures pixelisées)
- [ ] Documentation utilisation IA dans le rendu (exigence du prof)

### Out of Scope

- **Authentification / multi-user** — Pas demandé par le barème, app solo single-user, économise plusieurs heures de dev
- **Séries TV** — Choix de scope explicite : films uniquement pour rester focus sur la qualité
- **Listes / collections personnalisées** — Hors scope v1, le statut de visionnage suffit pour le tracking
- **Réseau social (suivre des amis, partager des avis)** — Hors scope projet noté
- **Notifications / emails** — Aucune valeur ajoutée pour un projet solo local
- **Mobile / responsive avancé** — Cible navigateur desktop, le prof corrige sur desktop
- **Tests automatisés** — Non requis par le barème ; le temps est mieux investi dans la propreté du code
- **Frame DS double-écran complet** — Choix d'esthétique en faveur d'accents DS sur layout normal (rejeté pour ergonomie)

## Context

**Projet noté de fin de cours React (g4.2026.react)** — rendu solo, deadline dimanche 3 mai 2026.

**Barème (90 points totaux, transposé /20) :**
- 20 — Consultation / ajout / édition / suppression d'éléments (CRUD)
- 20 — Utilisation des fondamentaux React (hooks, composants, props, composition)
- 15 — Utilisation d'un store
- 15 — Architecture et séparation des responsabilités
- 15 — Propreté du code
- 5 — Style de l'app

**Mode de rendu :** Archive zip par mail (yoann.bohssain@gmail.com) ou branche sur le repo GitHub. Mention obligatoire de l'utilisation d'IA (mail ou fichier `.md` dans le rendu).

**Base de départ :** Le prof a fourni une base à `github.com/DuperSope/g4.2026.react.git` (probablement Vite + React). **Décision : on n'utilise pas cette base** — on part d'un Next.js 16 fresh dans `cinetrack-g4` qui apporte App Router, server actions, et un meilleur cadre pour démontrer architecture/séparation des responsabilités. Cette divergence sera mentionnée dans le mail de rendu.

**Stack figée :**
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Prisma ORM 7 + SQLite (driver `@prisma/adapter-better-sqlite3`)
- Zustand (store client)
- API TMDB (https://api.themoviedb.org/3) pour la recherche/import
- Polices Google Fonts pixel (ex: Press Start 2P pour titres, VT323 ou Silkscreen pour corps)

> **Note** : la stack initialement prévue était PostgreSQL via Docker. Pivot SQLite décidé en Phase 1 — daemon Docker local instable, le pivot fait gagner 1-2h de friction. La couche Prisma est inchangée ; un éventuel retour à Postgres ne demanderait que de changer le `provider` dans `schema.prisma` et de réinstaller `@prisma/adapter-pg` à la place de `@prisma/adapter-better-sqlite3`.

**Inspiration esthétique :** Menu d'accueil Nintendo DS — fond grille whiteboard pâle, tuiles encadrées avec bordures pixelisées 1-2px, palette crème/blanc + bleu pastel + accents rouge week-end, ombres dures style sprite.

## Constraints

- **Timeline** : Deadline ce soir (3 mai 2026) — quelques heures de dev maximum. Toute feature non livrable est descopée. La priorité absolue est CRUD fonctionnel + store + architecture propre.
- **Tech stack** : Next.js 16 (App Router) — APIs cassantes vs training data, lire `node_modules/next/dist/docs/` avant tout code Next.js. React 19 (Server Components par défaut, `'use client'` requis pour hooks).
- **Tech stack** : Prisma + PostgreSQL via Docker — un `docker-compose.yml` + `prisma/schema.prisma` doivent être livrés. Le correcteur doit pouvoir lancer la stack avec `docker compose up && npm run dev`.
- **Tech stack** : Store Zustand obligatoire pour les 15 points. Doit gérer du vrai état client (films, filtres, UI), pas un wrapper trivial.
- **External dependency** : Clé API TMDB requise. À fournir via `.env.local` (variable `TMDB_API_KEY`). Le rendu doit inclure un `.env.example`.
- **Compatibility** : Cible navigateurs desktop modernes (Chrome/Firefox/Safari récents). Aucune contrainte mobile.
- **Solo project** : Pas de collaboration, pas de PR review, pas de CI. Mais commits propres pour démontrer la rigueur.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 fresh plutôt que la base Vite du prof | Le scaffold est déjà en place, App Router permet des server actions élégantes pour le CRUD, et le combo SC+CC démontre une vraie séparation des responsabilités. | — Pending (à mentionner au prof) |
| Films uniquement (pas de séries) | Réduit la complexité du modèle de données (pas de saisons/épisodes) et permet de mieux polir la qualité dans le temps imparti. | — Pending |
| TMDB API plutôt que saisie manuelle pure | Affiches + métadonnées riches sans effort utilisateur ; démontre l'intégration d'une API externe. La saisie manuelle reste possible en complément. | — Pending |
| PostgreSQL via Docker plutôt que SQLite ou localStorage | Plus impressionnant pour le barème "architecture", et Prisma + Postgres est un combo standard pro. Trade-off : le correcteur doit lancer Docker. | — Pending |
| Prisma plutôt que Drizzle | Mainstream, schema déclaratif, migrations automatiques — moins de surface d'erreur sur une deadline serrée. | — Pending |
| Zustand plutôt que Redux Toolkit | Bundle minuscule, pas de boilerplate, hooks simples. Démontre un store moderne sans la lourdeur Redux. | — Pending |
| App solo sans authentification | Hors scope barème, économise 4-6h de dev, permet de focaliser sur le CRUD et le polish. | — Pending |
| Esthétique DS en accents (layout normal) | Garder l'ergonomie d'une app classique (sidebar + main) tout en injectant la palette/typo DS. Le frame double-écran complet est rejeté pour ergonomie. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-progress`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-03 after initialization*
