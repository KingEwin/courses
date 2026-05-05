import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  if (!query || query.trim().length < 2) {
    return Response.json({ results: [] });
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=fr-FR&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    return Response.json({ error: "Erreur TMDB" }, { status: 502 });
  }

  const data = await res.json();

  const results = (data.results as TmdbResult[])
    .filter((r) => r.media_type === "movie" || r.media_type === "tv")
    .slice(0, 8)
    .map((r) => ({
      tmdbId: r.id,
      title: r.media_type === "movie" ? r.title : r.name,
      type: r.media_type === "tv" ? "series" : "movie",
      year: (r.release_date ?? r.first_air_date ?? "").slice(0, 4),
      poster: r.poster_path
        ? `https://image.tmdb.org/t/p/w500${r.poster_path}`
        : null,
      thumbnail: r.poster_path
        ? `https://image.tmdb.org/t/p/w92${r.poster_path}`
        : null,
      overview: r.overview ?? "",
    }));

  return Response.json({ results });
}

interface TmdbResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
}
