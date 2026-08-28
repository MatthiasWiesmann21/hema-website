"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Asset = {
  id: string;
  filename: string;
  path: string;
  mimeType: string;
  alt: string | null;
};

export function MediaPicker({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (path: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setAssets(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) fetchAssets();
  }, [open, fetchAssets]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/media", { method: "POST", body: formData });
        if (res.ok) {
          const asset = await res.json();
          setAssets((prev) => [asset, ...prev]);
        }
      }
    } catch {
      // ignore
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/news/... or pick from media"
          className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-900 outline-none focus:border-accent-500"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50"
        >
          Pick
        </button>
      </div>
      {value ? (
        <div className="mt-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="h-24 w-auto rounded-lg border border-brand-100 object-cover"
          />
        </div>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brand-100 px-6 py-4">
              <h2 className="text-lg font-bold text-brand-900">Select Image</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-brand-900/40 hover:text-brand-900"
              >
                ✕
              </button>
            </div>

            <div className="border-b border-brand-100 px-6 py-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
                id="media-picker-upload"
              />
              <label
                htmlFor="media-picker-upload"
                className="cursor-pointer rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50"
              >
                {uploading ? "Uploading..." : "+ Upload New"}
              </label>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-6">
              {loading ? (
                <p className="text-center text-sm text-brand-900/40">Loading...</p>
              ) : assets.length === 0 ? (
                <p className="text-center text-sm text-brand-900/40">
                  No images yet. Upload one above.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => {
                        onChange(asset.path);
                        setOpen(false);
                      }}
                      className="group overflow-hidden rounded-xl border border-brand-100 transition-colors hover:border-accent-500"
                    >
                      <div className="aspect-square bg-brand-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset.path}
                          alt={asset.alt ?? asset.filename}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="truncate p-2 text-xs text-brand-900/60">
                        {asset.filename}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
