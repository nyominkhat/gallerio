import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { userId, imageId } = body;

  if (!userId || typeof userId !== "string") {
    return NextResponse.json({
      message: "Missing parameter userId!",
      status: 400,
    });
  }

  if (!imageId || typeof imageId !== "string") {
    return NextResponse.json("Missing parameter userId!", { status: 400 });
  }

  const alreadyLiked = await db.like.findUnique({
    where: {
      userId_imageId: {
        userId,
        imageId,
      },
    },
  });

  try {
    if (alreadyLiked) {
      await db.like.update({
        where: {
          userId_imageId: {
            userId,
            imageId,
          },
        },
        data: {
          userId: userId,
          imageId: imageId,
          isLiked: !alreadyLiked.isLiked,
        },
      });

      return NextResponse.json(
        `${alreadyLiked.isLiked === false ? "Liked" : "Unliked"}`,
        {
          status: 200,
        }
      );
    }

    await db.like.create({
      data: {
        userId: userId,
        imageId: imageId,
        isLiked: true,
      },
    });

    return NextResponse.json("Liked", { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error.message);
    }
  }
}
