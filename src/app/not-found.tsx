import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-6 py-28 text-center">
      <p className="font-display text-6xl font-bold text-accent-500">404</p>
      <h1 className="text-3xl font-semibold sm:text-4xl">
        Diese Seite gibt es nicht
      </h1>
      <p className="max-w-md text-brand-950/70">
        Die aufgerufene Seite wurde verschoben oder existiert nicht mehr. Nutzen
        Sie die Navigation oder gehen Sie zurück zur Startseite.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/">Zur Startseite</Button>
        <Button href="/kontakt" variant="ghost">
          Kontakt
        </Button>
      </div>
    </Container>
  );
}
