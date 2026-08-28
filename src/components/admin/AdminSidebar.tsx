"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Neuigkeiten", href: "/admin/neuigkeiten" },
    { label: "Custom Pages", href: "/admin/pages" },
    { label: "Media", href: "/admin/media" },
    { label: "Contact", href: "/admin/contact" },
    { label: "Locations", href: "/admin/locations" },
    { label: "Navigation", href: "/admin/navigation" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-brand-100 bg-white">
      <div className="flex h-16 items-center border-b border-brand-100 px-6">
        <Link href="/admin" className="text-lg font-bold text-brand-900">
          hema Admin
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-50 text-accent-500"
                      : "text-brand-900/70 hover:bg-brand-50 hover:text-brand-900",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-brand-100 p-4">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-brand-900/70 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
