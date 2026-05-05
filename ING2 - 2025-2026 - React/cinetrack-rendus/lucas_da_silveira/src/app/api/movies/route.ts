import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const movies = await prisma.cineItem.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching movies" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const movie = await prisma.cineItem.create({
      data: {
        ...data,
        id: undefined, // Let DB generate ID
        userId: (session.user as any).id
      }
    });
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating movie" }, { status: 500 });
  }
}