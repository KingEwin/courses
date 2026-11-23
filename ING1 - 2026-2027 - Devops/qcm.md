# QCM — DevOps (ING1) — Banque générale de 43 questions

Format : QCM à choix unique ou multiple. Une ou plusieurs bonnes réponses par question.
Notation des questions DJ1, DJ2 et DJ4 : les pondérations indiquées font foi. En choix multiple, les points des options cochées s'additionnent ; un plancher de 0 par question est conseillé.
Pour la séance 3, chaque question vaut 2 points : en choix unique, la bonne réponse vaut 2 points ; en choix multiple, chaque bonne réponse vaut 1 point. Une réponse incorrecte ne rapporte aucun point et n'entraîne pas de pénalité.

Couverture : DJ1 Culture & Git (9 questions), DJ2 Docker (9), séance 3 — CI/CD (20), DJ4 Pipeline & écosystème (5). Total : 43 titres de questions.
Sélection d'examen de la banque générale (hors QCM de clôture de la séance 3) : l'instructeur retient 25 à 30 questions (~30 min) et recalcule le total de la sélection pour le barème.
QCM de clôture de la séance 3 : les questions Q23 à Q42 forment la sélection de 20 questions prévue en 18 min.

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
- B. Sécuriser chaque étape du cycle (shift-left) `(+2)`
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
- E. `git revert` crée un commit d'annulation sans réécrire l'historique `(+1)`
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
- B. Le cache évite de relancer `npm ci` si les dépendances n'ont pas changé `(+3)`
- C. Parce que `COPY . .` est interdit avant une instruction `RUN` `(0)`
- D. Pour fusionner toutes les dépendances dans un unique layer compressé `(0)`

Réponse : B.

---

### Q19. Quel est le principe du multi-stage build ?

- A. Lancer plusieurs conteneurs à partir d'un seul Dockerfile `(0)`
- B. Build lourd, puis copie du résultat vers un stage léger `(+3)`
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

## Séance 3 — CI/CD

---

### Q23. Quel outil du panorama fournit une CI intégrée aux dépôts GitLab et utilise des runners ?

Choix unique — 2 points.

- A. GitHub Actions, intégré aux dépôts GitHub `(0 point)`
- B. GitLab CI/CD, intégré aux projets GitLab et exécuté par des runners `(2 points)`
- C. Jenkins, un serveur CI open source à exploiter séparément `(0 point)`
- D. Azure Pipelines, le service de CI/CD d'Azure DevOps `(0 point)`

Réponse : B. GitLab CI/CD s'intègre aux projets GitLab ; Jenkins est une autre solution, qui nécessite l'exploitation d'un serveur CI.

---

### Q24. Une règle GitLab exige un push et la variable `CI_COMMIT_BRANCH` définie. Quelles affirmations sont exactes ?

Choix multiple — 2 points.

- A. Un push sur une branche peut satisfaire la règle `(1 point)`
- B. Un tag satisfait la règle : `CI_COMMIT_BRANCH` contient son nom `(0 point)`
- C. Pour un tag, `CI_COMMIT_BRANCH` est absent : la règle échoue `(1 point)`
- D. Cette règle accepte aussi un lancement manuel sans vérifier les conditions `(0 point)`

Réponses : A, C. `CI_COMMIT_BRANCH` est défini pour un push de branche, mais pas pour un tag.

---

### Q25. Pourquoi intégrer de petits changements souvent et lancer des contrôles en CI ?

Choix multiple — 2 points.

- A. Une erreur est plus facile à isoler parmi peu de changements `(1 point)`
- B. Un retour rapide aide à corriger le commit concerné `(1 point)`
- C. La CI remplace la revue de code `(0 point)`
- D. La CI garantit que le déploiement en production a réussi `(0 point)`

Réponses : A, B. La CI automatise des vérifications et fournit un signal ; elle ne remplace ni la revue ni un déploiement.

---

### Q26. La version validée est prête. L’équipe décide quand la mettre en production. De quelle pratique s’agit-il ?

Choix unique — 2 points.

- A. Intégration continue (CI) `(0 point)`
- B. Déploiement continu `(0 point)`
- C. Livraison continue `(2 points)`
- D. Mise en cache continue `(0 point)`

