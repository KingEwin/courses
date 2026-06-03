"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Modal } from "@/components/Modal";
import { RatingEditor } from "@/components/RatingEditor";
import { StatusSelector } from "@/components/StatusSelector";
import { removeFromMyLibrary, updateFilmMetadata } from "@/app/actions/films";
import { upsertMyReview } from "@/app/actions/reviews";
import { useFilmsStore } from "@/store/films";
import {
  FILM_STATUS_LABELS,
  isFilmStatus,
  type Film,
  type FilmStatus,
  type FilmWithMyReview,
  type Review,
  type ReviewWithContext,
} from "@/lib/types";
import type { SessionUser } from "@/lib/auth";

type Props = {
  user: SessionUser | null;
  film: FilmWithMyReview;
  otherReviews: ReviewWithContext[];
};

export function FilmDetailView({ user, film, otherReviews }: Props) {
  const router = useRouter();
  const upsertFilm = useFilmsStore((s) => s.upsertFilm);
  const setMyReview = useFilmsStore((s) => s.setMyReview);
  const patchMyReview = useFilmsStore((s) => s.patchMyReview);
  const removeFilm = useFilmsStore((s) => s.removeFilm);

  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const myReview: Review | null = film.myReview ?? null;
  const status: FilmStatus = myReview && isFilmStatus(myReview.status)
    ? myReview.status
    : "TO_WATCH";
  const showRatingAndReview = status !== "TO_WATCH";

  const persist = useCallback(
    (patch: Parameters<typeof upsertMyReview>[1]) => {
      patchMyReview(film.id, patch);
      startTransition(async () => {
        try {
          const review = await upsertMyReview(film.id, patch);
          setMyReview(film.id, review);
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Échec de la mise à jour";
          setError(msg);
        }
      });
    },
    [film.id, patchMyReview, setMyReview],
  );

  const onStatusChange = (newStatus: FilmStatus) => persist({ status: newStatus });
  const onRatingChange = (rating: number | null) => persist({ rating });
  const onCommentBlur = (comment: string) => {
    if (comment === (myReview?.comment ?? "")) return;
    persist({ comment: comment || null });
  };

  const onDelete = () => {
    startTransition(async () => {
      try {
        await removeFromMyLibrary(film.id);
        removeFilm(film.id);
        router.push("/");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Échec de la suppression";
        setError(msg);
      }
    });
  };

  return (
    <main className="mx-auto w-full max-w-4xl py-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center text-base text-zinc-700 hover:text-zinc-950"
      >
        ← Retour à la cinémathèque
      </Link>

      <article className="ds-card flex flex-col gap-6 p-6 sm:flex-row">
        <div className="relative aspect-[2/3] w-full max-w-[200px] shrink-0 self-start bg-zinc-200">
          {film.posterUrl ? (
            <Image
              src={film.posterUrl}
              alt={`Affiche : ${film.title}`}
              fill
              className="object-cover"
              sizes="200px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-zinc-500">
              Pas d&apos;affiche
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <header>
            <h1 className="text-2xl font-black tracking-tight">{film.title}</h1>
            <p className="text-sm text-zinc-600">
              {film.year ?? "Année inconnue"}
              {film.director ? ` · ${film.director}` : ""}
            </p>
          </header>

          {film.synopsis && (
            <p className="text-sm leading-relaxed text-zinc-700">
              {film.synopsis}
            </p>
          )}

          {user ? (
            <MyReviewSection
              status={status}
              rating={myReview?.rating ?? null}
              comment={myReview?.comment ?? null}
              showRatingAndReview={showRatingAndReview}
              onStatusChange={onStatusChange}
              onRatingChange={onRatingChange}
              onCommentBlur={onCommentBlur}
            />
          ) : (
            <GuestReviewPrompt />
          )}

          {error && <p className="text-sm text-red-700">{error}</p>}

          {user && (
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="ds-button ds-button-ghost px-3 py-1.5 text-sm"
              >
                ✏️ Éditer les métadonnées
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="ds-button ds-button-danger px-3 py-1.5 text-sm"
              >
                🗑 Retirer de ma cinémathèque
              </button>
            </div>
          )}
        </div>
      </article>

      <OtherReviews reviews={otherReviews} />

      <EditMetadataDialog
        film={film}
        open={edit}
        onClose={() => setEdit(false)}
        onSaved={(updated) => {
          upsertFilm({ ...updated, myReview });
          setEdit(false);
        }}
      />

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Retirer de ma cinémathèque ?"
        footer={
          <>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="ds-button ds-button-ghost px-3 py-1.5 text-sm"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => {
                setConfirmDelete(false);
                onDelete();
              }}
              className="ds-button ds-button-danger px-3 py-1.5 text-sm"
            >
              Retirer
            </button>
          </>
        }
      >
        <p className="text-sm">
          Ta review et ton statut sur <strong>{film.title}</strong> seront
          supprimés. Le film reste dans le catalogue partagé pour les autres
          utilisateurs.
        </p>
      </Modal>
    </main>
  );
}

function MyReviewSection({
  status,
  rating,
  comment,
  showRatingAndReview,
  onStatusChange,
  onRatingChange,
  onCommentBlur,
}: {
  status: FilmStatus;
  rating: number | null;
  comment: string | null;
  showRatingAndReview: boolean;
  onStatusChange: (s: FilmStatus) => void;
  onRatingChange: (r: number | null) => void;
  onCommentBlur: (c: string) => void;
}) {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-bold uppercase tracking-wide text-zinc-500">
          Mon statut
        </h2>
        <StatusSelector value={status} onChange={onStatusChange} />
      </section>

      {showRatingAndReview ? (
        <>
          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Ma note
            </h2>
            <RatingEditor value={rating} onChange={onRatingChange} />
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Mon avis
            </h2>
            <CommentInput
              initialValue={comment ?? ""}
              onCommit={onCommentBlur}
            />
          </section>
        </>
      ) : (
        <p className="text-xs italic text-zinc-500">
          Note et avis débloqués dès que ton statut passe à «{" "}
          {FILM_STATUS_LABELS.WATCHING} » ou « {FILM_STATUS_LABELS.WATCHED} ».
        </p>
      )}
    </>
  );
}

