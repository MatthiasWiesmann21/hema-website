"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Connection = {
  id: string;
  name: string;
  baseUrl: string;
  authType: string;
  active: boolean;
  createdAt: string;
};

export function ConnectionListClient() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/connections")
      .then((res) => res.json())
      .then((data) => setConnections(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this connection?")) return;
    await fetch(`/api/admin/connections/${id}`, { method: "DELETE" });
    setConnections((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) {
    return <p className="text-sm text-brand-900/40">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">API Connections</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Manage external API endpoints for workflow integrations.
          </p>
        </div>
        <Link
          href="/admin/integrations/connections/new"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
        >
          + New Connection
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full">
          <thead className="border-b border-brand-100 bg-brand-50/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Base URL</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Auth</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {connections.map((conn) => (
              <tr key={conn.id} className="hover:bg-brand-50/30">
                <td className="px-6 py-3 text-sm font-medium text-brand-900">{conn.name}</td>
                <td className="px-6 py-3 text-sm text-brand-900/60">{conn.baseUrl}</td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-600">{conn.authType}</span>
                </td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${conn.active ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                    {conn.active ? "active" : "inactive"}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <Link href={`/admin/integrations/connections/${conn.id}/edit`} className="text-xs font-medium text-accent-500 hover:text-accent-600">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(conn.id)}
                    className="ml-3 text-xs font-medium text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {connections.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-brand-900/40">
                  No connections yet. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
