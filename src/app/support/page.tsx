import type { Metadata } from "next";

import {
  ArrowRightIcon,
  CallIcon,
  MailIcon,
  ShieldIcon,
  TouchIcon,
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
    "Fernwartung und Support der hema computersysteme ag: TeamViewer, PC Visit und AnyDesk herunterladen – oder direkt anrufen.",
};

const steps = [
  {
    title: "Anrufen",
    text: "Melden Sie sich telefonisch bei Ihrem Standort. Beschreiben Sie kurz, worum es geht.",
  },
  {
    title: "Tool herunterladen",
    text: "Der Support-Techniker teilt Ihnen mit, welches Fernwartungstool Sie benötigen. Laden Sie es hier herunter und starten Sie es.",
  },
  {
    title: "Verbindung freigeben",
    text: "Nennen Sie uns die angezeigte ID bzw. Verbindungsnummer. Die Verbindung entsteht erst mit Ihrer Freigabe.",
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
        description="Gerne unterstützen wir Sie per Fernwartung bei Ihrem Problem. Der Support-Techniker teilt Ihnen mit, welches Fernwartungstool Sie benötigen."
        breadcrumb={[{ label: "Support", href: "/support" }]}
      />

      <Section>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Fernwartungstools"
            title="Downloads"
            description="Laden Sie nur das Tool herunter, das Ihnen unser Techniker nennt. Alle Module sind für Windows vorgesehen und benötigen keine Installation von Zusatzsoftware."
          />
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {remoteTools.map((tool) => (
            <Card
              as="li"
              key={tool.name}
              className="flex h-full flex-col gap-4 p-7 transition-all hover:border-brand-200 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <TouchIcon className="size-5" />
                </span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold tracking-wider text-brand-600 uppercase">
                  {tool.platform}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{tool.name}</h2>
              <p className="flex-1 text-sm leading-relaxed text-brand-950/70">
                {tool.description}
              </p>
              <Button href={tool.href} size="sm" className="self-start">
                Download
                <ArrowRightIcon className="size-4" />
              </Button>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Ablauf"
          title="So läuft eine Fernwartung ab"
          description="In vier Schritten sind wir auf Ihrem Bildschirm – ohne Termin und ohne Anfahrt."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="p-8">
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

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-2xl bg-linear-to-br from-brand-800 to-brand-950 p-8 text-white">
              <ShieldIcon className="size-7 text-accent-300" />
              <h2 className="text-xl font-semibold text-white">
                Ihre Kontrolle, Ihre Daten
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Eine Fernwartungssitzung kommt ausschliesslich mit Ihrer aktiven
                Freigabe zustande. Sie sehen alle Schritte live mit und können
                die Verbindung jederzeit trennen. Nach dem Ende der Sitzung
                besteht kein Zugriff mehr auf Ihr Gerät.
              </p>
              <Button
                href="/datenschutzerklaerung"
                variant="light"
                size="sm"
                className="self-start"
              >
                Datenschutz
              </Button>
            </div>

            <Card className="p-8">
              <h2 className="text-lg font-semibold">
                Support-Vertrag oder Wartung?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-950/70">
                Mit proaktiver Überwachung erkennen wir Störungen, bevor sie
                Ihren Betrieb treffen – inklusive Monitoring Ihrer Backuplösung.
              </p>
              <Button
                href="/kontakt"
                variant="ghost"
                size="sm"
                className="mt-5"
              >
                Beratung anfragen
              </Button>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
