"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PLANS } from "@/lib/plans";
import { get, set, useDemoState } from "@/lib/demoState";

export default function WelcomePage() {
  const router = useRouter();
  const demo = useDemoState();
  const firstName = demo.user?.firstName ?? "there";
  const plan = PLANS[demo.plan?.tier ?? "accelerate"];

  // Initialize the dashboard slice on first visit without touching the
  // user/plan/payment the funnel just captured.
  const goToDashboard = () => {
    const current = get();
    if (!current.dashboard) {
      const now = new Date().toISOString();
      const nextInjection = new Date();
      nextInjection.setDate(nextInjection.getDate() + 7);
      set({
        dashboard: {
          nextInjectionDate: nextInjection.toISOString(),
          currentDose: "0.25 mg",
          messages: [
            {
              id: "m1",
              from: "provider",
              senderName: "Dr. Sarah Chen, NP",
              text: "Welcome to Nuvela! I've reviewed your intake and everything looks great. Your first shipment will go out within 2–3 business days. Reach out anytime with questions about your plan.",
              timestamp: now,
              unread: true,
            },
          ],
          orders: [],
          weightLogs: [],
        },
      });
    }
    router.push("/app/dashboard");
  };

  return (
    <div className="mx-auto w-full max-w-xl px-6 py-14 text-center md:py-20">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        Plan: {plan.name} — ${plan.price}/mo, billed monthly
      </span>

      <div
        className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-sm"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1 className="mt-6 font-display text-3xl font-medium text-foreground md:text-4xl">
        Welcome to Nuvela, {firstName}
      </h1>
      <p className="mt-2 text-base text-foreground/55">
        Your care team has been notified. Here is what happens next.
      </p>

      <ol className="relative mt-12 space-y-6 text-left">
        <span
          className="absolute left-6 top-10 bottom-10 w-px bg-secondary/50"
          aria-hidden
        />
        <TimelineStep
          label="Within 24 hours"
          heading="Your provider reviews your intake"
          description="A licensed clinician will review your health assessment and confirm your treatment plan."
          icon={<SearchIcon />}
        />
        <TimelineStep
          label="2 – 3 days"
          heading="Your medication ships from our partner pharmacy"
          description="Discreet packaging, delivered straight to your door with everything you need to get started."
          icon={<TruckIcon />}
        />
        <TimelineStep
          label="Day 5 – 7"
          heading="Your first injection + your provider checks in"
          description="Your care team will message you to see how your first week is going and answer any questions."
          icon={<HeartIcon />}
        />
      </ol>

      <div className="mt-12 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={goToDashboard}
          className="w-full min-w-[280px] rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark md:w-auto"
        >
          Go to your dashboard →
        </button>
        <Link
          href="/app/dashboard"
          className="text-sm font-medium text-primary-dark transition-colors hover:text-accent"
        >
          Questions? Message your care team
        </Link>
      </div>
    </div>
  );
}

function TimelineStep({
  label,
  heading,
  description,
  icon,
}: {
  label: string;
  heading: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-5">
      <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-secondary bg-white text-primary-dark">
        {icon}
      </span>
      <div className="pt-1.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
          {label}
        </div>
        <div className="mt-0.5 text-base font-semibold text-foreground">{heading}</div>
        <p className="mt-1 text-sm leading-relaxed text-foreground/55">{description}</p>
      </div>
    </li>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <rect x="1" y="6" width="14" height="11" rx="1" />
      <path d="M15 9h4l3 4v4h-7z" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
