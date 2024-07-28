import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out" },
      { status: 200 }
    );

    // Set the cookie with maxAge to 0 to delete it
    response.cookies.set("token", "", { maxAge: 0 });

    return response;
  } catch (error) {
    console.log("Something went wrong", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
