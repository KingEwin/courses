# QCM — Recette et Mise en Production (30 questions)

**Format** : QCM à choix multiple. Une ou plusieurs bonnes réponses par question.
**Notation** : poids positifs pour les bonnes réponses, 0 pour les mauvaises. Les poids négatifs (−) ne sont utilisés que sur les contre-vérités flagrantes (pièges grossiers).

**Total maximum** : 100 points

---

## Jour 1 — La Recette

---

### Q1. Le coût d'un bug détecté en production par rapport à un bug détecté en phase de développement est typiquement…

- A. Équivalent : un bug reste un bug `(0)`
- B. **2 à 3 fois plus élevé `(+1)`**
- C. **10 à 100 fois plus élevé `(+2)`**
- D. Légèrement inférieur car l'utilisateur le signale directement `(−1)`

**Bonne réponse** : C (B accepté partiellement). Le coût explose en aval — c'est tout l'argument du shift-left.

---

### Q3. Dans la pyramide des tests, quel type de test représente la base (plus nombreux, plus rapides) ?

- A. Tests end-to-end (E2E) `(0)`
- B. Tests d'intégration `(0)`
- C. **Tests unitaires `(+3)`**
- D. Tests exploratoires manuels `(0)`

**Bonne réponse** : C.

---

### Q4. Le shift-left testing consiste à :

- A. Déplacer les tests en fin de cycle pour gagner du temps `(−1)`
- B. **Tester le plus tôt possible dans le cycle de développement `(+3)`**
- C. Confier les tests uniquement à une équipe QA dédiée `(0)`
- D. Réduire le nombre de tests pour accélérer les releases `(0)`

**Bonne réponse** : B.

---

### Q5. Lesquelles de ces affirmations sur la couverture de code sont vraies ?

- A. **100% de couverture ne garantit pas l'absence de bugs `(+1)`**
- B. **La couverture mesure le code exécuté par les tests, pas la qualité des assertions `(+2)`**
- C. Une couverture élevée prouve que l'application est sans bug `(−1)`
- D. **La couverture est un indicateur, pas un objectif en soi `(+1)`**

**Bonnes réponses** : A, B, D.

---

### Q6. Le procès-verbal de recette (PV) sert principalement à :

- A. **Tracer formellement l'acceptation ou le refus de la livraison `(+2)`**
- B. **Engager la responsabilité du client et du fournisseur `(+1)`**
- C. Servir de support de formation pour les nouveaux développeurs `(0)`
- D. Remplacer la documentation technique du projet `(0)`

**Bonnes réponses** : A, B.

---

### Q8. Un test E2E flaky (instable) est un test qui :

- A. **Réussit ou échoue de manière non déterministe sur le même code `(+3)`**
- B. Est trop lent à exécuter `(0)`
- C. Couvre trop de fonctionnalités à la fois `(0)`
- D. Ne couvre aucune assertion `(0)`

**Bonne réponse** : A.

---

### Q10. Pour la gestion des données de test, lesquelles de ces pratiques sont recommandées ?

- A. **Utiliser des données anonymisées si elles proviennent de la prod `(+1)`**
- B. **Utiliser des factories/fixtures pour isoler chaque test `(+1)`**
- C. **Réinitialiser l'état entre les tests pour garantir l'indépendance `(+1)`**
- D. Utiliser directement la base de production pour rester réaliste `(−2)`

**Bonnes réponses** : A, B, C. Utiliser la prod directement viole le RGPD et casse l'isolation.

---

### Q11. Une quality gate dans une CI…

- A. **Bloque le passage à l'étape suivante si un critère n'est pas rempli `(+2)`**
- B. **Doit être rapide, déterministe et avec un message d'erreur clair `(+1)`**
- C. Est obligatoirement humaine et manuelle `(0)`
- D. Doit être désactivée si elle devient gênante `(−1)`

**Bonnes réponses** : A, B.

---

### Q13. Dans un pipeline CI/CD bien conçu, un artefact (build) est :

- A. **Construit une fois et promu d'environnement en environnement `(+3)`**
- B. Reconstruit à chaque déploiement, avec les variables d'environnement de la cible `(−1)`
- C. Une simple copie du code source `(0)`
- D. Un document de spécification fonctionnelle `(0)`

**Bonne réponse** : A. Rebuilder en prod = anti-pattern majeur (variables qui changent le comportement).

---

### Q14. Parmi ces contrôles de sécurité dans un pipeline, lequel s'exécute sur l'application en cours d'exécution (runtime) ?

- A. SAST `(0)`
- B. **DAST `(+3)`**
- C. Dependency scanning `(0)`
- D. Secret scanning `(0)`

**Bonne réponse** : B. SAST = analyse statique du code, DAST = dynamique (runtime).

---

### Q15. Une stratégie blue/green se caractérise par :

