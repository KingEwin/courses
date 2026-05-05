"use client";

import { useEffect, useMemo, useState } from "react";
import { useCineStore } from "@/store/useCineStore";
import { TMDBMovie } from "@/hooks/useTMDB";
import CineCard from "./components/CineCard";
import CineForm from "./components/CineForm";

export default function Home() {
  const items = useCineStore((state) => state.items);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const { items: currentItems, addItem } = useCineStore.getState();
    if (currentItems.length > 0) return;

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const BASE = "https://api.themoviedb.org/3";

    Promise.all([
      fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR`).then((r) => r.json()),
      fetch(`${BASE}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`).then((r) => r.json()),
    ])
      .then(([popular, genreList]) => {
        const genreMap: Record<number, string> = Object.fromEntries(
          (genreList.genres as { id: number; name: string }[]).map((g) => [g.id, g.name])
        );
        (popular.results as TMDBMovie[]).slice(0, 3).forEach((movie) => {
          addItem({
            title: movie.title,
            type: "movie",
            status: "to-watch",
            rating: 0,
            year: movie.release_date?.slice(0, 4) ?? "",
            posterPath: movie.poster_path ?? "",
            overview: movie.overview ?? "",
            voteAverage: movie.vote_average ?? 0,
            originalLanguage: movie.original_language ?? "",
            genres: movie.genre_ids
              .map((id) => genreMap[id])
              .filter((g): g is string => Boolean(g)),
          });
        });
      })
      .catch(() => {});
  }, []);

  const stats = useMemo(
    () => ({
      total: items.length,
      toWatch: items.filter((i) => i.status === "to-watch").length,
      watching: items.filter((i) => i.status === "watching").length,
      completed: items.filter((i) => i.status === "completed").length,
    }),
    [items]
  );

  const filteredItems = useMemo(
    () =>
      search.trim()
        ? items.filter((i) =>
            i.title.toLowerCase().includes(search.toLowerCase())
          )
        : items,
    [items, search]
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {isAdding && <CineForm onClose={() => setIsAdding(false)} />}

      <header style={{ background: "var(--header-bg)" }} className="w-full px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1
              style={{ fontFamily: "var(--font-noto-serif-jp)", color: "white", letterSpacing: "0.05em" }}
              className="text-3xl font-bold"
            >
              CineTrack
            </h1>
            <div className="flex gap-4 mt-1.5 text-xs" style={{ color: "#6B6460" }}>
              <span>{stats.total} titres</span>
              <span>· {stats.toWatch} à voir</span>
              <span>· {stats.watching} en cours</span>
              <span>· {stats.completed} terminés</span>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            style={{
              background: "var(--neo-light)",
              color: "var(--ink)",
              borderRadius: "6px",
            }}
            className="px-5 py-2.5 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            + Ajouter
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-8 py-8 flex-1">
        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="検索 / Rechercher..."
            style={{
              background: "var(--surface)",
              boxShadow: "var(--neo-inset)",
              color: "var(--ink)",
              border: "none",
              outline: "none",
              borderRadius: "12px",
            }}
            className="w-full max-w-md px-4 py-3 text-sm"
          />
        </div>

        {filteredItems.length === 0 ? (
          <p style={{ color: "var(--ink-secondary)" }} className="text-center mt-16 text-sm">
            {search ? `Aucun résultat pour « ${search} »` : "Aucun titre ajouté."}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <CineCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
