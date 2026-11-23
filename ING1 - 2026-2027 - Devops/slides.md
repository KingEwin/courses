---
theme: seriph
title: "Cloud, Réseaux et DevOps"
info: |
  ## Cloud, Réseaux et DevOps
  Master Ingénierie Informatique et Management — G4 — ING1
class: text-center
transition: slide-left
mdc: true
fonts:
  sans: Inter
  mono: Fira Code
drawings:
  persist: false
layout: course-cover
subtitle: Des fondamentaux réseau aux pipelines automatisés
session: 4 séances de 3h — 12h
instructor: Clément DAOU — Ingénieur Cloud-DevOps (AWS, Azure, Kubernetes...)
---

# Cloud, Réseaux et DevOps

<!--
Durée : 1 min.

Se présenter : Clément DAOU, ingénieur Cloud-DevOps, expérience terrain sur AWS, Azure et Kubernetes. Préciser le contexte professionnel : conception d'architectures cloud, automatisation de pipelines, exploitation de clusters Kubernetes en production.

Objectif du module en une phrase : donner les fondations réseau, cloud et automatisation nécessaires pour comprendre comment une application passe du poste du développeur à un service accessible, supervisé et reproductible.

Exemple concret à partager : raconter un incident réel où un déploiement a cassé en production faute de pipeline fiable, pour ancrer l'intérêt du cours dès la première minute.

Transition : passer au plan global des 4 séances.
-->

---

# Qui suis-je ?


- **Clément DAOU** — Ingénieur DevOps & architecte cloud
- Compétences : **AWS**, **Azure**, **Kubernetes**, **Terraform**, **CI/CD**, **Docker**, **Java**, **Node.js** .....
- Conception d'architectures cloud natives
- Domaines d'expertise : HA, Applications liées à la lutte contre la fraude, à la facturation et aux obligations légales


<!--
Durée : 1 min.

Développer brièvement le parcours : missions autour de la conteneurisation, de l'infrastructure cloud et des chaînes CI/CD, dans des contextes multi-fournisseurs (pas un seul hyperscaler), pour des applications liées à la fraude, à la facturation et aux obligations légales. Ces applications actives et critiques exigent une haute disponibilité.

Relier ces missions au cours : les notions de haute disponibilité et d'exploitation permettent de maintenir ces services disponibles.

Point à verbaliser : le cours reste volontairement généraliste — il ne pousse ni AWS, ni Azure, ni GCP comme référence unique. L'objectif est de comprendre les concepts communs pour être autonome face à n'importe lequel de ces environnements en stage ou en poste.

Exemple concret : mentionner qu'un même schéma d'architecture (répartiteur + instances + base de données) se retrouve chez tous les fournisseurs, seuls les noms de service changent.

Transition : présenter le plan global des 4 séances.
-->

---

# Plan global du module

- **Séance 1** — Réseaux, cloud et haute disponibilité
  <span class="text-sm opacity-70">Couches réseau, IP/DNS, IaaS/PaaS/SaaS/serverless, AWS/Azure/GCP, HA</span>
- **Séance 2** — DevOps, Git, Docker et écosystème cloud-native
  <span class="text-sm opacity-70">Histoire DevOps, Git collaboratif, Infrastructure as Code, Docker, Compose, CNCF, intro Kubernetes</span>
- **Séance 3** — CI/CD avec GitHub Actions et GitLab CI
  <span class="text-sm opacity-70">Anatomie d'un pipeline, workflows YAML, TP pipeline installation → tests → build</span>
- **Séance 4** — Sécurité, observabilité, déploiement et audit IA
  <span class="text-sm opacity-70">TLS, secrets, stratégies de déploiement, logs/métriques/traces, audit IA, TP final</span>

<!--
Durée : 2 min.

Verbaliser le fil rouge : une application Node.js simple sert de trame sur les 4 séances. Elle est versionnée avec Git, conteneurisée avec Docker, puis validée par un pipeline CI. Le déploiement public reste une option, jamais une obligation bloquante.

Exemple concret : montrer rapidement (sans détailler) le dépôt final attendu — code, Dockerfile, fichier de pipeline, README d'audit — pour donner une cible visuelle dès le départ.

Point important à dire à voix haute : Kubernetes sera vu en introduction pure (vocabulaire), jamais en TP noté ni en installation de cluster.

Transition : détailler les objectifs pédagogiques précis du module.
-->

---

# Objectifs

- Expliquer l'adressage IP, le DNS, la passerelle et le routage
- Distinguer IaaS, PaaS, SaaS et serverless
- Comparer VM et conteneur, construire une image Docker, situer Kubernetes
- Décrire les mécanismes de haute disponibilité
- Expliquer les principes de l'Infrastructure as Code (déclaratif, plan, apply) et situer Terraform
- Utiliser Git en flux collaboratif : branches, commits, revue, versionnage
- Construire un pipeline CI qui installe, teste, construit et fabrique une image
- Identifier les risques secrets, dépendances, TLS et images
- Lire des logs et choisir des métriques utiles
- Auditer une configuration Docker/CI générée par une IA

<!--
Durée : 1 min.

Ces 10 objectifs sont ceux évalués par le TP final et les quiz formatifs. Les lire une fois à voix haute, sans les commenter un par un — l'idée est de donner une checklist de référence, pas de noyer le début du cours.

Exemple concret : rappeler qu'un futur chef de projet IT n'a pas besoin de tout coder lui-même, mais doit savoir lire ces éléments pour dialoguer avec une équipe technique — lien direct avec le profil management du master.

Transition : présenter les pré-requis techniques avant les TP.
-->

---

# Pré-requis techniques avant les TP

<div class="grid grid-cols-3 gap-4">
<div>

## 🐳 Docker

- **macOS** : Docker Desktop ou **Colima**
- **Windows** : **WSL**, puis Docker Desktop
- Contrôler : `docker --version` et `docker compose version`
- Terminal **Bash/WSL**

</div>
<div>

## 🟢 Poste de dev

- **Node 22 LTS** + **npm** ou **bun**
- **git** installé
- Angular exige Node, même avec bun

</div>
<div>

## 🐙 GitHub

- Compte **authentifié** (HTTPS/PAT ou SSH)
- **Dépôt public vide** créé avant la séance, **sans README**
- Email Git public ou **noreply**
- **Aucun secret** dans un dépôt public

</div>
</div>

<!--
Durée : 3 min.

Annoncer clairement que la suite du cours suppose ces pré-requis déjà en place : les TP démarrent directement sans temps d'installation dédié en séance.

Docker : sur macOS, Docker Desktop ou Colima (plus léger, en ligne de commande) ; sur Windows, WSL d'abord puis Docker Desktop par-dessus. Ne pas dérouler une installation complète ici : `docker --version` et `docker compose version` doivent répondre avant la séance 2, moment du premier TP Docker. Les commandes des TP sont écrites pour un terminal Bash (macOS, Linux ou WSL) : en PowerShell, la continuation de ligne `\` et `$(pwd)` ne fonctionnent pas telles quelles ; demander aux étudiants Windows d'ouvrir le terminal WSL.

Poste de dev (TP de la séance 2) : chaque étudiant crée son propre frontend ; il faut Node 22 LTS avec npm, ou bun, et git. Même avec bun, Angular CLI s'appuie sur Node : Node reste donc requis pour Angular. Le Dockerfile pédagogique construit lui-même l'application dans Docker avec `npm ci`.

GitHub : créer AVANT la séance un dépôt public vide, sans README, licence ni .gitignore, pour éviter un conflit au premier push. Le compte doit être authentifié depuis le terminal (token personnel ou clé SSH). Rappeler que le dépôt est public : configurer `git config user.email` avec l'adresse noreply GitHub si on ne veut pas publier son email, et ne jamais committer de secret.

Exemple concret : comparer à un cours de cuisine où chacun arrive avec ses ustensiles déjà lavés — le temps de séance sert à cuisiner, pas à faire la vaisselle.

Transition : entrer dans la séance 1, réseaux et cloud.
-->

---
layout: section-cover
section: Séance 1 — 3h
---

# Réseaux, cloud et haute disponibilité

Comprendre le trajet d'une requête avant de choisir un hébergement

<!--
Durée : 1 min.

Annoncer le fil de la séance : on part du réseau (comment une requête voyage), on enchaîne sur le cloud (où héberger), on termine sur la haute disponibilité (comment résister aux pannes).

Exemple concret : poser la question à la salle — "quand vous tapez une URL dans un navigateur, que se passe-t-il avant que la page s'affiche ?" — et noter les réponses au tableau pour y revenir plus tard.

Transition : démarrer par le modèle en couches.
-->

---

# Le modèle en couches : TCP/IP et OSI

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Application<br/>HTTP, HTTPS] --> B[Transport<br/>TCP, UDP]
  B --> C[Réseau<br/>IP]
  C --> D[Liaison / Physique<br/>Ethernet, Wi-Fi]
```

<v-clicks>

- **TCP/IP** (4 couches) : le modèle réellement utilisé sur Internet, celui vu tout au long de ce cours
- **OSI** (7 couches) : un modèle de référence plus détaillé, surtout utile pour situer un vocabulaire réseau (souvent cité en entreprise ou en certification)
- Une couche ne connaît que sa voisine directe ; **encapsulation** : chaque couche ajoute son en-tête

</v-clicks>

<!--
Durée : 7 min (dont ~1 min d'échange avec la salle).

Présenter TCP/IP comme le modèle pratique utilisé pour le reste du cours, et OSI comme un modèle de référence à savoir situer sans en faire un objet de certification — pas de calcul ni de distinction fine entre présentation/session à retenir par cœur.

Exemple concret : une lettre postée dans une enveloppe, elle-même dans un sac postal, lui-même dans un camion. Chaque couche ajoute son propre "emballage" sans se soucier du contenu des couches internes.

Point à verbaliser : HTTP ne sait pas comment les bits circulent sur le câble, et l'inverse est vrai aussi — c'est la force de l'abstraction en couches.

Transition : voir la correspondance précise entre les deux modèles dans un tableau.
-->

---

# Le modèle OSI : les 7 couches

<v-clicks>

- 7. Application — HTTP, DNS
- 6. Présentation — TLS, chiffrement
- 5. Session — Ouverture/fermeture de connexion
- 4. Transport — TCP, UDP
- 3. Réseau — IP
- 2. Liaison — Ethernet, Wi-Fi
- 1. Physique — Câble, signal radio

</v-clicks>

<!--
Durée : 3 min.

Présenter les 7 couches OSI dans l'ordre, en rappelant qu'il s'agit d'un modèle de référence à savoir situer (souvent cité en entreprise ou en certification), pas d'un objet de calcul ou de mémorisation exhaustive.

Exemple concret : SSH, DNS ou HTTPS se rangent tous dans la couche 7 "Application" au sens OSI, alors qu'ils sont très différents dans leur usage.

Transition : voir maintenant comment ces 7 couches se regroupent dans les 4 couches du modèle TCP/IP.
-->

---

# Correspondance OSI ↔ TCP/IP

| TCP/IP (4 couches) | OSI regroupées | Exemple |
|---|---|---|
| Application | 7. Application, 6. Présentation, 5. Session | HTTP, DNS, TLS |
| Transport | 4. Transport | TCP, UDP |
| Réseau | 3. Réseau | IP |
| Liaison / Physique | 2. Liaison, 1. Physique | Ethernet, Wi-Fi |

<Tip type="info">
Les 3 couches hautes d'OSI (application, présentation, session) sont regroupées en une seule couche "Application" côté TCP/IP — c'est pourquoi TLS ou l'ouverture d'une session s'y rangent.
</Tip>

<!--
Durée : 2 min (dont ~1 min d'échange).

Le tableau OSI→TCP/IP sert uniquement à comprendre pourquoi TLS ou une session se rangent dans la couche "Application" côté TCP/IP — pas de distinction fine à mémoriser par cœur entre présentation et session.

Faire réagir la salle avant de conclure : demander à un étudiant de retrouver, pour un protocole de son choix (SSH, DNS, HTTPS...), la couche TCP/IP à laquelle il appartient — ce temps d'échange consolide la compréhension avant de passer au schéma d'encapsulation.

Transition : détailler l'encapsulation avec un schéma de paquet.
-->

---

# Encapsulation : le paquet qui grossit

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Données applicatives] --> B[+ en-tête TCP]
  B --> C[+ en-tête IP]
  C --> D[+ en-tête Ethernet]
```

<v-clicks>

- **Émission** : chaque couche ajoute un en-tête (encapsulation)
- **Réception** : chaque couche retire son en-tête (décapsulation)
- Rôle des **ports** : identifier quelle application reçoit les données sur une machine

</v-clicks>

<!--
Durée : 9 min (dont ~3 min de manipulation guidée).

Le port complète l'adresse IP : l'IP dirige vers la bonne machine, le port dirige vers la bonne application sur cette machine (80/443 pour le web, 22 pour SSH, 5432 pour PostgreSQL).

