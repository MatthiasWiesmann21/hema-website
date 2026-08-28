import { NextResponse } from "next/server";

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
    // Save current state as revision before updating
    const current = await prisma.newsPost.findUnique({ where: { id } });
    if (current) {
      await prisma.revision.create({
        data: {
          itemType: "news",
          itemId: id,
          content: JSON.stringify(current),
          author: session.user.email ?? undefined,
        },
      });
    }

    const post = await prisma.newsPost.update({
      where: { id },
      data: {
        slug: body.slug,
        title: body.title,
        date: body.date ? new Date(body.date) : undefined,
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
    await prisma.newsPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 },
    );
  }
}