- A. **Deux environnements identiques, bascule du trafic en une fois `(+2)`**
- B. **Rollback très rapide (re-bascule sur l'ancien environnement) `(+1)`**
- C. Mise à jour progressive instance par instance `(0)`
- D. Trafic envoyé d'abord à 1% des utilisateurs puis augmenté `(0)`

**Bonnes réponses** : A, B. C = rolling, D = canary.

---

### Q16. Une stratégie canary se caractérise par :

- A. **Déploiement à un sous-ensemble d'utilisateurs avant déploiement complet `(+2)`**
- B. **Permet de détecter un problème avant qu'il impacte 100% des users `(+1)`**
- C. Nécessite deux environnements complets en parallèle `(0)`
- D. Identique à blue/green `(−1)`

**Bonnes réponses** : A, B.

---

### Q17. Un feature flag permet de :

- A. **Activer/désactiver une fonctionnalité sans redéployer `(+2)`**
- B. **Déployer du code en prod tout en gardant la feature désactivée `(+1)`**
- C. Remplacer entièrement les tests automatisés `(0)`
- D. Compiler le code plus rapidement `(0)`

**Bonnes réponses** : A, B.

---

### Q18. Qu'est-ce qu'un SLI (Service Level Indicator) ?

- A. **Une métrique mesurable qui reflète la qualité du service `(+3)`**
- B. Un engagement contractuel avec un client `(0)`
- C. Un objectif interne d'équipe `(0)`
- D. Un outil de monitoring `(0)`

**Bonne réponse** : A. SLA = contrat, SLO = objectif interne, SLI = la mesure.

---

### Q19. Si on définit un SLO de 99.9% de disponibilité sur 30 jours, l'error budget mensuel est d'environ :

- A. 7h 12 min `(0)`
- B. 3h 36 min `(0)`
- C. **43 min `(+3)`**
- D. 4 min 19 s `(0)`

**Bonne réponse** : C. 99.9% → 0.1% de 43 200 min ≈ 43 min.

---

### Q20. L'error budget est utile pour :

- A. **Arbitrer entre vitesse de livraison et stabilité `(+2)`**
- B. **Créer un dialogue entre tech et produit `(+1)`**
- C. Sanctionner l'équipe quand il est dépassé `(−1)`
- D. Remplacer le monitoring `(0)`

**Bonnes réponses** : A, B. Le budget est un outil de dialogue, pas une punition.

---

### Q21. Les 3 piliers de l'observabilité sont :

- A. **Logs, métriques, traces `(+3)`**
- B. Dashboards, alertes, rapports `(0)`
- C. SLA, SLO, SLI `(0)`
- D. Build, test, deploy `(0)`

**Bonne réponse** : A.

---

### Q24. Dans une culture blameless de post-mortem, on cherche en priorité :

- A. **À identifier les défaillances systémiques `(+2)`**
- B. **À apprendre collectivement de l'incident `(+1)`**
- C. Le responsable individuel pour le sanctionner `(−2)`
- D. À masquer l'incident en interne `(−2)`

**Bonnes réponses** : A, B.

---

### Q25. Un rollback efficace doit :

- A. **Redéployer un artefact précédent versionné (et non rebuilder) `(+2)`**
- B. **Être testé régulièrement pour rester opérationnel `(+1)`**
- C. Nécessiter une décision du CTO avant exécution `(0)`
- D. Être déclenché uniquement le lendemain matin `(−2)`

**Bonnes réponses** : A, B.

---

### Q26. Parmi ces problèmes, lesquels sont caractéristiques d'un pipeline défaillant (du type "push direct sur main → build → deploy prod") ?

- A. **Absence de tests automatisés `(+1)`**
- B. **Pas d'environnement de staging `(+1)`**
- C. **Pas de stratégie de rollback `(+1)`**
- D. **Vérification manuelle a posteriori `(+1)`**

**Bonnes réponses** : A, B, C, D — les 4 sont des défauts majeurs.

---

### Q27. L'Infrastructure as Code (IaC) apporte principalement :

- A. **Reproductibilité et traçabilité des changements d'infrastructure `(+2)`**
- B. **Possibilité de versionner et reviewer l'infra comme du code `(+1)`**
- C. Une accélération automatique des serveurs `(0)`
- D. La suppression complète des opérations manuelles `(0)`

**Bonnes réponses** : A, B.

---

### Q28. Lors de la gestion d'un incident en production, quel est l'ordre correct des phases ?

- A. **Détection → Triage → Communication → Résolution → Post-mortem `(+3)`**
- B. Post-mortem → Détection → Résolution → Triage `(0)`
- C. Communication → Résolution → Détection → Triage `(0)`
- D. Résolution → Triage → Détection → Communication `(0)`

**Bonne réponse** : A.

---

### Q30. Dans une supply chain attack (attaque de la chaîne d'approvisionnement logicielle), l'attaquant cible :

- A. **Une dépendance tierce (bibliothèque, package) utilisée par la cible finale `(+2)`**
- B. **Un outil de build ou de CI pour injecter du code malveillant `(+1)`**
- C. Le réseau interne du fournisseur de cloud uniquement `(0)`
- D. Les utilisateurs finaux par phishing `(0)`

**Bonnes réponses** : A, B.

---

## Récapitulatif notation

- **Total maximum** : 100 points
- Répartition indicative :
  - J1 (Q1-Q12) : ~36 points
  - J2 (Q13-Q30) : ~64 points
- **Barème conseillé**
  - ≥ 80 : excellent
  - 60–79 : maîtrise solide
  - 40–59 : acquis partiel, à consolider
  - < 40 : à reprendre
