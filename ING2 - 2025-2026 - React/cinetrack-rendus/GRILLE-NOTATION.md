# Grille de notation — TP CineTrack (React, ING2 2025-2026)

> **Destinataire : agent IA correcteur.**
> Ce document est l'unique référence de notation. Tu dois l'appliquer **à l'identique** pour tous les
> rendus, sans tenir compte de l'identité de l'élève, de la taille du projet, ni de
> l'impression générale. Note **uniquement** ce qui est observable dans le code et le
> fonctionnement de l'app. À code équivalent, **note équivalente** : c'est la règle absolue.

---

## 1. Contexte du TP (à connaître avant de noter)

- **Sujet** : créer une application de gestion de films / séries (« CineTrack »).
- **Stack de référence** : Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Zustand.
- **Niveau attendu** : projet rendu en **fin de Journée 1**. Les notions de **store** et de
  **clean architecture** étaient les points identifiés comme **difficiles**. On évalue donc un
  niveau « débutant React fin de J1 », pas un niveau senior.
- **Liberté** : fonctionnalités, style et architecture sont libres. L'usage de l'IA était autorisé.
- **La stack peut varier** : certains rendus utilisent Next.js, d'autres Vite/CRA, du JS au lieu de
  TS, un autre store que Zustand, etc. **Ce n'est pas pénalisé en soi** : on note les critères
  ci-dessous, pas le respect d'une stack imposée.

### Barème officiel (sur 100)

| # | Critère | Points |
|---|---------|:------:|
| 1 | Consultation / ajout / édition / suppression (CRUD) | **20** |
| 2 | Utilisation des fondamentaux React | **20** |
| 3 | Utilisation d'un store | **15** |
| 4 | Architecture & séparation des responsabilités | **15** |
| 5 | Propreté du code | **15** |
| 6 | Style de l'app | **5** |
| 7 | Bonus | **10** |
| | **TOTAL** | **/100** |

> La note finale est plafonnée à **100** (le bonus peut compenser des points perdus ailleurs,
> mais le total ne dépasse jamais 100).

---

## 2. Protocole de correction (à suivre dans l'ordre)

### Étape A — Préparation du rendu
1. Utiliser le dossier déjà décompressé.
2. Localiser la **racine du projet** = le dossier contenant `package.json`.
3. **Ignorer systématiquement** dans toute l'évaluation : `node_modules/`, `.next/`, `dist/`,
   `build/`, `.git/`, fichiers `.lock`, et tout artefact généré. Ne jamais noter ce code.
4. Si le rendu est **vide** ou ne contient qu'un dossier `.next/` / `node_modules/` sans code
   source → voir §4 « Cas particuliers ».

### Étape B — Build + lancement (vérification fonctionnelle)
La méthode retenue est **build + lancement** : tu dois tenter de faire tourner l'app pour vérifier
réellement le CRUD.

