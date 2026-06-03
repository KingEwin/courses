import { FilmLikedByUserCard } from "@/components/FilmLikedByUserCard";
import type { ReviewWithContext } from "@/lib/types";

export function FilmCarousel({ reviews }: { reviews: ReviewWithContext[] }) {
  if (reviews.length === 0) {
    return (
      <section className="ds-card mb-6 flex flex-col gap-2 p-4">
        <h2 className="ds-display text-xs uppercase tracking-wider text-zinc-600">
          ★ Derniers films likés
        </h2>
        <p className="text-sm text-zinc-500">
          Aucune review pour l&apos;instant. Connecte-toi et note un film pour
          que ta review apparaisse ici !
        </p>
      </section>
    );
  }

  return (
    <section className="ds-card mb-6 flex flex-col gap-3 p-4">
      <header className="flex items-baseline justify-between gap-2">
        <h2 className="ds-display text-xs uppercase tracking-wider text-zinc-700">
          ★ Derniers films likés par la communauté
        </h2>
        <span className="text-xs text-zinc-500">
          {reviews.length} review{reviews.length > 1 ? "s" : ""}
        </span>
      </header>
      <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
        {reviews.map((r) => (
          <div key={r.id} className="snap-start">
            <FilmLikedByUserCard review={r} />
          </div>
        ))}
      </div>
    </section>
  );
}
