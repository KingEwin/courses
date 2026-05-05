"use client";

import { useState, type FormEvent } from "react";
import type { Movie, MovieInput } from "@/types/movie";
import { useMovieStore } from "@/store/movieStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MovieFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie?: Movie;
}

const emptyForm: MovieInput = { title: "", director: "", year: new Date().getFullYear(), rating: 3 };

export function MovieForm({ open, onOpenChange, movie }: MovieFormProps) {
  const addMovie = useMovieStore((state) => state.addMovie);
  const updateMovie = useMovieStore((state) => state.updateMovie);
  const isEdit = Boolean(movie);

  const [form, setForm] = useState<MovieInput>(movie ?? emptyForm);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const maxYear = new Date().getFullYear() + 5;
    if (!form.title.trim() || !form.director.trim()) {
      setError("Le titre et le réalisateur sont requis.");
      return;
    }
    if (form.year < 1888 || form.year > maxYear) {
      setError(`L'année doit être entre 1888 et ${maxYear}.`);
      return;
    }
    if (form.rating < 1 || form.rating > 5) {
      setError("La note doit être entre 1 et 5.");
      return;
    }

    if (isEdit && movie) {
      updateMovie(movie.id, form);
    } else {
      addMovie(form);
    }
    setForm(emptyForm);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier le film" : "Ajouter un film"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="director">Réalisateur</Label>
            <Input id="director" value={form.director} onChange={(e) => setForm({ ...form, director: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Année</Label>
              <Input id="year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Note (1-5)</Label>
              <Input id="rating" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">{isEdit ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
