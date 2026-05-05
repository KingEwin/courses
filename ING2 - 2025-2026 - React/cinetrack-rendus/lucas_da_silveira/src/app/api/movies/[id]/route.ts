import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    await prisma.cineItem.delete({
      where: { 
        id,
        userId: (session.user as any).id
      }
    });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);
    const data = await req.json();
    const movie = await prisma.cineItem.update({
      where: { 
        id,
        userId: (session.user as any).id
      },
      data
    });
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json({ message: "Error updating" }, { status: 500 });
  }
}