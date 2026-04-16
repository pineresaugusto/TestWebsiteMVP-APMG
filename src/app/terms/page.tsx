import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service — Nuvela",
  description:
    "The terms that govern your use of the Nuvela website, including limitations, disclaimers, and the scope of our services.",
};

const EFFECTIVE_DATE = "April 13, 2026";

export default function Terms() {
  return (
    <>
      <PageHero
        size="sm"
        kicker="Legal"
        title="Terms of Service"
        description={<span className="text-foreground/60">Effective date: {EFFECTIVE_DATE}</span>}
      />

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <h2 className="font-display text-xl text-foreground">In plain language</h2>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70 leading-relaxed list-disc pl-5">
              <li>Using this website does not create a doctor-patient relationship.</li>
              <li>Information on the website is not medical advice.</li>
              <li>
                Any actual treatment is subject to evaluation by an independent licensed provider,
                applicable pharmacy policies, and geographic availability.
              </li>
              <li>
                Completing the assessment is not an offer or guarantee that you will be
                prescribed or receive medication, or that anything will ship within a particular
                timeframe.
              </li>
              <li>
                The information you provide needs to be honest and current — eligibility and
                clinical decisions depend on it.
              </li>
              <li>
                These Terms may change. Continuing to use the site after we update them means you
                accept the updated version.
              </li>
            </ul>
          </div>

          <Prose>
            <Section title="1. Acceptance of these Terms">
              <p>
                By accessing or using the Nuvela website (the &ldquo;Site&rdquo;), you agree to be
                bound by these Terms of Service (&ldquo;Terms&rdquo;) and by our{" "}
                <Link
                  href="/privacy"
                  className="text-primary-dark underline hover:text-primary"
                >
                  Privacy Policy
                </Link>
                . If you do not agree, please do not use the Site.
              </p>
            </Section>

            <Section title="2. What Nuvela is and is not">
              <p>
                Nuvela is a technology platform that is being built to connect prospective
                patients with independent licensed healthcare providers and licensed pharmacies.
                Nuvela itself does not practice medicine, does not provide medical advice, and
                does not compound, prescribe, or dispense medication.
              </p>
              <p>
                Any clinical decisions, including whether to prescribe any medication and which
                medication or dosage is appropriate, are made solely by the licensed provider
                based on their independent professional judgment. The provider may decline to
                prescribe for any clinically appropriate reason, and nothing on the Site is an
                offer, promise, or guarantee that a prescription will be issued, that any
                particular medication will be recommended, or that any medication will be
                dispensed.
              </p>
              <p>
                Providers and pharmacies who participate through the Site are independent third
                parties. They are responsible for their own professional services, clinical
                judgment, recordkeeping, licensure, and compliance with applicable laws. Nuvela
                is not responsible for the acts or omissions of any independent provider or
                pharmacy.
              </p>
            </Section>

            <Section title="3. No medical advice; no doctor-patient relationship">
              <p>
                Content on the Site is provided for general informational and educational purposes
                only. It is not a substitute for professional medical advice, diagnosis, or
                treatment. Accessing or using the Site, including completing the online
                assessment, does not by itself create a doctor-patient relationship between you
                and Nuvela or any provider.
              </p>
              <p>
                Always seek the advice of your physician or other qualified health provider with
                any questions you may have regarding a medical condition. Never disregard
                professional medical advice or delay seeking it because of something you have read
                on this Site.
              </p>
            </Section>

            <Section title="4. Eligibility, availability, and fulfillment">
              <p>
                You must be at least 18 years old to use the Site&apos;s services. Services are
                limited to residents of states where our provider and pharmacy partners are
                operating, which may change over time. Nothing on the Site is a guarantee of
                availability in any particular state, at any particular time, or on any
                particular timeline.
              </p>
              <p>
                Passing the online assessment indicates only that a candidate may be appropriate
                for a provider consultation. It is not a medical determination, an offer of
                treatment, or a guarantee that you will be prescribed or dispensed any
                medication. Final eligibility is determined by the treating provider.
              </p>
              <p>
                If medication is prescribed, its preparation and shipment are handled by an
                independent licensed pharmacy. Nuvela does not guarantee that medication will be
                available, that any particular formulation will be in stock, that shipping will
                occur within any specific timeframe, or that service will be uninterrupted.
                Availability can be affected by pharmacy capacity, supply-chain conditions,
                regulatory action, clinical review, shipping carriers, weather, and other
                factors outside of our control.
              </p>
            </Section>

            <Section title="5. Illustrative pricing">
              <p>
                Plan pricing shown on the Site is illustrative and subject to change. Final
                pricing for any services or medication is determined at the time of your
                consultation and depends on your individual treatment plan, the pharmacy serving
                you, and other factors. Publication of pricing on the Site is not an offer to
                sell or an offer to dispense medication.
              </p>
            </Section>

            <Section title="6. Your responsibilities">
              <p>When using the Site, you agree to:</p>
              <ul>
                <li>Provide accurate, current, complete, and truthful information.</li>
                <li>
                  Not misrepresent your identity, age, residency, medical history, current
                  medications, or any other information you submit.
                </li>
                <li>
                  Update your information promptly if it changes during or after your
                  consultation.
                </li>
                <li>Use the Site only for lawful purposes, and only for your own care.</li>
                <li>
                  Not attempt to access, tamper with, or disrupt the Site, its infrastructure, or
                  other users.
                </li>
              </ul>
              <p>
                Accurate information is essential. Eligibility results, provider clinical
                decisions, medication selection, and dosing all rely on what you tell us. You
                accept responsibility for outcomes that result from information you submit that
                is false, incomplete, or out of date, including any provider decision that would
                have been different had accurate information been provided.
              </p>
            </Section>

            <Section title="7. Intellectual property">
              <p>
                The Site and its content, including text, graphics, logos, and software, are the
                property of Nuvela or its licensors and are protected by intellectual property
                laws. You may not copy, modify, distribute, or create derivative works without our
                prior written permission, except for ordinary personal use of the Site.
              </p>
            </Section>

            <Section title="8. Third-party providers, pharmacies, and services">
              <p>
                The Site may reference or link to third-party websites, services, providers, or
                pharmacies. Licensed providers and licensed pharmacies who work with patients
                through the Site are independent third parties. They are solely responsible for
                their professional services, clinical decisions, compounding, dispensing,
                labeling, packaging, shipping, and compliance with applicable laws and
                professional standards.
              </p>
              <p>
                Nuvela is not a provider of medical care, not a pharmacy, and not a shipper. We
                do not supervise the practice of medicine or pharmacy, and we are not
                responsible for the content, policies, or practices of any third party, including
                any act or omission by any independent provider, pharmacy, laboratory, telehealth
                platform, or carrier.
              </p>
            </Section>

            <Section title="9. Disclaimers">
              <p>
                THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
                WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT. NUVELA DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR
                ERROR-FREE, OR THAT ANY INFORMATION ON THE SITE IS ACCURATE, COMPLETE, OR
                CURRENT.
              </p>
              <p>
                WITHOUT LIMITING THE FOREGOING, NUVELA MAKES NO WARRANTY, REPRESENTATION, OR
                GUARANTEE THAT: (A) ANY USER WILL BE FOUND ELIGIBLE FOR TREATMENT OR WILL BE
                PRESCRIBED ANY MEDICATION; (B) ANY MEDICATION WILL BE DISPENSED, AVAILABLE, IN
                STOCK, OR SUITABLE FOR ANY USER; (C) ANY TREATMENT WILL PRODUCE ANY PARTICULAR
                CLINICAL OR WEIGHT-RELATED OUTCOME; OR (D) ANY SERVICE, CONSULTATION, OR SHIPMENT
                WILL OCCUR WITHIN ANY SPECIFIC TIMEFRAME OR WITHOUT INTERRUPTION.
              </p>
            </Section>

            <Section title="10. Limitation of liability">
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, NUVELA AND ITS OFFICERS, DIRECTORS,
                EMPLOYEES, AGENTS, AFFILIATES, AND LICENSORS WILL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR
                FOR ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR OPPORTUNITY, ARISING OUT OF
                OR RELATING TO YOUR USE OF OR INABILITY TO USE THE SITE, ANY INTERRUPTION OR
                DELAY IN SERVICES OR FULFILLMENT, ANY DECISION TO PRESCRIBE OR DECLINE TO
                PRESCRIBE, OR ANY ACT OR OMISSION OF ANY INDEPENDENT PROVIDER OR PHARMACY, EVEN
                IF NUVELA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                OUR TOTAL AGGREGATE LIABILITY FOR ANY AND ALL CLAIMS RELATED TO THE SITE WILL NOT
                EXCEED ONE HUNDRED U.S. DOLLARS ($100). THESE LIMITATIONS APPLY REGARDLESS OF THE
                LEGAL THEORY (CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE) AND FORM AN
                ESSENTIAL BASIS OF THE BARGAIN BETWEEN YOU AND NUVELA.
              </p>
              <p>
                Nothing in these Terms limits liability that cannot be limited under applicable
                law, including liability for gross negligence, willful misconduct, or fraud where
                applicable law does not permit such limitation.
              </p>
            </Section>

            <Section title="11. Indemnification">
              <p>
                You agree to indemnify and hold harmless Nuvela and its officers, employees, and
                agents from any claim, demand, or damages arising out of your use of the Site,
                your breach of these Terms, or your violation of any rights of another.
              </p>
            </Section>

            <Section title="12. Changes to these Terms">
              <p>
                We may update these Terms from time to time. When we do, we will change the
                effective date at the top of this page. Your continued use of the Site after
                changes become effective constitutes acceptance of the updated Terms.
              </p>
            </Section>

            <Section title="13. Governing law">
              <p>
                These Terms are governed by the laws of the state in which Nuvela is organized,
                without regard to conflict of laws principles. Any dispute relating to these Terms
                or the Site will be resolved in the courts located in that jurisdiction, unless
                applicable law requires otherwise.
              </p>
            </Section>

            <Section title="14. Contact">
              <p>
                Questions about these Terms should be directed to the contact channels listed on
                the Site.
              </p>
            </Section>
          </Prose>

          <div className="mt-12 text-sm text-foreground/60">
            See also:{" "}
            <Link href="/privacy" className="text-primary-dark underline hover:text-primary">
              Privacy Policy
            </Link>
            {" "}and{" "}
            <Link
              href="/medical-disclaimer"
              className="text-primary-dark underline hover:text-primary"
            >
              Medical Disclaimer
            </Link>
            .
          </div>
        </div>
      </section>
    </>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mt-10 space-y-8 text-foreground/80">{children}</div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl md:text-2xl text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mt-3 [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}
