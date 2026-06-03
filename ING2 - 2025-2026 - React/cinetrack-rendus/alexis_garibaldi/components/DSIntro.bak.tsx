"use client";

// =============================================================================
// DSIntro — Intro animée (style "boot DS") jouée à la 1re visite
// -----------------------------------------------------------------------------
// Étapes de l'animation :
//   1) Le logo cinetrack tombe du haut de l'écran jusqu'au centre (translation Y).
//   2) Pause d'1 seconde, logo immobile au centre.
//   3) Le logo se "wipe" de droite à gauche (effet de balayage clip-path).
//   4) Une fois le logo disparu, le fond noir du composant fond vers le blanc
//      progressivement → le contenu de la page (blanc) "apparaît" derrière.
//   5) onComplete est appelé : le parent peut alors démonter l'intro.
// =============================================================================

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type Props = {
  /** Callback déclenché une fois toute la timeline terminée. */
  onComplete?: () => void;
};

export default function DSIntro({ onComplete }: Props) {
  // -- Refs DOM ----------------------------------------------------------------
  // GSAP ne sélectionne pas via querySelector dans React — on lui donne des
  // refs directes pour que les tweens ciblent les bons noeuds, même si plusieurs
  // <DSIntro /> coexistent dans le DOM.
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // -------------------------------------------------------------------------
    // gsap.context() : crée un "scope" pour tous les tweens créés à l'intérieur.
    //   - Avantage 1 : les sélecteurs string ("." ou "#") sont scopés au container
    //     (ici containerRef.current), donc pas de collision avec d'autres éléments.
    //   - Avantage 2 : `ctx.revert()` au cleanup tue TOUS les tweens d'un coup et
    //     restaure les valeurs initiales — indispensable avec React 19 / StrictMode
    //     qui monte les composants 2 fois en dev (sinon : animations dupliquées).
    // -------------------------------------------------------------------------
    const ctx = gsap.context(() => {
      // -----------------------------------------------------------------------
      // gsap.timeline() : orchestrateur séquentiel.
      //   - Chaque .to() / .from() / .set() s'enchaîne après le précédent par défaut.
      //   - `defaults` factorise des options communes à tous les tweens enfants.
      //   - `onComplete` se déclenche quand TOUTE la timeline est finie.
      // -----------------------------------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => onComplete?.(),
      });

      // -----------------------------------------------------------------------
      // 1) ÉTAT INITIAL — gsap.set() : applique des propriétés instantanément
      //    (équivalent d'un style inline, mais piloté par GSAP qui sait ensuite
      //    les animer correctement). Pas de durée, pas de transition.
      //
      //    - y: "-100vh" → on pousse le logo 1 hauteur d'écran AU-DESSUS du
      //      viewport. GSAP convertit la string en pixels au moment du tween.
      //      Avantage vs. CSS : GSAP combine y/x/rotation/scale en UNE seule
      //      transform matrix (perfs + pas de conflit avec d'autres tweens).
      //    - clipPath "inset(0 0% 0 0)" → aucun clipping (logo entièrement visible).
      //      `inset(top right bottom left)` : on animera le `right` plus tard.
      //    - opacity: 1 → on garde le logo opaque ; c'est le clipPath qui le
      //      fera disparaître, pas un fondu classique.
      // -----------------------------------------------------------------------
      tl.set(logoRef.current, {
        y: "-100vh",
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
      });

      // De même, le container démarre en fond NOIR. On animera vers blanc à la fin.
      tl.set(containerRef.current, {
        backgroundColor: "#000000",
      });

      // -----------------------------------------------------------------------
      // 2) CHUTE DU LOGO : translateY de -100vh → 0
      //    .to(target, vars) anime DEPUIS la valeur courante VERS `vars`.
      //    - duration: 0.9s → temps de chute.
      //    - ease: "power3.out" → décélération forte en fin de course.
      //      C'est ce qui donne la sensation "tombe et s'arrête net" plutôt
      //      qu'un mouvement linéaire mécanique.
      // -----------------------------------------------------------------------
      tl.to(logoRef.current, {
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      // -----------------------------------------------------------------------
      // 3) PAUSE D'1 SECONDE
      //    Plusieurs façons de faire une pause sur une timeline GSAP :
      //      a) `delay: 1` sur le tween suivant (ce qu'on fait plus bas).
      //      b) tl.to({}, { duration: 1 }) → tween "vide" qui consomme du temps.
      //      c) tl.addLabel("pause", "+=1") → label décalé d'1s.
      //    On utilise (a) car c'est le plus lisible ici.
      // -----------------------------------------------------------------------

      // -----------------------------------------------------------------------
      // 4) WIPE DROITE → GAUCHE via clipPath
      //    `clipPath: inset(top right bottom left)` rogne le logo depuis chaque
      //    bord. En passant `right` de 0% à 100%, on rogne progressivement TOUT
      //    le logo en partant du bord DROIT — la partie visible (à gauche) rétrécit
      //    jusqu'à disparaître. Effet : un "rideau" qui balaye de droite vers gauche.
      //
      //    Astuce : GSAP interpole les clipPath string-to-string si la forme
      //    (inset/circle/polygon) reste identique entre les deux états.
      // -----------------------------------------------------------------------
      tl.to(logoRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.7,
        ease: "power1.inOut",
        delay: 1, // pause d'1s entre la chute et le wipe
      });

      // -----------------------------------------------------------------------
      // 5) RÉVÉLATION DU FOND BLANC
      //    Une fois le logo wipé, on fait fondre le background du container
      //    de noir vers blanc. Visuellement, le contenu blanc "apparaît"
      //    progressivement à la place de l'écran d'intro.
      //
      //    "<" en position : démarre EN MÊME TEMPS que le tween précédent.
      //    "<+=0.3" : démarre 0.3s APRÈS le début du précédent.
      //    On utilise "<" pour synchroniser le fondu avec la fin du wipe et
      //    enchaîner sans temps mort visible.
      // -----------------------------------------------------------------------
      tl.to(
        containerRef.current,
        {
          backgroundColor: "#ffffff",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<+=0.2", // commence 0.2s après le début du wipe
      );
    }, containerRef);

    // ctx.revert() : nettoyage au démontage — tue les tweens en cours et
    // restaure les valeurs initiales. Évite les fuites mémoire et les bugs
    // de double-animation en dev (StrictMode).
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      // fixed inset-0 = overlay plein écran ; z-50 pour passer au-dessus du reste.
      // pointer-events-none = laisse les clics passer une fois invisible (sécurité).
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div
        ref={logoRef}
        className="relative w-[480px] max-w-[80vw]"
        // will-change : hint au navigateur pour préparer la couche GPU.
        // GSAP est efficace sans, mais ça lisse les premiers frames.
        style={{ willChange: "transform, clip-path" }}
      >
        <Image
          src="/cinetrack_logo.png"
          alt="cinetrack G4"
          width={1024}
          height={512}
          priority
          className="w-full h-auto select-none"
        />
      </div>
    </div>
  );
}