import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, recaptchaToken } = body;

    if (!email || !password || !recaptchaToken) {
      return NextResponse.json(
        { error: "Email, password, and reCAPTCHA are required" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const recaptchaSecretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET;
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;

    const recaptchaResponse = await axios.post(recaptchaUrl);
    const recaptchaData = recaptchaResponse.data;

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Check password
    const isValid = await bcryptjs.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Create JWT token
    const tokenData = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });

    // Set JWT token in cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
