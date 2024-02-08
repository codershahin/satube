import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    if (!params.userId) {
      return NextResponse.json("User not found", { status: 404 });
    }
    const data = await db.user.findFirst({
      where: {
        id: params.userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });
    if (!data) {
      return NextResponse.json("User not found", { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log("Unable to load profile:", error);
    return NextResponse.json("Something went wrong..", { status: 500 });
  }
};
