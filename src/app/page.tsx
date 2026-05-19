import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// Home page is the most-targeted commercial-intent landing for the
// queries that bring people in: "GLP-1 weight loss", "online GLP-1
// treatment", "compounded semaglutide telehealth". Title leads with
// the primary keyword, leaves room for the brand suffix template.
// Description is sub-160 chars and reads like marketing copy, not
// like a list of keywords.
export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Treatment Online — Licensed Providers",
  description:
    "Start your GLP-1 weight loss journey with Nuvela. Online consultation with licensed providers, clinically-studied treatment, and home delivery — from $159/month.",
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: "GLP-1 Weight Loss Treatment Online — Licensed Providers | Nuvela",
    description:
      "Online consultation with licensed providers, clinically-studied GLP-1 treatment, home delivery. From $159/month — no insurance required.",
  },
};

// JSON-LD: a WebSite + service-style description so search engines can
// connect this URL to the brand and to its primary offering. Kept
// careful to describe Nuvela as a platform connecting patients with
// providers (matches /faq + /about wording exactly), not as a medical
// practice or pharmacy.
const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/faq?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "GLP-1 Weight Loss Treatment",
    serviceType: "Telehealth weight loss treatment",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "Online weight-loss program connecting patients with licensed providers for evaluation, prescription of compounded semaglutide when clinically appropriate, and home delivery as part of an all-inclusive monthly plan.",
    audience: {
      "@type": "PeopleAudience",
      suggestedMinAge: 18,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "159",
      highPrice: "199",
      offerCount: 3,
      url: `${SITE_URL}/pricing`,
    },
  },
];