Réponse : C. La livraison continue maintient une version déployable ; la décision de mise en production reste humaine. En déploiement continu, elle est automatisée après validation.

---

### Q27. Dans un pipeline, quelles descriptions sont correctes ?

Choix multiple — 2 points.

- A. Le runner est la machine qui exécute un job `(1 point)`
- B. Un artefact peut conserver un résultat produit par le job `(1 point)`
- C. Un déclencheur est toujours une commande shell exécutée dans le job `(0 point)`
- D. Un job et une étape (`step`) désignent toujours le même niveau `(0 point)`

Réponses : A, B. Le déclencheur lance le pipeline ; le job s'exécute sur un runner et contient des étapes ou commandes.

---

### Q28. Une équipe veut construire son front en CI et récupérer les fichiers produits. Quelles deux décisions ?

Choix multiple — 2 points.

- A. Ajouter au pipeline un job qui lance la commande de build adaptée au projet `(1 point)`
- B. Archiver comme artefact les fichiers de sortie effectivement produits `(1 point)`
- C. Archiver les sources sans exécuter leur commande de build `(0 point)`
- D. Déployer automatiquement le front en production après chaque push `(0 point)`

Réponses : A, B. Le job et le chemin de l'artefact s'adaptent au projet ; aucun framework ni gestionnaire de paquets précis n'est imposé.

---

### Q29. Dans GitHub Actions, que sélectionne `on: push: branches: ['**']` ?

Choix unique — 2 points.

- A. Tous les pushs de branche, y compris les noms avec `/` `(2 points)`
- B. Les seules pull requests qui visent la branche par défaut `(0 point)`
- C. Les lancements manuels depuis l'interface `(0 point)`
- D. Les tags, mais pas les branches `(0 point)`

Réponse : A. `push` réagit aux pushs ; le filtre `branches` porte ici sur les branches poussées, pas sur les tags.

---

### Q30. Dans `pull_request: branches: [main]`, à quoi s'applique le filtre `main` ?

Choix unique — 2 points.

- A. À la branche source de la pull request `(0 point)`
- B. À la branche cible de la pull request `(2 points)`
- C. Au nom du workflow `(0 point)`
- D. À la branche sur laquelle le runner est installé `(0 point)`

Réponse : B. Pour `pull_request`, le filtre sélectionne les pull requests qui visent `main`.

---

### Q31. Dans une étape GitHub Actions, quelle différence entre `uses` et `run` ?

Choix unique — 2 points.

- A. `uses` appelle une action ; `run` exécute une commande shell `(2 points)`
- B. `uses` choisit le runner ; `run` choisit la branche `(0 point)`
- C. `uses` archive toujours un artefact ; `run` ne peut pas échouer `(0 point)`
- D. Les deux mots-clés désignent des événements de déclenchement `(0 point)`

Réponse : A. `with` peut transmettre des paramètres à une action appelée avec `uses`.

---

### Q32. Un workflow compile le front et archive ses fichiers. Que permet le réglage `permissions: contents: read` ?

Choix multiple — 2 points.

- A. Le jeton du workflow peut lire le contenu du dépôt `(1 point)`
- B. Le job doit aussi recevoir `contents: write` pour téléverser l'artefact `(0 point)`
- C. Ce réglage n'accorde pas le droit d'écriture sur le dépôt `(1 point)`
- D. Il désactive les journaux du job `(0 point)`

Réponses : A, C. Lire les sources ne nécessite pas d'écriture ; l'archivage des fichiers du run ne requiert pas `contents: write`.

---

### Q33. Dans un job GitHub Actions, une vérification échoue avant l'étape `upload-artifact`. Que se passe-t-il par défaut ?

Choix unique — 2 points.

- A. Les étapes suivantes sont ignorées : ce run n'envoie pas l'artefact `(2 points)`
- B. Le runner relance automatiquement le workflow jusqu'au succès `(0 point)`
- C. L'échec est transformé en succès dès qu'un artefact est déclaré `(0 point)`
- D. L'artefact est envoyé avant le début des étapes `(0 point)`

Réponse : A. Par défaut, une étape ne s'exécute que si les étapes précédentes ont réussi.

---

### Q34. Dans GitLab CI, quelles affirmations sur `stages`, `image` et le runner sont exactes ?

Choix multiple — 2 points.

