import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const itemType = searchParams.get("itemType");
  const itemId = searchParams.get("itemId");

  if (!itemType || !itemId) {
    return NextResponse.json({ error: "itemType and itemId required" }, { status: 400 });
  }

  const revisions = await prisma.revision.findMany({
    where: { itemType, itemId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(
    revisions.map((r) => ({
      id: r.id,
      itemType: r.itemType,
      itemId: r.itemId,
      author: r.author,
      createdAt: r.createdAt.toISOString(),
      content: r.content,
    })),
  );
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { revisionId } = body;

  if (!revisionId) {
    return NextResponse.json({ error: "revisionId required" }, { status: 400 });
  }

  const revision = await prisma.revision.findUnique({
    where: { id: revisionId },
  });

  if (!revision) {
    return NextResponse.json({ error: "Revision not found" }, { status: 404 });
  }

  const snapshot = JSON.parse(revision.content);

  if (revision.itemType === "news") {
    // Save current state as a new revision before restoring
    const current = await prisma.newsPost.findUnique({
      where: { id: revision.itemId },
    });
    if (current) {
      await prisma.revision.create({
        data: {
          itemType: "news",
          itemId: revision.itemId,
          content: JSON.stringify(current),
          author: session.user.email ?? undefined,
        },
      });
    }

    const { id, createdAt, updatedAt, ...restoreData } = snapshot;
    const restored = await prisma.newsPost.update({
      where: { id: revision.itemId },
      data: {
        slug: restoreData.slug,
        title: restoreData.title,
        date: new Date(restoreData.date),
        excerpt: restoreData.excerpt,
        category: restoreData.category ?? null,
        image: restoreData.image ?? null,
        ctaLabel: restoreData.ctaLabel ?? null,
        ctaHref: restoreData.ctaHref ?? null,
        content: restoreData.content,
        published: restoreData.published ?? false,
        scheduledAt: restoreData.scheduledAt ? new Date(restoreData.scheduledAt) : null,
        seoTitle: restoreData.seoTitle ?? null,
        seoDescription: restoreData.seoDescription ?? null,
        ogImage: restoreData.ogImage ?? null,
      },
    });
    return NextResponse.json(restored);
  }

  if (revision.itemType === "page") {
    const current = await prisma.customPage.findUnique({
      where: { id: revision.itemId },
    });
    if (current) {
      await prisma.revision.create({
        data: {
          itemType: "page",
          itemId: revision.itemId,
          content: JSON.stringify(current),
          author: session.user.email ?? undefined,
        },
      });
    }

    const { id, createdAt, updatedAt, ...restoreData } = snapshot;
    const restored = await prisma.customPage.update({
      where: { id: revision.itemId },
      data: {
        slug: restoreData.slug,
        title: restoreData.title,
        excerpt: restoreData.excerpt ?? null,
        content: restoreData.content,
        format: restoreData.format ?? "markdown",
        css: restoreData.css ?? null,
        published: restoreData.published ?? false,
        seoTitle: restoreData.seoTitle ?? null,
        seoDescription: restoreData.seoDescription ?? null,
        ogImage: restoreData.ogImage ?? null,
      },
    });
    return NextResponse.json(restored);
  }

  return NextResponse.json({ error: "Unknown item type" }, { status: 400 });
}
