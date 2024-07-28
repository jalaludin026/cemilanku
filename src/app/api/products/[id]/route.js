import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import cloudinary from "@/utils/cloudinary";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: {
        slug: id,
      },
      include: {
        category: true,
      },
    });
    return NextResponse.json(product, { status: 200 });
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

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const categoryId = formData.get("categoryId");

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    let slug;

    if (name !== product.name) {
      slug = name.toLowerCase().replace(/ /g, "-");
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
    } else {
      slug = product.slug;
    }

    if (file) {
      const oldImage = product.imageFilename;
      const buffer = await file.arrayBuffer();
      const base64File = Buffer.from(buffer).toString("base64");
      const dataUri = `data:${file.type};base64,${base64File}`;

      const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        upload_preset: "products",
      });

      const imageUrl = uploadResponse.secure_url;
      const imageFilename = uploadResponse.public_id;

      const updateProduct = await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          slug,
          description,
          price: Number(price),
          categoryId,
          imageFilename,
          imageUrl,
        },
      });

      if (!updateProduct) {
        return NextResponse.json({ error: "Failed update!" }, { status: 500 });
      }

      if (oldImage) {
        const result = await cloudinary.uploader.destroy(oldImage);
        console.log(result);
      }

      return NextResponse.json(updateProduct, { status: 200 });
    }

    const updateProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        slug,
        description,
        categoryId,
      },
    });

    if (!updateProduct) {
      return NextResponse.json({ error: "Failed update!" }, { status: 500 });
    }

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
