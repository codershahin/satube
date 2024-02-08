import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
interface BodyProps {
  title: string;
  url: string;
  description?: string;
  category: string;
}
export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: {
      videoId: string;
    };
  }
) => {
  try {
    // get auth
    const session = await getAuthSession();
    if (!session)
      return NextResponse.json("Unauthorized!", {
        status: 401,
      });
    if (session.user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", {
        status: 401,
      });
    }
    const body: BodyProps = await req.json();

    // validate
    if (!body.title || !body.url)
      return NextResponse.json("Title and Video are required!", {
        status: 400,
      });

    //   save to db
    await db.video.update({
      where: {
        videoId: params.videoId,
      },
      data: {
        title: body.title!,
        url: body.url!,
        categoryId: body.category,
        description: body.description ? body.description : "",
      },
    });

    return NextResponse.json("success", { status: 201 });
  } catch (error) {
    return NextResponse.json("something went wrong..", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      videoId: string;
    };
  }
) => {
  try {
    const data = await db.video.findFirst({
      where: {
        videoId: params.videoId,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("Something went wrong..", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  {
    params,
  }: {
    params: {
      videoId: string;
    };
  }
) => {
  try {
    await db.video.delete({ where: { videoId: params.videoId } });
    return NextResponse.json("success");
  } catch (error) {
    return NextResponse.json("Something went wrong..", { status: 500 });
  }
};
