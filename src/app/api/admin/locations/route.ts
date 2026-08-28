import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const locations = await prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(locations);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const maxOrder = await prisma.location.aggregate({ _max: { sortOrder: true } });
    const location = await prisma.location.create({
      data: {
        city: body.city,
        street: body.street,
        zip: body.zip,
        phone: body.phone,
        phoneHref: body.phoneHref,
        email: body.email || null,
        isHeadquarters: body.isHeadquarters ?? false,
        mapQuery: body.mapQuery,
        sortOrder: body.sortOrder ?? (maxOrder._max.sortOrder ?? -1) + 1,
      },
    });
    return NextResponse.json(location);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
