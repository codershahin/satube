import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import uniqid from "uniqid";
interface BodyProps {
  title: string;
  url: string;
  description?: string;
  categoryId: string;
  thumbnail: string;
}
export const POST = async (req: Request) => {
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

    //   save to db
    await db.video.create({
      data: {
        title: body.title!,
        url: body.url!,
        videoId: uniqid(),
        thumbnail: body.thumbnail,
        userId: session.user.id,
        channelId: "",
        views: 0,
        categoryId: body.categoryId,
        description: body.description ? body.description : "",
      },
    });

    return NextResponse.json("success", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("someting went wrong..", { status: 500 });
  }
};
