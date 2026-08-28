import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { PageHero } from "@/components/layout/PageHero";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug } });

  if (!page) return { title: "Page not found" };

  return {
    title: page.title,
    description: page.excerpt ?? undefined,
  };
}

export default async function CustomPagePreview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  if (!session?.user) notFound();

  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug } });

  if (!page) notFound();

  if (page.format === "html") {
    return (
      <>
        <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-800">
          Preview mode — this page is not published yet.
        </div>
        <PageHero
          eyebrow="Seite"
          title={page.title}
          description={page.excerpt ?? undefined}
          breadcrumb={[{ label: page.title, href: `/p/${page.slug}` }]}
        />
        <Section>
          {page.css ? (
            <style dangerouslySetInnerHTML={{ __html: page.css }} />
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Section>
      </>
    );
  }

  return (
    <>
      <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-800">
        Preview mode — this page is not published yet.
      </div>
      <PageHero
        eyebrow="Seite"
        title={page.title}
        description={page.excerpt ?? undefined}
        breadcrumb={[{ label: page.title, href: `/p/${page.slug}` }]}
      />
      <Section>
        <Prose>
          <MDXRemote source={page.content} />
        </Prose>
      </Section>
    </>
  );
}
