import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <>
      <PageHero
        kicker="About"
        title={
          <>
            About <em className="not-italic text-primary-dark">Nuvela</em>
          </>
        }
        description="We believe everyone deserves access to clinically-studied weight-loss care — without the barriers, the stigma, or the confusion."
      />

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="font-display text-3xl md:text-[2.5rem] leading-[1.1] text-foreground">
                Our mission
              </h2>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
                Nuvela exists to make GLP-1 weight loss treatment accessible, affordable, and
                genuinely supportive. We&apos;re not selling a quick fix — we&apos;re building a
                medical platform that connects patients with licensed providers for guided,
                evidence-based weight management.
              </p>
              <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
                Too many people who could benefit from these proven treatments face barriers: long wait
                times, high costs, confusing insurance processes, or simply not knowing where to
                start. Nuvela removes those barriers through telehealth, making expert care as simple
                as picking up your phone.
              </p>
            </div>
            <Reveal delay={120}>
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary-light shadow-lg shadow-primary/5">
                <Image
                  src="/images/about-outdoor.jpg"
                  alt="Woman walking outdoors on a sunlit path"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-[2.5rem] leading-[1.1] text-foreground">
                Why traditional approaches fall short
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                For decades, weight loss advice has boiled down to &quot;eat less, move more.&quot;
                While lifestyle changes are important, research shows that for many people with
                obesity, willpower alone isn&apos;t enough. Biology works against you — hormones
                that regulate hunger and metabolism can make sustained weight loss extremely
                difficult.
              </p>
              <p className="mt-4 text-foreground/70 leading-relaxed">
                GLP-1 medications represent a breakthrough because they work{" "}
                <em>with</em> your biology rather than against it. By mimicking a natural hormone,
                they help regulate appetite at the neurological level — reducing the constant hunger
                and cravings that derail so many weight loss efforts.
              </p>
            </div>
            <div className="space-y-3.5">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80}>
                  <div className="rounded-2xl bg-background p-6 border border-secondary/40 hover:border-primary/30 transition-colors">
                    <div className="font-display text-4xl text-primary-dark leading-none">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-sm text-foreground/65">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How the Platform Works */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark">
              The platform
            </p>
            <h2 className="mt-5 font-display text-3xl md:text-[2.5rem] leading-[1.1] text-foreground">
              How our platform works
            </h2>
            <p className="mt-4 text-foreground/70">
              Nuvela is the connective layer between patients, providers, and pharmacies.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {platformParts.map((part, i) => (
              <Reveal key={part.title} delay={i * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    {part.icon}
                  </div>
                  <h3 className="font-display text-xl text-foreground">{part.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                    {part.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-[2.5rem] leading-[1.1] text-foreground text-center">
            Built on trust & safety
          </h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustElements.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-foreground/60">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
            A gentler way to start
          </h2>
          <p className="mt-5 text-white/85 max-w-xl mx-auto">
            The assessment is free and takes about 5 minutes. No commitment, no insurance needed.
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

const stats = [
  { value: "42%", label: "of US adults live with obesity — it's a medical condition, not a character flaw" },
  { value: "~15%", label: "average body weight lost with semaglutide in clinical trials" },
  { value: "$1,300+", label: "monthly cost of brand-name GLP-1 medications without insurance" },
  { value: "80%+", label: "of patients who lose weight through dieting alone regain it within 5 years" },
];

const platformParts = [
  {
    title: "Provider Network",
    description:
      "Board-certified healthcare providers licensed in your state conduct consultations and make all medical decisions independently.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Telehealth Platform",
    description:
      "HIPAA-compliant virtual visits, secure messaging, and digital health assessments — all from the comfort of your home.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "Pharmacy Partners",
    description:
      "FDA-regulated 503B compounding pharmacies prepare your medication following strict quality and safety standards.",
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
  },
];

const trustElements = [
  {
    title: "Licensed Providers",
    description: "Every provider is board-certified and licensed in the states where they practice.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "FDA-Regulated Pharmacies",
    description: "Medications prepared in 503B outsourcing facilities following cGMP standards.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: "HIPAA Compliant",
    description: "Your health data is encrypted and protected. We never share without your consent.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Medical Oversight",
    description: "All prescribing decisions are made by independent licensed healthcare providers.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
  },
];
