import "server-only";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export type TmdbSearchResult = {
  tmdbId: number;
  title: string;
  year: number | null;
  posterUrl: string | null;
  overview: string | null;
};

export type TmdbMovieDetails = {
  tmdbId: number;
  title: string;
  year: number | null;
  director: string | null;
  posterUrl: string | null;
  synopsis: string | null;
};

type RawSearchResponse = {
  results: Array<{
    id: number;
    title: string;
    release_date: string | null;
    poster_path: string | null;
    overview: string | null;
  }>;
};

type RawMovieDetails = {
  id: number;
  title: string;
  release_date: string | null;
  poster_path: string | null;
  overview: string | null;
  credits?: {
    crew: Array<{ job: string; name: string }>;
  };
};

/**
 * TMDB exposes both v3 API keys (32-hex string, sent as `?api_key=`)
 * and v4 read access tokens (JWT, sent as `Authorization: Bearer …`).
 * Detect which one the user provided so either works out of the box.
 */
function isV4Token(value: string): boolean {
  return value.split(".").length === 3 && value.length > 50;
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string>,
  init: { signal?: AbortSignal } = {},
): Promise<T> {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error("TMDB_API_KEY is not set in .env");
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (isV4Token(key)) {
    headers.Authorization = `Bearer ${key}`;
  } else {
    url.searchParams.set("api_key", key);
  }

  const res = await fetch(url, {
    headers,
    signal: init.signal,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`TMDB ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

function yearOf(releaseDate: string | null): number | null {
  if (!releaseDate) return null;
  const y = Number.parseInt(releaseDate.slice(0, 4), 10);
  return Number.isFinite(y) ? y : null;
}

function posterOf(posterPath: string | null): string | null {
  return posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null;
}

export async function searchMovies(
  query: string,
  signal?: AbortSignal,
): Promise<TmdbSearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const data = await tmdbFetch<RawSearchResponse>(
    "/search/movie",
    {
      query: trimmed,
      language: "fr-FR",
      include_adult: "false",
    },
    { signal },
  );

  return data.results.slice(0, 12).map((m) => ({
    tmdbId: m.id,
    title: m.title,
    year: yearOf(m.release_date),
    posterUrl: posterOf(m.poster_path),
    overview: m.overview ?? null,
  }));
}

export async function getMovieDetails(tmdbId: number): Promise<TmdbMovieDetails> {
  const data = await tmdbFetch<RawMovieDetails>(`/movie/${tmdbId}`, {
    language: "fr-FR",
    append_to_response: "credits",
  });

  const directorName =
    data.credits?.crew.find((c) => c.job === "Director")?.name ?? null;

  return {
    tmdbId: data.id,
    title: data.title,
    year: yearOf(data.release_date),
    director: directorName,
    posterUrl: posterOf(data.poster_path),
    synopsis: data.overview ?? null,
  };
}
