import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { username: string } }
) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json(
        "Unauthorized. You must be logged in to subscribe",
        { status: 401 }
      );
    }

    const { username } = params;
    if (!username) {
      return NextResponse.json(
        "Unauthorized. You must be logged in to subscribe",
        { status: 401 }
      );
    }

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const exitsit = await db.channel.findFirst({
      where: {
        username,
        subscribersIds: {
          has: session.user.id,
        },
      },
    });
    const ids = exitsit?.subscribersIds.filter((i) => i !== session.user.id);
    // console.log(exitsit);

    if (exitsit) {
      const ids = exitsit.subscribersIds.filter((i) => i !== session.user.id);
      console.log(ids);
      await db.channel.update({
        where: {
          username,
        },
        data: {
          subscribersIds: ids.map((i) => {
            return i;
          }),
        },
      });
      return NextResponse.json("Unsubscribed", { status: 200 });
    } else {
      await db.channel.update({
        where: {
          username,
        },
        data: {
          subscribersIds: {
            push: session.user.id!,
          },
        },
      });
      return NextResponse.json("Subscribed", { status: 200 });
    }
  } catch (error) {
    console.log("Unable to subscribe channel:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};
