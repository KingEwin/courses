# TP DevOps — lancer les exemples Docker et CI

Ce dossier contient deux façons de lancer le front React et deux exemples de CI pour un dépôt étudiant. Les exemples CI restent inactifs dans le dépôt du cours : ils ne deviennent un workflow que lorsqu’on copie l’un d’eux dans le dépôt étudiant indiqué ci-dessous.

## Prérequis

- Docker installé et démarré ; vérifier avec `docker --version`.
- Docker Compose v2 ; vérifier avec `docker compose version`.
- Un terminal Bash (macOS, Linux ou WSL sous Windows).

Depuis la racine du dépôt du cours, rejoindre ce dossier :

```bash
cd "ING1 - 2026-2027 - Devops/tp"
```

Les commandes ci-dessous sont à exécuter depuis `tp/`.

## Lancer uniquement le front React avec Docker

Cette image construit le front React/Vite avec Bun, puis sert les fichiers statiques avec nginx. Elle ne contient pas l’API du scénario Compose.

Construire l’image et démarrer le conteneur :

```bash
docker build -t ing1-tp-react docker/react
docker run --rm -d --name ing1-tp-react -p 127.0.0.1:8081:80 ing1-tp-react
```

Ouvrir <http://localhost:8081/>. La page React et son compteur doivent s’afficher. Le port `8081` est celui du poste ; nginx écoute sur le port `80` dans le conteneur.

Arrêter le conteneur :

```bash
docker stop ing1-tp-react
```

`--rm` supprime le conteneur à son arrêt ; l’image construite reste disponible. Si le démarrage échoue parce que le nom est déjà utilisé, arrêter d’abord un ancien conteneur portant ce nom. Si le port `8081` est déjà occupé, il faut libérer ce port avant de relancer la commande.

## Lancer le front et l’API avec Docker Compose

Compose construit deux services : le front React/nginx (`frontend`) et l’API Express (`backend`). Le navigateur accède au front sur le port `8080` ; nginx relaie `/api/hello` vers l’API sur le réseau interne Compose. L’API n’est pas publiée directement sur un port du poste. Cet exemple ne comprend ni base de données ni persistance.

Construire et démarrer les deux services en arrière-plan :

```bash
docker compose -f docker-compose/compose.yml up --build -d
```

Vérifier le front dans <http://localhost:8080/>. La page affiche le compteur React et la réponse de l’API. Vérifier également l’endpoint directement :

```bash
curl -fsS http://localhost:8080/api/hello
```

La réponse JSON contient `message` (`Hello World!`) et `timestamp`. Si l’API ne répond pas juste après le démarrage, attendre quelques secondes puis réessayer : `depends_on` ordonne le démarrage, mais n’attend pas que l’API soit prête.

Consulter l’état et les journaux des services, puis arrêter l’ensemble :

```bash
docker compose -f docker-compose/compose.yml ps
docker compose -f docker-compose/compose.yml logs frontend backend
docker compose -f docker-compose/compose.yml down
```

## Essayer un exemple de CI dans un dépôt étudiant

Les fichiers suivants sont des exemples complets, non activés dans le dépôt du cours :

- [GitHub Actions](ci-examples/github-actions.example.yml)
- [GitLab CI](ci-examples/gitlab-ci.example.yml)

Pour les essayer, créer ou utiliser un dépôt étudiant distinct, puis :

1. Copier **tout le contenu** de `docker/react/` à la racine du dépôt étudiant, y compris `.gitignore`, `bun.lock`, les sources et les assets. Ne pas copier `node_modules/` ni `dist/`.
2. Choisir **un seul** exemple CI et le copier dans le dépôt étudiant sous le nom attendu :
   - GitHub Actions : `.github/workflows/ci.yml` (créer les répertoires `.github/workflows` si nécessaire) ;
   - GitLab CI : `.gitlab-ci.yml` à la racine.
3. Envoyer un commit sur une branche. Le push déclenche le job correspondant ; les deux exemples vérifient les pushs de branches, pas les tags.
4. Consulter le journal du job pour voir l’installation des dépendances, ESLint, la compilation et le contrôle de présence de `dist/index.html`. En cas de succès, télécharger l’artefact `react-dist`, qui contient `dist/`.

GitLab requiert un runner compatible avec la clé `image` (par exemple avec un exécuteur Docker ou Kubernetes). Aucun déploiement n’est configuré : le job valide et archive le build, il ne publie pas l’application. Les exemples ne définissent pas de suite de tests applicatifs.
