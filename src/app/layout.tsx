import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { Providers } from "@/components/Providers";
import { getLocations } from "@/lib/locations";
import { getNavItems } from "@/lib/navigation";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: `${settings.name} – ${settings.tagline}`,
      template: `%s | ${settings.name}`,
    },
    description: settings.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, locations, headerNav, footerNavItems] = await Promise.all([
    getSiteSettings(),
    getLocations(),
    getNavItems("header"),
    getNavItems("footer"),
  ]);

  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalChrome
          siteSettings={settings}
          locations={locations}
          headerNav={headerNav}
          footerNavItems={footerNavItems}
        >
          <Providers>
            {children}
            <AnalyticsTracker />
          </Providers>
        </ConditionalChrome>
      </body>
    </html>
  );
}
