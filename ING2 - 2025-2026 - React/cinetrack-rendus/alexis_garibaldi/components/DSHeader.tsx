"use client";

import { useEffect, useState, type ReactNode } from "react";

import { Clock } from "./Clock";

const DAYS_FR = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"] as const;
const MONTHS_FR = [
  "JAN",
  "FEV",
  "MAR",
  "AVR",
  "MAI",
  "JUN",
  "JUL",
  "AOU",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

/**
 * DS-style header banner: pixel-y title, live clock, and the day-of-week chip
 * in red on weekends — like the calendar in the original DS home menu.
 *
 * Composition (REACT-03): the auth slot is rendered via children so the same
 * banner is reused across pages with different right-hand content.
 */
export function DSHeader({ children }: { children?: ReactNode }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <DSHeaderShell dayChip={null} dateText="--/-- ----">
        {children}
      </DSHeaderShell>
    );
  }

  const dow = DAYS_FR[now.getDay()];
  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  const dateText = `${pad2(now.getDate())} ${MONTHS_FR[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <DSHeaderShell
      dateText={dateText}
      dayChip={
        <span
          className={`ds-display border-2 px-2 py-0.5 text-[10px] font-bold ${
            isWeekend
              ? "border-red-500 bg-red-100 text-red-700"
              : "border-zinc-500 bg-zinc-100 text-zinc-700"
          }`}
        >
          {dow}
        </span>
      }
    >
      {children}
    </DSHeaderShell>
  );
}

function DSHeaderShell({
  dayChip,
  dateText,
  children,
}: {
  dayChip: ReactNode;
  dateText: string;
  children?: ReactNode;
}) {
  return (
    <div className="ds-topbar mx-auto mb-6 flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs">
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <span className="text-zinc-600">CineTrack</span>
      </div>
      <div className="flex items-center gap-3 font-bold">
        {dayChip}
        <span className="ds-display text-[11px] tracking-wider text-zinc-700">
          {dateText}
        </span>
        <Clock className="ds-display text-base text-zinc-900" />
      </div>
    </div>
  );
}
