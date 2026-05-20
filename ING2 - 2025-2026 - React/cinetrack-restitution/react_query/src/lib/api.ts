import { CineItem } from "../app/models/cine-item";
import { Status } from "../app/types/status";

export type NewItemInput = Omit<
  CineItem,
  "id" | "createdAt" | "updatedAt" | "isFavorite"
>;

export type UpdateItemInput = Partial<Omit<CineItem, "id" | "createdAt">>;

// Dates come back as strings from JSON — normalize at the boundary
function parseItem(raw: CineItem): CineItem {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    updatedAt: new Date(raw.updatedAt),
  };
}

async function ok<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getItems(): Promise<CineItem[]> {
  const res = await fetch("/api/items");
  const data = await ok<CineItem[]>(res);
  return data.map(parseItem);
}

export async function createItem(data: NewItemInput): Promise<CineItem> {
  const res = await fetch("/api/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const item = await ok<CineItem>(res);
  return parseItem(item);
}

export async function patchItem(
  id: number,
  data: UpdateItemInput
): Promise<CineItem> {
  const res = await fetch(`/api/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const item = await ok<CineItem>(res);
  return parseItem(item);
}

export async function deleteItemById(id: number): Promise<void> {
  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export type StatusUpdate = { id: number; status: Status };

// ----------------------------------------------------------------------------
// TMDB search

export interface TmdbResult {
  tmdbId: number;
  title: string;
  type: "movie" | "series";
  year: string;
  poster: string | null;
  thumbnail: string | null;
  overview: string;
}

interface TmdbSearchResponse {
  results: TmdbResult[];
}

export async function searchTmdb(query: string): Promise<TmdbResult[]> {
  const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`);
  const data = await ok<TmdbSearchResponse>(res);
  return data.results ?? [];
}

// ----------------------------------------------------------------------------
// Auth — register

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export async function registerUser(payload: RegisterPayload): Promise<void> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) return;

  // Surface server-provided error messages so callers can render them directly
  let message = "Erreur lors de l'inscription";
  try {
    const data = (await res.json()) as { error?: string };
    if (data.error) message = data.error;
  } catch {
    // non-JSON response (HTML 500…) — keep the default
  }
  throw new Error(message);
}
