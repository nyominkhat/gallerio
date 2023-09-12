import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface reqParams {
  params: {
    userId: string;
  };
}

export async function PATCH(req: NextRequest, { params }: reqParams) {
  const { userId } = params;
  const { name, image } = await req.json();

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      image,
    },
  });

  return NextResponse.json("Profile edit successfully!", { status: 200 });
}
