import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(15),
  username: z.string().min(2).max(15),
  bio: z.string().min(2).max(50),
  logo: z.string().min(2),
  banner: z.string().min(2),
  email: z.string().email().min(2).max(50),
});

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    // // validate
    // const validatedBody = formSchema.safeParse(body);

    // if (!validatedBody.success) {
    //   return NextResponse.json(validatedBody.error, { status: 400 });
    // }

    if (!body) {
      return NextResponse.json("No body", { status: 400 });
    }

    if (!body.username) {
      return NextResponse.json("Username is required", { status: 400 });
    }
    if (!body.name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    // check username is unique
    const existingChannel = await db.channel.findUnique({
      where: {
        username: body.username,
      },
    });

    if (existingChannel) {
      return NextResponse.json("Username already exists", { status: 400 });
    }

    const channelExist = await db.channel.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    if (channelExist) {
      return NextResponse.json("You already have a channel.", { status: 400 });
    }

    const channel = await db.channel.create({
      data: {
        ...body,
        userId: session.user.id,
      },
    });

    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    console.log("Channel add error", error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
