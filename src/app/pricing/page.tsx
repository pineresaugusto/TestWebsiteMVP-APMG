import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PLAN_LIST } from "@/lib/plans";
import { absoluteUrl, breadcrumbJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

// Pricing is a high-intent page — searchers know the category and
// want to compare cost. Title and description lead with price + the
// "all-inclusive" differentiator. The plan-bound Service offers below
// give Google enough to potentially surface a price snippet.
export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Pricing — Plans from $199/Month",
  description:
    "Simple, all-inclusive GLP-1 weight loss pricing. Three monthly plans from $199 — covers medication, provider visits, supplies, and shipping. No insurance, cancel anytime.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    url: "/pricing",
    title: `GLP-1 Weight Loss Pricing — Plans from $199/mo | ${SITE_NAME}`,
    description:
      "Three transparent monthly plans, all-inclusive of medication, consultations, supplies, and shipping. No insurance required.",
  },
};

// Per-tier Service + Offer entries. Mirrors PLAN_LIST so prices in
// JSON-LD never drift from prices on screen. AggregateOffer is also
// included for the cards-as-a-whole.
const pricingJsonLd = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]),
  ...PLAN_LIST.map((tier) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Nuvela ${tier.name} — GLP-1 Weight Loss Plan`,
    serviceType: "Telehealth weight loss treatment",
    description: tier.tagline,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      price: String(tier.price),
      priceCurrency: "USD",
      url: absoluteUrl("/pricing"),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(tier.price),
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
      },
    },
  })),
];

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
            {PLAN_LIST.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 100}>
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

      {/* Aspirational band — full-width photo at native 3:2 so nothing is cropped */}
      <Reveal>
        <div className="relative w-full overflow-hidden aspect-[3/2] bg-secondary-light">
          <Image
            src="/images/pricing-couple.jpg"
            alt="Couple running together outdoors at sunset"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>
      </Reveal>

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
    </>
  );
}

const allIncluded = [
  "Prescription medication",
  "Provider consultations",
  "Injection supplies",
  "Home delivery",
];
