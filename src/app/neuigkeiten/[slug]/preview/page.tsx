import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArrowRightIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { auth } from "@/lib/auth";
import { formatDate, getNewsPostForPreview } from "@/lib/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostForPreview(slug);

  if (!post) return { title: "Neuigkeiten" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  if (!session?.user) notFound();

  const { slug } = await params;
  const post = await getNewsPostForPreview(slug);

  if (!post) notFound();

  return (
    <>
      <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-800">
        Preview mode — this post is not published yet.
      </div>

      <PageHero
        eyebrow={post.category ?? "Neuigkeiten"}
        title={post.title}
        description={post.excerpt}
        breadcrumb={[{ label: "Neuigkeiten", href: "/neuigkeiten" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm text-brand-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <Prose className="mt-6">
              <MDXRemote source={post.content} />
            </Prose>

            {post.cta ? (
              <div className="mt-10">
                <Button href={post.cta.href} size="lg">
                  {post.cta.label}
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            ) : null}

            <Link
              href="/neuigkeiten"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600"
            >
              Alle Meldungen
            </Link>
          </div>

          <aside className="flex flex-col gap-6">
            <ImagePlaceholder
              src={post.image}
              label={post.title}
              aspect="4/3"
              tone={post.category === "Jobs" ? "accent" : "brand"}
            />
          </aside>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
