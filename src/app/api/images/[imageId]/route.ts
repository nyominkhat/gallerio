import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface reqParams {
  imageId: string;
}

export async function GET(req: NextRequest, { params }: { params: reqParams }) {
  const { imageId } = params;
  const { searchParams } = new URL(req.url);
  const currentUserId = searchParams.get("currentUserId");

  if (!imageId || typeof imageId !== "string") {
    return NextResponse.json("Invalid id!", { status: 404 });
  }

  const image = await db.image.findUnique({
    where: {
      id: imageId,
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
  });

  if (!image) {
    return NextResponse.json("Invalid id!", { status: 404 });
  }

  const likedImage = image?.likeBy.filter((like) => {
    return like.userId === currentUserId && imageId === like.imageId;
  });

  if (likedImage.length > 0) {
    const imageWithLikeStatus = {
      ...image,
      isLiked: likedImage[0].isLiked,
      likeId: likedImage[0].id,
    };

    return NextResponse.json(imageWithLikeStatus, { status: 200 });
  } else {
    const imageWithLikeStatus = {
      ...image,
      isLiked: false,
      likeId: undefined,
    };

    return NextResponse.json(imageWithLikeStatus, { status: 200 });
  }

  // const imageWithLikeStatus =
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: reqParams }
) {
  const { imageId } = params;

  await db.image.delete({
    where: {
      id: imageId,
    },
  });

  return NextResponse.json("Image deleted successfully!", { status: 200 });
}
