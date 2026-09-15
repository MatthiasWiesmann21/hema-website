import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { locationSchema } from "@/lib/schemas";

export async function GET() {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const locations = await prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(locations);
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

  const parsed = locationSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

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
    // Locations are rendered in the root layout (header) and on /kontakt
    // and /support, so revalidate the whole layout to refresh all pages.
    revalidatePath("/", "layout");
    return NextResponse.json(location);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
