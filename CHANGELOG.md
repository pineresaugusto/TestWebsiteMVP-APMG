# Changelog

All notable changes to the Nuvela marketing site will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).
This project does not currently use semantic versioning; entries are grouped by
iteration until a release cadence is established.

## [Unreleased] — Iteration 2: Aesthetic Pass (Design + Tone)

This iteration is purely cosmetic and structural — no new business claims,
no new pages, no new information. The goal is to move the site away from the
generic-Tailwind starting aesthetic and toward a deliberate "editorial
wellness" voice that a prospective medical-group partner could plausibly take
seriously on first impression.

The concrete moves: introduce a serif display face (Fraunces), give every page
a shared warm-atmospheric hero rhythm, replace the home hero's SVG-heart
placeholder with a real editorial composition, replace the emoji tiles on
How&nbsp;It&nbsp;Works with iconographic SVGs, add subtle scroll-reveal motion,
and tighten section rhythm across the whole site.

### Added

- `src/components/Reveal.tsx` — tiny client-side scroll-reveal wrapper using
  `IntersectionObserver`. Adds an `is-visible` class once the element enters
  the viewport, which triggers a short `reveal-up` keyframe defined in
  `globals.css`. Honors `prefers-reduced-motion`. No animation library added;
  we explicitly chose CSS-only to avoid a dependency.
- `src/components/PageHero.tsx` — server component used for the top of every
  non-home page. Standardizes kicker, serif headline, optional description,
  and atmospheric background (sage radial glow + grain overlay) so every
  secondary page shares the same rhythm. Three sizes (`sm` / `md` / `lg`).
- `globals.css` additions:
  - `--font-display` CSS variable bound to Fraunces.
  - `.font-display` utility (optical-sized, soft axis, tracked tighter).
  - `.bg-grain` — inline-SVG fractal-noise overlay for tactile warmth.
  - `.bg-glow-sage` — layered radial gradient used in heroes and CTA banners.
  - `.bg-dots` — dotted pattern used as a decorative back-layer on tiles.
  - `.rule-kicker` — hairline rule preceding uppercase kicker labels.
  - `.reveal` / `.reveal.is-visible` classes + `@keyframes reveal-up`, with
    a `prefers-reduced-motion` block that disables the animation and
    smooth-scroll.

### Changed

- `src/app/layout.tsx` — added `Fraunces` via `next/font/google` with SOFT +
  opsz axes. Both `--font-inter` and `--font-fraunces` variables are now
  applied to `<html>`. Body explicitly sets `bg-background text-foreground`
  so the page matches the new atmospheric treatments.
- `src/app/page.tsx` — fully rebuilt home hero and section rhythm. The right
  column of the hero is now a layered editorial card (clinical-trial stat
  with citation, decorative dotted back-tile, accent "Clinically studied"
  pill). Body copy uses "gently guided" framing in the H1 with an italic
  display emphasis. All sections use the serif display face for H2s, the new
  `.rule-kicker` for section kickers, and `<Reveal>` wrappers for staggered
  in-view reveals. CTA banner now has grain + soft blob backgrounds rather
  than flat sage.
- `src/app/how-it-works/page.tsx` — hero swapped to `<PageHero>`. Emoji tiles
  (📋 👩‍⚕️ 📦 💪) replaced with four iconographic SVG tiles matched to the
  step order. Section rhythm unified at `py-20 md:py-28`. All H2/H3 use the
  display serif. FAQ accordion section tightened.
- `src/app/pricing/page.tsx` — hero swapped to `<PageHero>`. Tier cards lift
  on hover, use serif numerals for prices, and display a softer uppercase
  "Most popular" pill. CTA banner uses the new atmospheric treatment.
- `src/app/about/page.tsx` — hero swapped to `<PageHero>`. Stat cards on the
  "why traditional approaches fall short" block use serif numerals. Platform
  and trust sections gain kickers, reveal staggering, and serif headings.
- `src/app/faq/page.tsx` — hero swapped to `<PageHero>` (size `sm`). Section
  H2s use the display serif.
- `src/app/privacy/page.tsx` — hero swapped to `<PageHero>` (size `sm`).
  "In plain language" heading and all numbered section headings use the
  display serif.
- `src/app/terms/page.tsx` — same treatment as privacy.
- `src/app/medical-disclaimer/page.tsx` — same treatment; block headings use
  the display serif.
- `src/app/providers/page.tsx` — hero rebuilt with atmospheric background,
  rule kicker, reveals, and a display-serif headline with italic emphasis.
  Benefit cards now hover-lift; all section headings use the display serif.
- `src/components/Navbar.tsx` — logo now uses the display serif with tighter
  tracking. "Get Started" CTA gains a soft accent shadow and 1-pixel
  hover-lift. Backdrop switched to `bg-background/80 backdrop-blur-md` so it
  reads as part of the cream canvas rather than a detached white bar.
- `src/components/Footer.tsx` — brand wordmark uses the display serif.

### Removed

- The "placeholder SVG heart in a gradient box" right-column of the home hero
  is gone; replaced by the editorial stat card described above.
- Inline `🎯 👩‍⚕️ 📦 💪` emoji on `/how-it-works` journey tiles are gone;
  replaced with SVG iconography.

### Known issues (carried over, still deferred)

All items from Iteration 1's "Known issues (deferred)" list remain. None of
this iteration's changes touched them. In particular:

- Fabricated state list in `src/app/get-started/page.tsx`.
- Advertised pricing for currently-undispensable medication.
- Provider recruitment page for a network that does not yet operationally
  exist.
- Dead "Schedule Your Consultation" CTA.
- Footer 503B pharmacy claim.
- Intake form is PHI-adjacent but has no backend.

### Verification steps owed

Same as Iteration 1 — **no Node toolchain was available in the authoring
environment**, so none of the following were run and they remain owed on the
next machine that has Node installed:

1. `npm install`
2. `npm run dev` — confirm every page renders without console errors and the
   new Fraunces font loads (check Network tab for the `fraunces` request).
3. Scroll each page and confirm `<Reveal>` wrappers fade-in smoothly without
   layout shift; confirm `prefers-reduced-motion: reduce` disables them.
4. On `/how-it-works`, confirm the four SVG tile icons render (assessment,
   stethoscope, package, heart+pulse) and that the alternating layout still
   reverses correctly on the second and fourth steps.
5. Resize to 375 px, 768 px, 1440 px. Confirm the home hero's card-stack
   right column remains legible and that the decorative dotted back-tile and
   "Clinically studied" pill don't overflow containers.
6. `npm run build` — confirm Tailwind 4 picks up the new utility classes
   (`.font-display`, `.bg-grain`, `.bg-glow-sage`, `.bg-dots`, `.rule-kicker`,
   `.reveal`) and that `next/font/google` compiles Fraunces with the SOFT
   and opsz axes.
7. `npm run lint` — should be clean. The `emoji` field on `journeySteps` in
   `how-it-works/page.tsx` is now unused but not referenced anywhere outside
   the data object; left in place to minimize diff churn.
8. Lighthouse or similar accessibility pass — no color-contrast or heading
   hierarchy regressions expected, but verify.

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
