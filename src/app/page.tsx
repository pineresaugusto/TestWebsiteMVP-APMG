import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero — editorial composition                                       */}
      {/* Left: kicker rule, serif headline, lede, CTAs, trust strip.        */}
      {/* Right: a quiet 3-step 'how this works' card — lower emotional      */}
      {/* temperature than a statistic, signals ease rather than efficacy.   */}
      {/* ----------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-glow-sage">
        <div
          aria-hidden
          className="absolute inset-0 bg-grain opacity-[0.35] pointer-events-none mix-blend-multiply"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:pt-28 md:pb-32">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
            <div className="md:col-span-7">
              <Reveal>
                <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                  GLP-1 treatment from home
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-[2.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.03] text-foreground">
                  A provider, a plan, and{" "}
                  <em className="italic font-normal text-primary-dark">nothing in the way</em>...
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 text-lg text-foreground/70 leading-relaxed max-w-lg">
                  A short online assessment, a conversation with a licensed provider, and a plan
                  shaped around you — delivered to your door, with ongoing medical support.
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

            {/* Quiet 3-step journey card */}
            <Reveal delay={200} className="md:col-span-5">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                {/* Decorative dotted tile, back layer */}
                <div
                  aria-hidden
                  className="absolute -top-6 -right-4 w-40 h-40 rounded-3xl bg-dots opacity-70 hidden md:block"
                />
                {/* Soft sage frame */}
                <div className="relative rounded-[2rem] bg-gradient-to-br from-primary/25 via-secondary-light to-secondary/60 p-5 shadow-xl shadow-primary/10">
                  {/* Foreground card */}
                  <div className="rounded-[1.5rem] bg-background/95 backdrop-blur-sm p-8 md:p-10 border border-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-dark">
                      How it starts
                    </p>
                    <h2 className="mt-4 font-display text-[1.75rem] leading-[1.15] text-foreground">
                      Three simple steps
                    </h2>
                    <ol className="mt-6 space-y-5">
                      <JourneyStep
                        num="01"
                        title="A short assessment"
                        body="About 5 minutes — no account needed to start."
                      />
                      <JourneyStep
                        num="02"
                        title="Talk with a licensed provider"
                        body="A clinician reviews your health and answers your questions."
                      />
                      <JourneyStep
                        num="03"
                        title="Your plan, delivered"
                        body="If prescribed, medication ships discreetly with ongoing support."
                      />
                    </ol>
                    <div className="mt-7 h-px bg-foreground/10" />
                    <p className="mt-5 text-xs text-foreground/50 leading-relaxed">
                      Eligibility and any prescription are determined by your provider. See our{" "}
                      <Link
                        href="/medical-disclaimer"
                        className="text-primary-dark underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                      >
                        Medical Disclaimer
                      </Link>
                      .
                    </p>
                  </div>
                </div>
                {/* No insurance needed — quiet reinforcement */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 -left-4 rounded-full bg-white border border-primary/25 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-dark shadow-lg shadow-primary/10 hidden sm:block"
                >
                  No insurance needed
                </div>
              </div>
            </Reveal>
          </div>
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
                took semaglutide 2.4&nbsp;mg weekly lost an average of{" "}
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
      {/* How Nuvela works — numbered steps with vertical rule               */}
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
      {/* Value props — 3-photo band above a clean typographic grid.        */}
      {/* The three photos tell the from-home story (assessment,            */}
      {/* consultation, delivery) before the text elaborates.               */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <Reveal>
              <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground">
                Everything handled from home
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 text-lg text-foreground/70">
                Licensed providers, private consultations, and discreet delivery — without
                leaving your couch.
              </p>
            </Reveal>
          </div>

          {/* 3-photo band — assessment · consultation · delivery */}
          <Reveal delay={120}>
            <div className="mb-16 md:mb-20 grid sm:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
              {homeBandPhotos.map((photo) => (
                <div
                  key={photo.src}
                  className="relative overflow-hidden rounded-2xl aspect-[3/2] bg-secondary-light shadow-lg shadow-primary/5"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>

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
            Take the short assessment — about 5 minutes — and see if GLP-1 treatment might be a
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
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary"
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

function JourneyStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="font-display text-sm tracking-[0.14em] text-primary-dark pt-[3px] min-w-[2rem]">
        {num}
      </span>
      <div>
        <p className="font-display text-[1.05rem] leading-snug text-foreground">{title}</p>
        <p className="mt-1 text-sm text-foreground/60 leading-relaxed">{body}</p>
      </div>
    </li>
  );
}

const steps = [
  {
    title: "Online Assessment",
    description:
      "A short health questionnaire from the comfort of your home. Most people finish in about five minutes.",
  },
  {
    title: "Provider Consultation",
    description:
      "A licensed healthcare provider reviews your information and conducts a virtual consultation.",
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

// Three photos that anchor the "Everything handled from home" section.
// Alt text stays descriptive — no outcome, no testimonial framing.
const homeBandPhotos = [
  {
    src: "/images/home-assessment.jpg",
    alt: "Person reading on their phone in a bright, calm bedroom",
  },
  {
    src: "/images/home-consultation.jpg",
    alt: "Person on a video call with a healthcare provider from home",
  },
  {
    src: "/images/home-delivery.jpg",
    alt: "A discreet package placed at the front door of a home",
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
