import { useSyncExternalStore } from "react";
import type { PlanTier } from "./plans";

export type Message = {
  id: string;
  from: "provider" | "user";
  senderName: string;
  text: string;
  timestamp: string;
  unread: boolean;
};

export type Order = {
  id: string;
  orderDate: string;
  medication: string;
  dose: string;
  status: "processing" | "shipped" | "delivered";
  estimatedDelivery: string;
};

export type DemoState = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  } | null;
  quiz: {
    completed: boolean;
    eligible: boolean;
    recommendedPlan: PlanTier | null;
    contraindicationReason?: string;
  };
  plan: { tier: PlanTier } | null;
  payment: {
    completed: boolean;
    cardLast4: string;
    subscribedAt: string;
  } | null;
  dashboard: {
    nextInjectionDate: string;
    currentDose: string;
    messages: Message[];
    orders: Order[];
    weightLogs: { date: string; weightLbs: number }[];
  } | null;
};

const STORAGE_KEY = "nuvela_demo_v1";

const EMPTY: DemoState = {
  user: null,
  quiz: { completed: false, eligible: false, recommendedPlan: null },
  plan: null,
  payment: null,
  dashboard: null,
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Cached snapshot so useSyncExternalStore's getSnapshot returns a stable
// reference across calls with unchanged data (React bails out on === refs).
let cachedRaw: string | null | undefined = undefined;
let cachedState: DemoState = EMPTY;

function readSnapshot(): DemoState {
  if (!isBrowser()) return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedState;
  cachedRaw = raw;
  cachedState = parseRaw(raw);
  return cachedState;
}

function parseRaw(raw: string | null): DemoState {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    if (!parsed || typeof parsed !== "object" || !parsed.quiz) return EMPTY;
    return { ...EMPTY, ...parsed } as DemoState;
  } catch {
    return EMPTY;
  }
}

const listeners = new Set<() => void>();

function notify(): void {
  cachedRaw = undefined;
  listeners.forEach((l) => l());
}

function write(state: DemoState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  notify();
}

export function get(): DemoState {
  return readSnapshot();
}

export function set(partial: Partial<DemoState>): void {
  if (!isBrowser()) return;
  const next: DemoState = { ...get(), ...partial };
  write(next);
}

export function reset(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  notify();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) notify();
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", storageHandler);
  };
}

// React hook: subscribe to the demo state. Returns EMPTY during SSR and the
// hydration boundary, then updates to the localStorage value once mounted.
export function useDemoState(): DemoState {
  return useSyncExternalStore(subscribe, readSnapshot, () => EMPTY);
}

const noopSubscribe = () => () => {};

function readQueryParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

// Reads a single query-string param on mount. Returns null on server / first
// pre-hydration render; the real value after mount. Uses useSyncExternalStore
// so we do not need an effect + setState to copy the URL into component state.
export function useInitialQueryParam(name: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => readQueryParam(name),
    () => null,
  );
}

function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

function daysAgo(n: number): string {
  return daysFromNow(-n);
}

export function seed(preset: "newUser" | "week4" | "notEligible"): void {
  if (!isBrowser()) return;

  if (preset === "notEligible") {
    write({
      ...EMPTY,
      quiz: {
        completed: true,
        eligible: false,
        recommendedPlan: null,
        contraindicationReason: "history of medullary thyroid carcinoma",
      },
    });
    return;
  }

  if (preset === "newUser") {
    const now = new Date().toISOString();
    write({
      user: {
        firstName: "Demo",
        lastName: "Patient",
        email: "demo@nuvela.com",
        createdAt: now,
      },
      quiz: { completed: true, eligible: true, recommendedPlan: "accelerate" },
      plan: { tier: "accelerate" },
      payment: { completed: true, cardLast4: "4242", subscribedAt: now },
      dashboard: {
        nextInjectionDate: daysFromNow(7),
        currentDose: "0.25 mg",
        messages: [
          {
            id: "m1",
            from: "provider",
            senderName: "Dr. Sarah Chen, NP",
            text:
              "Welcome to Nuvela! I've reviewed your intake and everything looks great. Your first shipment will go out within 2–3 business days. Reach out anytime with questions about your plan.",
            timestamp: now,
            unread: true,
          },
        ],
        orders: [],
        weightLogs: [],
      },
    });
    return;
  }

  // preset === "week4"
  write({
    user: {
      firstName: "Demo",
      lastName: "Patient",
      email: "demo@nuvela.com",
      createdAt: daysAgo(28),
    },
    quiz: { completed: true, eligible: true, recommendedPlan: "accelerate" },
    plan: { tier: "accelerate" },
    payment: {
      completed: true,
      cardLast4: "4242",
      subscribedAt: daysAgo(28),
    },
    dashboard: {
      nextInjectionDate: daysFromNow(3),
      currentDose: "1.0 mg",
      messages: [
        {
          id: "m1",
          from: "provider",
          senderName: "Dr. Sarah Chen, NP",
          text:
            "Welcome to Nuvela! Everything looks great for your first shipment — arriving within 2–3 business days.",
          timestamp: daysAgo(28),
          unread: false,
        },
        {
          id: "m2",
          from: "user",
          senderName: "Demo Patient",
          text:
            "Thanks, Dr. Chen! Quick question about injection timing — morning vs. evening?",
          timestamp: daysAgo(21),
          unread: false,
        },
        {
          id: "m3",
          from: "provider",
          senderName: "Dr. Sarah Chen, NP",
          text:
            "Either works — most patients find mornings easiest. Pick one and stay consistent.",
          timestamp: daysAgo(21),
          unread: false,
        },
      ],
      orders: [
        {
          id: "NV-1001",
          orderDate: daysAgo(27),
          medication: "Compounded semaglutide",
          dose: "0.25 mg",
          status: "delivered",
          estimatedDelivery: daysAgo(23),
        },
        {
          id: "NV-1002",
          orderDate: daysAgo(5),
          medication: "Compounded semaglutide",
          dose: "1.0 mg",
          status: "shipped",
          estimatedDelivery: daysFromNow(2),
        },
      ],
      weightLogs: [
        { date: daysAgo(28), weightLbs: 210.0 },
        { date: daysAgo(21), weightLbs: 208.5 },
        { date: daysAgo(14), weightLbs: 207.2 },
        { date: daysAgo(7), weightLbs: 205.0 },
      ],
    },
  });
}
