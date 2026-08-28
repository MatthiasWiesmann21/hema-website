import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArrowRightIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { NewsCard } from "@/components/sections/NewsCard";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { formatDate, getAllNews, getNewsPost } from "@/lib/news";

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/neuigkeiten/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) return { title: "Neuigkeiten" };

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      images: post.ogImage ? [{ url: post.ogImage }] : post.image ? [{ url: post.image }] : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/neuigkeiten/[slug]">) {
  const { slug } = await params;
  const post = await getNewsPost(slug);

  if (!post) notFound();

  const others = (await getAllNews())
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
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
            <div className="rounded-2xl border border-brand-100 p-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
                Fragen dazu?
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-950/70">
                Rufen Sie uns an oder schreiben Sie uns – wir helfen gerne
                weiter.
              </p>
              <Button
                href="/kontakt"
                variant="ghost"
                size="sm"
                className="mt-5"
              >
                Kontakt
              </Button>
            </div>
          </aside>
        </div>
      </Section>

      {others.length ? (
        <Section tone="muted">
          <h2 className="text-2xl font-semibold">Weitere Meldungen</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((entry) => (
              <NewsCard key={entry.slug} post={entry} />
            ))}
          </div>
        </Section>
      ) : null}

      <ContactCta />
    </>
  );
}
