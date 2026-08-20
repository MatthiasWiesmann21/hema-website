import type { MetadataRoute } from "next";

import { services } from "@/data/services";
import { site } from "@/data/site";
import { getAllNews } from "@/lib/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
      url: `${site.url}${route}`,
      lastModified: new Date(),
      priority: route === "/" ? 1 : 0.7,
    })),
    ...serviceRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
    ...news.map((post) => ({
      url: `${site.url}/neuigkeiten/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.5,
    })),
  ];
}
