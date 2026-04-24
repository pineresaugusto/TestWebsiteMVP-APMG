import { useSyncExternalStore } from "react";
import type { PlanTier } from "./plans";

export type ThreadMessage = {
  from: "provider" | "user";
  text: string;
  timestamp: string;
};

export type Thread = {
  id: string;
  sender: string;
  unread: boolean;
  lastTimestamp: string;
  preview: string;
  messages: ThreadMessage[];
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
    messages: Thread[];
    orders: Order[];
    weightLogs: { date: string; weightLbs: number }[];
  } | null;
};

const STORAGE_KEY = "nuvela_demo_v2";

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

export function useDemoState(): DemoState {
  return useSyncExternalStore(subscribe, readSnapshot, () => EMPTY);
}

const noopSubscribe = () => () => {};

function readQueryParam(name: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
}

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

export function sendMessage(threadId: string, text: string): void {
  if (!isBrowser()) return;
  const state = get();
  if (!state.dashboard) return;
  const now = new Date().toISOString();
  const preview = text.length > 60 ? `${text.slice(0, 57)}...` : text;
  const nextThreads = state.dashboard.messages.map((t) =>
    t.id === threadId
      ? {
          ...t,
          lastTimestamp: now,
          preview,
          messages: [...t.messages, { from: "user" as const, text, timestamp: now }],
        }
      : t,
  );
  write({ ...state, dashboard: { ...state.dashboard, messages: nextThreads } });
}

export function markThreadRead(threadId: string): void {
  if (!isBrowser()) return;
  const state = get();
  if (!state.dashboard) return;
  let changed = false;
  const nextThreads = state.dashboard.messages.map((t) => {
    if (t.id === threadId && t.unread) {
      changed = true;
      return { ...t, unread: false };
    }
    return t;
  });
  if (!changed) return;
  write({ ...state, dashboard: { ...state.dashboard, messages: nextThreads } });
}

export function getUnreadCount(state: DemoState): number {
  if (!state.dashboard) return 0;
  return state.dashboard.messages.filter((t) => t.unread).length;
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
    const welcomeText =
      "Welcome to Nuvela! I've reviewed your intake and everything looks great. Your first shipment will go out within 2–3 business days.";
    const followup =
      "In the meantime, reach out anytime with questions about your plan or what to expect with your first injection.";
    write({
      user: {
        firstName: "Sarah",
        lastName: "Mitchell",
        email: "sarah.mitchell@email.com",
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
            id: "t1",
            sender: "Dr. Sarah Chen, NP",
            unread: true,
            lastTimestamp: now,
            preview: welcomeText.slice(0, 60) + "...",
            messages: [
              { from: "provider", text: welcomeText, timestamp: now },
              { from: "provider", text: followup, timestamp: now },
            ],
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
      firstName: "Sarah",
      lastName: "Mitchell",
      email: "sarah.mitchell@email.com",
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
      currentDose: "0.5 mg",
      messages: [
        {
          id: "t1",
          sender: "Dr. Sarah Chen, NP",
          unread: false,
          lastTimestamp: daysAgo(24),
          preview: "Great question! Most patients find it easiest...",
          messages: [
            {
              from: "provider",
              text: "Welcome to Nuvela! I've reviewed your intake and everything looks great. Your first shipment will go out within 2–3 business days.",
              timestamp: daysAgo(25),
            },
            {
              from: "user",
              text: "Thanks, Dr. Chen! Quick question — should I take the injection in the morning or evening?",
              timestamp: daysAgo(25),
            },
            {
              from: "provider",
              text: "Great question! Most patients find it easiest in the morning, but either time works. The key is consistency — pick a time and stick with it each week. Also rotate injection sites.",
              timestamp: daysAgo(24),
            },
            {
              from: "user",
              text: "Perfect, mornings it is. Thanks!",
              timestamp: daysAgo(24),
            },
          ],
        },
        {
          id: "t2",
          sender: "Nuvela Care Team",
          unread: false,
          lastTimestamp: daysAgo(13),
          preview: "That's very typical and a great sign that the medication...",
          messages: [
            {
              from: "provider",
              text: "Hi Sarah! It's been two weeks since you started treatment. How are you feeling? Any side effects like nausea or changes in appetite? This is completely normal as your body adjusts.",
              timestamp: daysAgo(14),
            },
            {
              from: "user",
              text: "Hi! Some mild nausea the first few days but it's mostly gone now. I've definitely noticed I'm less hungry between meals.",
              timestamp: daysAgo(13),
            },
            {
              from: "provider",
              text: "That's very typical and a great sign that the medication is working. Keep logging your weight and reach out anytime!",
              timestamp: daysAgo(13),
            },
          ],
        },
        {
          id: "t3",
          sender: "Dr. Sarah Chen, NP",
          unread: true,
          lastTimestamp: daysAgo(1),
          preview: "Time to discuss your dose adjustment...",
          messages: [
            {
              from: "provider",
              text: "Hi Sarah, you're coming up on week 4 which means it's time to discuss a dose adjustment. Based on your progress, I'd like to increase your dose from 0.25 mg to 0.5 mg starting next week. This is a standard step-up in the protocol.",
              timestamp: daysAgo(1),
            },
            {
              from: "provider",
              text: "You may experience some of the initial side effects again briefly as your body adjusts to the higher dose. Please let me know if you have any concerns!",
              timestamp: daysAgo(1),
            },
          ],
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
          dose: "0.5 mg",
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
