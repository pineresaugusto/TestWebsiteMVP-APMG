"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { logWeight, useDemoState } from "@/lib/demoState";

type WeightLog = { date: string; weightLbs: number };

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ProgressPage() {
  const state = useDemoState();
  const logs: WeightLog[] = state.dashboard?.weightLogs ?? [];
  const goalWeight = state.dashboard?.goalWeight;

  const hasLogs = logs.length > 0;
  const first = hasLogs ? logs[0].weightLbs : null;
  const last = hasLogs ? logs[logs.length - 1].weightLbs : null;
  const change =
    hasLogs && logs.length >= 2 && first !== null && last !== null
      ? (last - first).toFixed(1)
      : null;

  const [draft, setDraft] = useState("");
  const [justLogged, setJustLogged] = useState(false);

  const onSave = () => {
    const v = parseFloat(draft);
    if (!Number.isFinite(v) || v < 50 || v > 500) return;
    logWeight(v);
    setDraft("");
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-7">
        <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground">
          Progress
        </h1>
        <p className="mt-1 text-[14px] text-foreground/55">
          Track your weight loss journey
        </p>
      </div>

      {hasLogs && logs.length >= 2 && first !== null && last !== null && (
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Starting Weight" value={first.toFixed(1)} unit="lb" />
          <StatCard label="Current Weight" value={last.toFixed(1)} unit="lb" />
          <StatCard
            label="Total Change"
            value={`${change} lb`}
            unit="since starting"
            accent
          />
          {goalWeight ? (
            <StatCard
              label="Goal Weight"
              value={goalWeight.toFixed(0)}
              unit="lb"
            />
          ) : null}
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-secondary/40 bg-white p-7 shadow-sm">
        <div className="mb-5 text-sm font-semibold text-foreground">
          Weight Over Time
        </div>
        <div className="relative h-[280px]">
          {logs.length >= 2 ? (
            <WeightChart logs={logs} goalWeight={goalWeight} />
          ) : (
            <EmptyChart single={logs.length === 1} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-secondary/40 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-[15px] font-semibold text-foreground">
            Log today&apos;s weight
          </h3>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label
                htmlFor="weightInput"
                className="mb-1.5 block text-[12.5px] font-medium text-foreground/70"
              >
                Weight (lb)
              </label>
              <input
                id="weightInput"
                type="number"
                step="0.1"
                min={50}
                max={500}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSave();
                }}
                placeholder="e.g. 182.0"
                className="h-[46px] w-full rounded-lg border border-secondary bg-white px-3.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
              />
            </div>
            <button
              type="button"
              onClick={onSave}
              disabled={!draft}
              className="h-[46px] rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-40 disabled:hover:bg-primary"
            >
              Save
            </button>
          </div>
          {justLogged && (
            <p className="mt-3 text-[12.5px] font-medium text-primary-dark">
              Weight logged!
            </p>
          )}
          <Link
            href="/app/dashboard/resources"
            className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary-dark transition-colors hover:text-accent"
          >
            Learn about weight plateaus
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
          </Link>
        </div>

        <div className="rounded-2xl border border-secondary/40 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-[15px] font-semibold text-foreground">
            Recent Entries
          </h3>
          {logs.length > 0 ? (
            <RecentEntries logs={logs} />
          ) : (
            <div className="py-6 text-center text-sm text-foreground/40">
              No entries yet
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-[13px] italic text-foreground/40">
        Results vary. Individual results not typical.
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-secondary/40 bg-white p-5 text-center shadow-sm">
      <div className="text-[11.5px] font-semibold uppercase tracking-wider text-foreground/45">
        {label}
      </div>
      <div
        className={`mt-1.5 font-display text-[30px] font-semibold leading-none tabular-nums ${
          accent ? "text-primary-dark" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[12.5px] text-foreground/40">{unit}</div>
    </div>
  );
}

function EmptyChart({ single }: { single: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="relative mb-4 h-20 w-[100px]">
        <span className="absolute left-[10px] top-[20px] h-[3px] w-[60px] rounded bg-primary/20" />
        <span className="absolute left-[10px] top-[38px] h-[3px] w-[80px] rounded bg-primary/20" />
        <span className="absolute left-[25px] top-[56px] h-[3px] w-[50px] rounded bg-primary/20" />
        <span className="absolute left-[70px] top-[16px] h-2.5 w-2.5 rounded-full bg-primary/30" />
        <span className="absolute left-[5px] top-[34px] h-2.5 w-2.5 rounded-full bg-primary/30" />
      </div>
      {single ? (
        <>
          <h3 className="text-[15px] font-semibold text-foreground">
            One data point so far
          </h3>
          <p className="mt-1 text-[13.5px] text-foreground/50">
            Keep logging weekly for best trends
          </p>
        </>
      ) : (
        <>
          <h3 className="text-[15px] font-semibold text-foreground">
            Log your first weight to see your progress
          </h3>
          <p className="mt-1 text-[13.5px] text-foreground/50">
            We&apos;ll chart your journey over time
          </p>
        </>
      )}
    </div>
  );
}

function RecentEntries({ logs }: { logs: WeightLog[] }) {
  const recent = [...logs].reverse().slice(0, 5);
  return (
    <ul>
      {recent.map((l, i) => {
        const prev = i < recent.length - 1 ? recent[i + 1].weightLbs : null;
        const diff = prev !== null ? l.weightLbs - prev : null;
        const diffLabel = diff !== null ? diff.toFixed(1) : null;
        const isDown = diff !== null && diff <= 0;
        return (
          <li
            key={l.date}
            className="flex items-center justify-between border-b border-secondary/25 py-3 last:border-b-0"
          >
            <span className="text-[14px] text-foreground/55">
              {formatShortDate(l.date)}
            </span>
            <span className="text-[15px] font-semibold tabular-nums text-foreground">
              {l.weightLbs.toFixed(1)} lb
            </span>
            <span
              className={`text-[13px] font-semibold ${
                diffLabel === null
                  ? "text-foreground/30"
                  : isDown
                    ? "text-primary-dark"
                    : "text-accent"
              }`}
            >
              {diffLabel === null
                ? "—"
                : `${isDown ? "" : "+"}${diffLabel}`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function WeightChart({
  logs,
  goalWeight,
}: {
  logs: WeightLog[];
  goalWeight: number | undefined;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 800;
  const H = 280;
  const pad = { top: 20, right: 40, bottom: 36, left: 50 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;

  const { points, areaPoints, yLines, xLabels, goalY, coords } = useMemo(() => {
    const weights = logs.map((l) => l.weightLbs);
    const maxW = Math.max(...weights) + 2;
    let minW = Math.min(...weights) - 2;
    if (goalWeight !== undefined) minW = Math.min(minW, goalWeight - 2);

    const xScale = (i: number) =>
      pad.left + (i / (logs.length - 1)) * cw;
    const yScale = (w: number) =>
      pad.top + ((maxW - w) / (maxW - minW)) * ch;

    const coords = logs.map((l, i) => ({
      x: xScale(i),
      y: yScale(l.weightLbs),
      log: l,
    }));
    const pts = coords.map((c) => `${c.x},${c.y}`).join(" ");
    const area =
      pts +
      ` ${xScale(logs.length - 1)},${H - pad.bottom} ${pad.left},${H - pad.bottom}`;

    const yTicks = 5;
    const yStep = (maxW - minW) / yTicks;
    const yLines = Array.from({ length: yTicks + 1 }, (_, i) => {
      const w = maxW - i * yStep;
      const y = yScale(w);
      return { y, label: w.toFixed(0) };
    });

    const xLabels = coords.map((c, i) => ({
      x: c.x,
      label: formatShortDate(logs[i].date),
    }));

    const goalY =
      goalWeight !== undefined && goalWeight >= minW && goalWeight <= maxW
        ? yScale(goalWeight)
        : null;

    return {
      points: pts,
      areaPoints: area,
      yLines,
      xLabels,
      goalY,
      coords,
    };
  }, [logs, goalWeight, cw, ch, pad.bottom, pad.left, pad.top]);

  const hovered = hover !== null ? coords[hover] : null;

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.12} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        {yLines.map((g, i) => (
          <g key={i}>
            <line
              x1={pad.left}
              y1={g.y}
              x2={W - pad.right}
              y2={g.y}
              stroke="rgba(212,197,178,0.25)"
              strokeWidth={1}
            />
            <text
              x={pad.left - 8}
              y={g.y + 4}
              textAnchor="end"
              fontSize={12}
              fill="var(--foreground)"
              opacity={0.35}
            >
              {g.label}
            </text>
          </g>
        ))}
        {xLabels.map((l, i) => (
          <text
            key={i}
            x={l.x}
            y={H - 8}
            textAnchor="middle"
            fontSize={12}
            fill="var(--foreground)"
            opacity={0.35}
          >
            {l.label}
          </text>
        ))}
        {goalY !== null && (
          <>
            <line
              x1={pad.left}
              y1={goalY}
              x2={W - pad.right}
              y2={goalY}
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeDasharray="6 4"
              opacity={0.5}
            />
            <text
              x={W - pad.right + 4}
              y={goalY + 4}
              fontSize={11}
              fontWeight={600}
              fill="var(--accent)"
              opacity={0.7}
            >
              Goal
            </text>
          </>
        )}
        <polygon points={areaPoints} fill="url(#progressGrad)" />
        <polyline
          points={points}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={hover === i ? 6 : 4.5}
            fill="var(--background)"
            stroke="var(--primary)"
            strokeWidth={2.5}
            className="cursor-pointer transition-[r]"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>
      {hovered && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-lg bg-foreground px-3.5 py-2 text-[13px] font-medium text-white shadow-lg"
          style={{
            left: `${(hovered.x / W) * 100}%`,
            top: `${(hovered.y / H) * 100}%`,
          }}
        >
          {formatShortDate(hovered.log.date)} — {hovered.log.weightLbs.toFixed(1)} lb
        </div>
      )}
    </>
  );
}
