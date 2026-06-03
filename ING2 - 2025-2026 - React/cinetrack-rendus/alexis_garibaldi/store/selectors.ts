"use client";

import { useMemo } from "react";
import { useFilmsStore } from "@/store/films";
import type { FilmWithMyReview } from "@/lib/types";

/**
 * Derives the filtered/sorted view of the user's library from the store.
 * Memoized custom hook, used by FilmGrid + FilterBar (ARCH-05, REACT-05).
 */
export function useFilteredFilms(): FilmWithMyReview[] {
  const films = useFilmsStore((s) => s.films);
  const filters = useFilmsStore((s) => s.filters);

  return useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    const filtered = films.filter((film) => {
      const status = film.myReview?.status ?? "TO_WATCH";
      if (filters.status !== "ALL" && status !== filters.status) {
        return false;
      }
      if (search && !film.title.toLowerCase().includes(search)) {
        return false;
      }
      return true;
    });

    const sorted = filtered.slice();
    switch (filters.sort) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title, "fr"));
        break;
      case "year-desc":
        sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
        break;
      case "rating-desc":
        sorted.sort(
          (a, b) =>
            (b.myReview?.rating ?? -1) - (a.myReview?.rating ?? -1),
        );
        break;
    }
    return sorted;
  }, [films, filters]);
}

export function useFilmsCounts(): {
  all: number;
  toWatch: number;
  watching: number;
  watched: number;
} {
  const films = useFilmsStore((s) => s.films);
  return useMemo(() => {
    let toWatch = 0;
    let watching = 0;
    let watched = 0;
    for (const f of films) {
      const status = f.myReview?.status ?? "TO_WATCH";
      if (status === "WATCHING") watching += 1;
      else if (status === "WATCHED") watched += 1;
      else toWatch += 1;
    }
    return { all: films.length, toWatch, watching, watched };
  }, [films]);
}
