"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import {
  FILM_STATUSES,
  isFilmStatus,
  type FilmStatus,
  type Review,
  type ReviewPatch,
  type ReviewWithContext,
} from "@/lib/types";

function clampRating(value: number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (!Number.isFinite(value)) return null;
  const v = Math.round(value);
  if (v < 0) return 0;
  if (v > 10) return 10;
  return v;
}

function nullableString(value: string | null | undefined, max = 2000): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function normalizeStatus(value: unknown): FilmStatus {
  return isFilmStatus(value) ? value : FILM_STATUSES[0];
}

/** Update the current user's own review for a film. */
export async function upsertMyReview(
  filmId: string,
  patch: ReviewPatch,
): Promise<Review> {
  const user = await requireUser();

  const data: Record<string, unknown> = {};
  if (patch.status !== undefined) data.status = normalizeStatus(patch.status);
  if (patch.rating !== undefined) data.rating = clampRating(patch.rating);
  if (patch.comment !== undefined)
    data.comment = nullableString(patch.comment, 2000);

  const review = await prisma.review.upsert({
    where: { userId_filmId: { userId: user.id, filmId } },
    create: {
      userId: user.id,
      filmId,
      status: normalizeStatus(patch.status),
      rating: clampRating(patch.rating),
      comment: nullableString(patch.comment ?? null, 2000),
    },
    update: data,
  });

  revalidatePath("/");
  revalidatePath(`/films/${filmId}`);
  return review;
}

/** All reviews on a film authored by users OTHER than the current one. */
export async function listReviewsByOthers(
  filmId: string,
  currentUserId: string | null,
): Promise<ReviewWithContext[]> {
  const reviews = await prisma.review.findMany({
    where: {
      filmId,
      userId: currentUserId ? { not: currentUserId } : undefined,
      // Only show reviews with actual content from peers.
      OR: [
        { rating: { not: null } },
        { comment: { not: null } },
      ],
    },
    include: {
      film: true,
      user: { select: { id: true, username: true, displayName: true } },
    },
    orderBy: [{ updatedAt: "desc" }],
  });
  return reviews;
}

/** Latest reviews across all users that have at least a rating. Used by the home carousel. */
export async function listLatestLikedReviews(
  limit = 12,
): Promise<ReviewWithContext[]> {
  const reviews = await prisma.review.findMany({
    where: {
      rating: { not: null },
      // A "like" = a positive-ish rating. 6/10+ keeps the carousel celebratory.
      AND: [{ rating: { gte: 6 } }],
    },
    include: {
      film: true,
      user: { select: { id: true, username: true, displayName: true } },
    },
    orderBy: [{ updatedAt: "desc" }],
    take: limit,
  });
  return reviews;
}
