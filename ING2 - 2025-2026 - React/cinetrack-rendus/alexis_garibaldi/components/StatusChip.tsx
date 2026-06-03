import { FILM_STATUS_LABELS, type FilmStatus } from "@/lib/types";

const STATUS_STYLES: Record<FilmStatus, string> = {
  TO_WATCH: "bg-zinc-200 text-zinc-700 border-zinc-400",
  WATCHING: "bg-amber-100 text-amber-900 border-amber-400",
  WATCHED: "bg-emerald-100 text-emerald-900 border-emerald-500",
};

export function StatusChip({ status }: { status: FilmStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-none border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLES[status]}`}
    >
      {FILM_STATUS_LABELS[status]}
    </span>
  );
}
