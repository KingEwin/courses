# QCM — Tests et Déploiement (ING1) — 40 questions

Format : QCM à choix unique ou multiple. Une ou plusieurs bonnes réponses par question.
Notation : poids positifs pour les bonnes réponses, 0 pour les neutres. Les poids négatifs (−) ne sont utilisés que sur les contre-vérités flagrantes. Pour les questions à choix multiple, les points de chaque option cochée s'additionnent ; on conseille un plancher à 0 par question.

Total maximum (banque complète) : 113 points
Couverture : DJ1 (Q1–13), DJ2 (Q14–26), DJ3 (Q27–40)
Sélection examen : l'instructeur retient ~30 questions ; recalculer le total de la sélection pour le barème.

---

## DJ1 — Stratégie de test + tests unitaires Jest

---

### Q1. Dans la pyramide des tests, quel niveau doit contenir le plus de tests ?

- A. Tests end-to-end (E2E) `(0)`
- B. Tests d'intégration `(0)`
- C. Tests unitaires `(+2)`
- D. Tests manuels exploratoires `(0)`

Réponse : C.

---

### Q2. L'anti-pattern de la pyramide de tests désigne une suite de tests qui contient :

- A. Beaucoup d'unitaires et peu d'E2E `(0)`
- B. Beaucoup d'E2E et peu d'unitaires `(+3)`
- C. Uniquement des tests d'intégration `(0)`
- D. Aucun test automatisé `(0)`

Réponse : B. Suite lente, flaky, bugs détectés tard.

---

### Q3. Le coût d'un bug détecté en production, par rapport à un bug détecté en développement, est typiquement :

- A. Équivalent : un bug reste un bug `(0)`
- B. 2 à 5 fois plus élevé `(+1)`
- C. 10 à 100 fois plus élevé `(+2)`
- D. Inférieur, car l'utilisateur le signale directement `(−1)`

Réponse : C (B accepté partiellement). C'est l'argument du shift-left.

---

### Q4. Parmi ces affirmations sur les critères FIRST, lesquelles sont correctes ?

- A. F = Fast : un test s'exécute en millisecondes, pas en secondes `(+1)`
- B. I = Isolated : un test ne dépend pas d'un autre `(+1)`
- C. R = Repeatable : même résultat à chaque exécution, partout `(+1)`
- D. T = Typed : le test doit être écrit en TypeScript `(−1)`
- E. S = Self-validating : verdict pass/fail clair, sans lecture de logs `(+1)`
- F. R = Random : les données d'un test doivent être tirées au hasard `(−1)`

Réponses : A, B, C, E. Le T signifie Timely.

---

### Q5. Le cycle TDD est :

- A. Refactor → Red → Green `(0)`
- B. Green → Red → Refactor `(0)`
- C. Red → Green → Refactor `(+2)`
- D. Test → Code → Deploy `(0)`

Réponse : C. Green = écrire le code minimal qui fait passer le test.

---

### Q6. Dans quels contextes le TDD est-il plutôt adapté ?

- A. Logique métier complexe / algorithmes `(+1)`
- B. Reproduire un bug avant de le corriger `(+1)`
- C. Spike / prototype jetable `(0)`
- D. UI exploratoire remaniée sans cesse `(0)`
- E. Refactoring de code legacy `(+1)`
- F. Tout projet sans exception `(−1)`

Réponses : A, B, E.

---

### Q7. Le shift-left testing consiste à :

- A. Reporter les tests en fin de cycle pour livrer plus vite `(−1)`
- B. Tester le plus tôt possible dans le cycle de développement `(+2)`
- C. Confier tous les tests à une équipe QA séparée `(0)`
- D. Supprimer les tests lents pour accélérer la CI `(0)`

Réponse : B.

---

### Q8. Le pattern AAA pour structurer un test est :

- A. Assert / Act / Analyse `(0)`
- B. Arrange / Act / Assert `(+2)`
- C. Arrange / Assert / Act `(0)`
- D. Action / Assertion / Acceptance `(0)`

Réponse : B. Un bon test ne contient qu'une seule action « Act ».

---

### Q9. Que se passe-t-il à l'exécution de ce test ?

```ts
expect({ id: 1, name: 'Alice' }).toBe({ id: 1, name: 'Alice' });
```

- A. Le test passe car les objets ont le même contenu `(0)`
- B. Le test échoue : toBe compare par référence, il faut toEqual `(+3)`
- C. Erreur de syntaxe : `toBe` n'accepte pas d'objet en argument `(0)`
- D. Le test passe car la propriété `id` est identique `(0)`

