export type Partner = {
  name: string;
  href: string;
  category: string;
  logo?: string;
};

export const partners: Partner[] = [
  { name: "Proffix", href: "https://www.proffix.ch", category: "KMU Software", logo: "/images/Partner/Proffix_Partner_CP_Px5_Black_RGB.png" },
  {
    name: "Microsoft",
    href: "https://www.microsoft.com/de-ch",
    category: "Cloud & Betriebssysteme",
    logo: "/images/Partner/Microsoft.jpg",
  },
  {
    name: "Synology",
    href: "http://www.synology.com",
    category: "Storage & Backup",
    logo: "/images/Partner/Partner-Logo_GOLD_2025.png",
  },
  {
    name: "peoplefone",
    href: "https://www.peoplefone.com",
    category: "IP-Telefonie",
    logo: "/images/Partner/peoplefone.png",
  },
  {
    name: "Enreach",
    href: "https://www.enreach.de",
    category: "Unified Communication",
    logo: "/images/Partner/SWYX-Logo.webp",
  },
  {
    name: "Zyxel",
    href: "https://www.zyxel.com/ch/de-ch",
    category: "Netzwerk",
    logo: "/images/Partner/zyxel_silverpartner_2024.png",
  },
  { name: "Wortmann", href: "https://www.wortmann.de", category: "Hardware", logo: "/images/Partner/terra_service_partner.png" },
  { name: "HP", href: "https://www.hp.com", category: "Hardware", logo: "/images/Partner/hp.png" },
  { name: "F-Secure", href: "https://www.f-secure.com", category: "Security", logo: "/images/Partner/F-Secure_vertical-logo_RGB_blue.png" },
  {
    name: "Ontrack",
    href: "https://www.ontrack.com/de-ch/datenrettung/anfrage-datenrettung?partnerid=6631829",
    category: "Datenrettung",
    logo: "/images/Partner/ontrackautorisierterpartner_c.jpg",
  },
  { name: "WWZ", href: "https://www.wwz.ch", category: "Connectivity", logo: "/images/Partner/Logo_WWZ-Telekom-AG_rgb.png" },
  { name: "Quickline", href: "https://quickline.ch", category: "Connectivity", logo: "/images/Partner/Quickline.png" },
  {
    name: "Schwyz Tourismus",
    href: "https://www.schwyz-tourismus.ch",
    category: "Region",
    logo: "/images/Partner/schwyztourismus_2025.png",
  },
];
