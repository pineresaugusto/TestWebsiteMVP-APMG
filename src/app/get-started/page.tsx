"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { set } from "@/lib/demoState";
import type { PlanTier } from "@/lib/plans";

const TOTAL_STEPS = 7;

const AVAILABLE_STATES = [
  "Arizona", "California", "Colorado", "Florida", "Georgia", "Illinois",
  "Indiana", "Maryland", "Michigan", "Minnesota", "Nevada", "New Jersey",
  "New York", "North Carolina", "Ohio", "Pennsylvania", "Tennessee",
  "Texas", "Virginia", "Washington",
];

const MEDICAL_CONDITIONS = [
  "Type 2 diabetes",
  "Heart disease or heart failure",
  "Thyroid disorder",
  "Kidney disease",
  "Pancreatitis (current or history)",
  "Eating disorder (current or history)",
  "Medullary thyroid carcinoma (personal or family history)",
  "Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)",
];

const DISQUALIFYING_CONDITIONS = [
  "Pancreatitis (current or history)",
  "Medullary thyroid carcinoma (personal or family history)",
  "Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)",
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

type FormData = {
  age: string;
  sex: string;
  state: string;
  weightLbs: string;
  heightFt: string;
  heightIn: string;
  targetWeightLbs: string;
  motivations: string[];
  medicalConditions: string[];
  medications: string[];
  otherMedications: string;
  previousAttempts: string[];
  previousAttemptsTimeframe: string;
};

function calculateBMI(weightLbs: string, heightFt: string, heightIn: string): number | null {
  const w = parseFloat(weightLbs);
  const ft = parseInt(heightFt);
  const inches = parseInt(heightIn) || 0;
  if (!w || !ft) return null;
  const totalInches = ft * 12 + inches;
  return (w / (totalInches * totalInches)) * 703;
}

function getEligibility(data: FormData, bmi: number | null): "eligible" | "not_eligible" {
  const age = parseInt(data.age);
  if (age < 18) return "not_eligible";
  if (bmi !== null && bmi < 27) return "not_eligible";
  const hasDisqualifying = data.medicalConditions?.some((c) =>
    DISQUALIFYING_CONDITIONS.includes(c)
  );
  if (hasDisqualifying) return "not_eligible";
  return "eligible";
}

function getRecommendedTier(bmi: number | null): { id: PlanTier; name: string; price: number } {
  if (bmi !== null && bmi >= 40) return { id: "transform", name: "Transform", price: 399 };
  if (bmi !== null && bmi >= 35) return { id: "accelerate", name: "Accelerate", price: 299 };
  return { id: "start", name: "Start", price: 199 };
}

export default function GetStarted() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { register, watch, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      motivations: [],
      medicalConditions: [],
      medications: [],
      previousAttempts: [],
      otherMedications: "",
    },
  });

  const watchAll = watch();
  const bmi = calculateBMI(watchAll.weightLbs, watchAll.heightFt, watchAll.heightIn);

  const onSubmit = () => {
    const eligibility = getEligibility(watchAll, bmi);
    if (eligibility === "eligible") {
      const tier = getRecommendedTier(bmi);
      set({
        quiz: {
          completed: true,
          eligible: true,
          recommendedPlan: tier.id,
        },
      });
      router.push("/app/signup?from=quiz");
      return;
    }
    const disqualifying = watchAll.medicalConditions?.find((c) =>
      DISQUALIFYING_CONDITIONS.includes(c),
    );
    set({
      quiz: {
        completed: true,
        eligible: false,
        recommendedPlan: null,
        contraindicationReason: disqualifying,
      },
    });
    setSubmitted(true);
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const goToStep = (s: number) => setStep(s);

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const current = (getValues(field) as string[]) || [];
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value) as never);
    } else {
      setValue(field, [...current, value] as never);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary-light flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <h1 className="font-display text-[1.75rem] md:text-3xl leading-tight text-foreground">
            This path may not be the right fit for you right now
          </h1>
          <p className="mt-5 text-foreground/70 leading-relaxed">
            Based on what you shared, GLP-1 treatment through Nuvela may not be the best option
            at the moment. That&apos;s not a judgment — just a careful first pass. A conversation
            with your primary care provider is a great next step, and they can help you find
            the right direction.
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
              Learn more about GLP-1s
            </Link>
            <button
              onClick={() => { setSubmitted(false); setStep(1); }}
              className="rounded-full border-2 border-secondary px-8 py-3 text-sm font-semibold text-foreground/70 hover:bg-secondary-light transition-colors"
            >
              Retake assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 md:py-20">
      <div className="mx-auto max-w-2xl px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-foreground/40 mb-2">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-secondary-light rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basics */}
          {step === 1 && (
            <StepWrapper title="Let's start with the basics" subtitle="About 5 minutes, in plain language. Nothing is submitted until the final step — you can go back or stop at any point.">
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

          {/* Step 2: Body Metrics */}
          {step === 2 && (
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

          {/* Step 3: Weight Goals */}
          {step === 3 && (
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
                  <div className="grid sm:grid-cols-2 gap-2">
                    {MOTIVATIONS.map((m) => (
                      <label
                        key={m}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
                          watchAll.motivations?.includes(m)
                            ? "border-primary bg-primary/5 text-primary-dark"
                            : "border-secondary/60 text-foreground/60 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={watchAll.motivations?.includes(m) || false}
                          onChange={() => toggleArrayField("motivations", m)}
                          className="sr-only"
                        />
                        <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
                          watchAll.motivations?.includes(m) ? "bg-primary border-primary" : "border-secondary"
                        }`}>
                          {watchAll.motivations?.includes(m) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </span>
                        {m}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </StepWrapper>
          )}

          {/* Step 4: Medical History */}
          {step === 4 && (
            <StepWrapper title="Your medical history" subtitle="Honest answers keep you safe. Your provider will use this to make the right recommendation for you.">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Do you have any of the following conditions? (select all that apply)
                </label>
                <div className="space-y-2">
                  {MEDICAL_CONDITIONS.map((c) => {
                    const isDisqualifying = DISQUALIFYING_CONDITIONS.includes(c);
                    return (
                      <label
                        key={c}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
                          watchAll.medicalConditions?.includes(c)
                            ? isDisqualifying
                              ? "border-red-300 bg-red-50 text-red-800"
                              : "border-primary bg-primary/5 text-primary-dark"
                            : "border-secondary/60 text-foreground/60 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={watchAll.medicalConditions?.includes(c) || false}
                          onChange={() => toggleArrayField("medicalConditions", c)}
                          className="sr-only"
                        />
                        <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
                          watchAll.medicalConditions?.includes(c)
                            ? isDisqualifying ? "bg-red-500 border-red-500" : "bg-primary border-primary"
                            : "border-secondary"
                        }`}>
                          {watchAll.medicalConditions?.includes(c) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </span>
                        {c}
                      </label>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-foreground/40">
                  If none apply, simply proceed to the next step.
                </p>
              </div>
            </StepWrapper>
          )}

          {/* Step 5: Current Medications */}
          {step === 5 && (
            <StepWrapper title="Current medications" subtitle="Let us know what you're currently taking so your provider can check for interactions.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Are you currently taking any of these? (select all that apply)
                  </label>
                  <div className="space-y-2">
                    {MEDICATIONS.map((m) => (
                      <label
                        key={m}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
                          watchAll.medications?.includes(m)
                            ? "border-primary bg-primary/5 text-primary-dark"
                            : "border-secondary/60 text-foreground/60 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={watchAll.medications?.includes(m) || false}
                          onChange={() => toggleArrayField("medications", m)}
                          className="sr-only"
                        />
                        <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
                          watchAll.medications?.includes(m) ? "bg-primary border-primary" : "border-secondary"
                        }`}>
                          {watchAll.medications?.includes(m) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </span>
                        {m}
                      </label>
                    ))}
                  </div>
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

          {/* Step 6: Previous Attempts */}
          {step === 6 && (
            <StepWrapper title="Previous weight loss attempts" subtitle="Understanding what you've tried helps your provider tailor the best approach for you.">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    What have you tried before? (select all that apply)
                  </label>
                  <div className="space-y-2">
                    {PREVIOUS_ATTEMPTS.map((a) => (
                      <label
                        key={a}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
                          watchAll.previousAttempts?.includes(a)
                            ? "border-primary bg-primary/5 text-primary-dark"
                            : "border-secondary/60 text-foreground/60 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={watchAll.previousAttempts?.includes(a) || false}
                          onChange={() => toggleArrayField("previousAttempts", a)}
                          className="sr-only"
                        />
                        <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
                          watchAll.previousAttempts?.includes(a) ? "bg-primary border-primary" : "border-secondary"
                        }`}>
                          {watchAll.previousAttempts?.includes(a) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </span>
                        {a}
                      </label>
                    ))}
                  </div>
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

          {/* Step 7: Review */}
          {step === 7 && (
            <StepWrapper title="Review your responses" subtitle="Please verify your information is accurate. You can go back to edit any section.">
              <div className="space-y-4">
                <ReviewSection
                  title="Basics"
                  step={1}
                  onEdit={goToStep}
                  items={[
                    { label: "Age", value: watchAll.age || "—" },
                    { label: "Sex", value: watchAll.sex || "—" },
                    { label: "State", value: watchAll.state || "—" },
                  ]}
                />
                <ReviewSection
                  title="Body Metrics"
                  step={2}
                  onEdit={goToStep}
                  items={[
                    { label: "Weight", value: watchAll.weightLbs ? `${watchAll.weightLbs} lbs` : "—" },
                    { label: "Height", value: watchAll.heightFt ? `${watchAll.heightFt}'${watchAll.heightIn || 0}"` : "—" },
                    { label: "BMI", value: bmi ? bmi.toFixed(1) : "—" },
                  ]}
                />
                <ReviewSection
                  title="Goals"
                  step={3}
                  onEdit={goToStep}
                  items={[
                    { label: "Target weight", value: watchAll.targetWeightLbs ? `${watchAll.targetWeightLbs} lbs` : "—" },
                    { label: "Motivations", value: watchAll.motivations?.join(", ") || "None selected" },
                  ]}
                />
                <ReviewSection
                  title="Medical History"
                  step={4}
                  onEdit={goToStep}
                  items={[
                    { label: "Conditions", value: watchAll.medicalConditions?.length ? watchAll.medicalConditions.join(", ") : "None" },
                  ]}
                />
                <ReviewSection
                  title="Medications"
                  step={5}
                  onEdit={goToStep}
                  items={[
                    { label: "Current medications", value: watchAll.medications?.length ? watchAll.medications.join(", ") : "None" },
                    { label: "Other", value: watchAll.otherMedications || "None" },
                  ]}
                />
                <ReviewSection
                  title="Previous Attempts"
                  step={6}
                  onEdit={goToStep}
                  items={[
                    { label: "Methods tried", value: watchAll.previousAttempts?.length ? watchAll.previousAttempts.join(", ") : "None" },
                    { label: "Most recent", value: watchAll.previousAttemptsTimeframe || "—" },
                  ]}
                />
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
            {step < TOTAL_STEPS ? (
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
}: {
  title: string;
  step: number;
  onEdit: (s: number) => void;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-xl border border-secondary/40 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-xs font-medium text-primary-dark hover:text-primary transition-colors"
        >
          Edit
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
