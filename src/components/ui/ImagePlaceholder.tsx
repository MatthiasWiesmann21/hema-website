import Image from "next/image";

import { cn } from "@/lib/utils";

const aspects = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "3/2": "aspect-3/2",
  "1/1": "aspect-square",
  none: "",
} as const;

type ImagePlaceholderProps = {
  /** Drop a real file into /public/images and pass its path to replace the placeholder. */
  src?: string;
  /** Used as alt text for real images and as the caption of the placeholder. */
  label: string;
  aspect?: keyof typeof aspects;
  className?: string;
  tone?: "brand" | "accent" | "neutral";
  priority?: boolean;
  rounded?: string;
};

const tones = {
  brand: "from-brand-800 via-brand-700 to-brand-900 text-white/80",
  accent: "from-accent-500 via-accent-600 to-brand-800 text-white/85",
  neutral: "from-brand-50 via-white to-brand-100 text-brand-500",
} as const;

export function ImagePlaceholder({
  src,
  label,
  aspect = "16/9",
  className,
  tone = "brand",
  priority = false,
  rounded = "rounded-2xl",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        rounded,
        aspects[aspect],
        !src && `bg-linear-to-br ${tones[tone]}`,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              className="size-8 opacity-70"
            >
              <rect x="3" y="4" width="18" height="16" rx="2.5" />
              <circle cx="8.5" cy="9.5" r="1.6" />
              <path d="M3.5 17l5-5 4.5 4.5L16 14l4.5 4.5" />
            </svg>
            <span className="text-xs font-medium tracking-wide uppercase">
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
