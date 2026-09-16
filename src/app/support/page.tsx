import type { Metadata } from "next";

import {
  AppleIcon,
  ArrowRightIcon,
  CallIcon,
  DownloadIcon,
  MailIcon,
  ShieldIcon,
  TouchIcon,
  WindowsIcon,
} from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { remoteTools } from "@/data/site";
import { getLocations } from "@/lib/locations";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Fernwartung und Support der hema computersysteme ag: Laden Sie das pcvisit Kunden-Modul herunter – oder rufen Sie uns direkt an.",
};

const pcVisit = remoteTools.find((tool) => tool.name === "PC Visit")!;

const steps = [
  {
    title: "Anrufen",
    text: "Melden Sie sich telefonisch bei Ihrem Standort. Beschreiben Sie kurz, worum es geht.",
  },
  {
    title: "Tool herunterladen",
    text: "Laden Sie das pcvisit Kunden-Modul herunter und starten Sie es. Eine Installation ist nicht nötig.",
  },
  {
    title: "Verbindung freigeben",
    text: "Wir nennen Ihnen am Telefon die Verbindungsnummer, die Sie im Modul eingeben. Die Verbindung entsteht erst mit Ihrer Freigabe.",
  },
  {
    title: "Problem lösen",
    text: "Wir arbeiten direkt auf Ihrem Bildschirm – Sie sehen jeden Schritt mit und können die Sitzung jederzeit beenden.",
  },
];

export default async function SupportPage() {
  const siteSettings = await getSiteSettings();
  const locations = await getLocations();
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Fernwartung"
        description="Gerne unterstützen wir Sie per Fernwartung bei Ihrem Problem. Laden Sie das pcvisit Kunden-Modul herunter. Wir nennen Ihnen am Telefon die Verbindungsnummer."
        breadcrumb={[{ label: "Support", href: "/support" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Fernwartungstool"
              title="pcvisit Kunden-Modul"
              description={pcVisit.description}
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={pcVisit.href} size="lg">
                <DownloadIcon className="size-5" />
                Download
              </Button>
              <span className="flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 shadow-sm">
                <WindowsIcon className="size-5 text-brand-700" />
                <span className="h-4 w-px bg-brand-200" />
                <AppleIcon className="size-5 text-brand-700" />
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-brand-950/70">
              Nach dem Start geben wir Ihnen am Telefon eine Verbindungsnummer,
              die Sie im Modul eingeben. Die Verbindung kommt ausschliesslich
              mit Ihrer aktiven Freigabe zustande.
            </p>
          </div>

          <Card className="flex flex-col gap-5 p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <TouchIcon className="size-6" />
            </span>
            <h2 className="text-xl font-semibold">So funktioniert pcvisit</h2>
            <ol className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display text-xs font-bold text-white">
                  1
                </span>
                <span className="text-brand-950/80">
                  Modul herunterladen und ausführen – keine Installation nötig.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display text-xs font-bold text-white">
                  2
                </span>
                <span className="text-brand-950/80">
                  Wir nennen Ihnen am Telefon die Verbindungsnummer, die Sie im Modul eingeben.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-500 font-display text-xs font-bold text-white">
                  3
                </span>
                <span className="text-brand-950/80">
                  Freigabe erteilen – wir übernehmen den Bildschirm und lösen
                  das Problem.
                </span>
              </li>
            </ol>
            <div className="mt-auto flex items-center gap-3 border-t border-brand-100 pt-5 text-sm text-brand-950/70">
              <ShieldIcon className="size-5 text-accent-500" />
              <span>
                Sie sehen jeden Schritt live und können die Sitzung jederzeit
                beenden.
              </span>
            </div>
          </Card>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Ablauf"
              title="So läuft eine Fernwartung ab"
              description="In vier Schritten sind wir auf Ihrem Bildschirm – ohne Termin und ohne Anfahrt."
            />
            <ol className="mt-12 grid gap-6 sm:grid-cols-2">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-brand-100 bg-white p-7"
                >
                  <span className="absolute -top-4 left-7 flex size-9 items-center justify-center rounded-full bg-accent-500 font-display text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-950/70">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <Card className="flex h-fit flex-col p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
              Support-Nummern
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              Rufen Sie Ihren Standort an
            </h2>
            <ul className="mt-8 flex flex-col gap-3">
              {locations.map((location) => (
                <li key={location.city}>
                  <a
                    href={location.phoneHref}
                    className="group flex items-center gap-4 rounded-xl border border-brand-100 p-4 transition-all hover:border-brand-200 hover:bg-brand-50/60"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                      <CallIcon className="size-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{location.city}</span>
                      <span className="text-sm text-brand-950/60">
                        {location.street}, {location.zip}
                      </span>
                    </span>
                    <span className="ml-auto text-sm font-medium text-brand-900 transition-colors group-hover:text-accent-500">
                      {location.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-brand-100 pt-6">
              <MailIcon className="size-5 text-accent-500" />
              <span className="text-sm text-brand-950/70">
                Kein dringender Fall? Schreiben Sie uns an
              </span>
              <a
                href={`mailto:${siteSettings.email}?subject=Supportanfrage`}
                className="text-sm font-medium text-brand-900 hover:text-accent-500"
              >
                {siteSettings.email}
              </a>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
