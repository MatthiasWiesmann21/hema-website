export const site = {
  name: "hema computersysteme ag",
  shortName: "hema",
  tagline: "Ihr IT Specialist in Ihrer Region",
  description:
    "hema computersysteme ag ist Ihr IT-Partner in der Region Schwyz: Netzwerke, IP-Telefonie, Videoüberwachung, KMU Software und Digital Signage für KMU, öffentliche Institutionen und Privatpersonen.",
  email: "info@hema.ch",
  url: "https://hema.ch",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/hemacomputersysteme" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/hemacomputersysteme",
    },
  ],
} as const;

export type Location = {
  city: string;
  street: string;
  zip: string;
  phone: string;
  phoneHref: string;
  isHeadquarters?: boolean;
  mapQuery: string;
};

export const locations: Location[] = [
  {
    city: "Ibach",
    street: "Gewerbestrasse 28",
    zip: "6438 Ibach / SZ",
    phone: "+41 41 833 88 88",
    phoneHref: "tel:+41418338888",
    isHeadquarters: true,
    mapQuery: "Gewerbestrasse 28, 6438 Ibach",
  },
  {
    city: "Muotathal",
    street: "Industriestrasse 2",
    zip: "6436 Muotathal",
    phone: "+41 41 830 20 71",
    phoneHref: "tel:+41418302071",
    mapQuery: "Industriestrasse 2, 6436 Muotathal",
  },
  {
    city: "Zug",
    street: "Baarerstrasse 75",
    zip: "6300 Zug",
    phone: "+41 41 720 03 03",
    phoneHref: "tel:+41417200303",
    mapQuery: "Baarerstrasse 75, 6300 Zug",
  },
];

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Startseite", href: "/" },
  {
    label: "Leistungen",
    href: "/leistungen",
    children: [
      { label: "Netzwerk", href: "/leistungen/netzwerk" },
      { label: "IP-Telefonie", href: "/leistungen/ip-telefonie" },
      { label: "Überwachung", href: "/leistungen/ueberwachung" },
      { label: "KMU Software", href: "/leistungen/kmu-software" },
      { label: "Digital Signage", href: "/leistungen/digital-signage" },
    ],
  },
  {
    label: "Firma",
    href: "/firma/firmenprofil",
    children: [
      { label: "Firmenprofil", href: "/firma/firmenprofil" },
      { label: "Team", href: "/firma/team" },
      { label: "Partner", href: "/firma/partner" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Support", href: "/support" },
];

export type RemoteTool = {
  name: string;
  description: string;
  href: string;
  platform: string;
};

/** Fernwartungstools – der Support-Techniker nennt das passende Tool. */
export const remoteTools: RemoteTool[] = [
  {
    name: "TeamViewer",
    description:
      "Vorkonfiguriertes hema Support-Modul. Nach dem Start erhalten Sie eine ID und ein Passwort, die Sie uns am Telefon mitteilen.",
    href: "https://get.teamviewer.com/hemasupport",
    platform: "Windows",
  },
  {
    name: "PC Visit",
    description:
      "Das pcvisit Kunden-Modul muss nicht installiert werden. Einfach herunterladen, ausführen und die angezeigte Verbindungsnummer nennen.",
    href: "https://lb3.pcvisit.de/v1/hosted/jumplink?func=download&topic=guestSetup&destname=pcvisit_Kunden-Modul&os=osWin32",
    platform: "Windows",
  },
  {
    name: "AnyDesk",
    description:
      "Schlanke Alternative für schnelle Verbindungen. Nach dem Start teilen Sie uns Ihre AnyDesk-Adresse mit.",
    href: "https://anydesk.com/de/downloads/thank-you?dv=win_exe",
    platform: "Windows",
  },
];

export const footerNav = [
  {
    title: "Unternehmen",
    links: [
      { label: "Startseite", href: "/" },
      { label: "Firmenprofil", href: "/firma/firmenprofil" },
      { label: "Team", href: "/firma/team" },
      { label: "Partner", href: "/firma/partner" },
      { label: "Neuigkeiten", href: "/neuigkeiten" },
    ],
  },
  {
    title: "Leistungen",
    links: [
      { label: "Netzwerk", href: "/leistungen/netzwerk" },
      { label: "IP-Telefonie", href: "/leistungen/ip-telefonie" },
      { label: "Überwachung", href: "/leistungen/ueberwachung" },
      { label: "KMU Software", href: "/leistungen/kmu-software" },
      { label: "Digital Signage", href: "/leistungen/digital-signage" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Kontakt", href: "/kontakt" },
      { label: "Support", href: "/support" },
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutzerklärung", href: "/datenschutzerklaerung" },
    ],
  },
];
