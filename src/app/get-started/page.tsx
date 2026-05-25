"use client";

/**
 * /get-started — Nuvela's multi-program assessment.
 *
 * Iter 13 reshape: the quiz used to be a 7-step weight-loss-only flow.
 * It now leads with a CATEGORY CHOOSER (Weight management · Vitality ·
 * Sexual & intimacy · Not sure) and branches into a short
 * category-specific assessment.
 *
 *   chooser  →  (optional triage for "not sure")  →  branch steps  →  review
 *
 * Each branch shares a "Basics" step (age + sex + state) and a
 * "Medications" step. Conditions and category-specific questions vary
 * by branch. Weight management keeps the full original flow because
 * (a) it's the primary marketing focus, (b) BMI gating is genuine
 * eligibility, (c) most visitors hit this branch.
 *
 * DemoState contract: writes `quiz.category` alongside the existing
 * `completed / eligible / recommendedPlan / contraindicationReason`
 * fields. `category` is optional on the schema for backward-compat with
 * iter-A/B/C snapshots that predate Iter 13.
 *
 * Recommendation logic:
 *   - Weight branch: BMI-tiered (existing) — BMI ≥ 40 → Transform,
 *     ≥ 35 → Accelerate, else Start.
 *   - Vitality / Sexual: default to Accelerate (the popular tier). Tiers
 *     are differentiated by software/AI features, not medication, so
 *     the recommendation is "where most patients start" rather than
 *     a clinical claim.
 */

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { get, set, isProgramLive, LIVE_PROGRAMS, type QuizCategory } from "@/lib/demoState";

// Static derived list — used to drive "if only one program is live,
// skip the triage and route straight there" logic in the chooser.
const LIVE_PROGRAMS_LIST: QuizCategory[] = (["weight", "vitality", "sexual"] as const).filter((c) =>
  LIVE_PROGRAMS.has(c),
);
import type { PlanTier } from "@/lib/plans";

// "not-sure" is a chooser option but never persists as a category —
// the triage step resolves it to one of the real three before any
// branch steps render.
type ChooserChoice = QuizCategory | "not-sure";

const AVAILABLE_STATES = [
  "Arizona", "California", "Colorado", "Florida", "Georgia", "Illinois",
  "Indiana", "Maryland", "Michigan", "Minnesota", "Nevada", "New Jersey",
  "New York", "North Carolina", "Ohio", "Pennsylvania", "Tennessee",
  "Texas", "Virginia", "Washington",
];

// Per-branch condition lists. The shared list is the union; each branch
// only displays the conditions clinically relevant to its program.
const CONDITIONS_WEIGHT = [
  "Type 2 diabetes",
  "Heart disease or heart failure",
  "Thyroid disorder",
  "Kidney disease",
  "Pancreatitis (current or history)",
  "Eating disorder (current or history)",
  "Medullary thyroid carcinoma (personal or family history)",
  "Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)",
];

const CONDITIONS_VITALITY = [
  "Type 2 diabetes",
  "Heart disease or heart failure",
  "Active or recent cancer (within the last 5 years)",
  "Thyroid disorder",
  "Kidney or liver disease",
];

const CONDITIONS_SEXUAL = [
  "High blood pressure (uncontrolled)",
  "Heart disease or heart failure",
  "History of stroke or TIA",
  "Liver or kidney disease",
  "Cardiovascular event in the past 6 months",
];

// Disqualifying flags vary by program — these are checked at submit time
// to route the user to the "not the right fit" screen.
const DISQUALIFYING_WEIGHT = [
  "Pancreatitis (current or history)",
  "Medullary thyroid carcinoma (personal or family history)",
  "Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)",
];

const DISQUALIFYING_VITALITY = [
  "Active or recent cancer (within the last 5 years)",
];

const DISQUALIFYING_SEXUAL = [
  "Cardiovascular event in the past 6 months",
];

const MEDICATIONS = [
  "Insulin",
  "Metformin",
  "Blood pressure medications",
  "Antidepressants / anti-anxiety",
  "Thyroid medications",
  "Blood thinners",
];

const PREVIOUS_ATTEMPTS = [
  "Calorie-restricted dieting",
  "Exercise programs",
  "Commercial weight loss programs (WW, Noom, etc.)",
  "Over-the-counter supplements",
  "Prescription weight loss medication",
  "Bariatric surgery",
];

