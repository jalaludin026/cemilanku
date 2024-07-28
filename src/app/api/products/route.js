import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const take = Number(searchParams.get("take")) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const keyword = searchParams.get("keyword") || "";
    const category = Number(searchParams.get("category")) || null;
    const orderPrice = searchParams.get("orderPrice") || "asc";

    if (category !== null) {
      const products = await prisma.product.findMany({
        where: {
          categoryId: category,
        },
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          description: true,
          slug: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take,
        skip,
        orderBy: {
          price: orderPrice,
        },
      });

      const total = await prisma.product.count({
        where: {
          categoryId: category,
        },
      });

      return NextResponse.json({ products, total }, { status: 200 });
    }

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        description: true,
        slug: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take,
      skip,
      orderBy: {
        price: orderPrice,
      },
    });

    const total = await prisma.product.count({
      where: {
        name: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json({ products, total }, { status: 200 });
  } catch (error) {
    console.error("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