Réponse : B.

---

### Q12. Pour la condition `if (a && b) { ... }`, combien de branches faut-il couvrir au minimum ?

- A. 1 `(0)`
- B. 2 `(0)`
- C. 4 `(+3)`
- D. 8 `(0)`

Réponse : C.

---

### Q13. Pourquoi une couverture de lignes à 100% ne garantit pas l'absence de bugs ?

- A. Une ligne exécutée n'est pas forcément assertée (100% possible sans un seul expect) `(+1)`
- B. La couverture ne dit rien des cas non écrits (ex. valeurs limites oubliées) `(+1)`
- C. La couverture ne mesure pas la qualité des assertions `(+1)`
- D. Parce qu'Istanbul compte mal les lignes `(−1)`
- E. La couverture est une preuve d'absence de bug `(−1)`

Réponses : A, B, C. La couverture est un signal, pas une garantie.

---

## DJ2 — Tests d'intégration + E2E

---

### Q14. Lequel est un test d'intégration typique ?

- A. Tester formatDate(d) avec 5 dates `(0)`
- B. Démarrer l'app, envoyer POST /events vers une vraie DB SQLite et vérifier l'insertion `(+2)`
- C. Cliquer sur « S'inscrire » dans le navigateur et vérifier l'écran de bienvenue `(0)`
- D. Compiler le code TypeScript `(0)`

Réponse : B. (A = unitaire, C = E2E.)

---

### Q15. Quels signaux indiquent qu'un test devrait monter d'un cran (unitaire → intégration) ?

- A. On doit mocker 5+ dépendances pour un seul test unitaire `(+1)`
- B. Le bug recherché vit entre deux modules `(+1)`
- C. On teste une route d'API REST `(+1)`
- D. On teste une fonction pure de formatage de date `(0)`
- E. Le test prend 2 millisecondes `(0)`
- F. Tout test unitaire qui échoue doit être réécrit en test d'intégration `(−1)`

Réponses : A, B, C.

---

### Q17. Pourquoi recréer une base SQLite :memory: dans un beforeEach plutôt que partager une DB entre tous les tests ?

- A. Pour économiser de la RAM `(0)`
- B. Parce que SQLite ne supporte pas le partage `(0)`
- C. Pour garantir l'isolation `(+3)`
- D. Pour accélérer l'écriture sur disque `(0)`

Réponse : C.

---

### Q18. beforeEach s'exécute :

- A. Une seule fois, avant tous les tests du fichier `(0)`
- B. Avant chaque it() du bloc describe `(+2)`
- C. Après chaque test `(0)`
- D. Uniquement si un test échoue `(0)`

