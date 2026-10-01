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
presenter: false # disable presenter mode
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

<div class="grid grid-cols-2 gap-6">
<div>

## 🐳 Docker

- **macOS** : Docker Desktop, ou alternative légère **Colima**
- **Windows** : activer **WSL**, puis installer Docker Desktop
- Vérifier l'installation : `docker --version`

</div>
<div>

## 🐙 GitHub

- Avoir un **compte GitHub** actif
- Avoir accès à un **dépôt GitHub** dédié aux TP

</div>
</div>

<!--
Durée : 3 min.

Annoncer clairement que la suite du cours suppose ces trois pré-requis déjà en place : les TP démarrent directement sans temps d'installation dédié en séance.

Verbaliser précisément le périmètre attendu : sur macOS, Docker Desktop ou Colima (plus léger, en ligne de commande) ; sur Windows, WSL d'abord puis Docker Desktop par-dessus. Ne pas dérouler une installation complète ici — seulement `docker --version` doit répondre avant la séance 2, moment du premier TP Docker.

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
