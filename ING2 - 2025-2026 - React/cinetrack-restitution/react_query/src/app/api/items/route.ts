import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const userId = parseInt(session.user.id, 10);
  const items = await prisma.cineItem.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(items);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const userId = parseInt(session.user.id, 10);
  const body = await request.json();

  const item = await prisma.cineItem.create({
    data: {
      title: String(body.title).trim(),
      type: body.type === "series" ? "series" : "movie",
      status: ["to-watch", "watching", "completed"].includes(body.status)
        ? body.status
        : "to-watch",
      rating: Number(body.rating) || 0,
      isFavorite: false,
      poster: body.poster ? String(body.poster) : null,
      overview: body.overview ? String(body.overview) : null,
      userId,
    },
  });

  return Response.json(item, { status: 201 });
}
