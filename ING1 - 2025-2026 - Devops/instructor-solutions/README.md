# Solutions — Dockerfiles du moins au plus optimisé

⚠️ **Ne regarde ces fichiers qu'après avoir tenté toi-même.**

| Niveau | Fichier | Base | Taille typique | Techniques |
|--------|---------|------|----------------|------------|
| 1 — Naïf | `Dockerfile.v1-naive` | `node:20` | ~1.1 - 1.5 Go | Tout en vrac |
| 2 — Bonnes pratiques | `Dockerfile.v2-good-practices` | `node:20-alpine` | ~400 - 500 Mo | `npm ci`, ordre des layers, alpine |
| 3 — Multi-stage | `Dockerfile.v3-multistage` | `node:20-alpine` | ~180 - 220 Mo | `+` séparation build / runtime |
| 4 — Production | `Dockerfile.v4-production` | `node:20-alpine` | ~150 - 180 Mo | `+` user non-root, healthcheck, cache clean |

## Tester une solution

```bash
docker build -f solutions/Dockerfile.v1-naive -t mon-api:v1 .
docker build -f solutions/Dockerfile.v2-good-practices -t mon-api:v2 .
docker build -f solutions/Dockerfile.v3-multistage -t mon-api:v3 .
docker build -f solutions/Dockerfile.v4-production -t mon-api:v4 .

# Comparer les tailles
docker images mon-api
```

## Ce que chaque niveau apporte

### V1 → V2 : bonnes pratiques de base
- **`npm ci`** au lieu de `npm install` → reproductible, plus rapide
- **Ordre des `COPY`** : `package*.json` avant le code → cache préservé
- **Base `alpine`** : ~80 Mo au lieu de ~1 Go

### V2 → V3 : multi-stage
- Le compilateur TypeScript et les `devDependencies` ne partent **pas** en prod
- Image finale = `node:20-alpine` + `dist/` + `node_modules` de prod uniquement

### V3 → V4 : durcissement production
- **Utilisateur non-root** : limite la surface d'attaque si compromission
- **`HEALTHCHECK`** : Docker / Compose / K8s peuvent surveiller la santé
- **`npm cache clean`** : enlève le cache npm de l'image finale
