"use client";

import { useState } from "react";

type Connection = {
  id: string;
  name: string;
  baseUrl: string;
  authType: string;
  authConfig: string;
  defaultHeaders: string;
  active: boolean;
};

export function ConnectionForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Connection;
  onSave: (data: Omit<Connection, "id">) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [baseUrl, setBaseUrl] = useState(initial?.baseUrl ?? "");
  const [authType, setAuthType] = useState(initial?.authType ?? "none");
  const [authConfig, setAuthConfig] = useState(() => {
    if (initial?.authConfig) {
      try {
        return JSON.parse(initial.authConfig);
      } catch {
        return {};
      }
    }
    return {};
  });
  const [defaultHeaders, setDefaultHeaders] = useState(() => {
    if (initial?.defaultHeaders) {
      try {
        return JSON.parse(initial.defaultHeaders);
      } catch {
        return {};
      }
    }
    return {};
  });
  const [active, setActive] = useState(initial?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>("");

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm text-brand-900 outline-none focus:border-accent-500";
  const labelClass = "mb-1 block text-xs font-medium text-brand-900/60";

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      name,
      baseUrl,
      authType,
      authConfig: JSON.stringify(authConfig),
      defaultHeaders: JSON.stringify(defaultHeaders),
      active,
    });
    setSaving(false);
  };

  const handleTest = async () => {
    if (!initial) return;
    setTesting(true);
    setTestResult("");
    try {
      const res = await fetch(`/api/admin/connections/${initial.id}/test`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setTestResult(`✓ Connected (HTTP ${data.status})`);
      } else {
        setTestResult(`✗ ${data.error || data.statusText || "Failed"}`);
      }
    } catch {
      setTestResult("✗ Request failed");
    }
    setTesting(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Proffix DB"
          />
        </div>
        <div>
          <label className={labelClass}>Base URL</label>
          <input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className={inputClass}
            placeholder="https://api.example.com"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Authentication Type</label>
        <select
          value={authType}
          onChange={(e) => {
            setAuthType(e.target.value);
            setAuthConfig({});
          }}
          className={inputClass}
        >
          <option value="none">None</option>
          <option value="apiKey">API Key</option>
          <option value="bearer">Bearer Token</option>
          <option value="basic">Basic Auth</option>
        </select>
      </div>

      {authType === "apiKey" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Header Name</label>
            <input
              type="text"
              value={authConfig.headerName ?? "X-API-Key"}
              onChange={(e) =>
                setAuthConfig({ ...authConfig, headerName: e.target.value })
              }
              className={inputClass}
              placeholder="X-API-Key"
            />
          </div>
          <div>
            <label className={labelClass}>API Key Value</label>
            <input
              type="password"
              value={authConfig.apiKey ?? ""}
              onChange={(e) =>
                setAuthConfig({ ...authConfig, apiKey: e.target.value })
              }
              className={inputClass}
              placeholder="your-api-key"
            />
          </div>
        </div>
      )}

      {authType === "bearer" && (
        <div>
          <label className={labelClass}>Bearer Token</label>
          <input
            type="password"
            value={authConfig.token ?? ""}
            onChange={(e) =>
              setAuthConfig({ ...authConfig, token: e.target.value })
            }
            className={inputClass}
            placeholder="your-token"
          />
        </div>
      )}

      {authType === "basic" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Username</label>
            <input
              type="text"
              value={authConfig.username ?? ""}
              onChange={(e) =>
                setAuthConfig({ ...authConfig, username: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={authConfig.password ?? ""}
              onChange={(e) =>
                setAuthConfig({ ...authConfig, password: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>Default Headers (JSON)</label>
        <textarea
          value={JSON.stringify(defaultHeaders, null, 2)}
          onChange={(e) => {
            try {
              setDefaultHeaders(JSON.parse(e.target.value));
            } catch {
              // keep as-is on parse error
            }
          }}
          className={`${inputClass} font-mono text-xs`}
          rows={3}
          placeholder='{}'
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-900/80">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="size-4 rounded border-brand-300"
        />
        Active
      </label>

      {testResult && (
        <div
          className={`rounded-lg px-4 py-2 text-sm ${
            testResult.startsWith("✓")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {testResult}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !name || !baseUrl}
          className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {initial && (
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
          >
            {testing ? "Testing..." : "Test Connection"}
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
