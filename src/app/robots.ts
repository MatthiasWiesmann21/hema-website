import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/settings";

export async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${settings.url}/sitemap.xml`,
  };
}
