import { NewsListClient } from "@/components/admin/NewsListClient";
import { prisma } from "@/lib/prisma";

export default async function AdminNewsList() {
  const posts = await prisma.newsPost.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <NewsListClient
      posts={posts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.date.toISOString(),
        category: post.category,
        published: post.published,
        scheduledAt: post.scheduledAt?.toISOString() ?? null,
      }))}
    />
  );
}
