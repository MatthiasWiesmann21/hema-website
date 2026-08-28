import type { MetadataRoute } from "next";

import { services } from "@/data/services";
import { getAllNews } from "@/lib/news";
import { getSiteSettings } from "@/lib/settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const staticRoutes = [
    "/",
    "/leistungen",
    "/firma/firmenprofil",
    "/firma/team",
    "/firma/partner",
    "/kontakt",
    "/support",
    "/neuigkeiten",
    "/impressum",
    "/datenschutzerklaerung",
  ];

  const serviceRoutes = services.map(
    (service) => `/leistungen/${service.slug}`,
  );
  const news = await getAllNews();

  return [
    ...staticRoutes.map((route) => ({
      url: `${settings.url}${route}`,
      lastModified: new Date(),
      priority: route === "/" ? 1 : 0.7,
    })),
    ...serviceRoutes.map((route) => ({
      url: `${settings.url}${route}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...news.map((post) => ({
      url: `${settings.url}/neuigkeiten/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.5,
    })),
  ];
}
