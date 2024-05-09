import { NextResponse } from "next/server";

export function middleware(request) {
  // return NextResponse.redirect(new URL("/home", request.url));
  console.log("middleware run ");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
