import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { formatDate, type NewsMeta } from "@/lib/news";
import { cn } from "@/lib/utils";

export function NewsCard({
  post,
  className,
}: {
  post: NewsMeta;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition-all hover:shadow-card-hover",
        className,
      )}
    >
      <Link href={`/neuigkeiten/${post.slug}`} className="block">
        <ImagePlaceholder
          src={post.image}
          label={post.title}
          aspect="16/9"
          rounded="rounded-none"
          tone={post.category === "Jobs" ? "accent" : "brand"}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs font-medium tracking-wide text-brand-500 uppercase">
          {post.category ? (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">
              {post.category}
            </span>
          ) : null}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="text-xl font-semibold">
          <Link
            href={`/neuigkeiten/${post.slug}`}
            className="transition-colors group-hover:text-accent-500"
          >
            {post.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-brand-950/70">
          {post.excerpt}
        </p>
        <Link
          href={`/neuigkeiten/${post.slug}`}
          className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600"
        >
          Weiterlesen
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
