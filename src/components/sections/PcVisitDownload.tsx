"use client";

import { useEffect, useState } from "react";

import { AppleIcon, DownloadIcon, WindowsIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Os = "windows" | "macos";

function detectOs(): Os {
  const uaData = (
    navigator as Navigator & { userAgentData?: { platform?: string } }
  ).userAgentData;
  const platform = uaData?.platform ?? navigator.platform ?? navigator.userAgent;

  return /mac|iphone|ipad|ipod/i.test(platform) ? "macos" : "windows";
}

export function PcVisitDownload({
  windowsHref,
  macHref,
}: {
  windowsHref: string;
  macHref: string;
}) {
  const [os, setOs] = useState<Os>("windows");

  useEffect(() => {
    setOs(detectOs());
  }, []);

  const href = os === "windows" ? windowsHref : macHref;

  const option = (value: Os, label: string, Icon: typeof WindowsIcon) => (
    <button
      type="button"
      onClick={() => setOs(value)}
      aria-pressed={os === value}
      title={label}
      className={cn(
        "flex size-9 items-center justify-center rounded-full transition-colors",
        os === value
          ? "bg-brand-700 text-white"
          : "text-brand-400 hover:text-brand-600",
      )}
    >
      <Icon className="size-5" />
      <span className="sr-only">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button href={href} size="lg">
        <DownloadIcon className="size-5" />
        Download {os === "windows" ? "Windows" : "macOS"}
      </Button>
      <div
        role="group"
        aria-label="Betriebssystem wählen"
        className="flex items-center gap-1 rounded-full border border-brand-200 bg-white p-1.5 shadow-sm"
      >
        {option("windows", "Windows", WindowsIcon)}
        {option("macos", "macOS", AppleIcon)}
      </div>
    </div>
  );
}
