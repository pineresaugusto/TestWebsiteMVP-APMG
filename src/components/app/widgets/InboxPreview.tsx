import Link from "next/link";
import type { DemoState, Thread } from "@/lib/demoState";

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function initials(name: string): string {
  return name
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function InboxPreview({ state }: { state: DemoState }) {
  const threads = state.dashboard?.messages ?? [];
  const latest: Thread[] = [...threads]
    .sort(
      (a, b) =>
        new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime(),
    )
    .slice(0, 2);

  return (
    <div className="rounded-2xl border border-secondary/40 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Messages</span>
        <Link
          href="/app/dashboard/messages"
          className="text-[13px] font-medium text-primary-dark transition-colors hover:text-accent"
        >
          View all
        </Link>
      </div>

      {threads.length === 0 ? (
        <p className="text-sm text-foreground/50">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {latest.map((t) => {
            const senderShort = t.sender.split(",")[0];
            return (
              <Link
                key={t.id}
                href="/app/dashboard/messages"
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary/15"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
                  {initials(t.sender)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[13.5px] font-semibold text-foreground">
                    {senderShort}
                    {t.unread && (
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden />
                    )}
                    <span className="ml-auto text-xs font-normal text-foreground/40">
                      {formatRelative(t.lastTimestamp)}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate text-[13.5px] text-foreground/55">
                    {t.preview}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
