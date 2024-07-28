import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/verifyToken";

const adminOnly = [
  "/dashboard/categories",
  "/dashboard/categories/create",
  "/dashboard/products",
  "/dashboard/products/create",
  "/api/products/delete",
  "/api/products/create",
  "/api/categories/create",
  "/api/categories/delete",
];

export async function middleware(req) {
  const token = req.cookies.get("token");

  if (!token && req.nextUrl.pathname !== "/") {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (
      req.nextUrl.pathname !== "/login" &&
      req.nextUrl.pathname !== "/register"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const decodedToken = token ? await verifyToken(token.value) : null;

  if (token && !decodedToken) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else if (
      req.nextUrl.pathname !== "/login" &&
      req.nextUrl.pathname !== "/register"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Jika pengguna sudah login, tidak izinkan akses ke halaman login dan register
  if (
    decodedToken &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url)); // Arahkan ke halaman beranda
  }

  if (
    decodedToken &&
    adminOnly.includes(req.nextUrl.pathname) &&
    decodedToken.role !== "admin"
  ) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", decodedToken?.id);
  requestHeaders.set("x-user-email", decodedToken?.email);
  requestHeaders.set("x-user-role", decodedToken?.role);

  const response = NextResponse.next();
  response.headers.set("x-user-id", decodedToken?.id);
  response.headers.set("x-user-email", decodedToken?.email);
  response.headers.set("x-user-role", decodedToken?.role);
  return response;
}

export const config = {
  matcher: [
    "/api/user/:path*",
    "/login",
    "/register",
    "/dashboard",
    "/api/categories/create",
    "/dashboard/categories/:path*",
    "/api/products/create",
    "/api/products/delete",
  ],
};
