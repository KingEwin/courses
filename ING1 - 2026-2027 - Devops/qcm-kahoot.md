# Banque QCM Kahoot — Cloud, Réseaux et DevOps (ING1)

Banque de 80 questions (20 par séance) destinée à être recopiée dans Kahoot (ou équivalent) pour les QCM de clôture de chaque séance. Chaque question précise si plusieurs réponses sont attendues. Aucune question ne dépasse le contenu réellement enseigné en séance.

Format par question :

- Libellé de la question
- `Réponses multiples : oui/non`
- Choix étiquetés A à D (2 à 4 choix)
- `Bonne(s) réponse(s) : ...`

---

## Séance 1 — Réseaux, cloud et haute disponibilité

### S1-Q1

Quel modèle en couches est réellement utilisé sur Internet et sert de référence pratique dans ce cours ?

Réponses multiples : non

- A. Le modèle OSI à 7 couches
- B. Le modèle TCP/IP à 4 couches
- C. Le modèle ISO 9001
- D. Le modèle CALMS

Bonne(s) réponse(s) : B

### S1-Q2

Que qualifie le label **SecNumCloud** délivré par l'ANSSI ?

Réponses multiples : non

- A. Une entreprise cloud dans son ensemble
- B. Une offre cloud précise, répondant à un référentiel de sécurité et de souveraineté
- C. Un langage de programmation sécurisé
- D. Un protocole réseau chiffré

Bonne(s) réponse(s) : B

### S1-Q3

Dans la correspondance OSI → TCP/IP vue en cours, à quelle(s) couche(s) OSI correspond la couche « Application » du modèle TCP/IP ?

Réponses multiples : oui

- A. Application (couche 7)
- B. Présentation (couche 6)
- C. Session (couche 5)
- D. Transport (couche 4)

Bonne(s) réponse(s) : A, B, C

### S1-Q4

Que signifie « encapsulation » dans le modèle en couches ?

Réponses multiples : non

- A. Chiffrer les données avant envoi
- B. Chaque couche ajoute son propre en-tête aux données
- C. Compresser un fichier avant transfert
- D. Fusionner deux paquets en un seul

Bonne(s) réponse(s) : B

### S1-Q5

À quoi sert un port (par exemple 80 ou 443) dans une communication réseau ?

Réponses multiples : non

- A. À identifier la machine sur le réseau
- B. À identifier l'application qui reçoit les données sur une machine
- C. À chiffrer la connexion
- D. À choisir la vitesse de la connexion

Bonne(s) réponse(s) : B

### S1-Q6

Parmi ces adresses, laquelle est une adresse IPv4 privée ?

Réponses multiples : non

- A. 8.8.8.8
- B. 192.168.1.10
- C. 203.0.113.10
- D. 51.68.10.5

Bonne(s) réponse(s) : B

### S1-Q7

Dans la notation CIDR `192.168.1.0/24`, que représente `/24` ?

Réponses multiples : non

- A. Le numéro de version d'IP
- B. Le nombre de machines connectées actuellement
- C. La taille du masque réseau, donc le nombre d'adresses disponibles
- D. Le port utilisé par défaut

Bonne(s) réponse(s) : C

### S1-Q8

Pourquoi IPv6 a-t-il été introduit ?

Réponses multiples : non

- A. Pour remplacer HTTP par un protocole plus rapide
- B. Parce que les adresses IPv4 disponibles s'épuisent
- C. Pour supprimer le besoin de DNS
- D. Pour remplacer TCP par UDP

Bonne(s) réponse(s) : B

### S1-Q9

Un `ping example.com` échoue mais le site s'affiche normalement dans le navigateur. Que peut-on affirmer ?

Réponses multiples : oui

- A. Le protocole ICMP est probablement filtré (pare-feu, proxy), pas forcément une panne réelle
- B. Le site est définitivement injoignable depuis Internet
- C. Une ligne `* * *` dans `traceroute` peut simplement indiquer un routeur qui ne répond pas à l'ICMP
- D. L'échec du `ping` prouve à lui seul l'absence de connexion Internet

Bonne(s) réponse(s) : A, C

### S1-Q10

