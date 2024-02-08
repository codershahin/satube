import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        "Unauthorized. You must be logged in to like/dislike video",
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const videoId = url.searchParams.get("videoId");
    if (!videoId) {
      return NextResponse.json(`Missing videoId`, { status: 400 });
    }

    // check if video exists
    const video = await db.video.findFirst({
      where: {
        videoId,
      },
    });

    if (!video) {
      return NextResponse.json("Video not found", { status: 404 });
    }

    if (video.likesIds.includes(session.user.id)) {
      await db.video.update({
        where: {
          id: video.id,
        },
        data: {
          likesIds: {
            set: video.likesIds.filter((id) => id !== session.user.id),
          },
        },
      });
    }
    if (video.dislikesIds.includes(session.user.id)) {
      await db.video.update({
        where: {
          id: video.id,
        },
        data: {
          dislikesIds: {
            set: video.dislikesIds.filter((id) => id !== session.user.id),
          },
        },
      });
    }

    const videoDisliked = await db.video.update({
      where: {
        id: video.id,
      },
      data: {
        dislikesIds: {
          push: session.user.id,
        },
      },
    });
    console.log(videoDisliked);
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log("Dislike error", error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
