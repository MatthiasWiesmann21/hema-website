import type { Metadata } from "next";

import { CloudIcon, PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { BulletList } from "@/components/ui/BulletList";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "IP-Telefonie",
  description:
    "Swyx und peoplefone HOSTED: softwarebasierte IP-Kommunikationslösungen mit intelligentem Anrufmanagement, Unified Communication und Präsenzinformationen.",
};

const swyxHighlights = [
  "Intelligentes Anrufmanagement – kein Anruf geht verloren",
  "Voicemail und Fax einfach per E-Mail",
  "Präsenzinformationen (Rich Presence)",
  "Virtuelle Konferenzräume",
  "Instant Messaging",
  "Collaboration mit Web-Konferenzen und Desktop-Sharing",
  "Video-Telefonie",
  "Integration von Mobiltelefonen",
];

const peoplefoneHighlights = [
  "Keine Hardware, keine Software, keine teuren Updates",
  "Lösung einfach und kostengünstig skalierbar",
  "Online Zugang für jeden Benutzer",
  "Einfache Bedienung",
  "Funktioniert an mehreren Standorten",
  "Sehr kompetitive Telefontarife, gratis unter Mitgliedern",
  "peoplefone APP für iOS und Android",
  "Unified Communication",
];

export default function IpTelefoniePage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="IP-Telefonie"
        description="Vergessen Sie Ihre alte Telefonanlage – moderne Kommunikation läuft über Software."
        breadcrumb={[{ label: "Leistungen", href: "/leistungen" }]}
      />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Swyx"
              title="Die intelligente softwarebasierte IP-Kommunikationslösung"
            />
            <div className="flex flex-col gap-4 leading-relaxed text-brand-950/75">
              <p>
                Swyx ist herkömmlichen Telefonanlagen weit voraus. Sie
                profitieren von vereinfachten Arbeitsabläufen und einer
                effizienten Kommunikation mit Ihren Kunden und Partnern.
              </p>
              <p>
                Durch den Einsatz unterschiedlicher Datenbanksysteme ist die
                Suche nach Kontakten oftmals zeitintensiv und mühsam. Swyx
                ermöglicht den schnellen Zugriff auf alle Kontaktinformationen
                im Unternehmen und integriert diese spielend einfach in Ihre
                Telefonieumgebung.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-100 p-6">
              <div className="flex items-center gap-3 text-brand-700">
                <PhoneIcon className="size-6" />
                <p className="font-display text-base font-semibold">
                  Highlights
                </p>
              </div>
              <BulletList className="mt-5" items={swyxHighlights} />
            </div>
          </div>

          <ImagePlaceholder
            label="IP-Telefonie / Swyx Arbeitsplatz"
            aspect="4/3"
            tone="brand"
            className="lg:sticky lg:top-32"
          />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <ImagePlaceholder
            label="peoplefone HOSTED"
            aspect="4/3"
            tone="neutral"
            className="border border-brand-100 lg:order-last"
          />
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="peoplefone HOSTED"
              title="Die webbasierte Telefonanlage"
              description="peoplefone HOSTED ersetzt alle herkömmlichen Telefonanlagen und Telefonleitungen. Alles wird online konfiguriert – Sie benötigen nur IP-Telefonapparate und keine zusätzlichen Server, Hardware oder Software."
            />
            <div className="rounded-2xl border border-brand-100 bg-white p-6">
              <div className="flex items-center gap-3 text-brand-700">
                <CloudIcon className="size-6" />
                <p className="font-display text-base font-semibold">
                  Highlights
                </p>
              </div>
              <BulletList className="mt-5" items={peoplefoneHighlights} />
            </div>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
