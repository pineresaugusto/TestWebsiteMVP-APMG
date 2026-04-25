"use client";

// TODO(stripe): swap this stubbed form for real Stripe Elements when a
// pk_test_ key is available. The 1.5s setTimeout below simulates the
// server-side payment-intent round trip so the demo walkthrough feels right.

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS } from "@/lib/plans";
import { set, useDemoState } from "@/lib/demoState";

export default function CheckoutPage() {
  const router = useRouter();
  const demo = useDemoState();
  const plan = PLANS[demo.plan?.tier ?? "accelerate"];
  const prefilledName = demo.user
    ? `${demo.user.firstName} ${demo.user.lastName}`.trim()
    : "";
  const prefilledEmail = demo.user?.email ?? "";

  // null = use prefilled value; a string (including "") = user override.
  const [billingNameOverride, setBillingNameOverride] = useState<string | null>(null);
  const [billingEmailOverride, setBillingEmailOverride] = useState<string | null>(null);
  const billingName = billingNameOverride ?? prefilledName;
  const billingEmail = billingEmailOverride ?? prefilledEmail;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  const brand = useMemo(() => detectBrand(cardNumber), [cardNumber]);

  const onCardNumberChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const onExpiryChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    setExpiry(digits.length >= 3 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (processing) return;

    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length < 15) {
      setCardError("Please enter a valid card number");
      return;
    }
    setCardError("");
    setProcessing(true);

    const last4 = digits.slice(-4);
    const now = new Date().toISOString();
    window.setTimeout(() => {
      set({
        payment: { completed: true, cardLast4: last4, subscribedAt: now },
      });
      router.push("/app/welcome");
    }, 1500);
  };

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:px-8 md:py-16">
      <div>
        <h1 className="font-display text-2xl font-medium text-foreground md:text-3xl">
          Payment details
        </h1>
        <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Billing name"
              value={billingName}
              onChange={setBillingNameOverride}
              autoComplete="cc-name"
              required
            />
            <TextField
              label="Billing email"
              type="email"
              value={billingEmail}
              onChange={setBillingEmailOverride}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground/80">
              Card number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => onCardNumberChange(e.target.value)}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                autoComplete="cc-number"
                disabled={processing}
                required
                className={`w-full rounded-lg border bg-white px-4 py-3 pr-14 text-sm outline-none transition-colors placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 ${
                  cardError ? "border-accent" : "border-secondary"
                }`}
              />
              {brand && (
                <span
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold tracking-wider ${brandClasses(brand)}`}
                >
                  {brand}
                </span>
              )}
            </div>
            {cardError && <p className="mt-1.5 text-xs text-accent-dark">{cardError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Expiration"
              value={expiry}
              onChange={onExpiryChange}
              placeholder="MM / YY"
              autoComplete="cc-exp"
              inputMode="numeric"
              required
              disabled={processing}
            />
            <TextField
              label="CVC"
              value={cvc}
              onChange={(v) => setCvc(v.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              autoComplete="cc-csc"
              inputMode="numeric"
              required
              disabled={processing}
            />
          </div>
          <TextField
            label="Postal code"
            value={zip}
            onChange={(v) => setZip(v.slice(0, 10))}
            placeholder="12345"
            autoComplete="postal-code"
            inputMode="numeric"
            required
            disabled={processing}
          />

          <label className="flex items-center gap-2.5 text-sm text-foreground">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            Save card for future payments
          </label>

          <button
            type="submit"
            disabled={processing}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-80"
          >
            {processing ? (
              <>
                <Spinner />
                Processing payment...
              </>
            ) : (
              <>Pay ${plan.price}/mo</>
            )}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-foreground/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Payments are encrypted and secure
          </p>
        </form>
      </div>

      <aside>
        <div className="sticky top-24 rounded-2xl border border-secondary/60 bg-white p-7 shadow-sm">
          <h2 className="text-base font-bold text-foreground">Order summary</h2>
          <div className="mt-5 flex items-center gap-3 border-b border-secondary/30 pb-5">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary-dark"
              aria-hidden
            >
              <PillIcon />
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">
                {plan.name} Plan
              </div>
              <div className="text-xs text-foreground/45">{plan.tagline}</div>
            </div>
          </div>
          <dl className="mt-4 space-y-1.5 text-sm">
            <Line label="Today's charge" value={`$${plan.price}`} />
            <Line label="Billed monthly" value="Cancel anytime" />
            <div className="mt-2 flex justify-between border-t border-secondary/30 pt-4 text-base">
              <dt className="text-foreground/55">Due today</dt>
              <dd className="font-bold text-foreground">${plan.price}</dd>
            </div>
          </dl>
          <ul className="mt-5 space-y-2 border-t border-secondary/20 pt-4 text-sm">
            {plan.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-foreground/80">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-foreground/40">
            By confirming, you authorize Nuvela to charge your card monthly until
            cancelled.
          </p>
        </div>
      </aside>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  required,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "email";
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground/80">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-secondary bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
      />
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-foreground/55">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
    />
  );
}

function PillIcon() {
  return (
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
      <path d="M10.5 20.5a7 7 0 01-9.9-9.9l9.9-9.9a7 7 0 019.9 9.9z" />
      <path d="M8.5 8.5l7 7" />
    </svg>
  );
}

function detectBrand(raw: string): "VISA" | "MC" | "AMEX" | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("4")) return "VISA";
  if (digits.startsWith("5")) return "MC";
  if (digits.startsWith("3")) return "AMEX";
  return null;
}

function brandClasses(brand: "VISA" | "MC" | "AMEX"): string {
  if (brand === "VISA") return "text-[#1A1F71]";
  if (brand === "MC") return "text-[#EB001B]";
  return "text-[#006FCF]";
}
