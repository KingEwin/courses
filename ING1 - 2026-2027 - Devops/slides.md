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

---
layout: section-cover
section: Séance 2 — 3h
---

# DevOps, Git, Docker et écosystème cloud-native

De la culture aux premières images exécutables

<!--
Durée : 1 min.

Annoncer le fil de la séance : d'abord la culture DevOps et son histoire, puis Git en équipe, puis Docker, puis un premier pas dans l'écosystème cloud-native avec la CNCF et une introduction à Kubernetes.

Exemple concret : rappeler le fil rouge — l'application Node.js va être versionnée avec Git puis conteneurisée avec Docker dans cette séance.

Transition : retour rapide sur la séance 1.
-->

---

# Retour sur la séance 1

<v-clicks>

- Réseau : couches, IP, DNS, routage — acquis ?
- Cloud : IaaS/PaaS/SaaS/serverless — un exemple retenu ?
- Haute disponibilité — qu'avez-vous observé sur un service que vous utilisez ?

</v-clicks>

<!--
Durée : 4 min (dont ~2 min de tour de table).

Tour de table rapide sur la consigne interséance (observation de haute disponibilité sur un service utilisé). Objectif : réactiver les acquis avant d'enchaîner.

Exemple concret attendu des étudiants : "l'appli de ma banque affiche une page de maintenance par zone", "mon jeu en ligne a un statut serveur public".

Tour de table complet : donner la parole à 4-5 étudiants successivement (pas seulement les volontaires spontanés) pour maximiser la diversité des exemples et vérifier que la consigne a été comprise par l'ensemble du groupe.

Transition : rappeler le scénario applicatif du fil rouge avant d'attaquer le DevOps.
-->

---

# Le scénario applicatif du fil rouge

<v-clicks>

- Une application web **Node.js minimale** : une page, un endpoint de contrôle
- Elle sera **versionnée** avec Git (cette séance)
- Elle sera **conteneurisée** avec Docker (cette séance)
- Elle sera **validée par un pipeline** (séance 3) puis **sécurisée et supervisée** (séance 4)

</v-clicks>

<!--
Durée : 5 min.

Ce rappel évite que les étudiants perçoivent Git, Docker et CI/CD comme des blocs isolés — c'est une seule chaîne, appliquée au même projet du début à la fin.

Exemple concret : montrer la structure attendue du dépôt final (code, tests, Dockerfile, fichier de pipeline) pour donner un repère visuel stable.

Vérification rapide : demander qui a déjà cloné le dépôt fil rouge et lancé l'application localement — traiter en direct les deux ou trois blocages d'environnement les plus fréquents avant de continuer.

Transition : entrer dans l'histoire du DevOps.
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
Durée : 4 min.

Poser le problème avant la solution : sans culture partagée, chaque livraison devient un conflit d'intérêt entre celui qui code et celui qui exploite.

Exemple concret : une mise en production qui casse un vendredi soir, le développeur injoignable, l'équipe d'exploitation seule pour gérer l'incident — schéma classique pré-DevOps.

Transition : introduire le mouvement DevOps comme réponse à ce silo.
-->

---

# Le besoin : vitesse ET fiabilité

<v-clicks>

- Le marché exige des livraisons **plus fréquentes**
- Le service doit rester **fiable** malgré la fréquence des changements
- Solution : rapprocher développement et exploitation autour d'objectifs communs
- Les leviers : **cloud**, **conteneurs**, **automatisation**, **CI/CD**, **observabilité**

</v-clicks>

<!--
Durée : 4 min.

DevOps n'est pas né d'une mode mais d'une contrainte business réelle : livrer plus vite sans casser la production. Les 5 leviers cités seront chacun développés dans les séances suivantes.

Exemple concret : une équipe qui déployait une fois par trimestre avant, plusieurs fois par jour après adoption de pratiques DevOps — pas une promesse marketing, une conséquence mesurable de l'automatisation.

Transition : préciser que DevOps ne remplace pas la responsabilité, il la partage.
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
Durée : 3 min.

Nuance importante à verbaliser : "responsabilité partagée" ne veut pas dire "personne n'est responsable" — c'est l'inverse, chacun reste responsable mais sur un objectif commun.

Exemple concret : un développeur qui ajoute un healthcheck à son service facilite le travail de l'équipe d'exploitation — petit geste, grand effet sur la fiabilité partagée.

Transition : montrer comment ces pratiques ont évolué dans les métiers, sans figer un intitulé universel.
-->

---

# Une évolution des métiers, pas un poste unique

<v-clicks>

- Des pratiques associées à des intitulés variés selon les organisations (ingénieur plateforme, SRE, ingénieur DevOps...)
- Aucun intitulé n'est une norme universelle — le contexte de l'entreprise prime
- Ce qui compte : les **pratiques** (automatisation, mesure, collaboration), pas l'étiquette du poste

