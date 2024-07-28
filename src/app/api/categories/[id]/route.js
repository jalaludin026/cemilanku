import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params;

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

    const product = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let slug;

    if (name !== product.name) {
      slug = name.toLowerCase().replace(/ /g, "-");

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
    } else {
      slug = product.slug;
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        slug,
      },
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
