"use client";

import { create } from "zustand";
import { useEffect } from "react";
import {
  type FilmFilters,
  type FilmStatus,
  type FilmWithMyReview,
  type Review,
  type ReviewPatch,
  type SortOption,
} from "@/lib/types";

type FilmsState = {
  films: FilmWithMyReview[];
  filters: FilmFilters;
  hydrated: boolean;
};

type FilmsActions = {
  hydrate: (films: FilmWithMyReview[]) => void;
  setFilms: (films: FilmWithMyReview[]) => void;
  upsertFilm: (film: FilmWithMyReview) => void;
  removeFilm: (id: string) => void;
  patchMyReview: (filmId: string, patch: ReviewPatch | Partial<Review>) => void;
  setMyReview: (filmId: string, review: Review) => void;
  setStatusFilter: (status: FilmStatus | "ALL") => void;
  setSearch: (query: string) => void;
  setSort: (sort: SortOption) => void;
};

const initialFilters: FilmFilters = {
  status: "ALL",
  search: "",
  sort: "title-asc",
};

export const useFilmsStore = create<FilmsState & FilmsActions>((set) => ({
  films: [],
  filters: initialFilters,
  hydrated: false,

  hydrate: (films) =>
    set((state) =>
      state.hydrated ? state : { films, hydrated: true },
    ),

  setFilms: (films) => set({ films }),

  upsertFilm: (film) =>
    set((state) => {
      const idx = state.films.findIndex((f) => f.id === film.id);
      if (idx === -1) return { films: [film, ...state.films] };
      const next = state.films.slice();
      next[idx] = film;
      return { films: next };
    }),

  removeFilm: (id) =>
    set((state) => ({ films: state.films.filter((f) => f.id !== id) })),

  patchMyReview: (filmId, patch) =>
    set((state) => ({
      films: state.films.map((f) => {
        if (f.id !== filmId) return f;
        const baseReview = f.myReview ?? null;
        if (!baseReview) {
          // Without an existing review there's nothing to patch optimistically;
          // the server action will create one and the next upsertFilm reconciles it.
          return f;
        }
        return {
          ...f,
          myReview: { ...baseReview, ...patch } as Review,
        };
      }),
    })),

  setMyReview: (filmId, review) =>
    set((state) => ({
      films: state.films.map((f) =>
        f.id === filmId ? { ...f, myReview: review } : f,
      ),
    })),

  setStatusFilter: (status) =>
    set((state) => ({ filters: { ...state.filters, status } })),

  setSearch: (search) =>
    set((state) => ({ filters: { ...state.filters, search } })),

  setSort: (sort) =>
    set((state) => ({ filters: { ...state.filters, sort } })),
}));

/** Hydrate the store from server-fetched data. Idempotent on re-renders. */
export function useHydrateFilms(initial: FilmWithMyReview[]): void {
  const hydrate = useFilmsStore((s) => s.hydrate);
  useEffect(() => {
    hydrate(initial);
  }, [hydrate, initial]);
}
