import type { Film, Review } from "@/lib/generated/prisma/client";

export type { Film, Review };

export type FilmStatus = "TO_WATCH" | "WATCHING" | "WATCHED";

export const FILM_STATUSES: readonly FilmStatus[] = [
  "TO_WATCH",
  "WATCHING",
  "WATCHED",
] as const;

export const FILM_STATUS_LABELS: Record<FilmStatus, string> = {
  TO_WATCH: "À voir",
  WATCHING: "En cours",
  WATCHED: "Vu",
};

export function isFilmStatus(value: unknown): value is FilmStatus {
  return (
    typeof value === "string" &&
    (FILM_STATUSES as readonly string[]).includes(value)
  );
}

/** A film paired with the current user's own review (if any). */
export type FilmWithMyReview = Film & {
  myReview: Review | null;
};

/** A review enriched with film + author for cross-user display. */
export type ReviewWithContext = Review & {
  film: Film;
  user: { id: string; username: string; displayName: string };
};

export type ReviewPatch = {
  status?: FilmStatus;
  rating?: number | null;
  comment?: string | null;
};

export type SortOption = "title-asc" | "year-desc" | "rating-desc";

export type FilmFilters = {
  status: FilmStatus | "ALL";
  search: string;
  sort: SortOption;
};
