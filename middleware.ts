import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/youtube", request.url));
  // }
  if (request.nextUrl.pathname === "/channel/:path*") {
    return NextResponse.redirect(new URL("/youtube/channel", request.url));
  }

  //   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/channel/:path*"],
};
