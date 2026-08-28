"use client";

import { useState } from "react";

type SiteSettingsData = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  email: string;
  url: string;
  social: { label: string; href: string }[];
};

export function SettingsForm({
  initialSettings,
}: {
  initialSettings: SiteSettingsData;
}) {
  const [tab, setTab] = useState<"site" | "password">("site");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [settings, setSettings] = useState<SiteSettingsData>(initialSettings);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-900 outline-none focus:border-accent-500";
  const labelClass = "mb-1.5 block text-sm font-medium text-brand-900/80";

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save");
      }

      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to change password");
      }

      setMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const updateSocial = (
    index: number,
    field: "label" | "href",
    value: string,
  ) => {
    setSettings((prev) => ({
      ...prev,
      social: prev.social.map((s, i) =>
        i === index ? { ...s, [field]: value } : s,
      ),
    }));
  };

  const addSocial = () => {
    setSettings((prev) => ({
      ...prev,
      social: [...prev.social, { label: "", href: "" }],
    }));
  };

  const removeSocial = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      social: prev.social.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-900">Settings</h1>

      <div className="mt-6 flex gap-2 border-b border-brand-100">
        <button
          type="button"
          onClick={() => {
            setTab("site");
            setError("");
            setMessage("");
          }}
          className={
            tab === "site"
              ? "border-b-2 border-accent-500 px-4 py-2.5 text-sm font-medium text-accent-500"
              : "px-4 py-2.5 text-sm font-medium text-brand-900/60 hover:text-brand-900"
          }
        >
          Site Settings
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("password");
            setError("");
            setMessage("");
          }}
          className={
            tab === "password"
              ? "border-b-2 border-accent-500 px-4 py-2.5 text-sm font-medium text-accent-500"
              : "px-4 py-2.5 text-sm font-medium text-brand-900/60 hover:text-brand-900"
          }
        >
          Change Password
        </button>
      </div>

      {error ? (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}
      {message ? (
        <div className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
          {message}
        </div>
      ) : null}

      {tab === "site" ? (
        <form onSubmit={handleSaveSettings} className="mt-6 flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Site Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Short Name</label>
              <input
                type="text"
                value={settings.shortName}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, shortName: e.target.value }))
                }
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, tagline: e.target.value }))
              }
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={settings.description}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>URL</label>
              <input
                type="url"
                value={settings.url}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, url: e.target.value }))
                }
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Social Links</label>
            <div className="flex flex-col gap-3">
              {settings.social.map((link, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateSocial(index, "label", e.target.value)}
                    placeholder="Label"
                    className={inputClass}
                  />
                  <input
                    type="url"
                    value={link.href}
                    onChange={(e) => updateSocial(index, "href", e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => removeSocial(index)}
                    className="shrink-0 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSocial}
                className="self-start rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
              >
                + Add Social Link
              </button>
            </div>
          </div>

          <div className="border-t border-brand-100 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleChangePassword}
          className="mt-6 flex max-w-md flex-col gap-6"
        >
          <div>
            <label className={labelClass}>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className={labelClass}>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className={labelClass}>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="••••••••"
            />
          </div>
          <div className="border-t border-brand-100 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
            >
              {saving ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
