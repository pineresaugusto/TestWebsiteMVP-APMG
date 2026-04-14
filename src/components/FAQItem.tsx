"use client";

import { useState } from "react";

type FAQItemProps = {
  q: string;
  children: React.ReactNode;
};

export default function FAQItem({ q, children }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl border bg-white transition-colors ${
        open ? "border-primary/40" : "border-secondary/40"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
      >
        <span className="text-sm md:text-base font-medium text-foreground">{q}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 text-foreground/50 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-foreground/70 leading-relaxed">{children}</div>
      )}
    </div>
  );
}
