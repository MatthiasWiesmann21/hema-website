import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

/**
 * Check that the current request is from an authenticated admin user.
 * Returns null if authorized, or a NextResponse (401/403) if not.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
