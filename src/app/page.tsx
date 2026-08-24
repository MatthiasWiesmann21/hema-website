import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, BackupIcon, serviceIcons } from "@/components/icons";
import { ContactCta } from "@/components/sections/ContactCta";
import { NewsCard } from "@/components/sections/NewsCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllNews } from "@/lib/news";
import { services } from "@/data/services";
import { site } from "@/data/site";

export default async function Home() {
  const news = (await getAllNews()).slice(0, 3);

  return (
    <>
      {/* Hero */}
        <section className="relative isolate text-white min-h-140 max-h-180 pb-64 -mt-18 lg:-mt-28">
          <Image
            src="/images/K1600_Laptop_01.22.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-black/10" />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
          <div
            aria-hidden
            className="absolute -top-24 -right-16 size-80 rounded-full bg-accent-500/25 blur-3xl"
          />
          <Container className="relative grid gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-36">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent-300 uppercase">
                <span aria-hidden className="h-px w-6 bg-accent-300" />
                {site.tagline}
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ihr IT Specialist
                <br />
                in Ihrer Region
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                {site.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/leistungen" size="lg">
                  Unsere Dienstleistungen
                  <ArrowRightIcon className="size-4" />
                </Button>
                <Button href="/kontakt" variant="light" size="lg">
                  Kontakt aufnehmen
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Facts strip */}
        <section className="border-b border-brand-100 bg-white">
          <Container className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
            {[
              { value: "3", label: "Standorte" },
              { value: "25+", label: "Jahre Erfahrung" },
              { value: "14", label: "Partner" },
              { value: "100%", label: "Region Schwyz" },
            ].map((fact) => (
              <div key={fact.label} className="text-center">
                <p className="font-display text-3xl font-bold text-brand-800 sm:text-4xl">
                  <CountUp value={fact.value} />
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-brand-500 uppercase">
                  {fact.label}
                </p>
              </div>
            ))}
          </Container>
        </section>

        {/* Services grid */}
        <Section tone="muted">
          <SectionHeading
            eyebrow="Leistungen"
            title="Unsere Dienstleistungen"
            description="Von der Netzwerkinfrastruktur über IP-Telefonie und Videoüberwachung bis hin zu KMU-Software und Digital Signage – alles aus einer Hand."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <li key={service.slug}>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition-all hover:border-brand-200 hover:shadow-card-hover"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-950">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-950/70">
                        {service.teaser}
                      </p>
                    </div>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent-500">
                      Mehr erfahren
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
            {/* Backup card */}
            <li>
              <Link
                href="/leistungen/netzwerk"
                className="group flex h-full flex-col gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition-all hover:border-brand-200 hover:shadow-card-hover"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <BackupIcon className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-brand-950">
                    Backup &amp; Datenschutz
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-950/70">
                    Unterschätzen Sie das Risiko eines Datenverlusts nicht –
                    mit optimaler Backuplösung und proaktiver Überwachung.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent-500">
                  Mehr erfahren
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          </ul>
        </Section>

        {/* News teasers */}
        <Section>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Neuigkeiten"
              title="Aktuelles"
              description="Was bei hema computersysteme ag passiert."
            />
            <Link
              href="/neuigkeiten"
              className="hidden shrink-0 items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600 sm:inline-flex"
            >
              Alle Meldungen
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {news.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>

        {/* We are hiring banner */}
        <Section tone="brand" className="py-0">
          <div className="-mx-5 sm:-mx-8">
            <div className="relative isolate overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
              <Image
                src="/images/Schwyz.png"
                alt=""
                fill
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-r from-accent-600/80 via-accent-500/70 to-brand-800/80"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -right-10 size-72 rounded-full bg-white/10 blur-3xl"
              />
              <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
                    We are hiring
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                    Wir suchen Verstärkung.
                  </h2>
                  <p className="mt-3 max-w-lg text-white/80">
                    Kennst du einen Informatiker / eine Informatikerin? Klick
                    auf den INFO Button.
                  </p>
                </div>
                <Button
                  href="/neuigkeiten/wir-suchen-verstaerkung"
                  variant="light"
                  size="lg"
                >
                  INFO
                  <ArrowRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <ContactCta />
    </>
  );
}
