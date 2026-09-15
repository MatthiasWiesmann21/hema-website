"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-center gap-6 py-28 text-center">
      <p className="font-display text-6xl font-bold text-accent-500">!</p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
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
        <Button href="/" variant="ghost">
          Zur Startseite
        </Button>
      </div>
    </Container>
  );
}
