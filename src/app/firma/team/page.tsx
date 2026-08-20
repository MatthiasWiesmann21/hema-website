import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Wir sind hema: Geschäftsleitung, Informatiker, Systemtechniker und Backoffice – Ihre Ansprechpersonen in Ibach und Muotathal.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Firma"
        title="wir sind hema"
        description="Ein Team aus Spezialistinnen und Spezialisten – mit klaren Zuständigkeiten und kurzen Wegen."
        breadcrumb={[{ label: "Team", href: "/firma/team" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Das Team"
          title="Ihre Ansprechpersonen"
          description="Sie wissen jederzeit, wer bei Ihrem Thema für Sie zuständig ist."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition-all hover:shadow-card-hover"
            >
              <ImagePlaceholder
                src={member.image}
                label={member.name}
                aspect="4/3"
                rounded="rounded-none"
                tone="neutral"
              />
              <div className="flex flex-col gap-2 p-6">
                <h2 className="text-lg font-semibold">{member.name}</h2>
                <p className="text-sm font-medium text-accent-500">
                  {member.role}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {member.focus.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta
        title="Zeit für ein Gespräch?"
        description="Nehmen Sie direkt mit uns Kontakt auf – wir vermitteln Sie an die richtige Person."
      />
    </>
  );
}
