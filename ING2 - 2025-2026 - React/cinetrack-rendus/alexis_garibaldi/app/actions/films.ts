"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireUser } from "@/lib/auth";
import { getMovieDetails } from "@/lib/tmdb";
import type { Film, FilmWithMyReview } from "@/lib/types";

function normalizeYear(value: number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (!Number.isFinite(value)) return null;
  const y = Math.trunc(value);
  if (y < 1888 || y > 2100) return null;
  return y;
}

function nullableString(value: string | null | undefined, max = 4000): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

/** Returns every film the current user has reviewed, with their review. */
export async function listMyFilms(): Promise<FilmWithMyReview[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const reviews = await prisma.review.findMany({
    where: { userId: user.id },
    include: { film: true },
    orderBy: { updatedAt: "desc" },
  });

  return reviews.map((r) => ({ ...r.film, myReview: r }));
}

/** Return the film paired with the current user's review (null if guest or no review). */
export async function getFilmWithMyReview(
  id: string,
): Promise<FilmWithMyReview | null> {
  const user = await getCurrentUser();
  const film = await prisma.film.findUnique({ where: { id } });
  if (!film) return null;

  if (!user) return { ...film, myReview: null };

  const myReview = await prisma.review.findUnique({
    where: { userId_filmId: { userId: user.id, filmId: id } },
  });
  return { ...film, myReview };
}

/** Manual creation: requires login. Adds the film to the catalog AND creates a TO_WATCH review. */
export async function createFilm(input: {
  title: string;
  year?: number | null;
  director?: string | null;
}): Promise<FilmWithMyReview> {
  const user = await requireUser();

  const title = nullableString(input.title, 200);
  if (!title) {
    throw new Error("Le titre est obligatoire.");
  }

  const film = await prisma.film.create({
    data: {
      title,
      year: normalizeYear(input.year),
      director: nullableString(input.director, 200),
    },
  });

  const review = await prisma.review.create({
    data: {
      userId: user.id,
      filmId: film.id,
      status: "TO_WATCH",
    },
  });

  revalidatePath("/");
  return { ...film, myReview: review };
}

/** TMDB import: requires login. Reuses existing film if already in catalog. */
export async function importFilmFromTmdb(
  tmdbId: number,
): Promise<FilmWithMyReview> {
  const user = await requireUser();

  let film: Film | null = await prisma.film.findUnique({
    where: { tmdbId },
  });
  if (!film) {
    const details = await getMovieDetails(tmdbId);
    film = await prisma.film.create({
      data: {
        title: details.title,
        year: details.year,
        director: details.director,
        synopsis: details.synopsis,
        posterUrl: details.posterUrl,
        tmdbId: details.tmdbId,
      },
    });
  }

  // Create the user's review if not already there.
  const review = await prisma.review.upsert({
    where: { userId_filmId: { userId: user.id, filmId: film.id } },
    create: { userId: user.id, filmId: film.id, status: "TO_WATCH" },
    update: {},
  });

  revalidatePath("/");
  return { ...film, myReview: review };
}

/** Update Film metadata (title/year/director/synopsis/posterUrl). Requires login. */
export async function updateFilmMetadata(
  id: string,
  patch: {
    title?: string;
    year?: number | null;
    director?: string | null;
    synopsis?: string | null;
    posterUrl?: string | null;
  },
): Promise<Film> {
  await requireUser();

  const data: Record<string, unknown> = {};
  if (patch.title !== undefined) {
    const t = nullableString(patch.title, 200);
    if (!t) throw new Error("Le titre ne peut pas être vide.");
    data.title = t;
  }
  if (patch.year !== undefined) data.year = normalizeYear(patch.year);
  if (patch.director !== undefined)
    data.director = nullableString(patch.director, 200);
  if (patch.synopsis !== undefined)
    data.synopsis = nullableString(patch.synopsis, 4000);
  if (patch.posterUrl !== undefined)
    data.posterUrl = nullableString(patch.posterUrl, 500);

  const film = await prisma.film.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath(`/films/${id}`);
  return film;
}

/** Removes the user's review (and the film if no other review references it). */
export async function removeFromMyLibrary(filmId: string): Promise<void> {
  const user = await requireUser();
  await prisma.review.delete({
    where: { userId_filmId: { userId: user.id, filmId } },
  });
  // Optional: keep the film in the shared catalog even if I'm the last reviewer,
  // so other users can still discover/review it. We only delete MY review.
  revalidatePath("/");
}
