import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

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
