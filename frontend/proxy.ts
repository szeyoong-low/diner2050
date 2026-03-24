// Adapted from Paul Bratslavsky's "Epic Next.js 15 Tutorial"
// https://strapi.io/blog/epic-next-js-15-tutorial-part-1-learn-next-js-by-building-a-real-life-project

import { auth0 } from "@/lib/auth0";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes: string[] = ["/create"];

export async function proxy(request: NextRequest) {
  const response = await auth0.middleware(request);

  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    const session = await auth0.getSession(request);

    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return response;
}

function isProtectedRoute(path: string): boolean {
  if (!path || protectedRoutes.length === 0) return false;
  return protectedRoutes.some((route) => {
    // For exact matches
    if (!route.includes("*")) {
      return path === route;
    }

    // For wildcard routes (e.g., /dashboard/*)
    const basePath = route.replace("/*", "");
    return path === basePath || path.startsWith(`${basePath}/`);
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};