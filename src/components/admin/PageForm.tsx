"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { RevisionList } from "@/components/admin/RevisionList";

type PageFormData = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  format: "markdown" | "html";
  css: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
};

type PageFormProps = {
  initialData?: Partial<PageFormData>;
  pageId?: string;
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

export function PageForm({ initialData, pageId }: PageFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(!!initialData?.slug);

  const [data, setData] = useState<PageFormData>({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    format: initialData?.format ?? "markdown",
    css: initialData?.css ?? "",
    published: initialData?.published ?? false,
    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",
    ogImage: initialData?.ogImage ?? "",
  });

  const update = useCallback(
    (field: keyof PageFormData, value: string | boolean) => {
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

    const url = pageId ? `/api/admin/pages/${pageId}` : "/api/admin/pages";
    const method = pageId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          excerpt: data.excerpt || undefined,
          css: data.css || undefined,
          seoTitle: data.seoTitle || undefined,
          seoDescription: data.seoDescription || undefined,
          ogImage: data.ogImage || undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save");
      }

      router.push("/admin/pages");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!pageId) return;
    if (!confirm("Are you sure you want to delete this page?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pages/${pageId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/pages");
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
            placeholder="Page title"
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
            /p/{data.slug || "..."}
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Excerpt (optional)</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={2}
          className={inputClass}
          placeholder="Short description for SEO and previews"
        />
      </div>

      <div>
        <label className={labelClass}>Format</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm text-brand-900/80">
            <input
              type="radio"
              name="format"
              value="markdown"
              checked={data.format === "markdown"}
              onChange={() => update("format", "markdown")}
              className="size-4"
            />
            Markdown
          </label>
          <label className="flex items-center gap-2 text-sm text-brand-900/80">
            <input
              type="radio"
              name="format"
              value="html"
              checked={data.format === "html"}
              onChange={() => update("format", "html")}
              className="size-4"
            />
            HTML + CSS
          </label>
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Content ({data.format === "markdown" ? "Markdown" : "HTML"})
        </label>
        {data.format === "markdown" ? (
          <MarkdownEditor
            value={data.content}
            onChange={(v) => update("content", v)}
            placeholder="Write your page content in markdown..."
          />
        ) : (
          <textarea
            value={data.content}
            onChange={(e) => update("content", e.target.value)}
            rows={16}
            className="w-full rounded-xl border border-brand-200 bg-white p-4 font-mono text-sm leading-relaxed text-brand-900 outline-none focus:border-accent-500"
            placeholder="<div>Your HTML here</div>"
            spellCheck={false}
          />
        )}
      </div>

      {data.format === "html" ? (
        <div>
          <label className={labelClass}>Custom CSS (optional)</label>
          <textarea
            value={data.css}
            onChange={(e) => update("css", e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-brand-200 bg-white p-4 font-mono text-sm leading-relaxed text-brand-900 outline-none focus:border-accent-500"
            placeholder=".my-class { color: red; }"
            spellCheck={false}
          />
        </div>
      ) : null}

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

      {pageId ? (
        <details className="rounded-xl border border-brand-100 bg-brand-50/30">
          <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-brand-900">
            Revision History
          </summary>
          <RevisionList itemType="page" itemId={pageId} />
        </details>
      ) : null}

      <div className="flex items-center gap-3 border-t border-brand-100 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : pageId ? "Update Page" : "Create Page"}
        </button>
        {data.slug ? (
          <a
            href={`/p/${data.slug}/preview`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-brand-200 px-6 py-2.5 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50"
          >
            Preview
          </a>
        ) : null}
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="rounded-lg border border-brand-200 px-6 py-2.5 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50"
        >
          Cancel
        </button>
        {pageId ? (
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
