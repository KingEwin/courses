"use client";

import { useState } from "react";

type Props = {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
};

export function RatingEditor({ value, onChange, disabled }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value ?? 0;

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex"
        onMouseLeave={() => setHover(null)}
        role="radiogroup"
        aria-label="Note sur 10"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onChange(value === n ? null : n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`Noter ${n} sur 10`}
            aria-checked={value === n}
            role="radio"
            className={`px-0.5 text-2xl leading-none disabled:cursor-not-allowed ${
              n <= display ? "text-amber-500" : "text-zinc-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="text-sm font-bold text-zinc-700">
        {value !== null ? `${value}/10` : "—"}
      </span>
    </div>
  );
}
