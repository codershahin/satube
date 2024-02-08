import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    if (!body.name) {
      return NextResponse.json("Category name is required.", { status: 400 });
    }
    await db.category.create({
      data: {
        name: body.name.trim(),
        slug: slugify(body.name, {
          trim: true,
          remove: undefined,
          replacement: "-",
          lower: true,
        }),
      },
    });
    return NextResponse.json("Success");
  } catch (error: any) {
    return NextResponse.json(error?.response?.data || error?.message, {
      status: 500,
    });
  }
};

export const GET = async (req: Request) => {
  try {
    const data = await db.category.findMany({});
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(error?.response?.data || error?.message, {
      status: 500,
    });
  }
};
