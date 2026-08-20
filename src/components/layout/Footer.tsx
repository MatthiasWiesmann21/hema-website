import Link from "next/link";

import { CallIcon, MailIcon, PinIcon } from "@/components/icons";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav, locations, site } from "@/data/site";
import { isExternal } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-6">
            <Logo variant="light" />
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              {site.tagline}. Beratung, Projektierung, Planung und Realisierung
              von Informatiksystemen für KMU, öffentliche Institutionen und
              Privatpersonen.
            </p>
            <div className="flex gap-3">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent-500"
                >
                  {item.label === "Facebook" ? (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5H16.7V4c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4V10H7.1v3h2.7v8z" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.7}
                      className="size-4"
                    >
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                      <circle cx="12" cy="12" r="3.6" />
                      <circle cx="17" cy="7" r="0.9" fill="currentColor" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold tracking-[0.16em] text-white/50 uppercase">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {isExternal(link.href) ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/75 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/75 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {locations.map((location) => (
            <div key={location.city} className="text-sm">
              <p className="font-display text-base font-semibold text-white">
                {location.city}
                {location.isHeadquarters ? (
                  <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase">
                    Hauptsitz
                  </span>
                ) : null}
              </p>
              <p className="mt-2 flex items-start gap-2 text-white/65">
                <PinIcon className="mt-0.5 size-4 shrink-0 text-white/40" />
                <span>
                  {location.street}
                  <br />
                  {location.zip}
                </span>
              </p>
              <a
                href={location.phoneHref}
                className="mt-2 flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                <CallIcon className="size-4 text-white/40" />
                {location.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 flex items-center gap-2 text-white/75 transition-colors hover:text-white"
              >
                <MailIcon className="size-4 text-white/40" />
                {site.email}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.tagline}
          </p>
          <div className="flex gap-5">
            <Link href="/impressum" className="hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutzerklaerung" className="hover:text-white">
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