- A. Un stage regroupe des jobs pouvant s'exécuter en parallèle `(1 point)`
- B. Avec un exécuteur compatible, `image` définit l'environnement du job `(1 point)`
- C. `image` sélectionne le runner qui exécutera le job `(0 point)`
- D. Un stage est une commande shell exécutée avant `script` `(0 point)`

Réponses : A, B. Le runner exécute le job ; `image` ne le choisit pas et n'est utilisée que par des exécuteurs compatibles.

---

### Q35. Plusieurs entrées figurent dans `workflow: rules` de GitLab CI. Comment sont-elles évaluées ?

Choix unique — 2 points.

- A. Toutes s'exécutent et leurs effets s'additionnent `(0 point)`
- B. De bas en haut, jusqu'à la règle qui accepte le pipeline `(0 point)`
- C. De haut en bas ; la première règle applicable décide `(2 points)`
- D. Après les scripts, selon leur code de sortie `(0 point)`

Réponse : C. Les règles évaluées au moment de créer le pipeline déterminent si celui-ci existe ; celles d'un job déterminent sa participation.

---

### Q36. Quelles associations GitLab CI entre `when` et comportement sont correctes ?

Choix multiple — 2 points.

- A. `on_failure` lance le job après l'échec d'un stage précédent `(1 point)`
- B. `manual` attend un clic dans l'interface `(1 point)`
- C. `on_success` signifie que le job se lance uniquement après un échec `(0 point)`
- D. `when: never` force toujours le pipeline à réussir `(0 point)`

Réponses : A, B. `on_success` est le comportement par défaut après le succès des stages précédents.

---

### Q37. Dans un job GitLab CI, quelles affirmations sur `before_script`, `script` et `after_script` sont exactes ?

Choix multiple — 2 points.

- A. `before_script` prépare le travail avant les commandes de `script` `(1 point)`
- B. Nouveau shell : `after_script` ne récupère pas les exports de `script` `(1 point)`
- C. `after_script` remplace toujours les journaux du job `(0 point)`
- D. `before_script` est un événement qui crée le pipeline `(0 point)`

Réponses : A, B. Les vérifications qui déterminent le succès du job doivent être dans `script` ; `after_script` peut notamment ajouter des diagnostics.

---

### Q38. Une `parallel:matrix` contient 2 versions de Node et 2 modes. Combien de jobs peut-elle générer ?

Choix unique — 2 points.

- A. 2 jobs `(0 point)`
- B. 3 jobs `(0 point)`
- C. 4 jobs `(2 points)`
- D. 8 jobs `(0 point)`

Réponse : C. La matrice produit chaque combinaison : 2 × 2 = 4.

---

### Q39. Dans GitLab CI, que décrit `artifacts: paths: [dist/]` ?

Choix unique — 2 points.

- A. Les fichiers de `dist/` à conserver comme résultat du job `(2 points)`
- B. Le dossier à supprimer avant le build `(0 point)`
- C. Le runner auquel le job est affecté `(0 point)`
- D. Les fichiers à committer automatiquement dans le dépôt `(0 point)`

Réponse : A. Le chemin désigne la sortie à récupérer dans l'interface ou dans un job suivant.

---

### Q40. Quelle différence entre cache et artefact dans une CI ?

Choix multiple — 2 points.

- A. Le cache tente de réutiliser des fichiers pour accélérer une exécution `(1 point)`
- B. Un artefact sert à conserver et récupérer une sortie produite par un run `(1 point)`
- C. Le cache garantit l'installation, même avec des dépendances erronées `(0 point)`
- D. Un artefact est nécessaire pour déclencher un pipeline `(0 point)`

Réponses : A, B. Le cache peut manquer ; le lockfile fixe les dépendances. Il ne remplace pas l'artefact destiné à récupérer une sortie précise.

---

### Q41. Le job devient rouge pendant l'étape de build. Où regarder d'abord pour comprendre l'échec ?

Choix unique — 2 points.

- A. Le premier message d'erreur dans le journal de l'étape en échec `(2 points)`
- B. Le nom du cache, qui contient le journal complet `(0 point)`
- C. L'artefact, qui est forcément créé même si le build échoue `(0 point)`
- D. Le nom du runner, qui indique à lui seul la cause `(0 point)`

