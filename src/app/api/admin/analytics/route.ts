import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [totalViews, dailyViews, topPages, recentViews] = await Promise.all([
    prisma.pageView.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { path: true, createdAt: true },
    }),
    prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: true,
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    prisma.pageView.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  // Build daily breakdown
  const dailyMap: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dailyMap[key] = 0;
  }
  for (const view of dailyViews) {
    const key = view.createdAt.toISOString().slice(0, 10);
    if (key in dailyMap) {
      dailyMap[key]++;
    }
  }

  return NextResponse.json({
    totalViews,
    daily: Object.entries(dailyMap).map(([date, count]) => ({ date, count })),
    topPages: topPages.map((p) => ({ path: p.path, views: p._count })),
    recentViews: recentViews.map((v) => ({
      path: v.path,
      referrer: v.referrer,
      createdAt: v.createdAt.toISOString(),
    })),
  });
}
