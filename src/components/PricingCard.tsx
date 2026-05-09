"use client";

/**
 * Pricing card with a quiet bundle-and-save selector.
 *
 * The card always shows ONE per-month price. By default that's the 1-month
 * price. The visitor can toggle to 3 / 6 / 12 months — but the toggle is
 * deliberately understated. Per user direction (Iter 10): "shouldn't look
 * like something hugely advertised that screams 'HEY, GET MORE', rather more
 * like 'Hey, here's this option if you prefer it'." So:
 *   - small inline pill row, not a hero badge
 *   - no "SAVE 30%!" stickers
 *   - the only callout is a small "billed $XYZ as a 6-month bundle" line
 *     that appears only when cadence > 1
 *
 * The selected cadence flows through to /get-started via querystring so
 * the funnel can carry it forward.
 */

import Link from "next/link";
import { useState } from "react";
import {
  type Plan,
  type PlanTier,
  PLANS,
  BUNDLE_CADENCES,
  type BundleCadence,
  cadenceShortLabel,
  priceForCadence,
} from "@/lib/plans";

type Props = {
  plan: Plan;
};

export default function PricingCard({ plan }: Props) {
  const [cadence, setCadence] = useState<BundleCadence>(1);
  const { perMonth, total, baselinePerMonth, annualSavings } = priceForCadence(
    plan,
    cadence,
  );
  const isBundled = cadence > 1;
  const previousTier: PlanTier | null = plan.builtsOn;
  const previousName = previousTier ? PLANS[previousTier].name : null;

  return (
    <div
      className={`relative h-full rounded-2xl border p-8 flex flex-col transition-all hover:-translate-y-[2px] ${
        plan.popular
          ? "border-accent bg-white shadow-xl shadow-accent/15 ring-1 ring-accent"
          : "border-secondary/40 bg-white hover:shadow-lg hover:border-primary/30"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-md shadow-accent/30">
          Most popular
        </div>
      )}

      <div>
        <h3 className="font-display text-2xl text-foreground">{plan.name}</h3>
        <p className="mt-1 text-sm text-foreground/60">{plan.tagline}</p>

        {/* Price block. When bundled, the 1-month baseline is shown
            struck-through to the LEFT of the new rate so the discount is
            visible at a glance — without using "SAVE!" stickers. */}
        <div className="mt-6 flex items-baseline gap-2">
          {isBundled && (
            <span
              className="font-display text-2xl text-foreground/35 tabular-nums line-through decoration-[1.5px] decoration-foreground/40"
              aria-label={`Regular monthly price ${baselinePerMonth} dollars`}
            >
              ${baselinePerMonth}
            </span>
          )}
          <span className="font-display text-5xl text-foreground tabular-nums">
            ${perMonth}
          </span>
          <span className="text-foreground/50">/mo</span>
        </div>
        {isBundled && (
          <p className="mt-1 text-[12px] font-medium text-primary-dark tabular-nums">
            Save ${annualSavings.toLocaleString()}/year vs monthly
          </p>
        )}

        {/* Cadence selector — quiet, not screaming */}
        <div className="mt-4">
          <div
            role="group"
            aria-label="Choose billing cadence"
            className="inline-flex flex-wrap items-center gap-1 rounded-full bg-secondary-light/60 p-1"
          >
            {BUNDLE_CADENCES.map((c) => {
              const active = c === cadence;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCadence(c)}
                  aria-pressed={active}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium tabular-nums transition-colors ${
                    active
                      ? "bg-white text-foreground shadow-sm"
                      : "text-foreground/55 hover:text-foreground/80"
                  }`}
                >
                  {cadenceShortLabel(c)}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] text-foreground/45 min-h-[1rem]">
            {cadence === 1
              ? "Billed monthly · Cancel anytime · No hidden fees"
              : `Billed $${total.toLocaleString()} upfront as a ${cadence}-month bundle · No hidden fees`}
          </p>
        </div>
      </div>

      {/* "Everything in <previous>, plus..." framing */}
      {previousName && (
        <p className="mt-7 text-sm font-medium text-foreground/75">
          Everything in {previousName}, plus:
        </p>
      )}

      <ul className={`${previousName ? "mt-3" : "mt-8"} space-y-3 flex-1`}>
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-foreground/70"
          >
            <svg
              className="w-5 h-5 text-primary flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={`/get-started?plan=${plan.id}&cadence=${cadence}`}
        className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
          plan.popular
            ? "bg-accent text-white hover:bg-accent-dark shadow-md shadow-accent/25"
            : "bg-primary/10 text-primary-dark hover:bg-primary/20"
        }`}
      >
        Get Started
      </Link>
    </div>
  );
}
