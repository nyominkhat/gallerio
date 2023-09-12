import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface reqParams {
  likeId: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: reqParams }
) {
  const { likeId } = params;

  const liked = await db.like.findUnique({
    where: {
      id: likeId,
    },
  });

  if (!liked) {
    return NextResponse.json("Invalid removeId!", { status: 400 });
  }

  const like = await db.like.delete({
    where: {
      id: likeId,
    },
  });

  console.log("like", like);

  return NextResponse.json("Remove like", { status: 200 });
}
