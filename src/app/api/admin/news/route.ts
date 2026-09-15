import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { newsPostSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = newsPostSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;

  try {
    const post = await prisma.newsPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        date: body.date ? new Date(body.date) : new Date(),
        excerpt: body.excerpt,
        category: body.category || null,
        image: body.image || null,
        ctaLabel: body.ctaLabel || null,
        ctaHref: body.ctaHref || null,
        content: body.content,
        published: body.published ?? false,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
        ogImage: body.ogImage || null,
      },
    });
    // News appears on the homepage, /neuigkeiten list, individual post pages,
    // and the sitemap — revalidate all of them.
    revalidatePath("/");
    revalidatePath("/neuigkeiten");
    revalidatePath("/neuigkeiten/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
