import { useState, useEffect } from "react";

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  original_language: string;
  genre_ids: number[];
}

export interface TMDBMovieDetails {
  runtime: number | null;
  genres: { id: number; name: string }[];
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovieDetails(id: number): Promise<TMDBMovieDetails | null> {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      runtime: data.runtime ?? null,
      genres: data.genres ?? [],
    };
  } catch {
    return null;
  }
}

export function useTMDB(query: string) {
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        );
        if (!res.ok) throw new Error("Erreur API TMDB");
        const data = await res.json();
        setResults((data.results as TMDBMovie[]).slice(0, 5));
      } catch {
        setError("Impossible de contacter TMDB");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
}
