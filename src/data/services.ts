import type { serviceIcons } from "@/components/icons";

export type Service = {
  slug: string;
  title: string;
  navTitle: string;
  teaser: string;
  icon: keyof typeof serviceIcons;
};

export const services: Service[] = [
  {
    slug: "netzwerk",
    title: "Netzwerk",
    navTitle: "Netzwerke",
    teaser:
      "Leistungsfähige, stabile und flexible Unternehmensnetzwerke – von der Analyse über die Projektierung bis zu Service, Support und Backup.",
    icon: "network",
  },
  {
    slug: "ip-telefonie",
    title: "IP-Telefonie",
    navTitle: "IP - Telefonie",
    teaser:
      "Moderne Kommunikation mit Swyx und peoplefone HOSTED – intelligentes Anrufmanagement statt veralteter Telefonanlage.",
    icon: "phone",
  },
  {
    slug: "ueberwachung",
    title: "Überwachung",
    navTitle: "Überwachung",
    teaser:
      "Videoüberwachung für sensible Bereiche, Produktion, Baustellen oder als Webcam – mobil abrufbar, jederzeit im Bild.",
    icon: "camera",
  },
  {
    slug: "kmu-software",
    title: "KMU Software",
    navTitle: "KMU Software",
    teaser:
      "Proffix Px5 – Schweizer Business Software für Schweizer KMU. Modular, smart und laufend der Gesetzgebung angepasst.",
    icon: "cart",
  },
  {
    slug: "digital-signage",
    title: "Digital Signage",
    navTitle: "Digital Signage",
    teaser:
      "hema INFO screen: Bildschirm, Player und Software-Lizenzen in einem – Ihre Botschaft in bewegten Bildern.",
    icon: "screen",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
