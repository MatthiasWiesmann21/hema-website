import { PageListClient } from "@/components/admin/PageListClient";
import { prisma } from "@/lib/prisma";

export default async function AdminPagesList() {
  const pages = await prisma.customPage.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <PageListClient
      pages={pages.map((page) => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        format: page.format,
        published: page.published,
      }))}
    />
  );
}
