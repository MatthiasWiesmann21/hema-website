"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Workflow = {
  id: string;
  name: string;
  description: string | null;
  triggerType: string;
  webhookKey: string | null;
  cronExpression: string | null;
  active: boolean;
  steps: string;
  createdAt: string;
};

export function WorkflowListClient() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/workflows")
      .then((res) => res.json())
      .then((data) => setWorkflows(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this workflow and all execution history?")) return;
    await fetch(`/api/admin/workflows/${id}`, { method: "DELETE" });
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleActive = async (wf: Workflow) => {
    const res = await fetch(`/api/admin/workflows/${wf.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: wf.name,
        description: wf.description,
        triggerType: wf.triggerType,
        cronExpression: wf.cronExpression,
        active: !wf.active,
        steps: wf.steps,
      }),
    });
    if (res.ok) {
      setWorkflows((prev) =>
        prev.map((w) => (w.id === wf.id ? { ...w, active: !w.active } : w)),
      );
    }
  };

  const triggerBadge = (type: string) => {
    const colors: Record<string, string> = {
      manual: "bg-blue-50 text-blue-600",
      webhook: "bg-purple-50 text-purple-600",
      scheduled: "bg-amber-50 text-amber-600",
    };
    return colors[type] ?? "bg-gray-100 text-gray-500";
  };

  if (loading) {
    return <p className="text-sm text-brand-900/40">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Workflows</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Automated integrations between internal APIs.
          </p>
        </div>
        <Link
          href="/admin/integrations/workflows/new"
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
        >
          + New Workflow
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full">
          <thead className="border-b border-brand-100 bg-brand-50/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Trigger</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Steps</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {workflows.map((wf) => {
              const stepCount = JSON.parse(wf.steps || "[]").length;
              return (
                <tr key={wf.id} className="hover:bg-brand-50/30">
                  <td className="px-6 py-3">
                    <div className="text-sm font-medium text-brand-900">{wf.name}</div>
                    {wf.description && (
                      <div className="text-xs text-brand-900/40">{wf.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${triggerBadge(wf.triggerType)}`}>
                      {wf.triggerType}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-brand-900/60">{stepCount}</td>
                  <td className="px-6 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(wf)}
                      className={`rounded-full px-2 py-0.5 text-xs ${wf.active ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}
                    >
                      {wf.active ? "active" : "inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link href={`/admin/integrations/workflows/${wf.id}/edit`} className="text-xs font-medium text-accent-500 hover:text-accent-600">
                      Edit
                    </Link>
                    <Link href={`/admin/integrations/workflows/${wf.id}/executions`} className="ml-3 text-xs font-medium text-brand-900/60 hover:text-brand-900">
                      History
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(wf.id)}
                      className="ml-3 text-xs font-medium text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {workflows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-brand-900/40">
                  No workflows yet. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
