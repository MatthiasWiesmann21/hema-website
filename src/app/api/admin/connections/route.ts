import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { apiConnectionSchema } from "@/lib/schemas";

export async function GET() {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const connections = await prisma.apiConnection.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(connections);
}

export async function POST(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = apiConnectionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

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
