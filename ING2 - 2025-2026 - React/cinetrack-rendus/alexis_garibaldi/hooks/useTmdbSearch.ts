"use client";

import { useEffect, useRef, useState } from "react";
import type { TmdbSearchResult } from "@/lib/tmdb";

type State = {
  results: TmdbSearchResult[];
  loading: boolean;
  error: string | null;
};

const DEBOUNCE_MS = 300;
const MIN_QUERY_LEN = 2;
const INITIAL_STATE: State = { results: [], loading: false, error: null };

/**
 * Debounced TMDB search hook. Cancels in-flight requests when the query
 * changes so we never render stale results. The HTTP call is proxied through
 * /api/tmdb/search so the API key stays server-side.
 */
export function useTmdbSearch(query: string): State {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    const timer = setTimeout(() => {
      if (trimmed.length < MIN_QUERY_LEN) {
        setState(INITIAL_STATE);
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState((s) => ({ ...s, loading: true, error: null }));

      const url = `/api/tmdb/search?q=${encodeURIComponent(trimmed)}`;
      fetch(url, { signal: controller.signal })
        .then(async (res) => {
          if (!res.ok) {
            const body = (await res.json().catch(() => null)) as {
              error?: string;
            } | null;
            throw new Error(body?.error ?? `HTTP ${res.status}`);
          }
          return res.json() as Promise<{ results: TmdbSearchResult[] }>;
        })
        .then((data) => {
          setState({ results: data.results, loading: false, error: null });
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          const message = err instanceof Error ? err.message : "Erreur TMDB";
          setState({ results: [], loading: false, error: message });
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [query]);

  return state;
}
