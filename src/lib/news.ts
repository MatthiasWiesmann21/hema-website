import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "src/content/news");

export type NewsMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  image?: string;
  cta?: { label: string; href: string };
};

export type NewsPost = NewsMeta & { content: string };

export async function getAllNews(): Promise<NewsPost[]> {
  const files = await fs.readdir(NEWS_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(NEWS_DIR, file), "utf8");
        const { data, content } = matter(raw);
        return {
          slug: file.replace(/\.mdx$/, ""),
          content,
          ...(data as Omit<NewsMeta, "slug">),
        } satisfies NewsPost;
      }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  const posts = await getAllNews();
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
