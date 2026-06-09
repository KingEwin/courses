# QCM — DevOps (ING1) — 35 questions

Format : QCM à choix unique ou multiple. Une ou plusieurs bonnes réponses par question.
Notation : poids positifs pour les bonnes réponses, 0 pour les neutres. Les poids négatifs (−) ne sont utilisés que sur les contre-vérités flagrantes. Pour les questions à choix multiple, les points de chaque option cochée s'additionnent ; on conseille un plancher à 0 par question.

Total maximum (banque complète) : 99 points
Couverture : DJ1 Culture & Git (Q1–11), DJ2 Docker (Q12–22), DJ3 Compose & bases CI/CD (Q23–28), DJ4 Pipeline & écosystème (Q29–35)
Sélection examen : l'instructeur retient 25 à 30 questions (~30 min) ; recalculer le total de la sélection pour le barème.

---

## DJ1 — Culture DevOps et Git en équipe

---

### Q1. Que signifie l'acronyme CALMS ?

- A. Code, Automation, Logs, Monitoring, Security `(0)`
- B. Culture, Automation, Lean, Measurement, Sharing `(+2)`
- C. Continuous, Agile, Lean, Microservices, Scrum `(0)`
- D. Culture, Agile, Logs, Metrics, Stability `(0)`

Réponse : B.

---

### Q2. Dans le mouvement DevOps, pourquoi la « Culture » est-elle citée en premier dans CALMS ?

- A. Par ordre alphabétique uniquement `(0)`
- B. Parce que sans culture partagée, les outils ne servent à rien `(+2)`
- C. Parce que la culture remplace l'automatisation `(0)`
- D. Parce que c'est le pilier le moins important `(−1)`

Réponse : B.

---

### Q3. À l'origine, quel est le conflit structurel entre les Devs et les Ops ?

- A. Les Devs veulent livrer vite, les Ops veulent de la stabilité `(+2)`
- B. Les Devs codent en Java, les Ops en Python `(0)`
- C. Les Ops refusent d'utiliser Git `(0)`
- D. Les Devs sont mieux payés que les Ops `(0)`

Réponse : A. Objectifs opposés : chaque livraison nouvelle est un risque pour l'Ops.

---

### Q4. Quelles sont les trois voies du DevOps ?

- A. Le flux (Dev → Ops sans friction) `(+1)`
- B. Le feedback (retour rapide de la prod vers Dev) `(+1)`
- C. L'apprentissage continu (expérimenter, mesurer, capitaliser) `(+1)`
- D. La centralisation (un seul décideur) `(−1)`
- E. La facturation (mesurer le coût par déploiement) `(0)`

Réponses : A, B, C.

---

### Q5. Lesquelles font partie des 4 métriques DORA ?

- A. Deployment Frequency (fréquence de déploiement) `(+1)`
- B. Lead Time for Changes (temps du commit au déploiement) `(+1)`
- C. Change Failure Rate (% de déploiements causant un incident) `(+1)`
- D. Mean Time to Restore / MTTR (temps de retour à la normale) `(+1)`
- E. Nombre de commits par développeur et par jour `(−1)`
- F. Code Coverage — pourcentage de lignes couvertes par les tests `(−1)`

Réponses : A, B, C, D. A et B mesurent la vitesse, C et D la stabilité ; ni le volume de commits ni la couverture ne sont des métriques DORA.

---

### Q6. Que cherche à faire le DevSecOps ?

- A. Confier la sécurité à une équipe externe en fin de projet `(0)`
- B. Intégrer la sécurité à chaque étape du cycle plutôt qu'en fin de chaîne (shift-left) `(+2)`
- C. Supprimer les audits de sécurité pour aller plus vite `(−1)`
- D. Chiffrer tous les dépôts Git `(0)`

Réponse : B.

---

### Q9. Concernant la taille des Pull Requests, quelles affirmations sont correctes ?

- A. Une PR < 200 lignes se review en ~15 min `(+1)`
- B. Au-delà de ~500 lignes, la qualité de la review chute fortement `(+1)`
- C. Découper une grosse PR est une compétence à part entière `(+1)`
- D. Plus une PR est grosse, mieux les bugs sont détectés `(−1)`
- E. Une PR de 1000+ lignes garantit une review approfondie `(−1)`

