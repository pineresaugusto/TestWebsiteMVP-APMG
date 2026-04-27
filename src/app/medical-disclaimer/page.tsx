import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Medical Disclaimer — Nuvela",
  description:
    "Important information about the educational nature of the Nuvela website, compounded semaglutide, and the role of your licensed provider.",
};

export default function MedicalDisclaimer() {
  return (
    <>
      <PageHero
        size="sm"
        kicker="Legal"
        title="Medical Disclaimer"
        description="Please read carefully before relying on any information on this website."
      />

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Callout>
            Content on this website is provided for general informational and educational
            purposes only. It is not medical advice and should not be used as a substitute for
            professional diagnosis or treatment. Always consult a qualified healthcare provider
            about your individual situation.
          </Callout>

          <Block title="No doctor-patient relationship">
            <p>
              Using this website, reading its content, or completing the online assessment does
              not create a doctor-patient relationship between you and Nuvela or any provider. A
              doctor-patient relationship only begins when a licensed provider formally accepts
              you as a patient after a consultation.
            </p>
          </Block>

          <Block title="Individual results vary">
            <p>
              Research cited on this site, including studies of GLP-1 receptor agonists such as
              semaglutide, reports average outcomes in study populations. Your own experience may
              differ substantially. Weight loss and health outcomes depend on many factors,
              including medical history, diet, activity, adherence, dosing, and individual
              biology. No specific result is promised or guaranteed.
            </p>
          </Block>

          <Block title="Compounded semaglutide is not FDA-approved">
            <p>
              If a provider prescribes compounded semaglutide, you should understand that
              compounded medications are prepared by state-licensed pharmacies for
              patient-specific needs and are not FDA-approved products. Compounded medications do
              not undergo the same FDA review for safety, effectiveness, or quality as
              commercially manufactured products such as Ozempic&reg; or Wegovy&reg;. This is an
              important trade-off that your provider and pharmacy should discuss with you,
              including any risks specific to compounded preparations.
            </p>
            <p>
              Ozempic&reg; and Wegovy&reg; are registered trademarks of their respective owners.
              Nuvela is not affiliated with, endorsed by, or sponsored by any brand-name
              manufacturer.
            </p>
          </Block>

          <Block title="Potential risks and side effects">
            <p>
              GLP-1 therapy can cause side effects. Commonly reported side effects include nausea,
              vomiting, diarrhea, constipation, abdominal pain, reduced appetite, fatigue, and
              injection-site reactions. Less common but serious risks may include pancreatitis,
              gallbladder problems, kidney problems, serious allergic reactions, and others.
            </p>
            <p>
              Certain conditions make GLP-1 therapy unsafe or inadvisable, including a personal or
              family history of medullary thyroid carcinoma, multiple endocrine neoplasia syndrome
              type 2 (MEN 2), and a history of pancreatitis. GLP-1 therapy is not recommended
              during pregnancy or breastfeeding.
            </p>
            <p>
              Your licensed provider is responsible for reviewing the full risk profile with you
              before starting any treatment. If you experience severe abdominal pain, signs of an
              allergic reaction, or other concerning symptoms, seek medical care immediately.
            </p>
          </Block>

          <Block title="Emergencies">
            <p>
              If you believe you are experiencing a medical emergency, call 911 or go to the
              nearest emergency room. The Nuvela website is not intended for use in medical
              emergencies.
            </p>
          </Block>

          <Block title="Your provider has the final word">
            <p>
              All clinical decisions, including whether a medication is appropriate for you, which
              medication to prescribe, and at what dose, are made solely by your licensed
              healthcare provider based on their independent medical judgment. Nuvela does not
              practice medicine and does not override or second-guess clinical decisions.
            </p>
          </Block>

          <div className="pt-6 text-sm text-foreground/60">
            See also:{" "}
            <Link href="/privacy" className="text-primary-dark underline hover:text-primary">
              Privacy Policy
            </Link>
            ,{" "}
            <Link href="/terms" className="text-primary-dark underline hover:text-primary">
              Terms of Service
            </Link>
            , and{" "}
            <Link href="/faq" className="text-primary-dark underline hover:text-primary">
              FAQ
            </Link>
            .
          </div>
        </div>
      </section>
    </>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <Reveal as="div" className="rounded-2xl border border-accent/40 bg-accent/5 p-6 md:p-8">
      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">{children}</p>
    </Reveal>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="div" className="rounded-2xl border border-secondary/40 bg-white p-6 md:p-8">
      <h2 className="font-display text-xl md:text-2xl text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-foreground/70 leading-relaxed">{children}</div>
    </Reveal>
  );
}
