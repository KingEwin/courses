# Démo Zustand — UserPrefs + ThemeSwitcher

Mini-projet de démonstration pour le live-coding du J2 React (section "Stores avec Zustand").

**Objectif pédagogique** : montrer qu'une **même valeur du store** peut être lue et modifiée par **3 composants distincts** sans aucun passage de props.

## Stack

- Vite + React 19 + TypeScript
- Zustand 5 (avec middleware `persist`)
- Pas de Tailwind ni de framework UI : styles inline volontairement minimalistes pour garder le focus sur le store

## Démarrage

```bash
cd demos/zustand-userprefs
npm install
npm run dev
```

→ http://localhost:5173

## Architecture

```
src/
├── App.tsx                  # racine, applique le thème global
├── main.tsx
├── store/
│   └── userPrefsStore.ts    # store Zustand : theme, language, fontSize
└── components/
    ├── Header.tsx           # consomme language, theme, toggleTheme
    ├── Settings.tsx         # consomme + modifie tous les champs
    └── Content.tsx          # consomme language, fontSize
```

Aucune prop n'est échangée entre les composants : tout passe par le store.

## Plan du live-coding (25 min)

### Étape 1 — Le store (5 min)

Créer `store/userPrefsStore.ts` :

```ts
import { create } from "zustand";

export const useUserPrefsStore = create((set) => ({
  theme: "light",
  language: "fr",
  fontSize: 16,
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setFontSize: (fontSize) => set({ fontSize }),
}));
```

**Points à souligner** :
- `create` retourne un hook
- L'objet contient state + actions côte à côte
- `set` fait un merge partiel automatique
- Pas de Provider, pas de Context

### Étape 2 — Typage (3 min)

Ajouter le type `UserPrefsState` (cf. fichier final). Démontrer :
- `Theme` et `Language` en types union
- Les actions retournent `void`
- `create<UserPrefsState>()(...)` (curry pour bien inférer)

### Étape 3 — Les 3 composants (10 min)

Créer `Header`, `Settings`, `Content` un par un. À chaque fois :
- Sélecteurs **ciblés** : `useUserPrefsStore((s) => s.theme)` (pas `useUserPrefsStore()`)
- Ouvrir React DevTools (Profiler) pour montrer que seul le composant qui consomme la valeur re-render

**Démo de la magie** : modifier le `fontSize` dans Settings → Content change instantanément, aucune prop n'a été ajoutée.

### Étape 4 — Bonus `persist` (5 min)

Wrapper le store avec `persist` :

```ts
import { persist } from "zustand/middleware";

export const useUserPrefsStore = create(
  persist(
    (set) => ({ /* ... */ }),
    { name: "user-prefs" }
  )
);
```

Recharger la page → les préférences sont conservées (via localStorage).

Ouvrir DevTools → Application → Local Storage pour montrer la clé `user-prefs`.

### Étape 5 — Q&R (2 min)

Questions fréquentes anticipées :
- "Pourquoi pas Context ?" → re-render tout l'arbre, plus verbeux
- "Pourquoi pas Redux ?" → 3x plus de code pour le même résultat
- "Comment tester ?" → `useUserPrefsStore.setState({ theme: 'dark' })` dans les tests

## Points clés à transmettre

1. **Sélecteur ciblé = re-render minimal** (un sélecteur par valeur)
2. **State + actions au même endroit** (pas de reducer séparé)
3. **Aucun Provider** à brancher
4. **`persist`** pour 5 lignes de gain UX énorme
5. **Le store ne remplace pas un fetch** — c'est ce qu'on verra avec React Query

## Anti-patterns à éviter pendant le live

- ❌ `const { theme, setTheme } = useUserPrefsStore()` → re-render à chaque champ qui bouge
- ❌ Mettre `isModalOpen` ou un input contrôlé dans ce store
- ❌ Muter directement (`state.theme = "dark"`) sans `set`