Réponses : A, B, C.

---

### Q10. En SemVer (`MAJOR.MINOR.PATCH`), quel changement impose un bump MAJOR ?

- A. Correction d'un bug rétrocompatible `(0)`
- B. Ajout d'un endpoint sans casser l'existant `(0)`
- C. Renommage / suppression d'un endpoint (breaking change) `(+2)`
- D. Refactoring interne sans impact sur l'API `(0)`

Réponse : C. La question clé : « l'utilisateur devra-t-il changer son code ? »

---

### Q11. À propos de merge vs rebase, quelles affirmations sont vraies ?

- A. Le merge conserve l'historique réel et crée un commit de merge `(+1)`
- B. Le rebase réécrit l'historique pour le rendre linéaire `(+1)`
- C. Le rebase est déconseillé sur une branche déjà publiée ou partagée `(+1)`
- D. `git reset --hard` est sans danger sur une branche partagée `(−1)`
- E. `git revert` annule un commit en en créant un nouveau, sans réécrire l'historique `(+1)`
- F. Un rebase conserve à l'identique les identifiants (SHA) des commits `(−1)`

Réponses : A, B, C, E.

---

## DJ2 — Docker et conteneurisation

---

### Q12. Quelle est la différence fondamentale entre une VM et un conteneur ?

- A. Le conteneur embarque un OS complet, la VM partage le kernel `(0)`
- B. Le conteneur partage le kernel de l'hôte, la VM embarque un OS complet `(+2)`
- C. Il n'y a aucune différence technique `(0)`
- D. Une VM démarre en secondes, un conteneur en minutes `(−1)`

Réponse : B. D'où le démarrage en secondes et la taille en Mo plutôt qu'en Go.

---

### Q13. Quels sont des avantages réels de la conteneurisation ?

- A. Reproductibilité (même image, même comportement partout) `(+1)`
- B. Portabilité (local, CI, prod : même artefact) `(+1)`
- C. Démarrage rapide et densité accrue `(+1)`
- D. Elle supprime le besoin d'écrire des tests `(−1)`
- E. Isolation entre conteneurs `(+1)`
- F. Elle garantit une isolation totale, équivalente à celle d'une VM `(−1)`

Réponses : A, B, C, E.

---

### Q14. Quelle analogie décrit correctement le couple image / conteneur ?

- A. L'image est l'instance vivante, le conteneur est le template figé `(0)`
- B. L'image ≈ une classe (template figé), le conteneur ≈ une instance/objet `(+2)`
- C. Image et conteneur sont deux mots pour la même chose `(0)`
- D. Une image ne peut produire qu'un seul conteneur `(−1)`

Réponse : B. 1 image → N conteneurs simultanés.

---

### Q15. À propos des layers d'une image Docker, quelles affirmations sont vraies ?

- A. Chaque instruction du Dockerfile crée un layer `(+1)`
- B. Les layers sont immuables, mis en cache et partagés entre images `(+1)`
- C. Modifier une instruction invalide ce layer et tous les layers suivants `(+1)`
- D. Modifier une instruction n'invalide aucun layer déjà en cache `(−1)`
- E. Mettre ce qui change souvent en haut du Dockerfile optimise le cache `(−1)`

Réponses : A, B, C. Ce qui change souvent doit aller **en bas** pour préserver le cache.

---

### Q16. Pourquoi copier `package*.json` puis lancer `npm ci` **avant** de copier tout le code ?

- A. Pour respecter l'ordre alphabétique imposé aux instructions d'un Dockerfile `(0)`
- B. Pour profiter du cache : `npm ci` ne se rejoue que si les dépendances changent `(+3)`
- C. Parce que `COPY . .` est interdit avant une instruction `RUN` `(0)`
- D. Pour fusionner toutes les dépendances dans un unique layer compressé `(0)`

Réponse : B.

---

### Q19. Quel est le principe du multi-stage build ?

