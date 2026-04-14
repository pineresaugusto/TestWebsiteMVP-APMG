import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy — Nuvela",
  description:
    "How Nuvela collects, uses, and protects information you share with us, including information submitted through the online intake assessment.",
};

const EFFECTIVE_DATE = "April 13, 2026";

export default function Privacy() {
  return (
    <>
      <PageHero
        size="sm"
        kicker="Legal"
        title="Privacy Policy"
        description={<span className="text-foreground/60">Effective date: {EFFECTIVE_DATE}</span>}
      />

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Plain-language summary */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <h2 className="font-display text-xl text-foreground">In plain language</h2>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70 leading-relaxed list-disc pl-5">
              <li>
                The online intake form currently does not store your responses on our servers.
                Eligibility is computed in your browser, and results are shown to you only.
              </li>
              <li>
                If you choose to contact us, book a consultation, or begin treatment, we will begin
                collecting and storing information necessary to provide those services.
              </li>
              <li>
                We do not sell your personal or health information.
              </li>
              <li>
                This policy will be updated as our services evolve. The effective date at the top of
                this page shows when it was last changed.
              </li>
            </ul>
          </div>

          <Prose>
            <Section title="1. Who we are">
              <p>
                This Privacy Policy describes how Nuvela (&ldquo;Nuvela,&rdquo; &ldquo;we,&rdquo;
                &ldquo;our,&rdquo; or &ldquo;us&rdquo;) handles information we collect from visitors
                and prospective patients through this website. Nuvela is a technology platform;
                medical care is provided by independent licensed healthcare providers, and
                medications are dispensed by separately licensed pharmacies.
              </p>
            </Section>

            <Section title="2. Information we collect">
              <p>We may collect the following categories of information:</p>
              <ul>
                <li>
                  <strong>Information you provide through the intake assessment.</strong> This may
                  include age, biological sex, state of residence, height, weight, target weight,
                  motivations, medical history, current medications, and prior weight-loss
                  attempts. Today, this information is processed in your browser only and is not
                  transmitted to or stored by Nuvela. This may change as our services expand, in
                  which case we will update this policy and provide notice within the intake
                  experience.
                </li>
                <li>
                  <strong>Contact information.</strong> If you email us, submit a provider
                  application, or otherwise contact us, we collect your name, email address, and
                  any information you include in your message.
                </li>
                <li>
                  <strong>Technical information.</strong> Our hosting and analytics providers may
                  collect standard server logs (IP address, browser type, timestamps) and anonymous
                  usage data. We do not use these to identify you personally.
                </li>
                <li>
                  <strong>Information collected once you become a patient.</strong> If you move
                  forward with a provider consultation and treatment, additional information
                  (including protected health information) will be collected by the licensed
                  provider and pharmacy serving you, subject to their privacy notices and
                  applicable law, including HIPAA where it applies.
                </li>
              </ul>
            </Section>

            <Section title="3. How we use information">
              <p>We use the information we collect to:</p>
              <ul>
                <li>Operate and improve the website and the intake experience.</li>
                <li>Respond to inquiries and provider applications.</li>
                <li>
                  Connect prospective patients with licensed providers, where and when our service
                  is available.
                </li>
                <li>Comply with legal obligations and enforce our Terms of Service.</li>
              </ul>
            </Section>

            <Section title="4. How we share information">
              <p>We do not sell your personal or health information. We may share information:</p>
              <ul>
                <li>
                  With independent licensed healthcare providers and licensed pharmacies, but only
                  when you have initiated a consultation or treatment request.
                </li>
                <li>
                  With service providers that help us operate the website (for example, hosting and
                  email delivery), under contractual obligations to protect your information.
                </li>
                <li>
                  When required by law, legal process, or to protect the rights, safety, or
                  property of Nuvela, our users, or others.
                </li>
                <li>
                  In connection with a business transaction (for example, a merger or acquisition),
                  subject to the continued protection of your information.
                </li>
              </ul>
            </Section>

            <Section title="5. Health information and HIPAA">
              <p>
                Nuvela itself is not currently a HIPAA-covered entity. However, licensed providers
                and pharmacies you interact with through Nuvela are typically covered entities,
                and their handling of your protected health information is governed by HIPAA and
                by their own notices of privacy practices. As Nuvela&apos;s services expand to
                include functions that make Nuvela a business associate or covered entity, this
                policy will be updated accordingly and appropriate agreements and safeguards will
                be put in place.
              </p>
            </Section>

            <Section title="6. Cookies and similar technologies">
              <p>
                The website may use cookies or similar technologies to remember your preferences
                and to understand how the site is used. You can set your browser to refuse
                cookies; some features may not work as intended if you do.
              </p>
            </Section>

            <Section title="7. Data retention">
              <p>
                We retain the information we collect for only as long as is reasonably necessary
                for the purposes described above, or as required by law. Because the intake form
                does not currently store responses, there is nothing to retain from that workflow
                today.
              </p>
            </Section>

            <Section title="8. Security">
              <p>
                We use reasonable administrative, technical, and physical safeguards designed to
                protect the information we collect. No method of transmission or storage is
                perfectly secure, and we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Your choices">
              <p>
                Depending on where you live, you may have rights to access, correct, or delete
                information we hold about you, to object to certain processing, or to receive a
                copy of your information. You can exercise these rights by contacting us using the
                information below. We will respond as required by applicable law.
              </p>
            </Section>

            <Section title="10. Children">
              <p>
                The website and Nuvela&apos;s services are intended for adults 18 and older. We do
                not knowingly collect information from children. If you believe a child has
                provided us with information, please contact us and we will take appropriate
                steps.
              </p>
            </Section>

            <Section title="11. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will change
                the effective date at the top of this page. Material changes will be communicated
                through the website or by other appropriate means.
              </p>
            </Section>

            <Section title="12. Contact us">
              <p>
                If you have questions about this policy or about how your information is handled,
                please reach out through the channels listed on the website. Please do not send
                sensitive medical information through unencrypted email.
              </p>
            </Section>
          </Prose>

          <div className="mt-12 text-sm text-foreground/60">
            See also:{" "}
            <Link href="/terms" className="text-primary-dark underline hover:text-primary">
              Terms of Service
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
