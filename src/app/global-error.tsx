"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-4 text-center">
        <p className="font-display text-6xl font-bold text-accent-500">!</p>
        <h1 className="text-3xl font-semibold sm:text-4xl text-brand-950">
          Etwas ist schiefgelaufen
        </h1>
        <p className="max-w-md text-brand-950/70">
          Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es
          erneut oder kommen Sie später zurück.
        </p>
        {process.env.NODE_ENV === "development" && error?.message ? (
          <pre className="max-w-2xl overflow-auto rounded-lg bg-brand-50 p-4 text-left text-xs text-brand-900">
            {error.message}
          </pre>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent-500 px-6 text-sm font-medium tracking-wide text-white shadow-sm transition-colors hover:bg-accent-600"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 text-sm font-medium tracking-wide text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
          >
            Zur Startseite
          </Link>
        </div>
      </body>
    </html>
  );
}
