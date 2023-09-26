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

  const alreadyReported = await db.report.findFirst({
    where: {
      userId,
      imageId,
    },
  });

  if (alreadyReported) {
    return NextResponse.json("Image already reported!", { status: 400 });
  }

  await db.report.create({
    data: {
      userId,
      imageId,
    },
  });

  return NextResponse.json("Report has been sent!", { status: 201 });
}
