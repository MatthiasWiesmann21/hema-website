import { prisma } from "@/lib/prisma";
import { mainNav as defaultMainNav, footerNav as defaultFooterNav } from "@/data/site";

export type NavItemData = {
  id: string;
  location: "header" | "footer";
  section: string | null;
  label: string;
  href: string;
  external: boolean;
  sortOrder: number;
  parentId: string | null;
  children?: NavItemData[];
};

export async function getNavItems(
  location: "header" | "footer",
): Promise<NavItemData[]> {
  const rows = await prisma.navItem.findMany({
    where: { location },
    orderBy: { sortOrder: "asc" },
  });

  if (rows.length === 0) {
    if (location === "header") {
      return defaultMainNav.map((item, i) => ({
        id: `fallback-${i}`,
        location: "header" as const,
        section: null,
        label: item.label,
        href: item.href,
        external: item.external ?? false,
        sortOrder: i,
        parentId: null,
        children: item.children?.map((child, ci) => ({
          id: `fallback-${i}-${ci}`,
          location: "header" as const,
          section: null,
          label: child.label,
          href: child.href,
          external: false,
          sortOrder: ci,
          parentId: `fallback-${i}`,
        })),
      }));
    }
    return defaultFooterNav.flatMap((section, si) =>
      section.links.map((link, li) => ({
        id: `fallback-${si}-${li}`,
        location: "footer" as const,
        section: section.title,
        label: link.label,
        href: link.href,
        external: false,
        sortOrder: li,
        parentId: null,
      })),
    );
  }

  const allItems: NavItemData[] = rows.map((row) => ({
    id: row.id,
    location: row.location as "header" | "footer",
    section: row.section,
    label: row.label,
    href: row.href,
    external: row.external,
    sortOrder: row.sortOrder,
    parentId: row.parentId,
  }));

  // Build tree: parents with children attached
  const parents = allItems
    .filter((item) => !item.parentId)
    .map((parent) => ({
      ...parent,
      children: allItems
        .filter((child) => child.parentId === parent.id)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }));

  return parents;
}
