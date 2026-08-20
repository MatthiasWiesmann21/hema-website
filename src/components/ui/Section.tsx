import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  containerClassName,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "white" | "muted" | "brand";
  id?: string;
}) {
  const tones = {
    white: "bg-white",
    muted: "bg-brand-50/70",
    brand: "bg-brand-950 text-white",
  } as const;

  return (
    <section id={id} className={cn(tones[tone], "py-16 sm:py-20", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
