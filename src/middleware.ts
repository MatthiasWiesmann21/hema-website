import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function middleware(request: Request) {
  const session = await auth();
  const { pathname } = new URL(request.url);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    if (session?.user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!session?.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
