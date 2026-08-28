import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.path || typeof body.path !== "string") {
      return NextResponse.json({ error: "path required" }, { status: 400 });
    }

    // Don't track admin pages or API routes
    if (body.path.startsWith("/admin") || body.path.startsWith("/api")) {
      return NextResponse.json({ success: true, tracked: false });
    }

    await prisma.pageView.create({
      data: {
        path: body.path,
        referrer: body.referrer || null,
      },
    });

    return NextResponse.json({ success: true, tracked: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to track" },
      { status: 500 },
    );
  }
}
