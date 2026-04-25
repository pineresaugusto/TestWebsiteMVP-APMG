"use client";

import Link from "next/link";
import { useDemoState } from "@/lib/demoState";

const FALLBACK_REASON = "a contraindication flagged in your health history";

export default function NotEligiblePage() {
  const state = useDemoState();
  const reason = state.quiz.contraindicationReason || FALLBACK_REASON;

  return (
    <div className="mx-auto w-full max-w-[620px] px-6 py-16 md:py-20">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/40 text-foreground/60">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </div>

      <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground md:text-[32px]">
        We&apos;re not able to serve you at this time
      </h1>

      <p className="mt-4 text-[16px] leading-[1.7] text-foreground/70">
        Based on your answers — specifically{" "}
        <strong className="font-semibold text-foreground">{reason}</strong> —
        GLP-1 medications may not be right for you. This is not a reflection on
        you; it&apos;s how we keep treatment safe.
      </p>

      <div className="my-8 border-y border-secondary/40 py-4 text-[15px] font-medium leading-relaxed text-primary-dark">
        Please talk to your primary care physician about weight-loss options
        that fit your health history.
      </div>

      <div className="mb-9 rounded-2xl border border-secondary/40 bg-white p-7 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-foreground">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px] text-primary"
            aria-hidden
          >
            <circle cx={12} cy={12} r={10} />
            <line x1={12} y1={16} x2={12} y2={12} />
            <line x1={12} y1={8} x2={12.01} y2={8} />
          </svg>
          What to tell your doctor
        </h3>
        <ul className="flex flex-col gap-3">
          {[
            "You explored GLP-1 receptor agonist therapy (semaglutide) for weight management and were screened out due to a contraindication.",
            "Ask about alternative weight-loss medications or programs that may be compatible with your medical history.",
            "Request a comprehensive metabolic panel if you haven't had one recently — it gives your doctor a clearer picture of your options.",
          ].map((t) => (
            <li
              key={t}
              className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-foreground/80"
            >
              <span
                className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Return to home
        </Link>
        <Link
          href="/medical-disclaimer"
          className="text-sm text-foreground/45 transition-colors hover:text-foreground/70"
        >
          Read our medical disclaimer
        </Link>
      </div>
    </div>
  );
}