export default function Home() {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero — clinician-led framing, editorial card-stack on the right.   */}
      {/* H1 leads with the clinician (per Iter 10 user direction: emphasize  */}
      {/* a well-prepared professional rather than the "easy/frictionless"   */}
      {/* angle the previous H1 hammered). Right column restores the         */}
      {/* "Three simple steps" process card that lived here before the       */}
      {/* bedroom-photo experiment — the photo now lives on /how-it-works.   */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-glow-sage">
        <div
          aria-hidden
          className="absolute inset-0 bg-grain opacity-[0.35] pointer-events-none mix-blend-multiply"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-24 md:pb-28">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
            <div className="md:col-span-7 lg:col-span-7">
              <Reveal>
                <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                  GLP-1 treatment from home
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-[2.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.03] text-foreground">
                  Modern medicine,{" "}
                  <em className="italic font-normal text-primary-dark">properly</em> prescribed.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 text-lg text-foreground/70 leading-relaxed max-w-xl">
                  Board-certified providers — licensed in your state, trained in obesity medicine —
                  review your assessment, consult with you by video or secure message, and decide
                  together whether GLP-1 treatment is the right next step.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
                  <Link
                    href="/get-started"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-accent/25 hover:bg-accent-dark hover:shadow-lg hover:-translate-y-[1px] transition-all"
                  >
                    Start your assessment
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-white/60 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-primary-dark hover:bg-white hover:border-primary/50 transition-all"
                  >
                    How it works
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-foreground/55">
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Licensed providers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    No insurance needed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Private &amp; discreet
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Cancel anytime
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* Process card — three-step preview. Replaces the bedroom photo
                (which moved to /how-it-works). Numbered list reads as a
                clean structural complement to the serif H1. */}
            <Reveal delay={200} className="md:col-span-5 lg:col-span-5">
              <div className="relative mx-auto max-w-md md:max-w-none">
                {/* Decorative dotted tile, back layer */}
                <div
                  aria-hidden
                  className="absolute -top-5 -right-5 w-32 h-32 rounded-3xl bg-dots opacity-70 hidden md:block"
                />
                <div className="relative rounded-[2rem] bg-secondary-light p-8 md:p-10 shadow-2xl shadow-primary/15 ring-1 ring-foreground/5">
                  <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                    Three simple steps
                  </p>
                  <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] text-foreground">
                    From first question to your doorstep.
                  </h2>
                  <ol className="mt-7 space-y-5">
                    {heroSteps.map((step, i) => (
                      <li key={step.title} className="flex gap-4">
                        <span
                          aria-hidden
                          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/12 font-display text-base text-primary-dark tabular-nums"
                        >
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-display text-[15.5px] text-foreground leading-tight">
                            {step.title}
                          </div>
                          <p className="mt-1 text-[13.5px] text-foreground/60 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {/* Reassurance chips — two operational truths the visitor
                      wants to hear before starting: no insurance gate, no
                      surprise charges. (Earlier iterations also chipped the
                      "Under 2 minutes" assessment time, but on a card titled
                      "Three simple steps" that timing read as if the WHOLE
                      flow took 2 minutes — only the assessment does.) */}
                  <ul className="mt-7 flex flex-wrap gap-1.5">
                    {[
                      { icon: <ChipShieldIcon />, label: "No insurance needed" },
                      { icon: <ChipCheckIcon />, label: "No hidden fees" },
                    ].map((chip) => (
                      <li
                        key={chip.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-3 py-1.5 text-[11.5px] font-medium text-foreground/70"
                      >
                        {chip.icon}
                        {chip.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* From-home pair — anchors the experience right after the hero.     */}
      {/* Two larger landscape photos: a real consultation, a real delivery. */}
      {/* Source frames are 4:3 (consultation) and 3:2 (delivery) — both    */}
      {/* tiles render at aspect-[3/2] with object-contain-friendly padding  */}
      {/* via a sage backdrop so nothing important is cropped at the edges.  */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <Reveal>
              <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                Online GLP-1 weight loss treatment
              </p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 font-display text-3xl md:text-[2.5rem] leading-[1.1] text-foreground">
                A consultation, then a care plan made for you. That&rsquo;s it.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
              {homeBandPhotos.map((photo, i) => (
                <figure
                  key={photo.src}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/2] bg-secondary-light shadow-md shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/55 via-black/15 to-transparent">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/90">
                      {String(i + 1).padStart(2, "0")} · {photo.label}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-center text-[10.5px] uppercase tracking-[0.18em] text-foreground/35">
              Photography is illustrative — models shown.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What are GLP-1s — editorial single-column, serif H2.               */}
      {/* Efficacy citation lives here (not in the hero) so the first        */}
      {/* impression leads with ease, and credibility supports it.           */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                The science
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground">
                What are GLP-1 medications?
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 text-lg text-foreground/70 leading-relaxed">
                GLP-1 receptor agonists are a class of prescription medications originally developed
                for type 2 diabetes that have been studied for body-weight reduction. They work by
                mimicking a natural hormone that regulates appetite, helping many people feel fuller
                longer and reduce cravings.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
                In the STEP 1 clinical trial (Wilding et al., NEJM 2021), adults with obesity who
                took semaglutide 2.4&nbsp;mg lost an average of{" "}
                <strong className="text-foreground">~14.9% of body weight</strong> over 68 weeks,
                compared with ~2.4% on placebo.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-3 text-xs text-foreground/50">
                Individual results vary. Semaglutide is associated with potential side effects and
                is not appropriate for everyone. See our{" "}
                <Link
                  href="/medical-disclaimer"
                  className="text-primary-dark underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                >
                  Medical Disclaimer
                </Link>{" "}
                for important safety information.
              </p>
            </Reveal>
            <Reveal delay={340}>
              <Link
                href="/how-it-works"
                className="mt-10 inline-flex items-center gap-2 text-primary-dark font-semibold hover:text-primary transition-colors group"
              >
                Learn more about how it works
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Editorial — the every-day stuff. Side-by-side photo + copy.        */}
      {/* `kitchen-portrait.jpg` on the right (native ~2:3, no crop).        */}
      {/* No outcome claims — frames habits as part of the broader plan.     */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-secondary-light/45 py-20 md:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-grain opacity-[0.18] pointer-events-none mix-blend-soft-light"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal delay={80} className="md:col-span-7 order-2 md:order-1">
              <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                Beyond the prescription
              </p>
              <h2 className="mt-5 font-display text-[2rem] md:text-[2.75rem] leading-[1.05] text-foreground">
                Small, daily things — done with the support of a real care team.
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed text-lg">
                Treatment is one part of a broader plan. Your provider may also discuss hydration,
                nutrition, sleep, and movement as part of your overall care — the kind of small
                routines that quietly do a lot of the work alongside the medication.
              </p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[15px] text-foreground/70">
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  Direct messaging with your care team
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  Provider-led dose adjustments
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  Practical lifestyle guidance
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckIcon />
                  No long-term commitment
                </li>
              </ul>
            </Reveal>
            <Reveal className="md:col-span-5 order-1 md:order-2">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                <div
                  aria-hidden
                  className="absolute -top-4 -left-4 w-28 h-28 rounded-3xl bg-accent/15 hidden md:block"
                />
                <div className="relative overflow-hidden rounded-[2rem] aspect-[2/3] bg-secondary-light shadow-xl shadow-primary/10 ring-1 ring-white/50">
                  <Image
                    src="/images/kitchen-portrait.jpg"
                    alt="Person at a sunlit kitchen counter, holding a glass of water with a small bowl of berries nearby"
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="object-cover object-center"
                  />
                </div>
                <p className="mt-4 text-center text-[10.5px] uppercase tracking-[0.18em] text-foreground/35 md:hidden">
                  Photography is illustrative — models shown.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* How Nuvela works — numbered steps with clean rhythm                */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal>
              <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                The path
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground">
                How Nuvela works
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-lg text-foreground/70">
                From first question to your doorstep — in four unhurried steps.
              </p>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="relative text-center">
                  <div className="relative mx-auto w-14 h-14 mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-primary/10" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-2xl text-primary-dark">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Proof strip — Combo D (Iter 7, scope 2): stats + trust badges.     */}
      {/* No testimonials. Stats trace to STEP 1 (Wilding et al., NEJM       */}
      {/* 2021) and to platform-true claims. Badges describe operational    */}
      {/* posture without overclaiming (no 503B language — that's a known   */}
      {/* deferred issue per CHANGELOG until pharmacy partnership lands).    */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="rule-kicker text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
              Numbers worth knowing
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-secondary/40 bg-white px-6 py-7 text-center shadow-sm"
                >
                  <div className="font-display text-[2.5rem] leading-none text-primary-dark sm:text-[3rem]">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground/55">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/60">
                    {stat.note}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-center text-[11.5px] text-foreground/45">
              Trial figure: Wilding et al., STEP 1, NEJM 2021. Individual results vary.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {badges.map((badge) => (
                <li
                  key={badge.label}
                  className="flex items-center gap-3 rounded-xl border border-secondary/40 bg-white px-4 py-3.5"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary-dark">
                    {badge.icon}
                  </span>
                  <span className="text-[13px] font-semibold leading-tight text-foreground">
                    {badge.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Four-feature grid — "Why this is different"                        */}
      {/* Photo band moved up; this section is now pure typographic value.  */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <Reveal>
              <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                Why Nuvela
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl md:text-[2.5rem] leading-[1.1] text-foreground">
                Built around how care should feel.
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12 lg:gap-x-14 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 70}>
                <article className="group h-full">
                  <span className="h-px w-8 block bg-primary/40 mb-5" aria-hidden />
                  <h3 className="font-display text-[1.5rem] leading-[1.2] text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-foreground/65 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* CTA banner — sage field with a layered frame                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-grain opacity-25 pointer-events-none mix-blend-soft-light"
        />
        <div
          aria-hidden
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-accent/25 blur-3xl"
        />
        <Reveal className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-white">
            Ready when you are.
          </h2>
          <p className="mt-5 text-lg text-white/85 max-w-xl mx-auto">
            Take the short assessment — under 2 minutes — and see if GLP-1 treatment might be a
            good fit. No commitment.
          </p>
          <Link
            href="/get-started"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-primary-dark shadow-lg hover:bg-background hover:-translate-y-[1px] transition-all"
          >
            Start your assessment
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>

      {/* JSON-LD: WebSite + Service. Both are server-rendered (no
          useEffect), so they appear in the initial HTML where crawlers
          can pick them up without executing JS. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

// Compact chip icons for the hero process card.
// Stroke-only, sized to sit next to small (~11.5px) chip labels.
function ChipShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-primary-dark"
      aria-hidden
    >
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9.5C7.5 20.5 4 17 4 12V6l8-3z" />
    </svg>
  );
}

function ChipCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-primary-dark"
      aria-hidden
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// Compact 3-step preview rendered inside the hero process card. The
// full 4-step grid lower on the page (`steps`) keeps "Home Delivery
// & Support" — this shorter version folds delivery + support into a
// single closing step so the card stays scannable.
const heroSteps = [
  {
    title: "Online assessment",
    description: "A short health questionnaire. Under two minutes, from anywhere.",
  },
  {
    title: "Visit with a clinician",
    description:
      "A licensed provider reviews your answers and consults with you — by video or secure message.",
  },
  {
    title: "Treatment, delivered",
    description:
      "If it's a good fit, your plan ships to your door — with provider support along the way.",
  },
];

const steps = [
  {
    title: "Online Assessment",
    description:
      "A short health questionnaire from the comfort of your home. Most people finish in under two minutes.",
  },
  {
    title: "Provider Consultation",
    description:
      "A licensed healthcare provider reviews your information and consults with you — by video visit or asynchronously by secure message, depending on what suits your care.",
  },
  {
    title: "Personalized Treatment",
    description:
      "If your provider determines it's a good fit, they prescribe a GLP-1 medication plan tailored to you.",
  },
  {
    title: "Home Delivery & Support",
    description:
      "Medication ships directly to your door. Your provider is available for questions and check-ins along the way.",
  },
];

// Two photos that anchor the from-home story.
// Alt text stays descriptive — no outcome, no testimonial framing.
const homeBandPhotos = [
  {
    src: "/images/home-consultation.jpg",
    alt: "Person on a video call with a healthcare provider from a sofa at home",
    label: "Consultation",
  },
  {
    src: "/images/home-delivery.jpg",
    alt: "A discreet package placed at the front step of a home",
    label: "Delivery",
  },
];

// Stats — kept to three to read like a deliberate set, not a wall of
// numbers. Each value links to a defensible source: the trial citation
// for efficacy; the assessment-time describes platform behavior we
// control; the visit-availability stat is hedged because real-world
// scheduling depends on provider/state/pharmacy capacity that isn't
// uniform across the network. Iter 12 user note: "1-day reply" was
// removed because the platform doesn't have message-volume data yet —
// what we *do* know is that same-day virtual visits are possible when
// schedules align, and approved prescriptions can ship the next
// business day. The note keeps the operative hedge inline.
const stats = [
  {
    value: "~14.9%",
    label: "Average weight reduction",
    note: "Adults with obesity on semaglutide 2.4 mg over 68 weeks (STEP 1).",
  },
  {
    value: "<2 min",
    label: "Online assessment",
    note: "A short health questionnaire reviewed before any provider visit.",
  },
  {
    value: "Same-day",
    label: "Visits when available",
    note: "When schedules allow, your first virtual visit can happen the same day, and approved prescriptions can ship the next business day. Subject to provider, state, and pharmacy capacity.",
  },
];

// Trust badges — operational posture statements. Phrased to be true
// regardless of pharmacy/state-list status (those remain CHANGELOG
// "known issues"). No medical-board or accreditation logos used.
const badges: Array<{ label: string; icon: React.ReactNode }> = [
  {
    label: "Board-certified providers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "HIPAA-compliant platform",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
  },
  {
    label: "Discreet home delivery",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v10l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    ),
  },
  {
    label: "Cancel anytime",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
        <path d="M3 12a9 9 0 0015.5 6.4L21 21" />
        <path d="M21 12A9 9 0 005.5 5.6L3 3" />
        <path d="M21 3v6h-6" />
        <path d="M3 21v-6h6" />
      </svg>
    ),
  },
];

const features = [
  {
    title: "Licensed, human providers",
    description:
      "Every consultation is with a board-certified clinician licensed in your state — not a form and not an algorithm.",
  },
  {
    title: "One simple monthly price",
    description:
      "Your plan covers the consultation, medication, supplies, and ongoing provider support. No surprises.",
  },
  {
    title: "Delivered to your door",
    description:
      "Discreet packaging, shipped straight to your home. Nothing to pick up, nothing to explain at a counter.",
  },
  {
    title: "Support that continues",
    description:
      "Regular check-ins mean your plan can evolve as you do — dose adjustments, questions, honest guidance.",
  },
];
