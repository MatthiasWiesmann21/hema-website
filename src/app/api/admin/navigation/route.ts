import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { navItemSchema } from "@/lib/schemas";

export async function GET() {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const items = await prisma.navItem.findMany({
    orderBy: [{ location: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json(items);
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

  const parsed = navItemSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

  try {
    const maxOrder = await prisma.navItem.aggregate({
      _max: { sortOrder: true },
      where: { location: body.location, section: body.section ?? null },
    });

    const item = await prisma.navItem.create({
      data: {
        location: body.location,
        section: body.section || null,
        label: body.label,
        href: body.href,
        external: body.external ?? false,
        sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
        parentId: body.parentId || null,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
