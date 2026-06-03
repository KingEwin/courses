import { notFound } from "next/navigation";
import { DSHeader } from "@/components/DSHeader";
import { AuthBar } from "@/components/AuthBar";
import { FilmDetailView } from "@/components/FilmDetailView";
import { getFilmWithMyReview } from "@/app/actions/films";
import { listReviewsByOthers } from "@/app/actions/reviews";
import { getCurrentUser } from "@/lib/auth";

type Params = Promise<{ id: string }>;

export const dynamic = "force-dynamic";

export default async function FilmDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const film = await getFilmWithMyReview(id);
  if (!film) notFound();
  const otherReviews = await listReviewsByOthers(id, user?.id ?? null);

  return (
    <div className="px-4 pt-4">
      <DSHeader>
        <AuthBar user={user} />
      </DSHeader>
      <FilmDetailView user={user} film={film} otherReviews={otherReviews} />
    </div>
  );
}