</v-clicks>

<!--
Durée : 3 min.

Éviter tout discours prescriptif sur "le" métier DevOps : insister sur la diversité des organisations et des appellations selon les entreprises et les pays.

Exemple concret : deux entreprises comparables peuvent appeler la même fonction "DevOps Engineer" et "Site Reliability Engineer" sans différence pratique majeure — l'intitulé suit la culture de l'entreprise, pas une règle figée.

Transition : formaliser le cycle DevOps et introduire les métriques DORA.
-->

---
class: flex flex-col items-center justify-center text-center
---

# Le cycle DevOps

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Plan] --> B[Code]
  B --> C[Build]
  C --> D[Test]
  D --> E[Release]
  E --> F[Deploy]
  F --> G[Operate]
  G --> H[Monitor]
  H --> A
```

<!--
Durée : 3 min.

Ce cycle est un visuel classique du domaine. Insister : c'est un cycle, pas une ligne droite — le monitoring nourrit le plan suivant (boucle de rétroaction).

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
Durée : 4 min.

DORA est devenu un standard de référence pour évaluer objectivement une organisation, au-delà des impressions subjectives ("on livre vite" n'est pas mesurable sans ces métriques).

Exemple concret pour le profil management du master : ces 4 métriques permettent à un chef de projet de dialoguer avec une DSI sur la performance réelle d'une équipe, sans jargon technique excessif.

Transition : refermer le bloc DevOps, ouvrir le bloc Git.
-->

---

# Git en équipe : au-delà du solo

<v-clicks>

- Les commandes de base (`add`, `commit`, `push`) sont acquises
- En équipe, il faut des **conventions partagées**
- **Branches**, **pull/merge requests**, **revue de code** structurent la collaboration

</v-clicks>

<!--
Durée : 5 min.

Vérifier rapidement les acquis : lever la main qui utilise déjà des branches régulièrement. Adapter le rythme selon la réponse de la salle.

Exemple concret : une équipe qui travaille tous sur `main` sans branche finit par écraser le travail des autres — bon point de départ pour justifier le besoin de convention.

Prolonger l'échange : demander à un étudiant de raconter un conflit de fusion (merge conflict) déjà vécu, en stage ou en projet — sert d'accroche concrète avant de détailler dépôt/commit/branche.

Transition : détailler dépôt, commit, branche et merge/pull request.
-->

---

# Dépôt, commit, branche

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
Durée : 5 min (dont ~3 min de démonstration live).

Insister sur "atomique" : un commit doit correspondre à un changement logique cohérent, pas à un mélange de plusieurs sujets non liés.

Exemple concret : un commit "fix typo + ajoute feature X + change la config CI" est un anti-pattern — trois commits séparés seraient plus lisibles et plus faciles à annuler individuellement si besoin.

Démonstration live : créer une branche, faire deux commits atomiques distincts sur le dépôt fil rouge, puis lancer `git log --oneline --graph` devant la salle pour montrer un historique lisible. Pointer chaque commit et faire deviner son objet avant de l'ouvrir.

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
Durée : 5 min.

La revue de code est un filet technique ET un transfert de connaissance dans l'équipe, pas du flicage.

Exemple concret : une PR de plus de 500 lignes modifiées voit son taux de détection de bugs chuter fortement en revue — découper le travail est une compétence à part entière.

Point d'échange : demander si quelqu'un a déjà reçu une demande de changement en revue qu'il jugeait injustifiée, et comment il l'a gérée — ouvre sur la posture professionnelle attendue en équipe.

Transition : détailler commits atomiques et SemVer.
-->

---

# Commits atomiques et historique lisible

```text
feat: add health-check endpoint
fix: handle missing environment variable
docs: update README with run instructions
```

<v-clicks>

- Un commit = **un changement logique**, un message clair
- Préfixe sémantique (`feat`, `fix`, `docs`...) → historique navigable
- Historique lisible = diagnostic plus rapide en cas d'incident

</v-clicks>

<!--
Durée : 7 min (dont ~4 min d'exercice écrit).

Ce format de message n'est pas obligatoire par Git lui-même, mais devient vite un standard d'équipe efficace, notamment pour retrouver rapidement quel commit a introduit un bug.

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
Durée : 7 min (dont ~4 min de questions-réponses).

Poser la question à la salle : "renommer un endpoint d'API, c'est quel type de changement ?" — réponse attendue : MAJOR (breaking change).

Exemple concret : un client qui consomme une API et valide strictement le format de réponse verra son intégration casser si un champ obligatoire est ajouté sans bump MAJOR — impact direct sur la confiance du versionnage.

Prolonger avec 2-3 cas supplémentaires à la volée (ajouter un champ optionnel, corriger un bug sans changer l'API, changer le format d'une date en réponse) et faire trancher la salle à main levée avant de donner la réponse — consolide la compréhension MAJOR/MINOR/PATCH avant de basculer sur l'Infrastructure as Code.

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
Durée : 4 min.

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
Durée : 4 min.

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
Terraform et ses alternatives **provisionnent** des ressources (créer une VM, un réseau) ; un outil comme Ansible **configure** ensuite ce qui tourne dessus (installer, paramétrer). Les deux rôles sont complémentaires, pas concurrents.
</Tip>

<!--
Durée : 4 min.

Terraform reste l'outil dominant et multi-cloud : un seul langage pour AWS, Azure, GCP et bien d'autres providers, y compris VMware pour du hors-cloud. Les alternatives sont positionnées sans être détaillées : OpenTofu est un fork open source né après un changement de licence de Terraform ; Pulumi permet d'écrire l'infra dans un langage de programmation classique (Python, TypeScript) plutôt qu'un langage déclaratif dédié ; CloudFormation (AWS) et Bicep (Azure) sont les équivalents propriétaires liés à un seul fournisseur.

Exemple concret : une entreprise avec des serveurs VMware en interne ET des ressources AWS peut utiliser Terraform pour les deux, avec un provider différent pour chaque cible — un seul outil, deux terrains.

Transition : Infrastructure as Code posée, retour à Docker avec la comparaison VM versus conteneur.
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
Durée : 7 min (dont ~4 min de discussion comparée).

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
Durée : 7 min (dont ~4 min de manipulation guidée).

Analogie utile : image = classe en programmation orientée objet, conteneur = instance de cette classe. Une image ne change pas, un conteneur a un état d'exécution propre.

Exemple concret : dix conteneurs peuvent démarrer depuis la même image, chacun avec ses propres logs et son propre état mémoire, sans interférer entre eux.

Manipulation guidée : demander à chaque étudiant d'exécuter `docker version` puis `docker info` sur son poste, de repérer le client et le démon dans la sortie, puis de lancer `docker run hello-world` pour observer en direct la récupération d'image et la création du conteneur décrites sur le schéma.

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
Durée : 12 min (démonstration live complète).

Dérouler chaque instruction : image de base, répertoire de travail, copie ciblée des fichiers de dépendances avant le reste du code (pour préserver le cache), exposition documentaire du port, commande de démarrage.

Exemple concret : si le code applicatif change mais pas `package.json`, l'étape `npm ci` n'est pas rejouée — gain de temps de build significatif sur un projet qui grossit.

Démonstration live pas à pas (bloc le plus dense de la séance, prévoir le temps complet) : écrire ce Dockerfile ligne par ligne devant la salle sur le dépôt fil rouge, en commentant chaque choix ; lancer `docker build` et montrer les couches se construire une par une dans le terminal ; lancer `docker run` avec la publication du port, puis vérifier l'endpoint exposé avec `curl localhost:3000` ou dans le navigateur ; enfin modifier une ligne du code applicatif et relancer un build pour observer le cache en action sur les couches inchangées. Faire venir un ou deux étudiants au clavier pour reproduire une étape en conditions réelles avant de conclure.

Transition : présenter les bonnes pratiques associées (.dockerignore, utilisateur non privilégié, cache, multi-stage).
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Répondre aux questions individuelles sur Git ou Docker pendant la pause.

Transition au retour : bonnes pratiques Docker (cache, .dockerignore, utilisateur non privilégié, multi-stage).
-->

---

# Ordonner les couches intelligemment

```dockerfile
# Moins optimal — tout invalidé au moindre changement de code
COPY . .
RUN npm ci

