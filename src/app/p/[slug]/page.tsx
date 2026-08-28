import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { PageHero } from "@/components/layout/PageHero";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug } });

  if (!page || !page.published) return { title: "Page not found" };

  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? page.excerpt ?? undefined,
    openGraph: {
      title: page.seoTitle ?? page.title,
      description: page.seoDescription ?? page.excerpt ?? undefined,
      images: page.ogImage ? [{ url: page.ogImage }] : undefined,
    },
  };
}

export default async function CustomPagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await prisma.customPage.findUnique({ where: { slug } });

  if (!page || !page.published) notFound();

  if (page.format === "html") {
    return (
      <>
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