Quel type d'enregistrement DNS pointe vers une adresse IPv4 ?

Réponses multiples : non

- A. `A`
- B. `AAAA`
- C. `CNAME`
- D. `MX`

Bonne(s) réponse(s) : A

### S1-Q11

Quel est le rôle de la passerelle par défaut ?

Réponses multiples : non

- A. Elle chiffre le trafic sortant
- B. Elle sert de porte de sortie du réseau local vers l'extérieur
- C. Elle stocke les enregistrements DNS
- D. Elle répartit la charge entre plusieurs serveurs

Bonne(s) réponse(s) : B

### S1-Q12

Que permet de vérifier `curl -I https://example.com` que `nslookup example.com` seul ne montre pas ?

Réponses multiples : non

- A. L'adresse IP résolue par le DNS
- B. Le statut de la réponse HTTP retournée par le serveur applicatif
- C. Le nom de domaine du site
- D. Le nombre de sauts réseau parcourus

Bonne(s) réponse(s) : B

### S1-Q13

Dans le parcours concret « de l'URL à la page affichée », que fait le navigateur juste après avoir reçu l'adresse IP du DNS ?

Réponses multiples : non

- A. Il affiche directement la page en cache
- B. Il ouvre une connexion TCP vers cette adresse IP, sur un port donné
- C. Il envoie un email de confirmation
- D. Il relance une nouvelle requête DNS

Bonne(s) réponse(s) : B

### S1-Q14

Quel port standard correspond à HTTPS ?

Réponses multiples : non

- A. 21
- B. 80
- C. 443
- D. 8080

Bonne(s) réponse(s) : C

### S1-Q15

Dans le parcours concret vu en cours, à quel moment intervient TLS ?

Réponses multiples : non

- A. Avant la résolution DNS
- B. Entre l'ouverture de la connexion TCP et l'envoi de la requête HTTP
- C. Après l'affichage de la page
- D. TLS n'intervient jamais dans ce parcours

Bonne(s) réponse(s) : B

### S1-Q16

Quelles promesses du cloud ont été présentées en cours ?

Réponses multiples : oui

- A. Élasticité
- B. Mutualisation
- C. Paiement à l'usage
- D. Propriété exclusive du matériel physique

Bonne(s) réponse(s) : A, B, C

### S1-Q17