function GuestReviewPrompt() {
  return (
    <section className="ds-card flex flex-col gap-2 bg-zinc-50 p-3 text-sm">
      <p>
        <span className="ds-display mr-2 inline-block border-2 border-zinc-500 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold uppercase">
          Guest
        </span>
        Tu peux consulter les reviews ci-dessous, mais pour noter et écrire un
        avis tu dois{" "}
        <Link href="/login" className="font-bold text-blue-700">
          te connecter
        </Link>
        {" "}ou{" "}
        <Link href="/signup" className="font-bold text-blue-700">
          créer un profil
        </Link>
        .
      </p>
    </section>
  );
}

function OtherReviews({ reviews }: { reviews: ReviewWithContext[] }) {
  if (reviews.length === 0) {
    return (
      <section className="ds-card mt-6 p-4 text-sm text-zinc-500">
        Aucune autre review pour ce film.
      </section>
    );
  }
  return (
    <section className="mt-6 flex flex-col gap-3">
      <h2 className="ds-display text-xs uppercase tracking-wider text-zinc-700">
        Reviews de la communauté
      </h2>
      <ul className="flex flex-col gap-2">
        {reviews.map((r) => (
          <li key={r.id} className="ds-card p-3">
            <header className="flex items-baseline justify-between gap-2">
              <span className="ds-display border-2 border-zinc-500 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase">
                {r.user.displayName}
              </span>
              {r.rating !== null && (
                <span className="text-sm font-bold text-amber-700">
                  ★ {r.rating}/10
                </span>
              )}
            </header>
            {r.comment && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-800">
                « {r.comment} »
              </p>
            )}
            {!r.comment && r.rating === null && (
              <p className="mt-2 text-sm italic text-zinc-500">
                {r.user.displayName} a marqué ce film comme «{" "}
                {FILM_STATUS_LABELS[r.status as FilmStatus] ?? r.status} ».
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommentInput({
  initialValue,
  onCommit,
}: {
  initialValue: string;
  onCommit: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onCommit(value)}
      rows={4}
      maxLength={2000}
      placeholder="Tes impressions, ce qui t'a marqué…"
      className="ds-input w-full resize-y font-sans text-sm leading-relaxed"
    />
  );
}

function EditMetadataDialog({
  film,
  open,
  onClose,
  onSaved,
}: {
  film: Film;
  open: boolean;
  onClose: () => void;
  onSaved: (updated: Film) => void;
}) {
  const [title, setTitle] = useState(film.title);
  const [year, setYear] = useState(film.year?.toString() ?? "");
  const [director, setDirector] = useState(film.director ?? "");
  const [synopsis, setSynopsis] = useState(film.synopsis ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    const yearNum = year.trim() ? Number.parseInt(year, 10) : null;
    if (yearNum !== null && (Number.isNaN(yearNum) || yearNum < 1888)) {
      setError("Année invalide.");
      return;
    }

    startTransition(async () => {
      try {
        const updated = await updateFilmMetadata(film.id, {
          title: title.trim(),
          year: yearNum,
          director: director.trim() || null,
          synopsis: synopsis.trim() || null,
        });
        onSaved(updated);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Échec de la sauvegarde";
        setError(msg);
      }
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Éditer les métadonnées"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="ds-button ds-button-ghost px-3 py-1.5 text-sm"
          >
            Annuler
          </button>
          <button
            type="submit"
            form="edit-metadata-form"
            disabled={isPending}
            className="ds-button ds-button-primary px-3 py-1.5 text-sm disabled:opacity-50"
          >
            {isPending ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </>
      }
    >
      <form
        id="edit-metadata-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-3"
      >
        <Field label="Titre *">
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ds-input"
          />
        </Field>
        <Field label="Année">
          <input
            type="number"
            inputMode="numeric"
            min={1888}
            max={2100}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="ds-input"
          />
        </Field>
        <Field label="Réalisateur">
          <input
            type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="ds-input"
          />
        </Field>
        <Field label="Synopsis">
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            rows={4}
            maxLength={4000}
            className="ds-input font-sans text-sm leading-relaxed"
          />
        </Field>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </form>
    </Modal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-semibold text-zinc-700">{label}</span>
      {children}
    </label>
  );
}
