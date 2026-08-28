import { notFound } from "next/navigation";

import { LocationForm } from "@/components/admin/LocationForm";
import { prisma } from "@/lib/prisma";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await prisma.location.findUnique({ where: { id } });

  if (!location) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Edit Location</h1>
      <LocationForm
        locationId={location.id}
        initialData={{
          city: location.city,
          street: location.street,
          zip: location.zip,
          phone: location.phone,
          phoneHref: location.phoneHref,
          email: location.email ?? "",
          isHeadquarters: location.isHeadquarters,
          mapQuery: location.mapQuery,
          sortOrder: location.sortOrder,
        }}
      />
    </div>
  );
}
