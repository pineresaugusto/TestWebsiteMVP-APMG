"use client";

import { useMemo, useState } from "react";
import { useDemoState, type Order } from "@/lib/demoState";

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

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function computeNextRefill(state: ReturnType<typeof useDemoState>): string | null {
  const started = state.payment?.subscribedAt ?? state.user?.createdAt;
  if (!started) return null;
  const startMs = new Date(started).getTime();
  const cycleMs = 28 * 86400000;
  const next = startMs + Math.ceil((Date.now() - startMs) / cycleMs) * cycleMs;
  return new Date(next).toISOString();
}

type Filter = "all" | "shipped" | "delivered";

export default function OrdersPage() {
  const state = useDemoState();
  const orders = useMemo<Order[]>(
    () => state.dashboard?.orders ?? [],
    [state.dashboard?.orders],
  );
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all" ? orders : orders.filter((o) => o.status === filter),
    [orders, filter],
  );

  const nextRefill = computeNextRefill(state);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground">
          Orders
        </h1>
        <p className="mt-1 text-[15px] text-foreground/55">
          Track your medication shipments
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-6 rounded-2xl border border-secondary/40 bg-white px-6 py-5 shadow-sm">
        <Stat label="Next Refill" value={nextRefill ? formatShortDate(nextRefill) : "—"} />
        <Divider />
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground/45">
            Auto-ship
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-[12.5px] font-semibold text-primary-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            Active
          </span>
        </div>
        <Divider />
        <Stat label="Total Orders" value={String(orders.length)} />
      </div>

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <>
          <div className="mb-4 flex gap-1.5">
            <Pill active={filter === "all"} onClick={() => setFilter("all")}>
              All
            </Pill>
            <Pill active={filter === "shipped"} onClick={() => setFilter("shipped")}>
              Shipped
            </Pill>
            <Pill active={filter === "delivered"} onClick={() => setFilter("delivered")}>
              Delivered
            </Pill>
          </div>

          <div className="overflow-hidden rounded-2xl border border-secondary/40 bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_1.2fr_1fr_1fr_1fr_0.8fr] border-b border-secondary/30 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-foreground/40 md:grid">
              <span>Order</span>
              <span>Medication</span>
              <span>Date</span>
              <span>Status</span>
              <span>Delivery</span>
              <span>Tracking</span>
            </div>
            {filtered.map((o) => (
              <div
                key={o.id}
                className="flex flex-col gap-2 border-b border-secondary/15 px-4 py-4 text-sm transition-colors last:border-b-0 hover:bg-background/50 md:grid md:grid-cols-[1fr_1.2fr_1fr_1fr_1fr_0.8fr] md:items-center md:gap-0 md:px-6"
              >
                {/* Mobile: top row with order id + status */}
                <div className="flex items-center justify-between md:contents">
                  <span className="font-semibold tabular-nums">{o.id}</span>
                  <span className="md:hidden">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[12.5px] font-semibold ${STATUS_STYLES[o.status]}`}
                    >
                      {STATUS_LABEL[o.status]}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span>{o.medication}</span>
                  <span className="text-[12.5px] text-foreground/45">{o.dose}</span>
                </div>
                <span className="text-[13px] text-foreground/55 md:text-sm md:text-foreground">
                  <span className="md:hidden">Ordered: </span>
                  {formatShortDate(o.orderDate)}
                </span>
                <span className="hidden md:inline">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[12.5px] font-semibold ${STATUS_STYLES[o.status]}`}
                  >
                    {STATUS_LABEL[o.status]}
                  </span>
                </span>
                <span className="text-[13px] text-foreground/55 md:text-sm md:text-foreground">
                  {o.status === "delivered"
                    ? formatShortDate(o.estimatedDelivery)
                    : `Est. ${formatShortDate(o.estimatedDelivery)}`}
                </span>
                <span>
                  <button
                    type="button"
                    disabled
                    title="Tracking unavailable in demo"
                    className="cursor-not-allowed rounded-md border-[1.5px] border-secondary px-3 py-1.5 text-[12.5px] font-semibold text-foreground opacity-40"
                  >
                    Track
                  </button>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[13px] italic text-foreground/40">
            Tracking unavailable in demo mode
          </p>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] font-semibold uppercase tracking-wider text-foreground/45">
        {label}
      </span>
      <span className="text-[15px] font-semibold text-foreground">{value}</span>
    </div>
  );
}

function Divider() {
  return <span className="h-9 w-px bg-secondary" aria-hidden />;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-[1.5px] px-4 py-1.5 text-[13px] font-semibold transition-colors ${
        active
          ? "border-foreground bg-foreground text-white"
          : "border-secondary text-foreground/55 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function EmptyOrders() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-secondary/40 bg-white px-6 py-16 text-center shadow-sm">
      <div className="relative mb-6 h-24 w-28">
        <div className="absolute left-7 top-2.5 h-12 w-16 rounded-xl border-2 border-dashed border-secondary" />
        <div className="absolute bottom-0 right-4 h-8 w-8 rounded-full bg-primary/12" />
        <div className="absolute bottom-2 left-3 h-1 w-10 rounded bg-secondary/40" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        Your first shipment is being prepared
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-foreground/55">
        Once your provider approves your treatment, your medication will be shipped
        to your door
      </p>
    </div>
  );
}
