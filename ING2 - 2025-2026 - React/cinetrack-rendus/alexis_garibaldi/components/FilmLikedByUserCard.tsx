import Link from "next/link";
import Image from "next/image";
import type { ReviewWithContext } from "@/lib/types";

export function FilmLikedByUserCard({ review }: { review: ReviewWithContext }) {
  const film = review.film;
  return (
    <Link
      href={`/films/${film.id}`}
      className="ds-card flex w-48 shrink-0 flex-col overflow-hidden transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[2/3] w-full bg-zinc-200">
        {film.posterUrl ? (
          <Image
            src={film.posterUrl}
            alt={`Affiche : ${film.title}`}
            fill
            className="object-cover"
            sizes="192px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-500">
            Pas d&apos;affiche
          </div>
        )}
        {review.rating !== null && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 border-2 border-amber-600 bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-900">
            ★ {review.rating}/10
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 border-t border-zinc-300 bg-zinc-50 p-2">
        <p className="ds-display truncate text-[10px] uppercase tracking-wide text-zinc-500">
          {review.user.displayName}
        </p>
        <p className="line-clamp-3 h-[3.6rem] text-sm leading-snug text-zinc-800">
          {review.comment ? `« ${review.comment} »` : (
            <span className="italic text-zinc-500">
              {review.user.displayName} a noté ce film {review.rating}/10.
            </span>
          )}
        </p>
        <p className="mt-1 truncate text-xs font-bold text-zinc-700">
          {film.title}
          {film.year ? ` (${film.year})` : ""}
        </p>
      </div>
    </Link>
  );
}
