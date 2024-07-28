import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description } = body;
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/ /g, "-");

    const slugIsUnique = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (slugIsUnique) {
      return NextResponse.json(
        { error: "Slug is not unique" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
