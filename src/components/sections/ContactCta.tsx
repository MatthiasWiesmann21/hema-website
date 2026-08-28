import { CallIcon, MailIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { locations } from "@/data/site";
import { getSiteSettings } from "@/lib/settings";

export async function ContactCta({
  title = "Zeit für ein Gespräch?",
  description = "Wir beraten Sie gerne – persönlich, unkompliziert und aus Ihrer Region.",
}: {
  title?: string;
  description?: string;
}) {
  const siteSettings = await getSiteSettings();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-brand-800 via-brand-900 to-brand-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-10 size-72 rounded-full bg-accent-500/30 blur-3xl"
          />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-white/75">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/kontakt" size="lg">
                Kontakt aufnehmen
              </Button>
              <Button href={`mailto:${siteSettings.email}`} variant="light" size="lg">
                <MailIcon className="size-4" />
                {siteSettings.email}
              </Button>
            </div>
          </div>
          <div className="relative mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-sm text-white/70">
            {locations.map((location) => (
              <a
                key={location.city}
                href={location.phoneHref}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <CallIcon className="size-4 text-accent-300" />
                <span className="font-medium text-white">{location.city}</span>
                {location.phone}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
