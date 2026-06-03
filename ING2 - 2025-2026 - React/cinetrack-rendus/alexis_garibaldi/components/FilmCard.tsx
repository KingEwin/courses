import Link from "next/link";
import Image from "next/image";
import { StatusChip } from "@/components/StatusChip";
import { isFilmStatus, type FilmWithMyReview } from "@/lib/types";

export function FilmCard({ film }: { film: FilmWithMyReview }) {
  const review = film.myReview;
  const status = review && isFilmStatus(review.status) ? review.status : "TO_WATCH";

  return (
    <Link
      href={`/films/${film.id}`}
      className="ds-card flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[2/3] w-full bg-zinc-200">
        {film.posterUrl ? (
          <Image
            src={film.posterUrl}
            alt={`Affiche : ${film.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-500">
            Pas d&apos;affiche
          </div>
        )}
        <div className="absolute right-2 top-2">
          <StatusChip status={status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-tight">
          {film.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-zinc-600">
          <span>{film.year ?? "—"}</span>
          {review?.rating !== null && review?.rating !== undefined && status !== "TO_WATCH" && (
            <span className="font-bold text-zinc-800">★ {review.rating}/10</span>
          )}
        </div>
      </div>
    </Link>
  );
}
