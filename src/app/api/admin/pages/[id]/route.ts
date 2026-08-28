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
    const current = await prisma.customPage.findUnique({ where: { id } });
    if (current) {
      await prisma.revision.create({
        data: {
          itemType: "page",
          itemId: id,
          content: JSON.stringify(current),
          author: session.user.email ?? undefined,
        },
      });
    }

    const page = await prisma.customPage.update({
      where: { id },
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
    return NextResponse.json(page);
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
    await prisma.customPage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete" },
      { status: 500 },
    );
  }
}
