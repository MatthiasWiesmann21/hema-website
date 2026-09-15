import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { siteSettingsSchema } from "@/lib/schemas";

export async function GET() {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const settings = await prisma.siteSetting.findUnique({
    where: { id: "singleton" },
  });

  if (!settings) {
    return NextResponse.json({ error: "Settings not found" }, { status: 404 });
  }

  return NextResponse.json(settings);
}

export async function PATCH(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = siteSettingsSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

  try {
    const settings = await prisma.siteSetting.update({
      where: { id: "singleton" },
      data: {
        name: body.name,
        shortName: body.shortName,
        tagline: body.tagline,
        description: body.description,
        email: body.email,
        url: body.url,
        social: body.social,
      },
    });
    // Settings are used in the root layout (metadata, footer) and many pages,
    // so revalidate the whole layout to refresh all pages.
    revalidatePath("/", "layout");
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update" },
      { status: 500 },
    );
  }
}
