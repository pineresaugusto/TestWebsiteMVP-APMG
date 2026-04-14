# Changelog

All notable changes to the Nuvela marketing site will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).
This project does not currently use semantic versioning; entries are grouped by
iteration until a release cadence is established.

## [Unreleased] — Iteration 1: Information + Legal Scaffolding

This iteration adds substantive informational and legal content to the site and
closes the most urgent live-site gap (the absence of Privacy Policy, Terms of
Service, and Medical Disclaimer pages). It also softens a few home-page copy
choices that were not well supported by citations. Visual / aesthetic polish
and component extraction are intentionally deferred to a later iteration.

### Added

- `src/app/faq/page.tsx` — FAQ page at `/faq`, a server component with its own
  `metadata` export. Contains 18 questions across six sections: General,
  Eligibility, Medication &amp; Safety, Pricing &amp; Billing, Delivery, and
  Your Data. Copy is written in future/aspirational tense where the business is
  not yet operational, so it avoids asserting facts that are not currently
  true.
- `src/app/privacy/page.tsx` — Privacy Policy at `/privacy`. Plain-language
  summary followed by 12 numbered sections. Explicitly states that the intake
  form does not currently store responses, and flags that this will change as
  services expand.
- `src/app/terms/page.tsx` — Terms of Service at `/terms`. Plain-language
  summary followed by 14 numbered sections. Clarifies that use of the site
  does not create a doctor-patient relationship and that pricing is
  illustrative until a consultation.
- `src/app/medical-disclaimer/page.tsx` — Medical Disclaimer at
  `/medical-disclaimer`. Covers individual-results-vary, that compounded
  semaglutide is not FDA-approved, common and serious side effects,
  disqualifying conditions, emergencies, and the provider&apos;s final
  authority on clinical decisions.
- `src/components/FAQItem.tsx` — extracted `"use client"` accordion component.
  Isolated so the FAQ page itself can remain a server component and export
  metadata.
- `CHANGELOG.md` — this file.

### Changed

- `src/app/page.tsx` — replaced the hero tile line
  &ldquo;Patients report an average of 15-20% body weight reduction&rdquo; with
  a less promotional phrasing that attributes the result to clinical trials.
  Replaced the &ldquo;What are GLP-1 medications?&rdquo; section&apos;s generic
  15% claim with a specific citation (STEP 1 trial, Wilding et al., NEJM 2021)
  and added a safety footnote linking to `/medical-disclaimer`.
- `src/app/pricing/page.tsx` — extended the existing fine-print to link
  `/medical-disclaimer` for important safety information.
- `src/components/Footer.tsx` — replaced the four `href="#"` placeholder links
  with real routes. The footer is now organized as four columns: Brand, Quick
  Links, Support (FAQ, For Providers), and Legal (Privacy Policy, Terms of
  Service, Medical Disclaimer). The old &ldquo;For Healthcare
  Professionals&rdquo; column was collapsed into Support to preserve the
  existing `md:grid-cols-4` layout.
- `AGENTS.md` — added a &ldquo;Recent changes&rdquo; section so subsequent
  Claude Code (and other agent) sessions have current context.

### Removed from tracking

- `.claude/settings.local.json` — per-developer Claude Code permission grants.
  Added to `.gitignore`. Each developer&apos;s machine writes its own copy;
  this file should not be shared across the team.

### Known issues (deferred)

These are intentionally out of scope for this iteration. They are documented
here so future iterations (and future agent sessions) can track them:

- **Fabricated state list.** `AVAILABLE_STATES` in
  `src/app/get-started/page.tsx:9-14` lists 20 US states. At the time of this
  iteration there are no licensed providers in any state. The list needs to be
  reconciled with real licensure before the intake form reaches real patients.
- **Advertised pricing for undispensable medication.**
  `src/app/pricing/page.tsx:115-167` publishes concrete monthly prices
  ($199/$299/$399) for medication that cannot currently be dispensed because
  no pharmacy partnership is in place.
- **Provider recruitment page.** `src/app/providers/page.tsx` actively
  recruits licensed providers into a network that does not operationally
  exist. Needs to be reframed (e.g. as an &ldquo;early-interest&rdquo; page)
  until a real provider group is under contract.
- **Dead consultation CTA.** `src/app/get-started/page.tsx:230-232` —
  &ldquo;Schedule Your Consultation&rdquo; button has no handler. Needs a
  booking integration or an honest &ldquo;we&apos;ll contact you&rdquo;
  handoff.
- **Footer 503B pharmacy claim.** `src/components/Footer.tsx:85-89` still
  says compounded medications are &ldquo;prepared in FDA-regulated 503B
  pharmacies.&rdquo; Not currently true; needs softening once the real
  pharmacy model is decided.
- **Intake form is PHI-adjacent but has no backend.** The moment the form is
  wired to any backend, the collected data becomes PHI. This requires a
  BAA-covered stack and a real privacy story. The current Privacy Policy is
  written to be accurate while this state holds; it must be updated in the
  same PR that introduces backend storage.
- **`node_modules` / bundled Next.js 16 docs not reviewed.** Per `AGENTS.md`,
  the bundled Next.js 16 docs at `node_modules/next/dist/docs/` should be
  consulted before writing code. `node_modules` was not installed in the
  sandbox where this iteration was authored, so the docs were not consulted.
  New pages only use stable APIs (`Metadata` export, `next/link`, server
  components with a client accordion) so breakage is unlikely, but verify on
  the next dev-server run.

### Verification steps owed (run on a machine with Node)

These were not run in the authoring environment and remain owed:

1. `npm install`
2. `npm run dev` — confirm `/faq`, `/privacy`, `/terms`, and
   `/medical-disclaimer` render without console errors.
3. Click through every footer link and the home-page Medical Disclaimer
   footnote. All should resolve.
4. Toggle every FAQ accordion item on desktop and mobile widths.
5. `npm run build` — confirm no Next 16 build breakage.
6. `npm run lint` — confirm clean.
7. Inspect `<head>` on each new page. Each exports its own `title` and
   `description`.
