"use client";

import type { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (movie: Movie) => void;
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p>Réalisateur : <span className="font-medium">{movie.director}</span></p>
        <p>Année : <span className="font-medium">{movie.year}</span></p>
        <p>Note : <span className="font-medium">{"★".repeat(movie.rating)}{"☆".repeat(5 - movie.rating)}</span></p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(movie)}>
          Modifier
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(movie)}>
          Supprimer
        </Button>
      </CardFooter>
    </Card>
  );
}
