import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json(assets);
}

export async function POST(request: Request) {
  const adminError = await requireAdmin();
  if (adminError) return adminError;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string | null) ?? "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const maxSize = 10 * 1024 * 1024; // 10 MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const uploadDir = path.join(process.cwd(), "public", "uploads", String(year), month);
  const urlPath = `/uploads/${year}/${month}`;

  await fs.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const baseName = path.basename(file.name, ext);
  const safeName = `${baseName.replace(/[^a-zA-Z0-9-_]/g, "-")}${ext}`;
  const filePath = path.join(uploadDir, safeName);
  const publicPath = `${urlPath}/${safeName}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const asset = await prisma.mediaAsset.create({
    data: {
      filename: file.name,
      path: publicPath,
      mimeType: file.type,
      size: file.size,
      alt: alt || null,
    },
  });

  return NextResponse.json(asset);
}
