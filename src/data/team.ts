export type TeamMember = {
  name: string;
  role: string;
  focus: string[];
  /** Place a photo in /public/images/team and reference it here to replace the placeholder. */
  image?: string;
};

export const team: TeamMember[] = [
  {
    name: "Bruno Marty",
    role: "Geschäftsleitung",
    focus: ["KMU Software", "IP Telefonie", "Netzwerk"],
    image: "/images/Team/Bruno.png",
  },
  {
    name: "Stephan Schuler",
    role: "Geschäftsleitung / Informatiker HF",
    focus: ["Videoüberwachung", "Netzwerk"],
    image: "/images/Team/Stephan.png",
  },
  {
    name: "Martin Ulrich",
    role: "Geschäftsleitung / System Engineer",
    focus: ["IP Telefonie", "Netzwerk"],
    image: "/images/Team/Martin.png",
  },
  {
    name: "Patrick von Rickenbach",
    role: "Geschäftsleitung Filiale Muotathal",
    focus: ["Netzwerk", "IP Telefonie", "Drucker"],
    image: "/images/Team/Patrick.png",
  },
  {
    name: "Michael Kälin",
    role: "Geschäftsleitung / Informatiker HF",
    focus: ["Videoüberwachung", "Alarmanlagen"],
    image: "/images/Team/Michael.png",
  },
  {
    name: "Robert Röthlin",
    role: "IT-Systemtechniker",
    focus: ["Microsoft 365", "Backup", "Netzwerk"],
    image: "/images/Team/Robert.png",
  },
  {
    name: "Angela Marty",
    role: "Sekretariat / Buchhaltung",
    focus: ["Administration", "Backoffice"],
  },
  {
    name: "Alex Betschart",
    role: "Informatiker",
    focus: ["Netzwerk"],
  },
  {
    name: "David Auf der Maur",
    role: "IT-Systemtechniker",
    focus: ["Netzwerk"],
    image: "/images/Team/David.png",
  },
  {
    name: "Matthias Wiesmann",
    role: "IT-Systemtechniker",
    focus: ["Netzwerk"],
  },
];
