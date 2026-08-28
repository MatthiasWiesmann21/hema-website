"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { LocationData } from "@/lib/locations";
import type { NavItemData } from "@/lib/navigation";
import type { SiteSettings } from "@/lib/settings";

export function ConditionalChrome({
  children,
  siteSettings,
  locations,
  headerNav,
  footerNavItems,
}: {
  children: React.ReactNode;
  siteSettings: SiteSettings;
  locations: LocationData[];
  headerNav: NavItemData[];
  footerNavItems: NavItemData[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header siteSettings={siteSettings} locations={locations} navItems={headerNav} />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={siteSettings} locations={locations} navItems={footerNavItems} />
    </>
  );
}
