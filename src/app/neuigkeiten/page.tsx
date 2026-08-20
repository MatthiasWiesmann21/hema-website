import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { ContactCta } from "@/components/sections/ContactCta";
import { NewsCard } from "@/components/sections/NewsCard";
import { Section } from "@/components/ui/Section";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Neuigkeiten",
  description:
    "Aktuelle Meldungen der hema computersysteme ag: Projekte, Partnerschaften, Standorte und offene Stellen.",
};

export default async function NeuigkeitenPage() {
  const news = await getAllNews();

  return (
    <>
      <PageHero
        eyebrow="Neuigkeiten"
        title="Aktuelles von hema"
        description="Was bei uns läuft: Projekte, Partnerschaften und offene Stellen."
        breadcrumb={[{ label: "Neuigkeiten", href: "/neuigkeiten" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
