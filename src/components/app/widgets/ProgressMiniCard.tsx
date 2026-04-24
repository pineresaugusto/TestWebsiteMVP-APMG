import Link from "next/link";
import type { DemoState } from "@/lib/demoState";

export default function ProgressMiniCard({ state }: { state: DemoState }) {
  const logs = state.dashboard?.weightLogs ?? [];
  const hasLogs = logs.length > 0;

  return (
    <div className="rounded-2xl border border-secondary/40 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Progress</span>
        <Link
          href="/app/dashboard/progress"
          className="text-[13px] font-medium text-primary-dark transition-colors hover:text-accent"
        >
          View all
        </Link>
      </div>

      {hasLogs ? <ChartBlock logs={logs} /> : <EmptyCta />}
    </div>
  );
}

function ChartBlock({
  logs,
}: {
  logs: { date: string; weightLbs: number }[];
}) {
  const start = logs[0].weightLbs;
  const current = logs[logs.length - 1].weightLbs;
  const change = (current - start).toFixed(1);

  return (
    <>
      <div className="flex items-center gap-6">
        <StatCell label="Start (lb)" value={start.toFixed(1)} />
        <StatCell label="Current (lb)" value={current.toFixed(1)} />
        <StatCell label="Change (lb)" value={change} accent />
      </div>
      <div className="mt-4 h-20">
        <Sparkline logs={logs} />
      </div>
    </>
  );
}

function StatCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={`text-2xl font-bold leading-tight tabular-nums ${
          accent ? "text-primary-dark" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-xs font-medium text-foreground/45">{label}</div>
    </div>
  );
}

function Sparkline({ logs }: { logs: { date: string; weightLbs: number }[] }) {
  const w = 300;
  const h = 80;
  const pad = 8;

  if (logs.length === 1) {
    return (
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
        <circle cx={w / 2} cy={h / 2} r={4} fill="white" stroke="var(--primary)" strokeWidth={2} />
      </svg>
    );
  }

  const weights = logs.map((l) => l.weightLbs);
  const min = Math.min(...weights) - 1;
  const max = Math.max(...weights) + 1;
  const range = max - min || 1;

  const points = logs.map((l, i) => {
    const x = pad + (i / (logs.length - 1)) * (w - pad * 2);
    const y = pad + ((max - l.weightLbs) / range) * (h - pad * 2);
    return { x, y };
  });

  const linePts = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPts = `${linePts} ${w - pad},${h - pad} ${pad},${h - pad}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill="url(#sparkGrad)" />
      <polyline
        points={linePts}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={3.5}
          fill="white"
          stroke="var(--primary)"
          strokeWidth={2}
        />
      ))}
    </svg>
  );
}

function EmptyCta() {
  return (
    <Link
      href="/app/dashboard/progress"
      className="flex items-center gap-4 rounded-xl py-1 transition-colors"
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </span>
      <div>
        <div className="text-sm font-semibold text-foreground">
          Add your first weight log
        </div>
        <p className="text-xs text-foreground/50">Track your progress over time</p>
      </div>
    </Link>
  );
}
