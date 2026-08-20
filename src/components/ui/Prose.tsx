import { cn } from "@/lib/utils";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose-brand prose max-w-3xl",
        "prose-headings:font-display prose-headings:tracking-tight prose-headings:text-brand-950",
        "prose-p:text-brand-950/75 prose-strong:text-brand-950 prose-li:text-brand-950/75",
        "prose-a:font-medium prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline",
        "prose-hr:border-brand-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