1. `npm install` (ou `pnpm install` / `yarn` selon le lockfile présent).
2. `npm run build` puis, si besoin, `npm run dev` (ou l'équivalent du `package.json`).
3. Vérifier dans l'app que les opérations CRUD fonctionnent réellement.

**Protocole de repli (anti-injustice)** — si l'install ou le build **échoue pour une raison
externe au travail de l'élève** (ex. version de Next.js indisponible, dépendance cassée côté
registry, incompatibilité d'environnement) :
- Ne **pas** mettre 0 au CRUD pour autant.
- Basculer sur une **évaluation par lecture du code** pour le critère 1 (CRUD) et le signaler
  explicitement dans le rapport (`Build : échec externe — CRUD jugé sur lecture du code`).
- En revanche, si le build échoue **à cause d'une erreur de code de l'élève** (erreur TS bloquante,
  import cassé, syntaxe invalide), c'est imputable au rendu → en tenir compte dans **Propreté du
  code** (critère 5) et juger le CRUD sur lecture du code.

> Indique toujours dans le rapport le statut du build : `OK` / `échec externe` / `échec code élève`.

### Étape C — Lecture du code
Lire l'intégralité de `src/` (ou équivalent) : composants, store, hooks, types, pages. C'est la
base des critères 2 à 6.

### Étape D — Notation + rapport
Renseigner chaque critère avec sa sous-décomposition (§3), puis produire le rapport au format
imposé (§5).

---

## 3. Détail des critères et barèmes

Pour chaque sous-critère, applique la logique : **présent et correct = plein** ; **partiel ou
bugué = moitié** ; **absent = 0**. Arrondis au demi-point.

### Critère 1 — CRUD (20 pts)
Évalué en priorité par le **fonctionnement réel** (build OK), sinon par lecture du code.

| Sous-critère | Points | Plein si… |
|---|:---:|---|
| **Consultation** (liste/affichage des éléments) | 5 | La liste s'affiche, les éléments sont lisibles |
| **Ajout** | 5 | Un formulaire crée un nouvel élément qui apparaît dans la liste |
| **Édition** | 5 | Un élément existant peut être modifié et la modif persiste dans l'état |
| **Suppression** | 5 | Un élément peut être supprimé et disparaît de la liste |

- Moitié des points si l'opération existe mais est partielle/buggée (ex. ajout sans validation qui
  plante, édition qui ne pré-remplit pas, suppression sans confirmation mais fonctionnelle = OK).
- 0 si l'opération est absente.

### Critère 2 — Fondamentaux React (20 pts)

| Sous-critère | Points | Plein si… |
|---|:---:|---|
| **Découpage en composants** réutilisables | 5 | L'UI est répartie en plusieurs composants cohérents (liste, carte, formulaire…) plutôt qu'un seul bloc monolithique |
| **Props** correctement passées et utilisées | 4 | Données et callbacks passés proprement ; pas de prop drilling extrême (>3 niveaux) |
| **State local** (`useState`) pertinent | 4 | État géré au bon endroit ; pas de state inutile ou redondant |
| **Effets** (`useEffect`) corrects | 3 | Dépendances correctes, pas de boucle de re-render, effets justifiés |
| **Rendu de listes & conditionnel** | 4 | `key` stables et uniques (pas l'index quand évitable), rendu conditionnel propre |

- Si le projet n'utilise pas du tout `useEffect` mais n'en a légitimement pas besoin, attribuer
  les 3 points (ne pas pénaliser une absence justifiée).

### Critère 3 — Store (15 pts) — **NOTATION STRICTE**

> Règle stricte : **`useState` local seul ne constitue PAS un store** et ne rapporte pas de points
> ici, même s'il est « lifted » / remonté. Un vrai store = librairie dédiée (Zustand, Redux,
> Jotai…) **ou** Context API couplé à un reducer/provider partagé.

| Niveau observé | Fourchette |
|---|:---:|
| **Store dédié, typé, avec actions claires et sélecteurs ciblés** (ex. Zustand propre, aucune logique UI dedans) | **13–15** |
| **Store dédié fonctionnel mais imparfait** (sélecteurs trop larges, store fourre-tout mêlant data + UI state, typage partiel) | **9–12** |
| **Context + Reducer** correct, ou store Zustand très minimal mais réel | **6–9** |
| **Faux store** : wrapper `localStorage`, simple module avec variables exportées, « store » présent dans `package.json` mais non utilisé | **3–5** |
| **Aucun store** : uniquement `useState`/`useContext` sans reducer, ou state purement local | **0–4** |

- Positionne dans la fourchette selon la qualité (typage, clarté des actions, ciblage des
  sélecteurs, absence de logique métier mal placée).

### Critère 4 — Architecture & séparation des responsabilités (15 pts)