Réponse : B. (beforeAll s'exécute une seule fois.)

---

### Q19. Concernant la parallélisation dans Jest, quelles affirmations sont vraies ?

- A. Jest exécute les fichiers de test en parallèle (workers) `(+1)`
- B. Les tests à l'intérieur d'un même fichier s'exécutent séquentiellement `(+1)`
- C. Une DB partagée sur disque entre workers peut provoquer des conflits `(+1)`
- D. --runInBand augmente le parallélisme `(−1)`
- E. La parallélisation est impossible en TypeScript `(−1)`

Réponses : A, B, C. --runInBand force au contraire le séquentiel.

---

### Q20. Que teste-t-on ici ?

```ts
const res = await request(app).post('/login').send({ user: 'a' });
expect(res.status).toBe(401);
```

- A. Que le login réussit `(0)`
- B. Que l'API rejette le login `(+3)`
- C. Que le serveur démarre sur le port 401 `(0)`
- D. Que app est défini `(0)`

Réponse : B.

---

### Q21. Quel sélecteur Cypress est le plus robuste face à un refactor du style/CSS ?

- A. cy.get('.btn-primary') `(0)`
- B. cy.get('button:nth-child(2)') `(0)`
- C. cy.get('[data-testid="submit"]') `(+3)`
- D. cy.get('div > span > a') `(0)`

Réponse : C.

---

### Q23. Quels patterns sont déconseillés dans un test Cypress ?

- A. cy.wait(5000) pour attendre une réponse API `(+1)`
- B. Des sélecteurs CSS instables (.btn-primary-2-active) `(+1)`
- C. Des tests qui dépendent les uns des autres `(+1)`
- D. Utiliser data-testid `(−1)`
- E. Écrire un E2E pour une simple validation de formulaire `(+1)`
- F. Attendre explicitement une requête réseau avec cy.intercept `(−1)`

Réponses : A, B, C, E.

---

### Q24. Quelles sont des causes fréquentes de tests flaky en E2E ?

- A. Timing : animations ou requêtes async non attendues `(+1)`
- B. État partagé : DB non resetée entre tests `(+1)`
- C. Données aléatoires (IDs, dates, ordre de tri) `(+1)`
- D. Trop de data-testid dans le HTML `(−1)`
- E. Différences d'environnement (viewport, fuseau horaire) `(+1)`
- F. Des assertions explicites sur un texte fixe attendu `(−1)`

Réponses : A, B, C, E.

---

### Q25. Quels sont des avantages de Playwright par rapport à Cypress ?

- A. Support natif multi-onglets `(+1)`
- B. Plusieurs langages (JS/TS, Python, Java, .NET) `(+1)`
- C. Gestion native du multi-domaines `(+1)`
- D. Il est le seul à supporter data-testid `(−1)`
- E. Il rend les tests E2E inutiles `(−1)`

Réponses : A, B, C.

---

### Q26. Quel est le meilleur candidat à un test end-to-end ?

- A. La fonction formatPrice(1234.5) `(0)`
- B. Le parcours critique inscription + paiement `(+3)`
- C. Le changement de couleur d'un bouton au survol `(0)`
- D. La validation d'un champ email `(0)`

Réponse : B. On réserve les E2E aux parcours critiques business.

---

## DJ3 — CI/CD et stratégies de déploiement

---

### Q27. Quelle est la différence entre Continuous Delivery et Continuous Deployment ?

- A. Aucune, ce sont deux synonymes du même processus `(0)`
- B. En Delivery, l'artefact est prêt et un humain déclenche la prod ; en Deployment, la mise en prod est automatique si les tests passent `(+3)`
- C. En Delivery, aucun test automatisé ne tourne avant la mise en production `(0)`
- D. Deployment ne concerne que l'environnement de staging, jamais la prod `(0)`

Réponse : B.

---

### Q28. Quand ce workflow se déclenche-t-il ?

```yaml
on:
  pull_request:
    branches: [main]
```

- A. À chaque push sur n'importe quelle branche du dépôt `(0)`
- B. À l'ouverture/mise à jour d'une PR qui cible main `(+2)`
- C. Une fois par jour, via une planification de type cron `(0)`
- D. Manuellement uniquement, via un bouton dans l'interface `(0)`

Réponse : B.

---

### Q29. Quelles affirmations sur les concepts d'un pipeline sont correctes ?

- A. Un artefact est buildé une seule fois puis promu d'un environnement à l'autre `(+1)`
- B. Un gate est un contrôle bloquant avant de passer à l'étape suivante `(+1)`
- C. Le rollback est le retour rapide à une version saine connue `(+1)`
- D. Il faut rebuilder l'artefact à chaque environnement pour garantir sa fraîcheur `(−1)`
- E. On privilégie des incréments petits et fréquents plutôt que de gros lots rares `(+1)`
- F. Un pipeline doit déployer en prod sans aucune étape intermédiaire `(−1)`

Réponses : A, B, C, E. Rebuilder par environnement = anti-pattern.

---

### Q30. Pourquoi cacher les dépendances (npm) dans le pipeline ?

- A. Pour éviter de committer le dossier node_modules dans le dépôt `(0)`
- B. Pour réduire le temps d'installation des dépendances entre runs `(+2)`
- C. C'est obligatoire dans GitHub Actions `(0)`
- D. Pour économiser l'espace disque local de la machine du développeur `(0)`

Réponse : B. npm ci peut passer de ~1-2 min à ~10-20 s.

---

### Q32. À propos des jobs GitHub Actions, quelles affirmations sont vraies ?

- A. Par défaut, les jobs s'exécutent en parallèle `(+1)`
- B. needs: permet d'imposer un ordre entre jobs `(+1)`
- C. Chaque job tourne dans un runner neuf (pas de partage de fichiers implicite) `(+1)`
- D. Les steps d'un même job s'exécutent en parallèle `(−1)`
- E. Un job ne peut pas devenir un status check sur la PR `(−1)`

Réponses : A, B, C. Les steps sont séquentiels ; chaque job = un check.

---

### Q33. Le gating dans un pipeline signifie :

- A. Ouvrir automatiquement un ticket d'incident dans l'outil de suivi `(0)`
- B. Bloquer la suite du pipeline si une condition n'est pas remplie `(+3)`
- C. Verrouiller le dépôt Git en lecture seule pendant le build `(0)`
- D. Limiter le nombre de runs simultanés sur le même runner `(0)`

Réponse : B.

---

### Q34. Lesquelles font partie des 4 métriques DORA ?

- A. Deployment Frequency (fréquence de déploiement) `(+1)`
- B. Lead Time for Changes (délai commit → prod) `(+1)`
- C. Change Failure Rate (% de déploiements causant un incident) `(+1)`
- D. MTTR (temps de rétablissement après incident) `(+1)`
- E. Nombre de lignes de code par développeur `(−1)`
- F. Score de couverture de tests du dépôt `(−1)`

Réponses : A, B, C, D.

---

### Q35. Quel est l'avantage principal d'un déploiement blue/green ?

- A. Il divise par deux le coût d'infrastructure `(0)`
- B. Bascule et rollback quasi-instantanés `(+2)`
- C. Il supprime le besoin de tests `(0)`
- D. Il ne nécessite pas de base de données `(0)`

Réponse : B.

---

### Q36. Une release canary consiste à :

- A. Déployer la version sur tous les serveurs en parallèle, d'un seul coup `(0)`
- B. Déployer la nouvelle version sur un % du trafic, puis augmenter progressivement `(+2)`
- C. Déployer uniquement le vendredi soir, en dehors des heures de pointe `(0)`
- D. Déployer la version dans un conteneur totalement isolé du reste `(0)`

Réponse : B.

---

### Q37. Parmi ces stratégies, laquelle a le coût d'infrastructure le plus élevé pendant le déploiement (≈ 2× les ressources) ?

- A. Rolling update `(0)`
- B. Canary `(0)`
- C. Blue/Green `(+3)`
- D. Feature flag `(0)`

Réponse : C.

---

### Q38. Concernant les migrations de base de données lors d'un déploiement, quelles affirmations sont correctes ?

- A. L'ordre recommandé est : BDD → backend → frontend `(+1)`
- B. Les migrations doivent rester rétro-compatibles `(+1)`
- C. Déployer le frontend avant l'API est la bonne pratique `(−1)`
- D. On procède en deux temps : étendre le schéma, puis nettoyer `(+1)`
- E. Avec une migration non rétro-compatible, un rolling update se passe toujours bien `(−1)`

Réponses : A, B, D.

---

### Q39. Quels sont des bénéfices réels des feature flags ?

- A. Découpler le déploiement de la release `(+1)`
- B. Kill switch : désactiver une feature buggée sans redéployer `(+1)`
- C. Activation sélective et A/B testing `(+1)`
- D. Ils remplacent les tests unitaires `(−1)`
- E. Ils garantissent 100% de couverture de code `(−1)`

Réponses : A, B, C. Attention à la dette de flag.

---

### Q40. Une équipe veut livrer une nouvelle version à 5% des utilisateurs, surveiller les métriques (erreurs, latence) en conditions réelles, puis monter progressivement à 100%. Quelle stratégie est la plus adaptée ?

- A. Blue/Green `(0)`
- B. Canary release `(+3)`
- C. Big bang (100% d'un coup) `(−1)`
- D. Rollback automatique `(0)`

Réponse : B.

---

## Récapitulatif notation

- Total maximum (banque complète) : 113 points
  - DJ1 (Q1–13) : 36 points
  - DJ2 (Q14–26) : 38 points
  - DJ3 (Q27–40) : 39 points
- Choix unique : Q1, Q2, Q3, Q5, Q7, Q8, Q9, Q11, Q12, Q14, Q16, Q17, Q18, Q20, Q21, Q22, Q26, Q27, Q28, Q30, Q31, Q33, Q35, Q36, Q37, Q40 (26)
- Choix multiple : Q4, Q6, Q10, Q13, Q15, Q19, Q23, Q24, Q25, Q29, Q32, Q34, Q38, Q39 (14)
- Barème conseillé (en % du total de la sélection retenue) :
  - ≥ 85% : excellente maîtrise
  - 70–84% : bonne maîtrise
  - 50–69% : acquis avec lacunes ciblées
  - < 50% : reprendre les notions clés (pyramide, mocking, CI/CD, stratégies de déploiement)
</content>
