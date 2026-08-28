"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type StepLog = {
  stepIndex: number;
  connectionName: string;
  method: string;
  url: string;
  requestHeaders: Record<string, string>;
  requestBody: unknown;
  responseStatus: number;
  responseBody: unknown;
  durationMs: number;
  error?: string;
};

type Execution = {
  id: string;
  workflowId: string;
  triggerType: string;
  status: string;
  inputPayload: string;
  outputPayload: string | null;
  error: string | null;
  retryCount: number;
  maxRetries: number;
  durationMs: number | null;
  stepLogs: string | null;
  createdAt: string;
  completedAt: string | null;
};

export function ExecutionDetailClient({ id }: { id: string }) {
  const [execution, setExecution] = useState<Execution | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/executions/${id}`)
      .then((res) => res.json())
      .then((data) => setExecution(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleRetry = async () => {
    setRetrying(true);
    try {
      const res = await fetch(`/api/admin/executions/${id}/retry`, { method: "POST" });
      const data = await res.json();
      if (res.ok && data.executionId) {
        window.location.href = `/admin/integrations/executions/${data.executionId}`;
      }
    } catch {
      // ignore
    }
    setRetrying(false);
  };

  if (loading) {
    return <p className="text-sm text-brand-900/40">Loading...</p>;
  }

  if (!execution) {
    return <p className="text-sm text-red-500">Execution not found.</p>;
  }

  const stepLogs: StepLog[] = execution.stepLogs
    ? JSON.parse(execution.stepLogs)
    : [];

  const inputPayload = (() => {
    try {
      return JSON.parse(execution.inputPayload);
    } catch {
      return execution.inputPayload;
    }
  })();

  const outputPayload = execution.outputPayload
    ? (() => {
        try {
          return JSON.parse(execution.outputPayload);
        } catch {
          return execution.outputPayload;
        }
      })()
    : null;

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

  const jsonBlock = (data: unknown, label: string) => (
    <div>
      <h3 className="text-sm font-semibold text-brand-900/70">{label}</h3>
      <pre className="mt-2 overflow-x-auto rounded-lg bg-brand-950 p-4 text-xs text-white/80">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Execution Detail</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            <Link href="/admin/integrations/workflows" className="text-accent-500 hover:text-accent-600">
              Workflows
            </Link>
            {" / "}
            <Link href={`/admin/integrations/workflows/${execution.workflowId}/executions`} className="text-accent-500 hover:text-accent-600">
              History
            </Link>
            {" / "}
            {execution.id.slice(-8)}
          </p>
        </div>
        {execution.status === "failed" && (
          <button
            type="button"
            onClick={handleRetry}
            disabled={retrying}
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-50"
          >
            {retrying ? "Retrying..." : "Retry"}
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-brand-100 bg-white p-4">
          <p className="text-xs font-medium text-brand-500">Status</p>
          <p className="mt-1">
            <span className={`rounded-full px-2 py-0.5 text-xs ${statusBadge(execution.status)}`}>
              {execution.status}
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-4">
          <p className="text-xs font-medium text-brand-500">Trigger</p>
          <p className="mt-1 text-sm font-medium text-brand-900">{execution.triggerType}</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-4">
          <p className="text-xs font-medium text-brand-500">Duration</p>
          <p className="mt-1 text-sm font-medium text-brand-900">
            {execution.durationMs ? `${execution.durationMs}ms` : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-4">
          <p className="text-xs font-medium text-brand-500">Retries</p>
          <p className="mt-1 text-sm font-medium text-brand-900">
            {execution.retryCount > 0 ? `${execution.retryCount}/${execution.maxRetries}` : "0"}
          </p>
        </div>
      </div>

      {execution.error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <strong>Error:</strong> {execution.error}
        </div>
      )}

      {/* Input/Output */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          {jsonBlock(inputPayload, "Input Payload")}
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-6">
          {outputPayload ? jsonBlock(outputPayload, "Output Payload") : (
            <p className="text-sm text-brand-900/40">No output (execution may have failed)</p>
          )}
        </div>
      </div>

      {/* Step Logs */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-brand-900">Step Logs</h2>
        <div className="mt-4 space-y-4">
          {stepLogs.map((log, i) => (
            <div key={i} className="rounded-2xl border border-brand-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-brand-900">
                  Step {log.stepIndex + 1}: {log.connectionName}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="rounded bg-brand-50 px-2 py-0.5 font-mono text-xs text-brand-600">
                    {log.method}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    log.responseStatus >= 200 && log.responseStatus < 300
                      ? "bg-green-50 text-green-600"
                      : log.responseStatus === 0
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-600"
                  }`}>
                    {log.responseStatus === 0 ? "error" : log.responseStatus}
                  </span>
                  <span className="text-xs text-brand-900/40">{log.durationMs}ms</span>
                </div>
              </div>

              <p className="mt-2 font-mono text-xs text-brand-900/60">{log.url}</p>

              {log.error && (
                <p className="mt-2 text-sm text-red-600">{log.error}</p>
              )}

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold text-brand-900/50">Request Body</h4>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-brand-950 p-3 text-xs text-white/80">
                    {JSON.stringify(log.requestBody, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-brand-900/50">Response Body</h4>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-brand-950 p-3 text-xs text-white/80">
                    {typeof log.responseBody === "string"
                      ? log.responseBody
                      : JSON.stringify(log.responseBody, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ))}
          {stepLogs.length === 0 && (
            <p className="py-4 text-sm text-brand-900/40">No step logs recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
}
