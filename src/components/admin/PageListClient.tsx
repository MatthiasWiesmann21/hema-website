"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Page = {
  id: string;
  title: string;
  slug: string;
  format: string;
  published: boolean;
};

export function PageListClient({ pages }: { pages: Page[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = useMemo(() => {
    return pages.filter((page) => {
      const matchesSearch =
        !search ||
        page.title.toLowerCase().includes(search.toLowerCase()) ||
        page.slug.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && page.published) ||
        (statusFilter === "draft" && !page.published);
      return matchesSearch && matchesStatus;
    });
  }, [pages, search, statusFilter]);

  const inputClass =
    "rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm text-brand-900 outline-none focus:border-accent-500";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Custom Pages</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Create and manage custom pages served at /p/&lt;slug&gt;.
          </p>
        </div>
        <Link
          href="/admin/pages/new"
          className="rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
        >
          + New Page
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} min-w-64 flex-1`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className={inputClass}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-100 bg-brand-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Format
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filtered.map((page) => (
              <tr key={page.id} className="transition-colors hover:bg-brand-50/30">
                <td className="px-6 py-4 text-sm font-medium text-brand-900">
                  {page.title}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  /p/{page.slug}
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    {page.format}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={
                      page.published
                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                        : "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
                    }
                  >
                    {page.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/pages/${page.id}/edit`}
                    className="text-sm font-medium text-accent-500 hover:text-accent-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-brand-900/40">
                  {pages.length === 0
                    ? "No custom pages yet. Create your first one."
                    : "No pages match your filters."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
