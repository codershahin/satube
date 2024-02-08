import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import uniqid from "uniqid";
interface BodyProps {
  title: string;
  url: string;
  description?: string;
  categoryId: string;
  thumbnail: string;
}
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
    const videos = await db.video.findMany({
      where: {
        channel: {
          id: channel.id,
        },
      },
      include: {
        channel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.log("unable to load videos", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { username: string } }
) => {
  try {
    // get auth
    const session = await getAuthSession();
    if (!session)
      return NextResponse.json("bad request. auth is required!", {
        status: 400,
      });
    const body: BodyProps = await req.json();

    // validate
    if (!body.title || !body.url || !body.categoryId || !body.thumbnail)
      return NextResponse.json(
        "Title, Video, Category and Thumbnail are required!",
        {
          status: 400,
        }
      );

    const channel = await db.channel.findFirst({
      where: {
        username: params.username,
      },
    });

    if (!channel) {
      return NextResponse.json("Channel not found", { status: 400 });
    }

    //   save to db
    await db.video.create({
      data: {
        title: body.title!,
        url: body.url!,
        videoId: uniqid(),
        thumbnail: body.thumbnail,
        channel: {
          connect: {
            id: channel.id,
          },
        },
        user: {
          connect: {
            id: channel.userId,
          },
        },
        views: 0,
        category: {
          connect: {
            id: body.categoryId,
          },
        },
        description: body.description ? body.description : "",
      },
    });

    return NextResponse.json("success", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("someting went wrong..", { status: 500 });
  }
};
