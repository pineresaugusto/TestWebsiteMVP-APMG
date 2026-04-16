import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function Pricing() {
  return (
    <>
      <PageHero
        kicker="Pricing"
        title={
          <>
            Simple, <em className="not-italic text-primary-dark">all-inclusive</em> pricing
          </>
        }
        description="One monthly price covers everything — medication, provider consultations, shipping, and ongoing support. No hidden fees, no surprises."
      />

      {/* Pricing Tiers */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  className={`relative h-full rounded-2xl border p-8 flex flex-col transition-all hover:-translate-y-[2px] ${
                    tier.popular
                      ? "border-accent bg-white shadow-xl shadow-accent/15 ring-1 ring-accent"
                      : "border-secondary/40 bg-white hover:shadow-lg hover:border-primary/30"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white shadow-md shadow-accent/30">
                      Most popular
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{tier.name}</h3>
                    <p className="mt-1 text-sm text-foreground/60">{tier.tagline}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display text-5xl text-foreground">${tier.price}</span>
                      <span className="text-foreground/50">/mo</span>
                    </div>
                    <p className="mt-1 text-xs text-foreground/40">{tier.dose}</p>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-foreground/70"
                      >
                        <svg
                          className="w-5 h-5 text-primary flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/get-started"
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                      tier.popular
                        ? "bg-accent text-white hover:bg-accent-dark shadow-md shadow-accent/25"
                        : "bg-primary/10 text-primary-dark hover:bg-primary/20"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What's included */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h3 className="font-display text-2xl text-foreground">Every plan includes</h3>
            <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {allIncluded.map((item) => (
                <div key={item} className="flex items-center gap-2 justify-center text-sm text-foreground/60">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Fine print */}
          <p className="mt-12 text-center text-xs text-foreground/40 max-w-2xl mx-auto">
            Pricing shown is illustrative. Final pricing is determined during your consultation
            based on your individual treatment plan. Compounded semaglutide is not an FDA-approved
            product. All medical decisions are made by your independent licensed provider. See our{" "}
            <Link
              href="/medical-disclaimer"
              className="underline hover:text-foreground/70"
            >
              Medical Disclaimer
            </Link>
            {" "}for important safety information.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-grain opacity-25 pointer-events-none mix-blend-soft-light"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -right-12 w-80 h-80 rounded-full bg-accent/25 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-white">
            Not sure which plan is right for you?
          </h2>
          <p className="mt-5 text-white/85 max-w-xl mx-auto">
            Take our free assessment and your provider will recommend the best plan for your goals.
          </p>
          <Link
            href="/get-started"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-primary-dark shadow-lg hover:bg-background hover:-translate-y-[1px] transition-all"
          >
            Start your assessment
          </Link>
        </div>
      </section>
    </>
  );
}

const tiers = [
  {
    name: "Start",
    tagline: "Begin your journey with guided support",
    price: 199,
    dose: "Semaglutide 0.25 – 0.5 mg/week",
    popular: false,
    features: [
      "Compounded semaglutide medication",
      "Initial provider consultation",
      "Monthly provider check-in",
      "Injection supplies included",
      "Free standard shipping",
      "Direct messaging with care team",
      "Cancel anytime",
    ],
  },
  {
    name: "Accelerate",
    tagline: "More frequent support as your plan builds",
    price: 299,
    dose: "Semaglutide 1.0 – 1.7 mg/week",
    popular: true,
    features: [
      "Compounded semaglutide medication",
      "Initial provider consultation",
      "Bi-weekly provider check-ins",
      "Injection supplies included",
      "Free standard shipping",
      "Personalized nutrition guide",
      "Direct messaging with care team",
      "Cancel anytime",
    ],
  },
  {
    name: "Transform",
    tagline: "Our most hands-on plan, for long-term care",
    price: 399,
    dose: "Semaglutide 2.0 – 2.4 mg/week",
    popular: false,
    features: [
      "Compounded semaglutide medication",
      "Initial provider consultation",
      "Weekly provider access",
      "Injection supplies included",
      "Priority shipping",
      "Personalized nutrition & fitness plan",
      "Direct messaging with care team",
      "Progress tracking dashboard",
      "Cancel anytime",
    ],
  },
];

const allIncluded = [
  "Prescription medication",
  "Provider consultations",
  "Injection supplies",
  "Home delivery",
];
