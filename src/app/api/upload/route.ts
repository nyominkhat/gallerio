import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url, userId, tag, description } = await req.json();

  try {
    await db.image.create({
      data: {
        userId,
        url,
        description,
        tag,
      },
    });

    return NextResponse.json("Image uploaded successfully!", {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json("Something went wrong!", { status: 400 });
  }
}
