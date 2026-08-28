import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });

  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", asset.path);
  try {
    await fs.unlink(filePath);
  } catch {
    // File may already be deleted, continue
  }

  await prisma.mediaAsset.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
