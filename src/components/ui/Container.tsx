import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  as: Component = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}
    >
      {children}
    </Component>
  );
}
