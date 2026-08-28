"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type LocationFormData = {
  city: string;
  street: string;
  zip: string;
  phone: string;
  phoneHref: string;
  email: string;
  isHeadquarters: boolean;
  mapQuery: string;
  sortOrder: number;
};

type LocationFormProps = {
  initialData?: Partial<LocationFormData>;
  locationId?: string;
};

export function LocationForm({ initialData, locationId }: LocationFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState<LocationFormData>({
    city: initialData?.city ?? "",
    street: initialData?.street ?? "",
    zip: initialData?.zip ?? "",
    phone: initialData?.phone ?? "",
    phoneHref: initialData?.phoneHref ?? "",
    email: initialData?.email ?? "",
    isHeadquarters: initialData?.isHeadquarters ?? false,
    mapQuery: initialData?.mapQuery ?? "",
    sortOrder: initialData?.sortOrder ?? 0,
  });

  const update = useCallback(
    (field: keyof LocationFormData, value: string | boolean | number) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = locationId
      ? `/api/admin/locations/${locationId}`
      : "/api/admin/locations";
    const method = locationId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to save");
      }

      router.push("/admin/locations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!locationId) return;
    if (!confirm("Delete this location?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/locations/${locationId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/locations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  };

  const labelClass = "mb-1.5 block text-sm font-medium text-brand-900/80";
  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-900 outline-none focus:border-accent-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error ? (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>City *</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            required
            className={inputClass}
            placeholder="Ibach"
          />
        </div>
        <div>
          <label className={labelClass}>Sort Order</label>
          <input
            type="number"
            value={data.sortOrder}
            onChange={(e) => update("sortOrder", Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Street *</label>
          <input
            type="text"
            value={data.street}
            onChange={(e) => update("street", e.target.value)}
            required
            className={inputClass}
            placeholder="Gewerbestrasse 28"
          />
        </div>
        <div>
          <label className={labelClass}>ZIP *</label>
          <input
            type="text"
            value={data.zip}
            onChange={(e) => update("zip", e.target.value)}
            required
            className={inputClass}
            placeholder="6438 Ibach / SZ"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            className={inputClass}
            placeholder="+41 41 833 88 88"
          />
        </div>
        <div>
          <label className={labelClass}>Phone href *</label>
          <input
            type="text"
            value={data.phoneHref}
            onChange={(e) => update("phoneHref", e.target.value)}
            required
            className={inputClass}
            placeholder="tel:+41418338888"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="ibach@hema.ch"
          />
        </div>
        <div>
          <label className={labelClass}>Map Query *</label>
          <input
            type="text"
            value={data.mapQuery}
            onChange={(e) => update("mapQuery", e.target.value)}
            required
            className={inputClass}
            placeholder="Gewerbestrasse 28, 6438 Ibach"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-900/80">
          <input
            type="checkbox"
            checked={data.isHeadquarters}
            onChange={(e) => update("isHeadquarters", e.target.checked)}
            className="size-4 rounded border-brand-300"
          />
          Headquarters
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-brand-100 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : locationId ? "Update Location" : "Create Location"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/locations")}
          className="rounded-lg border border-brand-200 px-6 py-2.5 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50"
        >
          Cancel
        </button>
        {locationId ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto rounded-lg border border-red-200 px-6 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
