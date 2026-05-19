"use client";

/**
 * /signin — returning-user entry point.
 *
 * Surfaces "Continue with Google" + "Continue with Apple" as the two primary
 * sign-in affordances per user request. This is a DEMO surface: there is no
 * real auth wired up (and no real backend to authenticate against). Clicking
 * either provider button seeds a populated week-4 demo state and routes to
 * `/app/dashboard` so a pitch viewer can see a returning-patient experience.
 *
 * The buttons are styled to OAuth conventions:
 *   - Google: white card, neutral border, multi-color "G" mark, dark label
 *   - Apple: solid black, white Apple mark, white label
 *
 * A small "Demo mode" line under the card makes it clear that no actual
 * authentication is happening — important because medical-group partners
 * will be evaluating this site and shouldn't think we've built real SSO yet.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { seed } from "@/lib/demoState";

export default function SignInPage() {
  const router = useRouter();

  const continueWith = (_provider: "google" | "apple") => {
    // Demo: pretend the OAuth round-trip succeeded by seeding a populated
    // returning-user snapshot, then routing into the patient dashboard.
    seed("week4");
    router.push("/app/dashboard");
  };

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6">
      {/* Soft sage glow behind the card to tie the surface to the rest of the
          marketing site without competing with the card itself. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_25%,rgba(124,154,130,0.18),transparent_70%)]"
      />

      <div className="w-full max-w-md">
        <div className="rounded-[2rem] bg-secondary-light p-8 shadow-2xl shadow-primary/10 ring-1 ring-foreground/5 sm:p-10">
          <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark text-center">
            Patient sign in
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight text-foreground text-center sm:text-[2rem]">
            Welcome back.
          </h1>
          <p className="mt-2 text-center text-sm text-foreground/60">
            Sign in to message your care team, view orders, and track progress.
          </p>

          <div className="mt-7 space-y-3">
            <button
              type="button"
              onClick={() => continueWith("google")}
              className="group flex w-full items-center justify-center gap-3 rounded-full border border-foreground/10 bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            >
              <GoogleMark />
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => continueWith("apple")}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            >
              <AppleMark />
              Continue with Apple
            </button>
          </div>

          <p className="mt-7 text-center text-[12.5px] text-foreground/55">
            Don&rsquo;t have an account?{" "}
            <Link href="/get-started" className="font-semibold text-primary-dark hover:underline">
              Start your assessment
            </Link>
          </p>
        </div>

        {/* Demo disclosure — kept small and outside the card so the card
            reads as a normal product surface. Medical-group partners will
            ask, so being upfront here saves an awkward conversation. */}
        <p className="mt-5 px-4 text-center text-[11px] text-foreground/40">
          Demo mode · No real authentication is performed.
          Selecting a provider will load a sample patient.
        </p>

        <p className="mt-4 px-4 text-center text-[11px] text-foreground/40">
          By continuing you agree to our{" "}
          <Link href="/terms" className="text-primary-dark hover:underline">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-primary-dark hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}

/** Multi-color Google "G" — the canonical SSO mark. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" aria-hidden>
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.614z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

/** Solid Apple mark, optically centered against the white label. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] -translate-y-px" aria-hidden fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.47 2.24-1.24 3.03-.83.86-2.18 1.52-3.3 1.43-.13-1.12.43-2.29 1.18-3.05.82-.82 2.2-1.43 3.36-1.41zM20.5 17.04c-.55 1.26-.82 1.82-1.53 2.93-.99 1.55-2.39 3.49-4.13 3.5-1.54.02-1.94-1-4.03-.99-2.09.01-2.52 1.01-4.06.99-1.74-.02-3.07-1.77-4.06-3.32-2.77-4.36-3.06-9.48-1.35-12.2 1.21-1.93 3.13-3.07 4.94-3.07 1.84 0 3 .99 4.52.99 1.47 0 2.37-1 4.49-1 1.61 0 3.31.88 4.52 2.4-3.97 2.18-3.33 7.87.69 9.77z"/>
    </svg>
  );
}