Exemple concret : un immeuble (l'adresse IP) contient plusieurs appartements (les ports) ; le facteur (le réseau) doit connaître les deux pour livrer au bon destinataire.

Manipulation guidée express : demander à chaque étudiant d'ouvrir un terminal et de lister les ports en écoute sur son poste (`netstat -tulpn` sous Linux, `netstat -ano` sous Windows), puis de retrouver à quelle application chaque port correspond — les manipulations guidées 1 et 2, plus détaillées, arrivent après le routage.

Transition : passer à l'adressage IPv4/IPv6.
-->

---

# IPv4 : structure d'une adresse

```text
192.168.1.10 / 24
└──┬──┘        └┬┘
 adresse      masque (préfixe CIDR)
```

<v-clicks>

- 4 octets, format décimal pointé
- **Adresse privée** (192.168.x.x, 10.x.x.x) vs **adresse publique**
- Le **masque** délimite la partie réseau de la partie machine

</v-clicks>

<!--
Durée : 8 min (dont ~4 min d'exercices de lecture d'adresses).

Rappeler que les adresses privées ne sont pas routables sur Internet : elles servent en interne (LAN, VPC cloud), une passerelle NAT fait le pont vers l'extérieur.

Exemple concret : le Wi-Fi de la salle attribue probablement des adresses 192.168.x.x aux postes ; c'est une adresse privée, pas visible depuis l'extérieur.

Exercice express : proposer 3-4 adresses IP à la salle et demander pour chacune si elle est privée ou publique, en levant la main — corrige immédiatement les erreurs de lecture avant d'aborder le CIDR.

Transition : introduire la lecture du CIDR.
-->

---

# Lire un CIDR simplement

| Notation | Nombre d'adresses | Usage typique |
|---|---:|---|
| `/32` | 1 | Une machine précise |
| `/24` | 256 | Petit réseau local |
| `/16` | 65 536 | Grand réseau d'entreprise |
| `/8` | 16 777 216 | Bloc historique très large |

<Tip type="info">
Plus le préfixe est petit, plus le réseau est grand : `/8` couvre bien plus d'adresses que `/24`.
</Tip>

<!--
Durée : 7 min (dont ~4 min d'exercices de lecture de CIDR).

Objectif : que l'étudiant sache lire "192.168.1.0/24" comme "256 adresses possibles dans ce réseau", sans exiger de calcul binaire complexe.

Exemple concret : un cloud provider alloue souvent un bloc `/16` à un VPC, puis le découpe en plusieurs sous-réseaux `/24` par zone de disponibilité — lien direct avec la séance cloud qui suit.

Exercice guidé : donner 3 notations CIDR (`/28`, `/20`, `/12`) et demander à la salle d'estimer, sans calculatrice, laquelle couvre le plus d'adresses — corriger ensemble en s'appuyant sur le tableau affiché.

Transition : passer à IPv6 en contraste rapide.
-->

---

# IPv6 : pourquoi et à quoi ça ressemble

<v-clicks>

- **Pourquoi** : épuisement des adresses IPv4 disponibles
- Format : 128 bits, notation hexadécimale (`2001:db8::1`)
- Coexiste avec IPv4 (dual-stack) sur la majorité des réseaux actuels

</v-clicks>

<!--
Durée : 3 min.

Rester bref : IPv6 n'est pas le cœur du cours, mais l'étudiant doit savoir le reconnaître et comprendre pourquoi il existe.

Exemple concret : un enregistrement DNS `AAAA` (vu juste après) sert précisément à publier une adresse IPv6, en miroir du `A` pour IPv4.

Transition : enchaîner sur le DNS, qui traduit les noms de domaine en adresses IP.
-->

---

# DNS : traduire un nom en adresse

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Navigateur] -->|"exemple.com ?"| B[Résolveur DNS]
  B -->|"203.0.113.10"| A
  A -->|Requête HTTP| C[Serveur 203.0.113.10]
```

<v-clicks>

- Le **DNS** évite de mémoriser des adresses IP
- Résolution en cascade : résolveur local → serveurs racine → TLD → serveur autoritaire
- Résultat souvent **mis en cache** (TTL)

</v-clicks>

<!--
Durée : 3 min (dont ~1 min de démonstration live).

Insister sur l'analogie annuaire téléphonique : on cherche un nom, on obtient un numéro (ici une adresse IP).

Exemple concret : demander à la salle de citer un site qu'ils visitent souvent, puis expliquer que taper son nom déclenche cette résolution avant même l'envoi de la requête HTTP.

Démonstration live : exécuter `dig exemple.com` (ou `nslookup`) devant la salle sur le nom de domaine cité, commenter brièvement les champs clés de la réponse (TTL, adresse résolue).

Transition : détailler les types d'enregistrements DNS les plus courants.
-->

---

# Enregistrements DNS courants

| Type | Rôle | Exemple |
|---|---|---|
| `A` | Nom → adresse IPv4 | `exemple.com → 203.0.113.10` |
| `AAAA` | Nom → adresse IPv6 | `exemple.com → 2001:db8::1` |
| `CNAME` | Alias vers un autre nom | `www.exemple.com → exemple.com` |
| `MX` | Serveur de messagerie | `exemple.com → mail.exemple.com` |

<!--
Durée : 4 min (dont ~1 min d'échange sur des cas vécus).

Ces 4 types couvrent la majorité des cas rencontrés en entreprise. Insister sur `CNAME` : très utilisé pour pointer un sous-domaine vers un service géré (CDN, plateforme cloud) sans exposer d'adresse IP brute.

Exemple concret : un enregistrement `MX` mal configuré est une cause fréquente d'emails qui n'arrivent jamais — bon exemple de conséquence business d'une erreur réseau.

Échange rapide avec la salle : demander si quelqu'un a déjà configuré un enregistrement DNS (sous-domaine personnel, projet perso).

Transition : voir comment un paquet trouve son chemin jusqu'au bon serveur (routage).
-->

---

# Routage et passerelle par défaut

<Tip type="info">
Le routage ne garantit pas un chemin unique : plusieurs routes peuvent exister, le routeur choisit la plus pertinente selon sa table.
</Tip>

<v-clicks>

- La **passerelle par défaut** est la porte de sortie du réseau local
- Chaque **routeur** décide du prochain saut vers la destination
- Le chemin peut traverser plusieurs réseaux intermédiaires

</v-clicks>



<!--
Durée : 4 min (dont ~1 min d'échange).

Rester conceptuel : pas besoin de détailler les protocoles de routage (BGP, OSPF) à ce niveau, juste le principe de saut en saut.

Exemple concret : `traceroute`/`tracert` révèle visuellement ces sauts intermédiaires — sert de transition parfaite vers la manipulation guidée qui suit.

Échange rapide avec la salle : demander combien de sauts ils imaginent entre leur poste et un site connu, noter 1-2 estimations au tableau, sans plus développer — la confrontation au résultat réel se fait dans la manipulation guidée `traceroute` qui suit.

Transition : avant la manipulation guidée, une courte séquence sur le pare-feu — un mécanisme déjà croisé implicitement dans les avertissements sur `traceroute`.
-->

---

# Pare-feu : filtrer le trafic réseau

<v-clicks>

- Un **pare-feu réseau** examine chaque paquet et l'autorise ou le bloque selon des **règles**
- Critères de filtrage : **IP source/destination**, **port**, **protocole**, **direction** (entrant/sortant)
- Exemple : HTTPS entrant en `TCP/443` **autorisé**, SSH entrant en `TCP/22` **limité ou refusé**

</v-clicks>

<br>

| Règle                   | Direction | Protocole/Port | Action                           |
|-------------------------|-----------|----------------|----------------------------------|
| Trafic web              | Entrant   | TCP/443        | Autorisé                         |
| Administration distante | Entrant   | TCP/22         | Limité (IP autorisées) ou refusé |

<!--
Durée : 2 min.

Poser le principe simplement : le pare-feu est une liste de règles ("si ce type de trafic correspond à cette règle, alors autoriser ou bloquer"), pas une boîte magique.

Exemple concret : un serveur web public autorise le port 443 (HTTPS) depuis n'importe où, mais restreint le port 22 (SSH, administration) à une liste d'adresses IP connues — c'est ce qui explique pourquoi un `ping` ou un port scan externe voit rarement le port 22 ouvert d'un serveur bien configuré.

Transition : préciser une nuance importante entre pare-feu réseau et pare-feu applicatif.
-->

---

# Pare-feu réseau vs pare-feu applicatif

<v-clicks>

- Le **pare-feu réseau** filtre sur IP/port/protocole, sans regarder le contenu de la requête
- Un **pare-feu applicatif (WAF)** inspecte le contenu (ex. requêtes HTTP suspectes), en plus du réseau
- Les deux niveaux sont complémentaires, pas interchangeables

</v-clicks>

<Tip type="warning">
Un port ouvert ne garantit pas qu'une application saine écoute derrière : le pare-feu contrôle l'accès réseau, pas la santé de l'application.
</Tip>

<!--
Durée : 2 min.

Rester très léger sur cette distinction : l'objectif est que l'étudiant sache qu'un pare-feu réseau (IP/port) et un pare-feu applicatif/WAF (contenu HTTP) existent à des niveaux différents, sans entrer dans la configuration de l'un ou l'autre.

Exemple concret : un port 443 ouvert et répondant ne prouve pas que l'application derrière fonctionne correctement (elle peut renvoyer des erreurs 500 en boucle) — nuance qui prépare la partie observabilité vue en séance 4.

Transition : passer à la première manipulation guidée, autour de `ping` et `traceroute`.
-->

---

# Manipulation guidée 1 — ping et traceroute/tracert

<div class="grid grid-cols-2 gap-6">
<div>

**macOS / Linux**

```bash
ping example.com
ping 8.8.8.8
traceroute example.com
```

</div>
<div>

**Windows (PowerShell)**

```powershell
ping example.com
ping 8.8.8.8
tracert example.com
```

</div>
</div>

<v-clicks>

- Cible par **nom** (`example.com`) : passe par le DNS puis teste l'ICMP
- Cible par **IP** (`8.8.8.8`) : isole le réseau, sans dépendre du DNS
- `traceroute`/`tracert` affiche les sauts intermédiaires, un routeur par ligne

</v-clicks>

<Tip type="warning">
Une ligne `* * *` dans `traceroute` signifie souvent un routeur qui ne répond pas à l'ICMP (silencieux), pas forcément une coupure réseau. Un pare-feu ou un Wi-Fi de campus peut aussi filtrer l'ICMP : ne jamais conclure à une absence d'Internet à partir d'un seul `ping` qui échoue.
</Tip>

<!--
Durée : 8 min (dont ~5 min de manipulation guidée en terminal).

Verbaliser la différence entre les deux cibles : `ping example.com` combine résolution DNS et test ICMP (deux causes d'échec possibles) alors que `ping 8.8.8.8` teste uniquement l'atteignabilité réseau, sans DNS.

Exemple concret : un `ping` qui échoue vers un nom mais réussit vers l'IP correspondante pointe vers un problème DNS, pas un problème réseau — nuance importante à faire vivre à voix haute.

Manipulation guidée : demander à chaque étudiant d'exécuter les trois commandes de sa colonne (macOS/Linux ou Windows) contre `example.com` et `8.8.8.8`, de repérer une ligne `* * *` dans son `traceroute`/`tracert` si elle apparaît, puis de comparer le nombre de sauts avec son voisin.

Transition : passer à la manipulation guidée sur la résolution DNS et la réponse HTTPS.
-->

---

# Parcours concret : de l'URL à la réponse HTTPS

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A["URL"] --> B["DNS"]
  B --> C["IP"]
  C --> D["TCP:443"]
  D --> E["TLS/HTTP"]
  E --> F["Réponse"]
```

<v-clicks>

- Le navigateur interroge le **DNS** puis ouvre une **connexion TCP** vers `IP:443`
- **TLS** sécurise le canal, une requête **HTTP** part ensuite ; le serveur répond et la page s'affiche

</v-clicks>

<!--
Durée : 5 min.

Objectif de cette slide : relier en une seule fois tout ce qui vient d'être vu séparément (couches, ports, IP, DNS, routage) sur un schéma compact unique, déjà annoncé en ouverture de séance.

Confronter brièvement ce schéma à la question posée en tout début de séance ("que se passe-t-il avant que la page s'affiche ?"). Point à verbaliser : le port 443 est la convention HTTPS ; TLS s'intercale entre la connexion TCP et la requête HTTP.

Transition : passer à la manipulation guidée qui vérifie concrètement ce parcours.
-->

---

# Manipulation guidée 2 — Du nom de domaine à la réponse HTTPS

<div class="grid grid-cols-2 gap-6">
<div>

**macOS / Linux**

```bash
nslookup example.com
curl -I https://example.com
```

</div>
<div>

**Windows (PowerShell)**

```powershell
nslookup example.com
curl.exe -I https://example.com
```

</div>
</div>

<v-clicks>

- `nslookup` retourne l'**adresse IP** résolue par le DNS
- `curl -I` interroge le serveur en HTTPS (port 443) et affiche le **statut HTTP** de la réponse

</v-clicks>

<Tip type="info">
`curl` teste la couche applicative HTTPS, pas une preuve ICMP : un `curl` qui réussit ne dit rien du comportement d'un `ping` sur la même cible, et inversement.
</Tip>

<!--
Durée : 8 min (dont ~5 min de manipulation guidée en terminal).

Faire le lien explicite avec le schéma qui précède : `nslookup` illustre l'étape DNS→IP, `curl -I` illustre les étapes TCP:443→TLS/HTTP→réponse.

Exemple concret : le code retourné par `curl -I` (`200`, `301`, `404`...) est le premier signal concret d'un incident applicatif, à distinguer d'un incident réseau bas niveau vu avec `ping`/`traceroute`.

Manipulation guidée : demander à chaque étudiant d'exécuter les deux commandes de sa colonne contre `example.com`, de noter l'adresse IP retournée par `nslookup` et le statut HTTP retourné par `curl -I`, puis de comparer avec son voisin.

Transition : refermer le bloc réseau, ouvrir le cloud après la pause.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Rester disponible pour des questions individuelles sur le bloc réseau qui vient de se terminer.

Transition au retour : ouvrir le bloc cloud avec les trois promesses (élasticité, mutualisation, paiement à l'usage).
-->

---

# Le cloud : trois promesses

<v-clicks>

- **Élasticité** — ajuster la capacité à la demande
- **Mutualisation** — des ressources partagées entre clients
- **Paiement à l'usage** — payer ce qui est consommé, pas une capacité figée

</v-clicks>

<Comparison left="On-premise" right="Fournisseur cloud" leftColor="orange" rightColor="green">
  <template #left>

  - **Responsabilité** : 100 % équipe (matériel, OS, réseau)
  - **Coût** : investissement initial (CapEx)
  - Capacité figée, à sur-dimensionner « au cas où »

  </template>
  <template #right>

  - **Responsabilité** : partagée fournisseur/client
  - **Coût** : dépense à l'usage (OpEx)
  - Capacité élastique, ajustée à la demande

  </template>
</Comparison>

<KeyConcept title="Pièges de facturation" icon="💸">
Le paiement à l'usage cache des coûts faciles à manquer : transfert sortant (**egress**) facturé au Go, ressources oubliées qui tournent sans usage, instances surdimensionnées par excès de prudence. Réflexe côté management : poser un budget et une alerte de dépassement dès la mise en service, pas après la première facture.
</KeyConcept>

<!--
Durée : 7 min.

Le modèle de responsabilité partagée est un point d'examen classique et une vraie source d'incidents en entreprise (buckets de stockage mal configurés, ouverts publiquement par erreur du client, pas du fournisseur).

Point à bien détailler : on-premise, le client porte 100 % de la responsabilité (et du coût fixe immobilisé) ; chez un fournisseur cloud, la responsabilité et le coût se déplacent — le fournisseur sécurise le socle physique et facture à l'usage, le client garde la main sur sa configuration et ses données. Ce basculement CapEx → OpEx est un argument de gestion de projet aussi important que l'argument technique.

Exemple concret : citer sans jugement de valeur qu'un compte cloud mal configuré (accès trop ouverts) reste la faute du client, même si l'hébergeur est un grand acteur reconnu — la responsabilité partagée n'est pas négociable.

Développer les pièges de facturation avec un cas concret : une machine de test qu'on oublie d'éteindre le week-end, ou un transfert de données volumineux vers un autre cloud qui déclenche des frais d'egress inattendus en fin de mois. Insister sur le réflexe budget/alerte comme geste de gestion de projet, pas seulement technique — lien direct avec le profil management du master.

Transition : avant de détailler les modèles de service cloud, un point essentiel de gestion — la maîtrise du coût.
-->

---

# FinOps : maîtriser le coût de l'infrastructure cloud

<v-clicks>

- **Valeur business** : dépenser au bon endroit, pas simplement "dépenser moins"
- **Visibilité et ownership** : des **tags** identifient quelle équipe/projet paie quoi
- **Budgets et alertes** : seuil de dépense défini à l'avance, notification avant dépassement
- **Rightsizing** : ajuster une ressource surdimensionnée à son usage réel
- Arrêter les ressources inutiles (environnement de test oublié allumé le week-end)

</v-clicks>

<KeyConcept title="Un service managé n'est pas toujours plus cher" icon="💡">
Un service managé peut coûter plus cher, moins cher, ou différemment en coût direct par rapport à une solution auto-gérée. Le bon réflexe : évaluer le **coût total** (infrastructure + exploitation + risque), jamais se limiter au seul prix affiché. Sources de coûts souvent sous-estimées : les frais de sortie de données (**egress**) et les outils d'**observabilité**.
</KeyConcept>

<!--
Durée : 3 min.

FinOps désigne la pratique qui rapproche équipes techniques et gestion financière autour de la dépense cloud — pertinent pour le profil management du master autant que pour un futur ingénieur.

Point à corriger explicitement s'il est mal compris : "managé" ne veut pas dire "plus cher automatiquement" — un service managé peut réduire le coût d'exploitation (moins d'heures d'ingénieur à maintenir un serveur) même si son prix catalogue semble plus élevé qu'une VM nue. Toujours comparer le coût total, pas seulement la ligne de facture infra.

Exemple concret : une équipe qui laisse tourner une base de données de test tout le week-end sans besoin réel paie pour rien ; un budget avec alerte à 80 % du seuil aurait signalé l'anomalie avant la facture de fin de mois.

Transition : détailler les modèles de service cloud (IaaS, PaaS, SaaS, serverless).
-->

---

# IaaS, PaaS, SaaS, serverless : le curseur de responsabilité

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[On-premise<br/>tout géré par vous] --> B[IaaS<br/>machines virtuelles, réseau]
  B --> C[PaaS<br/>runtime applicatif managé]
  C --> D[SaaS<br/>logiciel prêt à l'emploi]
  B --> E[Serverless<br/>fonctions à la demande]
```

<v-clicks>

- **IaaS** — vous gérez l'OS et l'application, le fournisseur gère le matériel
- **PaaS** — vous déployez du code, le fournisseur gère le runtime
- **SaaS** — vous utilisez un logiciel, rien à administrer
- **Serverless** — le code s'exécute à la demande, sans gestion de serveur

</v-clicks>

<!--
Durée : 3 min.

Chaque modèle déplace le curseur de responsabilité : plus on monte vers le SaaS, moins le client gère d'infrastructure, mais moins il a de contrôle fin. Un exemple concret unique et filé sur la slide suivante rend cette abstraction immédiatement lisible.

Transition : voir ce curseur appliqué à un cas concret unique, décliné sur les quatre modèles.
-->

---

# Exemple concret : héberger une API Node sur les 4 modèles

| Modèle | Qui gère l'application/le code | Qui gère l'OS/runtime | Qui gère l'infrastructure physique |
|---|---|---|---|
| **On-premise** | Vous | Vous | Vous |
| **IaaS** | Vous | Vous | Fournisseur |
| **PaaS** | Vous | Fournisseur | Fournisseur |
| **SaaS** | Fournisseur | Fournisseur | Fournisseur |

<Tip type="info">
Sur ce même besoin — héberger une API Node — le code applicatif reste presque toujours de votre responsabilité (sauf en SaaS, où vous n'avez plus de code à héberger, mais un logiciel fourni tel quel). Ce qui change, c'est tout ce qu'il y a en dessous.
</Tip>

<!--
Durée : 3 min.

Reprendre le même besoin ("je veux héberger une API Node") ligne par ligne, en insistant sur ce qui change réellement entre chaque modèle plutôt que sur le vocabulaire seul.

Exemple concret : en IaaS, l'équipe installe et met à jour Node elle-même sur une VM louée ; en PaaS (type Heroku, Azure App Service), elle pousse son code et le runtime Node est déjà prêt ; en SaaS, il n'y a plus d'API à coder soi-même — on consomme un service existant qui répond au même besoin métier.

Transition : comparer ces modèles à un hébergement classique via une étude de cas.
-->

---

# Quel modèle choisir ?

| Contexte | Modèle pertinent | Pourquoi |
|---|---|---|
| Contrôle fin de l'OS, legacy | IaaS | Liberté totale de configuration |
| Équipe réduite, déploiement fréquent | PaaS | Le runtime est déjà géré |
| Besoin métier standard (mail, CRM) | SaaS | Aucune administration technique |
| Traitement ponctuel, trafic imprévisible | Serverless | Facturation à l'exécution réelle |

<Tip type="warning">
Aucun modèle n'est universellement supérieur : le choix dépend du contexte, de l'équipe et du budget.
</Tip>

<!--
Durée : 3 min (temps d'étude de cas en binômes, resserré pour laisser place au focus serverless qui suit).

Faire réagir la salle : donner un cas (ex. "startup de 3 développeurs qui lance un MVP") et demander quel modèle ils choisiraient, puis confronter les réponses.

Exemple concret : une PME qui migre sa messagerie vers un SaaS (type Microsoft 365 ou Google Workspace) gagne en simplicité mais perd en personnalisation fine — bon exemple pour le profil management du master (arbitrage coût/contrôle).

Déroulé pratique : former des binômes, distribuer 1 minute pour trancher sur le cas proposé et justifier le choix à l'oral, puis passer directement à la mise en commun collective (le second cas contrasté est abandonné pour laisser plus de temps au focus serverless qui suit).

Transition : avant de voir le serverless en détail puis AWS, Azure et GCP, clarifier précisément qui gère quoi selon le modèle.
-->

---

# Qui gère quoi ?

| Responsabilité | On-Premise | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Application et données | Client | Client | Client | Fournisseur |
| Runtime / middleware | Client | Client | Fournisseur | Fournisseur |
| Système d'exploitation | Client | Client | Fournisseur | Fournisseur |
| Virtualisation | Client | Fournisseur | Fournisseur | Fournisseur |
| Serveurs, stockage, réseau physique | Client | Fournisseur | Fournisseur | Fournisseur |

<Tip type="warning">
Les frontières exactes varient selon le fournisseur et l'offre précise — ce tableau donne le cas général, pas une règle absolue. Dans la plupart des modèles, y compris en SaaS, les données et les accès restent une responsabilité du client (configuration des droits, classification des données sensibles).
</Tip>

<!--
Durée : 4 min.

Ce tableau prolonge directement le modèle de responsabilité partagée vu plus tôt dans la séance, en le rendant explicite ligne par ligne plutôt qu'en une seule notion générale.

Point à corriger explicitement s'il est mal compris : "Fournisseur" ne veut jamais dire "le client n'a plus rien à faire" sur cette ligne — même en SaaS, le client reste responsable de qui a accès à ses données et de leur classification.

Lire la première ligne (application et données) en écho direct à l'exemple "héberger une API Node" vu juste avant : c'est la ligne qui change de colonne le plus tard (seulement en SaaS), contrairement à l'infrastructure physique qui change dès l'IaaS.

Transition : un cas particulier de ce tableau mérite un focus dédié — le serverless, avant de voir comment AWS, Azure et GCP l'incarnent concrètement.
-->

---

# Serverless : objectifs et principes

<v-clicks>

- Le code s'exécute **en réponse à un événement** : requête HTTP, message dans une file d'attente, dépôt de fichier...
- La plateforme **scale automatiquement** en fonction du trafic, y compris jusqu'à **zéro** instance en l'absence d'activité
- La facturation suit **l'usage réel** (temps d'exécution, nombre d'invocations), pas une capacité réservée à l'avance
- Objectif : réduire au maximum les tâches d'infrastructure à la charge de l'équipe (dimensionnement, patch, disponibilité du socle)

</v-clicks>

<KeyConcept title="« Sans serveur » ne veut pas dire « sans responsabilité »" icon="⚠️">
Le fournisseur gère l'infrastructure, la scalabilité et le patch du socle d'exécution. L'équipe reste responsable de son code, de sa configuration, de ses données et des permissions qu'elle accorde.
</KeyConcept>

<!--
Durée : 4 min.

Poser les trois déclencheurs classiques (HTTP, message, fichier) comme porte d'entrée : le serverless n'est pas un modèle isolé, mais une façon de répondre à un événement sans provisionner de serveur à l'avance.

Point à corriger explicitement s'il est mal compris : "sans serveur" ne signifie jamais "sans responsabilité" — le fournisseur gère l'infrastructure, la scalabilité et le patch du socle, mais l'équipe garde la responsabilité de son code, de sa configuration et de ses permissions d'accès.

Nuance à ne pas passer sous silence : le serverless n'est ni gratuit ni universellement meilleur. Limites concrètes à citer : le cold start (latence au premier appel après une période d'inactivité), des limites de durée et de ressources d'exécution imposées par le fournisseur, une dépendance parfois forte au fournisseur selon le service utilisé, et un besoin d'observabilité et de suivi des coûts qui ne disparaît pas — il se déplace.

Exemple concret : une fonction qui traite un fichier déposé dans un stockage objet ne tourne que pendant le traitement, puis s'arrête complètement — contrairement à un serveur classique qui reste allumé même sans trafic.

Transition : voir comment ce modèle s'incarne concrètement chez les trois grands fournisseurs, du déclencheur au service.
-->

---

# Serverless chez les hyperscalers : du déclencheur au service

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Événement] --> B[Fonction]
  B --> C[Service aval]
```

| Besoin                    | AWS            | Azure             | GCP             |
|---------------------------|----------------|-------------------|-----------------|
| Fonction serverless       | Lambda         | Azure Functions   | Cloud Functions |
| Passerelle API            | API Gateway    | API Management    | API Gateway     |
| Orchestration de workflow | Step Functions | Durable Functions | Workflows       |
| Bus d'événements          | EventBridge    | Event Grid        | Eventarc        |


<!--
Durée : 5 min.

Lire le schéma comme un fil conducteur : un événement (HTTP, message, fichier) déclenche une fonction, qui elle-même peut appeler un service en aval (base de données, autre file, notification). C'est ce même fil qui se retrouve sous des noms différents chez chaque fournisseur.

Parcourir le tableau ligne par ligne : la fonction elle-même (Lambda / Azure Functions / Cloud Functions), la façon d'exposer une fonction en HTTP via une passerelle API (API Gateway / API Management / API Gateway), l'orchestration de plusieurs fonctions en workflow (Step Functions / Durable Functions / Workflows), et le bus d'événements qui route les déclencheurs (EventBridge / Event Grid / Eventarc).

Point à corriger explicitement s'il est mal compris : Fargate, Container Apps et Cloud Run ne sont pas des fonctions serverless au même titre que Lambda ou Cloud Functions — ce sont des conteneurs serverless, un modèle hybride qui supprime la gestion de serveur mais conserve la notion de conteneur complet. Le bon choix entre fonction et conteneur serverless dépend du cas (taille du code, durée d'exécution, dépendances).

Exemple concret : un fichier déposé dans un bucket S3 déclenche EventBridge, qui invoque une fonction Lambda, qui écrit le résultat dans une base DynamoDB — la même chaîne existe chez Azure et GCP avec des noms différents.

Transition : après la fonction et le service managé, revenir sur les briques transverses communes à AWS, Azure et GCP.
-->

---

# AWS, Azure, GCP : mêmes briques, noms différents

| Besoin                  | AWS       | Azure            | GCP             |
|-------------------------|-----------|------------------|-----------------|
| Machine virtuelle       | EC2       | Virtual Machines | Compute Engine  |
| Stockage objet          | S3        | Blob Storage     | Cloud Storage   |
| Base de données managée | RDS       | Azure SQL        | Cloud SQL       |
| Serverless (fonctions)  | Lambda    | Azure Functions  | Cloud Functions |
| Réseau virtuel          | VPC       | VNet             | VPC             |
| Conteneurs orchestrés   | ECS / EKS | AKS              | GKE             |

<!--
Durée : 4 min.

Message clé : ce ne sont pas des familles de services fondamentalement différentes — ce sont des implémentations différentes des mêmes concepts (calcul, stockage, base de données, fonctions, réseau, conteneurs). La ligne serverless vient d'être détaillée juste avant : ce tableau la resitue simplement parmi les autres briques.

Exemple concret à formuler avec prudence, sans ouvrir d'échange dessus : des architectures cloud sont documentées publiquement par des entreprises comme Netflix (AWS), ou par Microsoft et Google pour leurs propres services Azure et GCP — ce sont des cas publics datés, pas des relations exclusives ni des modèles universels à copier tel quel.

Transition : ces trois acteurs ne sont pas les seuls — voir comment s'organisent identité et gouvernance chez un fournisseur cloud.
-->

---

# Identité et organisation chez un fournisseur cloud

<v-clicks>

- AWS, Azure et GCP sont trois acteurs majeurs, **non exclusifs** : d'autres existent (ex. OVHcloud, Scaleway)
- Un **compte/organisation** regroupe les ressources et les utilisateurs d'un client
- La gestion des identités et des droits (**IAM**) contrôle qui peut faire quoi

</v-clicks>

<br>

| Fournisseur | Organisation      | Identités et droits |
|-------------|-------------------|---------------------|
| AWS         | AWS Organizations | IAM                 |
| Azure       | Management Groups | Microsoft Entra ID  |
| GCP         | Organization      | Cloud IAM           |

<!--
Durée : 3 min.

Point à verbaliser : cette organisation par comptes et IAM est la brique technique qui porte concrètement le modèle de responsabilité partagée vu plus tôt — le client configure ses droits d'accès, le fournisseur ne le fait pas à sa place.

Exemple concret, énoncé rapidement sans ouvrir la discussion : un accès trop ouvert dans l'IAM d'un compte (droit "tout" donné par erreur) est une cause fréquente d'incident de sécurité cloud, quel que soit le fournisseur.

Transition : avec ces briques communes, quels critères orientent un vrai choix de fournisseur ?
-->

---

# Choisir un fournisseur cloud : les critères qui comptent

<Tip type="warning">
Aucun fournisseur n'est universellement meilleur : le bon choix dépend du contexte, jamais d'une préférence de principe.
</Tip>

<v-clicks>

- **Compétences** de l'équipe déjà en place sur un fournisseur
- **Écosystème** : services managés disponibles, intégrations existantes
- **Conformité et souveraineté** : réglementation du secteur, localisation des données
- **Coûts**, y compris les frais de sortie de données (**egress**)

</v-clicks>



<!--
Durée : 2 min.

Rester bref : cette slide est une synthèse de critères de décision managériale, pas une nouvelle notion technique — elle prépare directement la nuance SecNumCloud qui suit. Énoncer l'exemple concret sans ouvrir de discussion : une entreprise déjà formée sur AWS ne migre pas vers Azure pour un gain marginal ; le coût de montée en compétence dépasse souvent le bénéfice.

Transition : un cas particulier de conformité et de souveraineté mérite un focus dédié — SecNumCloud.
-->

---

# SecNumCloud : qualification ANSSI, pas un fournisseur

<v-clicks>

- **SecNumCloud** qualifie une **offre cloud précise** selon un référentiel de l'ANSSI, ce n'est pas un label d'entreprise
- Un même fournisseur peut proposer des offres qualifiées et d'autres non qualifiées
- Cloud public hyperscaler : écosystème large, élasticité forte
- Offre SecNumCloud : exigences renforcées de sécurité et de souveraineté juridique/opérationnelle des données

</v-clicks>

<Comparison left="Cloud public hyperscaler" right="Offre SecNumCloud" leftColor="orange" rightColor="green">
  <template #left>

  - Catalogue de services très large
  - Élasticité et innovation rapide
  - Cadre juridique parfois hors UE

  </template>
  <template #right>

  - Catalogue de services plus restreint
  - Exigences de sécurité et d'hébergement renforcées
  - Cadre juridique et opérationnel maîtrisé

  </template>
</Comparison>

<!--
Durée : 6 min.

Point à corriger explicitement s'il est mal compris : SecNumCloud n'est pas un attribut que "toute entreprise française" possède automatiquement ; c'est une qualification obtenue offre par offre, après audit, selon un référentiel publié par l'ANSSI.

Cas typiques où la question se pose concrètement, énoncés sans les développer en échange ouvert : données de santé ou données sensibles d'un secteur régulé, marchés du secteur public — sans prétendre que SecNumCloud serait une obligation générale ou automatique dans ces cas.

Exemple concret : présenter la comparaison comme un arbitrage, pas un jugement de valeur — un hyperscaler reste pertinent pour l'écosystème et l'élasticité, une offre SecNumCloud reste pertinente quand la souveraineté et la sécurité renforcée priment sur le catalogue de services.

Insister à voix haute : la liste des offres qualifiées évolue, ce cours ne peut pas servir de référence figée ; renvoyer systématiquement vers le site de l'ANSSI pour l'état en vigueur, et vers un service juridique/conformité pour toute décision réelle.

Transition : passer à la haute disponibilité, dernier bloc de la séance 1.
-->

---

# Haute disponibilité : health check HTTP ou TCP ?

<v-clicks>

- **Load balancer** — répartit le trafic entre instances déclarées saines, via des vérifications régulières
- **Health check TCP** — vérifie seulement que le port répond : contrôle simple mais superficiel
- **Health check HTTP** — attend une vraie réponse applicative (code **2xx** sur un endpoint dédié, ex. `/health`)

</v-clicks>

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  LB[Load balancer] -.->|Health check| I1[Instance A]
  LB -.->|Health check| I2[Instance B]
```

<Tip type="warning">
Un health check TCP peut déclarer une instance "saine" alors que l'application plante en boucle derrière un port qui reste ouvert.
</Tip>

<!--
Durée : 3 min.

Relier au vocabulaire du cloud vu juste avant : ces mécanismes existent chez tous les fournisseurs, sous des noms différents (Auto Scaling Group, Availability Set, Managed Instance Group...).

Bien distinguer les deux niveaux de health check, sans s'attarder : TCP se contente de vérifier qu'une connexion s'établit sur le port (rapide, mais ne dit rien de l'état de l'application) ; HTTP appelle un endpoint précis et attend un code de statut 2xx (plus représentatif, mais toujours limité — un `/health` peut répondre "ok" sans vérifier une dépendance critique comme la base de données).

Transition : voir comment le load balancer et l'orchestrateur réagissent concrètement à un health check en échec.
-->

---

# Réaction automatique : retrait, restart, réconciliation

<v-clicks>

- Health check en échec → le load balancer **retire l'instance** du trafic
- L'orchestrateur déclenche un **restart automatique** de l'instance défaillante
- **Boucle de réconciliation** : compare en continu l'état désiré (ex. 3 replicas) à l'état réel, et corrige l'écart

</v-clicks>

<KeyConcept title="Exemple" icon="🔄">
3 replicas tournent ; l'un d'eux tombe. La réconciliation détecte 2 replicas au lieu de 3 et relance une instance de remplacement, sans intervention humaine.
</KeyConcept>

<Tip type="warning">
Un restart automatique ne corrige ni un bug applicatif qui se reproduit à chaque démarrage, ni une base de données indisponible en amont — les logs et le monitoring restent indispensables pour diagnostiquer la cause réelle (sujet approfondi en séance 4, avec l'observabilité).
</Tip>

<!--
Durée : 3 min.

Exemple concret, énoncé sans ouvrir de démonstration en direct : si une seule instance tombe, le load balancer cesse de lui envoyer du trafic dès que son health check échoue — l'utilisateur ne voit rien passer ; l'orchestrateur relance ensuite une instance de remplacement pour revenir à l'état désiré.

Point à corriger explicitement s'il est mal compris : la haute disponibilité automatise la résilience face à une panne d'instance, mais ne répare jamais un défaut du code ou une dépendance externe indisponible (base de données, API tierce) — un restart en boucle sur un bug qui se reproduit à chaque démarrage est un symptôme d'alerte à surveiller, pas une solution.

Transition : synthèse de la séance 1.
-->

---
layout: recap
section: Séance 1 — Réseaux, cloud et haute disponibilité
---

# Ce qu'il faut retenir

- **Couches réseau** : application, transport, réseau, liaison — encapsulation à l'émission
- **IPv4/IPv6, CIDR** : adresse + masque définissent la taille d'un réseau
- **DNS** : `A`/`AAAA`/`CNAME`/`MX` traduisent des noms en ressources
- **Routage et pare-feu** : passerelle par défaut, sauts successifs, filtrage par IP/port/protocole/direction
- **Cloud** : élasticité, mutualisation, paiement à l'usage, responsabilité partagée, FinOps
- **IaaS/PaaS/SaaS/serverless** : le curseur de contrôle vs simplicité, qui gère quoi
- **Haute disponibilité** : health check HTTP/TCP, retrait, restart, boucle de réconciliation

<!--
Durée : 3 min.

Consigne interséance : demander aux étudiants d'observer, sur un service qu'ils utilisent (banque en ligne, jeu vidéo, réseau social), ce qui pourrait relever de la haute disponibilité (multi-région annoncée, statut de service public, etc.).

Transition : lancer le QCM de clôture de la séance 1.
-->

---
layout: pause
duration: 20 min
---

---
layout: qcm
duration: 20 min
questions: 20
cover: couches TCP/IP et OSI, parcours URL → DNS → TCP → serveur, IP/DNS, routage, cloud (IaaS/PaaS/SaaS/serverless), AWS/Azure/GCP, haute disponibilité
---

# QCM de clôture — Séance 1

<!--
Durée : 20 min (lancement 2 min, jeu 15 min, débrief 3 min) pour 30 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 30 questions de la section « Séance 1 » de `qcm-kahoot.md`, puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : objectif individuel de vérification des acquis, pas une compétition à forte pression ; signaler explicitement les questions à réponses multiples (plusieurs cases à cocher) pour éviter toute confusion sur le mode de réponse ; laisser large sur le temps par question pour absorber une connexion réseau lente en salle.

Exemple concret de question possible : "Quel type d'enregistrement DNS pointe vers une adresse IPv4 ?" (réponse attendue : A) — les 30 questions réelles sont dans `qcm-kahoot.md`.

Transition : débriefer collectivement les 2-3 questions les plus ratées, puis annoncer la séance 2 — DevOps, Git, Docker et écosystème cloud-native.
-->

---
layout: section-cover
section: Séance 2 — 3h
---

# DevOps, Git, Docker et écosystème cloud-native

De la culture DevOps aux conteneurs et à Compose

<!--
Durée : 1 min (introduction : 5 min au total avec le rappel de la séance 1 et l'annonce des deux TP).

Annoncer le déroulé : la culture DevOps et les métiers, Git et les commandes de base, l'Infrastructure as Code et le GitOps, les fondamentaux Docker, une pause, les bonnes pratiques d'images, Docker Compose, un premier aperçu de l'écosystème cloud-native avec la CNCF et Kubernetes, puis le lancement de deux TP et le QCM de clôture.

Transition : rappel factuel de la séance 1.
-->

---

# Rappel de la séance 1

<v-clicks>

- **Réseau** : couches TCP/IP, adresse IP + masque (CIDR), DNS qui traduit un nom en adresse, ports
- **Cloud** : IaaS, PaaS, SaaS, serverless ; responsabilité partagée entre fournisseur et client
- **Haute disponibilité** : redondance, health checks, retrait des instances malades, redémarrage
- **Aujourd'hui** : ces notions reviennent avec les conteneurs (ports, DNS interne, probes)

</v-clicks>

<!--
Durée : 2 min.

Rappel purement factuel, sans interroger la salle : on remet en mémoire le vocabulaire utile pour la suite. Le réseau (ports, DNS) servira à comprendre la communication entre conteneurs ; le cloud et la haute disponibilité donnent le contexte de l'automatisation et de Kubernetes.

Exemple concret : un nom comme `api` résolu en adresse IP par un DNS, vu en séance 1 pour Internet, existe aussi à l'intérieur d'un réseau de conteneurs, ce que l'on verra avec Compose.

Transition : annoncer les deux TP qui rythment la fin de la séance.
-->

---

# Cette séance : théorie, puis deux TP

<div class="grid grid-cols-3 gap-4 mt-4">
  <div class="card">
    <div class="text-3xl mb-2">📚</div>
    <div class="font-bold text-accent mb-1">Comprendre</div>
    <div class="text-sm">DevOps, Git, Infrastructure as Code, GitOps, Docker, Compose, Kubernetes</div>
  </div>
  <div class="card">
    <div class="text-3xl mb-2">🛠️</div>
    <div class="font-bold text-accent mb-1">Deux TP</div>
    <div class="text-sm"><strong>TP Docker</strong> puis <strong>TP Compose</strong> : énoncés présentés en fin de séance, démarrage en séance</div>
  </div>
  <div class="card">
    <div class="text-3xl mb-2">📦</div>
    <div class="font-bold text-accent mb-1">À rendre avant la séance 3</div>
    <div class="text-sm">Dépôt(s) <strong>GitHub public(s)</strong>, corrigés au début de la séance 3</div>
  </div>
</div>

<v-clicks>

- Les deux TP se terminent **hors séance** : la séance sert à bien démarrer
- Un compte **GitHub** et un poste avec Docker et Git sont nécessaires

</v-clicks>

<!--
Durée : 2 min.

Annoncer dès maintenant que la séance se termine par le lancement de deux TP : un TP Docker puis un TP Compose. Ils sont à terminer en dehors du cours et à rendre AVANT la séance 3 sous forme de dépôt(s) GitHub public(s), pour correction. Les énoncés détaillés, les attendus de remise et 15 minutes de mise en pratique viennent en fin de séance, juste avant le QCM : inutile d'entrer dans le détail maintenant.

Les prérequis (Docker, Git, Node ou bun, compte GitHub) ont été annoncés à la séance 1 ; vérifier d'un mot que chacun a Docker opérationnel, car le temps de séance ne permet pas de dépanner une installation.

Exemple concret : le travail terminé à la maison sera relu comme une revue de code, d'où l'importance d'un dépôt lisible.

Transition : commençons par la culture DevOps, avec les métiers d'hier.
-->

---

# Métiers d'hier : Dev d'un côté, Ops de l'autre

<Comparison left="Dev" right="Ops" leftColor="blue" rightColor="orange">
  <template #left>

  - Conçoit et écrit les fonctionnalités
  - Teste sur son poste ou un environnement de recette
  - Livre une version, puis passe au sujet suivant

  </template>
  <template #right>

  - Administre les systèmes et serveurs, physiques puis machines virtuelles
  - Gère le réseau, le stockage, les sauvegardes
  - Déploie, surveille, répond aux incidents

  </template>
</Comparison>

<v-clicks>

- La livraison passait de main en main : **tickets**, fenêtres de mise en production, procédures manuelles
- Chaque équipe optimisait **son** objectif : nouveauté d'un côté, stabilité de l'autre

</v-clicks>

<!--
Durée : 3 min.

Présenter les deux métiers historiques sans caricature : chacun avait une vraie expertise et des contraintes légitimes. Les développeurs étaient jugés sur les fonctionnalités livrées ; les administrateurs systèmes sur la disponibilité des serveurs, avec des machines physiques à racker puis, plus tard, des machines virtuelles, et un réseau à maintenir.

Exemple concret : une nouvelle version demandait un ticket pour obtenir un serveur, un autre pour ouvrir un port, un troisième pour la mise en production : chaque délai était raisonnable, leur somme ne l'était plus.

Transition : voir ce que cette séparation provoque quand les changements deviennent fréquents.
-->

---

# Avant DevOps : des silos Dev et Ops

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A["Dev<br/>livre vite, veut du changement"] -->|Livraison| B["Ops<br/>stabilise, refuse le risque"]
  B -->|Tickets, incidents| A
```

<v-clicks>

- **Dev** : ajoute des fonctionnalités, veut livrer vite
- **Ops** : maintient le service stable, redoute chaque changement
- Objectifs structurellement opposés → tensions, lenteurs, blâme mutuel

</v-clicks>

<!--
Durée : 2 min.

Poser le problème avant la solution : sans objectifs partagés, chaque livraison devient un conflit d'intérêt entre celui qui code et celui qui exploite.

Exemple concret : une mise en production qui casse un vendredi soir, le développeur injoignable, l'équipe d'exploitation seule pour gérer l'incident — schéma classique pré-DevOps.

Transition : pourquoi ce problème est-il devenu critique ces dernières années ?
-->

---

# Pourquoi DevOps aujourd'hui ?

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-1">⏱️ Fréquence</div>
    <div class="text-sm">Les produits évoluent en continu : on livre chaque semaine, voire chaque jour, plus chaque trimestre</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🧩 Complexité</div>
    <div class="text-sm">Services multiples, cloud, conteneurs, dépendances : impossible de tout gérer à la main</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🛡️ Fiabilité</div>
    <div class="text-sm">Les utilisateurs attendent un service disponible en permanence, même pendant les changements</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🔁 Feedback</div>
    <div class="text-sm">Un retour rapide (tests, métriques, incidents) permet de corriger tôt, quand c'est peu coûteux</div>
  </div>
</div>

<!--
Durée : 3 min.

DevOps n'est pas né d'une mode mais d'une contrainte réelle : livrer plus souvent, dans des systèmes plus complexes, sans dégrader la fiabilité. Les leviers qui l'ont rendu possible sont le cloud, les conteneurs, l'automatisation, le CI/CD et l'observabilité, développés dans ce cours.

Exemple concret : une équipe qui déployait une fois par trimestre avec une longue nuit de mise en production peut, avec des changements petits, automatisés et testés, livrer plusieurs fois par semaine ; un petit changement échoue moins gravement qu'un gros.

Transition : DevOps ne supprime pas les rôles, il partage la responsabilité du résultat.
-->

---

# Responsabilité partagée, pas diluée

<KeyConcept title="Responsabilité partagée" icon="🤝">
DevOps ne supprime pas les rôles : il fait porter conjointement le résultat de bout en bout, du code au service en production.
</KeyConcept>

<v-clicks>

- Le développeur pense à l'exploitabilité de son code
- L'exploitant participe aux choix qui impactent la fiabilité
- L'automatisation absorbe les tâches répétitives, pas la responsabilité humaine

</v-clicks>

<!--
Durée : 2 min.

Nuance importante à verbaliser : « responsabilité partagée » ne veut pas dire « personne n'est responsable » — chacun reste responsable, mais sur un objectif commun.

Exemple concret : un développeur qui ajoute un healthcheck à son service facilite le travail de l'équipe d'exploitation — petit geste, grand effet sur la fiabilité partagée.

Transition : à quoi ressemblent concrètement les métiers aujourd'hui.
-->

---

# Métiers d'aujourd'hui : collaboration et automatisation

<div class="grid grid-cols-3 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-1">🤝 Collaborer</div>
    <div class="text-sm">Dev et Ops travaillent sur les mêmes outils, relisent les mêmes changements, partagent les astreintes et les incidents</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">⚙️ Automatiser</div>
    <div class="text-sm">Tests, builds, déploiements et infrastructure décrits en code, versionnés et rejouables</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🧭 Partager</div>
    <div class="text-sm">Le résultat de bout en bout est porté ensemble : le code, mais aussi son exploitation</div>
  </div>
</div>

<v-clicks>

- L'expertise **système, réseau et sécurité** reste indispensable : elle s'exprime davantage en code et en plateformes
- Les intitulés varient (ingénieur DevOps, SRE, ingénieur plateforme, administrateur système...) : ce sont les **pratiques** qui comptent

</v-clicks>

<!--
Durée : 3 min.

Message à faire passer : les compétences d'administration restent précieuses ; ce qui change, c'est la manière de les exercer (automatisation, code, collaboration) et le partage du résultat. Ne pas laisser croire que le métier d'administrateur disparaît, ni qu'un « poste DevOps » unique résoudrait seul les problèmes de l'organisation.

Exemple concret : le même besoin, « ouvrir un port et déployer une nouvelle version », passe d'un ticket entre deux équipes à un changement relu dans un dépôt, appliqué automatiquement et observable.

Transition : une courte remarque sur les intitulés, puis le cycle DevOps.
-->

---

# Des intitulés variés, un même état d'esprit

<v-clicks>

- Ingénieur plateforme, SRE, ingénieur DevOps : des appellations selon les organisations
- Aucun intitulé n'est une norme universelle — le contexte de l'entreprise prime
- Ce qui compte : les **pratiques** (automatisation, mesure, collaboration), pas l'étiquette du poste

</v-clicks>

<!--
Durée : 1 min.

Éviter tout discours prescriptif sur « le » métier DevOps : insister sur la diversité des organisations et des appellations selon les entreprises et les pays.

Exemple concret : deux entreprises comparables peuvent appeler la même fonction « DevOps Engineer » et « Site Reliability Engineer » sans différence pratique majeure.

Transition : formaliser le cycle DevOps et introduire les métriques DORA.
-->

---
class: flex flex-col items-center justify-center text-center
---

# Le cycle DevOps

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620', fontSize: '18px'}}
flowchart TB
  subgraph DEV["Côté Dev : construire"]
    direction LR
    A[Plan] --> B[Code] --> C[Build] --> D[Test]
  end
  subgraph OPS["Côté Ops : livrer et exploiter"]
    direction LR
    E[Release] --> F[Deploy] --> G[Operate] --> H[Monitor]
  end
  DEV ==>|"version testée"| OPS
  OPS -.->|"retours terrain : le Monitor alimente le prochain Plan"| DEV
```

<!--
Durée : 3 min.

Ce cycle est un visuel classique du domaine, volontairement réparti sur deux lignes pour rester lisible en projection : Plan → Code → Build → Test en haut (côté Dev), Release → Deploy → Operate → Monitor en bas (côté Ops). Insister : c'est un cycle, pas une ligne droite — la flèche pointillée de retour montre que le monitoring nourrit le plan suivant (boucle de rétroaction), et le découpage Dev/Ops n'est qu'un repère : les deux moitiés sont portées ensemble.

Exemple concret : un pic d'erreurs observé en Monitor déclenche une nouvelle tâche en Plan — la boucle se referme concrètement.

Transition : présenter les métriques DORA comme façon de mesurer ce cycle.
-->

---

# Les métriques DORA

<KeyConcept title="DORA" icon="📊">
Quatre métriques qui caractérisent la performance d'une organisation logicielle (DevOps Research and Assessment).
</KeyConcept>

<v-clicks>

- **Fréquence de déploiement** — à quelle cadence on livre en production
- **Délai de mise en œuvre** — du commit au déploiement
- **Taux d'échec des changements** — proportion de déploiements causant un incident
- **Temps moyen de rétablissement (MTTR)** — vitesse de retour à la normale

</v-clicks>

<!--
Durée : 3 min.

DORA est devenu un standard de référence pour évaluer objectivement une organisation, au-delà des impressions subjectives ("on livre vite" n'est pas mesurable sans ces métriques).

Exemple concret pour le profil management du master : ces 4 métriques permettent à un chef de projet de dialoguer avec une DSI sur la performance réelle d'une équipe, sans jargon technique excessif.

Transition : refermer le bloc DevOps, ouvrir le bloc Git.
-->

---

# Git : un historique versionné et distribué

<KeyConcept title="Git" icon="🌿">
Un outil qui enregistre l'historique d'un projet sous forme de **commits** et permet de travailler à plusieurs sur les mêmes fichiers.
</KeyConcept>

<v-clicks>

- **Historique** : chaque commit est un instantané identifié, daté et attribué à son auteur
- **Distribué** : chaque clone contient l'historique complet, on travaille d'abord **en local**
- **Local puis distant** : on partage ses commits avec un dépôt distant quand on le décide
- **Git ≠ GitHub** : Git est l'outil ; GitHub et GitLab sont des plateformes qui hébergent des dépôts Git et ajoutent PR/MR, issues, CI

</v-clicks>

<!--
Durée : 3 min.

Poser la distinction fondamentale avant tout flux collaboratif : Git fonctionne sans réseau et sans plateforme. Une plateforme comme GitHub ou GitLab héberge un dépôt distant de référence et ajoute des services (pull/merge requests, revue, tickets, intégration continue).

Exemple concret : on peut créer un dépôt, committer dix fois et consulter l'historique dans un avion, sans connexion ; le partage ne vient qu'ensuite.

Transition : situer précisément où vivent les changements, du fichier modifié au dépôt distant.
-->

---

# Local et distant : où vivent les changements ?

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A["Répertoire de travail<br/>fichiers modifiés"] -->|"git add"| B["Index<br/>prochain commit"]
  B -->|"git commit"| C["Dépôt local<br/>historique"]
  C -->|"git push"| D["Dépôt distant<br/>plateforme"]
  D -->|"git pull / clone"| C
```

<v-clicks>

- Le **commit** enregistre uniquement ce qui a été préparé avec `add`
- Le **dépôt local** et le **dépôt distant** sont deux copies distinctes de l'historique
- `push` envoie ses commits ; `pull` récupère ceux des autres

</v-clicks>

<!--
Durée : 3 min.

Parcourir le schéma de gauche à droite. Le répertoire de travail contient les fichiers que l'on édite ; l'index (staging) liste ce qui sera inclus dans le prochain commit ; le dépôt local stocke l'historique ; le dépôt distant sert de point d'échange.

Exemple concret : modifier deux fichiers mais n'ajouter que l'un d'eux à l'index permet de produire un commit propre sur un seul sujet, l'autre modification restant à traiter ensuite — c'est la base du commit atomique.

Transition : les commandes qui matérialisent ce schéma.
-->

---

# Commandes Git (1/2) : démarrer et enregistrer

```bash
git init                      # crée un dépôt dans le dossier courant
git clone <url>               # copie un dépôt distant (historique inclus)
git status                    # fichiers modifiés, préparés ou non suivis
git diff                      # changements pas encore ajoutés à l'index
git add README.md             # prépare un fichier pour le prochain commit
git commit -m "docs: ajoute un README"   # enregistre un instantané
git log --oneline             # historique résumé, un commit par ligne
```

<v-clicks>

- `status` est le **réflexe** : avant `add`, avant `commit`, en cas de doute
- `diff` relit ce qui va être enregistré ; `add` choisit ce qui y entre
- Un message de commit décrit **le pourquoi** du changement

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 4 min (dont ~2 min de démonstration enseignant).

Démonstration sur un dépôt d'exemple jetable, distinct des TP : `git init` dans un dossier vide, créer un fichier, `git status` (fichier non suivi), `git add`, `git status` (fichier préparé), `git commit`, `git log --oneline`, modifier le fichier puis `git diff`. `git clone` est présenté mais exécuté seulement si un dépôt public d'exemple est disponible.

Les chevrons `<url>` sont un paramètre à remplacer ; ne pas coller de jeton d'accès dans une URL.

Exemple concret : `git status` avant chaque commit évite d'embarquer par mégarde un fichier généré ou un fichier de configuration local.

Transition : travailler avec des branches et un dépôt distant.
-->

---

# Commandes Git (2/2) : brancher et partager

```bash
git switch -c feature/page-accueil   # crée une branche et s'y place
git switch main                      # revient sur la branche main
git branch                           # liste les branches locales
git remote add origin <url>          # déclare un dépôt distant nommé origin
git remote -v                        # affiche les dépôts distants connus
git push -u origin feature/page-accueil   # envoie la branche et mémorise le suivi
git pull                             # récupère et intègre les changements distants
```

<v-clicks>

- Une **branche** isole un travail sans toucher à `main`
- `origin` n'est qu'un **nom par convention** pour le dépôt distant principal
- `pull` avant de reprendre le travail, `push` quand un lot de commits est prêt

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.68em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 4 min (dont ~2 min de démonstration enseignant).

Exemples volontairement génériques (nom de branche, nom du dépôt) et sans lien avec les TP. `switch -c` crée et sélectionne une branche ; `remote add` relie le dépôt local à un dépôt distant dont l'URL vient de la plateforme ; `push -u` envoie la branche et mémorise sa correspondance distante, ce qui permet ensuite un simple `git push`.

Sécurité : l'authentification (jeton personnel ou clé SSH) se configure en dehors de la commande ; ne jamais coller un jeton dans l'URL ni dans un message partagé. Un dépôt public expose son historique à tous.

Exemple concret : deux personnes travaillent chacune sur leur branche, publient avec `push`, puis une PR/MR propose la fusion sur `main`.

Transition : voir comment une branche arrive sur main dans un travail d'équipe.
-->

---

# Du commit à la fusion : le cycle d'une branche

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[main] --> B[Branche feature]
  B --> C[Commits successifs]
  C --> D[Merge / Pull Request]
  D --> A
```

<v-clicks>

- **Dépôt** — historique complet du projet
- **Commit** — un instantané logique et atomique du code
- **Branche** — une ligne de travail isolée, fusionnée ensuite

</v-clicks>

<!--
Durée : 2 min (dont ~1 min de démonstration live).

Insister sur "atomique" : un commit doit correspondre à un changement logique cohérent, pas à un mélange de plusieurs sujets non liés.

Exemple concret : un commit "fix typo + ajoute feature X + change la config CI" est un anti-pattern — trois commits séparés seraient plus lisibles et plus faciles à annuler individuellement si besoin.

Démonstration live : créer une branche, faire deux commits atomiques distincts sur un dépôt d'exemple, puis lancer `git log --oneline --graph` devant la salle pour montrer un historique lisible. Pointer chaque commit et faire deviner son objet avant de l'ouvrir.

Transition : détailler le flux de pull/merge request et la revue de code.
-->

---

# Pull Request / Merge Request et revue

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Branche feature] -->|Push| B[PR/MR ouverte]
  B --> C[Revue de code]
  C -->|Approuvée| D[Merge sur main]
  C -->|Changements demandés| A
```

<v-clicks>

- La **revue** vérifie objectif, tests, lisibilité et sécurité
- Le style (espaces, formatage) relève d'un outil automatique, pas de la revue humaine
- Une **petite PR/MR** se relit mieux qu'une PR/MR massive

</v-clicks>

<!--
Durée : 3 min.

La revue de code est un filet technique ET un transfert de connaissance dans l'équipe, pas du flicage.

Exemple concret : une PR de plus de 500 lignes modifiées voit son taux de détection de bugs chuter fortement en revue — découper le travail est une compétence à part entière.

Point d'échange : demander si quelqu'un a déjà reçu une demande de changement en revue qu'il jugeait injustifiée, et comment il l'a gérée — ouvre sur la posture professionnelle attendue en équipe.

Transition : détailler commits atomiques et SemVer.
-->

---

# Commits atomiques et historique lisible

**Conventional Commits** : `type(scope optionnel): description`

```text
feat: add health-check endpoint
fix: handle missing environment variable
docs: update README with run instructions
```

<v-clicks>

- `feat` fonctionnalité, `fix` correction, `docs` documentation → historique navigable
- Un commit = **un changement logique**, un message clair
- [Spécification Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- Historique lisible = diagnostic plus rapide en cas d'incident

</v-clicks>

<!--
Durée : 2 min (dont ~1 min d'exercice écrit).

Cette convention n'est pas imposée par Git ; elle facilite la lecture de l'historique et l'usage d'outils de release, sans déclencher à elle seule un versionnement automatique.

Exemple concret : un `git log` lisible permet de répondre en 30 secondes à "qui a changé ce fichier et pourquoi", contre plusieurs minutes sur un historique de commits vagues ("update", "fix", "wip").

Exercice écrit rapide : donner 3 changements en une phrase (ex. "corrige le crash au démarrage", "ajoute le endpoint /health", "met à jour la doc d'installation") et demander à chacun d'écrire le message de commit correspondant avec le bon préfixe — corriger collectivement.

Transition : introduire SemVer pour le versionnage des livrables.
-->

---

# SemVer — versionnage sémantique

```bash
v1.4.2
│ │ └── PATCH — correction rétrocompatible
│ └──── MINOR — fonctionnalité rétrocompatible
└────── MAJOR — changement incompatible
```

<v-clicks>

- Communique clairement l'impact d'une nouvelle version
- Un changement **incompatible** force un incrément **MAJOR**
- Référence : semver.org

</v-clicks>

<!--
Durée : 1 min.

Poser la question à la salle : "renommer un endpoint d'API, c'est quel type de changement ?" — réponse attendue : MAJOR (breaking change).

Exemple concret : un client qui consomme une API et valide strictement le format de réponse verra son intégration casser si un champ obligatoire est ajouté sans bump MAJOR — impact direct sur la confiance du versionnage.

Si le temps le permet, un cas supplémentaire (ajouter un champ optionnel : MINOR) consolide MAJOR/MINOR/PATCH.

Transition : passer de Git à une autre forme de code versionné — celui qui décrit l'infrastructure elle-même.
-->

---

# Infrastructure as Code : le problème

<Comparison left="Infra manuelle" right="Infra as Code" leftColor="orange" rightColor="green">
  <template #left>

  - Créée à la main (console, SSH) — pas de trace écrite
  - Dérive silencieuse entre environnements (dev ≠ prod)
  - Aucune revue avant changement, dépendance à une personne

  </template>
  <template #right>

  - Décrite dans des fichiers versionnés avec Git
  - Relue comme du code (pull/merge request)
  - Reproductible : recréer l'environnement à l'identique

  </template>
</Comparison>

<!--
Durée : 2 min.

Verbaliser le problème avant la solution : sans trace écrite, la configuration réelle d'un serveur finit par ne vivre que dans la tête d'une seule personne — le jour où elle est absente ou part, plus personne ne sait reproduire l'environnement.

Exemple concret : deux serveurs censés être identiques (dev et prod) qui divergent après plusieurs interventions manuelles étalées sur plusieurs mois — un bug n'apparaît qu'en production parce qu'un paquet a été mis à jour à la main sur un seul des deux.

Transition : voir comment l'Infrastructure as Code répond à ce problème avec quatre principes simples.
-->

---

# Déclaratif, plan, apply, idempotence

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Code déclaratif<br/>état voulu] --> B[Plan<br/>prévoir les changements]
  B --> C[Apply<br/>appliquer réellement]
  C --> D[Infra réelle]
  D -.->|Ré-exécution| B
```

<KeyConcept title="Le state, un fichier sensible" icon="🗄️">
Terraform garde la correspondance entre le code et l'infra réelle dans un fichier d'état (**state**). Il peut contenir des informations sensibles : à protéger et à partager prudemment, jamais commité tel quel dans un dépôt public — un sujet approfondi hors de ce module.
</KeyConcept>

<v-clicks>

- **Déclaratif** — on décrit l'état voulu, pas les étapes pour y arriver
- **Plan** — prévisualiser les changements avant de les appliquer
- **Apply** — exécuter le changement réel sur l'infrastructure
- **Idempotence** — ré-exécuter le même code ne crée pas de dérive

</v-clicks>

<!--
Durée : 2 min.

Verbaliser la boucle : on décrit ce qu'on veut (déclaratif), l'outil calcule ce qui doit changer (plan) sans encore rien toucher, puis applique réellement le changement (apply) ; ré-exécuter le même code sur une infra déjà conforme ne doit rien changer (idempotence).

Exemple concret : demander « 3 machines virtuelles » ; si une existe déjà, le plan ne recrée que les deux manquantes — pas les trois, contrairement à un script impératif qui rejouerait bêtement toutes les étapes depuis le début.

Transition : voir maintenant qui propose ce genre d'outil, à commencer par Terraform.
-->

---

# Terraform et son écosystème

| Terrain | Terraform et alternatives | Exemple couvert |
|---|---|---|
| Provisioning cloud public | **Terraform** (multi-cloud), OpenTofu, Pulumi, CloudFormation/Bicep | Réseaux, VM, stockage (AWS/Azure/GCP) |
| Provisioning hors cloud | **Terraform** (via providers dédiés) | VMware, matériel on-premise |
| Configuration de serveurs | Ansible (hors Terraform) | Installer un paquet, éditer un fichier de config |

<Tip type="info">
Terraform et ses alternatives <strong>provisionnent</strong> des ressources (créer une VM, un réseau) ; un outil comme Ansible <strong>configure</strong> ensuite ce qui tourne dessus (installer, paramétrer). Les deux rôles sont complémentaires, pas concurrents.
</Tip>

<!--
Durée : 2 min.

Terraform reste l'outil dominant et multi-cloud : un seul langage pour AWS, Azure, GCP et bien d'autres providers, y compris VMware pour du hors-cloud. Les alternatives sont positionnées sans être détaillées : OpenTofu est un fork open source né après un changement de licence de Terraform ; Pulumi permet d'écrire l'infra dans un langage de programmation classique (Python, TypeScript) plutôt qu'un langage déclaratif dédié ; CloudFormation (AWS) et Bicep (Azure) sont les équivalents propriétaires liés à un seul fournisseur.

Exemple concret : une entreprise avec des serveurs VMware en interne ET des ressources AWS peut utiliser Terraform pour les deux, avec un provider différent pour chaque cible — un seul outil, deux terrains.

Transition : voir le cycle Terraform en pratique, sans compte cloud, avec une ressource locale.
-->

---

# Terraform — un premier fichier, sans cloud

```hcl
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "local_file" "bienvenue" {
  filename = "${path.module}/bienvenue.txt"
  content  = "Infrastructure décrite en code\n"
}
```

<v-clicks>

- Fichier `main.tf` dans un dossier vide
- Le provider `local` crée un fichier sur le poste : aucun compte cloud, aucun coût
- Une **ressource** = un type (`local_file`) + un nom (`bienvenue`) + des arguments

</v-clicks>

<!--
Durée : 2 min.

Objectif : montrer la structure d'un projet Terraform avec une ressource sans risque. `local_file` est l'équivalent pédagogique d'une VM ou d'un bucket : même cycle, aucun impact hors du dossier de travail.

Exemple concret : remplacer mentalement `local_file` par `aws_s3_bucket` ou `azurerm_resource_group` — seul le provider change, la démarche (décrire, planifier, appliquer) reste identique.

Point d'attention : `terraform init` télécharge le provider depuis le registre public, donc nécessite un accès réseau ; prévoir un plan B (projecteur seul) si le réseau de la salle bloque. Ne rien exécuter qui touche un vrai cloud.

Démonstration enseignant uniquement sur la slide suivante ; les étudiants qui ont Terraform installé peuvent reproduire en autonomie, les autres suivent à l'écran.

Transition : parcourir les commandes qui font vivre ce fichier.
-->

---

# Terraform — le cycle de commandes

```bash
terraform fmt              # formate le code
terraform init             # télécharge le provider, crée .terraform/
terraform validate         # vérifie la syntaxe et la cohérence
terraform plan -out=tfplan # calcule les changements, les enregistre
terraform apply tfplan     # applique exactement le plan relu
terraform destroy          # supprime ce que Terraform a créé
```

<v-clicks>

- **`plan`** : relire les lignes `+` (créé), `~` (modifié), `-` (détruit) **avant** d'appliquer
- **`apply tfplan`** applique le plan enregistré, pas un nouveau calcul
- `destroy` affiche aussi un plan : le relire et confirmer à la main

</v-clicks>

<Tip type="warning">
N'utilisez pas <code>-auto-approve</code> en apprentissage : il supprime la relecture, c'est-à-dire le garde-fou principal de Terraform.
</Tip>

<style scoped>
.slidev-code { font-size: 0.8em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 3 min (dont ~2 min de démonstration enseignant, abrégée).

Dérouler dans l'ordre : `fmt` (style), `init` (prépare le dossier), `validate` (erreurs de syntaxe sans toucher à rien), `plan -out=tfplan` (le "diff" de l'infrastructure), `apply tfplan` (exécute ce plan précis, donc ce qui a été relu), `destroy` (nettoyage).

Démonstration enseignant : lancer la séquence dans un dossier vide contenant le `main.tf` précédent. Après `plan`, lire à voix haute la ligne `+ resource "local_file" "bienvenue"` et le résumé « 1 to add ». Après `apply`, afficher `bienvenue.txt`. Relancer `plan` : « No changes » — c'est l'idempotence vue plus tôt. Modifier `content`, relancer `plan` : la ressource est remplacée (`-/+`). Terminer par `destroy` et constater que le fichier disparaît.

Mise en garde `-auto-approve` : à ne pas montrer ni conseiller ici ; en production un plan non relu peut détruire une base de données. Si un étudiant le connaît, expliquer qu'il est réservé à des pipelines avec des garde-fous explicites.

Transition : que doit-on versionner dans Git et que doit-on laisser de côté ?
-->

---

# Terraform — que versionner dans Git ?

| Fichier / dossier | Git ? | Pourquoi |
|---|---|---|
| `*.tf` | ✅ Oui | La description de l'infrastructure |
| `.terraform.lock.hcl` | ✅ Oui | Fige les versions de providers utilisées |
| `.terraform/` | ❌ Non | Cache téléchargé, regénéré par `init` |
| `*.tfstate`, `*.tfstate.*` | ❌ Non | Peut contenir des données sensibles |
| `tfplan` | ❌ Non | Plan local, peut contenir des valeurs sensibles |

<!--
Durée : 1 min.

Rappel du lien avec la slide précédente sur le fichier d'état (state) : il sert de mémoire à Terraform mais peut contenir des secrets en clair, donc jamais dans Git. En équipe, on le stocke dans un backend distant protégé — hors périmètre du module.

Exemple concret : deux étudiants qui clonent le dépôt obtiennent les mêmes versions de provider grâce au fichier `.terraform.lock.hcl` commité ; sans lui, chacun pourrait télécharger une version différente.

Vérification rapide : demander de proposer les lignes du `.gitignore` Terraform (`.terraform/`, `*.tfstate`, `*.tfstate.*`, `tfplan`) avant de les afficher.

Transition : GitOps, qui prolonge l'idée de décrire et versionner l'état voulu.
-->

---

# GitOps : Git comme source de vérité de l'état désiré

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  E["Équipe"] -->|"PR/MR relue puis fusionnée"| A["Dépôt Git<br/>état désiré versionné"]
  B["Agent GitOps"] -->|"lit l'état désiré"| A
  B -->|"observe l'état réel"| C["Environnement<br/>état réel"]
  B ==>|"réconcilie : corrige l'écart"| C
```

<v-clicks>

- L'**état désiré** (ce qui doit tourner) est décrit dans Git, relu et historisé comme du code
- Un **agent** compare en continu l'état **réel** à l'état **désiré**
- Un écart (**drift**), par exemple une modification manuelle, est détecté puis réconcilié ou signalé

</v-clicks>

<!--
Durée : 2 min.

GitOps étend l'idée d'Infrastructure as Code : l'état voulu du système vit dans Git, et c'est un agent qui travaille à faire coïncider l'environnement avec cet état. La boucle compare-réconcilie rappelle celle des orchestrateurs vue en séance 1. Un drift est un écart entre ce qui est décrit et ce qui existe réellement ; selon la configuration, l'agent le corrige automatiquement ou le signale.

Exemple concret : quelqu'un modifie à la main le nombre de réplicas d'un service ; l'agent constate que l'état réel diffère de l'état décrit dans Git et le ramène à la valeur versionnée, ou lève une alerte.

Transition : situer GitOps par rapport à l'IaC vue juste avant.
-->

---

# IaC et GitOps : deux approches complémentaires

| | Infrastructure as Code (ex. Terraform) | GitOps |
|---|---|---|
| Idée | Décrire l'infrastructure en fichiers | Faire de Git la source de vérité de l'état désiré |
| Qui applique ? | Une personne ou un pipeline lance `plan` / `apply` | Un agent compare et réconcilie en continu |
| Détection du drift | À la prochaine exécution du plan | Fait partie du fonctionnement de l'agent |
| Outils typiques | Terraform, OpenTofu, Pulumi | Argo CD, Flux (concept, sans démonstration) |

<Tip type="warning">
Un <code>git push</code> ne signifie pas que l'infrastructure est déjà déployée : l'agent doit détecter le changement, les contrôles doivent passer et l'application peut échouer. Revenir à un état Git précédent est possible, mais n'annule pas forcément les effets déjà produits (données, migrations).
</Tip>

<!--
Durée : 2 min.

Les deux approches se combinent : l'IaC décrit des ressources, le GitOps fournit le mode de livraison (changement par PR/MR, application par un agent, détection de dérive). Argo CD et Flux sont cités comme exemples d'agents, notamment dans Kubernetes : aucune installation ni démonstration ici, seulement le principe.

Nuances à verbaliser : un dépôt à jour ne prouve pas que l'environnement l'est — il faut observer le statut de réconciliation. Le « retour arrière » consiste à ramener l'état désiré à une version antérieure, ce qui n'efface pas les données écrites ni ne défait certaines migrations.

Exemple concret : fusionner une PR qui change la version d'une image déclenche, quelques instants plus tard, la mise à jour par l'agent ; si l'image est introuvable, le dépôt est correct mais l'environnement reste sur l'ancienne version.

Transition : retour à la conteneurisation, avec les fondamentaux Docker.
-->

---

# VM versus conteneur

<Comparison left="Machine virtuelle" right="Conteneur" leftColor="orange" rightColor="green">
  <template #left>

  - OS complet par VM
  - Démarrage en minutes
  - Isolation forte, via hyperviseur
  - Empreinte en gigaoctets

  </template>
  <template #right>

  - Partage le noyau de la machine hôte
  - Démarrage en secondes
  - Isolation par espaces de noms (namespaces)
  - Empreinte en mégaoctets

  </template>
</Comparison>

<!--
Durée : 3 min (dont ~1 min de discussion comparée).

Le point à faire comprendre : un conteneur n'embarque pas un système d'exploitation complet, il partage le noyau de la machine hôte — c'est ce qui explique sa légèreté.

Exemple concret : le fameux "ça marche sur ma machine" des années 2000-2010, quand chaque développeur avait un environnement légèrement différent — la conteneurisation résout ce problème en figeant l'environnement d'exécution.

Discussion comparée : reprendre chaque ligne du tableau une par une et demander à la salle d'expliquer, dans ses propres mots, pourquoi le conteneur gagne sur ce critère (démarrage, empreinte, isolation) — transforme la lecture passive du tableau en vérification active de compréhension avant de plonger dans Docker.

Transition : introduire l'architecture Docker (image, couche, registre, conteneur).
-->

---

# Architecture Docker

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Client Docker] -->|Commandes| B[Démon Docker]
  B -->|Récupère| C[Registre d'images]
  B -->|Crée| D[Conteneur]
```

<v-clicks>

- **Image** — modèle figé, en lecture seule
- **Couche (layer)** — chaque instruction du Dockerfile ajoute une couche, mise en cache
- **Registre** — stockage distant des images (Docker Hub, GitHub Container Registry...)
- **Conteneur** — instance vivante, exécutée à partir d'une image

</v-clicks>

<!--
Durée : 3 min (dont ~1 min de manipulation guidée).

Analogie utile : image = classe en programmation orientée objet, conteneur = instance de cette classe. Une image ne change pas, un conteneur a un état d'exécution propre.

Exemple concret : dix conteneurs peuvent démarrer depuis la même image, chacun avec ses propres logs et son propre état mémoire, sans interférer entre eux.

Manipulation guidée courte : `docker version` pour repérer client et démon, puis `docker run hello-world` pour observer la récupération d'image et la création du conteneur ; `docker info` reste optionnel.

Transition : écrire un premier Dockerfile.
-->

---

# Anatomie d'un Dockerfile

```dockerfile {all|1|3|5-6|8-9|11|all}
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000

CMD ["node", "server.js"]
```

<!--
Durée : 3 min (démonstration live resserrée).

Dérouler chaque instruction : image de base, répertoire de travail, copie ciblée des fichiers de dépendances avant le reste du code (pour préserver le cache), exposition documentaire du port, commande de démarrage.

Exemple concret : si le code applicatif change mais pas `package.json`, l'étape `npm ci` n'est pas rejouée — gain de temps de build significatif sur un projet qui grossit.

Démonstration live resserrée : écrire ce Dockerfile ligne par ligne devant la salle sur une petite application Node d'exemple, en commentant chaque choix ; lancer `docker build` et montrer les couches se construire une par une dans le terminal ; lancer `docker run` avec la publication du port, puis vérifier l'endpoint exposé avec `curl localhost:3000` ou dans le navigateur ; enfin modifier une ligne du code applicatif et relancer un build pour observer le cache en action sur les couches inchangées.

Transition : récapituler les commandes qui accompagnent ce Dockerfile au quotidien.
-->

---

# Docker — le cycle de commandes

```bash
docker build -t demo-app:1.0 .                       # construit l'image
docker run -d --name demo -p 9090:80 demo-app:1.0   # lance un conteneur
docker ps                                           # conteneurs actifs
docker logs -f demo                                  # suit les logs (Ctrl+C)
docker exec -it demo sh                              # shell dans le conteneur
docker stop demo && docker rm demo                    # arrête puis supprime
docker images                                       # images locales
```

<v-clicks>

- **Image** : `build`, `images` — **conteneur** : `run`, `ps`, `logs`, `exec`, `stop`, `rm`
- `-p 9090:80` : port de l'**hôte** : port du **conteneur**
- `stop` n'efface pas le conteneur : `rm` est nécessaire pour libérer le nom

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.68em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 3 min.

Regrouper en deux familles pour la mémorisation : commandes sur l'image, commandes sur le conteneur. Distinguer `docker ps` (actifs) de `docker ps -a` (tous, y compris arrêtés).

Exemple concret : lancer deux fois `docker run --name demo` provoque une erreur de nom déjà utilisé — d'où `stop` puis `rm`, ou l'option `--rm` pour les essais jetables.

Les noms d'image et de conteneur ainsi que le port publié sont purement illustratifs : rien n'est imposé.

Rappel de sécurité : ne jamais passer de secret en clair dans une commande partagée  ; les TP publient sur un dépôt public.

Transition : pause de 20 minutes, puis bonnes pratiques Docker.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Répondre aux questions individuelles sur Git ou Docker pendant la pause.

Transition au retour : construire de bonnes images (principes, cache, .dockerignore, utilisateur non privilégié, multi-stage).
-->

---

# Construire une image : principes généraux

<div class="grid grid-cols-4 gap-3 mt-2 text-sm">
  <div class="card"><div class="font-bold text-accent mb-1">🌐 API</div>Runtime + dépendances de production + code, port d'écoute</div>
  <div class="card"><div class="font-bold text-accent mb-1">⚙️ Worker</div>Même base qu'une API, mais sans port : il consomme des tâches</div>
  <div class="card"><div class="font-bold text-accent mb-1">⌨️ CLI</div>Un exécutable et son point d'entrée, lancé à la demande</div>
  <div class="card"><div class="font-bold text-accent mb-1">🖼️ Front statique</div>Fichiers construits + un serveur web pour les servir</div>
</div>

<v-clicks>

- **Reproductible** : version de l'image de base choisie (pas de `latest`), fichier de verrouillage des dépendances
- **Séparer** les dépendances, les outils de construction et les artefacts : l'image finale n'embarque que le nécessaire à l'exécution
- **Sans secret** dans l'image ; la configuration arrive à l'exécution
- Le **cache** de build est un confort de vitesse, secondaire par rapport à la reproductibilité

</v-clicks>

<!--
Durée : 3 min.

Le raisonnement est le même pour tout type d'application : que faut-il, et seulement quoi, pour EXÉCUTER ? Une API et un worker partagent les mêmes dépendances ; un worker n'écoute aucun port. Une CLI est un exécutable lancé ponctuellement. Un front construit est un ensemble de fichiers statiques à servir. Dans tous les cas, ce qui sert à construire (compilateur, gestionnaire de paquets, dépendances de développement) n'a pas à finir dans l'image d'exécution.

Reproductibilité : épingler la version de l'image de base et utiliser le fichier de verrouillage des dépendances donne le même résultat d'un jour à l'autre ; `latest` change sans prévenir.

Exemple concret : deux builds du même code à un mois d'intervalle produisent des images différentes si la base n'est pas épinglée, ce qui complique le diagnostic d'un incident.

Transition : le cache de build d'abord, puis `.dockerignore` et le multi-stage, qui formalise la séparation entre construction et exécution.
-->

---

# Ordonner les couches : un gain de vitesse

```dockerfile
# Moins optimal — tout invalidé au moindre changement de code
COPY . .
RUN npm ci

# Préférable — l'installation survit aux changements de code
COPY package*.json ./
RUN npm ci
COPY . .
```

<v-clicks>

- Les instructions **les moins susceptibles de changer** en premier
- Un changement de code ne doit pas invalider l'installation des dépendances
- Le cache accélère les rebuilds, mais **ne remplace pas** une construction reproductible

</v-clicks>

<!--
Durée : 3 min (comparaison à commenter rapidement ou à montrer en une seule exécution).

Chaque instruction crée une couche mise en cache tant que ses entrées ne changent pas ; dès qu'une couche est invalidée, toutes les suivantes sont reconstruites. Copier d'abord les fichiers de dépendances puis le code préserve donc le cache d'installation.

Exemple concret : un changement d'une ligne de code peut faire passer un rebuild de plusieurs minutes à quelques secondes, simplement grâce à cet ordre.

Comparaison chronométrée possible : même changement de code avec chacun des deux ordres, chronomètre à l'appui.

Transition : `.dockerignore` et utilisateur non privilégié.
-->

---

# `.dockerignore` et utilisateur non privilégié

```text
node_modules
.git
.env
dist
```

```dockerfile
# Éviter de tourner en root dans le conteneur
USER node
```

<v-clicks>

- `.dockerignore` évite de copier des fichiers inutiles ou sensibles dans l'image
- Un `.env` copié par erreur peut fuiter des secrets dans les couches de l'image
- `USER` bascule sur un compte non privilégié — réduit l'impact d'une éventuelle évasion de conteneur

</v-clicks>

<!--
Durée : 3 min (vérification pratique brève).

Deux bonnes pratiques de sécurité et de propreté à traiter ensemble : elles sont souvent oubliées par des débutants, avec un vrai coût en sécurité et en taille d'image.

Exemple concret : un `.env` copié dans l'image reste présent dans les couches même s'il est supprimé plus tard dans le Dockerfile — d'où l'importance de ne jamais le copier du tout.

Vérification pratique : construire l'image sans puis avec `.dockerignore`, comparer la taille avec `docker images`, puis, seulement si le Dockerfile de l'image contient bien `USER node`, lancer `docker exec <conteneur> whoami` : la valeur attendue est `node`.

Transition : le multi-stage build, qui sépare construction et exécution.
-->

---

# Multi-stage build : le principe

```dockerfile {all|1-4|6-9|all}
# Étape 1 : construction (outils nécessaires au build)
FROM <image-avec-outils> AS build
COPY . /src
RUN <commande-de-build>

# Étape 2 : exécution (image finale)
FROM <image-runtime>
COPY --from=build /src/<artefact> /app/<artefact>
CMD ["<commande-de-démarrage>"]
```

<v-clicks>

- Plusieurs `FROM` : chaque étape repart d'une **image de base** propre
- `COPY --from=build` ne récupère que des **artefacts** de l'étape précédente
- L'image finale est celle de la **dernière étape** : outils et sources de build n'y figurent pas, sauf si on les copie

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 3 min.

Les éléments entre chevrons sont des paramètres de l'exemple : image avec compilateur ou gestionnaire de paquets, commande de build, artefact produit, image d'exécution, commande de démarrage. Insister sur les deux notions clés : `FROM ... AS` nomme une étape, `COPY --from=` en extrait des fichiers.

L'intérêt est de séparer clairement construction et exécution : image finale plus simple à auditer, avec moins de paquets inutiles. Le gain de taille dépend du projet et se mesure avec `docker images` ; ne pas promettre un chiffre.

Un multi-stage n'a de sens que s'il y a un vrai build à isoler : ajouter une étape qui ne produit aucun artefact utile n'apporte rien.

Exemple concret : un projet compilé produit un binaire ou un dossier statique dans l'étape 1 ; l'étape 2 ne reçoit que ce résultat.

Transition : un exemple explicite avec un frontend.
-->

---

# Exemple : frontend construit avec Node, servi par Nginx

```dockerfile {all|1-6|8-9|all}
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.28-alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

<v-clicks>

- **Étape build** : Node installe les dépendances et produit les fichiers statiques
- **Étape finale** : Nginx sert ces fichiers ; Node et `node_modules` n'y figurent pas
- Le dossier de sortie (`dist` ici) et les versions sont **illustratifs** : ils dépendent du projet et de l'outil

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.4 !important; }
</style>

<!--
Durée : 3 min.

Exemple d'illustration d'un seul cas, pas un modèle à recopier : un frontend dont le build produit des fichiers statiques. Étape 1 : `npm ci` (reproductible grâce au fichier de verrouillage) puis `npm run build`. Étape 2 : Nginx repart d'une image propre et reçoit uniquement la sortie statique dans le dossier qu'il sert.

Dossier de sortie : il dépend de l'outil et de la version (par exemple `dist` pour un projet Vite, un sous-dossier propre au projet pour Angular) ; il se vérifie dans son propre projet après un build, jamais par supposition. Les numéros de version des images sont eux aussi des exemples à adapter.

Note SPA : une application à routes côté client peut renvoyer 404 au rechargement d'une route si le serveur ne redirige pas vers `index.html` ; on le mentionne sans le détailler.

Transition : un conteneur est jetable ; voir comment conserver des données avec les volumes.
-->

---

# Volumes : volume nommé ou bind mount ?

| | Volume nommé | Bind mount |
|---|---|---|
| Syntaxe | `-v db-data:/var/lib/postgresql/data` | `-v "$(pwd)/site:/usr/share/nginx/html:ro"` |
| Géré par | Docker | Votre dossier sur l'hôte |
| Usage typique | Données persistantes (base de données) | Code ou fichiers en développement |
| Portabilité | Bonne | Dépend de l'arborescence de l'hôte |

<Tip type="warning">
Le contenu d'un conteneur disparaît avec lui ; seul un volume (ou un bind mount) survit à <code>docker rm</code>.
</Tip>

<!--
Durée : 3 min (dont ~1 min de démonstration).

Message clé : le système de fichiers d'un conteneur est éphémère. Pour persister, on monte soit un volume géré par Docker (nommé), soit un dossier de l'hôte (bind mount).

Démonstration enseignant : `docker volume create demo-data`, lancer un conteneur `alpine` qui écrit un fichier dans le volume (`docker run --rm -v demo-data:/data alpine sh -c "echo bonjour > /data/note.txt"`), puis un second conteneur qui lit ce fichier (`docker run --rm -v demo-data:/data alpine cat /data/note.txt`) : la donnée survit à deux conteneurs supprimés. Nettoyer ensuite avec `docker volume rm demo-data`. Variante bind mount : monter un dossier local `site/` en lecture seule dans `nginx:alpine` et modifier la page sans reconstruire d'image.

Exemple concret : une base PostgreSQL sans volume perd toutes ses données au `docker rm` ; un bind mount est pratique pour le développement mais dépend du chemin de la machine, donc peu portable.

Transition : une application réunit plusieurs conteneurs — pourquoi et comment les décrire avec Compose.
-->

---

# Pourquoi plusieurs conteneurs ?

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  U["Navigateur"] --> F["Front<br/>pages statiques"]
  U --> A["API<br/>logique métier"]
  A --> D[("Base de données")]
```

<v-clicks>

- Une application réelle réunit plusieurs **services**, chacun avec sa responsabilité (front, API, base de données, cache...)
- Un conteneur = en général **un processus principal** : on en lance donc plusieurs
- À la main, il faut enchaîner des `docker run` avec réseau, ports, volumes et variables : **long et sujet aux erreurs**

</v-clicks>

<!--
Durée : 2 min.

Partir du besoin avant l'outil. Une application web classique est faite de plusieurs briques qui communiquent ; les isoler dans des conteneurs distincts permet de les mettre à jour, de les remplacer et de les superviser séparément. Mais lancer chacune à la main implique de créer un réseau, de retenir l'ordre de démarrage, les ports publiés, les volumes et les variables : chaque oubli devient un problème de reproductibilité.

Exemple concret : un nouveau collègue doit lancer quatre conteneurs avec une dizaine d'options chacun, copiées depuis un vieux message ; au moindre écart, rien ne fonctionne.

Transition : Compose décrit cet ensemble de façon déclarative.
-->

---

# Compose : décrire l'ensemble, de façon déclarative

<Comparison left="Commandes à la main" right="Fichier Compose" leftColor="orange" rightColor="green">
  <template #left>

  - Suite de `docker run` à rejouer dans le bon ordre
  - Réseau, ports et volumes à gérer soi-même
  - Connaissance dans la tête ou dans un vieux message

  </template>
  <template #right>

  - Un fichier **versionné** décrit services, réseau et volumes
  - Une commande démarre l'ensemble, une autre l'arrête
  - Même description pour toute l'équipe, relue comme du code

  </template>
</Comparison>

<v-clicks>

- On décrit l'**état souhaité** ; Compose crée ce qui manque (même idée que l'Infrastructure as Code)
- Compose cible **une seule machine** : développement, démonstration, petits environnements

</v-clicks>

<!--
Durée : 2 min.

Faire le lien avec l'Infrastructure as Code vue plus tôt : on déclare ce que l'on veut, l'outil se charge de l'obtenir. Compose ne remplace pas un orchestrateur multi-machines ; il simplifie la description et le lancement d'un ensemble de conteneurs sur une machine.

Exemple concret : le même fichier lance la pile à l'identique sur le poste de chaque membre de l'équipe.

Transition : lire un fichier Compose, d'abord à titre d'exemple pédagogique.
-->

---

# Lire un fichier Compose

`compose.yaml`

```yaml
name: demo

services:
  web:
    image: nginx:1.28-alpine
    ports:
      - "9090:80"
    depends_on:
      - whoami

  whoami:
    image: traefik/whoami:v1.11.0
```

<v-clicks>

- **`services`** : un bloc par conteneur ; **`image`** : l'image utilisée
- **`ports: "9090:80"`** : port de l'**hôte** 9090 → port **interne** 80 du conteneur
- `whoami` n'a **pas** de `ports:` : il n'est pas publié sur l'hôte
- `depends_on` règle l'**ordre de démarrage**, pas la disponibilité (≠ readiness)

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.3 !important; }
</style>

<!--
Durée : 3 min.

Exemple purement pédagogique, sans rapport avec une architecture front + API + base de données : un serveur web et un petit service de démonstration. `name: demo` fixe le nom du projet, donc le réseau par défaut s'appellera `demo_default`. `traefik/whoami` est un petit serveur HTTP open source qui répond avec le nom et l'adresse de son conteneur ; tag explicite, jamais `latest`. Les valeurs (nom de projet, ports, versions) sont illustratives.

Précision importante : `depends_on` simple garantit seulement que le conteneur démarre après l'autre, pas que le service à l'intérieur soit prêt à répondre ; pour attendre un service prêt, il faut un healthcheck et une condition dédiée, hors périmètre ici.

Exemple concret : une API qui démarre avant que sa base soit prête échoue à sa première connexion même avec `depends_on` ; il faut une logique de nouvelle tentative ou une condition de santé.

Transition : comment ces services se parlent, et comment le navigateur les atteint.
-->

---

# Réseau Compose : DNS interne, navigateur dehors

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  B["Navigateur<br/>sur l'hôte"] -->|"localhost:9090"| W
  subgraph N["Réseau Docker du projet"]
    W["web<br/>port interne 80"] -->|"http://whoami:80"| Q["whoami<br/>port interne 80"]
  end
```

<v-clicks>

- Compose crée un **réseau par défaut** et y attache tous les services
- Entre services, le **DNS interne** résout le **nom du service** vers l'IP de son conteneur
- Le **navigateur** est sur l'hôte, **hors** du réseau Docker : il n'utilise que les ports **publiés**
- Port **hôte** (9090) ≠ port **interne** (80) : entre conteneurs, on utilise le port interne

</v-clicks>

<Tip type="info">
Les volumes persistent des données ; ils ne servent pas à faire communiquer les services.
</Tip>

<!--
Durée : 3 min.

Lire le schéma : le navigateur se trouve sur la machine hôte et n'atteint que ce qui est publié (`localhost:9090`). À l'intérieur du réseau du projet, `web` joint `whoami` par son nom et par le port interne 80 ; aucun mapping de port n'est nécessaire entre conteneurs. Les adresses IP des conteneurs changent à chaque recréation, d'où l'usage du nom de service. Même idée que le nom DNS d'un Service Kubernetes, vu ensuite.

Conséquence à retenir : un service non publié n'est pas joignable depuis le navigateur ; un navigateur ne sait pas résoudre le nom d'un service interne ; et dans un conteneur, `localhost` désigne le conteneur lui-même, pas la machine hôte ni un autre service.

Exemple concret : depuis le conteneur `web`, `http://whoami` répond ; depuis le navigateur de l'hôte, `http://whoami` ne se résout pas.

Transition : les commandes Compose du quotidien.
-->

---

# Docker Compose — le cycle de commandes

```bash
docker compose up -d --build   # construit puis démarre en arrière-plan
docker compose ps              # état des services
docker compose logs -f web     # suit les logs d'un service
docker compose exec web sh     # shell dans un service en cours
docker compose down            # arrête et supprime conteneurs et réseau
docker compose down -v         # idem + SUPPRIME les volumes déclarés
```

<Tip type="warning">
<code>down -v</code> supprime aussi les volumes déclarés dans le fichier : à réserver aux environnements jetables.
</Tip>

<style scoped>
.slidev-code { font-size: 0.8em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 2 min.

Montrer le cycle complet : `up -d --build`, `ps`, `logs -f web` (Ctrl+C pour quitter), `exec web sh` pour entrer dans un service, puis `down`, qui supprime conteneurs et réseau.

Distinction à retenir : `down` supprime conteneurs et réseau mais conserve les volumes nommés ; `down -v` les efface aussi. Notre stack d'exemple n'en déclare aucun, mais le réflexe doit être pris.

Exemple concret : un `down -v` lancé par réflexe sur une stack de préproduction efface ses données ; on vérifie toujours l'option `-v` avant de valider.

Transition : prendre de la hauteur avec la CNCF et l'écosystème cloud-native.
-->

---

# La CNCF — fondation de l'écosystème cloud-native

<KeyConcept title="CNCF" icon="🏛️">
Fondation open source qui héberge des projets cloud-native, organise leur gouvernance et contribue à leur maintien dans la durée.
</KeyConcept>

<v-clicks>

- Héberge de nombreux projets : Kubernetes, Prometheus, OpenTelemetry, et d'autres
- Statuts de maturité : **sandbox**, **incubating**, **graduated**
- Ces statuts sont des **signaux de gouvernance**, pas des garanties absolues

</v-clicks>

<!--
Durée : 2 min (échange court possible sur un projet connu).

Point important à verbaliser clairement : la CNCF est présentée AVANT Kubernetes volontairement, pour éviter de réduire tout l'écosystème cloud-native à un seul outil. Kubernetes n'est qu'un projet hébergé parmi d'autres.

Exemple concret : un projet "graduated" a démontré une gouvernance mature et une large adoption, mais ce statut n'est ni une certification de sécurité ni une garantie d'adéquation à un besoin précis — toujours évaluer au cas par cas.

Échange avec la salle : demander si certains connaissent déjà l'un des projets cités (Kubernetes, Prometheus, OpenTelemetry) et faire décrire en une phrase à quoi il sert, sans entrer dans le détail technique — prépare le terrain pour l'introduction Kubernetes qui suit et pour l'observabilité vue en séance 4.

Transition : introduire Kubernetes comme l'un des projets hébergés par la CNCF.
-->

---

# Kubernetes — pourquoi un orchestrateur ?

<Tip type="info">
Docker crée et exécute les conteneurs ; Kubernetes organise leur déploiement, leur réplication et leur supervision à grande échelle.
</Tip>

<v-clicks>

- Docker gère **un conteneur** sur **une machine**
- Compose gère **plusieurs conteneurs** sur **une machine**
- Kubernetes gère **de nombreux conteneurs** répartis sur **plusieurs machines**

</v-clicks>

<!--
Durée : 2 min.

Progression pédagogique volontaire : Docker (1 machine) → Compose (1 machine, plusieurs services) → Kubernetes (plusieurs machines). Cette montée en échelle rend le "pourquoi" de Kubernetes évident.

Exemple concret de cas d'usage : une application avec plusieurs services qui doit rester disponible malgré une panne de machine, absorber un pic de trafic, ou se mettre à jour sans coupure — Kubernetes répond à ces besoins.

Transition : présenter le vocabulaire minimal de Kubernetes.
-->

---

# Vocabulaire minimal de Kubernetes

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph TB
  subgraph Cluster
    subgraph Node1[Machine 1]
      P1[Pod]
    end
    subgraph Node2[Machine 2]
      P2[Pod]
    end
  end
  S[Service] --> P1
  S --> P2
```

<!--
Durée : 1 min.

Lire le schéma de haut en bas : un cluster regroupe des machines (nodes) ; chaque node héberge des Pods ; le Service est le point d'entrée unique qui répartit les requêtes vers les Pods. Les Pods sont répartis sur deux machines : si l'une tombe, l'autre continue de répondre.

Aucun `kubectl` ni manifeste : on lit le schéma, rien de plus.

Transition : nommer précisément ces 5 termes dans le tableau qui suit.
-->

---

# Vocabulaire minimal de Kubernetes

| Terme | Sens simple |
|---|---|
| **Cluster** | Le parc de machines |
| **Node** | Une machine du parc |
| **Pod** | Le conteneur qui tourne (unité de base) |
| **Deployment** | La consigne de réplication et mise à jour |
| **Service** | La porte d'entrée stable vers l'application |

<!--
Durée : 1 min.

Se limiter strictement à ces 5 mots — c'est le vocabulaire visé par le module, pas plus. Aucune démonstration de `kubectl`, aucun manifeste YAML complexe à ce stade.

Exemple concret : pointer chaque terme sur le schéma en le nommant à voix haute, pour ancrer visuellement le vocabulaire plutôt que de réciter une définition académique.

Transition : voir comment Kubernetes sait si un Pod est vivant et prêt à servir — le lien direct avec la haute disponibilité de la séance 1.
-->

---

# Probes : liveness et readiness

<div class="grid grid-cols-2 gap-4">
<div>

<Tip type="info">
Deux questions distinctes : « le conteneur est-il encore sain ? » et « peut-il recevoir du trafic maintenant ? »
</Tip>

| Probe | Si elle échoue |
|---|---|
| **Liveness** | Le conteneur est **redémarré** |
| **Readiness** | Le Pod est **retiré du Service**, sans redémarrage |

</div>
<div>

```yaml
# À lire seulement — pas d'exécution
livenessProbe:
  httpGet: { path: /health, port: 3000 }
readinessProbe:
  httpGet: { path: /health, port: 3000 }
```

</div>
</div>

<v-clicks>

- Même idée que le **health check** d'un load balancer vu en séance 1
- Ne jamais mettre la disponibilité de la **base de données** dans la liveness : une panne DB redémarrerait toute l'application en boucle

</v-clicks>

<style scoped>
.slidev-code { font-size: 0.7em !important; line-height: 1.35 !important; }
</style>

<!--
Durée : 2 min (lire le tableau, ne pas détailler le YAML).

Message central : liveness = « redémarre-moi si je suis bloqué » ; readiness = « ne m'envoie pas de trafic tant que je ne suis pas prêt ». Un Pod qui démarre lentement, ou qui perd temporairement sa dépendance, doit être NotReady, pas redémarré.

Le YAML est un extrait à lire, pas à écrire : exemple générique avec un endpoint `/health` sur le port 3000, sans lien avec les TP. Dans la pratique, on règle aussi des délais et des seuils ; hors périmètre ici.

Lien HA de la séance 1 : c'est le même principe que le health check d'un load balancer, qui retire du trafic une instance malade.

Avertissement : une liveness qui interroge la base de données transformerait une panne DB en redémarrages en cascade de tous les Pods, ce qui aggrave l'incident. Pour la dépendance DB, la readiness est le bon outil, avec prudence.

Aucun cluster, aucun `kubectl` : introduction seulement.

Transition : voir comment le Service exploite cette notion de Pod prêt.
-->

---

# Services et haute disponibilité

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  C[Client] --> S["Service<br/>nom DNS + IP stables"]
  S --> P1["Pod A — Ready"]
  S --> P2["Pod B — Ready"]
  S -.->|exclu| P3["Pod C — NotReady"]
```

<v-clicks>

- Le **Service** reste stable pendant que les Pods changent
- Seuls les Pods **Ready** reçoivent du trafic
- Disponibilité : **au moins 2 réplicas**, idéalement sur **2 nodes**
- Service ≠ load balancer cloud externe

</v-clicks>

<!--
Durée : 2 min.

Lire le schéma : le client s'adresse toujours au Service (nom DNS et IP stables), jamais à un Pod, dont l'adresse change. Le Pod C NotReady est exclu tant que sa readiness échoue.

HA : avec un seul réplica ou un seul node, une panne coupe le service. Avec au moins 2 réplicas répartis sur 2 nodes, le Service continue vers le Pod restant. Un nouveau Pod remplaçant n'est servi qu'après sa readiness, donc sans envoyer de requêtes à un Pod pas prêt.

Nuance : un Service interne au cluster n'est pas un load balancer cloud externe ; l'exposition vers Internet relève d'autres objets ou du fournisseur cloud, hors périmètre de cette introduction.

Liens : health check/load balancer de la séance 1 ; et le nom DNS de service Compose (`web`, `whoami`) vu plus tôt joue un rôle comparable, à l'échelle d'une seule machine.

Aucun cluster, aucun TP.

Transition : conclure sur les limites de cette introduction et faire la synthèse de séance.
-->

---
layout: recap
section: Séance 2 — DevOps, Git, IaC et GitOps (1/3)
---

# Ce qu'il faut retenir — DevOps, Git, IaC, GitOps

- **DevOps** : vitesse ET fiabilité, métiers qui collaborent, responsabilité partagée
- **Git** : historique distribué, local puis distant ; Git ≠ GitHub ; cycle de base : consulter, indexer, valider, partager, récupérer
- **Collaboration** : branches, PR/MR, commits atomiques, SemVer
- **IaC** : déclaratif, plan, apply, idempotence
- **GitOps** : état désiré dans Git, agent qui réconcilie

<!--
Durée : 1 min.

Premier recap : culture, Git et automatisation de l'infrastructure. DevOps répond à un besoin de vitesse ET de fiabilité ; les métiers évoluent vers la collaboration et l'automatisation sans disparaître. Git : historique distribué, travail local puis partage ; ne pas confondre l'outil et la plateforme. Commandes de base à citer à l'oral : `status`, `add`, `commit`, `push`, `pull`. Terraform : état et `.terraform/` jamais versionnés. GitOps : l'état désiré est dans Git, un agent compare et réconcilie, un push ne vaut pas déploiement réussi.

Transition : recap Docker et Compose.
-->

---
layout: recap
section: Séance 2 — Docker, images et Compose (2/3)
---

# Ce qu'il faut retenir — Docker, images, Compose

- **Docker** : image, couche, registre, conteneur ; cycle de vie : construire, lancer, observer, entrer, arrêter
- **Images** : reproductibles, sans secret ; outils de build séparés des artefacts (multi-stage)
- **Volumes** : volume nommé (données) vs bind mount (développement)
- **Compose** : plusieurs services dans un fichier ; DNS par nom de service ; port hôte ≠ port interne ; ordre de démarrage ≠ service prêt

<!--
Durée : 1 min.

Docker : image, couche, registre, conteneur ; cycle `build`/`run`/`ps`/`logs`/`exec`/`stop`/`rm`. Images : principes valables pour une API, un worker, une CLI ou un front ; le multi-stage (`FROM`, `COPY --from`) sépare construction et exécution, l'exemple Node vers Nginx illustre un frontend statique. Volumes : persistance des données. Compose : description déclarative de plusieurs conteneurs, réseau et DNS internes, navigateur hors réseau Docker, `depends_on` limité à l'ordre de démarrage, `down -v` supprime les volumes.

Transition : recap cloud-native et Kubernetes.
-->

---
layout: recap
section: Séance 2 — Cloud-native, Kubernetes (3/3)
---

# Ce qu'il faut retenir — Cloud-native, Kubernetes

- **CNCF** : gouvernance, statuts de maturité, sans garantie absolue
- **Kubernetes** : cluster, node, pod, deployment, service
- **Liveness** : redémarre ; **readiness** : retire du Service

<!--
Durée : 1 min.

Rappeler les limites du module sur Kubernetes : pas d'installation de cluster, pas de manifeste complexe, pas de TP évalué dessus ; uniquement du vocabulaire et les idées de haute disponibilité (probes, Service). Les statuts CNCF sont des signaux de gouvernance, pas des garanties.

Transition : place aux deux TP de la séance, dont les énoncés suivent.
-->

---

# TP Docker — votre image multi-stage

<div class="grid grid-cols-4 gap-3 mt-2">
  <div class="card">
    <div class="text-2xl mb-1">1️⃣ 🧱</div>
    <div class="font-bold text-accent mb-1">Créer</div>
    <div class="text-sm">Une application web simple, dont le build produit des fichiers statiques</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">2️⃣ 🐳</div>
    <div class="font-bold text-accent mb-1">Construire</div>
    <div class="text-sm">Une image <strong>multi-stage</strong> : une étape construit, l'étape finale sert les artefacts</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">3️⃣ 🔍</div>
    <div class="font-bold text-accent mb-1">Tester</div>
    <div class="text-sm">Démarrer un conteneur depuis votre image et constater que l'application répond</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">4️⃣ 📤</div>
    <div class="font-bold text-accent mb-1">Versionner</div>
    <div class="text-sm">Sources, Dockerfile et README sur un dépôt GitHub <strong>public</strong></div>
  </div>
</div>

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="card-accent text-sm">🎨 <strong>Vous choisissez</strong> : framework (Angular, React, Vue ou autre), structure des dossiers, noms, images, ports</div>
  <div class="card-accent text-sm">🔒 <strong>Garde-fous</strong> : aucun secret, ni <code>node_modules</code>, ni donnée personnelle versionnés</div>
</div>

<!--
Durée : 2 min.

Énoncé volontairement ouvert : l'objectif est de produire une image multi-stage dont l'étape finale sert des artefacts frontend réellement construits (un vrai build, pas une étape décorative). Aucun nom de dossier, d'image, de conteneur ni de port n'est imposé. Le test consiste à lancer un conteneur depuis son image et à vérifier que l'application répond, dans le navigateur ou avec un client HTTP. Le dépôt GitHub public contient les sources, le Dockerfile et un README qui explique comment construire, lancer et vérifier.

Sécurité : le dépôt est public ; aucun secret, aucun `node_modules`, aucune donnée personnelle ne doit être versionné ; vérifier aussi l'adresse email configurée dans Git. Un secret poussé est à considérer comme compromis.

Les attendus de remise sont détaillés juste avant le QCM. Ne fournir aucune solution : les étudiants s'appuient sur les slides de cours et leur documentation.

Transition : un rappel sur quelques exemples de commandes d'initialisation d'un frontend.
-->

---

# Exemples : initialiser un frontend

| Framework | npm | bun |
|---|---|---|
| **Angular** | `npm create @angular@latest mon-front` | `bunx @angular/cli new mon-front --package-manager bun` |
| **React** | `npm create vite@latest mon-front -- --template react` | `bun create vite mon-front --template react` |
| **Vue** | `npm create vue@latest mon-front` | `bun create vue mon-front` |

<v-clicks>

- `mon-front` est un **nom purement illustratif** : choisissez le vôtre
- **Angular** : Node reste requis, même avec bun ; répondre **non** à SSR/SSG
- **React / Vue** : options facultatives → **non**

</v-clicks>

<style scoped>
table { font-size: 0.78em; }
</style>

<!--
Durée : 1 min.

Ces commandes ne sont que des exemples pour démarrer un projet frontend ; d'autres outils sont acceptés. Choisir UNE ligne (un framework) et UNE colonne (npm ou bun). Le nom du dossier est libre : `mon-front` n'est qu'un nom d'illustration.

Angular : même avec `bunx`, Angular CLI s'exécute sur Node, donc Node 22 LTS doit être installé. Aux questions SSR/SSG (rendu serveur / prérendu), répondre non : un site statique suffit à être servi. React / Vue : les assistants proposent des options facultatives (TypeScript, routeur, tests, lint, démarrage immédiat...) : répondre non ou prendre la valeur la plus simple. Aucun framework n'est plus « juste » qu'un autre.

Les commandes de génération sont celles documentées par les outils au moment de la rédaction ; les assistants évoluent, donc les questions posées peuvent légèrement varier. Vérifier avant la séance sur un poste de test.

Transition : l'énoncé du second TP.
-->

---

# TP Compose — front + API + base de données

<div class="grid grid-cols-4 gap-3 mt-2">
  <div class="card">
    <div class="text-2xl mb-1">1️⃣ 🧩</div>
    <div class="font-bold text-accent mb-1">Trois services</div>
    <div class="text-sm">Un front, une API backend, une base de données ; un <strong>Hello World</strong> suffit</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">2️⃣ 📄</div>
    <div class="font-bold text-accent mb-1">Un fichier Compose</div>
    <div class="text-sm">Il décrit l'ensemble et le démarre de façon reproductible</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">3️⃣ 🔗</div>
    <div class="font-bold text-accent mb-1">Communications</div>
    <div class="text-sm">Prouver que l'API atteint la base, et que le navigateur atteint un endpoint adapté de l'API</div>
  </div>
  <div class="card">
    <div class="text-2xl mb-1">4️⃣ 📝</div>
    <div class="font-bold text-accent mb-1">Documenter</div>
    <div class="text-sm">README : lancement, tests, preuves ; paramètres factices expliqués</div>
  </div>
</div>

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="card-accent text-sm">🗄️ <strong>Rôle de la base</strong> : illustratif (ex. conserver une valeur simple) — pas de CRUD complet, pas d'accès direct depuis le navigateur</div>
  <div class="card-accent text-sm">🎨 <strong>Libre</strong> : langages, frameworks, structure, noms, images, ports — <strong>GitHub public</strong>, sans secret réel</div>
</div>

<!--
Durée : 2 min.

Second TP, plus ambitieux dans l'architecture mais minimal dans la fonctionnalité : trois services qui communiquent. Un Hello World suffit : le front affiche un résultat obtenu auprès de l'API, l'API interroge la base (ou y écrit/lit une valeur simple). La base a un rôle illustratif (stockage ou persistance simple) : pas de CRUD complet, et le navigateur ne doit jamais accéder directement à la base.

À prouver : la communication entre services (API vers base) et celle du navigateur vers l'API par un endpoint approprié. Aucun nom de service, de port, de dossier, d'image ni de langage n'est imposé. Les paramètres de configuration (identifiants de base, par exemple) doivent être factices et documentés dans le README ; aucun secret réel n'est versionné.

Le fichier Compose, les sources et le README sont publiés sur un dépôt GitHub public. Le TP Docker précédent peut servir de base pour le front, sans obligation. Les attendus de remise suivent.

Ne pas fournir de solution ni de recette : les étudiants mobilisent la partie Compose du cours.

Transition : lancer la mise en pratique.
-->

---
layout: exercise
duration: 15 min
type: solo
---

# Mise en pratique — démarrez votre TP

<div class="grid grid-cols-3 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-1">🎯 1. Choisir</div>
    <div class="text-sm">Votre technologie, la structure du projet, et par quel TP vous commencez</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">🚀 2. Obtenir un premier résultat</div>
    <div class="text-sm">Une application qui répond, ou un premier essai de construction d'image</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">📌 3. Noter les blocages</div>
    <div class="text-sm">Ce qui coince : à résoudre ensuite, hors séance, ou à poser avant la fin</div>
  </div>
</div>

<div class="card-accent text-sm mt-4">⏭️ La suite se fait <strong>hors séance</strong> ; les deux TP sont à rendre <strong>avant la séance 3</strong>.</div>

<!--
Durée : 15 min.

Temps de démarrage encadré, pas d'objectif d'achèvement : le travail se finalise hors cours, ce qui est explicitement autorisé. Circuler, aider à débloquer l'environnement (Docker opérationnel, accès réseau, authentification GitHub), et renvoyer les étudiants à la documentation et aux slides plutôt qu'à une solution toute faite.

Si Docker ou les registres sont inaccessibles (réseau de la salle), poursuivre la conception et le code applicatif et reporter les builds à la maison. Si l'authentification GitHub bloque, versionner en local et publier plus tard : seule la remise avant la séance 3 compte.

Modalités individuelles ou en binôme à confirmer avec l'enseignant ; dans tous les cas, les auteurs doivent être identifiables dans le dépôt rendu.

Transition : rappel des attendus de remise.
-->

---

# Remise des TP — attendus avant la séance 3

<div class="grid grid-cols-2 gap-4 mt-2">
  <div class="card">
    <div class="font-bold text-accent mb-2">📦 À remettre</div>

- L'**URL de chaque dépôt GitHub public** (un ou plusieurs dépôts)
- Des travaux **identifiables** : TP Docker et TP Compose distincts
- Un **README** par TP : description, lancement, tests
- Les **preuves de fonctionnement** : captures ou sorties de commandes

</div>
</div>

<!--
Durée : 2 min.

Récapituler les attendus : les deux TP sont rendus AVANT la séance 3, pour correction. Un ou plusieurs dépôts GitHub publics au choix, à condition que le TP Docker et le TP Compose soient clairement identifiables. Chaque TP s'accompagne d'un README qui explique comment lancer, comment tester et ce qui prouve le fonctionnement (sorties de commandes, captures).

Pour le TP Docker : sources, Dockerfile multi-stage et README. Pour le TP Compose : fichier Compose, sources des services et README. Les preuves incluent la communication entre services demandée dans l'énoncé.

Sécurité : dépôt public, donc aucune donnée sensible ; les identifiants d'exemple sont factices et expliqués. Aucune image n'est à publier dans un registre et aucun déploiement cloud n'est demandé.

Le canal de remise des URL (plateforme, courriel...) est précisé par l'enseignant. En cas de difficulté, prévenir avant la date limite plutôt qu'après.

Transition : lancer le QCM de clôture de la séance 2.
-->

---
layout: qcm
duration: 20 min
questions: 30
cover: DevOps et métiers, Git, Infrastructure as Code et GitOps, Docker et images, Compose, CNCF et Kubernetes
---

# QCM de clôture — Séance 2

<!--
Durée : 20 min (lancement 2 min, jeu 15 min, débrief 3 min) pour 30 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 30 questions de la section « Séance 2 » de `qcm-kahoot.md` (temps proposé par question indiqué dans la banque), puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : objectif individuel de vérification des acquis, pas une compétition à forte pression ; signaler explicitement les questions à réponses multiples ; laisser de la marge sur le temps par question pour absorber une connexion lente en salle.

Transition : débriefer collectivement les 2-3 questions les plus ratées, rappeler la date de remise des deux TP (avant la séance 3), puis annoncer la séance 3 — CI/CD avec GitHub Actions et GitLab CI.
-->

---
layout: section-cover
section: Séance 3 — 3h
---

# CI/CD : GitHub Actions et GitLab CI

Corriger les TP Docker et Compose, puis automatiser la validation du code

<!--
Durée : 1 min.

Déroulé sur 3 h : correction Docker et Compose (29 min, ouverture incluse), principes et commandes de référence (24 min), GitHub Actions (21 min), pause (20 min), GitLab CI (35 min), lecture en miroir et synthèse (8 min), TP et remise (25 min), QCM (18 min).

Poser le fil conducteur : qu'est-ce qui déclenche la CI, où s'exécute le job et comment vérifier ce qu'il a produit ? Le TP de cette séance automatise uniquement le build du front choisi avec GitHub Actions.
-->

---

# Correction Docker — de React à nginx

`Dockerfile` multi-stage · un front statique, sans API

<div class="grid grid-cols-2 gap-4 mt-4">
  <div class="card">

**1 · Fabriquer avec Bun**

```dockerfile
FROM oven/bun:latest AS build
```

`bun run build` → TypeScript puis Vite → `/app/dist/`.

</div>
  <div class="card">

**2 · Servir avec nginx**

```dockerfile
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

nginx écoute sur le port **80** du conteneur. Bun n'est pas nécessaire à l'exécution.

</div>
</div>

<!--
Durée : 8 min.

Demander à deux binômes ce qui les a bloqués, puis rouvrir le Dockerfile. Le premier étage installe avec `bun i` et fabrique les fichiers statiques ; le second récupère le résultat et sa propre configuration nginx. Ne pas confondre le dossier `dist/` et l'image finale qui le contient. Ce Dockerfile ne copie pas le lockfile avant l'installation : ne pas lui attribuer la reproductibilité du `--frozen-lockfile` montré plus tard en CI.

Transition : construire l'image, puis démarrer un conteneur et vérifier le port côté hôte.
-->

---

# Correction Docker — lancer et vérifier

Depuis le dossier contenant le Dockerfile, construire et lancer le front :

```bash
docker build -t ing1-tp-react .
docker run --rm -d --name ing1-tp-react -p 127.0.0.1:8081:80 ing1-tp-react
```

Ouvrir **`http://localhost:8081/`** : la page React doit s'afficher.

```bash
docker stop ing1-tp-react
```

`8081` = port de l'hôte (boucle locale) · `80` = port de nginx dans le conteneur.

<!--
Durée : 6 min.

Faire prédire le dernier argument de `docker build` : `.` est le contexte de build, soit le dossier courant contenant le Dockerfile. `EXPOSE 80` dans le Dockerfile ne publie pas le port : c'est `-p` qui le fait. Si la page ne répond pas, vérifier `docker ps`, la correspondance des ports et `docker logs ing1-tp-react` avant de l'arrêter. `--rm` retire le conteneur à l'arrêt, pas l'image.

Transition : avec Compose, le navigateur reste à l'extérieur mais le front doit joindre une API dans le réseau interne.
-->

---

# Correction Compose — suivre `/api/hello`

<div class="card mt-4">

**Navigateur** → **`localhost:8080`** → **nginx (`frontend:80`)** → **Express (`backend:3000`)**

</div>

<v-clicks>

- **Seul le front est publié** (`8080:80`). nginx sert `/` et relaie `/api/hello`.
- **DNS Compose** : nginx résout `backend` sur le réseau interne, pas le navigateur.
- **Express** répond en JSON (`message`, `timestamp`). `expose: 3000` ne publie pas de port sur l'hôte.
- **`depends_on`** ordonne les démarrages ; ici, il ne vérifie pas que l'API est prête.

</v-clicks>

<!--
Durée : 8 min.

Suivre le `fetch('/api/hello')` dans l'application React. Dans la configuration nginx, `proxy_pass http://backend:3000;` conserve le chemin `/api/hello`. Retrouver la route côté Express. Le navigateur parle à l'origine de la page : il ne contacte jamais directement `backend:3000`.

Question : pourquoi un `502` juste après `up -d` ne prouve-t-il pas une erreur DNS ? Le backend peut avoir démarré sans être prêt à recevoir une requête. Lire les journaux avant de conclure.
-->

---

# Correction Compose — vérifier les deux réponses

Depuis le dossier contenant `compose.yml` :

```bash
docker compose up --build -d
```

- **`http://localhost:8080/`** : page React ; **`http://localhost:8080/api/hello`** : JSON de l'API.

```bash
docker compose logs --tail=30 frontend backend
docker compose down
```

**Correction partielle** : deux services, **sans base de données** ni persistance.

<!--
Durée : 6 min.

Ouvrir les deux URL. Montrer que « Hello World! » et l'horodatage proviennent d'Express. Si la page répond mais pas l'API, comparer les journaux du front et du backend. Le port Compose n'est pas limité à la boucle locale comme le port de la démo précédente : vérifier le contexte réseau de la machine de démo.

L'énoncé de séance 2 demandait aussi une base et sa persistance : aucune des deux n'est démontrée ici. Ne pas présenter ces sources comme un rendu complet.

Transition : on vient de vérifier à la main. Que peut-on vérifier automatiquement après chaque changement ?
-->

---

# Pourquoi automatiser ?

<v-clicks>

- **Intégrer de petits changements souvent** : une erreur est plus facile à isoler.
- **Obtenir un retour rapide** : un statut et des journaux associés au commit.
- **Automatiser les contrôles répétitifs** : installation, tests disponibles, build.
- **Rejouer les mêmes vérifications** en local et en CI : commandes, versions et lockfile connus.

</v-clicks>

<!--
Durée : 5 min.

Comparer deux équipes : l'une découvre une erreur TypeScript sur une semaine de changements, l'autre la voit sur le dernier petit push. Demander laquelle peut corriger plus vite et pourquoi. La CI donne un signal partagé ; elle ne remplace pas la revue de code.

Montrer l'intérêt d'un environnement propre : si mon build dépend de fichiers oubliés dans le dépôt, le runner le signale. Les commandes peuvent être identiques même si le poste et le runner n'ont pas le même système.

Transition : automatiser une vérification ne signifie pas mettre en production.
-->

---

# CI, livraison continue, déploiement continu

| Pratique | Ce que l'équipe automatise | Production |
|---|---|---|
| **CI — intégration continue** | Intégrer souvent et vérifier automatiquement les changements | Pas de mise en production impliquée |
| **Livraison continue** | Garder une version validée et déployable à tout moment | Mise en production sur décision humaine |
| **Déploiement continu** | Mettre en production chaque changement qui franchit les contrôles | Mise en production automatique |

**Notre démo : CI seule.** Un build vert et un artefact ne sont pas un déploiement.

<!--
Durée : 5 min.

Faire classer trois situations : (1) chaque push lance un build, sans mise en production ; (2) une version validée est toujours disponible et un responsable décide quand la mettre en production ; (3) le pipeline la déploie automatiquement si les contrôles passent.

Transition : plusieurs outils exécutent cette même logique.
-->

---

# Panorama — quatre façons d'exécuter un pipeline

| Outil | Point de repère | Fichier usuel |
|---|---|---|
| **GitLab CI/CD** | Intégré aux projets GitLab ; exécution par des runners | `.gitlab-ci.yml` |
| **GitHub Actions** | Intégré à GitHub ; actions réutilisables | `.github/workflows/*.yml` |
| **Jenkins** | Serveur CI open source à exploiter ; jobs sur des agents | `Jenkinsfile` |
| **Azure Pipelines** | Service Azure DevOps ; agents hébergés ou autogérés | `azure-pipelines.yml` |

Pour cette séance : lire **GitHub Actions et GitLab CI**.

<!--
Durée : 4 min.

Comparer sur deux critères : où vit le dépôt et qui maintient les machines d'exécution ? Jenkins et Azure Pipelines sont cités pour situer les outils. Les noms de fichiers sont usuels ; leurs formats ne sont pas interchangeables.

Transition : apprendre à lire les concepts communs avant les mots-clés YAML.
-->

---

# Anatomie commune d'un pipeline

```text
push de branche → job sur un runner → commandes → statut et journaux
                                          └─ si succès : artefact
```

<v-clicks>

- **Déclencheur** : événement qui lance le pipeline ; ici, un push de branche, pas un tag.
- **Job** : travail confié à un **runner**, la machine qui l'exécute.
- **Étape** : commande ou action dans le job. Dans nos exemples, un échec empêche les étapes de build ou d'archivage suivantes.
- **Artefact** : résultat conservé par la CI, téléchargeable après l'exécution.

</v-clicks>

<!--
Durée : 5 min.

Faire associer les termes à une situation : un étudiant pousse une branche, un runner exécute les commandes, ESLint échoue, l'élève retrouve l'erreur dans les journaux. Demander si le build a tourné et si l'artefact est disponible dans ce cas. Lors d'un succès, les fichiers de travail n'ont pas besoin de rester sur le runner : c'est le service CI qui conserve l'artefact.

Un déclencheur de revue, planifié ou manuel existe aussi selon l'outil ; aucun n'est configuré dans nos exemples.

Transition : définir les commandes avant de comparer les fichiers.
-->

---

# Les quatre commandes des exemples React

Ces exemples de démo exécutent les commandes **à la racine du dépôt React**.

```bash {all|1|2|3|4|all}
bun install --frozen-lockfile
bunx --no-install eslint .
bun run build
test -s dist/index.html
```

**Linux · Node.js 24 · Bun 1.4.3** → artefact **`react-dist`** (`dist/`).

Le lint analyse le code ; le contrôle de sortie vérifie que `dist/index.html` n'est pas vide.

<!--
Durée : 5 min.

Montrer le rôle du lockfile (l'installation échoue si elle doit le modifier), puis ESLint déjà installé, le build TypeScript + Vite et le contrôle d'un fichier non vide. ESLint est appelé directement sur `.` dans les exemples. Le front de démo n'a pas de suite automatisée ; ne pas inventer une commande de test.

Comparer côte à côte les exemples complets.
-->

---

# GitHub Actions — lire un `workflow` (1/2)

Exemple de démo React, **début** du workflow.

```yaml {all|3-5|7-8|10-15|all}
name: CI React

on:
  push:
    branches: ['**']

permissions:
  contents: read

jobs:
  react-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with: { persist-credentials: false }
```

<!--
Durée : 4 min.

Un workflow est l'automatisation décrite par un fichier YAML dans `.github/workflows/`. `on` indique quand lancer le workflow entier, non pas un job isolé. `**` inclut les branches avec `/` dans le nom ; avec `branches` seul, un push de tag ne lance pas ce workflow. Question : que se passe-t-il pour un push vers `cours/ci` ? Et pour le tag `v1.0` ?

La syntaxe compacte de `with` correspond au bloc développé dans le fichier. Passer à la suite des étapes du même job, puis reprendre chaque mot-clé.
-->

---

# GitHub Actions — produire `react-dist` (2/2)

Exemple React, **suite de `steps`** dans le même job `react-build`.

```yaml {all|1-4|5-8|9-12|13-17|all}
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
          package-manager-cache: false
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: '1.4.3'
          no-cache: true
      - run: bun install --frozen-lockfile
      - run: bunx --no-install eslint .
      - run: bun run build
      - run: test -s dist/index.html
      - uses: actions/upload-artifact@v6
        with:
          name: react-dist
          path: dist/
          if-no-files-found: error
```

**Archive `react-dist`** : `index.html` et `assets/` sont à la racine de l'archive.

<!--
Durée : 4 min.

`actions/upload-artifact` envoie les fichiers de `dist/` à GitHub Actions. L'archive téléchargeable `react-dist` contient les fichiers de ce répertoire : `index.html` est à la racine de l'archive, pas sous un dossier `dist/`. La durée de rétention suit les paramètres de la plateforme sauf réglage avec `retention-days`, dans les limites autorisées. Ni commit de `dist/`, ni déploiement.

Mini-question : si `test -s` échoue, l'envoi s'exécute-t-il ? Non, cette étape est soumise au succès des étapes précédentes par défaut. Si l'envoi se lance sans trouver de fichier, `if-no-files-found: error` le fait échouer. Montrer où chercher le journal du job et les artefacts du run dans Actions, si un exemple est disponible.
-->

---

# GitHub Actions — `on` : événement et filtre

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

Le filtre ne vise pas la même branche selon l'événement :

- `push` : branche **poussée** ; ici `main` uniquement.
- `pull_request` : branche **cible** ; ici les PR qui visent `main`.
- `workflow_dispatch` : lancement **manuel**.

<!--
Durée : 5 min.

Faire prédire le résultat pour un push sur `feature/menu` sans PR puis pour un nouveau push sur cette branche avec une PR ouverte vers `main`. Dans le second cas, la mise à jour de la PR déclenche le workflow, mais le push de la branche thématique ne correspond pas au filtre `push`. Si on activait `push` sur toutes les branches ET `pull_request`, une même mise à jour pourrait lancer deux exécutions. Le push sur `main` après fusion constitue un autre événement. Pour être déclenchable manuellement, le fichier doit exister sur la branche par défaut.

-->

---

# GitHub Actions — `jobs`, `runs-on`, `steps`

```yaml
jobs:
  react-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with: { persist-credentials: false }
      - run: bun run build
```

**Extrait** · Les étapes d'installation ne sont pas affichées.

- `jobs` contient les jobs nommés ; `runs-on` choisit le type de **runner**.
- `steps` sont ordonnées dans le job. `uses` appelle une action ; `with` lui passe des paramètres. `run` exécute une commande shell.

<!--
Durée : 4 min.

Faire montrer le nom du job dans le YAML puis ce qui s'afficherait dans l'interface. Deux étapes d'un même job partagent le répertoire de travail ; deux jobs n'ont pas ce partage par défaut. L'installation de Bun doit précéder la commande `bun run build`. Mini-question : quelle ligne change si on veut remplacer une commande shell ? La ligne `run`, pas `uses`.
-->

---

# GitHub Actions — `permissions` au minimum

```yaml
permissions:
  contents: read
```

**Extrait de l'exemple React** · `permissions` règle les droits du jeton automatique du workflow.

- `contents: read` permet à `checkout` de lire les sources ; aucun droit d'écriture n'est demandé.
- `persist-credentials: false` demande à `checkout` de ne pas conserver ses identifiants Git pour les étapes suivantes.

**Question** : un job qui compile et archive `dist/` doit-il pouvoir modifier le dépôt ?

<!--
Durée : 4 min.

Réponse : non. Distinguer les droits du jeton et sa persistance pour les commandes Git. Ici, `permissions` est au niveau du workflow et s'applique à son job. Lorsqu'on précise les droits ainsi, les droits non indiqués sont désactivés ; archiver les fichiers via `upload-artifact` dans ce run n'exige pas `contents: write`.

Transition : après la pause, retrouver le même chemin avec les mots-clés GitLab.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Au retour : dans le fichier GitLab, retrouver d'abord le déclencheur, les commandes et la sortie du job.
-->

---

# GitLab CI — le même job au complet

Exemple de démo React (fichier actif usuel : **`.gitlab-ci.yml`** à la racine).

```yaml {all|1-3|5-8|9-13|14-16|all}
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_COMMIT_BRANCH'

react-build:
  image: node:24-bookworm
  before_script:
    - npm install --global bun@1.4.3
  script:
    - bun install --frozen-lockfile
    - bunx --no-install eslint .
    - bun run build
    - test -s dist/index.html
  artifacts:
    name: react-dist
    paths: [dist/]
```

<!--
Durée : 4 min.

Faire pointer les équivalences : `workflow.rules` sélectionne les pushs de branche (`CI_COMMIT_BRANCH` est absente pour un tag) ; `image` fournit Linux et Node 24 ; `before_script` prépare Bun dans le même job ; `script` correspond aux quatre `run` ; `artifacts` conserve la sortie. Il faut un runner disponible avec un exécuteur qui prend en charge `image`, par exemple Docker ou Kubernetes : `image` ne sélectionne pas le runner.

GitLab récupère les sources au début du job par défaut. Demander où reconnaître l'installation, le build et l'archivage déjà vus côté GitHub. Un seul job suffit ici ; inutile de déclarer `stages` ou de transférer `node_modules/`. La suite détaille les mots-clés.
-->

---

# GitLab CI — `stages`, runner et `image`

```yaml
stages: [verify, build]

check-sources:
  stage: verify
  image: node:24-bookworm
  script: [test -s package.json]
```

Un stage regroupe des jobs ; ce n'est pas une étape shell.

- Sans dépendance explicite, les jobs d'un même stage peuvent tourner en parallèle ; le stage suivant attend.
- Le **runner** exécute le job. Avec un exécuteur compatible, `image` définit son environnement ; elle ne construit pas une image.

<!--
Durée : 5 min.

Question : si deux jobs sont dans `verify` et que l'un est encore en cours, un job du stage `build` peut-il démarrer par défaut ? Non. `needs` permet de déclarer des dépendances directes et de ne pas attendre tout un stage. Dans GitHub Actions, `needs` relie aussi des jobs ; `steps` désigne leurs étapes internes, pas un groupe de jobs.

Un runner Docker ou Kubernetes peut utiliser `image` ; un exécuteur shell ne l'utilise pas. Dans l'exemple React, `node:24-bookworm` donne Node sur Linux mais ne remplace ni le runner ni la préparation de Bun.
-->

---

# GitLab CI — `rules` : la première règle gagne

```yaml
workflow:
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_OPEN_MERGE_REQUESTS'
      when: never
    - if: '$CI_PIPELINE_SOURCE == "push" && $CI_COMMIT_BRANCH'
```

`workflow.rules` décide si le **pipeline** existe. Les `rules` d'un job décident s'il y participe.

**De haut en bas** : accepter la MR ; refuser le push si une MR est ouverte ; sinon accepter le push de branche. Sans règle applicable, pas de pipeline ici.

<!--
Durée : 5 min.

Faire jouer les règles pour un push sur `feature/menu` sans MR, puis pour une mise à jour de la même branche avec MR : le push est alors refusé tandis que l'événement `merge_request_event` est accepté. Demander l'effet d'inverser les deux dernières règles : le push de branche serait accepté trop tôt et pourrait doubler le pipeline de MR. Faire identifier pourquoi un push de tag ne satisfait pas la dernière règle : `CI_COMMIT_BRANCH` n'est pas définie pour un tag.

Les règles sont évaluées lors de la création du pipeline, avant les scripts. Dans l'exemple React, une seule règle suffit : on ne veut que les pushs de branches, sans pipeline de MR.
-->

---

# GitLab CI — `when` : succès, échec ou clic

```yaml
resume-echec:
  stage: diagnostics
  when: on_failure
  script: [echo "Un stage précédent a échoué."]

verification-manuelle:
  stage: diagnostics
  when: manual
  script: [node --version]
```

`diagnostics` est un stage déclaré après `build`.

- **`on_success`** : comportement par défaut, après succès des stages précédents.
- **`on_failure`** : après échec d'un stage précédent ; **`manual`** : sur clic dans l'interface.

<!--
Durée : 5 min.

Question : si `build` échoue, quel job démarre sans intervention ? `resume-echec`, pas `verification-manuelle`. Un job échoué mais autorisé à échouer (`allow_failure: true`) ne déclenche pas `on_failure`. Ici `when: manual` est défini directement sur le job et n'est pas bloquant par défaut ; dans une entrée de `rules`, `when: manual` est au contraire bloquant par défaut (`allow_failure: false`). `when: never` dans la règle précédente exclut le pipeline pour l'événement qui correspond.
-->

---

# GitLab CI — préparer, exécuter, diagnostiquer

```yaml
before_script:
  - npm install --global bun@1.4.3
script:
  - bun install --frozen-lockfile
  - bun run build
after_script:
  - ls -la
```

**Extrait d'un job** · `before_script` prépare ; `script` fait le travail ; `after_script` peut ajouter des diagnostics au **journal**.

`before_script` et `script` partagent un shell. `after_script` s'exécute dans un **nouveau shell** : les variables exportées dans `script` n'y sont pas conservées.

<!--
Durée : 4 min.

L'exemple React n'a pas d'`after_script`. Demander où chercher l'erreur si le build échoue mais que `ls -la` s'affiche. `after_script` peut tourner après un échec du script ; lire la première commande en échec, pas seulement la dernière ligne. Un échec dans `after_script` ne rend pas rouge un job dont le script a réussi : les vérifications obligatoires vont dans `script`. Le nouveau shell redémarre dans le répertoire de travail par défaut ; les fichiers écrits par `script` restent disponibles. La collecte du cache et des artefacts a lieu après `after_script`.
-->

---

# GitLab CI — `parallel:matrix` : répéter un job

```yaml
verifier-runtime:
  image: node:${NODE_MAJOR}-bookworm
  parallel:
    matrix:
      - NODE_MAJOR: ['22', '24']
        MODE: [development, production]
  script:
    - echo "Mode $MODE"
    - node --version
```

2 versions × 2 modes = **4 jobs**. L'un reçoit `NODE_MAJOR=24` et `MODE=production`.

<!--
Durée : 4 min.

Faire énumérer les quatre couples, puis faire nommer l'image sélectionnée pour le couple 24/production (`node:24-bookworm`). Le mode est simplement affiché ici ; un vrai contrôle s'en servirait comme paramètre. Les jobs peuvent tourner ensemble si la capacité des runners le permet. L'équivalent de lecture côté GitHub est `strategy.matrix`.
-->

---

# GitLab CI — `cache` : accélérer, pas garantir

```yaml
variables:
  BUN_INSTALL_CACHE_DIR: .bun-cache/
cache:
  key:
    files: [bun.lock]
  paths: [.bun-cache/]
```

La **clé** dépend du contenu de `bun.lock` ; le chemin désigne les fichiers à réutiliser.

- Cache retrouvé : l'installation peut réutiliser les paquets téléchargés.
- Cache absent : l'installation doit réussir quand même. C'est le **lockfile**, pas le cache, qui fixe les versions.

<!--
Durée : 4 min.

Le cache Bun est placé dans le dossier du projet pour être collectable par GitLab. Question : que se passe-t-il au premier run, ou lorsque le lockfile change ? On peut devoir télécharger de nouveau. La disponibilité du cache dépend du runner et de sa configuration ; `bun install --frozen-lockfile` reste nécessaire. Les deux exemples React n'ajoutent pas de cache de paquets.
-->

---

# GitLab CI — `artifacts` : conserver la sortie

```yaml
artifacts:
  name: react-dist
  paths: [dist/]
  expire_in: 1 week
```

**Extrait avec rétention explicite** · `paths` sélectionne la sortie du job ; `expire_in` règle sa durée de conservation.

- **Artefact** : récupérer le `dist/` produit par un job précis, dans l'interface ou dans un job suivant.
- **Cache** : tenter de réutiliser des fichiers pour **gagner du temps**.

<!--
Durée : 4 min.

Mini-question : pour relire l'`index.html` exact du commit vérifié, choisir cache ou artefact ? Artefact. Ici GitLab archive le chemin `dist/` relatif au dépôt ; dans l'exemple GitHub, les fichiers de ce dossier sont à la racine de l'archive. `expire_in` est illustratif : le fichier React fourni hérite de la rétention de l'instance. GitLab peut conserver le dernier pipeline réussi d'une référence au-delà de cette durée selon le réglage de conservation. En l'absence de règle contraire, `artifacts` est collecté en cas de succès.
-->

---

# Les deux exemples en miroir

Comparer les deux exemples complets.

| Repère | GitHub Actions | GitLab CI |
|---|---|---|
| Déclencheur | `on.push.branches` | `workflow.rules` |
| Environnement | `runs-on`, actions de préparation | runner compatible, `image`, `before_script` |
| Commande de build | `run` dans `steps` | `script` dans le job |
| Archive `react-dist` | `uses` avec `upload-artifact` | `artifacts` |

**À vérifier à deux** : si `bun run build` échoue, dans quel journal et à quelle étape regarder ?

<!--
Durée : 5 min.

Faire retrouver les quatre commandes identiques dans les deux fichiers et le contrôle de `dist/index.html`. En cas d'échec du build, ouvrir `react-build` et repérer le premier message TypeScript ou Vite ; l'artefact n'est pas produit par ce run. Demander aussi comment les sources arrivent : `checkout` explicite dans GitHub, récupération par défaut dans GitLab. Comparer les journaux si des runs de démonstration sont disponibles ; aucune activation des exemples dans le dépôt du cours.
-->

---
layout: recap
section: Séance 3 — CI/CD, GitHub Actions et GitLab CI
---

# Ce qu'il faut retenir

- <span>**Docker** : Bun fabrique `dist/` ; nginx le sert.</span>
- <span>**Compose** : seul le front est publié ; nginx atteint Express par le DNS interne.</span>
- <span>**CI** : petits changements, contrôles automatisés, retour rapide sur le commit.</span>
- <span>**GitHub Actions** : `on` déclenche le workflow ; `jobs` et `steps` décrivent le travail.</span>
- <span>**GitLab CI** : `rules` sélectionne ; `stages` groupe les jobs ; `script` exécute les commandes.</span>
- <span>**Artefact ≠ cache** : l'un conserve une sortie (`react-dist`), l'autre accélère les exécutions.</span>

<!--
Durée : 3 min.

Faire reformuler ce qu'un build vert prouve : le front compile pour ce commit et une sortie est disponible si l'archivage a réussi. Le build du front, l'image Docker et l'application déployée restent trois résultats distincts. Passer au TP GitHub Actions.
-->

---

# TP — construire le front avec GitHub Actions

**Défi** : au push d'une branche, construire le front de votre choix dans votre dépôt étudiant.

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="card">
    <div class="font-bold text-accent mb-1">1 · Déclencher</div>
    <div class="text-sm">Écrire <code>.github/workflows/ci.yml</code> avec un seul job, déclenché au push de branche.</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">2 · Construire et vérifier</div>
    <div class="text-sm">Compiler le front choisi avec l'outillage adapté et vérifier la sortie produite.</div>
  </div>
  <div class="card">
    <div class="font-bold text-accent mb-1">3 · Garder la preuve</div>
    <div class="text-sm">Fournir le lien du run réussi et télécharger l'artefact de build.</div>
  </div>
</div>

**Périmètre** : seul le build du front choisi est demandé. Aucune construction ou publication d'image Docker, aucun déploiement.

<!--
Durée : 3 min.

Utiliser le dépôt étudiant, accessible à l'intervenant ; le front peut être à la racine ou dans un sous-dossier, au choix. Un projet personnel de séance 2 peut servir de base, sans obligation. Les exemples de cours montrent React et Bun, mais aucun de ces choix n'est imposé. Adapter la commande de contrôle et le chemin de l'artefact à la sortie réelle du framework. Pour un front en sous-dossier, définir `working-directory` sur les étapes `run` concernées ; ne pas le placer sur une étape `uses`. Régler séparément `path` de `actions/upload-artifact` vers la sortie, relativement à la racine du dépôt. Aucun test applicatif ni lint n'est exigé.

Faire identifier les livrables : un fichier visible au commit du run, les journaux du job et un artefact téléchargeable.
-->

---
layout: exercise
duration: 20 min
type: solo
---

# Mise en pratique — du push à l'artefact

1. **Préparer** : choisir votre projet et placer son front à la racine du dépôt étudiant ou dans un sous-dossier.
2. **Écrire et pousser** : ajouter à la racine du dépôt `.github/workflows/ci.yml`, avec un job déclenché au push de branche.
3. **Lire le résultat** : ouvrir le run de votre commit, vérifier le build et télécharger l'artefact correspondant à la sortie produite.

**Si ça bloque** : pas de run → vérifier le chemin et `on` ; job rouge → lire la première étape en échec.

<!--
Durée : 20 min.

Circuler. Si aucun run n'apparaît, vérifier que le workflow est à la racine du dépôt, que `on` accepte le push et qu'Actions est disponible. Si l'installation échoue, vérifier le lockfile du gestionnaire choisi et, uniquement pour Bun, sa préparation. Si le build échoue, lire la première étape en erreur. Vérifier que le contrôle vise la sortie effective du framework et que `path` archive bien cette sortie. Ne pas versionner la sortie de build si elle est générée. En cas de blocage, noter la première erreur et reprendre selon les consignes de l'enseignant.
-->

---

# Remise du TP — grille de vérification

| À fournir | Ce qui doit être visible |
|---|---|
| **Lien vers le dépôt accessible** | Sources du front choisi, `.github/workflows/ci.yml` à la racine et lockfile choisi si applicable, au commit du run |
| **Lien vers le run GitHub Actions** | Bon commit, déclencheur `push` de branche et job de build réussi |
| **Résultat téléchargeable** | Build et contrôle réussis ; artefact contenant la sortie attendue du framework |

**Avant d'envoyer** : vérifier que l'enseignant a accès au dépôt et au run.

<!--
Durée : 2 min.

Faire ouvrir dépôt et run côte à côte : ils doivent montrer le même commit. Vérifier que l'artefact contient la sortie attendue du projet ; ne pas demander d'URL d'application déployée. Les modalités de remise sont précisées par l'enseignant.

Transition : lancer le QCM de clôture de la séance 3.
-->

---
layout: qcm
duration: 18 min
questions: 20
cover: Correction Docker et Compose, CI et CD, déclencheurs et jobs, GitHub Actions et GitLab CI, cache et artefacts
---

# QCM de clôture — Séance 3

<!--
Durée : 18 min (lancement 2 min, jeu 13 min, débrief 3 min) pour 20 questions.

Avant la séance, préparer 20 questions à partir des thèmes ci-dessus. La banque transversale `qcm.md` fournit quelques questions de départ. Afficher le lien ou le code du quiz en salle si l'outil l'exige.

Privilégier la compréhension plutôt que la mémorisation de YAML. Signaler les questions à réponses multiples.

Exemple : « Dans `pull_request.branches`, le filtre s'applique-t-il à la branche source ou à la branche cible ? » À la branche cible. Autre question : « Si vous voulez télécharger la sortie d'un run précis, cherchez-vous le cache ou un artefact ? » Un artefact.

Transition : débriefer collectivement les 2-3 questions les plus ratées, puis annoncer la séance 4 — sécurité, observabilité, déploiement et audit IA.
-->

---
layout: section-cover
section: Séance 4 — 3h
---

# Sécurité, observabilité, déploiement et audit IA

Sécuriser, expliquer, diagnostiquer, garder un regard critique

<!--
Durée : 1 min.

Annoncer le fil de la dernière séance : sécuriser la chaîne construite jusqu'ici (TLS, secrets), la rendre observable (logs, métriques, traces), comprendre les stratégies de déploiement, puis clôturer par le TP final avec un audit critique d'une configuration générée par IA.

Exemple concret : rappeler que le pipeline construit en séance 3 fabrique déjà une image — cette séance ajoute ce qui manque pour la rendre digne de confiance en production.

Transition : revue des pipelines et objectifs du livrable final.
-->

---

# Revue et objectifs du livrable final

<v-clicks>

- Chaque groupe a un pipeline qui installe, teste et construit une image
- Aujourd'hui : sécuriser, observer, comprendre le déploiement, auditer une config IA
- Le **livrable final** est attendu en fin de séance

</v-clicks>

<!--
Durée : 8 min (dont ~4 min d'échange sur l'état des livrables).

Rappeler la checklist du livrable final : dépôt Git identifiable, application lançable, Dockerfile fonctionnel, pipeline vert, secrets absents du dépôt, preuve d'observabilité, audit IA écrit.

Exemple concret : projeter la checklist du livrable pour que les étudiants gardent un objectif visuel clair pendant la séance.

Échange approfondi : faire un tour de table où chaque binôme indique, sur la checklist projetée, où il en est (pipeline vert obtenu ou non, principal point bloquant) — donne à l'instructeur une vision claire des groupes qui auront besoin de plus d'accompagnement pendant les TP de la séance, et rassure les groupes en retard en montrant qu'ils ne sont pas seuls.

Transition : entrer dans TLS/HTTPS.
-->

---

# TLS/HTTPS — ce que ça garantit

<v-clicks>

- **Chiffrement** — le contenu échangé n'est pas lisible en clair sur le réseau
- **Intégrité** — le contenu n'a pas été modifié en chemin
- **Authentification** — le serveur prouve son identité via un certificat

</v-clicks>

<!--
Durée : 9 min (dont ~4 min de manipulation navigateur).

Ces trois garanties sont souvent confondues. TLS ne garantit pas que le serveur est "de confiance" au sens moral — seulement que son identité est vérifiable et que la communication n'est pas altérée en transit.

Exemple concret : un cadenas dans la barre d'adresse ne signifie pas "ce site est sûr", seulement "la connexion à ce site précis est chiffrée et authentifiée".

Manipulation guidée : demander à chaque étudiant d'ouvrir un site HTTPS connu, de cliquer sur le cadenas puis d'inspecter le certificat affiché (émetteur, dates de validité, nom du sujet) — rend concrets les trois piliers avant de détailler la chaîne de confiance qui les rend possibles.

Transition : détailler le certificat et la chaîne de confiance.
-->

---

# Certificat et chaîne de confiance

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Autorité racine] --> B[Autorité intermédiaire]
  B --> C[Certificat du serveur]
  C --> D[Navigateur vérifie la chaîne]
```

<v-clicks>

- Une **autorité de certification** signe le certificat du serveur
- Le navigateur fait confiance à un ensemble d'autorités racines préinstallées
- **Let's Encrypt** délivre des certificats gratuits et automatisables

</v-clicks>

<!--
Durée : 9 min (dont ~4 min d'échange et de manipulation).

Let's Encrypt a démocratisé le HTTPS en le rendant gratuit et automatisable (renouvellement via ACME) — avant, un certificat payant était une barrière réelle pour les petits projets.

Exemple concret : un site qui ne renouvelle pas son certificat à temps affiche une alerte de sécurité aux visiteurs — incident courant et évitable avec un renouvellement automatisé.

Échange : demander si quelqu'un a déjà vu un avertissement de certificat expiré ou invalide dans un navigateur, et faire décrire ce qui s'affichait — ancre la notion de chaîne de confiance dans une expérience vécue avant de passer aux secrets applicatifs.

Manipulation guidée complémentaire : sur le même certificat déjà ouvert lors de la slide précédente, faire remonter collectivement la chaîne jusqu'à l'autorité racine affichée dans les détails du navigateur, et faire identifier laquelle des trois autorités (racine, intermédiaire, serveur) a signé laquelle — relie concrètement le schéma à ce qui est réellement affiché à l'écran.

Transition : passer aux secrets et à leur gestion.
-->

---

# Secrets — ce qu'il ne faut jamais versionner

<v-clicks>

- Jetons d'API, mots de passe, clés privées
- Un secret commité reste dans l'**historique Git**, même après suppression
- Utiliser des **variables protégées** du pipeline, jamais un fichier versionné

</v-clicks>

<Tip type="danger">
Un secret qui a fuité doit être révoqué immédiatement, pas seulement supprimé du code.
</Tip>

<!--
Durée : 9 min (dont ~4 min de cas pratique commenté).

Point de sécurité critique : supprimer un secret d'un commit ne le retire pas de l'historique Git — il faut réécrire l'historique (opération lourde) ou, plus simplement, révoquer le secret compromis.

Exemple concret : une clé d'API cloud accidentellement commise dans un dépôt public peut être exploitée en quelques minutes par des robots qui scannent GitHub en continu — la rapidité de révocation est essentielle.

Cas pratique commenté : montrer un extrait de `git log -p` sur un commit qui a introduit puis "supprimé" un secret dans un commit suivant, et faire constater à la salle que la valeur reste lisible dans l'historique — argument le plus convaincant pour ancrer la règle de révocation immédiate.

Transition : détailler .env, rotation et interdiction de versionner.
-->

---

# `.env`, rotation, bonnes pratiques

```bash
# .env — jamais commité
DATABASE_URL=postgres://user:pass@db:5432/app
API_KEY=xxxxxxxxxxxxxxxx
```

```text
# .gitignore
.env
```

<v-clicks>

- Un `.env.example` versionné documente les variables **sans valeurs réelles**
- La **rotation** régulière des secrets limite l'impact d'une fuite non détectée
- Les gestionnaires de secrets (coffre-fort dédié) évitent la dispersion des jetons

</v-clicks>

<!--
Durée : 9 min (dont ~4 min de vérification pratique).

Pattern à retenir : `.env` local et ignoré par Git, `.env.example` versionné et documenté avec des valeurs factices.

Exemple concret : demander à la salle de vérifier que leur propre `.env` figure bien dans `.gitignore` — exercice de vérification immédiate et concret.

Vérification pratique guidée : demander à chaque étudiant d'exécuter `git status` sur son dépôt fil rouge après avoir créé un `.env` local, de confirmer qu'il n'apparaît pas comme fichier suivi, puis de créer un `.env.example` correspondant avec des valeurs factices — transforme la bonne pratique en réflexe vérifié individuellement. Faire relire à un voisin le `.env.example` produit pour confirmer qu'aucune valeur réelle ne s'y est glissée par erreur — dernier filet de vérification avant de passer à la sécurité du pipeline.

Transition : sécurité CI/CD au sens large.
-->

---

# Sécurité CI/CD

<v-clicks>

- **Dépendances** — scanner les vulnérabilités connues avant de construire
- **Secret scanning** — détecter un credential commis par erreur
- **Image de base** — préférer une image officielle, à jour, de taille réduite
- **Permissions minimales** — donner au pipeline seulement les droits nécessaires

</v-clicks>

<!--
Durée : 9 min (dont ~4 min d'échange sur des exemples réels).

Le principe du moindre privilège s'applique aussi aux pipelines : un job qui n'a pas besoin d'écrire dans un registre ne devrait pas avoir cette permission par défaut.

Exemple concret : un jeton de pipeline avec des permissions d'écriture excessives, s'il fuite, permet à un attaquant d'agir bien au-delà du besoin réel du job — restreindre les permissions limite les dégâts potentiels.

Échange : reprendre chacun des 4 points un par un et demander à la salle un exemple concret vécu ou imaginé pour chacun (dépendance jamais mise à jour, secret repéré par erreur, image `latest` en production...) — installe le vocabulaire de sécurité CI/CD avant l'exercice d'audit express qui suit. Demander en complément quel point, parmi les 4, leur semble le plus risqué sur leur propre pipeline fil rouge et pourquoi — fait le lien direct avec le livrable évalué en fin de séance.

Transition : audit rapide sur un exemple de pipeline fourni (activité).
-->

---

# Audit express — repérer les failles

<v-clicks>

- Une image de base non versionnée (`latest`) au lieu d'une version épinglée
- Une variable d'environnement contenant un mot de passe en clair dans le YAML
- Un job avec des permissions d'écriture non justifiées
- Une dépendance jamais mise à jour depuis des mois

</v-clicks>

<!--
Durée : 9 min (temps d'exercice collectif de repérage).

Faire identifier collectivement, sur un exemple projeté, deux ou trois de ces anti-patterns. Cet exercice prépare directement l'audit IA de fin de séance.

Exemple concret : projeter un extrait de pipeline volontairement imparfait et demander à la salle de lever la main dès qu'un problème est repéré — rythme dynamique avant la pause.

Déroulé : laisser 3-4 minutes de lecture individuelle silencieuse de l'extrait projeté avant d'ouvrir la correction collective point par point — donne à chacun le temps de repérer par lui-même avant la mise en commun, plutôt que de laisser les plus rapides répondre pour tout le monde. Projeter ensuite un second extrait, variante avec un anti-pattern différent des quatre déjà vus, et le faire corriger uniquement à main levée sans relecture silencieuse — vérifie que la méthode s'applique aussi à un cas nouveau avant la pause.

Transition : pause.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Rester disponible pour les questions sur TLS ou les secrets.

Transition au retour : déploiement et versionnage, observabilité.
-->

---

# Déploiement et versionnage

<v-clicks>

- **Environnements** — développement, test, production, chacun isolé
- **Release** — une version figée, prête à être déployée
- **Rollback** — revenir à la version précédente en cas de problème

</v-clicks>

<!--
Durée : 5 min.

Poser la notion d'environnement comme un principe de sécurité et de qualité : ne jamais tester en production ce qui n'a pas été validé ailleurs.

Exemple concret : un incident en production doit pouvoir être résolu en quelques minutes par un rollback, sans attendre un correctif de code en urgence — le rollback est un filet de sécurité, pas un aveu d'échec.

Question à la salle : demander pourquoi un environnement de test isolé de la production est aussi une question de gestion de projet (coût d'un incident client vs coût d'un environnement supplémentaire) — lien direct avec le profil management.

Transition : détailler les stratégies de déploiement.
-->

---

# Stratégies de déploiement

| Stratégie | Principe | Risque en cas d'erreur |
|---|---|---|
| **Recreate** | Arrêt total puis redémarrage sur la nouvelle version | Coupure de service |
| **Rolling** | Remplacement progressif des instances | Coexistence temporaire de deux versions |
| **Blue/green** | Deux environnements complets, bascule instantanée | Rollback quasi immédiat |
| **Canary** | Nouvelle version testée sur une petite portion du trafic | Impact limité si problème détecté |

<!--
Durée : 8 min (dont ~4 min d'exercice de classement).

Ce tableau est un support de mémorisation. Insister sur canary : c'est la stratégie qui limite le mieux le risque, au prix d'une complexité de mise en œuvre plus élevée.

Exemple concret : une nouvelle fonctionnalité risquée déployée d'abord sur 5% du trafic (canary) permet de détecter un problème avant qu'il touche l'ensemble des utilisateurs.

Exercice de classement : donner 3 scénarios (mise à jour de sécurité urgente sans risque de régression, changement risqué sur le paiement, refonte totale d'architecture) et demander à la salle quelle stratégie choisir pour chacun, en justifiant le compromis risque/complexité — vérifie la compréhension avant de passer à l'observabilité.

Transition : observabilité — logs, métriques, traces.
-->

---

# Observabilité — les trois piliers

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph TB
  A[Application] --> B["Logs — que s'est-il passé ?"]
  A --> C["Métriques — combien, à quelle vitesse ?"]
  A --> D["Traces — quel chemin a pris la requête ?"]
```

<v-clicks>

- **Logs** — événements horodatés, riches en contexte
- **Métriques** — valeurs agrégées dans le temps (latence, taux d'erreur...)
- **Traces** — parcours d'une requête à travers plusieurs composants

</v-clicks>

<!--
Durée : 9 min (dont ~4 min d'exemples de logs commentés).

Ces trois piliers sont complémentaires : les logs racontent un événement précis, les métriques donnent une tendance chiffrée, les traces suivent un parcours de bout en bout.

Exemple concret : un pic de latence détecté par une métrique peut être expliqué en détail par une trace, puis confirmé par les logs du composant en cause — les trois piliers se complètent dans un diagnostic réel.

Exemples commentés : projeter une ligne de log applicatif réelle, une métrique de latence sous forme de graphique simple et un schéma de trace à deux-trois sauts, et demander à la salle d'associer chaque exemple au bon pilier avant de l'expliquer — rend les trois notions concrètes avant de voir la chaîne d'outils qui les produit.

Transition : présenter la chaîne OpenTelemetry → Prometheus → Grafana → Alertmanager.
-->

---

<h1 style="font-size: 1.875rem">La chaîne OpenTelemetry → Prometheus → Grafana → Alertmanager</h1>

<Tip type="info">
OpenTelemetry et Prometheus sont des exemples de projets de l'écosystème cloud-native vu en séance 2.
</Tip>

<div class="[&_.mermaid]:my-2">

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Application instrumentée] --> B[OpenTelemetry<br/>collecte]
  B --> C[Prometheus<br/>stockage métriques]
  C --> D[Grafana<br/>tableaux de bord]
  C --> E[Alertmanager<br/>notifications]
```

</div>

<v-clicks>

- **OpenTelemetry** — instrumente et collecte logs, métriques et traces
- **Prometheus** — collecte et stocke les métriques
- **Grafana** — représente les métriques dans des tableaux de bord
- **Alertmanager** — regroupe, déduplique et achemine les alertes

</v-clicks>

<div class="-mt-3">

</div>

<!--
Durée : 9 min (dont ~4 min d'échange sur des alternatives).

Cette chaîne est un exemple concret et cohérent, pas la seule combinaison possible. L'important est de comprendre le rôle de chaque brique, pas de mémoriser une stack unique et figée.

Exemple concret : une alerte Alertmanager peut notifier une équipe par email ou messagerie dès qu'un taux d'erreur dépasse un seuil défini dans Prometheus — boucle complète de bout en bout.

Échange : demander si certains connaissent des alternatives à l'une de ces briques (Datadog, ELK/Loki pour les logs, PagerDuty pour l'alerting...) et rappeler que le rôle compte plus que le nom exact de l'outil — utile pour le futur chef de projet qui devra dialoguer avec des équipes utilisant des stacks différentes. Projeter en complément une courte capture d'un tableau de bord Grafana simple (une seule métrique de latence dans le temps) pour rendre concret le passage de la métrique brute au tableau de bord évoqué plus haut.

Transition : feature flags.
-->

---

# Feature flags — activer sans redéployer

<Tip type="info">
Un flag oublié activé pour tout le monde reste une dette technique — prévoir son retrait après stabilisation.
</Tip>

<v-clicks>

- Un **feature flag** active ou désactive une fonctionnalité à l'exécution
- Permet de déployer du code inactif, puis de l'activer progressivement
- Complète les stratégies de déploiement (notamment canary)

</v-clicks>

<!--
Durée : 16 min (dont ~11 min d'étude de cas et de discussion commentées).

Les feature flags découplent le déploiement (mettre le code en place) de la mise en visibilité (l'activer pour les utilisateurs) — nuance importante pour le profil management du master.

Exemple concret : une fonctionnalité déployée en production mais désactivée par flag peut être activée uniquement pour l'équipe interne avant l'ouverture à tous les utilisateurs.

Étude de cas commentée : reprendre le scénario canary vu juste avant et montrer comment un feature flag le complète concrètement — déployer le code partout, mais n'activer la fonctionnalité que pour 5% des utilisateurs choisis par le flag, sans avoir à gérer deux versions d'infrastructure séparées comme pour un canary classique. Faire réagir la salle sur le risque symétrique : un flag oublié activé devient une dette de sécurité et de lisibilité, pas seulement une dette technique anodine.

Discussion approfondie : prolonger l'échange avec des exemples vécus ou imaginés de feature flags oubliés en production, faire formuler à la salle le lien entre dette technique et dette de sécurité, puis demander à un binôme volontaire si son propre pipeline fil rouge pourrait bénéficier d'un flag sur une fonctionnalité en cours — ancre la notion dans le TP noté qui suit la séance.

Transition : demander une configuration à une IA, puis l'auditer avec une grille dédiée.
-->

---

# Grille d'audit d'une configuration générée par IA

<Tip type="warning">
Toute suggestion d'IA est une proposition à vérifier, jamais une vérité à copier-coller.
</Tip>

<v-clicks>

- Point de départ : demander à une IA un **Dockerfile** ou un **workflow** de pipeline — jamais utilisé tel quel, toujours **à vérifier**
- **Reproductibilité** — versions épinglées, comportement stable dans le temps
- **Permissions** — droits minimaux, pas d'excès par défaut
- **Exposition réseau** — ports et accès strictement nécessaires
- **Secrets** — aucun credential en clair dans la configuration
- **Provenance** — image de base connue et maintenue
- **Cohérence** — la proposition correspond réellement au besoin exprimé

</v-clicks>

<!--
Durée : 10 min (dont ~2 min d'échange et ~5 min de démonstration en direct).

Message central : l'objectif n'est pas d'évaluer la capacité de l'IA à produire du YAML, mais la capacité de l'étudiant à repérer ce qui ne va pas dans la proposition.

Exemple concret : une configuration générée par IA qui utilise une image `latest` non épinglée, ou un utilisateur root par défaut — deux erreurs fréquentes et faciles à repérer une fois la checklist connue.

Échange : demander qui a déjà utilisé une IA générative pour écrire du code d'infrastructure (Dockerfile, workflow CI), et si la proposition a été utilisée telle quelle ou vérifiée — pose la question de posture professionnelle avant de dérouler la grille d'audit formelle.

Cette grille sert directement de base à la partie audit du TP final noté. La faire copier ou l'associer au support fourni pour le TP.

Démonstration en direct : demander à un binôme volontaire de soumettre en direct une demande à une IA générative, projeter la demande et sa réponse, puis parcourir les 6 critères de la grille un par un sur cette réponse concrète avant que chaque binôme ne fasse de même pour le TP noté — moment fort de la séance.

Second passage guidé : projeter une deuxième réponse d'IA générative, contrastée et contenant un anti-pattern différent de la première (par exemple un secret en clair plutôt qu'une image non épinglée), et faire dérouler les 6 critères uniquement par la salle, sans intervention de l'instructeur sauf blocage — vérifie que la méthode est assimilée avant que chaque binôme ne l'applique seul sur sa propre configuration pendant le TP noté.

Transition : finalisation du dépôt et restitution en binômes.
-->

---
layout: exercise
duration: 15 min
type: group
---

# TP noté — finalisation du dépôt

## Livrable attendu

- Dépôt Git identifiable, historique compréhensible
- Application lançable localement, Dockerfile fonctionnel
- Pipeline GitHub Actions **ou** GitLab CI vert
- Secrets absents du dépôt, configuration sensible documentée
- Courte preuve d'observabilité (logs analysés, endpoint ou métrique choisie)
- Audit écrit d'une configuration générée par IA, avec corrections justifiées

<!--
Durée : 15 min (temps de finalisation en binômes).

Rappeler que l'URL publique n'est qu'un bonus documenté si un hébergement pédagogique est disponible — jamais une obligation bloquante pour la note.

Circuler dans les binômes, en priorité ceux encore en difficulté sur l'observabilité ou l'audit IA — ce sont les deux points les plus récents du déroulé et ceux où l'accompagnement individuel apporte le plus.

Transition : lancer le QCM de clôture de la séance 4, dernier quiz du module.
-->

---
layout: qcm
duration: 18 min
questions: 20
cover: TLS/HTTPS, secrets, sécurité CI/CD, stratégies de déploiement, observabilité (logs/métriques/traces), feature flags, audit IA, TP final
---

# QCM de clôture — Séance 4

<div class="grid grid-cols-2 gap-8 items-center h-full">
<div>

**Couvre** : TLS/HTTPS, secrets, sécurité CI/CD, stratégies de déploiement, observabilité (logs/métriques/traces), feature flags, audit IA, TP final

- 20 questions (section Séance 4)
- Certaines questions à **réponses multiples**, indiqué sur chaque question



</div>
<div class="flex flex-col items-center justify-center gap-4">
  <div
    class="relative w-56 h-56 bg-white rounded-lg shadow-xl border-4 border-[#2b2620] flex items-center justify-center"
    style="background-image: repeating-conic-gradient(#2b2620 0% 25%, #ffffff 0% 50%); background-size: 16px 16px;"
  >
    <div class="absolute top-2 left-2 w-10 h-10 border-4 border-[#2b2620] bg-white"></div>
    <div class="absolute top-2 right-2 w-10 h-10 border-4 border-[#2b2620] bg-white"></div>
    <div class="absolute bottom-2 left-2 w-10 h-10 border-4 border-[#2b2620] bg-white"></div>
    <div class="relative z-10 bg-white/95 px-4 py-3 rounded-md border-2 border-[#c1502e] text-center leading-tight">
      <span class="block font-bold text-[#c1502e]">QR CODE</span>
      <span class="block font-bold text-[#c1502e]">À REMPLACER</span>
    </div>
  </div>
  <div class="text-center">
    <div class="font-semibold text-heading">Kahoot ou équivalent</div>
    <div class="text-sm text-muted">Rejoignez le quiz avec le PIN affiché à l'écran</div>
  </div>
</div>
</div>

<!--
Durée : 18 min (lancement 2 min, jeu 13 min, débrief 3 min) pour 20 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 20 questions de la section « Séance 4 » de `qcm-kahoot.md`, puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : dernier quiz des 4 séances, il couvre la sécurité, l'observabilité, le déploiement et l'audit IA vus aujourd'hui, juste après le TP noté — signaler explicitement les questions à réponses multiples.

Exemple concret de question possible : "Quel port standard correspond à HTTPS ?" (réponse attendue : 443) — les 20 questions réelles sont dans `qcm-kahoot.md`.

Transition : débriefer collectivement les 2-3 questions les plus ratées, puis enchaîner sur le bilan et les limites du module.
-->

---

# Bilan et limites du module

<v-clicks>

- Kubernetes reste une **introduction** : pas d'installation de cluster, pas de manifeste évalué
- L'Infrastructure as Code (Terraform, Ansible...) n'a pas été traitée en profondeur ici
- Ce module pose des **fondations**, pas une expertise complète sur chaque sujet

</v-clicks>

<!--
Durée : 5 min (dont ~3 min de discussion bilan).

Assumer clairement les limites du module plutôt que de laisser croire à une couverture exhaustive — cohérence pédagogique avec le niveau ING1 visé.

Exemple concret : un futur stage ou une future mission approfondira naturellement un ou deux de ces sujets — le module donne le vocabulaire pour ne pas partir de zéro.

Discussion bilan : reprendre collectivement l'observabilité (choix de métrique) et l'audit d'une configuration générée par IA vus juste avant — faire verbaliser par deux ou trois étudiants un point qui leur semblait encore flou, avant la synthèse finale.

Transition : synthèse globale du module.
-->

---
layout: recap
section: Synthèse globale du module
---

# Ce qu'il faut retenir sur les 4 séances

- **Réseaux et cloud** : couches, IP/DNS, IaaS/PaaS/SaaS/serverless, haute disponibilité
- **DevOps, Git, Docker** : culture, collaboration, Infrastructure as Code, conteneurisation, CNCF avant Kubernetes
- **CI/CD** : anatomie commune, GitHub Actions, GitLab CI, pipeline installation → build
- **Sécurité et observabilité** : TLS, secrets, stratégies de déploiement, logs/métriques/traces
- **Audit IA** : vérifier une proposition, jamais la copier sans regard critique

<!--
Durée : 2 min.

Dernière synthèse avant les questions ouvertes. Rappeler le fil rouge parcouru : une application simple, versionnée, conteneurisée, validée par un pipeline, sécurisée et supervisée.

Transition : ouvrir sur les questions finales.
-->

---
layout: end
---

# Merci !

Des questions ?

<!--
Durée : 10-15 min de questions ouvertes.
Q&A facultative, hors budget des 12 h : ne pas la décompter des 180 min de la séance 4.

Proposer, si la salle est silencieuse, un tour rapide : "qu'avez-vous trouvé le plus utile ?", "qu'est-ce qui reste flou ?".

Rappeler que le vocabulaire vu ici (réseau, cloud, Docker, CI/CD, sécurité, observabilité) se retrouve dans n'importe quel poste technique ou de gestion de projet IT — bonne base pour la suite du cycle.
-->
