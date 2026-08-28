"use client";

import { useState, useRef, useCallback } from "react";

type Asset = {
  id: string;
  filename: string;
  path: string;
  mimeType: string;
  size: number;
  alt: string | null;
  createdAt: string;
};

export function MediaGallery({ initialAssets }: { initialAssets: Asset[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/media", { method: "POST", body: formData });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Upload failed");
        }

        const asset = await res.json();
        setAssets((prev) => [asset, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const copyUrl = async (path: string) => {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(path);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard may not be available
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Media Library</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Upload and manage images for your posts and pages.
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            className="cursor-pointer rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {uploading ? "Uploading..." : "+ Upload Images"}
          </label>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {assets.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-brand-100 bg-white px-6 py-16 text-center text-sm text-brand-900/40">
          No images yet. Upload your first image.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="group overflow-hidden rounded-xl border border-brand-100 bg-white"
            >
              <div className="relative aspect-square bg-brand-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset.path}
                  alt={asset.alt ?? asset.filename}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-brand-900" title={asset.filename}>
                  {asset.filename}
                </p>
                <p className="mt-0.5 text-xs text-brand-900/40">
                  {formatSize(asset.size)}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => copyUrl(asset.path)}
                    className="flex-1 rounded-md border border-brand-200 px-2 py-1 text-xs font-medium text-brand-900/70 hover:bg-brand-50"
                  >
                    {copied === asset.path ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(asset.id)}
                    className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
