import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { navReorderSchema } from "@/lib/schemas";

export async function PUT(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = navReorderSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

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
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to reorder" },
      { status: 500 },
    );
  }
}
