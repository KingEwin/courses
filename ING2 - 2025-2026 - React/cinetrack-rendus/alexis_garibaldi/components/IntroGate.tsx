"use client";

import { useState, useSyncExternalStore } from "react";
import DSIntro from "./DSIntro";

// Desactiver l'intro en debug
const ENABLE_INTRO = true;
// Rejouer l'intro à chaque reload (ignore localStorage)
const REPLAY_ON_RELOAD = false;
// Pour voir l'intro qu'une fois
const INTRO_KEY = "cinetrack:intro_seen";

// useSyncExternalStore = pattern React 19 pour lire un état externe
// (ici localStorage) sans setState dans un effect.
const subscribe = () => () => {};
const getSnapshot = () => localStorage.getItem(INTRO_KEY) === "1";
const getServerSnapshot = () => true;

export function IntroGate() {
  const seen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  if (!ENABLE_INTRO) return null;
  if (dismissed) return null;
  if (!REPLAY_ON_RELOAD && seen) return null;

  return (
    <DSIntro
      onComplete={() => {
        localStorage.setItem(INTRO_KEY, "1");
        setDismissed(true);
      }}
    />
  );
}
