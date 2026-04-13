"use client";

import { useState } from "react";

export default function Providers() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary-dark uppercase tracking-wide mb-4">
              For Healthcare Professionals
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Partner With Nuvela — Grow Your Practice With GLP-1 Telehealth
            </h1>
            <p className="mt-6 text-lg text-foreground/70 leading-relaxed">
              Join our network of licensed providers and help patients achieve lasting weight loss
              with GLP-1 treatment. We handle patient acquisition, technology, and operations — you
              focus on what you do best: practicing medicine.
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Providers Choose Nuvela
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-secondary/40 bg-white p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works for Providers */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Getting Started Is Simple
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {providerSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-5">
                  {i + 1}
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

      {/* Partner Inquiry Form */}
      <section id="apply" className="py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Partner With Us</h2>
            <p className="mt-4 text-foreground/70">
              Interested in joining the Nuvela provider network? Fill out the form below and our
              partnerships team will be in touch within 2 business days.
            </p>
          </div>

          {formSubmitted ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Thank you for your interest!</h3>
              <p className="mt-3 text-foreground/70">
                We&apos;ve received your inquiry and our partnerships team will review it shortly.
                Expect to hear from us within 2 business days.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Contact name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Jane Smith"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Practice / organization name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Springfield Medical Group"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    State(s) licensed in *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., California, Texas"
                    className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Number of providers
                  </label>
                  <select className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option value="">Select</option>
                    <option value="solo">Solo practice</option>
                    <option value="2-5">2-5 providers</option>
                    <option value="6-20">6-20 providers</option>
                    <option value="20+">20+ providers</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Specialty
                </label>
                <select className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  <option value="">Select specialty</option>
                  <option value="family">Family Medicine</option>
                  <option value="internal">Internal Medicine</option>
                  <option value="obesity">Obesity Medicine</option>
                  <option value="endocrinology">Endocrinology</option>
                  <option value="np">Nurse Practitioner</option>
                  <option value="pa">Physician Assistant</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Tell us about your interest
                </label>
                <textarea
                  rows={4}
                  placeholder="What interests you about partnering with Nuvela? Any questions or specific areas you'd like to discuss?"
                  className="w-full rounded-xl border border-secondary/60 bg-white px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-dark transition-colors"
              >
                Submit Partnership Inquiry
              </button>
              <p className="text-xs text-foreground/40 text-center">
                We&apos;ll review your inquiry and respond within 2 business days.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

const benefits = [
  {
    title: "Steady Patient Pipeline",
    description:
      "Nuvela handles all marketing and patient acquisition. You receive a consistent stream of pre-screened, motivated patients ready for GLP-1 consultation.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Technology Platform Provided",
    description:
      "Scheduling, telehealth visits, e-prescribing, patient messaging, and documentation — all built into one HIPAA-compliant platform at no cost to you.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "Compliance & Admin Support",
    description:
      "We assist with credentialing, state licensing guidance, and regulatory compliance so you can focus on patient care, not paperwork.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    description:
      "Set your own availability. See patients when it works for your schedule — mornings, evenings, weekends. You're in control.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Revenue Growth",
    description:
      "Competitive, volume-based compensation. Grow your income by expanding your practice into the high-demand GLP-1 telehealth space.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Clinical Independence",
    description:
      "You make all prescribing decisions. Nuvela never influences clinical judgment — we provide the platform and patients, you provide the medicine.",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
  },
];

const providerSteps = [
  {
    title: "Apply",
    description:
      "Submit your practice information and credentials through our partner inquiry form. Our team reviews every application.",
  },
  {
    title: "Get Credentialed",
    description:
      "We verify your licenses and credentials, onboard you to our platform, and provide training on our protocols and technology.",
  },
  {
    title: "Start Seeing Patients",
    description:
      "Begin consulting with pre-screened patients on your own schedule. We handle scheduling, billing, and medication fulfillment.",
  },
];