- A. Lancer plusieurs conteneurs à partir d'un seul Dockerfile `(0)`
- B. Construire dans un stage « lourd », puis copier le résultat dans un stage « léger » `(+3)`
- C. Compiler le code deux fois pour plus de sûreté `(0)`
- D. Diviser le Dockerfile en plusieurs fichiers séparés `(0)`

Réponse : B. L'image finale = uniquement le dernier stage.

---

### Q20. Dans un Dockerfile multi-stage, que fait `COPY --from=builder /app/dist ./dist` ?

- A. Copie un dossier depuis le système de fichiers de la machine hôte `(0)`
- B. Copie le dossier `dist` depuis le stage `builder` vers le stage courant `(+2)`
- C. Télécharge le dossier `dist` depuis un registry distant `(0)`
- D. Supprime le dossier `dist` du builder `(0)`

Réponse : B.

---

### Q21. À quoi sert un fichier `.dockerignore` ?

- A. Empêcher de copier des fichiers inutiles ou sensibles dans l'image `(+1)`
- B. Accélérer le build (moins de contexte envoyé au daemon) `(+1)`
- C. Améliorer la sécurité en évitant d'embarquer des secrets `(+1)`
- D. Ignorer des fichiers lors d'un `git commit` `(−1)`
- E. Lister les ports à exposer `(0)`

Réponses : A, B, C.

---

### Q22. Quelles pratiques réduisent réellement la taille / la surface d'attaque d'une image ?

- A. Utiliser une image de base alpine ou slim quand c'est possible `(+1)`
- C. Épingler les versions (`node:20.10` plutôt que `node:latest`) `(+1)`
- D. Copier les secrets dans l'image pour les avoir sous la main `(−1)`
- E. Utiliser un multi-stage build `(+1)`
- F. Installer le plus d'outils de debug possible pour intervenir en prod `(−1)`

Réponses : A, B, C, E.

---

## DJ3 — Docker Compose et bases CI/CD

---

### Q23. Quel est l'intérêt principal de Docker Compose ?

- A. Construire une image Docker plus petite `(0)`
- B. Décrire toute une stack multi-conteneurs dans un fichier YAML `(+2)`
- C. Remplacer GitHub Actions `(0)`
- D. Orchestrer des conteneurs sur plusieurs machines `(0)`

Réponse : B. Le multi-machines, c'est plutôt Kubernetes.

---

### Q24. Dans un `docker-compose.yml`, quel est le rôle des sections top-level ?

- A. `services` décrit les conteneurs `(+1)`
- B. `volumes` déclare le stockage persistant nommé `(+1)`
- C. `networks` permet de définir des réseaux custom `(+1)`
- D. `services` sert à stocker les secrets en clair `(−1)`
- E. Compose ne crée jamais de réseau par défaut `(−1)`

Réponses : A, B, C. Compose crée automatiquement un réseau pour les services.

---

### Q25. Que change l'ajout de `condition: service_healthy` dans un `depends_on` ?

- A. Rien, c'est purement décoratif et sans effet au démarrage `(0)`
- B. Le service attend que le **healthcheck** de sa dépendance passe avant de démarrer `(+3)`
- C. Il redémarre automatiquement la dépendance toutes les 5 secondes jusqu'au succès `(0)`
- D. Il supprime la dépendance au démarrage `(0)`

Réponse : B. Sans healthcheck, `depends_on` ne garantit que l'ordre de démarrage, pas que la DB accepte les connexions.

---

### Q27. Quel déclencheur (`on:`) GitHub Actions correspond à quel usage ?

- A. `push` se déclenche sur push d'un commit (filtrable par branche) `(+1)`
- B. `pull_request` se déclenche à l'ouverture/mise à jour d'une PR `(+1)`
- C. `schedule` (cron) se déclenche à heure fixe `(+1)`
- D. `workflow_dispatch` se déclenche automatiquement à chaque commit `(−1)`
- E. `release` se déclenche lors de la création d'une release `(+1)`
- F. `issue_comment` se déclenche à chaque push sur la branche par défaut `(−1)`

Réponses : A, B, C, E. `workflow_dispatch` = déclenchement **manuel** (bouton).

---

### Q28. Pourquoi cacher les dépendances (`cache: 'npm'`) dans un workflow GitHub Actions ?

