import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const cursor = searchParams.get("cursor");
  const cursorObj = cursor === "" ? undefined : { id: cursor as string };
  const currentUserId = searchParams.get("currentUserId");

  const take = 12;

  const images = await db.image.findMany({
    where: {
      OR: [
        {
          tag: {
            contains: search || "",
          },
        },
        {
          description: {
            contains: search || "",
          },
        },
      ],
    },

    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      likeBy: {
        select: {
          id: true,
          userId: true,
          isLiked: true,
          imageId: true,
        },
      },
    },

    skip: cursor !== "" ? 1 : 0,
    take,
    cursor: cursorObj,
    orderBy: {
      createdAt: "desc",
    },
  });

  const imagesWithLikeStatus = images.map((image) => {
    const likedImage = image.likeBy.filter(
      (like) => like.userId === currentUserId && image.id === like.imageId
    );

    if (likedImage.length > 0) {
      return {
        ...image,
        isLiked: likedImage[0].isLiked,
      };
    } else {
      return {
        ...image,
        isLiked: false,
      };
    }
  });

  return NextResponse.json(
    {
      images: imagesWithLikeStatus,
      nextId:
        imagesWithLikeStatus.length === take
          ? imagesWithLikeStatus[take - 1]?.id
          : undefined,
    },
    { status: 200 }
  );
}
