import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSessionCookie } from "@/lib/auth-cookie";

// Pages that require a logged-in user. Adjust this list to taste — for
// example you might decide /add-opportunity should stay open to guests.
const PROTECTED_PATHS = ["/dashboard", "/saved", "/cv-builder", "/admin", "/add-opportunity"];

// Next.js 16 renamed the `middleware.ts` convention to `proxy.ts` (the
// exported function is now named `proxy` instead of `middleware`). The
// logic itself is unchanged — only the file name and export name moved.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(SESSION_COOKIE)?.value;
  const user = decodeSessionCookie(cookieValue);

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/saved/:path*", "/cv-builder/:path*", "/admin/:path*", "/add-opportunity/:path*"],
};
