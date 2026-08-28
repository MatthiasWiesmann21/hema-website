import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function AdminLocationsList() {
  const locations = await prisma.location.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Locations</h1>
          <p className="mt-1 text-sm text-brand-900/60">
            Manage company locations shown on the contact page and header.
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
        >
          + New Location
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-100 bg-brand-50/50">
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-brand-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {locations.map((loc) => (
              <tr key={loc.id} className="transition-colors hover:bg-brand-50/30">
                <td className="px-6 py-4 text-sm font-medium text-brand-900">
                  {loc.city}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  {loc.street}, {loc.zip}
                </td>
                <td className="px-6 py-4 text-sm text-brand-900/60">
                  {loc.phone}
                </td>
                <td className="px-6 py-4">
                  {loc.isHeadquarters ? (
                    <span className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-600">
                      Headquarters
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      Branch
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/locations/${loc.id}/edit`}
                    className="text-sm font-medium text-accent-500 hover:text-accent-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {locations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-brand-900/40">
                  No locations yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
