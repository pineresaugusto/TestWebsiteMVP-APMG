"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { reset, useDemoState } from "@/lib/demoState";
import { PLANS } from "@/lib/plans";

function formatMemberSince(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function AccountPage() {
  const router = useRouter();
  const state = useDemoState();

  const user = state.user;
  const plan = state.plan?.tier ? PLANS[state.plan.tier] : null;
  const cardLast4 = state.payment?.cardLast4;
  const memberSince = formatMemberSince(user?.createdAt);

  const firstName = user?.firstName ?? "Demo";
  const lastName = user?.lastName ?? "Patient";
  const email = user?.email ?? "demo@nuvela.example";
  const initials = `${firstName[0] ?? "D"}${lastName[0] ?? "P"}`.toUpperCase();

  const onSignOut = () => {
    reset();
    router.push("/");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-7">
        <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground">
          Account
        </h1>
        <p className="mt-1 text-[14px] text-foreground/55">
          Manage your profile, plan, and billing
        </p>
      </div>

      {/* Profile */}
      <section className="mb-5 rounded-2xl border border-secondary/40 bg-white p-7 shadow-sm">
        <h2 className="mb-5 text-[15px] font-semibold text-foreground">
          Profile
        </h2>
        <div className="flex items-center gap-5">
          <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[20px] font-semibold text-white">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-[20px] font-medium text-foreground">
              {firstName} {lastName}
            </div>
            <div className="truncate text-[13.5px] text-foreground/55">
              {email}
            </div>
            <div className="mt-1 text-[12.5px] text-foreground/40">
              Member since {memberSince}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="First name" value={firstName} />
          <Field label="Last name" value={lastName} />
          <Field label="Email" value={email} />
          <Field label="Phone" value="Not on file" muted />
        </div>
        <p className="mt-4 text-[12.5px] italic text-foreground/40">
          Profile editing will be available in a future release.
        </p>
      </section>

      {/* Plan */}
      <section className="mb-5 rounded-2xl border border-secondary/40 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-foreground">
            Current Plan
          </h2>
          <Link
            href="/pricing"
            className="text-[13px] font-medium text-primary-dark transition-colors hover:text-accent"
          >
            Compare plans
          </Link>
        </div>
        {plan ? (
          <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl border border-secondary/40 bg-secondary-light/50 p-5">
            <div>
              <div className="text-[11.5px] font-semibold uppercase tracking-wider text-foreground/45">
                {plan.popular ? "Most popular" : "Plan"}
              </div>
              <div className="mt-1 font-display text-[24px] font-medium text-foreground">
                {plan.name}
              </div>
              <p className="mt-1 text-[13.5px] text-foreground/55">
                {plan.tagline}
              </p>
            </div>
            <div className="text-right">
              <div className="font-display text-[26px] font-semibold text-foreground tabular-nums">
                ${plan.price}
                <span className="text-[14px] font-medium text-foreground/50">
                  /mo
                </span>
              </div>
              <div className="text-[12px] text-foreground/40">
                All-inclusive
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[14px] text-foreground/55">
            No plan on file yet.{" "}
            <Link
              href="/app/select-plan"
              className="font-medium text-primary-dark hover:text-accent"
            >
              Choose a plan
            </Link>
            .
          </p>
        )}
      </section>

      {/* Billing */}
      <section className="mb-5 rounded-2xl border border-secondary/40 bg-white p-7 shadow-sm">
        <h2 className="mb-5 text-[15px] font-semibold text-foreground">
          Billing
        </h2>
        {cardLast4 ? (
          <div className="flex items-center justify-between rounded-xl border border-secondary/40 bg-secondary-light/40 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-14 items-center justify-center rounded-md border border-secondary/50 bg-white text-[11px] font-bold uppercase tracking-wider text-foreground/55">
                Card
              </span>
              <div>
                <div className="text-[14px] font-semibold text-foreground">
                  •••• •••• •••• {cardLast4}
                </div>
                <div className="text-[12.5px] text-foreground/45">
                  Default payment method
                </div>
              </div>
            </div>
            <span className="text-[12.5px] italic text-foreground/40">
              Update coming soon
            </span>
          </div>
        ) : (
          <p className="text-[14px] text-foreground/55">
            No payment method on file.
          </p>
        )}
      </section>

      {/* Preferences */}
      <section className="mb-5 rounded-2xl border border-secondary/40 bg-white p-7 shadow-sm">
        <h2 className="mb-5 text-[15px] font-semibold text-foreground">
          Notifications
        </h2>
        <ul className="divide-y divide-secondary/30">
          <Preference
            label="Injection reminders"
            detail="Weekly SMS before your scheduled injection day"
            enabled
          />
          <Preference
            label="Order updates"
            detail="Shipping and delivery status for each refill"
            enabled
          />
          <Preference
            label="Provider messages"
            detail="Email when your care team replies"
            enabled
          />
          <Preference
            label="Marketing"
            detail="Product news and wellness content"
            enabled={false}
          />
        </ul>
        <p className="mt-4 text-[12.5px] italic text-foreground/40">
          Preference editing will be available in a future release.
        </p>
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-accent/20 bg-accent/5 p-7">
        <h2 className="mb-2 text-[15px] font-semibold text-foreground">
          Sign out
        </h2>
        <p className="mb-4 text-[13.5px] text-foreground/55">
          Signing out will clear this demo session. You can always jump back in
          using the demo toolbar.
        </p>
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-lg border border-accent/40 bg-white px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Sign out of demo
        </button>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 text-[11.5px] font-semibold uppercase tracking-wider text-foreground/45">
        {label}
      </div>
      <div
        className={`rounded-lg border border-secondary/50 bg-secondary-light/40 px-3.5 py-2.5 text-[14px] ${
          muted ? "italic text-foreground/40" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Preference({
  label,
  detail,
  enabled,
}: {
  label: string;
  detail: string;
  enabled: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <div className="text-[14px] font-semibold text-foreground">{label}</div>
        <div className="text-[12.5px] text-foreground/50">{detail}</div>
      </div>
      <span
        aria-hidden
        className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-secondary"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </li>
  );
}
