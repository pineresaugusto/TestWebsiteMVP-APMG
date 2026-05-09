"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BUNDLE_CADENCES,
  cadenceShortLabel,
  parseCadence,
  PLAN_LIST,
  PLANS,
  priceForCadence,
  type BundleCadence,
  type PlanTier,
} from "@/lib/plans";
import { set, useDemoState, useInitialQueryParam } from "@/lib/demoState";

function isPlanTier(value: string | null | undefined): value is PlanTier {
  return value === "start" || value === "accelerate" || value === "transform";
}

export default function SelectPlanPage() {
  const router = useRouter();
  const demo = useDemoState();
  const fromQuiz = demo.quiz.completed && demo.quiz.eligible;

  // Initial selection: query param (from /pricing PricingCard deep-link) →
  // demoState (returning visitor) → quiz recommendation. Query params win
  // because they're the most recent expression of intent.
  const planParam = useInitialQueryParam("plan");
  const cadenceParam = useInitialQueryParam("cadence");
  const initialTier: PlanTier | null = isPlanTier(planParam)
    ? planParam
    : demo.plan?.tier ?? demo.quiz.recommendedPlan ?? null;
  const initialCadence: BundleCadence = cadenceParam
    ? parseCadence(cadenceParam)
    : demo.plan?.cadence ?? 1;

  const [selected, setSelected] = useState<PlanTier | null>(initialTier);
  const [cadence, setCadence] = useState<BundleCadence>(initialCadence);

  const onContinue = () => {
    if (!selected) return;
    set({ plan: { tier: selected, cadence } });
    router.push("/app/checkout");
  };

  const selectedPlan = selected ? PLANS[selected] : null;
  const selectedQuote = selectedPlan ? priceForCadence(selectedPlan, cadence) : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-8 md:py-16">
      <h1 className="text-center font-display text-3xl font-medium text-foreground md:text-4xl">
        Choose your plan
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground/55 md:text-base">
        {fromQuiz ? (
          <>
            Based on your answers, we recommend{" "}
            <strong className="font-semibold text-primary-dark">Accelerate</strong>.
            You can change this anytime.
          </>
        ) : (
          <>Not sure? Just pick the most affordable one — you can change later.</>
        )}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PLAN_LIST.map((plan) => {
          const isSelected = selected === plan.id;
          const showRecommended = plan.popular && fromQuiz;
          const { perMonth, baselinePerMonth, annualSavings } = priceForCadence(
            plan,
            cadence,
          );
          const isBundled = cadence > 1;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelected(plan.id)}
              className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                isSelected
                  ? "border-primary ring-4 ring-primary/15"
                  : "border-secondary/60"
              }`}
            >
              {showRecommended && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Recommended for you
                </span>
              )}
              <span
                className={`mb-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-secondary bg-white"
                }`}
                aria-hidden
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              <div className="text-xl font-bold text-foreground">{plan.name}</div>
              <div className="mt-1 text-sm text-foreground/50">{plan.tagline}</div>
              <div className="mt-4 flex items-baseline gap-2">
                {isBundled && (
                  <span
                    className="font-display text-lg font-medium tabular-nums text-foreground/35 line-through decoration-[1.5px] decoration-foreground/40"
                    aria-label={`Regular monthly price ${baselinePerMonth} dollars`}
                  >
                    ${baselinePerMonth}
                  </span>
                )}
                <div className="font-display text-4xl font-semibold tabular-nums text-foreground">
                  ${perMonth}
                  <span className="ml-1 text-base font-medium text-foreground/45">
                    /mo
                  </span>
                </div>
              </div>
              {isBundled && (
                <div className="mt-1 text-[11.5px] font-medium text-primary-dark tabular-nums">
                  Save ${annualSavings.toLocaleString()}/year vs monthly
                </div>
              )}
              {plan.builtsOn && (
                <div className="mt-3 text-xs font-medium text-foreground/65">
                  Everything in {PLANS[plan.builtsOn].name}, plus:
                </div>
              )}
              <ul className="mt-3 flex-1 space-y-2 text-sm text-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                      aria-hidden
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Bundle-and-save row — single shared selector below the cards so the
          three plan prices update in lockstep. Subtle by design (per Iter 10
          direction): a quiet pill group, not a hero badge. */}
      <div className="mt-8 flex flex-col items-center gap-2 rounded-2xl border border-secondary/40 bg-secondary-light/40 px-6 py-5 text-center md:flex-row md:justify-between md:text-left">
        <div className="text-sm">
          <div className="font-semibold text-foreground">Bundle &amp; save</div>
          <div className="text-foreground/55">
            Pay for several months upfront for a lower monthly price.
          </div>
        </div>
        <div
          role="group"
          aria-label="Choose billing cadence"
          className="inline-flex flex-wrap items-center gap-1 rounded-full bg-white p-1 shadow-sm"
        >
          {BUNDLE_CADENCES.map((c) => {
            const active = c === cadence;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCadence(c)}
                aria-pressed={active}
                className={`rounded-full px-3 py-1 text-xs font-medium tabular-nums transition-colors ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {cadenceShortLabel(c)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-secondary/60 bg-white p-5 shadow-sm md:flex-row md:px-7 md:py-5">
        <div className="text-sm font-semibold text-foreground">
          {selectedPlan && selectedQuote ? (
            <>
              Selected:{" "}
              <span className="text-primary-dark">
                {selectedPlan.name} — ${selectedQuote.perMonth}/mo
              </span>
              {cadence > 1 && (
                <span className="ml-1 font-medium text-foreground/55">
                  · billed ${selectedQuote.total.toLocaleString()} every {cadence} months
                </span>
              )}
            </>
          ) : (
            <span className="font-medium text-foreground/45">
              Select a plan to continue
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onContinue}
          disabled={!selectedPlan}
          className="w-full rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-56"
        >
          Continue to checkout
        </button>
      </div>
      <p className="mt-5 text-center text-xs text-foreground/40">
        Pricing shown is illustrative. Cancel anytime. No insurance required. No hidden fees.{" "}
        <Link href="/medical-disclaimer" className="text-primary-dark hover:underline">
          Medical disclaimer
        </Link>
      </p>
    </div>
  );
}
