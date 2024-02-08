import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (
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

    const body = await req.json();

    if (!body) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    // update channel
    const updatedChannel = await db.channel.update({
      where: {
        username,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedChannel, { status: 200 });
  } catch (error) {
    console.log("Channel Update Error:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};
