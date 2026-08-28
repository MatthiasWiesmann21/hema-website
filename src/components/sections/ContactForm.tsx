"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const update = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to submit");
      }

      setSuccess(true);
      setData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-900 outline-none focus:border-accent-500";
  const labelClass = "mb-1.5 block text-sm font-medium text-brand-900/80";

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-lg font-semibold text-green-700">
          Vielen Dank für Ihre Nachricht!
        </p>
        <p className="mt-2 text-sm text-green-600">
          Wir melden uns so bald wie möglich bei Ihnen.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 rounded-lg border border-green-300 px-6 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
        >
          Weitere Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error ? (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            required
            className={inputClass}
            placeholder="Ihr Name"
          />
        </div>
        <div>
          <label className={labelClass}>E-Mail *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            required
            className={inputClass}
            placeholder="ihre@email.ch"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Telefon</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="+41 41 833 88 88"
          />
        </div>
        <div>
          <label className={labelClass}>Betreff</label>
          <input
            type="text"
            value={data.subject}
            onChange={(e) => update("subject", e.target.value)}
            className={inputClass}
            placeholder="Worum geht es?"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Nachricht *</label>
        <textarea
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          required
          rows={5}
          className={inputClass}
          placeholder="Wie können wir Ihnen helfen?"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-lg bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-50"
      >
        {submitting ? "Wird gesendet..." : "Nachricht senden"}
      </button>
    </form>
  );
}
