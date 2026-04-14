"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function HowItWorks() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title={
          <>
            How Nuvela <em className="not-italic text-primary-dark">works</em>
          </>
        }
        description="From your first assessment to ongoing support — here's exactly what to expect on your weight-loss journey."
      />

      {/* Patient Journey — alternating layout, iconographic tile replaces emoji */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-24">
            {journeySteps.map((step, i) => (
              <Reveal key={step.title}>
                <div
                  className={`flex flex-col md:flex-row items-center gap-10 md:gap-14 ${
                    i % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-3 mb-5">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-display text-base">
                        {i + 1}
                      </span>
                      <span className="text-[11px] font-semibold text-primary-dark uppercase tracking-[0.2em]">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl leading-[1.1] text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-5 text-foreground/70 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2.5 text-sm text-foreground/65"
                        >
                          <svg
                            className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
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
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Iconographic tile — layered sage frame + dotted corner */}
                  <div className="flex-1 w-full">
                    <div className="relative mx-auto max-w-md md:max-w-none">
                      <div
                        aria-hidden
                        className={`absolute w-32 h-32 rounded-3xl bg-dots opacity-60 hidden md:block ${
                          i % 2 !== 0 ? "-top-4 -left-4" : "-top-4 -right-4"
                        }`}
                      />
                      <div className="relative aspect-[4/3] rounded-[1.75rem] bg-gradient-to-br from-primary/25 via-secondary-light to-secondary/50 p-1">
                        <div className="h-full w-full rounded-[1.5rem] bg-background/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-primary-dark">
                            {journeyIcons[i]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About the Medication */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground text-center">
              Understanding GLP-1 medications
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              GLP-1 (glucagon-like peptide-1) receptor agonists are a class of injectable
              medications that mimic a natural hormone produced in your gut. When you eat, your body
              releases GLP-1 to signal fullness and regulate blood sugar. These medications amplify
              that natural process.
            </p>

            <h3 className="mt-10 font-display text-2xl text-foreground">How Semaglutide Works</h3>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              Semaglutide, the active ingredient in our treatment plans, works through three key
              mechanisms:
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-6">
              {mechanisms.map((m) => (
                <div key={m.title} className="rounded-xl bg-background p-6 border border-secondary/40">
                  <h4 className="font-semibold text-foreground">{m.title}</h4>
                  <p className="mt-2 text-sm text-foreground/60">{m.description}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-10 font-display text-2xl text-foreground">Clinical Results</h3>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              In the landmark STEP clinical trial program, participants using semaglutide 2.4mg
              achieved an average weight loss of approximately 15% of their body weight over 68
              weeks. Many participants lost significantly more, with some achieving 20%+ weight
              reduction.
            </p>

            <h3 className="mt-10 font-display text-2xl text-foreground">Common Side Effects</h3>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              Like all medications, GLP-1 treatments can cause side effects. The most common are
              gastrointestinal and typically mild, especially when starting at a low dose:
            </p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {sideEffects.map((effect) => (
                <li key={effect} className="flex items-center gap-2 text-sm text-foreground/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {effect}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-foreground/50">
              Most side effects diminish as your body adjusts. Your provider will start you on a low
              dose and gradually increase to minimize discomfort.
            </p>

            {/* Compounded medication notice */}
            <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/20 p-8">
              <h3 className="font-display text-2xl text-foreground">
                About compounded medications
              </h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">
                Nuvela prescribes <strong>compounded semaglutide</strong>, which contains the same
                active ingredient as brand-name medications like Ozempic&reg; and Wegovy&reg;.
                Compounded medications are prepared by FDA-regulated 503B outsourcing facilities
                following strict quality standards.
              </p>
              <p className="mt-3 text-foreground/70 leading-relaxed">
                Compounding allows us to offer treatment at a significantly lower cost than
                brand-name alternatives, making GLP-1 therapy accessible to more patients.
                Compounded medications are not FDA-approved products, but they are produced in
                FDA-regulated facilities subject to Current Good Manufacturing Practice (cGMP)
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-[2.75rem] leading-[1.1] text-foreground text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
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
            Ready to get started?
          </h2>
          <p className="mt-5 text-white/85 max-w-xl mx-auto">
            Take our free assessment to see if you&apos;re a candidate for GLP-1 treatment.
          </p>
          <Link
            href="/get-started"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-semibold text-primary-dark shadow-lg hover:bg-background hover:-translate-y-[1px] transition-all"
          >
            See If You Qualify
          </Link>
        </div>
      </section>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-secondary/40 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-foreground/40 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-6 text-foreground/70 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

// Iconographic SVG tiles replacing the emoji placeholders. Matched 1:1 to the
// journey-step order below: assessment → consult → delivery → ongoing care.
const journeyIcons = [
  // Clipboard / assessment
  <svg key="assessment" className="w-24 h-24" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.25} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10h18a2 2 0 012 2v28a2 2 0 01-2 2H15a2 2 0 01-2-2V12a2 2 0 012-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v-2a2 2 0 012-2h6a2 2 0 012 2v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 22l3 3 7-7M18 30h12M18 35h8" />
  </svg>,
  // Stethoscope / consultation
  <svg key="consult" className="w-24 h-24" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.25} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 8v12a8 8 0 0016 0V8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 28c0 6 4 10 10 10s10-4 10-10" />
    <circle cx="36" cy="24" r="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="14" cy="8" r="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="30" cy="8" r="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Package / delivery
  <svg key="delivery" className="w-24 h-24" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.25} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l16-8 16 8v16l-16 8-16-8V16z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16l16 8 16-8M24 24v16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l16 8" />
  </svg>,
  // Heart pulse / ongoing care
  <svg key="ongoing" className="w-24 h-24" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={1.25} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M24 40s-14-8-14-20a8 8 0 0114-5 8 8 0 0114 5c0 12-14 20-14 20z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 24h6l3-6 4 12 3-6h12" />
  </svg>,
];

const journeySteps = [
  {
    title: "Complete Your Online Assessment",
    description:
      "Answer a few questions about your health, weight goals, and medical history. Our assessment is designed with input from medical professionals to determine if GLP-1 treatment may be right for you.",
    details: [
      "Takes less than 5 minutes to complete",
      "Secure and confidential",
      "No cost or obligation",
      "Screens for contraindications to keep you safe",
    ],
    emoji: "📋",
  },
  {
    title: "Consult With a Licensed Provider",
    description:
      "A board-certified healthcare provider licensed in your state reviews your assessment and conducts a virtual consultation. They'll answer your questions and determine if GLP-1 treatment is appropriate for you.",
    details: [
      "Board-certified providers only",
      "Virtual visit from home — no office wait times",
      "Thorough medical review before any prescription",
      "Your provider makes all medical decisions",
    ],
    emoji: "👩‍⚕️",
  },
  {
    title: "Receive Your Personalized Treatment",
    description:
      "If your provider determines you're a good candidate, they'll prescribe a treatment plan tailored to your needs. Your medication ships from an FDA-regulated pharmacy directly to your door.",
    details: [
      "Dose starts low and increases gradually",
      "Medication, syringes, and alcohol swabs included",
      "Discreet packaging for your privacy",
      "Free standard shipping on all plans",
    ],
    emoji: "📦",
  },
  {
    title: "Ongoing Support & Monitoring",
    description:
      "Weight loss is a journey, not a one-time event. Your provider monitors your progress with regular check-ins, adjusts dosing as needed, and is available when you have questions.",
    details: [
      "Regular provider check-ins included in your plan",
      "Dose adjustments based on your progress and tolerance",
      "Direct messaging with your care team",
      "Cancel or pause anytime — no long-term contracts",
    ],
    emoji: "💪",
  },
];

const mechanisms = [
  {
    title: "Appetite Reduction",
    description:
      "Signals your brain that you're full, reducing hunger and cravings throughout the day.",
  },
  {
    title: "Slower Digestion",
    description:
      "Slows gastric emptying so food stays in your stomach longer, helping you feel satisfied with smaller portions.",
  },
  {
    title: "Blood Sugar Regulation",
    description:
      "Helps regulate insulin and blood sugar levels, reducing the spikes and crashes that drive overeating.",
  },
];

const sideEffects = [
  "Nausea (most common, usually temporary)",
  "Diarrhea",
  "Constipation",
  "Vomiting",
  "Stomach pain",
  "Headache",
  "Fatigue",
  "Injection site reactions",
];

const faqs = [
  {
    question: "Who is eligible for GLP-1 weight loss treatment?",
    answer:
      "GLP-1 medications are generally prescribed for adults with a BMI of 30 or above (obesity), or a BMI of 27 or above with at least one weight-related health condition such as high blood pressure, type 2 diabetes, or high cholesterol. Your provider will make the final determination based on your complete medical history.",
  },
  {
    question: "What is compounded semaglutide?",
    answer:
      "Compounded semaglutide contains the same active ingredient as brand-name medications like Ozempic® and Wegovy®, but is prepared by FDA-regulated 503B compounding pharmacies. This allows us to offer the medication at a significantly lower cost. Compounded medications are not FDA-approved products themselves, but are produced under strict manufacturing standards in FDA-regulated facilities.",
  },
  {
    question: "How much weight can I expect to lose?",
    answer:
      "Results vary by individual. In clinical trials, patients using semaglutide 2.4mg lost an average of approximately 15% of their body weight over 68 weeks. Your results will depend on your starting weight, adherence to the medication, and lifestyle factors. Your provider will set realistic expectations during your consultation.",
  },
  {
    question: "How is the medication administered?",
    answer:
      "Semaglutide is administered as a once-weekly subcutaneous injection (just under the skin). The injection is simple to self-administer using a small needle, similar to what's used for insulin. Your care team will provide detailed instructions and support.",
  },
  {
    question: "Is the telehealth consultation a real medical visit?",
    answer:
      "Yes. Every consultation is conducted by an independent, board-certified healthcare provider licensed in your state. They review your full medical history, discuss your goals, explain the medication, and make all prescribing decisions. This is a legitimate medical service, not an automated approval process.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can cancel or pause your plan at any time with no penalties or long-term commitments. If you cancel, your current month's medication will be your last shipment. We recommend discussing any changes with your provider first.",
  },
  {
    question: "Which states is Nuvela available in?",
    answer:
      "Nuvela is currently available in select US states. During your assessment, you'll select your state of residence and we'll confirm availability. We're actively expanding to new states and will notify you when service becomes available in your area.",
  },
  {
    question: "What if I'm not eligible for treatment?",
    answer:
      "If our assessment or your provider determines that GLP-1 treatment isn't right for you — whether due to BMI, medical history, or contraindications — we'll let you know clearly and recommend that you speak with your primary care provider about alternative options. Your safety always comes first.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Most orders ship within 3-5 business days of your provider visit. You'll receive tracking information via email so you know exactly when to expect your medication. Priority shipping is available on our Transform plan.",
  },
  {
    question: "Is my information kept private?",
    answer:
      "Absolutely. Nuvela uses a HIPAA-compliant telehealth platform to protect your personal health information. Your data is encrypted and never shared with third parties without your consent. Medication is shipped in discreet, unmarked packaging.",
  },
];
