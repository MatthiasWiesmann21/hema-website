import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-2 border-brand-200 border-t-accent-500" />
        <p className="text-sm text-brand-950/50">Wird geladen…</p>
      </div>
    </Container>
  );
}
