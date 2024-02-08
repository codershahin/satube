import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const video = await db.video.findFirst({
      where: {
        url: body.url,
      },
    });
    if (!video) {
      return NextResponse.json("no video found", { status: 400 });
    }
    const views = await db.video.update({
      where: {
        id: video.id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      select: { views: true, id: true },
    });
    return NextResponse.json("success");
  } catch (error: any) {
    console.log("views error", error);
    return NextResponse.json("internal server error", {
      status: 500,
    });
  }
};
