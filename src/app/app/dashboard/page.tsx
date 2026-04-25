"use client";

import Link from "next/link";
import { getUnreadCount, useDemoState } from "@/lib/demoState";
import { PLANS } from "@/lib/plans";
import NextInjectionCard from "@/components/app/widgets/NextInjectionCard";
import InboxPreview from "@/components/app/widgets/InboxPreview";
import OrdersCard from "@/components/app/widgets/OrdersCard";
import ProgressMiniCard from "@/components/app/widgets/ProgressMiniCard";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const state = useDemoState();
  const firstName = state.user?.firstName ?? "there";
  const plan = PLANS[state.plan?.tier ?? "accelerate"];
  const unread = getUnreadCount(state);

  if (!state.dashboard) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="font-display text-2xl font-medium text-foreground">
          Your dashboard is almost ready
        </h1>
        <p className="mt-3 text-sm text-foreground/55">
          Finish signup to see your care team, orders, and progress here.
        </p>
        <Link
          href="/app/signup"
          className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Continue signup
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-7">
        <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground">
          {getGreeting()}, {firstName}
        </h1>
        <div className="mt-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary bg-secondary-light px-4 py-1.5 text-[13.5px] font-semibold text-foreground">
            {plan.name} Plan
            <span className="font-medium text-primary-dark">${plan.price}/mo</span>
          </span>
        </div>
      </div>

      {unread > 0 && (
        <Link
          href="/app/dashboard/messages"
          className="mb-5 flex items-center gap-3 rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/10 to-accent/5 px-5 py-4 transition-colors hover:from-accent/15"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px]"
              aria-hidden
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </span>
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">
              You have {unread} new message{unread > 1 ? "s" : ""}
            </div>
            <p className="text-[13px] text-foreground/55">From your care team</p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <NextInjectionCard state={state} />
        <InboxPreview state={state} />
        <OrdersCard state={state} />
        <ProgressMiniCard state={state} />
      </div>
    </div>
  );
}
