import type { DemoState } from "@/lib/demoState";

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export default function NextInjectionCard({ state }: { state: DemoState }) {
  const d = state.dashboard;
  if (!d) return null;
  const days = daysUntil(d.nextInjectionDate);
  const startedAt = state.payment?.subscribedAt ?? state.user?.createdAt;
  const week = weekNumber(startedAt);

  return (
    <div
      className="rounded-2xl border border-secondary/40 p-6 shadow-sm"
      style={{
        background:
          "linear-gradient(135deg, #FFFFFF 0%, rgba(124,154,130,0.06) 100%)",
      }}
    >
      <div className="mb-4 text-sm font-semibold text-foreground">Next Injection</div>
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <Stat label="Date" value={formatShortDate(d.nextInjectionDate)} />
        <Stat
          label="In"
          value={`${days} day${days === 1 ? "" : "s"}`}
          highlight
        />
        <Stat label="Dose" value={d.currentDose} />
        <Stat label="Week" value={String(week)} />
      </div>
      <div className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary-dark">
        View injection instructions
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/45">
        {label}
      </span>
      <span
        className={`text-xl font-semibold tabular-nums ${
          highlight ? "text-primary-dark" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function weekNumber(startedAt: string | undefined): number {
  if (!startedAt) return 1;
  const started = new Date(startedAt).getTime();
  const weeks = Math.floor((Date.now() - started) / (7 * 86400000)) + 1;
  return Math.max(1, weeks);
}