# Préférable — le cache npm ci survit aux changements de code
COPY package*.json ./
RUN npm ci
COPY . .
```

<v-clicks>

- Les instructions **les moins susceptibles de changer** en premier
- Le cache de build accélère radicalement les reconstructions
- Un changement de code ne doit pas invalider l'installation des dépendances

</v-clicks>

<!--
Durée : 6 min (dont ~3 min de comparaison chronométrée).

Ce pattern d'ordre des couches est LE réflexe à ancrer chez les étudiants — il a un impact direct et mesurable sur la vitesse de build en local et en CI.

Exemple concret : un changement d'une ligne dans le code applicatif peut faire passer un rebuild de 2 minutes à 2 secondes, simplement grâce à cet ordre.

Comparaison chronométrée : relancer un build avec l'ordre "moins optimal" puis avec l'ordre "préférable" sur le même changement de code, chronomètre à l'appui, pour rendre visible et mesurable le gain de cache devant la salle.

Transition : présenter .dockerignore et l'utilisateur non privilégié.
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
Durée : 6 min (dont ~3 min de vérification pratique).

Deux bonnes pratiques de sécurité et de propreté à traiter ensemble : elles sont souvent oubliées par des débutants, avec un vrai coût en sécurité et en taille d'image.

Exemple concret : un `.env` copié dans l'image reste présent dans les couches même s'il est supprimé plus tard dans le Dockerfile — d'où l'importance de ne jamais le copier du tout.

Vérification pratique : construire l'image sans puis avec `.dockerignore`, comparer la taille avec `docker images`, puis lancer `docker exec ... whoami` sur le conteneur en cours pour confirmer que l'utilisateur actif n'est pas `root`.

Transition : introduire le multi-stage build pour réduire drastiquement la taille finale.
-->

---

# Multi-stage build

```dockerfile {all|1-6|8-12|all}
# --- Stage 1 : construction ---
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# --- Stage 2 : exécution ---
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

