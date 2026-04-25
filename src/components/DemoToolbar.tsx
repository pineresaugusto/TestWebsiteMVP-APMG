"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { reset, seed } from "@/lib/demoState";

const SESSION_KEY = "nuvela_demo_mode";

const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getVisibleSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const url = new URLSearchParams(window.location.search);
  if (url.get("demo") === "1") return true;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export default function DemoToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const visible = useSyncExternalStore(subscribe, getVisibleSnapshot, () => false);

  // Persist ?demo=1 across navigation by marking the session as demo-enabled.
  // Writing sessionStorage is not React state, so this does not trigger the
  // set-state-in-effect rule. We notify so the snapshot picks up the write.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "1") {
      window.sessionStorage.setItem(SESSION_KEY, "1");
      notify();
    }
  }, [pathname]);

  if (!visible) return null;

  const onReset = () => {
    reset();
    router.push("/");
    router.refresh();
  };

  const onJumpNewUser = () => {
    seed("newUser");
    router.push("/app/dashboard");
  };

  const onJumpWeek4 = () => {
    seed("week4");
    router.push("/app/dashboard");
  };

  const onJumpNotEligible = () => {
    seed("notEligible");
    router.push("/app/not-eligible");
  };

  const onHide = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "0");
    }
    notify();
  };

  return (
    <div
      className="fixed bottom-5 right-5 z-[999] flex items-center gap-1 rounded-xl border border-secondary bg-white p-1.5 shadow-lg"
      role="toolbar"
      aria-label="Demo controls"
    >
      <span className="px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-foreground/35">
        Demo
      </span>
      <ToolbarButton onClick={onReset} label="Reset" />
      <ToolbarButton onClick={onJumpNewUser} label="New user" primary />
      <ToolbarButton onClick={onJumpWeek4} label="Week 4" primary />
      <ToolbarButton onClick={onJumpNotEligible} label="Not eligible" />
      <ToolbarButton onClick={onHide} label="Hide" subtle />
    </div>
  );
}

function ToolbarButton({
  onClick,
  label,
  primary,
  subtle,
}: {
  onClick: () => void;
  label: string;
  primary?: boolean;
  subtle?: boolean;
}) {
  const base =
    "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap";
  const style = subtle
    ? "text-foreground/40 hover:text-foreground/70"
    : primary
      ? "text-foreground/70 hover:bg-primary hover:text-white"
      : "text-foreground/70 hover:bg-secondary-light";
  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {label}
    </button>
  );
}
