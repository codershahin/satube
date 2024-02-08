import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }
    // check history exists
    const history = await db.history.findFirst({
      where: {
        userId: session.user.id!,
      },
      include: { videos: true },
    });
    const body = await req.json();
    if (!body.videoId) {
      return NextResponse.json("Video Id is missing.", { status: 400 });
    }
    if (!history) {
      // create history and add video
      const history = await db.history.create({
        data: {
          userId: session.user.id,
          videos: {
            connect: {
              videoId: body.videoId,
            },
          },
        },
      });
      return NextResponse.json(history, { status: 201 });
    } else {
      await db.history.update({
        where: { id: history.id },
        data: {
          videos: {
            connect: {
              id: body.videoId,
            },
          },
        },
      });
      //   revalidatePath('/');
      return NextResponse.json("success", { status: 200 });
    }
  } catch (error) {
    console.log("Unable to add history", error);
    return NextResponse.json("Unable to");
  }
};

export const GET = async (req: Request) => {
  try {
    const history = await db.history.findMany({
      include: { videos: true },
    });
    return NextResponse.json(history);
  } catch (error) {
    console.log("watch error", error);
    return NextResponse.json("Internal server error.", { status: 400 });
  }
};
