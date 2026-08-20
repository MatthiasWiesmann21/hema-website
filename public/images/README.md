# Bilder

Alle Bildflächen der Website sind aktuell Platzhalter (`ImagePlaceholder`).
Sobald echte Dateien vorliegen, genügt es, sie hier abzulegen und den Pfad an
der entsprechenden Stelle zu setzen – der Platzhalter verschwindet automatisch
und `next/image` übernimmt.

## Empfohlene Struktur

| Datei                             | Verwendung                                | Empfohlene Grösse |
| --------------------------------- | ----------------------------------------- | ----------------- |
| `hero/startseite.jpg`             | Hero Startseite (`src/app/page.tsx`)      | 1600 × 1200       |
| `hero/hiring.jpg`                 | «We are hiring» Banner Startseite         | 1200 × 900        |
| `leistungen/netzwerk.jpg`         | Netzwerk                                  | 1600 × 1200       |
| `leistungen/ip-telefonie.jpg`     | IP-Telefonie (Swyx)                       | 1600 × 1200       |
| `leistungen/peoplefone.jpg`       | peoplefone HOSTED                         | 1600 × 1200       |
| `leistungen/ueberwachung.jpg`     | Überwachung                               | 1600 × 1200       |
| `leistungen/proffix-px5.png`      | Proffix Px5 Screenshot                    | 1600 × 1200       |
| `leistungen/digital-signage.jpg`  | Digital Signage / INFO screen             | 1600 × 1200       |
| `firma/team.jpg`                  | Firmenprofil                              | 1600 × 1200       |
| `team/<vorname>-<nachname>.jpg`   | Teamfotos (`src/data/team.ts` → `image`)  | 800 × 600         |
| `partners/<name>.svg`             | Partnerlogos (`src/data/partners.ts`)     | SVG bevorzugt     |
| `news/<slug>.jpg`                 | Bild einer Meldung (Frontmatter `image`)  | 1600 × 900        |

## Beispiele

Teamfoto in `src/data/team.ts`:

```ts
{
  name: "Bruno Marty",
  role: "Geschäftsleitung",
  focus: ["KMU Software", "IP Telefonie", "Netzwerk"],
  image: "/images/team/bruno-marty.jpg",
}
```

Bild einer Meldung im Frontmatter von `src/content/news/*.mdx`:

```yaml
image: /images/news/synology-gold-partner.jpg
```

Hero- und Sektionsbilder werden direkt in der jeweiligen Seite gesetzt:

```tsx
<ImagePlaceholder src="/images/hero/startseite.jpg" label="…" aspect="4/3" />
```
