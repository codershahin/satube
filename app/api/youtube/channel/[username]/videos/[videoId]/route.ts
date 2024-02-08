import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { videoId: string; channel: string } }
) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        "Unauthorized. You must be logged in to update video",
        { status: 401 }
      );
    }
    const video = await db.video.findFirst({
      where: {
        channel: {
          username: params.channel,
        },
        videoId: params.videoId,
        userId: session.user.id,
      },
    });
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.log("Unable to load video", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { videoId: string; channel: string } }
) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        "Unauthorized. You must be logged in to update video",
        { status: 401 }
      );
    }

    const body = await req.json();

    const video = await db.video.findFirst({
      where: {
        channel: {
          username: params.channel,
        },
        videoId: params.videoId,
        userId: session.user.id,
      },
    });
    if (!video) {
      return NextResponse.json("Video not found", { status: 404 });
    }

    await db.video.update({
      where: {
        videoId: params.videoId,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log("Unable to edit video.", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