| Sous-critère | Points | Plein si… |
|---|:---:|---|
| **Séparation présentation / logique** | 5 | Logique extraite en custom hooks ou en store/sélecteurs ; les composants de présentation sont « bêtes » |
| **Découpage cohérent du projet** | 5 | Organisation lisible (par feature ou, à défaut, par type : `components/`, `store/`, `types/`, `hooks/`) — un découpage par type **cohérent** est acceptable vu le niveau |
| **Taille des composants raisonnable** | 5 | Pas de fichier fourre-tout. Repère : un composant/page **> 250 lignes** = signal fort de mauvaise séparation → 0–2 ; 150–250 lignes → 2–3 ; < 150 lignes bien découpé → 4–5 |

- La **page principale** est le meilleur révélateur : une `page.tsx` qui contient filtres + tri +
  modal + CRUD + état = problème de séparation (réduire fortement les points de ce critère).

### Critère 5 — Propreté du code (15 pts)

| Sous-critère | Points | Plein si… |
|---|:---:|---|
| **Typage discipliné** | 5 | TypeScript utilisé sérieusement, peu/pas de `any`, types métier définis (`Movie`, `MovieInput`…). *Si le projet est en JS pur : plafonner ce sous-critère à 2.* |
| **Nommage clair** | 4 | Variables/fonctions/composants explicites et cohérents (une seule convention de casse) |
| **Absence de code mort/parasite** | 3 | Pas de `console.log` oubliés, code commenté en masse, fichiers inutilisés, TODO laissés |
| **Cohérence & lint** | 3 | Formatage homogène ; pas d'erreurs de lint évidentes. *Si build échoue pour erreur de code élève (§2.B) → 0–1 ici.* |

### Critère 6 — Style de l'app (5 pts)

| Niveau | Points |
|---|:---:|
| App soignée, cohérente visuellement, responsive correct | 4–5 |
| App présentable mais basique / quelques incohérences | 2–3 |
| Style quasi inexistant (HTML brut non stylé) | 0–1 |

### Critère 7 — Bonus (10 pts, plafonné à 10)

Cumul de fonctionnalités allant **au-delà du périmètre demandé**. Compter ~2–3 pts par élément
significatif, plafonné à 10 :

- Intégration d'une **API externe** (ex. TMDB) avec data réelle
- **React Query / TanStack Query** pour le data fetching
- **Persistance** (middleware `persist`, localStorage structuré, base de données / Prisma)
- **Authentification**
- **Filtres / tri / recherche** avancés
- **Import / export** de données (JSON…)
- **Animations** soignées (Framer Motion…)
- **Tests** (unitaires, e2e)
- **Déploiement** en ligne accessible (Vercel…), dark mode, i18n, accessibilité poussée, etc.

> Les bonus ne se substituent pas aux critères de base : un projet sans CRUD fonctionnel mais avec
> des animations reste faible. Le bonus récompense le « en plus », pas le contournement.

---

## 4. Cas particuliers (traitement imposé)

| Situation | Traitement |
|---|---|
| **Rendu vide** (que `.next/` ou `node_modules/`, aucun code source) | **0/100**. Rapport : « Aucun code source exploitable ». |
| **Projet ne build pas — cause externe** (dépendance/registry/env) | Pas de 0 automatique. CRUD jugé sur lecture du code, statut build `échec externe` (cf. §2.B). |
| **Projet ne build pas — erreur de code élève** | CRUD sur lecture du code + impact sur critère 5 (Propreté), statut `échec code élève`. |
| **Projet en JS (pas TS)** | Non pénalisé globalement, mais le sous-critère « typage » (crit. 5) est plafonné à 2/5. |
| **Stack non Next.js** (Vite, CRA…) | Non pénalisé. Adapter les commandes de build/lancement. |
| **Plusieurs projets / dossiers** dans le rendu | Noter le projet le plus complet correspondant au sujet ; signaler l'ambiguïté dans le rapport. |
| **Code manifestement copié d'un autre rendu** (similarité flagrante) | Noter normalement mais **signaler** dans le rapport (`⚠️ similarité à vérifier`). Ne pas accuser. |

