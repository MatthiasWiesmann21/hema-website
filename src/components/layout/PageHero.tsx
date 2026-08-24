import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  bgImage,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  bgImage?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-brand-900 via-brand-800 to-brand-950 text-white">
      {bgImage ? (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-br from-brand-900/80 via-brand-800/70 to-brand-950/90" />
        </>
      ) : null}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden
        className="absolute -top-24 -right-16 size-80 rounded-full bg-accent-500/25 blur-3xl"
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {breadcrumb?.length ? (
          <nav aria-label="Brotkrumen" className="mb-6 text-xs text-white/55">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Startseite
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <Eyebrow className="text-accent-300">{eyebrow}</Eyebrow>
        ) : null}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
