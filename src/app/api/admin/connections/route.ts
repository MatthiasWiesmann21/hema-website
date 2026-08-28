import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const connections = await prisma.apiConnection.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(connections);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const connection = await prisma.apiConnection.create({
      data: {
        name: body.name,
        baseUrl: body.baseUrl,
        authType: body.authType || "none",
        authConfig: body.authConfig || "{}",
        defaultHeaders: body.defaultHeaders || "{}",
        active: body.active ?? true,
      },
    });
    return NextResponse.json(connection);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
