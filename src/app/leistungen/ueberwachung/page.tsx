import type { Metadata } from "next";

import {
  CameraIcon,
  ClockIcon,
  EyeIcon,
  FactoryIcon,
  GlobeIcon,
  PawIcon,
  ShieldIcon,
  CloudIcon,
} from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { Card, FeatureCard } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Überwachung",
  description:
    "Videoüberwachung für sensible Bereiche, Produktion, Baustellen, Webcams und mehr – mobil abrufbar, mit Aufzeichnung auf dem Rekorder.",
};

const benefits = [
  {
    title: "Warnung",
    icon: <ShieldIcon className="size-5" />,
    text: "Damit eine Überwachungskamera ihre Abschreckungswirkung voll entfalten kann, sollte sie direkt ersichtlich montiert werden.",
  },
  {
    title: "Bild",
    icon: <EyeIcon className="size-5" />,
    text: "Greifen Sie mobil auf das Livebild zu, um zu sehen was gerade läuft. Kontrollieren Sie die Aufnahmen auf dem Rekorder.",
  },
  {
    title: "Sicherheit",
    icon: <CameraIcon className="size-5" />,
    text: "Erhöhen Sie die Sicherheit eines Bereiches. Gehen Sie ins Wochenende oder in die Ferien mit dem Wissen, dass alles überwacht wird.",
  },
];

const useCases = [
  {
    title: "Überwachung",
    icon: <CameraIcon className="size-5" />,
    text: "Überwachen Sie sensible Bereiche wie Ein- oder Zugänge, Parkplätze, dunkle Bereiche oder wertvolle Objekte.",
  },
  {
    title: "Produktion",
    icon: <FactoryIcon className="size-5" />,
    text: "Behalten Sie Ihre Maschinen in der Produktion im Auge, z. B. Plotter, 3D-Drucker oder Fräsmaschine.",
  },
  {
    title: "Zeitraffer",
    icon: <ClockIcon className="size-5" />,
    text: "Dokumentieren Sie Ihre Baustelle von Anfang bis Schluss oder während einer bestimmten Etappe.",
  },
  {
    title: "Webcam",
    icon: <GlobeIcon className="size-5" />,
    text: "Ermöglichen Sie Ihren potenziellen Besuchern und Kunden, sich einen Überblick im Voraus zu verschaffen.",
  },
  {
    title: "Wetter",
    icon: <CloudIcon className="size-5" />,
    text: "Behalten Sie die Wetter- und Sichtverhältnisse an Ihrem Standort jederzeit im Blick.",
  },
  {
    title: "Haustiere",
    icon: <PawIcon className="size-5" />,
    text: "Sehen Sie nach dem Rechten bei Ihren Haustieren – auch wenn Sie unterwegs sind.",
  },
];

export default function UeberwachungPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Überwachung"
        description="Videoüberwachung, die abschreckt, dokumentiert und Sicherheit schafft – jederzeit und von überall abrufbar."
        breadcrumb={[{ label: "Leistungen", href: "/leistungen" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="flex flex-col gap-3 p-7">
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                {benefit.icon}
              </span>
              <h2 className="text-lg font-semibold">{benefit.title}</h2>
              <p className="text-sm leading-relaxed text-brand-950/70">
                {benefit.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <ImagePlaceholder
            label="Videoüberwachung / Kamera"
            aspect="4/3"
            tone="brand"
          />
          <div>
            <SectionHeading
              eyebrow="Möglichkeiten"
              title="Wofür Sie Kameras einsetzen können"
              description="Ob Sicherheit, Dokumentation oder Marketing: Wir planen die passende Lösung und richten den mobilen Zugriff ein."
            />
          </div>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <FeatureCard
              key={useCase.title}
              title={useCase.title}
              icon={useCase.icon}
            >
              {useCase.text}
            </FeatureCard>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
