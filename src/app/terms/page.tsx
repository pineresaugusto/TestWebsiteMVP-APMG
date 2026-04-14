import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Nuvela",
  description:
    "The terms that govern your use of the Nuvela website, including limitations, disclaimers, and the scope of our services.",
};

const EFFECTIVE_DATE = "April 13, 2026";

export default function Terms() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary-light/40 to-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Terms of Service</h1>
          <p className="mt-4 text-sm text-foreground/60">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground">In plain language</h2>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70 leading-relaxed list-disc pl-5">
              <li>Using this website does not create a doctor-patient relationship.</li>
              <li>Information on the website is not medical advice.</li>
              <li>
                Any actual treatment is subject to evaluation by an independent licensed provider,
                applicable pharmacy policies, and geographic availability.
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
                does not compound or dispense medication.
              </p>
              <p>
                Any clinical decisions, including whether to prescribe medication, are made solely
                by the licensed provider based on their independent medical judgment.
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

            <Section title="4. Eligibility and geographic availability">
              <p>
                You must be at least 18 years old to use the Site&apos;s services. Our services
                are limited to residents of states where our provider network and pharmacy
                partners are available, which may change over time. Nothing on the Site should be
                taken as a guarantee of availability in any particular state at any particular
                time.
              </p>
            </Section>

            <Section title="5. Illustrative pricing">
              <p>
                Plan pricing shown on the Site is illustrative and subject to change. Final
                pricing for any services or medication is determined at the time of your
                consultation and depends on your individual treatment plan, the pharmacy serving
                you, and other factors.
              </p>
            </Section>

            <Section title="6. Your responsibilities">
              <p>When using the Site, you agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information.</li>
                <li>
                  Not misrepresent your identity, age, medical history, or other information.
                </li>
                <li>Use the Site only for lawful purposes.</li>
                <li>
                  Not attempt to access, tamper with, or disrupt the Site, its infrastructure, or
                  other users.
                </li>
              </ul>
              <p>
                Accurate information is especially important for the intake assessment, because
                inaccurate responses can affect the eligibility result and any subsequent provider
                decisions.
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

            <Section title="8. Third-party services">
              <p>
                The Site may reference or link to third-party websites, services, or providers.
                Nuvela is not responsible for the content, policies, or practices of any third
                party.
              </p>
            </Section>

            <Section title="9. Disclaimers">
              <p>
                THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT
                WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                NON-INFRINGEMENT. NUVELA DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR
                ERROR-FREE, OR THAT ANY INFORMATION ON THE SITE IS ACCURATE, COMPLETE, OR CURRENT.
              </p>
            </Section>

            <Section title="10. Limitation of liability">
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, NUVELA WILL NOT BE LIABLE FOR ANY
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF
                OR RELATING TO YOUR USE OF THE SITE, EVEN IF NUVELA HAS BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM RELATED TO THE SITE
                WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS ($100).
              </p>
              <p>
                Nothing in these Terms limits liability that cannot be limited under applicable
                law.
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
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mt-3 [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  );
}
