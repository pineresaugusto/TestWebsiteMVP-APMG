"use client";

/**
 * /signin — returning-user entry point.
 *
 * Three sign-in affordances:
 *   1) Email + password form (primary, top of card)
 *   2) Continue with Google
 *   3) Continue with Apple
 *
 * Below the card: a clear "Don't have an account? Create one" link that
 * routes to /app/signup.
 *
 * This is a DEMO surface — no real auth backend. Submitting the password
 * form or clicking either OAuth provider seeds a populated returning-user
 * snapshot and routes into /app/dashboard. A small "Demo mode" line under
 * the card makes that clear so medical-group partners reviewing the site
 * don't think we've built real SSO yet.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { seed } from "@/lib/demoState";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Demo: pretend the credential/OAuth round-trip succeeded — seed a populated
  // returning-user snapshot and route into the patient dashboard.
  const signInAs = (_method: "password" | "google" | "apple") => {
    seed("week4");
    router.push("/app/dashboard");
  };

  const onSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInAs("password");
  };

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6">
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

          {/* Primary path: email + password */}
          <form onSubmit={onSubmitPassword} className="mt-6 space-y-3" noValidate>
            <div>
              <label className="mb-1 block text-[12px] font-medium text-foreground/70">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-foreground/10 bg-white px-4 py-3 text-sm outline-none placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-[12px] font-medium text-foreground/70">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-foreground/10 bg-white px-4 py-3 pr-14 text-sm outline-none placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-foreground/45 hover:text-foreground/70"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mt-1.5 flex justify-end">
                <Link
                  href="#"
                  className="text-[11.5px] text-foreground/55 hover:text-primary-dark"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-md"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-foreground/35">
            <span className="h-px flex-1 bg-foreground/10" />
            or continue with
            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          {/* OAuth alternatives */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => signInAs("google")}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-foreground/10 bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            >
              <GoogleMark />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => signInAs("apple")}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0a0a0a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-[1px] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            >
              <AppleMark />
              Continue with Apple
            </button>
          </div>

          <p className="mt-7 text-center text-[12.5px] text-foreground/55">
            Don&rsquo;t have an account?{" "}
            <Link href="/app/signup" className="font-semibold text-primary-dark hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-5 px-4 text-center text-[11px] text-foreground/40">
          Demo mode · No real authentication is performed. Any credentials or
          provider will load a sample patient.
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

function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" aria-hidden>
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.614z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] -translate-y-px" aria-hidden fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.47 2.24-1.24 3.03-.83.86-2.18 1.52-3.3 1.43-.13-1.12.43-2.29 1.18-3.05.82-.82 2.2-1.43 3.36-1.41zM20.5 17.04c-.55 1.26-.82 1.82-1.53 2.93-.99 1.55-2.39 3.49-4.13 3.5-1.54.02-1.94-1-4.03-.99-2.09.01-2.52 1.01-4.06.99-1.74-.02-3.07-1.77-4.06-3.32-2.77-4.36-3.06-9.48-1.35-12.2 1.21-1.93 3.13-3.07 4.94-3.07 1.84 0 3 .99 4.52.99 1.47 0 2.37-1 4.49-1 1.61 0 3.31.88 4.52 2.4-3.97 2.18-3.33 7.87.69 9.77z"/>
    </svg>
  );
}
