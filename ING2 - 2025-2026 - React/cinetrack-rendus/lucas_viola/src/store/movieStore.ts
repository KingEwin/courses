import { create } from "zustand";
import type { Movie, MovieInput } from "@/types/movie";

interface MovieStore {
  movies: Movie[];
  addMovie: (input: MovieInput) => void;
  updateMovie: (id: string, input: MovieInput) => void;
  deleteMovie: (id: string) => void;
  getMovieById: (id: string) => Movie | undefined;
}

const initialMovies: Movie[] = [
  { id: "1", title: "Inception", director: "Christopher Nolan", year: 2010, rating: 5 },
  { id: "2", title: "Le Fabuleux Destin d'Amélie Poulain", director: "Jean-Pierre Jeunet", year: 2001, rating: 5 },
  { id: "3", title: "Parasite", director: "Bong Joon-ho", year: 2019, rating: 4 },
  { id: "4", title: "Interstellar", director: "Christopher Nolan", year: 2014, rating: 4 },
];

export const useMovieStore = create<MovieStore>((set, get) => ({
  movies: initialMovies,
  addMovie: (input) =>
    set((state) => ({
      movies: [...state.movies, { ...input, id: crypto.randomUUID() }],
    })),
  updateMovie: (id, input) =>
    set((state) => ({
      movies: state.movies.map((m) => (m.id === id ? { ...m, ...input } : m)),
    })),
  deleteMovie: (id) =>
    set((state) => ({ movies: state.movies.filter((m) => m.id !== id) })),
  getMovieById: (id) => get().movies.find((m) => m.id === id),
}));