<v-clicks>

- **Stage de construction** — image lourde avec tout l'outillage
- **Stage d'exécution** — image minimale, ne contient que le nécessaire
- Résultat final = uniquement le **dernier stage**

</v-clicks>

<!--
Durée : 6 min (dont ~2 min de comparaison de tailles).

L'idée clé : on n'a pas besoin des outils de build en production, seulement du résultat compilé/installé. Le multi-stage sépare proprement les deux mondes.

Exemple concret : gain typique de x5 à x10 en taille d'image finale entre une version naïve et une version multi-stage optimisée avec une base alpine.

Comparaison rapide : afficher côte à côte la taille de l'image mono-stage construite plus tôt et celle du multi-stage via `docker images`, pour rendre le gain concret et chiffré.

Transition : passer à Docker Compose pour orchestrer plusieurs services.
-->

---

# Docker Compose — plusieurs services, un fichier

```yaml {all|1-8|10-16|all}
services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

<style scoped>
.slidev-code { font-size: 0.72em !important; line-height: 1.3 !important; }
</style>

<!--
Durée : 2 min.

Compose décrit une stack multi-conteneurs de façon déclarative : un seul fichier, une seule commande de démarrage/arrêt.

Exemple concret : sans Compose, il faudrait taper plusieurs commandes `docker run` à la main pour créer un réseau, lancer la base de données puis l'API dans le bon ordre — Compose remplace tout ça par un fichier versionné et partagé.

Démonstration courte : lancer `docker compose up` sur ce fichier devant la salle et montrer les deux services démarrer ensemble dans les logs.

Transition : détailler réseau, variables d'environnement et volumes dans Compose.
-->

---

# Réseau, variables d'environnement, volumes

<v-clicks>

- **Réseau** — Compose crée un réseau dédié, les services se joignent par leur nom
- **Variables d'environnement** — `.env` paramètre la stack sans modifier le YAML
- **Volumes** — persistent les données au-delà du cycle de vie d'un conteneur

</v-clicks>

<Tip type="warning">
Sans volume, les données écrites dans un conteneur disparaissent à son arrêt.
</Tip>

<!--
Durée : 3 min.

Ces trois notions rendent Compose utilisable en pratique : réseau pour la communication inter-services, variables pour la configuration, volumes pour la persistance.

Exemple concret : une base de données sans volume perd toutes ses données au moindre `docker compose down` suivi d'un `up` — piège classique en début d'apprentissage.

Démonstration courte : arrêter la stack avec `docker compose down -v` (suppression du volume) puis la relancer, pour montrer la perte de données en direct et justifier la vigilance sur les volumes.

Transition : introduire la CNCF, avant Kubernetes.
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
Durée : 7 min (dont ~4 min d'échange sur des projets connus).

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
Durée : 4 min.

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
Durée : 4 min.

Progression pédagogique volontaire : Docker (1 machine) → Compose (1 machine, plusieurs services) → Kubernetes (plusieurs machines). Cette montée en échelle rend le "pourquoi" de Kubernetes évident.

Exemple concret de cas d'usage : une application avec plusieurs services qui doit rester disponible malgré une panne de machine, absorber un pic de trafic, ou se mettre à jour sans coupure — Kubernetes répond à ces besoins.

Transition : présenter le vocabulaire minimal de Kubernetes.
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
Durée : 4 min.

Se limiter strictement à ces 5 mots — c'est le vocabulaire visé par le module, pas plus. Aucune démonstration de `kubectl`, aucun manifeste YAML complexe à ce stade.

Exemple concret : pointer chaque terme sur le schéma en le nommant à voix haute, pour ancrer visuellement le vocabulaire plutôt que de réciter une définition académique.

Transition : conclure sur les limites volontaires de cette introduction et faire la synthèse de séance.
-->

---
layout: recap
section: Séance 2 — DevOps, Git, Docker, CNCF, introduction Kubernetes
---

# Ce qu'il faut retenir

- **DevOps** répond à un besoin de vitesse ET de fiabilité, via cloud, conteneurs, automatisation, CI/CD, observabilité
- **Responsabilité partagée**, sans intitulé de poste universel
- **Git en équipe** : branches, PR/MR, revue, commits atomiques, SemVer
- **Infrastructure as Code** : déclaratif, plan, apply, idempotence ; Terraform et alternatives
- **Docker** : image, couche, registre, conteneur ; ordre des couches ; multi-stage
- **Compose** : orchestration locale multi-services
- **CNCF avant Kubernetes** : gouvernance, statuts de maturité, sans garantie absolue
- **Kubernetes** : cluster, node, pod, deployment, service — introduction seulement

<!--
Durée : 2 min.

Rappeler explicitement les limites du module sur Kubernetes : pas d'installation de cluster, pas de manifeste complexe, pas de TP évalué dessus — uniquement du vocabulaire de culture générale.

Transition : lancer le QCM de clôture de la séance 2.
-->

---
layout: qcm
duration: 18 min
questions: 20
cover: DevOps/DORA, Git (branche, PR/MR, commit, SemVer), Infrastructure as Code, Docker (image, couche, registre, bonnes pratiques), Compose, CNCF/Kubernetes (vocabulaire)
---

# QCM de clôture — Séance 2


<!--
Durée : 18 min (lancement 2 min, jeu 13 min, débrief 3 min) pour 20 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 20 questions de la section « Séance 2 » de `qcm-kahoot.md`, puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : ce quiz couvre un volume de notions plus large que celui de la séance 1 (DevOps, Git, Infrastructure as Code, Docker, cloud-native) — signaler explicitement les questions à réponses multiples avant de démarrer.

Exemple concret de question possible : "Quelle commande construit une image à partir d'un Dockerfile ?" (réponse attendue : `docker build`) — à adapter selon les questions réellement configurées dans le quiz.

Transition : débriefer collectivement les 1-2 questions les plus ratées, puis annoncer la séance 3 — CI/CD avec GitHub Actions et GitLab CI.
-->

---
layout: section-cover
section: Séance 3 — 3h
---

# CI/CD : GitHub Actions et GitLab CI

Automatiser l'installation, les tests et la fabrication de l'image

<!--
Durée : 1 min.

Annoncer le fil de la séance : comprendre l'anatomie commune d'un pipeline, puis la décliner sur GitHub Actions et GitLab CI, avant un TP qui construit un pipeline réel.

Exemple concret : rappeler que l'application Node.js et son Dockerfile existent déjà (séance 2) — cette séance ajoute la validation automatique.

Transition : retour sur l'image Docker et les erreurs fréquentes rencontrées.
-->

---

# Retour sur l'image Docker

<v-clicks>

- Votre Dockerfile fonctionne-t-il en local ?
- Erreurs fréquentes rencontrées : ordre des couches, port non exposé, cache cassé
- Aujourd'hui : cette même image sera **construite automatiquement** par un pipeline

</v-clicks>

<!--
Durée : 10 min (dont ~5 min d'échange collectif).

Tour de table rapide sur les difficultés rencontrées avec Docker depuis la séance 2. Objectif : lever les blocages résiduels avant d'ajouter une couche d'automatisation par-dessus.

Exemple concret : un port mal exposé qui donne l'impression que "l'API ne répond pas" alors que le conteneur tourne bien — diagnostic classique à rappeler.

Échange collectif approfondi : demander à chaque binôme de partager en une phrase la principale difficulté rencontrée sur son Dockerfile depuis la dernière séance, les noter au tableau, puis regrouper par catégorie (cache, port, permissions, taille d'image) pour montrer que les mêmes erreurs reviennent d'un groupe à l'autre — rassure et prépare le terrain avant d'ajouter l'automatisation CI par-dessus.

Transition : définir CI, livraison continue et déploiement continu.
-->

---

# CI, livraison continue, déploiement continu

<Tip type="info">
Les trois sigles se ressemblent mais désignent des niveaux d'automatisation différents.
</Tip>


<v-clicks>

- **CI (intégration continue)** — intégrer et valider le code souvent, automatiquement
- **Livraison continue** — le logiciel est prêt à être déployé, activation manuelle
- **Déploiement continu** — chaque changement validé part en production automatiquement

</v-clicks>

<!--
Durée : 18 min (dont ~9 min d'exemples commentés et de quiz oral).

Insister sur la nuance entre les deux "CD" : livraison continue (Continuous Delivery, activation humaine) et déploiement continu (Continuous Deployment, entièrement automatique).

Exemple concret : une équipe qui a une CI solide mais choisit une livraison continue plutôt qu'un déploiement continu pour garder un contrôle humain sur le moment de la mise en production — choix légitime, pas un signe d'immaturité.

Quiz oral en fil rouge : présenter 4-5 scénarios d'entreprise (startup qui déploie plusieurs fois par jour, banque qui valide manuellement chaque mise en production, éditeur SaaS avec feature flags...) et demander à la salle de classer chacun en CI seule / livraison continue / déploiement continu, en justifiant à l'oral. Ce format transforme la définition théorique en exercice de classification actif, suffisant pour occuper le bloc sans exercice écrit séparé.

Transition : détailler l'anatomie commune d'un pipeline.
-->

---

# Anatomie commune d'un pipeline

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Événement déclencheur] --> B[Job]
  B --> C[Étape 1]
  C --> D[Étape 2]
  D --> E[Statut : succès ou échec]
```

