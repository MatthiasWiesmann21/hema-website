import { prisma } from "@/lib/prisma";

export type NewsMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  image?: string;
  cta?: { label: string; href: string };
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
};

export type NewsPost = NewsMeta & { content: string };

export async function getAllNews(): Promise<NewsPost[]> {
  const posts = await prisma.newsPost.findMany({
    where: {
      OR: [
        { published: true },
        { scheduledAt: { lte: new Date() } },
      ],
    },
    orderBy: { date: "desc" },
  });

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date.toISOString(),
    excerpt: post.excerpt,
    category: post.category ?? undefined,
    image: post.image ?? undefined,
    cta:
      post.ctaLabel && post.ctaHref
        ? { label: post.ctaLabel, href: post.ctaHref }
        : undefined,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    ogImage: post.ogImage ?? undefined,
    content: post.content,
  }));
}

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  const post = await prisma.newsPost.findUnique({
    where: { slug },
  });

  if (!post) return undefined;

  const isVisible = post.published || (post.scheduledAt && post.scheduledAt <= new Date());
  if (!isVisible) return undefined;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date.toISOString(),
    excerpt: post.excerpt,
    category: post.category ?? undefined,
    image: post.image ?? undefined,
    cta:
      post.ctaLabel && post.ctaHref
        ? { label: post.ctaLabel, href: post.ctaHref }
        : undefined,
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    ogImage: post.ogImage ?? undefined,
    content: post.content,
  };
}

export async function getNewsPostForPreview(
  slug: string,
): Promise<NewsPost | undefined> {
  const post = await prisma.newsPost.findUnique({
    where: { slug },
  });

  if (!post) return undefined;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date.toISOString(),
    excerpt: post.excerpt,
    category: post.category ?? undefined,
    image: post.image ?? undefined,
    cta:
      post.ctaLabel && post.ctaHref
        ? { label: post.ctaLabel, href: post.ctaHref }
        : undefined,
    content: post.content,
  };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
