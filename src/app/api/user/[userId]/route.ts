import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface reqParams {
  userId: string;
}

export async function GET(req: NextRequest, { params }: { params: reqParams }) {
  const { userId } = params;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json("Invalid userId!", { status: 404 });
  }

  delete (user as { hashedPassword?: string | null }).hashedPassword;

  return NextResponse.json(user, { status: 200 });
}
