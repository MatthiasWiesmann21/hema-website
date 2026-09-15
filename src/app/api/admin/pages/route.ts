import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { customPageSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = customPageSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

  try {
    const page = await prisma.customPage.create({
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt || null,
        content: body.content,
        format: body.format || "markdown",
        css: body.css || null,
        published: body.published ?? false,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
        ogImage: body.ogImage || null,
      },
    });
    // Custom pages are served at /p/[slug] and listed in the sitemap.
    revalidatePath("/p/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
