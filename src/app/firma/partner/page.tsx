import type { Metadata } from "next";
import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Unsere Partner: Proffix, Microsoft, Synology, peoplefone, Enreach, Zyxel, Wortmann, HP, F-Secure, Ontrack, WWZ, Quickline und mehr.",
};

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Firma"
        title="Unsere Partner"
        description="Wir arbeiten mit technologisch führenden Herstellern und Anbietern zusammen – zertifiziert und langjährig erprobt."
        breadcrumb={[{ label: "Partner", href: "/firma/partner" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Partnerschaften"
          title="Starke Marken hinter Ihren Lösungen"
          description="Als Synology Gold Partner und zertifizierter Partner weiterer Hersteller haben wir direkten Zugang zu Support, Know-how und Ressourcen."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.name}>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-5 rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition-all hover:border-brand-200 hover:shadow-card-hover"
              >
                <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-50">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={64}
                      height={64}
                      className="size-full object-contain p-2"
                    />
                  ) : (
                    <span className="font-display text-lg font-bold text-brand-700">
                      {partner.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold">
                    {partner.name}
                  </span>
                  <span className="text-sm text-brand-950/60">
                    {partner.category}
                  </span>
                </span>
                <ArrowRightIcon className="ml-auto size-5 text-brand-300 transition-all group-hover:translate-x-1 group-hover:text-accent-500" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta />
    </>
  );
}
