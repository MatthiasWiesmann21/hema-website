import { prisma } from "@/lib/prisma";
import { site as defaultSite } from "@/data/site";

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  url: string;
  social: { label: string; href: string }[];
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await prisma.siteSetting.findUnique({
    where: { id: "singleton" },
  });

  if (!row) {
    return {
      name: defaultSite.name,
      shortName: defaultSite.shortName,
      tagline: defaultSite.tagline,
      description: defaultSite.description,
      email: defaultSite.email,
      url: defaultSite.url,
      social: [...defaultSite.social],
    };
  }

  return {
    name: row.name,
    shortName: row.shortName,
    tagline: row.tagline,
    description: row.description,
    email: row.email,
    url: row.url,
    social: row.social as { label: string; href: string }[],
  };
}
