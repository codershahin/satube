import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { url: string } }
) => {
  try {
    const body = await req.json();
    const video = await db.video.findFirst({
      where: {
        url: params.url,
      },
    });
    if (!video) {
      return NextResponse.json("no video found", { status: 400 });
    }
    await db.video.update({
      where: {
        id: video.id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(video);
  } catch (error: any) {
    console.log("views error", error);
    return NextResponse.json("internal server error", {
      status: 500,
    });
  }
};
