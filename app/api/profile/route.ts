import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type bodyProps = {
  username: string;
  bio: string;
};

export const GET = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session) return NextResponse.json("bad request.", { status: 400 });
    if (!session.user.email)
      return NextResponse.json("bad request. Email is missing!", {
        status: 400,
      });
    const user = await db.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    return NextResponse.json(
      { username: user?.username, bio: user?.bio, image: user?.image },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json("someting went wrong.", { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {
    //  check auth session
    const session = await getAuthSession();
    if (!session)
      return NextResponse.json("Bad request user must have logged in.", {
        status: 400,
      });

    //   validate and update user
    const body: bodyProps = await req.json();

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: body.username,
        bio: body.bio,
      },
    });

    return NextResponse.json("success!", { status: 200 });
  } catch (error) {
    return NextResponse.json("Someting went wrong.!", { status: 500 });
  }
};
