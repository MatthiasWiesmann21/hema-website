import type { Metadata } from "next";

import { ScreenIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Digital Signage",
  description:
    "hema INFO screen: professionelles 49-Zoll-Public-Display mit integriertem Media Player und Software-Lizenzen – produziert in Steinen.",
};

const scenarios = [
  {
    question:
      "Sie haben keinen Empfangsraum, oder Ihr Personal ist ausgelastet?",
    answer: "Heissen Sie Ihre Kunden mit einer netten Botschaft willkommen.",
  },
  {
    question: "Sie besitzen ein Ladenlokal oder eine Boutique?",
    answer:
      "Machen Sie auf Angebote und Neuheiten aufmerksam. Generieren Sie Mehrwert durch zusätzliche Informationen wie Rezepte oder Anwendungsmöglichkeiten.",
  },
  {
    question:
      "Sie möchten Ihre Schule, Ihr Hotel, Ihr Restaurant oder Ihre Kantine attraktiver gestalten?",
    answer:
      "Mit INFO screen als dynamischem Informationstool verbreiten Sie Wetter, Bus- und Zugverbindungen, Lagepläne und aktuelle Neuigkeiten.",
  },
  {
    question: "Sie besitzen eine Praxis oder einen Salon mit Warteraum?",
    answer: "Verkürzen Sie Ihren Patienten die Wartezeit mit Infotainment.",
  },
];

export default function DigitalSignagePage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Digital Signage"
        description="Machen Sie mehr aus Ihrem Geschäft – mit bewegten Bildern und wechselnden Inhalten."
        breadcrumb={[{ label: "Leistungen", href: "/leistungen" }]}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Alles inklusive"
              title="Schon mit wenigen Klicks mehr Umsatz und Kundentreue"
              description="Unabhängig davon, in welcher Branche Sie tätig sind: Digital Signage von hema computersysteme enthält alles, was Sie brauchen, um sofort loszulegen – Bildschirm mit integriertem Player und vollumfängliche Software-Lizenzen."
            />
            <Button href="/kontakt">Beratung anfragen</Button>
          </div>
          <ImagePlaceholder
            label="Digital Signage Display"
            aspect="4/3"
            tone="brand"
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Möglichkeiten"
          title="Passend für jede Situation"
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Card
              as="li"
              key={scenario.question}
              className="flex flex-col gap-3 p-7"
            >
              <h3 className="text-base font-semibold text-brand-800">
                {scenario.question}
              </h3>
              <p className="text-sm leading-relaxed text-brand-950/70">
                {scenario.answer}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid overflow-hidden rounded-3xl border border-brand-100 shadow-card lg:grid-cols-2">
          <div className="flex flex-col gap-6 p-8 sm:p-12">
            <div className="flex items-center gap-3 text-brand-700">
              <ScreenIcon className="size-7" />
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
                Produkt
              </p>
            </div>
            <h2 className="text-3xl font-semibold">hema INFO screen</h2>
            <p className="leading-relaxed text-brand-950/75">
              Informieren Sie mit bewegten Bildern und wechselndem Inhalt. INFO
              screen ist eine in Steinen hergestellte Werbefläche.
            </p>
            <BulletList
              items={[
                "Professionelles 49-Zoll-Public-Display",
                "Integrierter Media Player",
                "Verschiedene Dekors erhältlich",
                "Produziert in Steinen",
              ]}
            />
            <div className="flex flex-wrap items-end gap-4 border-t border-brand-100 pt-6">
              <div>
                <p className="font-display text-3xl font-bold text-brand-900">
                  CHF 3190.–
                </p>
                <p className="text-xs text-brand-950/60">
                  inkl. MWST, ohne Lieferung
                </p>
              </div>
              <Button href="/kontakt" className="ml-auto">
                Jetzt anfragen
              </Button>
            </div>
          </div>
          <ImagePlaceholder
            label="hema INFO screen"
            aspect="none"
            tone="accent"
            rounded="rounded-none"
            className="min-h-72 lg:min-h-full"
          />
        </div>
      </Section>

      <Section tone="muted" className="py-14">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold">Sie möchten mehr?</h2>
            <p className="mt-3 leading-relaxed text-brand-950/70">
              Sie können Ihre Digital Signage Installation jederzeit um beliebig
              viele Bildschirme für andere Standorte oder Filialen erweitern.
              Suchen Sie eine individuelle Lösung? Rufen Sie uns an, wir beraten
              Sie gern.
            </p>
          </div>
          <Button href="/kontakt" variant="secondary" size="lg">
            Kontakt
          </Button>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
