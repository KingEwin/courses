"use client";

import type { Movie } from "@/types/movie";
import { useMovieStore } from "@/store/movieStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
  movie: Movie | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteDialog({ movie, open, onOpenChange }: DeleteDialogProps) {
  const deleteMovie = useMovieStore((state) => state.deleteMovie);

  const handleConfirm = () => {
    if (movie) deleteMovie(movie.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce film ?</AlertDialogTitle>
          <AlertDialogDescription>
            {movie ? `"${movie.title}" sera retiré de la liste. Cette action est irréversible.` : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
