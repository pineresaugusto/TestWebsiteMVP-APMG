import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PricingCard from "@/components/PricingCard";
import Reveal from "@/components/Reveal";
import { PLAN_LIST } from "@/lib/plans";
import { absoluteUrl, breadcrumbJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

// Pricing is a high-intent page — searchers know the category and
// want to compare cost. Title and description lead with starting price
// + the "all-inclusive" differentiator. The plan-bound Service offers
// below give Google enough to potentially surface a price snippet.
export const metadata: Metadata = {
  title: "Pricing — GLP-1 Weight Loss & Peptide Programs from $159/Month",
  description:
    "Simple, all-inclusive pricing for GLP-1 weight loss treatment and other Nuvela peptide programs. Three monthly plans from $159 — covers medication, provider visits, supplies, and shipping. No insurance, cancel anytime.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    url: "/pricing",
    title: `Pricing — Plans from $159/mo | ${SITE_NAME}`,
    description:
      "Three transparent monthly plans, all-inclusive of medication, consultations, supplies, and shipping — applied uniformly across every Nuvela program.",
  },
};

// Per-tier Service + Offer entries. Mirrors PLAN_LIST so prices in
// JSON-LD never drift from prices on screen. The monthly price is the
// canonical price; bundle cadences are a billing convenience, not a
// distinct product, so we don't enumerate them here.
const pricingJsonLd = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]),
  ...PLAN_LIST.map((tier) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Nuvela ${tier.name} — Peptide Program Plan`,
    serviceType: "Telehealth peptide and weight-management treatment",
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
          {/* Friction-reducer above the cards. Spelled out plainly so a
              hesitant visitor doesn't have to commit to a tier just to
              keep moving. */}
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-foreground/55">
            Not sure which plan to choose? Just pick the most affordable one —
            you can always change plans later.
          </p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {PLAN_LIST.map((tier, i) => (
              <Reveal key={tier.id} delay={i * 100}>
                <PricingCard plan={tier} />
              </Reveal>
            ))}
          </div>

          {/* All-inclusive callout — leans on the "no hidden fees" promise
              the hero just made. Same pattern as before but tightened. */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <h3 className="font-display text-2xl text-foreground">Every plan includes</h3>
            <p className="mt-2 text-sm text-foreground/55">
              Medication, visits, and supplies are identical across tiers.
              The differences are in the software and AI guidance you get between visits.
            </p>
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
            <p className="mt-6 text-xs text-foreground/45">
              All-inclusive: prescription medication, provider visits, supplies,
              and shipping. No copays, no insurance, no hidden fees.
            </p>
          </div>

          {/* Fine print */}
          <p className="mt-12 text-center text-xs text-foreground/40 max-w-2xl mx-auto">
            Pricing applies uniformly across every Nuvela program (weight management, vitality,
            sexual & intimacy). Final pricing is determined during your consultation based on your
            individual treatment plan. Compounded medications shipped by our partner pharmacies are
            not FDA-approved products. All medical decisions are made by your independent licensed
            provider. See our{" "}
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
