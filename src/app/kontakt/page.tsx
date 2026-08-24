import type { Metadata } from "next";

import { CallIcon, MailIcon, PinIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "hema computersysteme ag – Standorte Ibach, Muotathal und Zug. Telefon, E-Mail und Adressen auf einen Blick.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Wir sind für Sie da"
        description="Drei Standorte in der Region – rufen Sie an oder schreiben Sie uns eine E-Mail. Wir melden uns rasch zurück."
        breadcrumb={[{ label: "Kontakt", href: "/kontakt" }]}
        bgImage="/images/Schwyz.png"
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.city} className="flex flex-col gap-5 p-7">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-semibold">
                  Standort {location.city}
                </h2>
                {location.isHeadquarters ? (
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-[10px] font-semibold tracking-wider text-accent-600 uppercase">
                    Hauptsitz
                  </span>
                ) : null}
              </div>
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
                {site.name}
              </p>

              <dl className="flex flex-col gap-4 text-sm">
                <div className="flex gap-3">
                  <PinIcon className="mt-0.5 size-5 shrink-0 text-accent-500" />
                  <div>
                    <dt className="text-xs tracking-wide text-brand-950/50 uppercase">
                      Adresse
                    </dt>
                    <dd className="mt-1 text-brand-950/80">
                      {location.street}
                      <br />
                      {location.zip}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CallIcon className="mt-0.5 size-5 shrink-0 text-accent-500" />
                  <div>
                    <dt className="text-xs tracking-wide text-brand-950/50 uppercase">
                      Telefon
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={location.phoneHref}
                        className="font-medium text-brand-900 transition-colors hover:text-accent-500"
                      >
                        {location.phone}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MailIcon className="mt-0.5 size-5 shrink-0 text-accent-500" />
                  <div>
                    <dt className="text-xs tracking-wide text-brand-950/50 uppercase">
                      E-Mail
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${site.email}`}
                        className="font-medium text-brand-900 transition-colors hover:text-accent-500"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Button href={location.phoneHref} size="sm">
                  Anrufen
                </Button>
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    location.mapQuery,
                  )}`}
                  variant="ghost"
                  size="sm"
                >
                  Route planen
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Support"
            title="Sie brauchen schnelle Hilfe?"
            description="Mit unseren Fernwartungstools verbinden wir uns direkt mit Ihrem Rechner. Laden Sie das passende Modul herunter und rufen Sie uns an."
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button href="/support" size="lg">
              Zum Support
            </Button>
            <Button href={locations[0].phoneHref} variant="ghost" size="lg">
              <CallIcon className="size-4" />
              {locations[0].phone}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
