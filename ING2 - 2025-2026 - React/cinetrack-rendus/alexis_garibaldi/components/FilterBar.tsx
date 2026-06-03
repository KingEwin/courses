"use client";

import { useCallback } from "react";
import { useFilmsStore } from "@/store/films";
import { useFilmsCounts } from "@/store/selectors";
import {
  FILM_STATUS_LABELS,
  FILM_STATUSES,
  type FilmStatus,
  type SortOption,
} from "@/lib/types";

const SORT_LABELS: Record<SortOption, string> = {
  "title-asc": "Titre A→Z",
  "year-desc": "Année (récente d'abord)",
  "rating-desc": "Note (haute d'abord)",
};

export function FilterBar() {
  const filters = useFilmsStore((s) => s.filters);
  const setStatusFilter = useFilmsStore((s) => s.setStatusFilter);
  const setSearch = useFilmsStore((s) => s.setSearch);
  const setSort = useFilmsStore((s) => s.setSort);

  const counts = useFilmsCounts();

  const onStatusClick = useCallback(
    (status: FilmStatus | "ALL") => () => setStatusFilter(status),
    [setStatusFilter],
  );

  return (
    <div className="ds-card flex flex-col gap-3 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          active={filters.status === "ALL"}
          onClick={onStatusClick("ALL")}
          label={`Tous (${counts.all})`}
        />
        {FILM_STATUSES.map((status) => {
          const count =
            status === "TO_WATCH"
              ? counts.toWatch
              : status === "WATCHING"
                ? counts.watching
                : counts.watched;
          return (
            <FilterChip
              key={status}
              active={filters.status === status}
              onClick={onStatusClick(status)}
              label={`${FILM_STATUS_LABELS[status]} (${count})`}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="search"
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Chercher dans ma cinémathèque…"
          className="ds-input flex-1"
          aria-label="Recherche locale"
        />
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="font-semibold">Tri :</span>
          <select
            value={filters.sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="ds-input"
            aria-label="Choix du tri"
          >
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <option key={opt} value={opt}>
                {SORT_LABELS[opt]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`ds-button px-3 py-1 text-xs font-bold uppercase tracking-wide ${
        active ? "ds-button-primary" : "ds-button-ghost"
      }`}
    >
      {label}
    </button>
  );
}
