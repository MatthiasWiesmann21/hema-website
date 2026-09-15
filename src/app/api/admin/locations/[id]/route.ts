import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  try {
    const location = await prisma.location.update({
      where: { id },
      data: {
        city: body.city,
        street: body.street,
        zip: body.zip,
        phone: body.phone,
        phoneHref: body.phoneHref,
        email: body.email || null,
        isHeadquarters: body.isHeadquarters ?? false,
        mapQuery: body.mapQuery,
        sortOrder: body.sortOrder,
      },
    });
    // Locations are rendered in the root layout (header) and on /kontakt
    // and /support, so revalidate the whole layout to refresh all pages.
    revalidatePath("/", "layout");
    return NextResponse.json(location);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.location.delete({ where: { id } });
    // Locations are rendered in the root layout (header) and on /kontakt
    // and /support, so revalidate the whole layout to refresh all pages.
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 },
    );
  }
}
