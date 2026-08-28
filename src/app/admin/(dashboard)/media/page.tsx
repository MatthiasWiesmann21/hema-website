import { MediaGallery } from "@/components/admin/MediaGallery";
import { prisma } from "@/lib/prisma";

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <MediaGallery
      initialAssets={assets.map((a) => ({
        id: a.id,
        filename: a.filename,
        path: a.path,
        mimeType: a.mimeType,
        size: a.size,
        alt: a.alt,
        createdAt: a.createdAt.toISOString(),
      }))}
    />
  );
}
