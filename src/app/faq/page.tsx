import type { Metadata } from "next";
import Link from "next/link";
import FAQItem from "@/components/FAQItem";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";

// FAQ has the highest organic-keyword density on the site — every
// section here matches a real question pattern people search
// ("BMI for GLP-1", "compounded semaglutide vs Ozempic", etc.).
// FAQPage JSON-LD below makes those Q&A pairs eligible for
// rich-result rendering on Google.
export const metadata: Metadata = {
  title: "GLP-1 Weight Loss FAQ — Eligibility, Pricing, Safety",
  description:
    "Answers to common GLP-1 weight loss questions: who qualifies, how compounded semaglutide compares to Ozempic and Wegovy, pricing, delivery, side effects, and how Nuvela works.",
  alternates: { canonical: "/faq" },
  openGraph: {
    url: "/faq",
    title: `GLP-1 Weight Loss FAQ | ${SITE_NAME}`,
    description:
      "Eligibility, pricing, safety, delivery, and how the platform works — straight answers.",
  },
};

type QA = { q: string; a: React.ReactNode };
type Section = { title: string; items: QA[] };

// Plain-text mirror of the Q&A content used for FAQPage JSON-LD only.
// Lives beside SECTIONS deliberately so any drift is visible at a
// glance during edits. Keep wording substantively identical to the
// rich React versions below — Google compares the rendered DOM with
// the structured data and may demote rich results when they diverge.
const FAQ_JSONLD: { q: string; a: string }[] = [
  {
    q: "What is Nuvela?",
    a: "Nuvela is a telehealth platform being built to connect adults exploring GLP-1 weight loss treatment with licensed healthcare providers. Eligible patients can be evaluated online, receive a prescription if appropriate, and have treatment shipped to their home as part of a monthly plan.",
  },
  {
    q: "Is Nuvela a pharmacy or a medical practice?",
    a: "Neither. Nuvela is a technology platform. Medical care is provided by independent licensed healthcare providers, and medications are dispensed by separately licensed pharmacies. Nuvela does not practice medicine and does not compound or dispense medication.",
  },
  {
    q: "Who is Nuvela for?",
    a: "Adults (18+) who meet clinical criteria for GLP-1 therapy and who live in a state where Nuvela's provider network is available. A licensed provider makes the final determination after reviewing your intake and a consultation.",
  },
  {
    q: "How do I know if I'm eligible?",
    a: "Our intake assessment gives you an initial indication based on age, BMI, and reported medical history. The online result is not a diagnosis. Final eligibility is determined by a licensed provider during a consultation, using the full clinical picture.",
  },
  {
    q: "What BMI qualifies for GLP-1 therapy?",
    a: "Clinical guidelines generally support GLP-1 treatment for adults with a BMI of 30 or higher, or a BMI of 27 or higher when an associated condition (such as type 2 diabetes, high blood pressure, or sleep apnea) is present. The intake assessment uses these thresholds as a starting point.",
  },
  {
    q: "Are there conditions that would disqualify me?",
    a: "Some conditions make GLP-1 therapy unsafe or inadvisable. These include a personal or family history of medullary thyroid carcinoma, multiple endocrine neoplasia syndrome type 2 (MEN 2), and a history of pancreatitis. Other conditions may require additional evaluation. Your provider will review all of this with you.",
  },
  {
    q: "Can I use Nuvela if I'm pregnant or breastfeeding?",
    a: "No. GLP-1 medications are not recommended during pregnancy or breastfeeding. If this applies to you, please consult your primary care provider or OB-GYN for guidance.",
  },
  {
    q: "What medication is prescribed?",
    a: "If your provider determines it is appropriate, you may be prescribed a compounded form of semaglutide. Compounded medications are prepared by state-licensed pharmacies and are not FDA-approved products. Brand-name options may also be discussed depending on availability and insurance.",
  },
  {
    q: "What are the common side effects?",
    a: "Commonly reported side effects of GLP-1 therapy include nausea, reduced appetite, constipation or diarrhea, fatigue, and injection-site reactions. Most are mild and resolve as your body adjusts. Serious side effects are rare but possible. Your provider will review the full risk profile before you begin treatment.",
  },
  {
    q: "How is the medication administered?",
    a: "GLP-1 treatment is typically self-administered as a once-weekly subcutaneous injection using a small needle. Your care team will walk you through the technique, and injection supplies are included with your plan.",
  },
  {
    q: "Is compounded semaglutide the same as Ozempic or Wegovy?",
    a: "Compounded semaglutide shares the same active ingredient as the brand-name products but is not the same FDA-approved product. Compounded medications are legally prepared by licensed pharmacies for patient-specific needs and are not reviewed by the FDA for safety, effectiveness, or quality in the same way branded products are. Your provider will discuss the trade-offs with you.",
  },
  {
    q: "What is included in the monthly price?",
    a: "Plan pricing shown on the Pricing page is designed to bundle the medication, provider consultations, injection supplies, and ongoing care-team access. Final pricing is confirmed during your consultation based on your individual treatment plan.",
  },
  {
    q: "Does Nuvela accept insurance?",
    a: "Nuvela's plans are currently designed as a self-pay, subscription-style model. Compounded GLP-1 medications are generally not covered by insurance. Your provider may discuss insurance-covered alternatives during your consultation.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. All plans are designed to be cancellable at any time before your next shipment. You will not be charged for shipments that have not yet been prepared.",
  },
  {
    q: "How is the medication shipped?",
    a: "Medication is shipped directly to your home in discreet, temperature-controlled packaging by a licensed pharmacy. Tracking information is provided so you know when to expect delivery. An adult signature may be required.",
  },
  {
    q: "How should I store the medication?",
    a: "Most GLP-1 medications should be refrigerated. Your shipment will include storage and handling instructions. If your package is delayed or arrives warm, contact your care team before using it.",
  },
  {
    q: "What does Nuvela do with my health information?",
    a: "How your information is collected, used, and protected is described in our Privacy Policy. In short: information you share in the online intake is used to help a provider evaluate you, and is handled with care appropriate to its sensitivity.",
  },
  {
    q: "Is this site a substitute for my regular doctor?",
    a: "No. Nuvela is not a replacement for primary care. We strongly recommend you continue to see your primary care provider for non-weight-related health concerns and share your GLP-1 treatment plan with them.",
  },
];

