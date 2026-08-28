import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const connection = await prisma.apiConnection.findUnique({ where: { id } });
  if (!connection) {
    return NextResponse.json({ error: "Connection not found" }, { status: 404 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(connection.baseUrl, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      statusText: res.statusText,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Connection failed",
    });
  }
}
