"use client";

import { useState } from "react";
import { searchMovies } from "@/lib/tmdb";

type SearchBarProps = {
  onSelect: (movie: any) => void;
};

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  // Fonction appelée à chaque frappe dans l'input
  const handleSearch = async (value: string) => {
    setQuery(value);

    // On ne lance la recherche qu'à partir de 3 caractères
    if (value.length < 3) {
      setResults([]);
      return;
    }

    try {
      const movies = await searchMovies(value);
      setResults(movies);
    } catch (error) {
      console.error("Erreur TMDB:", error);
    }
  };

  return (
    <div className="mb-6 relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher un film ou une série..."
        className="p-3 w-full rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {results.length > 0 && (
        <div className="absolute z-50 bg-zinc-900 mt-1 w-full rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.map((movie: any) => (
            <div
              key={movie.id}
              onClick={() => {
                onSelect(movie);
                setQuery("");       // reset input
                setResults([]);     // clear résultats
              }}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-zinc-800"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-16 bg-zinc-700 rounded flex items-center justify-center text-xs">
                  No Img
                </div>
              )}

              <div className="text-white text-sm">
                <p className="font-medium">{movie.title}</p>
                <p className="text-gray-400 text-xs">{movie.release_date?.slice(0, 4)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}