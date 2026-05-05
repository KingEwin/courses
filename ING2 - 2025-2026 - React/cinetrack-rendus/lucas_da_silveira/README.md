# CineTrack - Lucas Da Silveira ING2

CineTrack est une application Next.js full-stack pour rechercher, noter et sauvegarder la progression de vos films et séries préférés.

## Prérequis

- Node.js (version 18 ou supérieure recommandée)
- Une clé pour l'API [OMDb](http://www.omdbapi.com/)

## Installation et Configuration

**1. Installer les dépendances**
```bash
npm install
```

**2. Variables d'environnement**
Créez un fichier `.env.local` à la racine du projet et ajoutez-y les variables requises :
```bash
# Clé API pour rechercher des films via OMDb
NEXT_PUBLIC_OMDB_API_KEY="votre_cle_omdb_ici"
```

**3. Initialiser la base de données (SQLite avec Prisma)**
Générez le client Prisma et poussez le schéma dans la base de données locale :
```bash
npx prisma generate
npx prisma db push
```

**4. Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000). Vous pourrez créer un compte, puis rechercher et ajouter des films à votre liste personnelle !
