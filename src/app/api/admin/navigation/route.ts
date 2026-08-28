import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.navItem.findMany({
    orderBy: [{ location: "asc" }, { sortOrder: "asc" }],
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

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
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
