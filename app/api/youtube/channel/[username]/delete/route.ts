import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (
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
    //delete the channel and all the videos on that channel
    //delete the channel
    await db.channel.delete({
      where: {
        username,
      },
    });
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("Channel Delete Error:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};
