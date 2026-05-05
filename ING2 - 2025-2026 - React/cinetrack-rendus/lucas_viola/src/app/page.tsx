"use client";

import { useState } from "react";
import type { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { MovieList } from "@/components/MovieList";
import { MovieForm } from "@/components/MovieForm";
import { DeleteDialog } from "@/components/DeleteDialog";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Movie | undefined>(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState<Movie | null>(null);

  const openAdd = () => {
    setEditing(undefined);
    setFormOpen(true);
  };

  const openEdit = (movie: Movie) => {
    setEditing(movie);
    setFormOpen(true);
  };

  const openDelete = (movie: Movie) => {
    setDeleting(movie);
    setDeleteOpen(true);
  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ma Movie List</h1>
        <Button onClick={openAdd}>Ajouter un film</Button>
      </header>

      <MovieList onEdit={openEdit} onDelete={openDelete} />

      <MovieForm
        key={editing?.id ?? "new"}
        open={formOpen}
        onOpenChange={setFormOpen}
        movie={editing}
      />

      <DeleteDialog movie={deleting} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </main>
  );
}
