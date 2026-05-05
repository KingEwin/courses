"use client";

import { useState } from "react";
import ShowCard from "@/components/ShowCard";
import SearchBar from "@/components/SearchBar";
import { Show } from "@/types/show";

export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);

  const addShow = (movie: any) => {
    const newShow: Show = {
      id: Date.now(),
      title: movie.title,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      status: "to watch",
      image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };
    setShows([...shows, newShow]);
  };

  const editShow = (updated: Show) => {
    setShows(shows.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteShow = (id: number) => {
    setShows(shows.filter((s) => s.id !== id));
  };

  return (
    <main className="p-10 min-h-screen bg-zinc-50 text-black">
      <h1 className="text-4xl font-bold mb-6">🎬 CineTrick</h1>

      <SearchBar onSelect={addShow} />

      <div className="flex flex-wrap gap-4">
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onEdit={editShow}
            onDelete={deleteShow}
          />
        ))}
      </div>
    </main>
  );
}