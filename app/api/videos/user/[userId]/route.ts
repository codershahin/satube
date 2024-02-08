import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    // const session = await getAuthSession();
    // if (!session) {
    //   return NextResponse.json("Unauthorized", { status: 400 });
    // }

    if (!params.userId) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    const videos = await db.video.findMany({
      where: {
        userId: params.userId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json(videos);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json("Something went wrong..", { status: 500 });
  }
};