<v-clicks>

- **Événement** — ce qui déclenche le pipeline (push, pull request...)
- **Job** — un ensemble d'étapes exécutées sur un **runner**
- **Étape** — une action unitaire (installer, tester, construire...)
- **Artefact** — un résultat produit, réutilisable par une autre étape

</v-clicks>

<!--
Durée : 16 min (dont ~9 min d'exercice d'association de vocabulaire).

Ce vocabulaire est commun à GitHub Actions et GitLab CI, seuls les noms précis diffèrent légèrement (job/stage, runner/executor). L'objectif est de comprendre le concept avant la syntaxe.

Exemple concret : une image Docker construite dans un job peut être un artefact réutilisé dans un job de déploiement suivant — lien direct avec le pipeline cible de la séance.

Exercice d'association : distribuer (oralement ou au tableau) une liste mélangée de termes (événement, job, étape, runner, artefact, statut) et de définitions, et demander à des binômes de les associer correctement en 5 minutes, puis corriger ensemble terme par terme en s'appuyant sur le schéma — installe solidement le vocabulaire avant de voir sa déclinaison concrète sur GitHub Actions.

Transition : illustrer avec GitHub Actions.
-->

---

# GitHub Actions — anatomie d'un workflow

```yaml {all|1|3-5|7-15|all}
name: CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

<!--
Durée : 8 min (dont ~4 min de démonstration live).

Dérouler : `name` identifie le workflow, `on` définit le déclencheur, `jobs` contient les tâches, `runs-on` choisit le runner, `steps` liste les actions séquentielles.

Exemple concret : `uses:` appelle une action réutilisable du marketplace (`actions/checkout`, `actions/setup-node`), `run:` exécute une commande shell classique — les deux se combinent librement.

Démonstration live : ouvrir l'onglet Actions d'un dépôt GitHub réel (ou du dépôt fil rouge s'il en dispose déjà), déclencher ce workflow sur un commit, et suivre l'exécution en direct job par job jusqu'au statut vert — donne un premier repère visuel concret avant que les étudiants n'écrivent le leur en TP.

Transition : détailler les déclencheurs disponibles.
-->

---

# Déclencheurs GitHub Actions

| Déclencheur | Quand ? |
|---|---|
| `push` | Sur un commit poussé (filtrable par branche) |
| `pull_request` | À l'ouverture ou la mise à jour d'une pull request |
| `schedule` | À heure fixe (syntaxe cron) |
| `workflow_dispatch` | Déclenchement manuel depuis l'interface |

<!--
Durée : 6 min (dont ~3 min d'échange sur des cas d'usage).

Ces déclencheurs se combinent : `push` + `pull_request` est le pattern standard pour valider à la fois le développement et la revue.

Exemple concret : `workflow_dispatch` est utile pour un déploiement manuel volontaire, sans attendre un push.

Échange : demander à la salle quel déclencheur conviendrait pour chacun de ces cas — "vérifier chaque contribution externe avant fusion", "publier une release tous les lundis matin", "relancer un déploiement après un incident" — et faire justifier le choix à l'oral.

Transition : présenter les actions réutilisables et le cache.
-->

---

# Actions réutilisables et cache

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'
```

