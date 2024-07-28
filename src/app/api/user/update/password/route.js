import { NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

import prisma from "@/utils/prisma";

export async function PUT(req) {
  try {
    const userId = req.headers.get("x-user-id");

    const body = await req.json();

    const { oldPassword, newPassword, confirmNewPassword } = body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    const isMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Old password does not match" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { error: "New password and confirm password does not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully",
        data: updatedUser,
      },
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
