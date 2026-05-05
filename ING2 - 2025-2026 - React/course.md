# Fiche cours — React (J2)

## Informations générales

- **Intitulé** : Introduction à React — Journée 2
- **Volume horaire J2** : 6h45 (8h30–11h45 + 13h30–17h00, 2 pauses de 20 min incluses)
- **Format** : 1 journée en distanciel
- **Public** : Ingénieur 2 — Bac+4 (cycle ingénieur G4), promo de ~25 élèves
- **Prérequis** : Journée 1 React acquise (composants, JSX, props, `useState`, `useEffect`, premier store), TP CineTrack rendu avant le J2
- **Stack** : Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Zustand + TanStack Query (React Query)
- **Instructeur** : Yoann

## Rappel — ce qui a été couvert en J1

- Présentation de React (histoire, popularité, comparaison avec Angular et Vue)
- Fondamentaux : composants, JSX, props, état local (`useState`), effets (`useEffect`)
- Présentation du TP CineTrack (Next.js + Tailwind), à rendre avant J2
- Introduction aux stores (concept, intérêt) — **point identifié comme difficile, à reprendre en J2**
- Introduction à la clean-architecture (mention rapide, à approfondir en J2)

## Objectifs pédagogiques (J2)

À l'issue de cette deuxième journée, l'étudiant sera capable de :

1. **Distinguer** state local, state remonté (lifted) et state global, et **choisir** le bon scope pour une donnée
2. **Implémenter** un store Zustand simple (state + actions + sélecteurs) et l'utiliser dans plusieurs composants
3. **Identifier** les anti-patterns courants liés aux stores (sur-utilisation, sélecteurs trop larges, re-renders inutiles)
4. **Expliquer** la valeur ajoutée de React Query face à un fetch fait à la main (cache, dédup, états, refetch)
5. **Écrire** une `useQuery` et une `useMutation` avec invalidation, et **comprendre** le mécanisme `staleTime` / `gcTime`
6. **Organiser** un projet React/Next par feature, avec séparation présentation / logique via custom hooks
7. **Critiquer** un code React (lecture de TPs réels) et proposer des améliorations concrètes

## Plan détaillé

---

### Matin — Stores et revue de TPs (3h15, pause 20 min incluse)

#### Bloc 1 — Stores avec Zustand (1h30)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 15 min | Accueil, retour J1 (mini-quiz "qu'avez-vous retenu ?"), plan du jour, modalités du QCM | Échange + sondage |
| 10 min | Rappels : `useState`, lifted state, **prop drilling** — illustration sur un cas concret | Cours + schéma |
| 10 min | Quand a-t-on **vraiment** besoin d'un store global ? Critères de décision (scope, durée de vie, partage) | Cours magistral |
| 15 min | Zustand — philosophie (vs Redux, vs Context), API minimaliste, premier store | Cours + démo |
| 25 min | **Live coding** : mini-projet "UserPrefs + ThemeSwitcher" — une valeur du store utilisée dans 3 composants distincts (header, settings, content) | Démo live |
| 10 min | Sélecteurs ciblés et performance — éviter les re-renders inutiles | Cours + démo |
| 10 min | Anti-patterns (mettre tout dans le store, store fourre-tout, logique métier dans le composant) + middleware `persist` | Cours magistral |
| 5 min | Q&R + transition | Échange |

#### Pause (20 min)

#### Bloc 2 — Revue collective des TPs (1h10)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 5 min | Cadre de la revue : objectif pédagogique, bienveillance, anonymisation | Cadrage |
| 15 min | **TP n°1 — un rendu propre** : projection, lecture commune, ce qui marche, ce qui pourrait évoluer | Revue collective |
| 15 min | **TP n°2 — un rendu intermédiaire** : zones grises, choix discutables, pistes d'amélioration | Revue collective |
| 15 min | **TP n°3 — un rendu à améliorer** : focus sur les points bloquants (archi, store, séparation) | Revue collective |
| 15 min | Synthèse transversale : patterns récurrents, anti-patterns, top 5 améliorations à appliquer | Synthèse |
| 5 min | Q&R + transition pause déjeuner | Échange |

---

### Après-midi — React Query, clean architecture, QCM (3h30, pause 20 min incluse)

#### Bloc 3 — React Query (1h15)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Le problème : data fetching à la main = enfer (loading, error, cache, dédup, refetch, race conditions) | Cours + cas vécu |
| 15 min | Concepts clés : `QueryClient`, `useQuery`, `queryKey`, `staleTime` vs `gcTime`, états (`pending`/`error`/`success`) | Cours magistral |
| 20 min | **Live coding** : ajout de React Query sur un fetch CineTrack — avant/après | Démo live |
| 15 min | `useMutation` + invalidation post-mutation (`queryClient.invalidateQueries`) | Cours + démo |
| 5 min | Mention rapide des optimistic updates (quand et pourquoi) | Cours magistral |
| 5 min | DevTools React Query — observer cache, statuses, refetches | Démo |
| 5 min | Q&R + transition | Échange |

