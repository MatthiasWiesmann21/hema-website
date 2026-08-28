"use client";

import { useState, useEffect, useCallback } from "react";

type Revision = {
  id: string;
  author: string | null;
  createdAt: string;
  content: string;
};

export function RevisionList({
  itemType,
  itemId,
}: {
  itemType: "news" | "page";
  itemId: string;
}) {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchRevisions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/revisions?itemType=${itemType}&itemId=${itemId}`,
      );
      if (res.ok) {
        const data = await res.json();
        setRevisions(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [itemType, itemId]);

  useEffect(() => {
    fetchRevisions();
  }, [fetchRevisions]);

  const handleRestore = async (revisionId: string) => {
    if (!confirm("Restore this revision? Current state will be saved as a new revision.")) return;

    setRestoring(revisionId);
    setError("");
    try {
      const res = await fetch("/api/admin/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revisionId }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to restore");
      }
      // Refresh the page to show restored content
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Restore failed");
      setRestoring(null);
    }
  };

  const getSnapshotPreview = (content: string) => {
    try {
      const snapshot = JSON.parse(content);
      return {
        title: snapshot.title ?? "(no title)",
        excerpt: snapshot.excerpt ?? "",
        published: snapshot.published ?? false,
      };
    } catch {
      return { title: "(invalid)", excerpt: "", published: false };
    }
  };

  if (loading) {
    return (
      <p className="px-6 py-4 text-sm text-brand-900/40">Loading revisions...</p>
    );
  }

  if (revisions.length === 0) {
    return (
      <p className="px-6 py-4 text-sm text-brand-900/40">No revisions yet.</p>
    );
  }

  return (
    <div>
      {error ? (
        <div className="mx-6 mb-3 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </div>
      ) : null}
      <div className="divide-y divide-brand-100">
        {revisions.map((revision) => {
          const preview = getSnapshotPreview(revision.content);
          const isExpanded = expanded === revision.id;

          return (
            <div key={revision.id} className="px-6 py-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : revision.id)}
                  className="flex flex-col text-left"
                >
                  <span className="text-sm font-medium text-brand-900">
                    {new Date(revision.createdAt).toLocaleString("de-CH")}
                  </span>
                  <span className="text-xs text-brand-900/40">
                    by {revision.author ?? "unknown"} — {preview.title}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRestore(revision.id)}
                  disabled={restoring === revision.id}
                  className="rounded-md border border-brand-200 px-3 py-1 text-xs font-medium text-brand-900/70 hover:bg-brand-50 disabled:opacity-50"
                >
                  {restoring === revision.id ? "Restoring..." : "Restore"}
                </button>
              </div>
              {isExpanded ? (
                <div className="mt-2 rounded-lg bg-brand-50/50 p-3">
                  <p className="text-xs text-brand-900/60">
                    <strong>Title:</strong> {preview.title}
                  </p>
                  <p className="mt-1 text-xs text-brand-900/60">
                    <strong>Status:</strong> {preview.published ? "Published" : "Draft"}
                  </p>
                  {preview.excerpt ? (
                    <p className="mt-1 text-xs text-brand-900/60">
                      <strong>Excerpt:</strong> {preview.excerpt.slice(0, 120)}
                      {preview.excerpt.length > 120 ? "..." : ""}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
