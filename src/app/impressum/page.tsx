import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/Card";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der hema computersysteme ag, Gewerbestrasse 28, 6438 Ibach.",
};

const registryData = [
  { label: "Handelsregister-Nummer", value: "CH-130.0.008.362-8" },
  {
    label: "Unternehmens-Identifikationsnummer (UID)",
    value: "CHE-106.621.141",
  },
];

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        breadcrumb={[{ label: "Impressum", href: "/impressum" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Prose>
            <h2>Angaben zum Betreiber</h2>
            <p>
              hema computersysteme ag
              <br />
              Gewerbestrasse 28
              <br />
              6438 Ibach
            </p>
            <p>
              Tel <a href="tel:+41418338888">041 833 88 88</a>
              <br />
              E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <h2>Haftung für Inhalte</h2>
            <p>
              Alle Angaben auf dieser Website wurden sorgfältig geprüft. Wir
              sind bemüht, dafür Sorge zu tragen, dass die von uns
              bereitgestellten Informationen aktuell, richtig und vollständig
              sind. Dennoch ist das Auftreten von Fehlern nicht völlig
              auszuschliessen.
            </p>
            <h2>Urheberrecht</h2>
            <p>
              Das Urheberrecht und alle anderen Rechte an den Inhalten, Bildern,
              Fotos oder sonstigen Dateien auf dieser Website gehören
              ausschliesslich der hema computersysteme ag oder den namentlich
              genannten Rechteinhabern. Für die Vervielfältigung sämtlicher
              Dateien muss vorab die schriftliche Zustimmung der
              Urheberrechtsinhaber eingeholt werden.
            </p>
          </Prose>

          <Card className="h-fit p-7">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
              Registerdaten
            </p>
            <dl className="mt-6 flex flex-col gap-5 text-sm">
              {registryData.map((entry) => (
                <div key={entry.label}>
                  <dt className="text-xs text-brand-950/55">{entry.label}</dt>
                  <dd className="mt-1 font-medium text-brand-950">
                    {entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Section>
    </>
  );
}