Réponse : A. Le journal du job indique la commande et la première erreur ; si le build échoue, l'étape d'archivage suivante est normalement ignorée.

---

### Q42. Quels repères de fichiers sont correctement associés aux outils présentés en séance ?

Choix multiple — 2 points.

- A. GitHub Actions : `.github/workflows/*.yml` `(1 point)`
- B. GitLab CI : `.gitlab-ci.yml` `(1 point)`
- C. Jenkins : `package.json` `(0 point)`
- D. Azure Pipelines : `Dockerfile` `(0 point)`

Réponses : A, B. Jenkins utilise habituellement un `Jenkinsfile` et Azure Pipelines un `azure-pipelines.yml` ; ces formats ne sont pas interchangeables.

---

## DJ4 — Pipeline CI/CD complet et écosystème

---

### Q43. Dans un job GitHub Actions, à quoi sert `needs: lint` sur le job `test` ?

- A. À exécuter `test` et `lint` en parallèle `(0)`
- B. À ne lancer `test` que si `lint` a réussi `(+2)`
- C. À fusionner les deux jobs en un seul runner `(0)`
- D. À relancer `lint` après `test` `(0)`

Réponse : B. Sans `needs`, les jobs s'exécutent en parallèle.

---

### Q44. Dans l'étape de build, que signifie `push: false` avec `docker/build-push-action` ?

- A. On construit l'image sans la pousser vers un registry `(+2)`
- B. On pousse l'image mais sans la construire `(0)`
- C. On désactive complètement le job `(0)`
- D. On supprime l'image après build `(0)`

Réponse : A. Pratique car aucun credential n'est requis (cible « réussie » du TP).

---

### Q45. Quelle analogie résume le mieux la montée en échelle Docker → Compose → Kubernetes ?

- A. Docker = plusieurs machines, Compose = une machine, K8s = un conteneur `(0)`
- B. 1 conteneur/hôte → plusieurs conteneurs/hôte → conteneurs multi-hôtes `(+2)`
- C. Les trois font exactement la même chose `(0)`
- D. Kubernetes remplace toujours Docker et Compose, même pour un petit projet `(−1)`

Réponse : B. Pour la majorité des projets, Compose suffit largement.

---

### Q46. Associez le vocabulaire Kubernetes : quelles correspondances sont correctes ?

- A. Cluster = le parc de machines `(+1)`
- B. Node = une machine du parc `(+1)`
- C. Pod = l'unité où tourne ton conteneur (la plus petite unité) `(+1)`
- D. Service = le stockage persistant des données `(−1)`
- E. Namespace = des « dossiers » pour ranger/isoler `(+1)`
- F. Deployment = le tableau de bord web de supervision du cluster `(−1)`

Réponses : A, B, C, E. Le Service est la « porte d'entrée » (adresse stable) vers l'app.

---

### Q47. Quels sont les 3 piliers de l'observabilité ?

- A. Logs (événements horodatés, « que s'est-il passé ? ») `(+1)`
- B. Métriques (chiffres agrégés : CPU, latence, taux d'erreur) `(+1)`
- C. Traces (parcours d'une requête à travers les services) `(+1)`
- D. Backups (sauvegardes régulières de la base de données) `(−1)`
- E. Firewalls (règles de filtrage du trafic réseau) `(−1)`

Réponses : A, B, C.

---

## Récapitulatif notation

- Banque générale : 43 questions réelles — DJ1 (9), DJ2 (9), séance 3 (20), DJ4 (5).
- QCM de clôture de la séance 3 : 20 questions, Q23 à Q42, pour 18 min.
- Score maximum séance 3 : 40 points (20 × 2 points).
- Choix unique séance 3 : Q23, Q26, Q29, Q30, Q31, Q33, Q35, Q38, Q39, Q41 (10).
- Choix multiple séance 3 : Q24, Q25, Q27, Q28, Q32, Q34, Q36, Q37, Q40, Q42 (10). Pour chaque question, les deux bonnes réponses valent 1 point chacune.
- Barème conseillé (en % du total de la sélection retenue) :
  - ≥ 85% : excellente maîtrise
  - 70–84% : bonne maîtrise
  - 50–69% : acquis avec lacunes ciblées
  - < 50% : reprendre les notions clés (CALMS/DORA, Docker/multi-stage, Compose, pipeline GitHub Actions)
