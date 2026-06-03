"use client";

import Link from "next/link";
import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { FilmGrid } from "@/components/FilmGrid";
import { AddFilmDialog } from "@/components/AddFilmDialog";
import { useHydrateFilms } from "@/store/films";
import type { FilmWithMyReview } from "@/lib/types";
import type { SessionUser } from "@/lib/auth";

type Props = {
  user: SessionUser | null;
  initialFilms: FilmWithMyReview[];
};

export function HomeView({ user, initialFilms }: Props) {
  useHydrateFilms(initialFilms);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <main className="mx-auto w-full max-w-6xl pb-12">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl">CineTrack</h1>
          <p className="text-base text-zinc-700">
            {user
              ? `Salut ${user.displayName}, voici ta cinémathèque.`
              : "Bienvenue. Connecte-toi pour démarrer ta cinémathèque."}
          </p>
        </div>
        {user ? (
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="ds-button ds-button-primary px-4 py-2"
          >
            + Ajouter un film
          </button>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="ds-button ds-button-ghost px-4 py-2"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="ds-button ds-button-primary px-4 py-2"
            >
              Créer un profil
            </Link>
          </div>
        )}
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <FilterBar />
          <FilmGrid />
        </div>
      ) : (
        <div className="ds-textbox flex flex-col items-center gap-3 p-8 text-center">
          <p className="ds-display text-xs uppercase tracking-wider text-amber-300">
            Mode invité
          </p>
          <p className="text-base">
            Tu peux explorer les films likés par les autres juste au-dessus.
            Pour ajouter tes propres films, noter et écrire un avis,
            connecte-toi.
          </p>
        </div>
      )}

      <AddFilmDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </main>
  );
}
