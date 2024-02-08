import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { username: string } }
) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { username } = params;
    if (!username) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const channel = await db.channel.findUnique({
      where: {
        username,
      },
    });
    if (channel) {
      return NextResponse.json(
        "Username already exists. Please choose a different username.",

        { status: 400 }
      );
    } else {
      return NextResponse.json("channel not found", { status: 200 });
    }
  } catch (error) {
    console.log("Channel Unique Error:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};
