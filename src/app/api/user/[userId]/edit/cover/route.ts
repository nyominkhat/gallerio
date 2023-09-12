import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface reqParams {
  params: {
    userId: string;
  };
}

export async function POST(req: NextRequest, { params }: reqParams) {
  const { userId } = params;
  const { coverPic } = await req.json();

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      coverPic,
    },
  });

  return NextResponse.json("Upload cover photo successfully!", { status: 200 });
}