Dans le modèle de responsabilité partagée, qui reste responsable de la configuration de ses propres ressources cloud (droits d'accès, exposition réseau) ?

Réponses multiples : non

- A. Uniquement le fournisseur cloud
- B. Le client, même si le fournisseur sécurise le socle physique
- C. Personne, la responsabilité disparaît dans le cloud
- D. Un organisme de certification externe

Bonne(s) réponse(s) : B

### S1-Q18

Associez chaque modèle à sa bonne description : dans quel modèle le client déploie son code sans gérer le runtime applicatif ?

Réponses multiples : non

- A. IaaS
- B. PaaS
- C. SaaS
- D. On-premise

Bonne(s) réponse(s) : B

### S1-Q19

Quel service correspond au stockage objet managé chez **Azure** ?

Réponses multiples : non

- A. S3
- B. Blob Storage
- C. Cloud Storage
- D. EC2

Bonne(s) réponse(s) : B

### S1-Q20

Quels mécanismes permettent la haute disponibilité selon le cours ?

Réponses multiples : oui

- A. Zones multiples
- B. Instances multiples
- C. Load balancer avec health check
- D. Une seule instance surdimensionnée

Bonne(s) réponse(s) : A, B, C

---

## Séance 2 — DevOps, Git, Docker, écosystème cloud-native

### S2-Q1

Quel est le problème historique à l'origine du mouvement DevOps ?

Réponses multiples : non

- A. Les silos entre équipes Dev et Ops ralentissent la livraison
- B. Les langages de programmation sont trop nombreux
- C. Les bases de données sont trop lentes
- D. Les navigateurs web ne sont pas standardisés

Bonne(s) réponse(s) : A

### S2-Q2

Quelles métriques DORA ont été présentées en cours ?

Réponses multiples : oui

- A. Fréquence de déploiement
- B. Délai de mise en production (lead time)
- C. Taux d'échec des changements
- D. Nombre de lignes de code produites par jour

Bonne(s) réponse(s) : A, B, C

### S2-Q3

Dans un flux Git collaboratif, à quoi sert une Pull Request / Merge Request ?

Réponses multiples : non

- A. À supprimer une branche définitivement
- B. À proposer et faire relire un ensemble de changements avant fusion
- C. À créer automatiquement un nouveau dépôt
- D. À chiffrer l'historique Git

Bonne(s) réponse(s) : B

### S2-Q4

Que signifie un commit atomique ?

Réponses multiples : non

- A. Un commit qui modifie tous les fichiers du dépôt
- B. Un commit qui représente un seul changement logique et cohérent
- C. Un commit signé cryptographiquement
- D. Un commit qui ne peut jamais être annulé

Bonne(s) réponse(s) : B

### S2-Q5

Dans le versionnage SemVer `MAJOR.MINOR.PATCH`, quand incrémente-t-on `MAJOR` ?

Réponses multiples : non

- A. Pour toute correction de bug mineure
- B. Pour un changement incompatible avec les versions précédentes
- C. Pour chaque nouveau commit
- D. Uniquement lors de la première publication

Bonne(s) réponse(s) : B

### S2-Q6

Quels éléments font partie du cycle déclaratif de l'Infrastructure as Code vu en cours ?

Réponses multiples : oui

- A. Écrire une définition déclarative de l'état souhaité
- B. Prévisualiser les changements (plan)
- C. Appliquer les changements (apply)
- D. Modifier manuellement chaque serveur un par un

Bonne(s) réponse(s) : A, B, C

### S2-Q7

Que signifie l'idempotence en Infrastructure as Code ?

Réponses multiples : non

- A. Appliquer plusieurs fois la même configuration produit toujours le même résultat
- B. Chaque application crée une nouvelle ressource supplémentaire
- C. La configuration ne peut être appliquée qu'une seule fois
- D. Les ressources sont toujours recréées à chaque exécution

Bonne(s) réponse(s) : A

### S2-Q8

Quel outil a été cité comme exemple d'Infrastructure as Code déclarative ?

Réponses multiples : non

- A. Terraform
- B. Docker Compose
- C. GitHub Actions
- D. Kubernetes

Bonne(s) réponse(s) : A

### S2-Q9

Quelle est la différence principale entre une machine virtuelle et un conteneur ?

Réponses multiples : non

- A. Le conteneur partage le noyau de l'OS hôte, la VM embarque son propre OS complet
- B. La VM est toujours plus légère qu'un conteneur
- C. Un conteneur ne peut exécuter qu'un seul langage de programmation
- D. Il n'y a aucune différence, ce sont des synonymes

Bonne(s) réponse(s) : A

### S2-Q10

Dans l'architecture Docker, qu'est-ce qu'un registre (registry) ?

Réponses multiples : non

- A. Un fichier de configuration réseau
- B. Un service qui stocke et distribue des images Docker
- C. Le nom du processus principal d'un conteneur
- D. Une commande pour lister les conteneurs actifs

Bonne(s) réponse(s) : B

### S2-Q11

Pourquoi ordonner intelligemment les instructions d'un Dockerfile améliore le cache de build ?

Réponses multiples : non

- A. Parce que Docker exécute les instructions en ordre aléatoire
- B. Parce qu'une couche modifiée invalide toutes les couches suivantes, pas les précédentes
- C. Parce que l'ordre n'a aucun effet sur le cache
- D. Parce que Docker recompile toujours l'image entière

Bonne(s) réponse(s) : B

### S2-Q12

Quelles bonnes pratiques Docker ont été recommandées en cours ?

Réponses multiples : oui

- A. Utiliser un fichier `.dockerignore`
- B. Exécuter le conteneur avec un utilisateur non privilégié
- C. Toujours exécuter les processus en tant que root
- D. Utiliser un build multi-stage pour réduire la taille de l'image

Bonne(s) réponse(s) : A, B, D

### S2-Q13

À quoi sert un build multi-stage dans un Dockerfile ?

Réponses multiples : non

- A. À construire plusieurs images totalement indépendantes
- B. À séparer l'étape de construction de l'étape d'exécution, pour une image finale plus légère
- C. À exécuter le conteneur sur plusieurs machines en parallèle
- D. À chiffrer l'image finale

Bonne(s) réponse(s) : B

### S2-Q14

Que permet Docker Compose ?

Réponses multiples : non

- A. Compiler du code source en binaire
- B. Décrire et lancer plusieurs services conteneurisés liés entre eux, dans un seul fichier
- C. Remplacer complètement Git
- D. Gérer un cluster Kubernetes complet

Bonne(s) réponse(s) : B

### S2-Q15

Qu'est-ce que la CNCF ?

Réponses multiples : non

- A. Une entreprise qui vend exclusivement des services cloud
- B. Une fondation open source qui héberge et gouverne des projets cloud-native
- C. Un protocole réseau concurrent de TCP/IP
- D. Un langage de programmation

Bonne(s) réponse(s) : B

### S2-Q16

Que signifient les statuts « sandbox », « incubating » et « graduated » à la CNCF ?

Réponses multiples : non

- A. Des garanties absolues de sécurité du projet
- B. Des signaux de maturité et de gouvernance, sans garantie absolue
- C. Le prix payé pour héberger le projet
- D. Le nombre de contributeurs rémunérés par la CNCF

Bonne(s) réponse(s) : B

### S2-Q17

Quel est le rôle de Kubernetes par rapport à Docker, tel que présenté en cours ?

Réponses multiples : non

- A. Kubernetes remplace complètement Docker
- B. Kubernetes organise le déploiement, la réplication et le fonctionnement de conteneurs à grande échelle
- C. Kubernetes sert uniquement à construire des images
- D. Kubernetes est un système de contrôle de version

Bonne(s) réponse(s) : B

### S2-Q18

Parmi ces termes, lesquels font partie du vocabulaire minimal de Kubernetes vu en cours ?

Réponses multiples : oui

- A. Cluster
- B. Pod
- C. Deployment
- D. Merge request

Bonne(s) réponse(s) : A, B, C

### S2-Q19

Quelle commande permet de construire une image à partir d'un Dockerfile ?

Réponses multiples : non

- A. `docker run`
- B. `docker build`
- C. `docker pull`
- D. `git commit`

Bonne(s) réponse(s) : B

### S2-Q20

Selon le cours, quelles affirmations sur le module Kubernetes de ce cours sont correctes ?

Réponses multiples : oui

- A. Il s'agit d'une introduction au vocabulaire, pas d'un TP noté
- B. Aucune installation de cluster n'est réalisée en séance
- C. Le TP final impose de déployer un cluster Kubernetes complet
- D. Le vocabulaire reste limité à cluster/node/pod/deployment/service

Bonne(s) réponse(s) : A, B, D

---

## Séance 3 — CI/CD, GitHub Actions et GitLab CI

### S3-Q1

Que signifie CI (intégration continue) ?

Réponses multiples : non

- A. Installer manuellement chaque dépendance sur chaque poste
- B. Intégrer et valider automatiquement les changements de code fréquemment
- C. Déployer automatiquement en production à chaque commit
- D. Chiffrer le code source avant de le committer

Bonne(s) réponse(s) : B

### S3-Q2

Quelle est la différence entre livraison continue et déploiement continu ?

Réponses multiples : non

- A. Il n'y a aucune différence
- B. La livraison continue prépare une version prête à déployer, le déploiement continu la met automatiquement en production
- C. Le déploiement continu ne concerne que les bases de données
- D. La livraison continue supprime le besoin de tests

Bonne(s) réponse(s) : B

### S3-Q3

Quels éléments composent l'anatomie commune d'un pipeline CI/CD vue en cours ?

Réponses multiples : oui

- A. Événement déclencheur
- B. Job et étape
- C. Runner
- D. Merge request obligatoire

Bonne(s) réponse(s) : A, B, C

### S3-Q4

Dans quel fichier déclare-t-on un workflow GitHub Actions ?

Réponses multiples : non

- A. `Dockerfile`
- B. Un fichier YAML dans `.github/workflows/`
- C. `package.json`
- D. `.gitlab-ci.yml`

Bonne(s) réponse(s) : B

### S3-Q5

Quel mot-clé GitLab CI regroupe les jobs en étapes séquentielles ?

Réponses multiples : non

- A. `jobs`
- B. `runners`
- C. `stages`
- D. `pipelines`

Bonne(s) réponse(s) : C

### S3-Q6

Dans `.gitlab-ci.yml`, où déclare-t-on typiquement des variables sensibles plutôt qu'en clair dans le fichier ?

Réponses multiples : non

- A. Directement dans le code source de l'application
- B. Dans les variables CI/CD protégées de l'interface GitLab
- C. Dans un commentaire du fichier YAML
- D. Dans le nom de la branche

Bonne(s) réponse(s) : B

### S3-Q7

Quel est le rôle d'un runner dans un pipeline CI/CD ?

Réponses multiples : non

- A. Il exécute les jobs définis dans le pipeline
- B. Il stocke uniquement l'historique Git
- C. Il remplace le registre d'images Docker
- D. Il sert uniquement à envoyer des notifications

Bonne(s) réponse(s) : A

### S3-Q8

Quelles étapes composent le pipeline cible du TP présenté en cours ?

Réponses multiples : oui

- A. Installation des dépendances
- B. Tests
- C. Build applicatif
- D. Déploiement obligatoire en production

Bonne(s) réponse(s) : A, B, C

### S3-Q9

Un artefact de pipeline CI/CD désigne :

Réponses multiples : non

- A. Un fichier ou résultat produit par un job et conservé/transmis (ex. build, rapport de test)
- B. Un bug non résolu dans le code
- C. Le nom du dépôt Git
- D. Un type de branche Git

Bonne(s) réponse(s) : A

### S3-Q10

Dans GitHub Actions, à quoi servent les actions réutilisables ?

Réponses multiples : non

- A. À dupliquer manuellement du code YAML dans chaque workflow
- B. À encapsuler une tâche commune (ex. installer Node.js) pour la réutiliser facilement
- C. À remplacer entièrement les runners
- D. À supprimer le besoin de déclencheurs

Bonne(s) réponse(s) : B

### S3-Q11

Quel est l'intérêt du cache dans un pipeline CI/CD ?

Réponses multiples : non

- A. Il accélère les exécutions suivantes en réutilisant des dépendances déjà installées
- B. Il empêche toute modification du code
- C. Il remplace les tests automatisés
- D. Il chiffre les artefacts produits

Bonne(s) réponse(s) : A

### S3-Q12

Quels déclencheurs sont typiquement disponibles pour un workflow GitHub Actions ?

Réponses multiples : oui

- A. Un push sur une branche
- B. L'ouverture d'une pull request
- C. Une planification (cron)
- D. Un changement de fuseau horaire du serveur

Bonne(s) réponse(s) : A, B, C

### S3-Q13

Quel outil a été comparé à GitHub Actions dans cette séance ?

Réponses multiples : non

- A. GitLab CI
- B. Kubernetes
- C. Terraform
- D. Docker Compose

Bonne(s) réponse(s) : A

### S3-Q14

Que permettent les matrices dans un pipeline CI/CD ?

Réponses multiples : non

- A. Exécuter le même job pour plusieurs combinaisons de paramètres (versions, OS...)
- B. Chiffrer les variables sensibles
- C. Fusionner automatiquement des branches Git
- D. Remplacer les runners par des conteneurs

Bonne(s) réponse(s) : A

### S3-Q15

Selon le cours, quelle affirmation sur le choix d'outil CI/CD pour le TP est correcte ?

Réponses multiples : non

- A. Chaque groupe doit implémenter à la fois GitHub Actions et GitLab CI
- B. Chaque groupe choisit un outil à implémenter ; l'autre est lu et comparé
- C. GitLab CI est interdit dans ce cours
- D. Le choix de l'outil n'a aucune importance et n'est jamais fait

Bonne(s) réponse(s) : B

### S3-Q16

Un pipeline vert dans le contexte du TP fil rouge signifie :

Réponses multiples : non

- A. Que le pipeline a échoué mais sans conséquence
- B. Que toutes les étapes définies (installation, tests, build) se sont exécutées avec succès
- C. Que l'application est automatiquement déployée en production
- D. Que le code source est écrit en JavaScript

Bonne(s) réponse(s) : B

### S3-Q17

Quel statut de job CI/CD indique typiquement un problème à corriger ?

Réponses multiples : non

- A. Succès
- B. Échec (failed)
- C. Annulé volontairement
- D. En attente de démarrage

Bonne(s) réponse(s) : B

### S3-Q18

Quels éléments permettent de paralléliser l'exécution d'un pipeline ?

Réponses multiples : oui

- A. Des jobs indépendants exécutés en parallèle
- B. Des matrices de configuration
- C. Un seul job unique séquentiel obligatoire
- D. Plusieurs runners disponibles simultanément

Bonne(s) réponse(s) : A, B, D

### S3-Q19

Que construit concrètement le pipeline cible étudié en cours à sa dernière étape ?

Réponses multiples : non

- A. Un rapport d'audit IA
- B. L'image Docker de l'application
- C. Un certificat TLS
- D. Un cluster Kubernetes

Bonne(s) réponse(s) : B

### S3-Q20

Quelles affirmations sur les runners GitLab CI et les Actions GitHub sont correctes ?

Réponses multiples : oui

- A. Ils doivent être activés/disponibles pour que les jobs s'exécutent
- B. Ils exécutent les étapes définies dans le fichier de pipeline
- C. Ils remplacent le dépôt Git
- D. Ils peuvent bloquer un pipeline s'ils ne sont pas disponibles

Bonne(s) réponse(s) : A, B, D

---

## Séance 4 — Sécurité, observabilité, déploiement et audit IA

### S4-Q1

Que garantit TLS/HTTPS selon le cours ?

Réponses multiples : oui

- A. Le chiffrement des données échangées
- B. L'intégrité des données échangées
- C. L'authentification du serveur via un certificat
- D. La suppression totale du besoin de gérer des secrets

Bonne(s) réponse(s) : A, B, C

### S4-Q2

Qu'est-ce qu'une chaîne de confiance dans le contexte des certificats TLS ?

Réponses multiples : non

- A. Une liste de mots de passe partagés
- B. Une suite de certificats reliant le certificat du serveur à une autorité de confiance reconnue
- C. Un protocole de routage réseau
- D. Un type de base de données

Bonne(s) réponse(s) : B

### S4-Q3

Que doit-on absolument éviter de faire avec un secret (jeton, mot de passe, clé API) ?

Réponses multiples : non

- A. Le versionner dans le dépôt Git
- B. Le stocker dans une variable protégée de la CI/CD
- C. Le faire tourner (rotation) régulièrement
- D. Le documenter comme configuration sensible

Bonne(s) réponse(s) : A

### S4-Q4

À quoi sert un fichier `.env` associé à un `.gitignore` adapté ?

Réponses multiples : non

- A. À versionner les secrets pour les partager facilement
- B. À stocker localement des variables sensibles sans les committer dans le dépôt
- C. À remplacer le Dockerfile
- D. À chiffrer automatiquement le code source

Bonne(s) réponse(s) : B

### S4-Q5

Quelles pratiques de sécurité CI/CD ont été présentées en cours ?

Réponses multiples : oui

- A. Scanner les dépendances
- B. Activer le secret scanning
- C. Utiliser des permissions minimales pour les jobs
- D. Toujours exécuter les jobs avec des droits d'administrateur complets

Bonne(s) réponse(s) : A, B, C

### S4-Q6

Quelle stratégie de déploiement remplace progressivement les anciennes instances par de nouvelles, sans coupure totale ?

Réponses multiples : non

- A. Recreate
- B. Rolling
- C. Blue/green
- D. Canary

Bonne(s) réponse(s) : B

### S4-Q7

Quelle stratégie de déploiement fait basculer tout le trafic d'un environnement à un autre déjà entièrement prêt ?

Réponses multiples : non

- A. Recreate
- B. Rolling
- C. Blue/green
- D. Canary

Bonne(s) réponse(s) : C

### S4-Q8

Quelle stratégie de déploiement expose une nouvelle version à une petite partie du trafic avant généralisation ?

Réponses multiples : non

- A. Recreate
- B. Rolling
- C. Blue/green
- D. Canary

Bonne(s) réponse(s) : D

### S4-Q9

Quels sont les trois piliers de l'observabilité vus en cours ?

Réponses multiples : oui

- A. Logs
- B. Métriques
- C. Traces
- D. Commits

Bonne(s) réponse(s) : A, B, C

### S4-Q10

Que décrivent les logs, par opposition aux métriques ?

Réponses multiples : non

- A. Des événements précis et horodatés
- B. Des valeurs agrégées dans le temps
- C. Le chemin d'une requête entre composants
- D. Le nombre de commits Git

Bonne(s) réponse(s) : A

### S4-Q11

Que suit une trace dans une chaîne d'observabilité ?

Réponses multiples : non

- A. Le parcours d'une requête à travers plusieurs composants
- B. Le nombre de secrets stockés
- C. Le contenu exact d'un log applicatif
- D. Le nombre de branches Git actives

Bonne(s) réponse(s) : A

### S4-Q12

Dans la chaîne présentée en cours, quel outil collecte et stocke les métriques ?

Réponses multiples : non

- A. OpenTelemetry
- B. Prometheus
- C. Grafana
- D. Alertmanager

Bonne(s) réponse(s) : B

### S4-Q13

Dans la chaîne présentée en cours, quel outil représente les métriques dans des tableaux de bord ?

Réponses multiples : non

- A. OpenTelemetry
- B. Prometheus
- C. Grafana
- D. Alertmanager

Bonne(s) réponse(s) : C

### S4-Q14

Quel rôle joue Alertmanager dans la chaîne d'observabilité vue en cours ?

Réponses multiples : non

- A. Il collecte les traces applicatives
- B. Il regroupe, déduplique et achemine les notifications d'alerte
- C. Il construit les images Docker
- D. Il gère les branches Git

Bonne(s) réponse(s) : B

### S4-Q15

Quel est l'intérêt principal d'un feature flag ?

Réponses multiples : non

- A. Activer ou désactiver une fonctionnalité sans redéployer l'application
- B. Chiffrer automatiquement les secrets
- C. Remplacer complètement les tests automatisés
- D. Construire l'image Docker plus rapidement

Bonne(s) réponse(s) : A

### S4-Q16

Pourquoi les feature flags peuvent-ils devenir une dette technique s'ils s'accumulent ?

Réponses multiples : non

- A. Parce qu'ils ralentissent uniquement le réseau
- B. Parce que des flags obsolètes non nettoyés complexifient le code et parfois la sécurité
- C. Parce qu'ils remplacent Git
- D. Parce qu'ils sont interdits par TLS

Bonne(s) réponse(s) : B

### S4-Q17

Quels critères figurent dans la grille d'audit d'une configuration générée par IA vue en cours ?

Réponses multiples : oui

- A. Reproductibilité
- B. Permissions et exposition réseau
- C. Présence de secrets en clair
- D. Style d'écriture des commentaires de code

Bonne(s) réponse(s) : A, B, C

### S4-Q18

Selon le cours, comment doit-on traiter une configuration Docker ou CI/CD générée par une IA ?

Réponses multiples : non

- A. La copier telle quelle sans vérification
- B. La traiter comme une proposition à vérifier avant utilisation
- C. La refuser systématiquement sans l'examiner
- D. L'utiliser uniquement si elle vient d'une IA connue

Bonne(s) réponse(s) : B

### S4-Q19

Quels éléments font partie du livrable final attendu pour le TP noté ?

Réponses multiples : oui

- A. Un dépôt Git identifiable avec historique compréhensible
- B. Un Dockerfile fonctionnel
- C. Un pipeline GitHub Actions ou GitLab CI vert
- D. Une URL publique obligatoire, sans exception

Bonne(s) réponse(s) : A, B, C

### S4-Q20

Que doit contenir l'audit IA rendu dans le TP final ?

Réponses multiples : non

- A. Uniquement une note chiffrée sans explication
- B. Un audit écrit d'une configuration générée par IA, avec corrections justifiées
- C. Une capture d'écran du prompt uniquement
- D. La liste des commits du dépôt

Bonne(s) réponse(s) : B