- A. Parce que c'est obligatoire dans GitHub Actions `(0)`
- B. Pour réduire le temps d'installation des dépendances entre runs `(+2)`
- C. Pour éviter de committer le dossier `node_modules` dans le dépôt `(0)`
- D. Pour chiffrer les dépendances stockées sur le runner `(0)`

Réponse : B. La clé de cache est généralement basée sur le hash du lockfile.

---

## DJ4 — Pipeline CI/CD complet et écosystème

---

### Q29. Dans un job GitHub Actions, à quoi sert `needs: lint` sur le job `test` ?

- A. À exécuter `test` et `lint` en parallèle `(0)`
- B. À ne lancer `test` que si `lint` a réussi `(+2)`
- C. À fusionner les deux jobs en un seul runner `(0)`
- D. À relancer `lint` après `test` `(0)`

Réponse : B. Sans `needs`, les jobs s'exécutent en parallèle.

---

### Q30. Dans l'étape de build, que signifie `push: false` avec `docker/build-push-action` ?

- A. On construit l'image sans la pousser vers un registry `(+2)`
- B. On pousse l'image mais sans la construire `(0)`
- C. On désactive complètement le job `(0)`
- D. On supprime l'image après build `(0)`

Réponse : A. Pratique car aucun credential n'est requis (cible « réussie » du TP).

---

### Q33. Quelle analogie résume le mieux la montée en échelle Docker → Compose → Kubernetes ?

- A. Docker = plusieurs machines, Compose = une machine, K8s = un conteneur `(0)`
- B. Docker = 1 conteneur sur 1 machine, Compose = plusieurs conteneurs sur 1 machine, K8s = plein de conteneurs sur plusieurs machines `(+2)`
- C. Les trois font exactement la même chose `(0)`
- D. Kubernetes remplace toujours Docker et Compose, même pour un petit projet `(−1)`

Réponse : B. Pour la majorité des projets, Compose suffit largement.

---

### Q34. Associez le vocabulaire Kubernetes : quelles correspondances sont correctes ?

- A. Cluster = le parc de machines `(+1)`
- B. Node = une machine du parc `(+1)`
- C. Pod = l'unité où tourne ton conteneur (la plus petite unité) `(+1)`
- D. Service = le stockage persistant des données `(−1)`
- E. Namespace = des « dossiers » pour ranger/isoler `(+1)`
- F. Deployment = le tableau de bord web de supervision du cluster `(−1)`

Réponses : A, B, C, E. Le Service est la « porte d'entrée » (adresse stable) vers l'app.

---

### Q35. Quels sont les 3 piliers de l'observabilité ?

- A. Logs (événements horodatés, « que s'est-il passé ? ») `(+1)`
- B. Métriques (chiffres agrégés : CPU, latence, taux d'erreur) `(+1)`
- C. Traces (parcours d'une requête à travers les services) `(+1)`
- D. Backups (sauvegardes régulières de la base de données) `(−1)`
- E. Firewalls (règles de filtrage du trafic réseau) `(−1)`

Réponses : A, B, C.

---

## Récapitulatif notation

- Total maximum (banque complète) : 99 points
  - DJ1 (Q1–11) : 27 points
  - DJ2 (Q12–22) : 28 points
  - DJ3 (Q23–28) : 18 points
  - DJ4 (Q29–35) : 26 points
- Choix unique : Q1, Q2, Q3, Q6, Q7, Q8, Q10, Q12, Q14, Q16, Q17, Q18, Q19, Q20, Q23, Q25, Q26, Q28, Q29, Q30, Q32, Q33 (22)
- Choix multiple : Q4, Q5, Q9, Q11, Q13, Q15, Q21, Q22, Q24, Q27, Q31, Q34, Q35 (13)
- Barème conseillé (en % du total de la sélection retenue) :
  - ≥ 85% : excellente maîtrise
  - 70–84% : bonne maîtrise
  - 50–69% : acquis avec lacunes ciblées
  - < 50% : reprendre les notions clés (CALMS/DORA, Docker/multi-stage, Compose, pipeline GitHub Actions)
