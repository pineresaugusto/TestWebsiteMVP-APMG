/**
 * Plan tiers + bundle pricing.
 *
 * New pricing model (Iter 10):
 *   - Three tiers differ ONLY in software/AI features. Medication,
 *     provider visits, supplies, and shipping are identical across
 *     all three. This avoids dose-tied tiering, which would force a
 *     coupling between billing and clinical decisions and create
 *     real friction with the provider network.
 *   - Monthly prices: Start $159 / Accelerate $179 / Transform $199.
 *   - Bundle-and-save: pay 3, 6, or 12 months upfront. Each step
 *     compounds an additional 10% off the previous step's per-month
 *     rate. Per-month display is rounded UP to the next $X9 charm
 *     price, then the total is just (perMonth × months). The
 *     rounded display means real savings land closer to ~6%/step
 *     than a true 10%/step — accepted trade-off for clean numbers.
 *     Confirmed with the user on 2026-04-27 ("Pricing is not
 *     finalized and this is the best option so far").
 */

export type PlanTier = "start" | "accelerate" | "transform";

export type BundleCadence = 1 | 3 | 6 | 12;

export type Plan = {
  id: PlanTier;
  name: string;
  /** One-line marketing summary shown under the name. */
  tagline: string;
  /** Monthly price (USD whole dollars). Source of truth for all bundle math. */
  price: number;
  /** Whether this is the highlighted "most popular" tier. */
  popular: boolean;
  /**
   * Card body framing. Either an "Everything in <previousTier>, plus..."
   * card (for Accelerate / Transform) or null (for Start).
   * The display layer renders the previous-tier reference so the upgrade
   * story is implicit without showing the full feature matrix on screen.
   */
  builtsOn: PlanTier | null;
  /**
   * Feature bullets shown on the card. For tiers that build on a previous
   * one, only the *added* features go here — the "Everything in <X>"
   * line is rendered automatically above this list.
   */
  features: string[];
};

const sharedFoundationFeatures = [
  "Compounded semaglutide medication",
  "Provider consultations & ongoing visits",
  "Injection supplies & free shipping",
  "Direct messaging with your care team",
  "Cancel anytime",
];

export const PLANS: Record<PlanTier, Plan> = {
  start: {
    id: "start",
    name: "Start",
    tagline: "Your medication, your provider, the basics — done well.",
    price: 159,
    popular: false,
    builtsOn: null,
    features: sharedFoundationFeatures,
  },
  accelerate: {
    id: "accelerate",
    name: "Accelerate",
    tagline: "More guidance between visits.",
    price: 179,
    popular: true,
    builtsOn: "start",
    features: [
      "24/7 AI health companion (questions between visits)",
      "Personalized AI-built nutrition plan",
      "Recipe library + grocery prompts",
    ],
  },
  transform: {
    id: "transform",
    name: "Transform",
    tagline: "Our most hands-on plan, for long-term care.",
    price: 199,
    popular: false,
    builtsOn: "accelerate",
    features: [
      "Personalized AI-built fitness & movement plan",
      "Progress dashboard with trend tracking",
      "Priority care-team response times",
    ],
  },
};

export const PLAN_LIST: Plan[] = [PLANS.start, PLANS.accelerate, PLANS.transform];

/**
 * Round UP to the next price ending in 9 — the user's literal rule.
 *   roundUpToCharm(143.10) === 149
 *   roundUpToCharm(159.00) === 159  (already X9)
 *   roundUpToCharm(159.01) === 169  (just past, so step UP)
 *   roundUpToCharm(115.91) === 119
 */
export function roundUpToCharm(value: number): number {
  // The next-higher integer ending in 9 ≥ ceil(value).
  const ceil = Math.ceil(value);
  // If ceil already ends in 9, return it. Otherwise step up to the next 9-ending.
  const remainder = ((ceil - 9) % 10 + 10) % 10;
  return remainder === 0 ? ceil : ceil + (10 - remainder);
}

/**
 * Compute the per-month and total prices for a plan + cadence.
 *
 * Math (compounding 10% per step):
 *   - 1mo  = full monthly
 *   - 3mo  = 1mo × 0.9
 *   - 6mo  = 3mo × 0.9
 *   - 12mo = 6mo × 0.9
 *
 * Per-month display is then `roundUpToCharm` of the discounted rate.
 * The displayed total is `perMonth * months` (matches what we charge
 * — no separate hidden "raw" total to confuse the visitor).
 */
export function priceForCadence(
  plan: Plan,
  cadence: BundleCadence,
): {
  perMonth: number;
  total: number;
  months: BundleCadence;
  /** The 1-month rate, always returned so the UI can render a strike-through baseline. */
  baselinePerMonth: number;
  /**
   * Annualized savings vs the 1-month rate.
   *   = (baseline - perMonth) * 12
   * Zero when cadence === 1.
   */
  annualSavings: number;
} {
  const steps: Record<BundleCadence, number> = { 1: 0, 3: 1, 6: 2, 12: 3 };
  const stepCount = steps[cadence];
  const discounted = plan.price * Math.pow(0.9, stepCount);
  const perMonth = stepCount === 0 ? plan.price : roundUpToCharm(discounted);
  return {
    perMonth,
    total: perMonth * cadence,
    months: cadence,
    baselinePerMonth: plan.price,
    annualSavings: (plan.price - perMonth) * 12,
  };
}

/** Cadences in display order. */
export const BUNDLE_CADENCES: BundleCadence[] = [1, 3, 6, 12];

export function cadenceLabel(c: BundleCadence): string {
  return c === 1 ? "Pay monthly" : `${c} months`;
}

export function cadenceShortLabel(c: BundleCadence): string {
  return c === 1 ? "Monthly" : `${c} mo`;
}

/** Validate a string from a query param. Returns 1 if invalid. */
export function parseCadence(raw: string | null | undefined): BundleCadence {
  const n = Number(raw);
  if (n === 1 || n === 3 || n === 6 || n === 12) return n;
  return 1;
}
