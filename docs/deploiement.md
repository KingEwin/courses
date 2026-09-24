# Déploiement — `course-network-devops`

Ce document décrit le déploiement conteneurisé du cours `ING1 - 2026-2027 - Devops`
sur le VPS, via GitHub Actions, Docker Compose et Traefik.

## Architecture

- **Build** : image multi-stage (`../deployment/Dockerfile`) — stage 1 Node 20 Alpine exécute
  `npm ci` (lockfile racine) puis `slidev build` sur le cours ciblé (build arg
  `COURSE_DIR`, défaut `ING1 - 2026-2027 - Devops`) ; stage 2 sert le dist
  statique via `nginxinc/nginx-unprivileged:1.27-alpine` (non-root, port 8080).
- **Runtime** : `compose.yaml` définit le service `course-network-devops`,
  durci (`read_only`, `cap_drop: ALL`, `no-new-privileges`, tmpfs pour
  `/tmp`, `/var/cache/nginx`, `/var/run`), sans port publié, raccordé au
  réseau Docker externe `traefik-proxy`.
- **Routage** : labels Traefik exposent `course-network-devops.hoststack.tech`
  sur l'entrypoint `${TRAEFIK_ENTRYPOINT:-websecure}` avec TLS et
  `certresolver=letsencrypt`.
- **Déploiement** : `.github/workflows/deploy.yml` — sur push `main` touchant
  les fichiers de déploiement ou le cours, le workflow rsync les sources vers
  une release timestampée par SHA sur le VPS, bascule un symlink `current`,
  puis exécute `docker compose build --pull && up -d --remove-orphans`
  distant, et vérifie l'état de santé du conteneur.

> **Important** : cette configuration cible **un seul cours/domaine** par
> service Compose racine. Pour ajouter un futur cours avec son propre domaine,
> ne pas réutiliser/écraser ce service : créer un service Compose et un
> répertoire de releases dédiés, paramétrés indépendamment (nom de service,
> `COURSE_DIR`, host Traefik, chemin de releases).

## Secrets GitHub requis

À créer dans **Settings → Secrets and variables → Actions** du dépôt (noms
uniquement, aucune valeur ici) :

| Secret | Usage |
|---|---|
| `VPS_HOST` | Hôte SSH du VPS cible |
| `VPS_USER` | Utilisateur SSH (actuellement `root`, cf. limite ci-dessous) |
| `VPS_SSH_PRIVATE_KEY` | Clé privée SSH dédiée au déploiement |
| `VPS_SSH_KNOWN_HOSTS` | Contenu `known_hosts` du VPS (empreinte hôte, pour `StrictHostKeyChecking=yes`) |
| `VPS_SSH_PORT` | *(optionnel)* Port SSH si différent de `22` |

## Prérequis VPS (bootstrap manuel, une seule fois)

1. Docker Engine + plugin Docker Compose installés et démarrés.
2. Réseau Docker externe Traefik déjà créé :
   ```bash
   docker network create traefik-proxy
   ```
   (ou déjà existant si Traefik est déjà en place sur l'hôte).
3. Traefik configuré avec :
   - un entrypoint websecure (nom par défaut attendu : `websecure`, override
     possible via la variable d'environnement Compose `TRAEFIK_ENTRYPOINT`
     au moment du `docker compose build/up` si un entrypoint différent est
     utilisé sur ce VPS) ;
   - un certresolver nommé exactement `letsencrypt` ;
   - Traefik lui-même connecté au réseau `traefik-proxy`.
4. DNS : `course-network-devops.hoststack.tech` doit pointer vers l'IP
   publique du VPS (enregistrement A/AAAA), pour la validation ACME HTTP/TLS.
5. Arborescence de déploiement présente :
   ```bash
   mkdir -p /root/opt/docker/apps/slidev/releases
   ```

## Premier déploiement manuel (validation avant automatisation)

Depuis un poste ayant accès SSH au VPS :

```bash
ssh <user>@<host>
mkdir -p /root/opt/docker/apps/slidev/releases/manual-init
# rsync manuel des fichiers de déploiement + du dossier du cours vers
# /root/opt/docker/apps/slidev/releases/manual-init, en excluant .git,
# node_modules, dist (mêmes exclusions que le workflow CI).
ln -sfn /root/opt/docker/apps/slidev/releases/manual-init /root/opt/docker/apps/slidev/current
cd /root/opt/docker/apps/slidev
docker compose -f current/compose.yaml --project-name course-network-devops build --pull
docker compose -f current/compose.yaml --project-name course-network-devops up -d --remove-orphans
docker inspect --format '{{.State.Health.Status}}' course-network-devops
```

## URL attendue

Après déploiement réussi et propagation DNS/ACME :
`https://course-network-devops.hoststack.tech`

## Rollback

Chaque déploiement crée une nouvelle release sous
`/root/opt/docker/apps/slidev/releases/<sha>` sans jamais supprimer les
précédentes. Pour revenir à une version antérieure :

```bash
ssh <user>@<host>
ls /root/opt/docker/apps/slidev/releases/        # identifier le SHA cible
ln -sfn /root/opt/docker/apps/slidev/releases/<sha-precedent> \
  /root/opt/docker/apps/slidev/current
cd /root/opt/docker/apps/slidev
docker compose -f current/compose.yaml --project-name course-network-devops up -d --remove-orphans
```

Le service n'est jamais arrêté (`docker compose down`) pendant un déploiement
ou un rollback : seul `up -d --remove-orphans` est utilisé, pour préserver la
disponibilité.

## Dépannage

- **Conteneur non `healthy`** : `docker inspect --format '{{json .State}}' course-network-devops`
  sur le VPS ; consulter aussi `docker logs course-network-devops`.
- **404/erreur Traefik** : vérifier que le réseau `traefik-proxy` est bien
  externe et que Traefik y est connecté, que le DNS résout vers le VPS, et
  que l'entrypoint/certresolver déclarés dans `compose.yaml` correspondent à
  la configuration Traefik réelle de l'hôte.
- **Entrypoint Traefik différent de `websecure`** : positionner la variable
  d'environnement `TRAEFIK_ENTRYPOINT` dans l'environnement où `docker
  compose build/up` est exécuté sur le VPS (ex. via un fichier `.env` à côté
  de `current/compose.yaml`, non versionné) avant de relancer `up -d`.
- **Échec SSH strict host checking** : régénérer/mettre à jour le secret
  `VPS_SSH_KNOWN_HOSTS` (`ssh-keyscan -p <port> <host>`) si l'empreinte hôte
  du VPS a changé.

## Limite connue et amélioration future

Le déploiement utilise actuellement l'utilisateur `root` sur le VPS
(`VPS_USER`), ce qui fonctionne mais élargit inutilement la surface
d'attaque en cas de compromission de la clé SSH de déploiement. Une
amélioration future recommandée : créer un utilisateur dédié au déploiement,
membre du groupe `docker`, avec des permissions restreintes au répertoire
`/root/opt/docker/apps/slidev` (ou déplacer ce répertoire hors de `/root`),
et mettre à jour le secret `VPS_USER` en conséquence.