<v-clicks>

- Le **marketplace** fournit des actions prêtes à l'emploi (checkout, setup-node, docker/*)
- Épingler une version (`@v4`) plutôt que `@latest` — reproductibilité
- Le **cache** évite de réinstaller les dépendances à chaque exécution

</v-clicks>

<!--
Durée : 7 min (dont ~3 min de démonstration de gain de cache).

Le cache est un gain de temps concret et mesurable : sans cache, `npm ci` peut prendre une minute à chaque exécution ; avec cache, quelques secondes.

Exemple concret : la clé de cache est généralement basée sur le hash du fichier de verrouillage (`package-lock.json`) — elle change automatiquement dès que les dépendances changent, évitant un cache obsolète.

Démonstration : montrer, dans l'historique d'exécutions du workflow présenté plus tôt, la différence de durée entre un run à froid (sans cache) et un run suivant (avec cache restauré) — rend le gain tangible plutôt que théorique.

Transition : passer à GitLab CI en miroir.
-->

---

# GitLab CI — `.gitlab-ci.yml`

```yaml {all|1-4|6-11|all}
stages:
  - install
  - test

install:
  stage: install
  script:
    - npm ci

test:
  stage: test
  script:
    - npm test
```

<v-clicks>

- **Stages** — les grandes phases du pipeline, exécutées dans l'ordre
- **Jobs** — chaque bloc nommé (`install`, `test`) est un job rattaché à un stage
- **Runners** — les machines qui exécutent les jobs

