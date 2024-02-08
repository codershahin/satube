import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    if (!body) {
      return NextResponse.json("No body", { status: 400 });
    }
    const comment = await db.comment.create({
      data: {
        text: body.comment,
        videoId: body.videoId,
        userId: session.user.id,
      },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.log("Comment add error", error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
