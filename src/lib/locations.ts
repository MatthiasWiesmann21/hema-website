import { prisma } from "@/lib/prisma";
import { locations as defaultLocations } from "@/data/site";

export type LocationData = {
  id: string;
  city: string;
  street: string;
  zip: string;
  phone: string;
  phoneHref: string;
  email: string | null;
  isHeadquarters: boolean;
  mapQuery: string;
  sortOrder: number;
};

export async function getLocations(): Promise<LocationData[]> {
  const rows = await prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });

  if (rows.length === 0) {
    return defaultLocations.map((loc, i) => ({
      id: `fallback-${i}`,
      city: loc.city,
      street: loc.street,
      zip: loc.zip,
      phone: loc.phone,
      phoneHref: loc.phoneHref,
      email: null,
      isHeadquarters: loc.isHeadquarters ?? false,
      mapQuery: loc.mapQuery,
      sortOrder: i,
    }));
  }

  return rows.map((row) => ({
    id: row.id,
    city: row.city,
    street: row.street,
    zip: row.zip,
    phone: row.phone,
    phoneHref: row.phoneHref,
    email: row.email,
    isHeadquarters: row.isHeadquarters,
    mapQuery: row.mapQuery,
    sortOrder: row.sortOrder,
  }));
}
