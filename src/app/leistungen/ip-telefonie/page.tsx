import type { Metadata } from "next";
import Image from "next/image";

import { CloudIcon, PhoneIcon } from "@/components/icons";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { BulletList } from "@/components/ui/BulletList";
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
        bgImage="/images/hema_tel.png"
        className="py-28 sm:py-36 lg:py-44"
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

          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl lg:sticky">
            <Image
              src="/images/swyx_buehne.jpg"
              alt="IP-Telefonie / Swyx Arbeitsplatz"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-brand-100 bg-white lg:order-last">
            <Image
              src="/images/Partner/peoplefone.png"
              alt="peoplefone HOSTED"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-6"
            />
          </div>
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
