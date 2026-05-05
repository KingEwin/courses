"use client";

import { useMovieStore } from "@/store/movieStore";
import { MovieCard } from "@/components/MovieCard";
import type { Movie } from "@/types/movie";

interface MovieListProps {
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}

export function MovieList({ onEdit, onDelete }: MovieListProps) {
  const movies = useMovieStore((state) => state.movies);

  if (movies.length === 0) {
    return <p className="text-center text-muted-foreground py-12">Aucun film. Ajoutez-en un !</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
