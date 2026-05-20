"use client";

import { useQuery } from "@tanstack/react-query";
import { searchTmdb } from "../lib/api";

export function useTmdbSearch(query: string) {
  const trimmed = query.trim();
  return useQuery({
    queryKey: ["tmdb", trimmed],
    queryFn: () => searchTmdb(trimmed),
    enabled: trimmed.length >= 2,
    staleTime: 5 * 60_000, // same query within 5 min → no refetch
  });
}
