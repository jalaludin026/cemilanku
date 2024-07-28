import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import prisma from "@/utils/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { password } = body;
    const userId = request.headers.get("x-user-id");

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });

    const response = NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );

    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
