import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon, serviceIcons } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Netzwerk, IP-Telefonie, Überwachung, KMU Software und Digital Signage – die Leistungen der hema computersysteme ag im Überblick.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Unsere Dienstleistungen"
        description="Von Analyse und Beratung über Projektierung und Aufbau bis hin zu Service und Support – kreative, innovative und wirtschaftliche Lösungen für Ihre IT."
      />

      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.slug}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-7 shadow-card transition-all hover:border-brand-200 hover:shadow-card-hover"
                >
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="text-xl font-semibold">{service.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-brand-950/70">
                    {service.teaser}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-500">
                    Mehr erfahren
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
