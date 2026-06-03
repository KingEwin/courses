"use client";

import {
  FILM_STATUS_LABELS,
  FILM_STATUSES,
  type FilmStatus,
} from "@/lib/types";

type Props = {
  value: FilmStatus;
  onChange: (status: FilmStatus) => void;
  disabled?: boolean;
};

export function StatusSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-1" role="radiogroup" aria-label="Statut">
      {FILM_STATUSES.map((status) => {
        const active = value === status;
        return (
          <button
            key={status}
            type="button"
            disabled={disabled}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(status)}
            className={`ds-button px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              active ? "ds-button-primary" : "ds-button-ghost"
            }`}
          >
            {FILM_STATUS_LABELS[status]}
          </button>
        );
      })}
    </div>
  );
}
