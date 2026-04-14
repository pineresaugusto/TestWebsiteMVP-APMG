import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero — editorial composition                                       */}
      {/* Left: kicker rule, serif headline, lede, CTAs, trust strip.        */}
      {/* Right: layered card-stack with a clinical-trial stat, a soft sage  */}
      {/* frame, and a dotted tile — replaces the old SVG-heart placeholder. */}
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
                  A new kind of weight-loss care
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 font-display text-[2.75rem] sm:text-5xl lg:text-[4.25rem] leading-[1.03] text-foreground">
                  Your weight-loss journey,{" "}
                  <em className="not-italic text-primary-dark">
                    gently guided
                  </em>{" "}
                  by experts.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 text-lg text-foreground/70 leading-relaxed max-w-lg">
                  Nuvela connects you with licensed healthcare providers for personalized GLP-1
                  treatment — delivered to your door with ongoing medical support.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
                  <Link
                    href="/get-started"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-accent/25 hover:bg-accent-dark hover:shadow-lg hover:-translate-y-[1px] transition-all"
                  >
                    See If You Qualify
                    <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-white/60 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-primary-dark hover:bg-white hover:border-primary/50 transition-all"
                  >
                    Learn More
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
                    Home delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Ongoing support
                  </li>
                </ul>
              </Reveal>
            </div>

            {/* Editorial card-stack */}
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-dark">
                      STEP 1 trial · NEJM 2021
                    </p>
                    <p className="mt-5 font-display text-5xl md:text-6xl text-primary-dark leading-none">
                      ~14.9%
                    </p>
                    <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                      Average body-weight reduction in adults with obesity who took semaglutide
                      2.4&nbsp;mg weekly over 68 weeks, vs. ~2.4% on placebo.<sup className="text-accent-dark">*</sup>
                    </p>
                    <div className="mt-6 h-px bg-foreground/10" />
                    <p className="mt-5 text-xs text-foreground/50 leading-relaxed">
                      Individual results vary. See our{" "}
                      <Link
                        href="/medical-disclaimer"
                        className="text-primary-dark underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                      >
                        Medical Disclaimer
                      </Link>{" "}
                      for important safety information.
                    </p>
                  </div>
                </div>
                {/* Accent pill, front layer */}
                <div
                  aria-hidden
                  className="absolute -bottom-4 -left-4 rounded-full bg-accent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-accent/30 hidden sm:block"
                >
                  Clinically studied
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* What are GLP-1s — editorial single-column, serif H2                */}
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
                for type 2 diabetes that have been shown to significantly reduce body weight. They
                work by mimicking a natural hormone that regulates appetite, helping you feel fuller
                longer and reducing cravings.
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
                * Individual results vary. Semaglutide is associated with potential side effects and
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
                From assessment to your doorstep — in four simple steps.
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
      {/* Why Nuvela                                                         */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal>
              <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
                Why us
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground">
                Why choose Nuvela
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-lg text-foreground/70">
                We make weight-loss treatment accessible, affordable, and supported.
              </p>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-secondary/40 bg-background p-8 transition-all hover:-translate-y-[2px] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 transition-colors group-hover:bg-primary/15">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
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
            Ready to start your journey?
          </h2>
          <p className="mt-5 text-lg text-white/85 max-w-xl mx-auto">
            Take our free 5-minute assessment to see if GLP-1 treatment is right for you.
            No commitment required.
          </p>
          <Link
            href="/get-started"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-primary-dark shadow-lg hover:bg-background hover:-translate-y-[1px] transition-all"
          >
            See If You Qualify
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

const steps = [
  {
    title: "Online Assessment",
    description:
      "Complete a quick health questionnaire from the comfort of your home. It takes less than 5 minutes.",
  },
  {
    title: "Provider Consultation",
    description:
      "A licensed healthcare provider reviews your information and conducts a virtual consultation.",
  },
  {
    title: "Personalized Treatment",
    description:
      "If eligible, your provider prescribes a GLP-1 medication plan tailored to your needs and goals.",
  },
  {
    title: "Home Delivery & Support",
    description:
      "Your medication ships directly to your door. Your provider is always available for ongoing guidance.",
  },
];

const features = [
  {
    title: "Licensed Providers",
    description:
      "Every consultation is with a board-certified healthcare professional licensed in your state.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "All-Inclusive Pricing",
    description:
      "One monthly price covers your medication, consultations, shipping, and ongoing provider support. No hidden fees.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    title: "Discreet Home Delivery",
    description:
      "Your medication and supplies are shipped in discreet packaging directly to your doorstep.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v11.25m-18 0h18" />
      </svg>
    ),
  },
  {
    title: "Ongoing Medical Support",
    description:
      "Your provider monitors your progress with regular check-ins, adjusting your treatment plan as needed.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Clinically Proven Results",
    description:
      "GLP-1 medications have been shown in clinical trials to help patients lose an average of 15% of body weight.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Compounded for Affordability",
    description:
      "We use compounded semaglutide from FDA-regulated pharmacies — the same active ingredient at a fraction of brand-name cost.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];