</v-clicks>

<!--
Durée : 6 min (dont ~3 min de démonstration comparative).

Comparer directement avec GitHub Actions : `stages` ≈ ordre des jobs, `script` ≈ `run`, `runner` ≈ `runs-on`. Le vocabulaire diffère, les concepts sont identiques.

Exemple concret : une équipe qui utilise GitLab pour héberger son code utilisera naturellement GitLab CI, sans avoir besoin d'un outil tiers — l'intégration native est l'argument principal.

Démonstration comparative : ouvrir un projet GitLab avec ce pipeline et montrer la vue "Pipelines" avec ses stages exécutés côte à côte, en la mettant en parallèle visuellement avec la vue GitHub Actions montrée juste avant — souligne les concepts communs malgré des interfaces différentes.

Transition : détailler variables et particularités de GitLab CI.
-->

---

# GitLab CI — variables et comparaison

| Concept | GitHub Actions | GitLab CI |
|---|---|---|
| Fichier | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| Regroupement | `jobs` | `stages` + `jobs` |
| Machine d'exécution | `runs-on` (runner) | `tags` (runner) |
| Variable secrète | `secrets.NOM` | `Settings > CI/CD > Variables` |

<!--
Durée : 6 min (dont ~3 min de questions de clarification).

Ce tableau sert de pont mental entre les deux outils : un étudiant qui maîtrise l'un peut lire l'autre sans repartir de zéro.

Exemple concret : les variables protégées dans GitLab (masquées, restreintes à certaines branches) jouent le même rôle que les secrets GitHub — la logique de protection des informations sensibles est universelle en CI/CD.

Ouvrir un temps de questions de clarification avant le TP : demander à la salle si des points de comparaison restent flous entre les deux outils, en particulier sur la déclaration des variables sensibles — clarifie les derniers doutes avant que chacun choisisse son outil pour le TP.

Transition : pause avant le TP pipeline.
-->

---
layout: pause
duration: 20 min
---

<!--
Durée : 20 min de pause.

Rester disponible pour clarifier une confusion GitHub Actions / GitLab CI avant le TP.

Transition au retour : présenter le pipeline cible du TP (installation → tests → build → image Docker).
-->

---

# Le pipeline cible du TP

```mermaid {theme: 'base', themeVariables: {background: '#ffffff', primaryColor: '#f7f1ea', primaryTextColor: '#2b2620', primaryBorderColor: '#c1502e', lineColor: '#7a6f63', secondaryColor: '#e08a63', tertiaryColor: '#b45309', mainBkg: '#f7f1ea', nodeBorder: '#c1502e', clusterBkg: '#ffffff', clusterBorder: '#b45309', edgeLabelBackground: '#ffffff', arrowheadColor: '#7a6f63', textColor: '#2b2620'}}
graph LR
  A[Installation] --> B[Tests] --> C[Build applicatif] --> D[Build image Docker]
```

<v-clicks>

- Chaque étape valide la précédente avant de continuer
- Le **déploiement public n'est pas obligatoire** — construire l'image est le minimum commun
- Choix libre : **GitHub Actions ou GitLab CI**, l'autre outil est lu et comparé

</v-clicks>

