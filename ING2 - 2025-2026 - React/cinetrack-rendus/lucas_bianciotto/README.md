# CineTrack

CineTrack est une application web de suivi de films et séries, inspirée de l'interface Netflix. Elle permet de gérer sa liste personnelle de titres à regarder, en cours ou terminés.

## Fonctionnalités

- **Ajouter** un film ou une série (titre, type, statut, note sur 10, affiche)
- **Modifier** une CineCard existante via une modal pré-remplie
- **Supprimer** un titre de la liste
- **Changer le statut** directement depuis la carte (à regarder / en cours / terminé)
- **Rechercher** un titre par nom
- Affichage en grille avec notation par étoiles et badges de statut colorés

## Stack technique

- **Next.js** (App Router) avec **React 19**
- **Zustand** pour la gestion d'état côté client
- **TanStack Form** pour les formulaires avec validation
- **Tailwind CSS 4** pour le style
- **TypeScript**

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Utilisation de l'IA

J'ai utilisé l'IA (Claude) comme assistant de développement tout au long du projet. En particulier, elle m'a aidé à **comprendre le fonctionnement des stores Zustand** : comment structurer l'état global, comment définir les actions (`addItem`, `deleteItem`, `updateStatus`, `updateItem`) et comment les consommer depuis les composants avec le hook `useCineStore`. Cela m'a permis de saisir la logique de gestion d'état centralisée sans base préalable sur Zustand.

L'IA a également généré les composants modaux d'ajout et d'édition, que j'ai pu relire et adapter.
