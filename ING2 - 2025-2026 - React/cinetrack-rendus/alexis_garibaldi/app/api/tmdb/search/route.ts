import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") ?? "";

  try {
    const results = await searchMovies(query, request.signal);
    return NextResponse.json({ results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown TMDB error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
