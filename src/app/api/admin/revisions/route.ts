import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revisionRestoreSchema } from "@/lib/schemas";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = revisionRestoreSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const body = parsed.data;
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

    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...restoreData } = snapshot;
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
    // Revalidate all news-related cached pages.
    revalidatePath("/");
    revalidatePath("/neuigkeiten");
    revalidatePath("/neuigkeiten/[slug]", "page");
    revalidatePath("/sitemap.xml");
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

    const { id: _id2, createdAt: _createdAt2, updatedAt: _updatedAt2, ...restoreData } = snapshot;
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
    // Revalidate all custom-page-related cached pages.
    revalidatePath("/p/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json(restored);
  }

  return NextResponse.json({ error: "Unknown item type" }, { status: 400 });
}
