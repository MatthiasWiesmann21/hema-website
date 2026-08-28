import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // body: { items: [{ id, sortOrder, parentId? }] }
  if (!Array.isArray(body.items)) {
    return NextResponse.json(
      { error: "items array required" },
      { status: 400 },
    );
  }

  try {
    await prisma.$transaction(
      body.items.map((item: { id: string; sortOrder: number; parentId?: string | null }) =>
        prisma.navItem.update({
          where: { id: item.id },
          data: {
            sortOrder: item.sortOrder,
            parentId: item.parentId ?? null,
          },
        }),
      ),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to reorder" },
      { status: 500 },
    );
  }
}
