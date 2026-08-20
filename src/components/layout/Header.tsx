"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CallIcon, MailIcon, PinIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { locations, mainNav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-brand-900 text-white lg:block">
        <Container className="flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            {locations.slice(0, 2).map((location) => (
              <span key={location.city} className="flex items-center gap-2">
                <PinIcon className="size-3.5 text-white/60" />
                <span className="text-white/80">
                  {location.street}, {location.zip}
                </span>
                <a
                  href={location.phoneHref}
                  className="font-medium text-white transition-colors hover:text-accent-300"
                >
                  {location.phone}
                </a>
              </span>
            ))}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2 font-medium transition-colors hover:text-accent-300"
          >
            <MailIcon className="size-3.5 text-white/60" />
            {site.email}
          </a>
        </Container>
      </div>

      <div
        className={cn(
          "border-b bg-white/90 backdrop-blur-md transition-shadow",
          scrolled ? "border-brand-100 shadow-sm" : "border-transparent",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Hauptnavigation" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.label} className="group relative">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 items-center rounded-full px-4 text-sm font-medium tracking-wide text-brand-900/80 uppercase transition-colors hover:text-accent-500"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium tracking-wide uppercase transition-colors",
                        isActive(item.href)
                          ? "text-accent-500"
                          : "text-brand-900/80 hover:text-accent-500",
                      )}
                    >
                      {item.label}
                      {item.children ? (
                        <svg
                          aria-hidden
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          className="size-3 transition-transform group-hover:rotate-180"
                        >
                          <path d="M5 7.5l5 5 5-5" />
                        </svg>
                      ) : null}
                    </Link>
                  )}

                  {item.children ? (
                    <div className="invisible absolute top-full left-1/2 w-60 -translate-x-1/2 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-2xl border border-brand-100 bg-white p-2 shadow-card">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-xl px-4 py-2.5 text-sm transition-colors",
                                pathname === child.href
                                  ? "bg-brand-50 font-medium text-accent-500"
                                  : "text-brand-900/80 hover:bg-brand-50 hover:text-brand-900",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={locations[0].phoneHref}
            className="hidden h-10 items-center gap-2 rounded-full bg-accent-500 px-5 text-sm font-medium text-white transition-colors hover:bg-accent-600 lg:inline-flex"
          >
            <CallIcon className="size-4" />
            Anrufen
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            className="flex size-11 items-center justify-center rounded-xl border border-brand-200 text-brand-800 lg:hidden"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-5"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </Container>
      </div>

      {open ? (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-brand-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-5">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label} className="py-2">
                  <p className="px-2 text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
                    {item.label}
                  </p>
                  <div className="mt-1 flex flex-col">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className={cn(
                          "rounded-xl px-2 py-2.5 text-base",
                          pathname === child.href
                            ? "font-medium text-accent-500"
                            : "text-brand-900",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="rounded-xl px-2 py-2.5 text-base font-medium text-brand-900"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={cn(
                    "rounded-xl px-2 py-2.5 text-base font-medium",
                    isActive(item.href) ? "text-accent-500" : "text-brand-900",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="mt-3 flex flex-col gap-2 border-t border-brand-100 pt-4 text-sm">
              {locations.map((location) => (
                <a
                  key={location.city}
                  href={location.phoneHref}
                  className="flex items-center gap-2 text-brand-900/80"
                >
                  <CallIcon className="size-4 text-accent-500" />
                  {location.city}: {location.phone}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-brand-900/80"
              >
                <MailIcon className="size-4 text-accent-500" />
                {site.email}
              </a>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
