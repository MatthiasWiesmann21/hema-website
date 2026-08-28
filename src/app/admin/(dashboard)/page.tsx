import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [newsCount, pagesCount, publishedNews, publishedPages, newContacts] =
    await Promise.all([
      prisma.newsPost.count(),
      prisma.customPage.count(),
      prisma.newsPost.count({ where: { published: true } }),
      prisma.customPage.count({ where: { published: true } }),
      prisma.contactSubmission.count({ where: { status: "new" } }),
    ]);

  const stats = [
    { label: "News Posts", total: newsCount, published: publishedNews, href: "/admin/neuigkeiten" },
    { label: "Custom Pages", total: pagesCount, published: publishedPages, href: "/admin/pages" },
    { label: "New Contact Messages", total: newContacts, published: null, href: "/admin/contact" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Dashboard</h1>
      <p className="mt-2 text-sm text-brand-900/60">
        Welcome back. Here&apos;s an overview of your content.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-brand-100 bg-white p-6 transition-all hover:border-brand-200 hover:shadow-card-hover"
          >
            <p className="text-sm font-medium text-brand-500">{stat.label}</p>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-brand-900">{stat.total}</span>
              {stat.published !== null ? (
                <span className="text-sm text-brand-900/50">
                  {stat.published} published
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
