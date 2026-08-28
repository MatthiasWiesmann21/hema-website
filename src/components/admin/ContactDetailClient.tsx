"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export function ContactDetailClient({ submission }: { submission: Submission }) {
  const router = useRouter();
  const [status, setStatus] = useState(submission.status);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/contact/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setStatus(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this submission?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/contact/${submission.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.push("/admin/contact");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-50 text-blue-700",
    read: "bg-gray-100 text-gray-600",
    replied: "bg-green-50 text-green-700",
    archived: "bg-amber-50 text-amber-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Contact Submission</h1>
        <button
          type="button"
          onClick={() => router.push("/admin/contact")}
          className="text-sm font-medium text-brand-900/60 hover:text-brand-900"
        >
          ← Back to list
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Name</p>
            <p className="mt-1 text-sm text-brand-900">{submission.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Email</p>
            <p className="mt-1 text-sm text-brand-900">
              <a href={`mailto:${submission.email}`} className="text-accent-500 hover:text-accent-600">
                {submission.email}
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Phone</p>
            <p className="mt-1 text-sm text-brand-900">
              {submission.phone ? (
                <a href={`tel:${submission.phone}`} className="text-accent-500 hover:text-accent-600">
                  {submission.phone}
                </a>
              ) : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Subject</p>
            <p className="mt-1 text-sm text-brand-900">{submission.subject ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Date</p>
            <p className="mt-1 text-sm text-brand-900">
              {new Date(submission.createdAt).toLocaleString("de-CH")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Status</p>
            <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[status] ?? statusColors.new}`}>
              {status}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-brand-100 pt-6">
          <p className="text-xs font-semibold tracking-wide text-brand-500 uppercase">Message</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-brand-900">
            {submission.message}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-brand-100 pt-6">
          <button
            type="button"
            onClick={() => updateStatus("read")}
            disabled={updating || status === "read"}
            className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50 disabled:opacity-50"
          >
            Mark as Read
          </button>
          <button
            type="button"
            onClick={() => updateStatus("replied")}
            disabled={updating || status === "replied"}
            className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50 disabled:opacity-50"
          >
            Mark as Replied
          </button>
          <button
            type="button"
            onClick={() => updateStatus("archived")}
            disabled={updating || status === "archived"}
            className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-900/70 hover:bg-brand-50 disabled:opacity-50"
          >
            Archive
          </button>
          <a
            href={`mailto:${submission.email}?subject=Re: ${encodeURIComponent(submission.subject ?? "Ihre Anfrage")}`}
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600"
          >
            Reply via Email
          </a>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
