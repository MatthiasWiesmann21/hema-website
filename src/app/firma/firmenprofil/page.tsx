import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Firmenprofil",
  description:
    "hema computersysteme ag hat sich auf Beratung, Projektierung, Planung und Realisierung von Informatiksystemen spezialisiert.",
};

const capabilities = [
  "Leitung, Definition und Durchführung von Informationsprojekten",
  "Evaluierung, Projektierung und Installation von Netzwerken auf Basis von Windows",
  "Verkauf und Einführung betriebswirtschaftlicher Gesamtlösungen",
  "Integration von Fremdprodukten",
  "Softwareentwicklung im Bereich Datenbank-Applikationen",
  "Realisation und Erstellen von Websites",
  "Verkauf und Installation von Netzwerken mit den dazugehörenden Komponenten",
  "Web- und Mailhosting auf eigener Serverfarm",
  "Verkauf von handelsüblicher Hard- und Software",
];

export default function FirmenprofilPage() {
  return (
    <>
      <PageHero
        eyebrow="Firma"
        title="Firmenprofil"
        description="Kompetent und zielsicher zu einem IT-Umfeld, das Ihren Ansprüchen gerecht wird."
        breadcrumb={[{ label: "Firmenprofil", href: "/firma/firmenprofil" }]}
        bgImage="/images/Business-1697x1080.png"
        className="py-28 sm:py-36 lg:py-44"
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Das Unternehmen"
              title="Informatiksysteme, die zu Ihrem Betrieb passen"
            />
            <div className="flex flex-col gap-4 leading-relaxed text-brand-950/75">
              <p>
                Die Firma hema computersysteme ag hat sich auf Beratung,
                Projektierung, Planung und Realisierung von Informatiksystemen
                spezialisiert. Zu unseren Kunden zählen Privatpersonen, kleinere
                und mittlere Unternehmen sowie öffentliche Institutionen.
              </p>
              <p>
                Mit unserer Erfahrung und unserem Know-how bieten wir Ihnen
                kompetent und zielsicher ein IT-Umfeld, das Ihren Ansprüchen
                gerecht wird.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/firma/team">Unser Team</Button>
              <Button href="/firma/partner" variant="ghost">
                Unsere Partner
              </Button>
            </div>
          </div>

          <ImagePlaceholder
            src="/images/hema-sitz-steinen.jpg"
            label="Team / Standort hema"
            aspect="4/3"
            tone="brand"
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Kompetenzen"
          title="Unser Leistungsspektrum"
          description="Von der Projektleitung über die Umsetzung bis zum laufenden Betrieb – wir begleiten Sie über den ganzen Lebenszyklus Ihrer IT."
        />
        <div className="mt-12 rounded-2xl border border-brand-100 bg-white p-8">
          <BulletList items={capabilities} columns={2} />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
