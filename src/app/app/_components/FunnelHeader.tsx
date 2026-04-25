"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { reset } from "@/lib/demoState";

const STEPS: Array<{ prefix: string; step: number }> = [
  { prefix: "/app/signup", step: 1 },
  { prefix: "/app/select-plan", step: 2 },
  { prefix: "/app/checkout", step: 3 },
  { prefix: "/app/welcome", step: 4 },
];

export default function FunnelHeader() {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  // Dashboard surfaces render their own chrome (sidebar + app header)
  // — suppress the funnel header there to avoid stacking.
  if (pathname.startsWith("/app/dashboard")) return null;

  const stepInfo = STEPS.find((s) => pathname.startsWith(s.prefix));
  const isSignup = pathname.startsWith("/app/signup");

  const handleSignout = () => {
    reset();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-secondary bg-white px-6 py-4 md:px-8">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-lg font-semibold text-foreground"
      >
        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
        Nuvela
      </Link>
      <span className="text-xs font-medium text-foreground/50 md:text-sm">
        {stepInfo ? `Step ${stepInfo.step} of 4` : ""}
      </span>
      {isSignup ? (
        <span className="w-16" />
      ) : (
        <button
          type="button"
          onClick={handleSignout}
          className="text-xs text-foreground/50 transition-colors hover:text-foreground/80 md:text-sm"
        >
          Sign out
        </button>
      )}
    </header>
  );
}
