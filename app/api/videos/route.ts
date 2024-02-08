import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const videos = await db.video.findMany({
      include: { user: true, channel: true },
    });
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal server errro.", { status: 500 });
  }
};
