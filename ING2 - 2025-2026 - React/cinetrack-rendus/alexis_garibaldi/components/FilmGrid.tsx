"use client";

import { FilmCard } from "@/components/FilmCard";
import { useFilteredFilms } from "@/store/selectors";

export function FilmGrid() {
  const films = useFilteredFilms();

  if (films.length === 0) {
    return (
      <div className="ds-card flex flex-col items-center justify-center gap-2 p-12 text-center text-sm text-zinc-600">
        <span className="text-4xl">📼</span>
        <p>Aucun film ne correspond à tes filtres.</p>
        <p className="text-xs">
          Tape un nouveau titre dans la recherche, change de statut, ou ajoute
          ton premier film.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}
