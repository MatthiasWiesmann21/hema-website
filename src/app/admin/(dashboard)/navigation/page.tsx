import { NavEditorClient } from "@/components/admin/NavEditorClient";
import { prisma } from "@/lib/prisma";

export default async function AdminNavigationPage() {
  const items = await prisma.navItem.findMany({
    orderBy: [{ location: "asc" }, { sortOrder: "asc" }],
  });

  return (
    <NavEditorClient
      initialItems={items.map((item) => ({
        id: item.id,
        location: item.location,
        section: item.section,
        label: item.label,
        href: item.href,
        external: item.external,
        sortOrder: item.sortOrder,
        parentId: item.parentId,
      }))}
    />
  );
}
