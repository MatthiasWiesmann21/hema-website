"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Submission = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  status: string;
  createdAt: string;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  read: "bg-gray-100 text-gray-600",
  replied: "bg-green-50 text-green-700",
  archived: "bg-amber-50 text-amber-700",
};

export function ContactListClient({ submissions }: { submissions: Submission[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        (s.subject?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [submissions, search, statusFilter]);

  const inputClass =
    "rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm text-brand-900 outline-none focus:border-accent-500";

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-brand-900">Contact Submissions</h1>
        <p className="mt-1 text-sm text-brand-900/60">
          Messages from the contact form on your website.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name, email, subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} min-w-64 flex-1`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={inputClass}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-100 bg-brand-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Subject
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
            {filtered.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-brand-50/30">
                <td className="px-6 py-4 text-sm font-medium text-brand-900">
                  {s.name}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  {s.email}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  {s.subject ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  {new Date(s.createdAt).toLocaleString("de-CH")}
                </td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[s.status] ?? statusColors.new}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/contact/${s.id}`}
                    className="text-sm font-medium text-accent-500 hover:text-accent-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-brand-900/40">
                  {submissions.length === 0
                    ? "No submissions yet."
                    : "No submissions match your filters."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
