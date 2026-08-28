import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@hema.ch" },
    update: {},
    create: {
      email: "admin@hema.ch",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });
  console.log("Created admin user:", admin.email);

  // Migrate existing MDX news posts
  const NEWS_DIR = path.join(process.cwd(), "src/content/news");
  const files = await fs.readdir(NEWS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  for (const file of mdxFiles) {
    const raw = await fs.readFile(path.join(NEWS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");

    await prisma.newsPost.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: data.title,
        date: new Date(data.date),
        excerpt: data.excerpt,
        category: data.category,
        image: data.image,
        ctaLabel: data.cta?.label,
        ctaHref: data.cta?.href,
        content,
        published: true,
      },
    });
    console.log("Migrated news post:", slug);
  }

  console.log("Seed complete.");

  // Seed site settings
  await prisma.siteSetting.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      name: "hema computersysteme ag",
      shortName: "hema",
      tagline: "Ihr IT Specialist in Ihrer Region",
      description:
        "hema computersysteme ag ist Ihr IT-Partner in der Region Schwyz: Netzwerke, IP-Telefonie, Videoüberwachung, KMU Software und Digital Signage für KMU, öffentliche Institutionen und Privatpersonen.",
      email: "info@hema.ch",
      url: "https://hema.ch",
      social: [
        { label: "Facebook", href: "https://www.facebook.com/hemacomputersysteme" },
        { label: "Instagram", href: "https://www.instagram.com/hemacomputersysteme" },
      ],
    },
  });
  console.log("Seeded site settings.");

  // Seed locations
  const locationData = [
    {
      city: "Ibach",
      street: "Gewerbestrasse 28",
      zip: "6438 Ibach / SZ",
      phone: "+41 41 833 88 88",
      phoneHref: "tel:+41418338888",
      isHeadquarters: true,
      mapQuery: "Gewerbestrasse 28, 6438 Ibach",
      sortOrder: 0,
    },
    {
      city: "Muotathal",
      street: "Industriestrasse 2",
      zip: "6436 Muotathal",
      phone: "+41 41 830 20 71",
      phoneHref: "tel:+41418302071",
      mapQuery: "Industriestrasse 2, 6436 Muotathal",
      sortOrder: 1,
    },
    {
      city: "Zug",
      street: "Baarerstrasse 75",
      zip: "6300 Zug",
      phone: "+41 41 720 03 03",
      phoneHref: "tel:+41417200303",
      mapQuery: "Baarerstrasse 75, 6300 Zug",
      sortOrder: 2,
    },
  ];

  for (const loc of locationData) {
    const existing = await prisma.location.findFirst({ where: { city: loc.city } });
    if (!existing) {
      await prisma.location.create({ data: loc });
      console.log("Seeded location:", loc.city);
    }
  }

  // Seed nav items
  const existingNavCount = await prisma.navItem.count();
  if (existingNavCount === 0) {
    // Header parents
    const startseite = await prisma.navItem.create({
      data: { location: "header", label: "Startseite", href: "/", external: false, sortOrder: 0 },
    });
    const leistungen = await prisma.navItem.create({
      data: { location: "header", label: "Leistungen", href: "/leistungen", external: false, sortOrder: 1 },
    });
    const firma = await prisma.navItem.create({
      data: { location: "header", label: "Firma", href: "/firma/firmenprofil", external: false, sortOrder: 2 },
    });
    await prisma.navItem.create({
      data: { location: "header", label: "Kontakt", href: "/kontakt", external: false, sortOrder: 3 },
    });
    await prisma.navItem.create({
      data: {
        location: "header",
        label: "Support",
        href: "https://lb3.pcvisit.de/v1/hosted/jumplink?func=download&topic=guestSetup&destname=pcvisit_Kunden-Modul&os=osWin32",
        external: true,
        sortOrder: 4,
      },
    });

    // Header children for Leistungen
    const leistungenChildren = [
      { label: "Netzwerk", href: "/leistungen/netzwerk" },
      { label: "IP-Telefonie", href: "/leistungen/ip-telefonie" },
      { label: "Überwachung", href: "/leistungen/ueberwachung" },
      { label: "KMU Software", href: "/leistungen/kmu-software" },
      { label: "Digital Signage", href: "/leistungen/digital-signage" },
    ];
    for (let i = 0; i < leistungenChildren.length; i++) {
      await prisma.navItem.create({
        data: {
          location: "header",
          label: leistungenChildren[i].label,
          href: leistungenChildren[i].href,
          external: false,
          sortOrder: i,
          parentId: leistungen.id,
        },
      });
    }

    // Header children for Firma
    const firmaChildren = [
      { label: "Firmenprofil", href: "/firma/firmenprofil" },
      { label: "Team", href: "/firma/team" },
      { label: "Partner", href: "/firma/partner" },
    ];
    for (let i = 0; i < firmaChildren.length; i++) {
      await prisma.navItem.create({
        data: {
          location: "header",
          label: firmaChildren[i].label,
          href: firmaChildren[i].href,
          external: false,
          sortOrder: i,
          parentId: firma.id,
        },
      });
    }

    // Footer nav
    const footerNav = [
      { location: "footer", section: "Unternehmen", label: "Startseite", href: "/", sortOrder: 0 },
      { location: "footer", section: "Unternehmen", label: "Firmenprofil", href: "/firma/firmenprofil", sortOrder: 1 },
      { location: "footer", section: "Unternehmen", label: "Team", href: "/firma/team", sortOrder: 2 },
      { location: "footer", section: "Unternehmen", label: "Partner", href: "/firma/partner", sortOrder: 3 },
      { location: "footer", section: "Unternehmen", label: "Neuigkeiten", href: "/neuigkeiten", sortOrder: 4 },
      { location: "footer", section: "Leistungen", label: "Netzwerk", href: "/leistungen/netzwerk", sortOrder: 0 },
      { location: "footer", section: "Leistungen", label: "IP-Telefonie", href: "/leistungen/ip-telefonie", sortOrder: 1 },
      { location: "footer", section: "Leistungen", label: "Überwachung", href: "/leistungen/ueberwachung", sortOrder: 2 },
      { location: "footer", section: "Leistungen", label: "KMU Software", href: "/leistungen/kmu-software", sortOrder: 3 },
      { location: "footer", section: "Leistungen", label: "Digital Signage", href: "/leistungen/digital-signage", sortOrder: 4 },
      { location: "footer", section: "Service", label: "Kontakt", href: "/kontakt", sortOrder: 0 },
      { location: "footer", section: "Service", label: "Support", href: "/support", sortOrder: 1 },
      { location: "footer", section: "Service", label: "Impressum", href: "/impressum", sortOrder: 2 },
      { location: "footer", section: "Service", label: "Datenschutzerklärung", href: "/datenschutzerklaerung", sortOrder: 3 },
    ];
    for (const item of footerNav) {
      await prisma.navItem.create({ data: item });
    }
    console.log("Seeded nav items.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
