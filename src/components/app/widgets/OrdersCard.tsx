import Link from "next/link";
import type { DemoState, Order } from "@/lib/demoState";

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const STATUS_STYLES: Record<Order["status"], string> = {
  processing: "bg-secondary/35 text-[#8B7355]",
  shipped: "bg-primary/15 text-primary-dark",
  delivered: "bg-primary/25 text-[#4A6B50]",
};

const STATUS_LABEL: Record<Order["status"], string> = {
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
};

export default function OrdersCard({ state }: { state: DemoState }) {
  const orders = state.dashboard?.orders ?? [];
  const latest = [...orders].reverse().slice(0, 2);
  const nextRefill = computeNextRefill(state);

  return (
    <div className="rounded-2xl border border-secondary/40 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Orders</span>
        <Link
          href="/app/dashboard/orders"
          className="text-[13px] font-medium text-primary-dark transition-colors hover:text-accent"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
          </span>
          <div>
            <div className="text-sm font-semibold text-foreground">
              Your first shipment is being prepared
            </div>
            <p className="text-xs text-foreground/50">We&rsquo;ll notify you when it ships</p>
          </div>
        </div>
      ) : (
        <>
          <div className="divide-y divide-secondary/30">
            {latest.map((o) => (
              <div key={o.id} className="flex items-center gap-4 py-3.5 first:pt-0">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-dark">
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
                    <path d="M10.5 1.5l3 3L4.5 13.5l-3-3a4.24 4.24 0 010-6 4.24 4.24 0 016 0z" />
                    <path d="M13.5 10.5l3 3a4.24 4.24 0 010 6 4.24 4.24 0 01-6 0l-3-3" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {o.medication} {o.dose}
                  </div>
                  <div className="mt-0.5 text-xs text-foreground/45">
                    {o.id} · {formatShortDate(o.orderDate)}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${STATUS_STYLES[o.status]}`}
                >
                  {STATUS_LABEL[o.status]}
                </span>
              </div>
            ))}
          </div>
          {nextRefill && (
            <div className="mt-3 text-xs text-foreground/45">
              Next refill: {formatShortDate(nextRefill)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function computeNextRefill(state: DemoState): string | null {
  const started = state.payment?.subscribedAt ?? state.user?.createdAt;
  if (!started) return null;
  // Cycle every 28 days from subscription start.
  const startMs = new Date(started).getTime();
  const cycleMs = 28 * 86400000;
  const next = startMs + Math.ceil((Date.now() - startMs) / cycleMs) * cycleMs;
  return new Date(next).toISOString();
}
