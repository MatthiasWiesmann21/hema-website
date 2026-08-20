import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-brand-100 bg-white shadow-card",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function FeatureCard({
  title,
  children,
  icon,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      as="li"
      className={cn(
        "flex h-full flex-col gap-3 p-6 transition-all hover:border-brand-200 hover:shadow-card-hover",
        className,
      )}
    >
      {icon ? (
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          {icon}
        </span>
      ) : null}
      <h3 className="text-lg font-semibold">{title}</h3>
      {children ? (
        <div className="text-sm leading-relaxed text-brand-950/70">
          {children}
        </div>
      ) : null}
    </Card>
  );
}
