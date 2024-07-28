import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: deletedCategory, message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