const faqJsonLd = [
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_JSONLD.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  },
];

const SECTIONS: Section[] = [
  {
    title: "General",
    items: [
      {
        q: "What is Nuvela?",
        a: (
          <>
            Nuvela is a telehealth platform being built to connect adults exploring GLP-1 weight
            loss treatment with licensed healthcare providers. Eligible patients can be evaluated
            online, receive a prescription if appropriate, and have treatment shipped to their home
            as part of a monthly plan.
          </>
        ),
      },
      {
        q: "Is Nuvela a pharmacy or a medical practice?",
        a: (
          <>
            Neither. Nuvela is a technology platform. Medical care is provided by independent
            licensed healthcare providers, and medications are dispensed by separately licensed
            pharmacies. Nuvela does not practice medicine and does not compound or dispense
            medication.
          </>
        ),
      },
      {
        q: "Who is Nuvela for?",
        a: (
          <>
            Adults (18+) who meet clinical criteria for GLP-1 therapy and who live in a state where
            Nuvela&apos;s provider network is available. A licensed provider makes the final
            determination after reviewing your intake and a consultation.
          </>
        ),
      },
    ],
  },
  {
    title: "Eligibility",
    items: [
      {
        q: "How do I know if I'm eligible?",
        a: (
          <>
            Our intake assessment gives you an initial indication based on age, BMI, and reported
            medical history. The online result is not a diagnosis. Final eligibility is determined
            by a licensed provider during a consultation, using the full clinical picture.
          </>
        ),
      },
      {
        q: "What BMI qualifies for GLP-1 therapy?",
        a: (
          <>
            Clinical guidelines generally support GLP-1 treatment for adults with a BMI of 30 or
            higher, or a BMI of 27 or higher when an associated condition (such as type 2 diabetes,
            high blood pressure, or sleep apnea) is present. The intake assessment uses these
            thresholds as a starting point.
          </>
        ),
      },
      {
        q: "Are there conditions that would disqualify me?",
        a: (
          <>
            Some conditions make GLP-1 therapy unsafe or inadvisable. These include a personal or
            family history of medullary thyroid carcinoma, multiple endocrine neoplasia syndrome
            type 2 (MEN 2), and a history of pancreatitis. Other conditions may require additional
            evaluation. Your provider will review all of this with you.
          </>
        ),
      },
      {
        q: "Can I use Nuvela if I'm pregnant or breastfeeding?",
        a: (
          <>
            No. GLP-1 medications are not recommended during pregnancy or breastfeeding. If this
            applies to you, please consult your primary care provider or OB-GYN for guidance.
          </>
        ),
      },
    ],
  },
  {
    title: "Medication & Safety",
    items: [
      {
        q: "What medication is prescribed?",
        a: (
          <>
            If your provider determines it is appropriate, you may be prescribed a compounded form
            of semaglutide. Compounded medications are prepared by state-licensed pharmacies and are
            not FDA-approved products. Brand-name options may also be discussed depending on
            availability and insurance.
          </>
        ),
      },
      {
        q: "What are the common side effects?",
        a: (
          <>
            Commonly reported side effects of GLP-1 therapy include nausea, reduced appetite,
            constipation or diarrhea, fatigue, and injection-site reactions. Most are mild and
            resolve as your body adjusts. Serious side effects are rare but possible. Your provider
            will review the full risk profile before you begin treatment.
          </>
        ),
      },
      {
        q: "How is the medication administered?",
        a: (
          <>
            GLP-1 treatment is typically self-administered as a once-weekly subcutaneous injection
            using a small needle. Your care team will walk you through the technique, and injection
            supplies are included with your plan.
          </>
        ),
      },
      {
        q: "Is compounded semaglutide the same as Ozempic or Wegovy?",
        a: (
          <>
            Compounded semaglutide shares the same active ingredient as the brand-name products but
            is not the same FDA-approved product. Compounded medications are legally prepared by
            licensed pharmacies for patient-specific needs and are not reviewed by the FDA for
            safety, effectiveness, or quality in the same way branded products are. Your provider
            will discuss the trade-offs with you.
          </>
        ),
      },
    ],
  },
  {
    title: "Pricing & Billing",
    items: [
      {
        q: "What is included in the monthly price?",
        a: (
          <>
            Plan pricing shown on the{" "}
            <Link href="/pricing" className="text-primary-dark underline hover:text-primary">
              Pricing page
            </Link>{" "}
            is designed to bundle the medication, provider consultations, injection supplies, and
            ongoing care-team access. Final pricing is confirmed during your consultation based on
            your individual treatment plan.
          </>
        ),
      },
      {
        q: "Does Nuvela accept insurance?",
        a: (
          <>
            Nuvela&apos;s plans are currently designed as a self-pay, subscription-style model.
            Compounded GLP-1 medications are generally not covered by insurance. Your provider may
            discuss insurance-covered alternatives during your consultation.
          </>
        ),
      },
      {
        q: "Can I cancel anytime?",
        a: (
          <>
            Yes. All plans are designed to be cancellable at any time before your next shipment. You
            will not be charged for shipments that have not yet been prepared.
          </>
        ),
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        q: "How is the medication shipped?",
        a: (
          <>
            Medication is shipped directly to your home in discreet, temperature-controlled
            packaging by a licensed pharmacy. Tracking information is provided so you know when to
            expect delivery. An adult signature may be required.
          </>
        ),
      },
      {
        q: "How should I store the medication?",
        a: (
          <>
            Most GLP-1 medications should be refrigerated. Your shipment will include storage and
            handling instructions. If your package is delayed or arrives warm, contact your care
            team before using it.
          </>
        ),
      },
    ],
  },
  {
    title: "Your Data",
    items: [
      {
        q: "What does Nuvela do with my health information?",
        a: (
          <>
            How your information is collected, used, and protected is described in our{" "}
            <Link href="/privacy" className="text-primary-dark underline hover:text-primary">
              Privacy Policy
            </Link>
            . In short: information you share in the online intake is used to help a provider
            evaluate you, and is handled with care appropriate to its sensitivity.
          </>
        ),
      },
      {
        q: "Is this site a substitute for my regular doctor?",
        a: (
          <>
            No. Nuvela is not a replacement for primary care. We strongly recommend you continue to
            see your primary care provider for non-weight-related health concerns and share your
            GLP-1 treatment plan with them.
          </>
        ),
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <PageHero
        size="sm"
        kicker="FAQ"
        title="Frequently asked questions"
        description="Straight answers about eligibility, treatment, safety, and how Nuvela works."
      />

      {/* Sections */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-14">
          {SECTIONS.map((section, sIdx) => (
            <Reveal key={section.title} delay={sIdx * 60}>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <FAQItem key={`${section.title}-${i}`} q={item.q}>
                    {item.a}
                  </FAQItem>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Bottom disclaimer */}
          <Reveal as="div" className="rounded-2xl border border-secondary/40 bg-white p-6">
            <p className="text-sm text-foreground/60 leading-relaxed">
              The information on this page is for educational purposes only and is not medical
              advice. Individual results vary. Compounded semaglutide is not an FDA-approved
              product. Please review our{" "}
              <Link
                href="/medical-disclaimer"
                className="text-primary-dark underline hover:text-primary"
              >
                Medical Disclaimer
              </Link>{" "}
              for additional information.
            </p>
          </Reveal>

          <Reveal as="div" className="text-center">
            <p className="text-sm text-foreground/60">Still have a question?</p>
            <Link
              href="/get-started"
              className="mt-4 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Start the Assessment
            </Link>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
