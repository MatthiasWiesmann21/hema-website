import type { Metadata } from "next";
import Image from "next/image";

import { ScreenIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { BulletList } from "@/components/ui/BulletList";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
      "Machen Sie auf Angebote und Neuheiten aufmerksam. Generieren Sie Mehrwert durch zusätzliche Informationen wie Rezepte, Anwendungsmöglichkeiten usw.",
  },
  {
    question:
      "Sie möchten Ihre Schule, Ihr Hotel, Ihr Restaurant oder Ihre Kantine attraktiver gestalten?",
    answer:
      "Mit INFO screen als dynamischem Informationstool können Sie das Wetter, Bus-/Zugverbindungen, Lagepläne und aktuelle Neuigkeiten verbreiten.",
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
        bgImage="/images/digital_signage.jpg"
        className="py-28 sm:py-36 lg:py-44"
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
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-brand-100">
            <Image
              src="/images/Willkommen_small.png"
              alt="Digital Signage Display"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-brand-100">
            <Image
              src="/images/Eingangsbereich.png"
              alt="Eingangsbereich mit Digital Signage"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Möglichkeiten"
              title="Vielseitig einsetzbar in jedem Eingangsbereich"
              description="Ob Empfang, Ladenlokal, Schule oder Praxis – Digital Signage passt sich flexibel an Ihre Räumlichkeiten und Bedürfnisse an."
            />
          </div>
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
        <div className="grid overflow-hidden rounded-3xl border border-brand-100 shadow-card lg:grid-cols-[1.3fr_1fr]">
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
          <div className="relative flex min-h-56 items-center justify-center overflow-hidden bg-brand-50 p-6 lg:min-h-full">
            <Image
              src="/images/Info_Screen.png"
              alt="hema INFO screen"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
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
