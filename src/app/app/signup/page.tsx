"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { get, set, useInitialQueryParam } from "@/lib/demoState";

type Errors = Partial<Record<"firstName" | "lastName" | "email" | "password", string>>;

// Default path is "skip the quiz, pick a plan now" — fastest conversion and
// what most pitch viewers will pick. The assessment remains available to
// take any time before the patient schedules an appointment.
type StartPath = "plan-first" | "quiz-first";

export default function SignupPage() {
  const router = useRouter();
  const fromQuiz = useInitialQueryParam("from") === "quiz";
  const prefill = fromQuiz
    ? { firstName: "Sarah", lastName: "Mitchell", email: "sarah.mitchell@email.com" }
    : { firstName: "", lastName: "", email: "" };

  // null = use prefilled value; a string (including "") = user override.
  const [firstNameOverride, setFirstNameOverride] = useState<string | null>(null);
  const [lastNameOverride, setLastNameOverride] = useState<string | null>(null);
  const [emailOverride, setEmailOverride] = useState<string | null>(null);
  const firstName = firstNameOverride ?? prefill.firstName;
  const lastName = lastNameOverride ?? prefill.lastName;
  const email = emailOverride ?? prefill.email;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Path the user wants after creating the account. Hidden when arriving
  // from a completed quiz — at that point the assessment is already done,
  // and the next step is naturally plan selection.
  const [startPath, setStartPath] = useState<StartPath>("plan-first");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    if (!firstName.trim()) next.firstName = "First name is required";
    if (!lastName.trim()) next.lastName = "Last name is required";
    if (!email.trim() || !email.includes("@")) next.email = "Please enter a valid email";
    if (password.length < 8) next.password = "Password must be at least 8 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const current = get();
    set({
      user: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        createdAt: current.user?.createdAt ?? new Date().toISOString(),
      },
    });

    // Quiz already done → straight to plan selection (with recommendation).
    // Otherwise honor the user's path choice.
    if (fromQuiz || startPath === "plan-first") {
      router.push("/app/select-plan");
    } else {
      router.push("/get-started");
    }
  };

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:gap-16 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-md md:mx-0">
        <h1 className="font-display text-3xl font-medium text-foreground">
          Create your Nuvela account
        </h1>
        <p className="mt-2 text-sm text-foreground/55 md:text-base">
          So we can save your progress and connect you with your care team.
        </p>

        {!fromQuiz && (
          <fieldset className="mt-7">
            <legend className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground/55">
              How would you like to start?
            </legend>
            <div className="space-y-2.5">
              <PathOption
                value="plan-first"
                checked={startPath === "plan-first"}
                onChange={setStartPath}
                title="Pick a plan and start now"
                body="Skip the assessment for now — you can complete it any time before your first appointment."
                badge="Recommended"
              />
              <PathOption
                value="quiz-first"
                checked={startPath === "quiz-first"}
                onChange={setStartPath}
                title="Take a 2-minute assessment first"
                body="Get a personalized plan recommendation based on your health and goals."
              />
            </div>
          </fieldset>
        )}

        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="First name"
              value={firstName}
              onChange={setFirstNameOverride}
              error={errors.firstName}
              autoComplete="given-name"
            />
            <Field
              label="Last name"
              value={lastName}
              onChange={setLastNameOverride}
              error={errors.lastName}
              autoComplete="family-name"
            />
          </div>
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmailOverride}
            error={errors.email}
            autoComplete="email"
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className={`w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm outline-none transition-colors placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                  errors.password ? "border-accent" : "border-secondary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-foreground/45 transition-colors hover:text-foreground/70"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-1.5 text-xs text-accent-dark">{errors.password}</p>
            ) : (
              <p className="mt-1.5 text-xs text-foreground/40">At least 8 characters</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {fromQuiz || startPath === "plan-first"
              ? "Create account and pick a plan"
              : "Create account and start assessment"}
          </button>
        </form>

        <p className="mt-4 text-center text-[12.5px] text-foreground/55">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-primary-dark hover:underline">
            Sign in
          </Link>
        </p>

        <Link
          href="/app/select-plan"
          className="mt-3 block text-center text-sm text-foreground/45 transition-colors hover:text-foreground/70"
        >
          Continue as guest →
        </Link>

        <p className="mt-5 text-center text-xs text-foreground/40">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary-dark hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary-dark hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <aside className="hidden rounded-2xl border border-secondary bg-gradient-to-br from-primary/10 to-secondary/20 p-10 md:block">
        <div className="mx-auto max-w-sm text-center">
          <ul className="space-y-4 text-left">
            <PanelFeature
              title="Licensed providers"
              body="Board-certified clinicians in your state"
            />
            <PanelFeature
              title="Private and discreet"
              body="Discreet packaging, no pharmacy visits"
            />
            <PanelFeature
              title="Ongoing support"
              body="Your care team is always a message away"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground/80">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
          error ? "border-accent" : "border-secondary"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-accent-dark">{error}</p>}
    </div>
  );
}

function PathOption({
  value,
  checked,
  onChange,
  title,
  body,
  badge,
}: {
  value: StartPath;
  checked: boolean;
  onChange: (v: StartPath) => void;
  title: string;
  body: string;
  badge?: string;
}) {
  return (
    <label
      className={`relative block cursor-pointer rounded-xl border bg-white p-4 transition-all ${
        checked
          ? "border-primary ring-2 ring-primary/25 shadow-sm"
          : "border-secondary/60 hover:border-primary/40"
      }`}
    >
      <input
        type="radio"
        name="start-path"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
            checked ? "border-primary" : "border-foreground/25"
          }`}
        >
          {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-semibold text-foreground">
              {title}
            </span>
            {badge && (
              <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-primary-dark">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/60">
            {body}
          </p>
        </div>
      </div>
    </label>
  );
}

function PanelFeature({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-dark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <div className="text-sm">
        <div className="font-semibold text-foreground">{title}</div>
        <div className="mt-0.5 text-foreground/55">{body}</div>
      </div>
    </li>
  );
}
