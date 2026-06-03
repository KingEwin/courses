# Utilisation de l'IA sur ce projet

Ce projet a été développé avec l'assistance de **Claude (Anthropic)** en mode *pair-programming* conversationnel. L'IA n'a pas généré tous le projet : C'est moi qui est fait l'architecture et l'esthétique completement. Et pour ce qui est des composants React, l'ia est intervenu comme un binome, je décris ce que je veux, je précise quel concept de réact utilisé pour quoi, il propose, je valide et j'ajuste.

## Ce sur quoi l'IA m'a assisté

- **Backend (API, Prisma, TMDB)** : rédaction des routes serveur Next.js (App Router) qui appellent TMDB sans exposer la clé côté client, design du schéma Prisma (modèles `Film`, `User`, statuts), et server actions pour les opérations CRUD. J'ai relu et ajusté chaque handler avant intégration.
- **Debug & refacto** : diagnostic de bugs, nettoyage de doublons, extraction de composants quand un fichier devenait trop dense.
- **Rédaction de README.md**

## Ce sur quoi l'IA m'a guidé

- **Composants React & UI** : l'architecture macro de tous les composants visibles (`FilmCard`, `FilmGrid`, `AddFilmDialog`, `FilmDetailView`, `RatingEditor`, `StatusSelector`, `DSHeader`, `HomeView`, etc.) a était fait par moi. Choix de structure, props, composition et hook.
- **Esthétique Nintendo DS** : direction artistique, palette, typographie pixel, accents DS sur layout standard — décisions et implémentation à 100% manuelles.
- **(BONUS) : Animation d'introduction au site** : Quand un utilisateur rejoint le site pour la toute premiere fois, l'intro du démarrage de la DS se lance : Fait avec GSAP, premiere fois que j'utilise cette librairie, donc j'ai demander a Claude de juste me généré un code d'exemple de composant réact utilisant gsap, pour faire apparaitre un fond blanc avec fondu progessive pour révélé le site derriere, ainsi qu'un bloc noir qui bouge via translation, pour apprendre les bases, joué avec le code, et prendre la main avec la librairie. J'ai fait le reste de l'animation a partir d'ici.
