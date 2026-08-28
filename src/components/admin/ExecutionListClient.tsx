"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Execution = {
  id: string;
  workflowId: string;
  triggerType: string;
  status: string;
  retryCount: number;
  maxRetries: number;
  durationMs: number | null;
  error: string | null;
  createdAt: string;
  completedAt: string | null;
};

export function ExecutionListClient({
  workflowId,
  workflowName,
}: {
  workflowId: string;
  workflowName: string;
}) {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/workflows/${workflowId}/executions`)
      .then((res) => res.json())
      .then((data) => setExecutions(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [workflowId]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      success: "bg-green-50 text-green-600",
      failed: "bg-red-50 text-red-600",
      running: "bg-blue-50 text-blue-600",
      pending: "bg-gray-100 text-gray-500",
      retrying: "bg-amber-50 text-amber-600",
    };
    return colors[status] ?? "bg-gray-100 text-gray-500";
  };

  if (loading) {
    return <p className="text-sm text-brand-900/40">Loading...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Execution History</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            <Link href="/admin/integrations/workflows" className="text-accent-500 hover:text-accent-600">
              Workflows
            </Link>
            {" / "}
            {workflowName}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full">
          <thead className="border-b border-brand-100 bg-brand-50/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Time</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Trigger</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Retries</th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-900/60 uppercase">Duration</th>
              <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-brand-900/60 uppercase">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {executions.map((exec) => (
              <tr key={exec.id} className="hover:bg-brand-50/30">
                <td className="px-6 py-3 text-sm text-brand-900/60">
                  {new Date(exec.createdAt).toLocaleString("de-CH")}
                </td>
                <td className="px-6 py-3">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-600">
                    {exec.triggerType}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${statusBadge(exec.status)}`}>
                    {exec.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-brand-900/60">
                  {exec.retryCount > 0 ? `${exec.retryCount}/${exec.maxRetries}` : "—"}
                </td>
                <td className="px-6 py-3 text-sm text-brand-900/60">
                  {exec.durationMs ? `${exec.durationMs}ms` : "—"}
                </td>
                <td className="px-6 py-3 text-right">
                  <Link
                    href={`/admin/integrations/executions/${exec.id}`}
                    className="text-xs font-medium text-accent-500 hover:text-accent-600"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
            {executions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-brand-900/40">
                  No executions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
