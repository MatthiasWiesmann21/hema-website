import Link from "next/link";

import { cn } from "@/lib/utils";

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
      <span aria-hidden className="flex flex-col justify-center gap-1 pt-0.5">
        <span className="block h-[3px] w-7 rounded-full bg-accent-500 transition-all group-hover:w-9" />
        <span className="block h-[3px] w-5 rounded-full bg-accent-500 transition-all group-hover:w-7" />
        <span
          className={cn(
            "block h-[3px] w-3.5 rounded-full transition-all group-hover:w-5",
            variant === "dark" ? "bg-brand-700" : "bg-white/70",
          )}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-bold tracking-tight",
            variant === "dark" ? "text-brand-900" : "text-white",
          )}
        >
          hema
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold tracking-[0.16em] uppercase",
            variant === "dark" ? "text-brand-500" : "text-white/70",
          )}
        >
          computersysteme ag
        </span>
      </span>
    </Link>
  );
}