> **Mention de l'usage de l'IA** : ne pas l'évaluer ni la pénaliser. Ce point n'entre pas dans la
> note (décision pédagogique).

---

## 5. Format de sortie imposé (un bloc par élève)

### 5.1 Où écrire la note — fichier partagé unique

Toutes les notes sont consignées dans **un seul et même fichier**, commun à tous les élèves :

```
ING2 - 2025-2026 - React/cinetrack-rendus/NOTES.md
```

Règles d'écriture dans ce fichier :

1. **Un seul fichier pour les 20 rendus.** Ne jamais créer un fichier par élève.
2. **Ordre alphabétique** par nom d'élève (`alexandre_plouzeau`, `alexis_garibaldi`, …). Quand tu
   ajoutes un rendu, **insère** son bloc à la bonne position alphabétique — ne te contente pas de
   l'ajouter à la fin.
3. **Idempotence** : si un bloc existe déjà pour cet élève (même `### <nom_eleve>`), **remplace-le**
   plutôt que d'en créer un second. Un élève = un seul bloc.
4. Si le fichier n'existe pas encore, crée-le avec un titre `# Notes — TP CineTrack (ING2 2025-2026)`
   suivi des blocs élèves.
5. Le **tableau de synthèse** (§5.3) est maintenu **en fin de fichier** et mis à jour à chaque ajout,
   trié alphabétiquement lui aussi.
6. Reproduis aussi le bloc du rendu dans ta réponse à l'écran (en plus de l'écriture fichier).

### 5.2 Structure d'un bloc élève

Produis **exactement** cette structure pour chaque rendu, pour garantir l'homogénéité :

```markdown
### <nom_eleve>

- **Build** : OK | échec externe | échec code élève | non applicable
- **Stack détectée** : <ex. Next.js 16 + TS + Zustand>

| Critère | Note | Justification (1-2 phrases, factuelle) |
|---|:---:|---|
| 1. CRUD | x/20 | … |
| 2. Fondamentaux React | x/20 | … |
| 3. Store | x/15 | … |
| 4. Architecture | x/15 | … |
| 5. Propreté | x/15 | … |
| 6. Style | x/5 | … |
| 7. Bonus | x/10 | … |
| **TOTAL** | **x/100** | |

- **Points forts** : …
- **Axes d'amélioration** : …
- **Flags éventuels** : <similarité, projet multiple, build cassé… ou « aucun »>
```

### 5.3 Tableau de synthèse (en fin de `NOTES.md`)

Maintenir, **à la fin du fichier `NOTES.md`**, un tableau de synthèse trié par nom (ordre
alphabétique, pas par note) récapitulant les notes finales et le statut de build, pour relecture
rapide. Le mettre à jour à chaque rendu corrigé :

```markdown
## Synthèse

| Élève | Total | Build |
|---|:---:|---|
| alexandre_plouzeau | x/100 | OK |
| … | … | … |
```

---

## 6. Règles de cohérence (anti-variance) — impératif

1. **Mêmes signaux → mêmes points.** Avant de finaliser, vérifie que deux rendus présentant la
   même caractéristique (ex. `page.tsx` de 300 lignes, pas de store) reçoivent la même note sur le
   critère concerné.
2. **Justifier par des faits**, pas par une impression : citer un fichier, un nombre de lignes, la
   présence/absence d'un store, etc. Une note sans justification factuelle est invalide.
3. **Ne pas se laisser influencer** par la taille de l'archive, la richesse du README, ou le nombre
   de fichiers : un gros projet peut être mal architecturé, un petit projet peut être excellent.
4. **Pas de demi-mesure arbitraire** : si tu hésites entre deux fourchettes, choisis la borne basse
   et explique pourquoi en une phrase.
5. **Calibrage niveau J1** : ne pas exiger un niveau professionnel. Un découpage par type cohérent,
   un store Zustand minimal mais propre, un CRUD complet = déjà un très bon rendu.
6. Le **total est plafonné à 100** même si la somme dépasse grâce au bonus.
