import { DSHeader } from "@/components/DSHeader";
import { AuthBar } from "@/components/AuthBar";
import { FilmCarousel } from "@/components/FilmCarousel";
import { HomeView } from "@/components/HomeView";
import { IntroGate } from "@/components/IntroGate";
import { listMyFilms } from "@/app/actions/films";
import { listLatestLikedReviews } from "@/app/actions/reviews";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [user, films, likedReviews] = await Promise.all([
    getCurrentUser(),
    listMyFilms(),
    listLatestLikedReviews(12),
  ]);

  return (
    <div className="px-4 pt-4">
      {/* Overlay client : joue l'intro DS à la 1re visite, puis se démonte. */}
      <IntroGate />
      <DSHeader>
        <AuthBar user={user} />
      </DSHeader>
      <div className="mx-auto w-full max-w-6xl">
        <FilmCarousel reviews={likedReviews} />
      </div>
      <HomeView user={user} initialFilms={films} />
    </div>
  );
}
