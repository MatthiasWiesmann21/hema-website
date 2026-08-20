export type Partner = {
  name: string;
  href: string;
  category: string;
  /** Place a logo in /public/images/partners and reference it here to replace the placeholder. */
  logo?: string;
};

export const partners: Partner[] = [
  { name: "Proffix", href: "https://www.proffix.ch", category: "KMU Software" },
  {
    name: "Microsoft",
    href: "https://www.microsoft.com/de-ch",
    category: "Cloud & Betriebssysteme",
  },
  {
    name: "Synology",
    href: "http://www.synology.com",
    category: "Storage & Backup",
  },
  {
    name: "peoplefone",
    href: "https://www.peoplefone.com",
    category: "IP-Telefonie",
  },
  {
    name: "Enreach",
    href: "https://www.enreach.de",
    category: "Unified Communication",
  },
  {
    name: "Zyxel",
    href: "https://www.zyxel.com/ch/de-ch",
    category: "Netzwerk",
  },
  { name: "Wortmann", href: "https://www.wortmann.de", category: "Hardware" },
  { name: "HP", href: "https://www.hp.com", category: "Hardware" },
  { name: "F-Secure", href: "https://www.f-secure.com", category: "Security" },
  {
    name: "Ontrack",
    href: "https://www.ontrack.com/de-ch/datenrettung/anfrage-datenrettung?partnerid=6631829",
    category: "Datenrettung",
  },
  { name: "WWZ", href: "https://www.wwz.ch", category: "Connectivity" },
  { name: "Quickline", href: "https://quickline.ch", category: "Connectivity" },
  {
    name: "Schwyz Tourismus",
    href: "https://www.schwyz-tourismus.ch",
    category: "Region",
  },
];
