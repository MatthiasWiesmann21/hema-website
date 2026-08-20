import { cn } from "@/lib/utils";

export function BulletList({
  items,
  className,
  columns = 1,
}: {
  items: string[];
  className?: string;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={cn(
        "grid gap-3",
        columns === 2 && "sm:grid-cols-2 sm:gap-x-8",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-relaxed sm:text-base"
        >
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1 size-4 shrink-0 text-accent-500"
          >
            <path d="M4 10.5l4 4 8-9" />
          </svg>
          <span className="text-brand-950/75">{item}</span>
        </li>
      ))}
    </ul>
  );
}
