"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RevisionList } from "@/components/admin/RevisionList";

type NewsFormData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  content: string;
  published: boolean;
  scheduledAt: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
};

type NewsFormProps = {
  initialData?: Partial<NewsFormData>;
  postId?: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NewsForm({ initialData, postId }: NewsFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(!!initialData?.slug);

  const [data, setData] = useState<NewsFormData>({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    date: initialData?.date ?? new Date().toISOString().split("T")[0],
    excerpt: initialData?.excerpt ?? "",
    category: initialData?.category ?? "",
    image: initialData?.image ?? "",
    ctaLabel: initialData?.ctaLabel ?? "",
    ctaHref: initialData?.ctaHref ?? "",
    content: initialData?.content ?? "",
    published: initialData?.published ?? false,
    scheduledAt: initialData?.scheduledAt ?? "",
    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",
    ogImage: initialData?.ogImage ?? "",
  });

  const update = useCallback(
    (field: keyof NewsFormData, value: string | boolean) => {
      setData((prev) => {
        const next = { ...prev, [field]: value };
        if (field === "title" && !slugEdited) {
          next.slug = slugify(value as string);
        }
        if (field === "slug") {
          setSlugEdited(true);
        }
        return next;
      });
    },
    [slugEdited],
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = postId ? `/api/admin/news/${postId}` : "/api/admin/news";
    const method = postId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: new Date(data.date).toISOString(),
          category: data.category || undefined,
          image: data.image || undefined,
          ctaLabel: data.ctaLabel || undefined,
          ctaHref: data.ctaHref || undefined,
          scheduledAt: data.scheduledAt ? new Date(data.scheduledAt).toISOString() : undefined,
          seoTitle: data.seoTitle || undefined,
          seoDescription: data.seoDescription || undefined,
          ogImage: data.ogImage || undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save");
      }

      router.push("/admin/neuigkeiten");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!postId) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/neuigkeiten");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setDeleting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-900 outline-none focus:border-accent-500";
  const labelClass = "mb-1.5 block text-sm font-medium text-brand-900/80";

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      {error ? (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className={inputClass}
            placeholder="Post title"
          />
        </div>
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => update("slug", e.target.value)}
            required
            className={inputClass}
            placeholder="url-slug"
          />
          <p className="mt-1 text-xs text-brand-900/40">
            /neuigkeiten/{data.slug || "..."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => update("date", e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
            placeholder="e.g. Standorte, Jobs"
          />
        </div>
        <div>
          <label className={labelClass}>Image</label>
          <MediaPicker
            value={data.image}
            onChange={(v) => update("image", v)}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          required
          rows={2}
          className={inputClass}
          placeholder="Short summary shown in the news list"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass}>CTA Label</label>
          <input
            type="text"
            value={data.ctaLabel}
            onChange={(e) => update("ctaLabel", e.target.value)}
            className={inputClass}
            placeholder="e.g. Jetzt bewerben"
          />
        </div>
        <div>
          <label className={labelClass}>CTA Link</label>
          <input
            type="text"
            value={data.ctaHref}
            onChange={(e) => update("ctaHref", e.target.value)}
            className={inputClass}
            placeholder="/kontakt or https://..."
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Content (Markdown)</label>
        <MarkdownEditor
          value={data.content}
          onChange={(v) => update("content", v)}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-900/80">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => update("published", e.target.checked)}
            className="size-4 rounded border-brand-300"
          />
          Published
        </label>
      </div>

      <div>
        <label className={labelClass}>Schedule (optional)</label>
        <input
          type="datetime-local"
          value={data.scheduledAt}
          onChange={(e) => update("scheduledAt", e.target.value)}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-brand-900/40">
          Post will be visible to the public at this date/time, even if not published.
        </p>
      </div>

      <details className="rounded-xl border border-brand-100 bg-brand-50/30">
        <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-brand-900">
          SEO Settings
        </summary>
        <div className="flex flex-col gap-4 px-6 pb-6">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input
              type="text"
              value={data.seoTitle}
              onChange={(e) => update("seoTitle", e.target.value)}
              className={inputClass}
              placeholder="Overrides the page title for search engines"
            />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <textarea
              value={data.seoDescription}
              onChange={(e) => update("seoDescription", e.target.value)}
              rows={2}
              className={inputClass}
              placeholder="Overrides the meta description for search engines"
            />
          </div>
          <div>
            <label className={labelClass}>OG Image</label>
            <MediaPicker
              value={data.ogImage}
              onChange={(v) => update("ogImage", v)}
              label="OG Image"
            />
          </div>
        </div>
      </details>

      {postId ? (
        <details className="rounded-xl border border-brand-100 bg-brand-50/30">
          <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-brand-900">
            Revision History
          </summary>
          <RevisionList itemType="news" itemId={postId} />
        </details>
      ) : null}

      <div className="flex items-center gap-3 border-t border-brand-100 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : postId ? "Update Post" : "Create Post"}
        </button>
        {data.slug ? (
          <a
            href={`/neuigkeiten/${data.slug}/preview`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-brand-200 px-6 py-2.5 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50"
          >
            Preview
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => router.push("/admin/neuigkeiten")}
          className="rounded-lg border border-brand-200 px-6 py-2.5 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50"
        >
          Cancel
        </button>
        {postId ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto rounded-lg border border-red-200 px-6 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
