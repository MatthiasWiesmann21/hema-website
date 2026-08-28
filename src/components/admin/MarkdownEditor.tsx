"use client";

import { useState, useMemo } from "react";
import { marked } from "marked";

import { cn } from "@/lib/utils";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

type ViewMode = "split" | "editor" | "preview";

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content in markdown...",
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<ViewMode>("split");

  const html = useMemo(() => {
    try {
      return marked.parse(value || "", { async: false }) as string;
    } catch {
      return "";
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="flex rounded-lg border border-brand-200 bg-white p-0.5">
          {(["editor", "split", "preview"] as ViewMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                mode === m
                  ? "bg-brand-900 text-white"
                  : "text-brand-900/60 hover:text-brand-900",
              )}
            >
              {m === "split" ? "Split" : m}
            </button>
          ))}
        </div>
        <span className="text-xs text-brand-900/40">Markdown supported</span>
      </div>

      <div
        className={cn(
          "overflow-hidden rounded-xl border border-brand-200 bg-white",
          mode === "split" ? "grid grid-cols-2" : "block",
        )}
      >
        {mode !== "preview" && (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "min-h-96 w-full resize-y bg-white p-4 font-mono text-sm leading-relaxed text-brand-900 outline-none",
              mode === "split" && "border-r border-brand-200",
            )}
            spellCheck={false}
          />
        )}

        {mode !== "editor" && (
          <div
            className="prose prose-sm max-w-none min-h-96 overflow-auto p-4 prose-headings:text-brand-900 prose-a:text-accent-500 prose-strong:text-brand-900"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}
