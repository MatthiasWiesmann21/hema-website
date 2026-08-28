import { notFound } from "next/navigation";

import { NewsForm } from "@/components/admin/NewsForm";
import { prisma } from "@/lib/prisma";

export default async function EditNewsPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Edit News Post</h1>
      <NewsForm
        postId={post.id}
        initialData={{
          slug: post.slug,
          title: post.title,
          date: post.date.toISOString().split("T")[0],
          excerpt: post.excerpt,
          category: post.category ?? "",
          image: post.image ?? "",
          ctaLabel: post.ctaLabel ?? "",
          ctaHref: post.ctaHref ?? "",
          content: post.content,
          published: post.published,
          scheduledAt: post.scheduledAt
            ? post.scheduledAt.toISOString().slice(0, 16)
            : "",
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          ogImage: post.ogImage ?? "",
        }}
      />
    </div>
  );
}
