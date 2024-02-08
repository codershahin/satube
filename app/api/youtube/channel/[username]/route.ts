import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { username: string } }
) => {
  try {
    const channel = await db.channel.findFirst({
      where: {
        username: params.username,
      },
    });
    if (!channel) {
      return NextResponse.json("Channel not found", { status: 404 });
    }
    return NextResponse.json(channel, { status: 200 });
  } catch (error) {
    console.log("Unable to load channel", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};
