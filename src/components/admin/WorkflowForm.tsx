"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Connection = {
  id: string;
  name: string;
  baseUrl: string;
  authType: string;
  active: boolean;
};

type Step = {
  connectionId: string;
  method: string;
  path: string;
  transformType: "mapping" | "template" | "code";
  fieldMappings: { source: string; target: string; default?: string }[];
  template: string;
  code: string;
  headers: Record<string, string>;
};

type WorkflowData = {
  id?: string;
  name: string;
  description: string;
  triggerType: string;
  webhookKey?: string | null;
  cronExpression: string;
  active: boolean;
  steps: Step[];
};

export function WorkflowForm({
  initial,
  connections,
}: {
  initial?: WorkflowData;
  connections: Connection[];
}) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [triggerType, setTriggerType] = useState(initial?.triggerType ?? "manual");
  const [webhookKey, setWebhookKey] = useState(initial?.webhookKey ?? null);
  const [cronExpression, setCronExpression] = useState(initial?.cronExpression ?? "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [steps, setSteps] = useState<Step[]>(initial?.steps ?? []);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState("");
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm text-brand-900 outline-none focus:border-accent-500";
  const labelClass = "mb-1 block text-xs font-medium text-brand-900/60";

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      {
        connectionId: connections[0]?.id ?? "",
        method: "POST",
        path: "/",
        transformType: "mapping",
        fieldMappings: [],
        template: '{\n  "data": "{{trigger}}"\n}',
        code: "return { data: input };",
        headers: {},
      },
    ]);
  };

  const updateStep = (index: number, updates: Partial<Step>) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  };

  const removeStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    setSteps((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");

    const data = {
      name,
      description,
      triggerType,
      cronExpression: triggerType === "scheduled" ? cronExpression : null,
      active,
      steps: JSON.stringify(steps),
    };

    try {
      const url = initial?.id
        ? `/api/admin/workflows/${initial.id}`
        : "/api/admin/workflows";
      const method = initial?.id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save");
      router.push("/admin/integrations/workflows");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!initial?.id) {
      setError("Save the workflow first before testing.");
      return;
    }
    setTesting(true);
    setTestResult("");
    try {
      const res = await fetch(`/api/admin/workflows/${initial.id}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload: { test: true } }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestResult(`Execution started: ${data.executionId}`);
      } else {
        setTestResult(`Failed: ${data.error}`);
      }
    } catch {
      setTestResult("Request failed");
    }
    setTesting(false);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {/* Basic Info */}
      <div className="rounded-2xl border border-brand-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-brand-900">Workflow Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Ticket → Performance Entry"
            />
          </div>
          <div>
            <label className={labelClass}>Trigger Type</label>
            <select
              value={triggerType}
              onChange={(e) => setTriggerType(e.target.value)}
              className={inputClass}
            >
              <option value="manual">Manual</option>
              <option value="webhook">Webhook</option>
              <option value="scheduled">Scheduled (Cron)</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
            placeholder="When a ticket is closed, send a performance entry to Proffix"
          />
        </div>

        {triggerType === "webhook" && webhookKey && (
          <div className="mt-4">
            <label className={labelClass}>Webhook URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${typeof window !== "undefined" ? window.location.origin : ""}/api/webhook/${webhookKey}`}
                className={`${inputClass} font-mono text-xs`}
              />
              <button
                type="button"
                onClick={() => {
                  if (webhookKey) {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/api/webhook/${webhookKey}`,
                    );
                  }
                }}
                className="rounded-lg border border-brand-200 px-3 py-2 text-xs font-medium text-brand-900/70 hover:bg-brand-50"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {triggerType === "scheduled" && (
          <div className="mt-4">
            <label className={labelClass}>Cron Expression</label>
            <input
              type="text"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              className={`${inputClass} font-mono text-xs`}
              placeholder="0 * * * * (every hour)"
            />
            <p className="mt-1 text-xs text-brand-900/40">
              Format: minute hour day-of-month month day-of-week. Use * for any, */N for every N.
            </p>
          </div>
        )}

        <label className="mt-4 flex items-center gap-2 text-sm text-brand-900/80">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="size-4 rounded border-brand-300"
          />
          Active
        </label>
      </div>

      {/* Steps */}
      <div className="rounded-2xl border border-brand-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-brand-900">Steps</h2>
          <button
            type="button"
            onClick={addStep}
            disabled={connections.length === 0}
            className="rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-900/70 hover:bg-brand-50 disabled:opacity-50"
          >
            + Add Step
          </button>
        </div>

        {connections.length === 0 && (
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
            No API connections found. Create a connection first.
          </p>
        )}

        <div className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="rounded-xl border border-brand-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-brand-900">Step {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveStep(index, -1)}
                    disabled={index === 0}
                    className="text-xs text-brand-900/40 hover:text-brand-900 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveStep(index, 1)}
                    disabled={index === steps.length - 1}
                    className="text-xs text-brand-900/40 hover:text-brand-900 disabled:opacity-30"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="text-xs font-medium text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Connection</label>
                  <select
                    value={step.connectionId}
                    onChange={(e) => updateStep(index, { connectionId: e.target.value })}
                    className={inputClass}
                  >
                    {connections.map((conn) => (
                      <option key={conn.id} value={conn.id}>
                        {conn.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Method</label>
                  <select
                    value={step.method}
                    onChange={(e) => updateStep(index, { method: e.target.value })}
                    className={inputClass}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Path</label>
                  <input
                    type="text"
                    value={step.path}
                    onChange={(e) => updateStep(index, { path: e.target.value })}
                    className={`${inputClass} font-mono text-xs`}
                    placeholder="/api/resource"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className={labelClass}>Transform Type</label>
                <div className="flex gap-2">
                  {(["mapping", "template", "code"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateStep(index, { transformType: type })}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                        step.transformType === type
                          ? "bg-accent-500 text-white"
                          : "border border-brand-200 text-brand-900/60 hover:bg-brand-50"
                      }`}
                    >
                      {type === "mapping" ? "Field Mapping" : type === "template" ? "JSON Template" : "Code"}
                    </button>
                  ))}
                </div>
              </div>

              {step.transformType === "mapping" && (
                <div className="mt-3">
                  <label className={labelClass}>Field Mappings</label>
                  <div className="space-y-2">
                    {step.fieldMappings.map((mapping, mIndex) => (
                      <div key={mIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={mapping.source}
                          onChange={(e) => {
                            const newMappings = [...step.fieldMappings];
                            newMappings[mIndex] = { ...mapping, source: e.target.value };
                            updateStep(index, { fieldMappings: newMappings });
                          }}
                          className={`${inputClass} text-xs`}
                          placeholder="ticket.customer"
                        />
                        <span className="text-brand-300">→</span>
                        <input
                          type="text"
                          value={mapping.target}
                          onChange={(e) => {
                            const newMappings = [...step.fieldMappings];
                            newMappings[mIndex] = { ...mapping, target: e.target.value };
                            updateStep(index, { fieldMappings: newMappings });
                          }}
                          className={`${inputClass} text-xs`}
                          placeholder="customerId"
                        />
                        <input
                          type="text"
                          value={mapping.default ?? ""}
                          onChange={(e) => {
                            const newMappings = [...step.fieldMappings];
                            newMappings[mIndex] = { ...mapping, default: e.target.value };
                            updateStep(index, { fieldMappings: newMappings });
                          }}
                          className={`${inputClass} text-xs`}
                          placeholder="default"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newMappings = step.fieldMappings.filter((_, i) => i !== mIndex);
                            updateStep(index, { fieldMappings: newMappings });
                          }}
                          className="text-xs text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        updateStep(index, {
                          fieldMappings: [...step.fieldMappings, { source: "", target: "", default: "" }],
                        });
                      }}
                      className="text-xs font-medium text-accent-500 hover:text-accent-600"
                    >
                      + Add mapping
                    </button>
                  </div>
                </div>
              )}

              {step.transformType === "template" && (
                <div className="mt-3">
                  <label className={labelClass}>JSON Template (use {"{{path.to.value}}"} placeholders)</label>
                  <textarea
                    value={step.template}
                    onChange={(e) => updateStep(index, { template: e.target.value })}
                    className={`${inputClass} font-mono text-xs`}
                    rows={6}
                    placeholder='{\n  "customerId": "{{ticket.customer}}",\n  "duration": {{ticket.duration}}\n}'
                  />
                </div>
              )}

              {step.transformType === "code" && (
                <div className="mt-3">
                  <label className={labelClass}>JavaScript Code (return the transformed object)</label>
                  <textarea
                    value={step.code}
                    onChange={(e) => updateStep(index, { code: e.target.value })}
                    className={`${inputClass} font-mono text-xs`}
                    rows={6}
                    placeholder={"// Available: input, previousOutput, trigger\nreturn { customerId: input.ticket.customer };"}
                  />
                </div>
              )}

              <div className="mt-3">
                <label className={labelClass}>Custom Headers (JSON, optional)</label>
                <textarea
                  value={JSON.stringify(step.headers, null, 2)}
                  onChange={(e) => {
                    try {
                      updateStep(index, { headers: JSON.parse(e.target.value) });
                    } catch {
                      // keep as-is
                    }
                  }}
                  className={`${inputClass} font-mono text-xs`}
                  rows={2}
                  placeholder='{}'
                />
              </div>
            </div>
          ))}

          {steps.length === 0 && (
            <p className="py-4 text-center text-sm text-brand-900/40">
              No steps yet. Add a step to define what this workflow does.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !name}
          className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Workflow"}
        </button>
        {initial?.id && (
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
          >
            {testing ? "Testing..." : "Test Run"}
          </button>
        )}
        <button
          type="button"
          onClick={() => router.push("/admin/integrations/workflows")}
          className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
        >
          Cancel
        </button>
      </div>

      {testResult && (
        <div className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900">
          {testResult}
        </div>
      )}
    </div>
  );
}
