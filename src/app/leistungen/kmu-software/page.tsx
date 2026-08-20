import type { Metadata } from "next";

import {
  ArrowRightIcon,
  FlagIcon,
  ModuleIcon,
  OpenIcon,
  SparkIcon,
  TouchIcon,
  CartIcon,
} from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { Button } from "@/components/ui/Button";
import { Card, FeatureCard } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "KMU Software",
  description:
    "Proffix Px5 – Schweizer Business Software für Schweizer KMU. Modular, bedienerfreundlich und laufend der Schweizer Gesetzgebung angepasst.",
};

const highlights = [
  {
    title: "Modern",
    icon: <SparkIcon className="size-5" />,
    text: "Bietet dank modernem Look & Feel ein einzigartiges Anwendererlebnis.",
  },
  {
    title: "Einfach",
    icon: <TouchIcon className="size-5" />,
    text: "Ist äusserst bedienerfreundlich und lässt sich einfach in die Geschäftsprozesse von Unternehmen integrieren.",
  },
  {
    title: "Modular",
    icon: <ModuleIcon className="size-5" />,
    text: "Erlaubt Schritt für Schritt, die Kernprozesse von KMU zu digitalisieren.",
  },
  {
    title: "Aktuell",
    icon: <FlagIcon className="size-5" />,
    text: "Wird laufend der Schweizer Gesetzgebung angepasst.",
  },
  {
    title: "Smart",
    icon: <CartIcon className="size-5" />,
    text: "Führt mit smarten Funktionen leicht durch die tägliche Arbeit.",
  },
  {
    title: "Offen",
    icon: <OpenIcon className="size-5" />,
    text: "Lässt sich dank offenem Ökosystem mit Drittlösungen ergänzen.",
  },
];

const modules = [
  {
    title: "Buchhaltung",
    subtitle: "Modernes Rechnungs- und Zahlungswesen",
    href: "https://www.proffix.ch/produkt/funktionen/buchhaltung",
  },
  {
    title: "Administration",
    subtitle: "Papierlose Geschäftsadministration",
    href: "https://www.proffix.ch/produkt/funktionen/administration",
  },
  {
    title: "Personalwesen",
    subtitle: "Zeitsparende Personaladministration",
    href: "https://www.proffix.ch/produkt/funktionen/personalwesen",
  },
  {
    title: "Handel",
    subtitle: "Professionelle Warenbewirtschaftung",
    href: "https://www.proffix.ch/produkt/funktionen/handel",
  },
  {
    title: "Dienstleistungen",
    subtitle: "Effiziente Dienstleistungen koordinieren und verrechnen",
    href: "https://www.proffix.ch/produkt/funktionen/dienstleistungen",
  },
];

export default function KmuSoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="KMU Software"
        description="Schweizer Business Software für Schweizer KMU – digitalisiert und automatisiert Ihre Kernprozesse Schritt für Schritt."
        breadcrumb={[{ label: "Leistungen", href: "/leistungen" }]}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Proffix Px5"
              title="Schweizer Business Software für Schweizer KMU"
              description="Proffix Px5 ist die Neuauflage der erfolgreichen und beliebten Proffix Business Software. Px5 lässt sich einfach in die Organisation von Schweizer KMU integrieren, digitalisiert und automatisiert Schritt für Schritt die Kernprozesse und lässt sich einfach individualisieren."
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="https://remote.proffix.net:10001/software/html5.html">
                Px5 im Browser testen
              </Button>
              <Button href="/kontakt" variant="ghost">
                Beratung anfragen
              </Button>
            </div>
          </div>
          <ImagePlaceholder
            label="Proffix Px5 Screenshot"
            aspect="4/3"
            tone="neutral"
            className="border border-brand-100"
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Highlights"
          title="Die Highlights von Proffix Px5"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <FeatureCard
              key={highlight.title}
              title={highlight.title}
              icon={highlight.icon}
            >
              {highlight.text}
            </FeatureCard>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Funktionen im Überblick"
          title="Modular aufgebaut – für jeden Bereich"
          description="Proffix Px5 umfasst alle Funktionen, mit denen Schweizer KMU ihre Geschäftsadministration Schritt für Schritt modernisieren und digitalisieren."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <li key={module.title}>
              <Card className="h-full transition-all hover:border-brand-200 hover:shadow-card-hover">
                <a
                  href={module.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col gap-2 p-6"
                >
                  <span className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
                    Proffix Px5
                  </span>
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-brand-950/70">
                    {module.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-500">
                    Mehr Informationen
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
