import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import cloudinary from "@/utils/cloudinary";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const categoryId = formData.get("categoryId");

    if (!file || !name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/ /g, "-");

    const slugIsUnique = await prisma.product.findUnique({
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

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64File}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      upload_preset: "products",
    });

    const imageUrl = uploadResponse.secure_url;
    const imageFilename = uploadResponse.public_id;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        slug,
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        imageUrl,
        imageFilename,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
