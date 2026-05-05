import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { NextRequest } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const itemId = parseInt(id, 10);
  const userId = parseInt(session.user.id, 10);
  const body = await request.json();

  // Ensure the item belongs to the requesting user
  const existing = await prisma.cineItem.findUnique({ where: { id: itemId } });
  if (!existing || existing.userId !== userId) {
    return Response.json({ error: "Non trouvé" }, { status: 404 });
  }

  const allowedFields: Record<string, unknown> = {};
  if (body.title !== undefined) allowedFields.title = String(body.title).trim();
  if (body.type !== undefined) allowedFields.type = body.type;
  if (body.status !== undefined) allowedFields.status = body.status;
  if (body.rating !== undefined) allowedFields.rating = Number(body.rating);
  if (body.isFavorite !== undefined) allowedFields.isFavorite = Boolean(body.isFavorite);
  if (body.poster !== undefined) allowedFields.poster = body.poster ? String(body.poster) : null;
  if (body.overview !== undefined) allowedFields.overview = body.overview ? String(body.overview) : null;

  const item = await prisma.cineItem.update({
    where: { id: itemId },
    data: allowedFields,
  });

  return Response.json(item);
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await params;
  const itemId = parseInt(id, 10);
  const userId = parseInt(session.user.id, 10);

  const existing = await prisma.cineItem.findUnique({ where: { id: itemId } });
  if (!existing || existing.userId !== userId) {
    return Response.json({ error: "Non trouvé" }, { status: 404 });
  }

  await prisma.cineItem.delete({ where: { id: itemId } });

  return new Response(null, { status: 204 });
}
