import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

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
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create" },
      { status: 500 },
    );
  }
}
