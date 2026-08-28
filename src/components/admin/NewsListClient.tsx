"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string | null;
  published: boolean;
  scheduledAt: string | null;
};

export function NewsListClient({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.slug.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && post.published) ||
        (statusFilter === "draft" && !post.published && !(post.scheduledAt && new Date(post.scheduledAt) > new Date())) ||
        (statusFilter === "scheduled" && !post.published && post.scheduledAt && new Date(post.scheduledAt) > new Date());
      const matchesCategory =
        categoryFilter === "all" || post.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, search, statusFilter, categoryFilter]);

  const inputClass =
    "rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm text-brand-900 outline-none focus:border-accent-500";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Neuigkeiten</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Manage your news posts and blog entries.
          </p>
        </div>
        <Link
          href="/admin/neuigkeiten/new"
          className="rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
        >
          + New Post
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
          <option value="scheduled">Scheduled</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={inputClass}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
                Date
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
            {filtered.map((post) => (
              <tr key={post.id} className="transition-colors hover:bg-brand-50/30">
                <td className="px-6 py-4 text-sm font-medium text-brand-900">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  /neuigkeiten/{post.slug}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  {new Date(post.date).toLocaleDateString("de-CH")}
                </td>
                <td className="px-6 py-4">
                  {post.published ? (
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      Published
                    </span>
                  ) : post.scheduledAt && new Date(post.scheduledAt) > new Date() ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      Scheduled
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                      Draft
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/neuigkeiten/${post.id}/edit`}
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
                  {posts.length === 0
                    ? "No posts yet. Create your first one."
                    : "No posts match your filters."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
