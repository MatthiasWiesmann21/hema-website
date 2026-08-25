"use client";

import { useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

type Cause = { value: string; label: string };

function parsePercent(value: string): number {
  const match = value.match(/^(\d+)%$/);
  return match ? parseInt(match[1], 10) : 0;
}

function DataLossCard({ causes, animate }: { causes: Cause[]; animate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(
    causes.map(() => 0),
  );

  useEffect(() => {
    if (!animate) {
      setCounts(causes.map(() => 0));
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const targets = causes.map((c) => parsePercent(c.value));
          const duration = 1500;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(targets.map((t) => Math.round(eased * t)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [causes, animate]);

  return (
    <div ref={ref}>
      <Card className="p-7">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand-500 uppercase">
          Ursachen für Datenverlust
        </p>
        <ul className="mt-6 flex flex-col gap-5">
          {causes.map((cause, i) => (
            <li key={cause.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium">{cause.label}</span>
                <span className="font-display text-sm font-bold text-brand-800">
                  {counts[i]}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-accent-500 transition-all duration-300"
                  style={{ width: `${counts[i]}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function BackupStatsCarousel({ causes }: { causes: Cause[] }) {
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowStats((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-80">
      <div
        className={`transition-opacity duration-1000 ${
          showStats ? "opacity-100" : "opacity-0"
        }`}
      >
        <DataLossCard causes={causes} animate={showStats} />
      </div>
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showStats ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="rounded-2xl border border-brand-100 bg-white p-7 shadow-card">
          <ImagePlaceholder
            src="/images/RDX.jpg"
            label="RDX Backup-Lösung"
            aspect="16/9"
            tone="brand"
            rounded="rounded-md"
            className="max-h-72"
          />
        </div>
      </div>
    </div>
  );
}