<!--
Durée : 19 min (dont ~9 min de préparation d'environnement guidée).

Rappeler explicitement que l'objectif obligatoire s'arrête à la construction de l'image Docker — aucun credential ni configuration de déploiement n'est requis pour valider le TP.

Exemple concret : montrer un exemple de log de pipeline vert qui s'arrête après le build de l'image, pour donner une cible visuelle atteignable par tout le monde.

Préparation guidée avant le TP : laisser chaque étudiant/binôme choisir son outil (GitHub Actions ou GitLab CI), vérifier l'accès au dépôt fil rouge et aux droits d'exécution CI (runners activés côté GitLab, Actions activées côté GitHub), puis dérouler collectivement le repère YAML fourni ligne par ligne pour anticiper les questions avant que le chronomètre du TP ne démarre — évite de perdre du temps de TP sur des blocages d'accès plutôt que de compréhension.

Transition : lancer le TP guidé.
-->

---
layout: exercise
duration: 30 min
type: solo
---

# TP — pipeline installation → tests → build

<div class="grid grid-cols-2 gap-6 items-start">
<div>

## Mission

1. Choisir **GitHub Actions ou GitLab CI**
2. Écrire le pipeline : installation des dépendances → tests → build applicatif → build de l'image Docker
3. Déclencher le pipeline sur un commit
4. Lire les logs et confirmer un statut vert

</div>
<div>

## Repère YAML — GitHub Actions

<div class="text-xs">

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: docker/setup-buildx-action@v3
      ......
```

</div>
</div>
</div>

<!--
Durée : 30 min (temps du TP).

Circuler dans la salle, aider ceux qui bloquent sur une erreur de syntaxe YAML (indentation) ou de contexte Docker (`.` vs `./api`).

Exemple concret d'erreur fréquente : un `context:` pointant vers le mauvais dossier fait échouer le build Docker avec un message "Dockerfile introuvable" — vérifier le chemin en premier réflexe.

Transition : matrices, conditions et parallélisation, en survol.
-->

---

# Au-delà du pipeline simple — survol

<Tip type="warning">
Ces mécanismes restent hors du périmètre évalué en ING1 — vocabulaire de culture générale seulement.
</Tip>

<v-clicks>

- **Matrices** — exécuter le même job sur plusieurs versions/systèmes
- **Conditions** — n'exécuter une étape que si une condition est vraie
- **Parallélisation** — des jobs indépendants s'exécutent en même temps
- **Artefacts** — transmettre un résultat d'un job à un autre

</v-clicks>

<!--
Durée : 13 min (dont ~9 min d'exemples YAML commentés).

Rester très bref sur l'exigence de maîtrise : l'objectif est que les étudiants reconnaissent ces termes s'ils les croisent, sans exiger de maîtrise pratique à ce stade.

Exemple concret : une équipe qui teste sur plusieurs versions de Node.js en parallèle grâce à une matrice, plutôt que d'écrire un job dupliqué par version.

Illustrer chacun des 4 concepts par un court extrait YAML projeté (une matrice `strategy: matrix: node-version: [18, 20, 22]`, une condition `if: github.ref == 'refs/heads/main'`, deux jobs indépendants sans dépendance déclarée entre eux pour la parallélisation, un `actions/upload-artifact` pour l'artefact) sans demander de les écrire soi-même — donne une intuition concrète de chaque terme au-delà de sa seule définition, tout en respectant la limite volontaire du module.

Transition : synthèse de séance 3 puis QCM de clôture.
-->

---
layout: recap
section: Séance 3 — CI/CD, GitHub Actions et GitLab CI
---

# Ce qu'il faut retenir

- **CI / livraison continue / déploiement continu** : trois niveaux d'automatisation distincts
- **Anatomie commune** : événement, job, étape, runner, artefact, statut
- **GitHub Actions** : `on` / `jobs` / `steps` / `runs-on`, marketplace, cache
- **GitLab CI** : `stages` / `jobs` / `script`, runners, variables
- **Pipeline cible** : installation → tests → build applicatif → build image Docker
- **Checklist pipeline vert** : déclencheur correct, contexte d'étape, versions épinglées, cache actif, logs lisibles
- **Déploiement public** : bonus documenté, jamais une obligation

<!--
Durée : 2 min.

Reprendre collectivement, à l'oral, les erreurs les plus fréquentes vues pendant le TP (déclencheur mal filtré, contexte de build incorrect, version d'action non épinglée) en les rattachant à la checklist listée ci-dessus.

Transition : lancer le QCM de clôture de la séance 3.
-->

---
layout: qcm
duration: 18 min
questions: 20
cover: CI/livraison continue/déploiement continu, anatomie de pipeline, GitHub Actions, GitLab CI, pipeline installation → tests → build → image
---

# QCM de clôture — Séance 3



<!--
Durée : 18 min (lancement 2 min, jeu 13 min, débrief 3 min) pour 20 questions.

Lancement : avant la séance, créer le quiz Kahoot (ou équivalent) à partir des 20 questions de la section « Séance 3 » de `qcm-kahoot.md`, puis remplacer le bloc QR/PIN ci-dessus par le QR code et le PIN réels générés à cette occasion — le placeholder affiché n'est pas scannable.

Verbaliser avant de lancer : ce quiz vérifie la lecture d'un pipeline déclaratif (GitHub Actions et GitLab CI), pas la mémorisation exacte de la syntaxe YAML — questions à choix conceptuel plutôt que recopie de code ; signaler explicitement les questions à réponses multiples.

Exemple concret de question possible : "Quel mot-clé GitLab CI regroupe les jobs en étapes séquentielles ?" (réponse attendue : `stages`) — les 20 questions réelles sont dans `qcm-kahoot.md`.

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
