// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes (accessible without login)
const publicPaths: string[] = ["/", "/auth/signin", "/auth/signup"];

function isPublicPath(path: string): boolean {
  return publicPaths.some((p) => path === p || path.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Read token from cookies
  const token = req.cookies.get("authToken")?.value;

  // If user not logged in and tries private route → redirect to login with `redirect` param
  if (!isPublicPath(pathname) && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname); // store the original route
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to access login/register → redirect to dashboard
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except _next, api, static, etc.
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