const MOTIVATIONS = [
  "Improve overall health",
  "Boost confidence and self-image",
  "Increase mobility and energy",
  "Doctor recommended weight loss",
  "Reduce or prevent health conditions",
  "Improve quality of life",
];

// Vitality-branch goal options — what the visitor is mainly looking to
// improve. Sermorelin's clinical effects cluster across these areas, so
// the answer informs the provider's protocol rather than gating
// eligibility.
const VITALITY_GOALS = [
  "Sleep quality",
  "Daytime energy",
  "Recovery from training or stress",
  "Lean body composition",
  "A bit of everything",
];

const ACTIVITY_LEVELS = [
  "Sedentary (desk-based, little exercise)",
  "Lightly active (walks, light workouts a few times a week)",
  "Moderately active (regular gym / training)",
  "Very active (intense training most days)",
];

// Sexual-branch concern categorization. PT-141 is approved for hypoactive
// sexual desire disorder; on-label vs off-label differs by sex.
const SEXUAL_CONCERNS = [
  "Low desire / interest",
  "Performance / function",
  "Both",
];

const PARTNERED_STATUS = [
  "Partnered",
  "Single",
  "Prefer not to say",
];

// Conditions chosen by the visitor are stored as string arrays so the
// same `medicalConditions` field can hold the (different) sets shown to
// each branch. The list shown to the user is filtered by branch.
type FormData = {
  age: string;
  sex: string;
  state: string;
  // Weight branch
  weightLbs: string;
  heightFt: string;
  heightIn: string;
  targetWeightLbs: string;
  motivations: string[];
  previousAttempts: string[];
  previousAttemptsTimeframe: string;
  // Vitality branch
  vitalityGoals: string[];
  activityLevel: string;
  // Sexual branch
  sexualConcern: string;
  partneredStatus: string;
  // Shared
  medicalConditions: string[];
  medications: string[];
  otherMedications: string;
};

function calculateBMI(weightLbs: string, heightFt: string, heightIn: string): number | null {
  const w = parseFloat(weightLbs);
  const ft = parseInt(heightFt);
  const inches = parseInt(heightIn) || 0;
  if (!w || !ft) return null;
  const totalInches = ft * 12 + inches;
  return (w / (totalInches * totalInches)) * 703;
}

/**
 * Per-branch eligibility. Returns "eligible" or "not_eligible" plus the
 * reason string for the not-eligible screen (interpolated as
 * "may not be the right fit because <reason>"). Age < 18 is universal.
 */
function checkEligibility(
  category: QuizCategory,
  data: FormData,
  bmi: number | null,
): { ok: boolean; reason?: string } {
  const age = parseInt(data.age);
  if (Number.isFinite(age) && age < 18) {
    return { ok: false, reason: "you must be 18 or older to use Nuvela" };
  }
  const conditions = data.medicalConditions ?? [];
  if (category === "weight") {
    if (bmi !== null && bmi < 27) {
      return { ok: false, reason: "your BMI is below the threshold typically used for GLP-1 weight-loss treatment" };
    }
    const hit = conditions.find((c) => DISQUALIFYING_WEIGHT.includes(c));
    if (hit) return { ok: false, reason: hit.toLowerCase() };
  }
  if (category === "vitality") {
    const hit = conditions.find((c) => DISQUALIFYING_VITALITY.includes(c));
    if (hit) return { ok: false, reason: hit.toLowerCase() };
  }
  if (category === "sexual") {
    const hit = conditions.find((c) => DISQUALIFYING_SEXUAL.includes(c));
    if (hit) return { ok: false, reason: hit.toLowerCase() };
  }
  return { ok: true };
}

/**
 * Plan recommendation:
 *   - Weight: BMI-tiered (preserves existing logic).
 *   - Vitality / Sexual: default to "accelerate". Tiers differ by
 *     software features (24/7 chat, plan builders, priority response),
 *     not by medication, so the recommendation is "where most patients
 *     start" — visitors can always change at the plan-picker.
 */
function getRecommendedTier(category: QuizCategory, bmi: number | null): PlanTier {
  if (category === "weight") {
    if (bmi !== null && bmi >= 40) return "transform";
    if (bmi !== null && bmi >= 35) return "accelerate";
    return "start";
  }
  return "accelerate";
}

