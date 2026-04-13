import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary-light/40 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary-dark uppercase tracking-wide mb-4">
                Clinically-proven weight loss
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
                Your weight loss journey,{" "}
                <span className="text-primary">guided by experts</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed max-w-lg">
                Nuvela connects you with licensed healthcare providers for personalized GLP-1
                treatment — delivered to your door with ongoing medical support.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/get-started"
                  className="rounded-full bg-accent px-8 py-3.5 text-center text-base font-semibold text-white hover:bg-accent-dark transition-colors"
                >
                  See If You Qualify
                </Link>
                <Link
                  href="/how-it-works"
                  className="rounded-full border-2 border-primary/30 px-8 py-3.5 text-center text-base font-semibold text-primary-dark hover:bg-primary/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-foreground/50">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Licensed providers
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Home delivery
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Ongoing support
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary/20 to-secondary-light overflow-hidden flex items-end justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-primary-dark/70">
                    Patients report an average of 15-20% body weight reduction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Are GLP-1s */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What are GLP-1 medications?
            </h2>
            <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
              GLP-1 receptor agonists are a class of prescription medications originally developed
              for type 2 diabetes that have been shown to significantly reduce body weight. They work
              by mimicking a natural hormone that regulates appetite, helping you feel fuller longer
              and reducing cravings.
            </p>
            <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
              In clinical trials, patients using semaglutide lost an average of{" "}
              <strong className="text-foreground">15% of their body weight</strong> — a result that
              was previously achievable only through bariatric surgery.
            </p>
            <Link
              href="/how-it-works"
              className="mt-8 inline-flex items-center gap-2 text-primary-dark font-semibold hover:text-primary transition-colors"
            >
              Learn more about how it works
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How Nuvela works
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              From assessment to your doorstep — in four simple steps.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-xl font-bold text-primary">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nuvela */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why choose Nuvela
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              We make weight loss treatment accessible, affordable, and supported.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-secondary/40 bg-background p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to start your journey?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Take our free 5-minute assessment to see if GLP-1 treatment is right for you. No
            commitment required.
          </p>
          <Link
            href="/get-started"
            className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-base font-semibold text-primary-dark hover:bg-white/90 transition-colors"
          >
            See If You Qualify
          </Link>
        </div>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "All-Inclusive Pricing",
    description:
      "One monthly price covers your medication, consultations, shipping, and ongoing provider support. No hidden fees.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    title: "Discreet Home Delivery",
    description:
      "Your medication and supplies are shipped in discreet packaging directly to your doorstep.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v11.25m-18 0h18" />
      </svg>
    ),
  },
  {
    title: "Ongoing Medical Support",
    description:
      "Your provider monitors your progress with regular check-ins, adjusting your treatment plan as needed.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Clinically Proven Results",
    description:
      "GLP-1 medications have been shown in clinical trials to help patients lose an average of 15% of body weight.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Compounded for Affordability",
    description:
      "We use compounded semaglutide from FDA-regulated pharmacies — the same active ingredient at a fraction of brand-name cost.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];
