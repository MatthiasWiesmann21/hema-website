import type { Metadata } from "next";

import { BackupIcon, NetworkIcon, ShieldIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { BulletList } from "@/components/ui/BulletList";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Netzwerk",
  description:
    "Leistungsfähige, stabile und flexible Unternehmensnetzwerke: Analyse, Beratung, Projektierung, Aufbau, Netzwerkservice und Support im LAN/WAN Bereich.",
};

const dataLossCauses = [
  { value: "44%", label: "Hardware Verlust oder Versagen" },
  { value: "32%", label: "Anwenderfehler" },
  { value: "14%", label: "Software Fehler bzw. Fehlfunktion" },
  { value: "7%", label: "Virus" },
  { value: "3%", label: "Naturkatastrophen" },
];

export default function NetzwerkPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Netzwerk"
        description="Die unmittelbare Verfügbarkeit von Informationen ist längst zum bedeutenden Wettbewerbsfaktor geworden."
        breadcrumb={[{ label: "Leistungen", href: "/leistungen" }]}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="LAN / WAN"
              title="Zukunftssichere Netzwerke, geplant und realisiert"
            />
            <div className="flex flex-col gap-4 leading-relaxed text-brand-950/75">
              <p>
                Nur leistungsfähige, stabile und flexible Unternehmensnetzwerke
                können den immens gestiegenen Kommunikationsbedarf garantieren.
                Aufbau und Pflege der Kommunikationsinfrastruktur kommt damit
                eine entscheidende Bedeutung zu.
              </p>
              <p>
                Von Analyse und Beratung über Projektierung und Aufbau bis hin
                zu Netzwerkservice und Support bietet Ihnen die hema
                computersysteme ag im LAN/WAN Bereich kreative, innovative und
                wirtschaftliche Lösungen. Dabei planen und realisieren unsere
                durch technologisch führende Hersteller zertifizierten
                Mitarbeitenden zukunftssichere Netzwerke.
              </p>
            </div>
            <BulletList
              items={[
                "Analyse, Beratung und Konzeption",
                "Projektierung und Aufbau der Infrastruktur",
                "Netzwerkservice, Monitoring und Support",
                "Zertifizierte Mitarbeitende führender Hersteller",
              ]}
            />
          </div>

          <div className="flex flex-col gap-6">
            <ImagePlaceholder
              label="Netzwerkinfrastruktur / Serverraum"
              aspect="4/3"
              tone="brand"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="flex flex-col gap-2 p-6">
                <NetworkIcon className="size-6 text-accent-500" />
                <p className="font-semibold">LAN &amp; WAN</p>
                <p className="text-sm text-brand-950/65">
                  Strukturierte Verkabelung, Switching, WLAN und
                  Standortvernetzung.
                </p>
              </Card>
              <Card className="flex flex-col gap-2 p-6">
                <ShieldIcon className="size-6 text-accent-500" />
                <p className="font-semibold">Sicherheit</p>
                <p className="text-sm text-brand-950/65">
                  Firewalls, Segmentierung und sicherer Zugriff von unterwegs.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Backup"
              title="Unterschätzen Sie das Risiko eines Datenverlusts nicht"
              description="Studien besagen, dass jährlich bis zu 13% aller Festplatten versagen. Jede Festplatte kann ausfallen."
            />
            <p className="leading-relaxed text-brand-950/75">
              Seien Sie vorbereitet – mit einer optimalen Backuplösung und einer
              proaktiven Überwachung von unserer Seite.
            </p>
            <div className="flex items-center gap-3">
              <BackupIcon className="size-7 text-brand-700" />
              <p className="text-xs text-brand-950/60">
                Ergebnisse aus einer NovaStor Studie.
              </p>
            </div>
          </div>

          <Card className="p-7">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
              Ursachen für Datenverlust
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {dataLossCauses.map((cause) => (
                <li key={cause.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium">{cause.label}</span>
                    <span className="font-display text-sm font-bold text-brand-800">
                      {cause.value}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                    <div
                      className="h-full rounded-full bg-accent-500"
                      style={{ width: cause.value }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
