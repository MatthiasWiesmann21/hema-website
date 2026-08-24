import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      aria-label="hema computersysteme ag – Startseite"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <Image
        src="/images/hema-logo-200x200-Cleaned.bmp"
        alt="hema computersysteme ag"
        width={60}
        height={60}
      />
    </Link>
  );
}
