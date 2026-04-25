export type PlanTier = "start" | "accelerate" | "transform";

export type Plan = {
  id: PlanTier;
  name: string;
  tagline: string;
  price: number;
  dose: string;
  popular: boolean;
  features: string[];
};

export const PLANS: Record<PlanTier, Plan> = {
  start: {
    id: "start",
    name: "Start",
    tagline: "Begin your journey with guided support",
    price: 199,
    dose: "Semaglutide 0.25 – 0.5 mg/week",
    popular: false,
    features: [
      "Compounded semaglutide medication",
      "Initial provider consultation",
      "Monthly provider check-in",
      "Injection supplies included",
      "Free standard shipping",
      "Direct messaging with care team",
      "Cancel anytime",
    ],
  },
  accelerate: {
    id: "accelerate",
    name: "Accelerate",
    tagline: "More frequent support as your plan builds",
    price: 299,
    dose: "Semaglutide 1.0 – 1.7 mg/week",
    popular: true,
    features: [
      "Compounded semaglutide medication",
      "Initial provider consultation",
      "Bi-weekly provider check-ins",
      "Injection supplies included",
      "Free standard shipping",
      "Personalized nutrition guide",
      "Direct messaging with care team",
      "Cancel anytime",
    ],
  },
  transform: {
    id: "transform",
    name: "Transform",
    tagline: "Our most hands-on plan, for long-term care",
    price: 399,
    dose: "Semaglutide 2.0 – 2.4 mg/week",
    popular: false,
    features: [
      "Compounded semaglutide medication",
      "Initial provider consultation",
      "Weekly provider access",
      "Injection supplies included",
      "Priority shipping",
      "Personalized nutrition & fitness plan",
      "Direct messaging with care team",
      "Progress tracking dashboard",
      "Cancel anytime",
    ],
  },
};

export const PLAN_LIST: Plan[] = [PLANS.start, PLANS.accelerate, PLANS.transform];
