"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type Props = {
  onComplete?: () => void;
};

export default function DSIntro({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cinetrackRef = useRef<HTMLDivElement>(null);
  const blackCubeRef = useRef<HTMLDivElement>(null);
  const grayCubeRef = useRef<HTMLDivElement>(null);

  const PARTICLE_COUNT = 6;
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  const CUBE_X_OFFSET = 40;
  const CUBE_Y_OFFSET = 2;

  useEffect(() => {
    // Lecture du son d'intro dès que le composant est monté.
    // .play() retourne une Promise — peut être rejetée si le navigateur bloque
    // l'autoplay (ex : aucune interaction utilisateur préalable).
    // On catch silencieusement pour ne pas crasher l'animation visuelle.
    const audio = new Audio("/intro_sound.mp3");
    audio.play().catch(() => {});

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => onComplete?.(),
      });

      tl.set(containerRef.current, {
        backgroundColor: "#fdfdfd", // Blanc
        z: 0
      });
      tl.set(logoRef.current, {
        opacity: 0,
        clipPath: "inset(0 100% 0 0)", // Depuis la gauche
      });

      const particles = particlesRef.current;

      gsap.set(particles.filter(Boolean), {
        xPercent: -50,
        yPercent: -50,
        x: CUBE_X_OFFSET,
        y: -10 + CUBE_Y_OFFSET,
        opacity: 0,
      });

      tl.set([blackCubeRef.current, grayCubeRef.current], {
        x: CUBE_X_OFFSET,
        scale:0.06
      });

      tl.set(blackCubeRef.current, {
         y: screen.height,
      });
      tl.set(grayCubeRef.current, {
        y: -screen.height,
      });

      // Reveal avec clippath
      tl.to(logoRef.current, {
        opacity: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 0.4,
        ease: "power1.out",
        delay: 1
      });
      tl.to(blackCubeRef.current, {
        y: 10 + CUBE_Y_OFFSET,
        duration: 0.9,
      },"<-=0.3",
    );
      tl.to(grayCubeRef.current, {
          y: -10 + CUBE_Y_OFFSET,
          duration: 0.9,
        },"<", // "<" = start au meme moment que le tween precedent
      );

      //////// PARTICULES /////////
      tl.addLabel("burst", "-=0.1");

      // 4 directions de base également espacées sur le cercle (90° entre chaque).
      // baseRotation = offset aléatoire appliqué UNE FOIS au set complet → toutes
      // les particules tournent ensemble d'un angle aléatoire à chaque burst,
      // mais conservent leur écart de 90° entre elles.
      const DIRECTION_COUNT = 4;
      const baseRotation = Math.random() * Math.PI * 2;
      const angleStep = (Math.PI * 2) / DIRECTION_COUNT; // 90° en radians

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particle = particles[i];
        if (!particle) continue;

        // i % DIRECTION_COUNT : assignation cyclique. Avec 6 particules et 4
        // directions, les 2 dernières doublent les 2 premières directions.
        const angle = baseRotation + (i % DIRECTION_COUNT) * angleStep;
        // Distance réduite → vitesse moyenne plus faible (durée inchangée à 3s).
        const distance = 100;
        const opacity = 0.6 - (i / (PARTICLE_COUNT - 1)) * 0.7;
        const scale = 0.9 + Math.random() * 0.4;
        const startAt = `burst+=${(i * 0.08).toFixed(3)}`;

        tl.set(particle, { opacity, scale }, startAt);
        tl.to(particle, {
            x: CUBE_X_OFFSET + Math.cos(angle) * distance,
            y: -10 + CUBE_Y_OFFSET + Math.sin(angle) * distance,
            duration: 3,
            opacity: 0,
            ease: "power2.out",
          },
          startAt,
        );
        tl.set(particle, { opacity: 1 }, `${startAt}-=0.1`);
      }

      tl.to(
        containerRef.current,
        {
          backgroundColor: "#ffffff",
          opacity:0,
          duration: 0.8,
          ease: "power2.inOut",
        },"<+=1.5",
      );
    }, containerRef);

    return () => {
      ctx.revert(); // Nettoyage GSAP
      // Stop + libère le son si le composant est démonté avant la fin
      audio.pause();
      audio.src = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div
        ref={logoRef}
        className="relative w-[480px] max-w-[80vw]"
        style={{ willChange: "transform, clip-path" }}
      >
        <div ref={cinetrackRef}>
          <Image
            src="/cinetrack_logo.png"
            alt="cinetrack G4"
            width={1024}
            height={512}
            priority
            className="w-full h-auto select-none"
            unoptimized
          />
        </div>
        <div ref={blackCubeRef} className="absolute inset-0 z-20">
          <Image
            src="/black_cube.png"
            alt="cube noir"
            width={256}
            height={128}
            priority
            className="w-full h-auto select-none"
            unoptimized
          />
        </div>

        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <div
            key={`particle-${i}`}
            ref={(el) => {
              if (el) particlesRef.current[i] = el;
            }}
            className="absolute top-1/2 left-1/2 opacity-0 z-10"
            style={{ width: 32, height: 32 }}
            aria-hidden
          >
            <Image
              src="/gray_cube.png"
              alt=""
              width={64}
              height={64}
              className="w-full h-full object-contain select-none"
              unoptimized
            />
          </div>
        ))}

        <div ref={grayCubeRef} className="absolute inset-0 z-20">
          <Image
            src="/gray_cube.png"
            alt="cube gris"
            width={256}
            height={128}
            priority
            className="w-full h-auto select-none"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}