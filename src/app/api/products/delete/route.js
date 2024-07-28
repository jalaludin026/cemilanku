import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const imageFilename = product?.imageFilename;

    if (imageFilename) {
      const result = await cloudinary.uploader.destroy(imageFilename);

      console.log(result);
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
