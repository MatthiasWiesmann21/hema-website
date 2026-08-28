import { notFound } from "next/navigation";

import { PageForm } from "@/components/admin/PageForm";
import { prisma } from "@/lib/prisma";

export default async function EditCustomPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.customPage.findUnique({ where: { id } });

  if (!page) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Edit Custom Page</h1>
      <PageForm
        pageId={page.id}
        initialData={{
          slug: page.slug,
          title: page.title,
          excerpt: page.excerpt ?? "",
          content: page.content,
          format: page.format as "markdown" | "html",
          css: page.css ?? "",
          published: page.published,
          seoTitle: page.seoTitle ?? "",
          seoDescription: page.seoDescription ?? "",
          ogImage: page.ogImage ?? "",
        }}
      />
    </div>
  );
}
