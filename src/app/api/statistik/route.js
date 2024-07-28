import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCount = await prisma.product.count();
    const categoriesCount = await prisma.category.count();
    const usersCount = await prisma.user.count();

    return NextResponse.json(
      { productsCount, categoriesCount, usersCount },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