#### Pause (20 min)

#### Bloc 4 — Clean architecture & bonnes pratiques (1h15)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 10 min | Le piège du "tout dans `app/` et `components/`" — pourquoi ça scale mal | Cours + cas |
| 15 min | Découpage **par feature** vs par type — exemples avant/après sur CineTrack | Cours + diagramme |
| 20 min | **Séparation présentation / logique** via custom hooks — démo refactor d'un composant fourre-tout vers `useFilms()` + `<FilmsList />` | Démo live |
| 15 min | Règles pratiques : taille d'un composant, nommage, props, ce qu'un composant **ne devrait pas** faire | Cours magistral |
| 10 min | Mise en perspective : où placent-on stores et React Query dans cette architecture ? | Cours + schéma |
| 5 min | Q&R + transition vers QCM | Échange |

#### Bloc 5 — Évaluation et clôture (40 min)

| Durée | Contenu | Méthode |
|-------|---------|---------|
| 20 min | **QCM** — 20 questions (stores, React Query, clean archi, transverse J1) | Évaluation individuelle |
| 15 min | Correction collective + discussion sur les questions débattues | Correction |
| 5 min | Clôture : pour aller plus loin (ressources), feedback express, mot de fin | Échange |

---

## Évaluation

- **Type** : QCM individuel
- **Durée** : 20 min
- **Format** : 20 questions à choix multiples
- **Répartition indicative** :
  - 6 questions sur les stores (concepts + Zustand)
  - 5 questions sur React Query (concepts + lecture de code)
  - 5 questions sur la clean architecture / bonnes pratiques
  - 4 questions transverses (rappels J1 — composants, hooks, props)
- **Correction** : collective immédiatement après, avec discussion sur les questions ambiguës

## Supports pédagogiques

### À préparer

| Support | Description |
|---------|-------------|
| Slides Slidev | Présentation J2 intégrée au même fichier `slides.md` que le J1 |
| Mini-projet Zustand | Repo de démo "UserPrefs + ThemeSwitcher" (3 composants partageant un store) |
| Snippet React Query | Branche du repo CineTrack avec avant/après React Query (queries + mutation) |
| Snippet refactor | Composant fourre-tout + version refactorée (custom hook + composant présentation) |
| QCM | 20 questions + corrigé (`qcm.md`) |
| Sélection TPs | 3 rendus anonymisés à projeter (propre / intermédiaire / à améliorer) |

### Ressources recommandées

- **React (officiel)** — https://react.dev/learn
- **Zustand (officiel)** — https://zustand.docs.pmnd.rs
- **TanStack Query (officiel)** — https://tanstack.com/query/latest/docs
- **TkDodo's blog** (auteur React Query) — https://tkdodo.eu/blog/practical-react-query
- **Bulletproof React** (architecture exemple) — https://github.com/alan2207/bulletproof-react
- **Article** : "Why I don't use Redux anymore" (panorama des alternatives) — context utile pour comprendre le paysage des stores
- **Article** : Kent C. Dodds — "Application State Management with React" (kentcdodds.com)

## Points d'attention pour l'instructeur

- **Distanciel + 25 élèves** : prévoir des points d'interaction toutes les 15-20 min (sondage chat, question ouverte, réaction emoji). Les blocs > 30 min de monologue tuent l'attention.
- **Stores difficiles en J1** : bien repartir des **fondamentaux** (state local → lifted → global) avant de plonger dans Zustand. Le mini-projet doit être exécuté en live, pas commenté sur slide.
- **Revue de TPs** : anonymiser scrupuleusement (nom de fichiers, README, commits). Annoncer le cadre bienveillant en début de séance. Privilégier 3 TPs représentatifs plutôt que 6 survolés.
- **React Query est un game changer** : insister sur le **problème** avant la solution. Démontrer la douleur du fetch manuel (10 lignes de loading/error/refetch) puis montrer l'équivalent en 3 lignes.
- **Clean archi = bon sens, pas dogme** : éviter les grands principes abstraits (SOLID, DDD, hexagonal). Rester sur des règles pragmatiques avec exemples avant/après tirés de leurs propres TPs.
- **QCM en fin de journée** : prévoir des questions qui demandent de la **lecture de code** plutôt que de la définition pure. Mieux discrimine les élèves qui ont compris.
- **Pas de TP à rendre après J2** : la journée est à valeur conceptuelle. L'évaluation se fait via le QCM J2 + le TP J1 déjà rendu.
- **Stack figée** : Next.js + Zustand + React Query + TS. Ne pas digresser sur Redux Toolkit, Jotai, SWR — mention rapide possible mais ne pas y passer du temps.