// Per-branch step keys. The chooser is rendered separately (not counted
// in TOTAL_STEPS for the branch). Step counter starts at 1 inside the
// branch.
const STEPS_BY_CATEGORY: Record<QuizCategory, readonly string[]> = {
  weight: ["basics", "body", "goals", "conditions", "meds", "previous", "review"],
  vitality: ["basics", "vitality-goals", "conditions", "meds", "review"],
  sexual: ["basics", "sexual-concern", "conditions", "meds", "review"],
};

const CATEGORY_LABEL: Record<QuizCategory, string> = {
  weight: "Weight management",
  vitality: "Vitality",
  sexual: "Sexual & intimacy",
};

export default function GetStarted() {
  const router = useRouter();

  // null = chooser screen. "not-sure" = triage screen. After triage
  // resolves, this becomes a real QuizCategory and step jumps to 1.
  const [choice, setChoice] = useState<ChooserChoice | null>(null);
  const [step, setStep] = useState(1);
  const [submittedNotEligible, setSubmittedNotEligible] = useState<string | null>(null);

  const { register, watch, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      motivations: [],
      medicalConditions: [],
      medications: [],
      previousAttempts: [],
      vitalityGoals: [],
      otherMedications: "",
    },
  });

  const watchAll = watch();
  const bmi = calculateBMI(watchAll.weightLbs, watchAll.heightFt, watchAll.heightIn);

  // Active branch — only meaningful when `choice` is one of the real
  // categories (not null and not "not-sure").
  const category: QuizCategory | null =
    choice === null || choice === "not-sure" ? null : choice;
  const branchSteps = category ? STEPS_BY_CATEGORY[category] : [];
  const totalSteps = branchSteps.length;
  const currentKey = branchSteps[step - 1];

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const goToStep = (s: number) => setStep(s);

  const onChooseCategory = (c: ChooserChoice) => {
    // Iter 13.5: while only weight management is live, "not sure"
    // skips the triage and routes the visitor straight into the
    // weight-management assessment. The triage component is still
    // mounted in source — it'll re-engage once a second program
    // ships and `LIVE_PROGRAMS` includes more than one entry.
    if (c === "not-sure" && LIVE_PROGRAMS_LIST.length === 1) {
      setChoice(LIVE_PROGRAMS_LIST[0]);
      setStep(1);
      return;
    }
    setChoice(c);
    setStep(1);
  };

  const onTriageResolve = (c: QuizCategory) => {
    setChoice(c);
    setStep(1);
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const current = (getValues(field) as string[]) || [];
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value) as never);
    } else {
      setValue(field, [...current, value] as never);
    }
  };

  const onSubmit = () => {
    if (!category) return;
    const result = checkEligibility(category, watchAll, bmi);
    if (result.ok) {
      const tier = getRecommendedTier(category, bmi);
      set({
        quiz: {
          completed: true,
          eligible: true,
          recommendedPlan: tier,
          category,
        },
      });
      const hasAccount = !!get().user;
      router.push(hasAccount ? "/app/select-plan" : "/app/signup?from=quiz");
      return;
    }
    set({
      quiz: {
        completed: true,
        eligible: false,
        recommendedPlan: null,
        contraindicationReason: result.reason,
        category,
      },
    });
    setSubmittedNotEligible(result.reason ?? null);
  };

  // ---------- Not-eligible terminal screen ----------
  if (submittedNotEligible !== null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary-light flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <h1 className="font-display text-[1.75rem] md:text-3xl leading-tight text-foreground">
            This path may not be the right fit for you right now
          </h1>
          <p className="mt-5 text-foreground/70 leading-relaxed">
            Based on what you shared, {category && CATEGORY_LABEL[category].toLowerCase()} through
            Nuvela may not be the best option at the moment. That&apos;s not a judgment — just a
            careful first pass. A conversation with your primary care provider is a great next
            step, and they can help you find the right direction.
          </p>
          <p className="mt-4 text-sm text-foreground/50">
            This assessment is not a medical diagnosis, and things can change over time. You&apos;re
            welcome to come back.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/how-it-works"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Learn more about Nuvela
            </Link>
            <button
              onClick={() => {
                setSubmittedNotEligible(null);
                setChoice(null);
                setStep(1);
              }}
              className="rounded-full border-2 border-secondary px-8 py-3 text-sm font-semibold text-foreground/70 hover:bg-secondary-light transition-colors"
            >
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Category chooser (entry screen) ----------
  if (choice === null) {
    return <CategoryChooser onPick={onChooseCategory} />;
  }

  // ---------- "Not sure" triage ----------
  if (choice === "not-sure") {
    return <NotSureTriage onResolve={onTriageResolve} onBack={() => setChoice(null)} />;
  }

  // ---------- Branch step renderer ----------
  return (
    <div className="min-h-[80vh] py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        {/* Program chip + progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-foreground/40 mb-2">
            <span className="inline-flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setChoice(null); setStep(1); }}
                className="text-primary-dark font-semibold hover:underline"
              >
                ← Change program
              </button>
              <span className="rounded-full bg-secondary-light px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-foreground/60">
                {category && CATEGORY_LABEL[category]}
              </span>
            </span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="h-2 bg-secondary-light rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ============ Shared: Basics ============ */}
          {currentKey === "basics" && (
            <StepWrapper
              title="Let's start with the basics"
              subtitle="Under 2 minutes, in plain language. Nothing is submitted until the final step — you can go back or stop at any point."
            >
              <div className="mb-6 text-right">
                <Link
                  href="/app/signup?skipped=quiz"
                  className="text-xs font-medium text-primary-dark underline-offset-4 hover:underline"
                >
                  Skip the assessment →
                </Link>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Age</label>
                  <input
                    type="number"
                    {...register("age")}
                    placeholder="Enter your age"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Biological sex</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Male", "Female"].map((s) => (
                      <label
                        key={s}
                        className={`flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium cursor-pointer transition-colors ${
                          watchAll.sex === s
                            ? "border-primary bg-primary/5 text-primary-dark"
                            : "border-secondary/60 text-foreground/60 hover:border-primary/40"
                        }`}
                      >
                        <input type="radio" value={s} {...register("sex")} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">State of residence</label>
                  <select
                    {...register("state")}
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    <option value="">Select your state</option>
                    {AVAILABLE_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ============ Weight: Body Metrics ============ */}
          {currentKey === "body" && (
            <StepWrapper title="Your body metrics" subtitle="We use this to calculate your BMI and assess eligibility.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Current weight (lbs)</label>
                  <input
                    type="number"
                    {...register("weightLbs")}
                    placeholder="e.g., 210"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Height</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="number"
                        {...register("heightFt")}
                        placeholder="Feet"
                        className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/40">ft</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        {...register("heightIn")}
                        placeholder="Inches"
                        className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/40">in</span>
                    </div>
                  </div>
                </div>
                {bmi && (
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm text-foreground/70">
                      Your estimated BMI: <strong className="text-foreground">{bmi.toFixed(1)}</strong>
                      {bmi < 27 && (
                        <span className="block mt-1 text-xs text-foreground/50">
                          GLP-1 treatment is generally recommended for BMI 27+ with comorbidities or BMI 30+.
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </StepWrapper>
          )}

          {/* ============ Weight: Goals ============ */}
          {currentKey === "goals" && (
            <StepWrapper title="Your weight loss goals" subtitle="Understanding your goals helps your provider create a personalized treatment plan.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Target weight (lbs)</label>
                  <input
                    type="number"
                    {...register("targetWeightLbs")}
                    placeholder="e.g., 170"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">What motivates you? (select all that apply)</label>
                  <CheckboxGrid
                    options={MOTIVATIONS}
                    selected={watchAll.motivations}
                    onToggle={(v) => toggleArrayField("motivations", v)}
                    columns={2}
                  />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ============ Weight: Previous Attempts ============ */}
          {currentKey === "previous" && (
            <StepWrapper title="Previous weight loss attempts" subtitle="Understanding what you've tried helps your provider tailor the best approach for you.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    What have you tried before? (select all that apply)
                  </label>
                  <CheckboxGrid
                    options={PREVIOUS_ATTEMPTS}
                    selected={watchAll.previousAttempts}
                    onToggle={(v) => toggleArrayField("previousAttempts", v)}
                    columns={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    When was your most recent attempt?
                  </label>
                  <select
                    {...register("previousAttemptsTimeframe")}
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    <option value="">Select timeframe</option>
                    <option value="currently">Currently trying</option>
                    <option value="6months">Within the last 6 months</option>
                    <option value="1year">6 months to 1 year ago</option>
                    <option value="2years">1 to 2 years ago</option>
                    <option value="more">More than 2 years ago</option>
                    <option value="never">I haven&apos;t tried before</option>
                  </select>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ============ Vitality: Goals + Activity ============ */}
          {currentKey === "vitality-goals" && (
            <StepWrapper title="What are you working on?" subtitle="Pick what's most on your mind. Your provider will use this to focus the consultation.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Top areas (select all that apply)
                  </label>
                  <CheckboxGrid
                    options={VITALITY_GOALS}
                    selected={watchAll.vitalityGoals}
                    onToggle={(v) => toggleArrayField("vitalityGoals", v)}
                    columns={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Activity level</label>
                  <RadioStack
                    name="activityLevel"
                    options={ACTIVITY_LEVELS}
                    selected={watchAll.activityLevel}
                    register={register}
                  />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ============ Sexual: Concern + Partnered Status ============ */}
          {currentKey === "sexual-concern" && (
            <StepWrapper
              title="What brings you here?"
              subtitle="Answers stay private and are only shared with the licensed clinician reviewing your assessment."
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Primary concern</label>
                  <RadioStack
                    name="sexualConcern"
                    options={SEXUAL_CONCERNS}
                    selected={watchAll.sexualConcern}
                    register={register}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Relationship status</label>
                  <RadioStack
                    name="partneredStatus"
                    options={PARTNERED_STATUS}
                    selected={watchAll.partneredStatus}
                    register={register}
                  />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ============ Shared: Conditions (filtered by branch) ============ */}
          {currentKey === "conditions" && (
            <StepWrapper
              title="Your medical history"
              subtitle="Honest answers keep you safe. Your provider will use this to make the right recommendation for you."
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Do you have any of the following conditions? (select all that apply)
                </label>
                <ConditionsList
                  category={category!}
                  selected={watchAll.medicalConditions}
                  onToggle={(v) => toggleArrayField("medicalConditions", v)}
                />
                <p className="mt-3 text-xs text-foreground/40">
                  If none apply, simply proceed to the next step.
                </p>
              </div>
            </StepWrapper>
          )}

          {/* ============ Shared: Medications ============ */}
          {currentKey === "meds" && (
            <StepWrapper title="Current medications" subtitle="Let us know what you're currently taking so your provider can check for interactions.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Are you currently taking any of these? (select all that apply)
                  </label>
                  <CheckboxGrid
                    options={MEDICATIONS}
                    selected={watchAll.medications}
                    onToggle={(v) => toggleArrayField("medications", v)}
                    columns={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Any other medications or supplements?
                  </label>
                  <textarea
                    {...register("otherMedications")}
                    rows={3}
                    placeholder="List any other medications, vitamins, or supplements you take regularly..."
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  />
                </div>
              </div>
            </StepWrapper>
          )}

          {/* ============ Shared: Review ============ */}
          {currentKey === "review" && category && (
            <StepWrapper title="Review your responses" subtitle="Please verify your information is accurate. You can go back to edit any section.">
              <div className="space-y-4">
                <ReviewSection
                  title="Program"
                  step={null}
                  onEdit={() => { setChoice(null); setStep(1); }}
                  items={[{ label: "Program", value: CATEGORY_LABEL[category] }]}
                  editLabel="Change"
                />
                <ReviewSection
                  title="Basics"
                  step={stepIndex(category, "basics")}
                  onEdit={goToStep}
                  items={[
                    { label: "Age", value: watchAll.age || "—" },
                    { label: "Sex", value: watchAll.sex || "—" },
                    { label: "State", value: watchAll.state || "—" },
                  ]}
                />
                {category === "weight" && (
                  <>
                    <ReviewSection
                      title="Body Metrics"
                      step={stepIndex(category, "body")}
                      onEdit={goToStep}
                      items={[
                        { label: "Weight", value: watchAll.weightLbs ? `${watchAll.weightLbs} lbs` : "—" },
                        { label: "Height", value: watchAll.heightFt ? `${watchAll.heightFt}'${watchAll.heightIn || 0}"` : "—" },
                        { label: "BMI", value: bmi ? bmi.toFixed(1) : "—" },
                      ]}
                    />
                    <ReviewSection
                      title="Goals"
                      step={stepIndex(category, "goals")}
                      onEdit={goToStep}
                      items={[
                        { label: "Target weight", value: watchAll.targetWeightLbs ? `${watchAll.targetWeightLbs} lbs` : "—" },
                        { label: "Motivations", value: watchAll.motivations?.join(", ") || "None selected" },
                      ]}
                    />
                  </>
                )}
                {category === "vitality" && (
                  <ReviewSection
                    title="Focus"
                    step={stepIndex(category, "vitality-goals")}
                    onEdit={goToStep}
                    items={[
                      { label: "Top areas", value: watchAll.vitalityGoals?.join(", ") || "None selected" },
                      { label: "Activity level", value: watchAll.activityLevel || "—" },
                    ]}
                  />
                )}
                {category === "sexual" && (
                  <ReviewSection
                    title="Concern"
                    step={stepIndex(category, "sexual-concern")}
                    onEdit={goToStep}
                    items={[
                      { label: "Primary concern", value: watchAll.sexualConcern || "—" },
                      { label: "Status", value: watchAll.partneredStatus || "—" },
                    ]}
                  />
                )}
                <ReviewSection
                  title="Medical History"
                  step={stepIndex(category, "conditions")}
                  onEdit={goToStep}
                  items={[{ label: "Conditions", value: watchAll.medicalConditions?.length ? watchAll.medicalConditions.join(", ") : "None" }]}
                />
                <ReviewSection
                  title="Medications"
                  step={stepIndex(category, "meds")}
                  onEdit={goToStep}
                  items={[
                    { label: "Current medications", value: watchAll.medications?.length ? watchAll.medications.join(", ") : "None" },
                    { label: "Other", value: watchAll.otherMedications || "None" },
                  ]}
                />
                {category === "weight" && (
                  <ReviewSection
                    title="Previous Attempts"
                    step={stepIndex(category, "previous")}
                    onEdit={goToStep}
                    items={[
                      { label: "Methods tried", value: watchAll.previousAttempts?.length ? watchAll.previousAttempts.join(", ") : "None" },
                      { label: "Most recent", value: watchAll.previousAttemptsTimeframe || "—" },
                    ]}
                  />
                )}
              </div>
            </StepWrapper>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prev}
                className="rounded-full border-2 border-secondary px-6 py-2.5 text-sm font-semibold text-foreground/60 hover:bg-secondary-light transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-foreground/30">
          Your responses are confidential and not stored. This assessment is for demonstration
          purposes only and does not constitute medical advice.
        </p>
      </div>
    </div>
  );
}

function stepIndex(category: QuizCategory, key: string): number {
  return STEPS_BY_CATEGORY[category].indexOf(key) + 1;
}

// =====================================================================
// Category chooser — the entry screen for the assessment.
// =====================================================================

function CategoryChooser({ onPick }: { onPick: (c: ChooserChoice) => void }) {
  // Programs that aren't in LIVE_PROGRAMS render in a muted "preview"
  // state with a Coming Soon pill. Code paths for them still exist
  // (per Iter 13.5: stored, not shown) — the chooser just won't
  // dispatch onPick when a non-live card is clicked.
  const cards: Array<{
    id: ChooserChoice;
    label: string;
    helper: string;
    featured?: boolean;
  }> = [
    {
      id: "weight",
      label: "Weight management",
      helper: "GLP-1 treatment (semaglutide / tirzepatide). Where most patients start.",
      featured: true,
    },
    {
      id: "vitality",
      label: "Vitality",
      helper: "Sleep, energy, recovery, lean body composition — supported by GHRH analog therapy.",
    },
    {
      id: "sexual",
      label: "Sexual & intimacy",
      helper: "For desire and function concerns. Doctor-prescribed options.",
    },
    {
      id: "not-sure",
      label: "I'm not sure yet",
      helper:
        LIVE_PROGRAMS_LIST.length === 1
          ? "Start with our weight-management assessment — we'll get you to the right care."
          : "We'll ask a few quick questions and recommend a program to start with.",
    },
  ];

  return (
    <div className="min-h-[80vh] py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
            Free 2-minute assessment
          </p>
          <h1 className="mt-4 font-display text-[2rem] md:text-[2.5rem] leading-tight text-foreground">
            What brings you to Nuvela?
          </h1>
          <p className="mt-3 text-foreground/60">
            Pick the program you&rsquo;d like to be assessed for. Weight management is where most
            people start — the other programs use the same providers, pharmacy partners, and plans.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {cards.map((c) => {
            const isCategory = c.id !== "not-sure";
            const live = !isCategory || isProgramLive(c.id as QuizCategory);
            return (
              <button
                key={c.id}
                type="button"
                disabled={!live}
                onClick={() => live && onPick(c.id)}
                aria-disabled={!live || undefined}
                className={`group relative block w-full rounded-2xl border bg-white p-5 text-left transition-all ${
                  !live
                    ? "cursor-not-allowed border-secondary/40 bg-secondary-light/30"
                    : c.featured
                    ? "border-primary/30 ring-1 ring-primary/15 shadow-sm hover:-translate-y-[1px] hover:shadow-md"
                    : "border-secondary/60 hover:border-primary/40 hover:-translate-y-[1px] hover:shadow-md"
                }`}
              >
                {!live && (
                  <div className="absolute top-3 right-3 rounded-full bg-secondary-light px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-foreground/55">
                    Coming soon
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                      !live
                        ? "bg-foreground/5 text-foreground/30"
                        : "bg-primary/10 text-primary-dark group-hover:bg-primary/15"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-display text-[1.05rem] ${!live ? "text-foreground/55" : "text-foreground"}`}>
                        {c.label}
                      </span>
                      {c.featured && live && (
                        <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary-dark">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className={`mt-1 text-[13px] leading-relaxed ${!live ? "text-foreground/45" : "text-foreground/60"}`}>
                      {c.helper}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-foreground/40">
          You can change your selection at any time before submitting.
        </p>
      </div>
    </div>
  );
}

// =====================================================================
// "I'm not sure" triage — three quick questions that recommend a program.
// =====================================================================

function NotSureTriage({ onResolve, onBack }: { onResolve: (c: QuizCategory) => void; onBack: () => void }) {
  // Three radio questions. Recommendation logic at the bottom uses simple
  // priority order: weight-focused → sexual concern → vitality.
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");

  const recommend = (): QuizCategory => {
    if (q1 === "lose-weight") return "weight";
    if (q2 === "intimacy") return "sexual";
    if (q3 === "energy-sleep" || q3 === "recovery") return "vitality";
    return "weight"; // fallback to the lead program
  };

  const ready = q1 && q2 && q3;

  return (
    <div className="min-h-[80vh] py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
            Quick triage · 3 questions
          </p>
          <h1 className="mt-4 font-display text-[1.75rem] md:text-[2.25rem] leading-tight text-foreground">
            Let&rsquo;s figure out where to start.
          </h1>
        </div>

        <div className="mt-10 space-y-7">
          <TriageQuestion
            label="What's most on your mind right now?"
            value={q1}
            onChange={setQ1}
            options={[
              { value: "lose-weight", label: "Losing weight" },
              { value: "feel-better", label: "Feeling better day-to-day" },
              { value: "intimacy", label: "Intimacy / sexual health" },
              { value: "not-sure", label: "Honestly, just exploring" },
            ]}
          />
          <TriageQuestion
            label="Which of these would help most?"
            value={q2}
            onChange={setQ2}
            options={[
              { value: "smaller-portions", label: "Eating less, feeling fuller longer" },
              { value: "energy-sleep", label: "Better sleep and steadier energy" },
              { value: "intimacy", label: "Improving desire or function" },
            ]}
          />
          <TriageQuestion
            label="Anything else important to you?"
            value={q3}
            onChange={setQ3}
            options={[
              { value: "recovery", label: "Recovering faster from training or stress" },
              { value: "energy-sleep", label: "More energy and better sleep" },
              { value: "body-comp", label: "Body composition (less fat, more lean)" },
              { value: "none", label: "Nothing in particular" },
            ]}
          />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border-2 border-secondary px-6 py-2.5 text-sm font-semibold text-foreground/60 hover:bg-secondary-light transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={() => onResolve(recommend())}
            className="rounded-full bg-primary px-8 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            See my recommendation
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-foreground/40">
          Based on your answers, we&rsquo;ll route you into a short assessment for the program that
          fits best. You can change to a different program at any time.
        </p>
      </div>
    </div>
  );
}

function TriageQuestion({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-3">{label}</label>
      <div className="space-y-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
              value === o.value
                ? "border-primary bg-primary/5 text-primary-dark"
                : "border-secondary/60 text-foreground/60 hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
              value === o.value ? "border-primary" : "border-secondary"
            }`}>
              {value === o.value && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
            </span>
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
// Shared helpers.
// =====================================================================

function StepWrapper({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-foreground/60">{subtitle}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function ReviewSection({
  title,
  step,
  onEdit,
  items,
  editLabel = "Edit",
}: {
  title: string;
  step: number | null;
  onEdit: (s: number) => void;
  items: { label: string; value: string }[];
  editLabel?: string;
}) {
  return (
    <div className="rounded-xl border border-secondary/40 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
        <button
          type="button"
          onClick={() => onEdit(step ?? 1)}
          className="text-xs font-medium text-primary-dark hover:text-primary transition-colors"
        >
          {editLabel}
        </button>
      </div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex gap-2 text-sm">
            <span className="text-foreground/40 min-w-[120px]">{item.label}:</span>
            <span className="text-foreground/70">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
  columns,
}: {
  options: string[];
  selected: string[] | undefined;
  onToggle: (v: string) => void;
  columns: 1 | 2;
}) {
  const grid = columns === 2 ? "grid sm:grid-cols-2 gap-2" : "space-y-2";
  return (
    <div className={grid}>
      {options.map((opt) => {
        const active = selected?.includes(opt) ?? false;
        return (
          <label
            key={opt}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
              active
                ? "border-primary bg-primary/5 text-primary-dark"
                : "border-secondary/60 text-foreground/60 hover:border-primary/40"
            }`}
          >
            <input
              type="checkbox"
              checked={active}
              onChange={() => onToggle(opt)}
              className="sr-only"
            />
            <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
              active ? "bg-primary border-primary" : "border-secondary"
            }`}>
              {active && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </span>
            {opt}
          </label>
        );
      })}
    </div>
  );
}

function RadioStack<T extends keyof FormData>({
  name,
  options,
  selected,
  register,
}: {
  name: T;
  options: string[];
  selected: string | undefined;
  register: ReturnType<typeof useForm<FormData>>["register"];
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
            selected === opt
              ? "border-primary bg-primary/5 text-primary-dark"
              : "border-secondary/60 text-foreground/60 hover:border-primary/40"
          }`}
        >
          <input type="radio" value={opt} {...register(name)} className="sr-only" />
          <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
            selected === opt ? "border-primary" : "border-secondary"
          }`}>
            {selected === opt && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
          </span>
          {opt}
        </label>
      ))}
    </div>
  );
}

function ConditionsList({
  category,
  selected,
  onToggle,
}: {
  category: QuizCategory;
  selected: string[] | undefined;
  onToggle: (v: string) => void;
}) {
  const options =
    category === "weight" ? CONDITIONS_WEIGHT
    : category === "vitality" ? CONDITIONS_VITALITY
    : CONDITIONS_SEXUAL;
  const disqualifying =
    category === "weight" ? DISQUALIFYING_WEIGHT
    : category === "vitality" ? DISQUALIFYING_VITALITY
    : DISQUALIFYING_SEXUAL;

  return (
    <div className="space-y-2">
      {options.map((c) => {
        const isDisqualifying = disqualifying.includes(c);
        const active = selected?.includes(c) ?? false;
        return (
          <label
            key={c}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
              active
                ? isDisqualifying
                  ? "border-red-300 bg-red-50 text-red-800"
                  : "border-primary bg-primary/5 text-primary-dark"
                : "border-secondary/60 text-foreground/60 hover:border-primary/40"
            }`}
          >
            <input
              type="checkbox"
              checked={active}
              onChange={() => onToggle(c)}
              className="sr-only"
            />
            <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
              active
                ? isDisqualifying ? "bg-red-500 border-red-500" : "bg-primary border-primary"
                : "border-secondary"
            }`}>
              {active && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </span>
            {c}
          </label>
        );
      })}
    </div>
  );
}
