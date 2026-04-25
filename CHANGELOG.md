# Changelog

All notable changes to the Nuvela marketing site will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).
This project does not currently use semantic versioning; entries are grouped by
iteration until a release cadence is established.

## [Unreleased] — Iteration 4: Photography

First real photography pass on the site. The prior three iterations
worked exclusively with typography, SVG icons, and color — no photos.
This iteration introduces six curated photos across four pages, placed
with editorial restraint (one concentrated photo moment per page
rather than scattered decoration) and written with neutral,
descriptive alt text per the `legal-nuvela` skill — no causal
phrasing ("lost weight by…"), no body-comparison tropes, no
fabricated outcome numbers on a named person.

Decisions that were explicitly made along the way, worth recording:

- **Home "Three simple steps" hero card stays photo-free.** It was
  tempting to photo-ify it, but the card is dense and adding three
  images made it bulkier without adding clarity. The photos found a
  better home further down the page, in the "Everything handled from
  home" section, as a tight 3-photo band.
- **GLP-1 product shot kept, but cropped to injection pens only.**
  The original source image bundled a tablet bottle with two pens,
  which would have implied Nuvela offers oral semaglutide (we do not
  — all pricing and copy assume weekly injectable compounded
  semaglutide). The `/public/images/README.md` instructs the asset
  owner to crop the tablet bottle out in macOS Preview before saving.
- **No before/after photography.** A photo of oversized jeans was
  considered and dropped — the trope is too close to the
  weight-loss-scheme aesthetic the brand is trying to move away from.
- **One face, one page.** Same-model reuse across pages was avoided
  to prevent the implied "recurring patient" effect, which starts to
  read as fabricated testimonial.
- **Pricing page photo carries no overlay CTA.** The pricing page
  already has a tier-level "Get Started" button per card and a
  sage-background CTA section. Adding a third CTA on the photo band
  would triple-stack asks; the photo is intentionally just aspirational
  breathing room between pricing and the sage CTA.

### Added

- `public/images/` directory with a `README.md` that specifies the
  six filename conventions the code expects
  (`home-assessment.jpg`, `home-consultation.jpg`,
  `home-delivery.jpg`, `glp1-pens.jpg`, `about-outdoor.jpg`,
  `pricing-couple.jpg`), where each photo lives on the site, and
  suggested crop ratios. The actual `.jpg` binary files are not yet
  committed — the asset owner saves them into this folder. Until
  then, the `<Image>` components render broken-image placeholders,
  which is the expected state.
- `src/app/page.tsx` — **3-photo band** inside the "Everything
  handled from home" section, sitting above the four-feature grid.
  Photos are equal-width `aspect-[3/2]` tiles (assessment ·
  consultation · delivery) inside a single `<Reveal>`, using
  `next/image` with `fill`, `object-cover`, and `sizes` hints. A
  `homeBandPhotos` data array at the bottom of the file holds the
  three `{ src, alt }` entries with descriptive (non-causal) alt
  text.
- `src/app/how-it-works/page.tsx` — **GLP-1 product visual** placed
  between the "Understanding GLP-1 medications" H2 and the first
  explanatory paragraph. Rendered as an `aspect-[16/9]`
  rounded-corner image wrapped in `<Reveal delay={80}>`. Alt text is
  neutrally descriptive of pens on a countertop; it does not name a
  brand or imply efficacy.
- `src/app/about/page.tsx` — **"Our mission" section restructured
  from single-column text to a two-column grid** (text left, photo
  right) at `md` and up. The photo is `aspect-[4/5]` portrait and
  shows a woman walking outdoors on a sunlit path — chosen
  specifically because all other site photography is indoor/at-home,
  and the mission section benefits from outdoor, movement-based
  warmth that is not body-focused.
- `src/app/pricing/page.tsx` — **full-width aspirational photo band**
  inserted between the pricing-tiers section and the sage CTA
  section. Renders at `aspect-[16/9]` on mobile and `aspect-[21/9]`
  from `md` up. No overlay text, no CTA — intentionally quiet.
- `import Image from "next/image"` added to all four of the above
  page files.

### Changed

- `src/app/page.tsx` — header of the "Everything handled from home"
  section: bottom margin trimmed from `mb-16` to `mb-12 md:mb-14` so
  the new 3-photo band doesn't sit too far from the heading it
  belongs to.

### Removed

- `nuvela-photo-preview.html` — standalone HTML mockup used during
  the planning rounds to preview photo layouts without a running
  dev server. Deleted now that the real Next.js implementation
  covers the same ground.

### Photo binaries committed

The six `.jpg` files referenced by the new `<Image>` placements are
now in `public/images/`. Sources were the user-provided chat
attachments saved to `~/Desktop/Nuvela photos/`; processing happened
as follows:

| Target filename        | Source                | Processing |
|------------------------|-----------------------|------------|
| `home-assessment.jpg`  | `bed guy 2.jpeg`      | Re-encoded to JPEG q=88; pre-cropped from 1122×1402 portrait to 1122×748 (3:2) with a ~22%-from-top vertical bias so `object-cover` preserves face + phone rather than center-chopping them. Note: the earlier `bed guy.jpeg` variant was rejected — it showed a fabricated `185.4 lbs / −32.6 lbs` weight-tracking screen on the phone, which is exactly the kind of outcome claim the `legal-nuvela` skill guards against. |
| `home-consultation.jpg`| `telehealth.png`      | PNG → JPEG q=88. |
| `home-delivery.jpg`    | `delivery.png`        | PNG → JPEG q=88. |
| `glp1-pens.jpg`        | `GLP-1.png` (cropped) | PNG → cropped with PIL to remove tablet bottle: source 1536×1024, crop box `(620, 472, 1520, 978)` → 900×506 (exact 16:9), centered on the pens. Saved as JPEG q=92. The tablet bottle and scattered tablets are fully outside the frame. |
| `about-outdoor.jpg`    | `w2 walk.png`         | PNG → JPEG q=88. |
| `pricing-couple.jpg`   | `couple.png`          | PNG → JPEG q=88. |

The rest of the folder (`bed guy.jpeg` weight-tracking variant,
`big jeans.png`, `nuvela w1/w2`, `w1 smoothie`) was intentionally
left out per the decisions recorded above.

### Verification steps run

Node 22.12 LTS (darwin-arm64) was installed locally to
`~/.local/node/` — not into `PATH`, not via brew/nvm, just a
self-contained tarball extraction — so the toolchain debt from
Iterations 1–3 could finally be retired alongside this one.

- `npm install` — **ok**. 360 packages added. One `EBADENGINE` warn
  from `eslint-visitor-keys@5.0.1` wanting Node `^22.13.0` (we're on
  `22.12.0`) — non-fatal, lint and build both run fine on 22.12.
  Two moderate-severity audit findings, not addressed in this
  iteration.
- `npm run build` — **ok**. Next.js 16.2.3 + Turbopack. Compiled in
  ~1.4s, TypeScript passed in ~1.1s, all 13 routes statically
  prerendered. No build-time warnings or errors from the new
  `<Image>` usages — `fill`-mode images without explicit
  width/height are accepted as expected.
- `npm run dev` — **ok**. Next boots in 170ms. All four
  photo-integrated routes (`/`, `/how-it-works`, `/about`,
  `/pricing`) return HTTP 200.
- `npm run lint` — **1 error, 1 warning, both pre-existing and
  outside Iteration 4 scope.**
  - `src/components/Reveal.tsx:38` — `react-hooks/set-state-in-effect`
    error on the `setVisible(true)` fallback path used when
    `IntersectionObserver` is unavailable. This component landed in
    Iteration 2 and is unchanged here.
  - `src/app/get-started/page.tsx:115` — `react-hooks/incompatible-library`
    warning on `watch()` from react-hook-form. This file is from the
    original build and is unchanged here.
  - Neither issue is introduced by the photo work; leaving both for
    a dedicated lint-hygiene pass.

- **Visual responsive pass at 375 / 768 / 1440 — run and passed.**
  Dev server booted, Puppeteer drove a headless Chromium (downloaded
  to `/tmp/nuvela-shot/` scratch, not the project), and 12 full-page
  screenshots were captured — 4 pages × 3 widths. Two iterations
  were needed on the capture script: the first fullPage screenshots
  were mostly blank below the fold because the `<Reveal>` component
  gates visibility on `IntersectionObserver`, and Next.js `<Image>`
  gates network fetch on lazy-loading. The working version
  (`/tmp/nuvela-shot/shoot.js`) force-reveals via CSS override,
  promotes every `<img>` to `loading="eager"`, scrolls end-to-end,
  and then awaits every image's `complete && naturalWidth > 0`
  before shooting.
  - **Home** — 3-photo band renders as a 3-col row at 1440 and 768,
    stacks to 1 column at 375. All three images load and compose
    cleanly; no cropping accidents.
  - **How-it-works** — GLP-1 pens photo at 16:9 lands between the
    H2 and the first paragraph at every width; the crop preserves
    both pens' labels readably even on 375.
  - **About** — mission section is 2-col (text + portrait) at 768
    and 1440; collapses to stacked on 375 with the portrait below
    the copy. 4:5 aspect holds cleanly.
  - **Pricing** — aspirational couple photo is full-width at every
    width; 21:9 at ≥md tightens vertical weight at desktop, 16:9
    on mobile keeps the faces readable rather than over-cropping.
- Cleanup: the Puppeteer install, Chromium download, and screenshot
  output all live in `/tmp/nuvela-shot/` — nothing bled into the
  project tree. Safe to `rm -rf` when no longer needed.

## [Unreleased] — Iteration 3: UX + Legal Refinement

This iteration makes the site feel simpler, warmer, and less pushy on
first impression, while quietly strengthening the legal backbone in
Terms. Nothing about the visual system (Iteration 2) was rebuilt —
this is a copy, structure, and subtle-composition pass guided by the
`legal-nuvela` skill (minimal edits, no disclaimer-spraying, preserve
sales tone) and a short grill-me round that resolved four branching
design decisions.

The concrete moves: rewrite the home hero so efficacy no longer
dominates the first impression, remove generic icons from "Why
Choose Nuvela" in favor of a typographic grid, add "No insurance
needed" to the hero trust strip, soften the assessment-result pages
(especially the disqualification result, which was coming across as
a hard rejection), and replace the dead "Schedule Your Consultation"
button with an honest "we'll be in touch" handoff. On the legal
side, the Terms gained explicit non-guarantee clauses around
prescription, medication availability, and fulfillment timing, a
clearer third-party-provider/pharmacy responsibility clause, a
tighter user-responsibility-for-truthful-information clause, and a
broader limitation-of-liability clause.

### Added

- `JourneyStep` helper inside `src/app/page.tsx` — renders a single
  line of the new 3-step hero card (monogram + title + body), used
  three times for Assessment → Provider → Delivery.
- New Terms clauses explicitly covering: (a) no guarantee that a
  prescription will be issued; (b) no guarantee of availability, in-
  stock status, or fulfillment timeframe; (c) independent providers
  and pharmacies are solely responsible for their professional
  services and subject to their own licensure and compliance;
  (d) user acceptance of responsibility for outcomes that depend on
  information they submit. These live as additions/extensions to
  §§2, 4, 6, 8, 9, and 10 of `src/app/terms/page.tsx`.
- Two new bullets in the Terms "In plain language" summary so the
  non-guarantee-of-medication and honest-information points are
  visible without reading the full legal body.

### Changed

- `src/app/page.tsx` — **home hero fully reworked.**
  - H1 changed from *"Your weight-loss journey, gently guided by
    experts"* to *"Real weight-loss care, made simple."* with an
    italic Fraunces emphasis on "made simple".
  - Kicker updated to "Weight-loss care, reimagined"; lede rewritten
    to lead with ease (short assessment → conversation → plan to
    your door) rather than the phrase "personalized GLP-1 treatment".
  - Primary CTA changed from "See If You Qualify" to "Start your
    assessment"; secondary CTA copy from "Learn More" to "How it
    works".
  - Trust strip beneath the CTAs now reads: **Licensed providers ·
    No insurance needed · Private & discreet · Cancel anytime**
    (previously three items, with no mention of insurance or
    cancellation).
  - Right-column card replaced. The "STEP 1 ~14.9% body weight
    reduction" stat card that previously anchored the hero has been
    replaced with a quiet 3-step "How it starts" card: Short
    assessment → Talk with a licensed provider → Your plan,
    delivered. Efficacy is preserved one section below, where it
    supports rather than dominates. The "Clinically studied" accent
    pill was replaced with a soft "Gentle · Guided" pill in the
    same position.
- `src/app/page.tsx` — **"Why Choose Nuvela" redesigned without
  icons.** The sage-tinted icon grid has been replaced with a pure
  typographic grid: a hairline rule + monogram numeral (01–06) +
  serif title + supporting body. Section title changed from "Why
  choose Nuvela" to "Care that feels different"; the sub-copy
  emphasises that the experience is unhurried. Feature copy was
  rewritten to match the editorial voice (e.g. "Support that
  continues", "Thoughtful, unhurried") and the previous "Clinically
  Proven Results — 15% body weight" bullet was retired so efficacy
  remains in the STEP-1 section only.
- `src/app/page.tsx` — hero CTA banner H2 softened from "Ready to
  start your journey?" to "Ready when you are." with a shorter,
  calmer sub-line.
- `src/app/terms/page.tsx` — §2 now explicitly states Nuvela does
  not prescribe or dispense medication, providers have sole
  discretion to decline to prescribe, and participating providers
  and pharmacies are independent third parties responsible for their
  own professional services.
- `src/app/terms/page.tsx` — §4 broadened from "Eligibility and
  geographic availability" to "Eligibility, availability, and
  fulfillment", and now expressly disclaims guarantees about
  prescription, availability, in-stock status, timing, and
  uninterrupted service (including force-majeure-adjacent factors).
- `src/app/terms/page.tsx` — §5 clarifies that publishing prices is
  not an offer to sell or to dispense.
- `src/app/terms/page.tsx` — §6 extended with a truthful/current
  information obligation, a duty to update, a same-patient-only use
  clause, and an explicit acceptance of responsibility for outcomes
  that result from inaccurate or out-of-date information.
- `src/app/terms/page.tsx` — §8 retitled "Third-party providers,
  pharmacies, and services" and now clearly frames Nuvela as not a
  medical provider, not a pharmacy, and not a shipper, and
  disclaims responsibility for any acts or omissions of independent
  providers, pharmacies, laboratories, telehealth platforms, or
  carriers.
- `src/app/terms/page.tsx` — §9 expanded with an explicit
  no-guarantee enumeration covering (A) eligibility / prescription,
  (B) medication availability or suitability, (C) clinical or
  weight-related outcomes, (D) service / consultation / shipment
  timing or continuity.
- `src/app/terms/page.tsx` — §10 broadened to cover officers,
  directors, employees, agents, affiliates, and licensors; adds
  loss-of-profits/data/goodwill/opportunity; applies the $100
  aggregate cap across all claims and all legal theories; states the
  limitation is an essential basis of the bargain.
- `src/app/get-started/page.tsx` — step-1 subtitle rewritten to
  reassure about duration and "nothing submitted until the final
  step"; step-4 (medical history) subtitle softened from the
  clinical "critical for your safety" framing.
- `src/app/get-started/page.tsx` — **disqualification result
  rewritten**. Headline changed from *"GLP-1 Treatment May Not Be
  Right for You"* to *"This path may not be the right fit for you
  right now"*; body reframed from "we recommend / safety is our top
  priority" to a non-judgmental "that's not a judgment — just a
  careful first pass", explicitly leaving the door open to return.
  The red-circle "info" icon was replaced with a neutral star glyph
  to match the softer voice.
- `src/app/get-started/page.tsx` — **dead CTA removed.** The
  "Schedule Your Consultation" button (no handler, a long-standing
  known issue) has been replaced with an honest
  "We'll be in touch about next steps" pill and a short explanation
  that consultations are not yet being booked. Eligible-result
  headline changed from *"Great News — You May Be a Candidate!"* to
  the calmer *"Good news — you look like a fit so far"*.
- `src/app/how-it-works/page.tsx` — hero description rewritten to
  a calmer "step-by-step look at what the experience feels like";
  "Clinical Results" copy tightened to cite STEP 1 directly and
  removed the "some achieving 20%+ weight reduction" upsell;
  shipping FAQ rewritten to remove the "3–5 business days"
  timeframe guarantee that conflicted with the new Terms §4;
  "How much weight can I expect to lose?" question reframed as
  "How much weight can someone lose?" with an explicit no-guarantee
  line; hero CTA and bottom CTA copy softened.
- `src/app/pricing/page.tsx` — Accelerate tagline changed from
  "Enhanced support for faster results" (results-promise) to "More
  frequent support as your plan builds"; Transform tagline changed
  from "Maximum support for your transformation" to "Our most
  hands-on plan, for long-term care".
- `src/app/about/page.tsx` — hero description changed from
  "clinically-proven weight-loss treatment" to "clinically-studied
  weight-loss care"; bottom CTA H2 changed from "Join the Nuvela
  community" to "A gentler way to start" with a softer sub-line and
  a "Start your assessment" button.

### Removed

- The "15% body weight" efficacy feature-bullet in the home page
  "Why Choose Nuvela" grid — efficacy now appears only in the STEP 1
  section (on the home page) and in the How-It-Works "Clinical
  results" block, so it is present but not dominant on first scroll.
- The dead "Schedule Your Consultation" CTA on the eligible-result
  view of `/get-started` (see above).
- The "some achieving 20%+ weight reduction" upsell line on
  `/how-it-works`.

### Intentionally left alone (legal-nuvela filter)

- No new disclaimers on marketing pages. Stronger protections live
  in Terms and (previously) Medical Disclaimer. Public-facing copy
  is unchanged where it was already honest enough.
- Footer 503B-pharmacy claim and the About "FDA-regulated 503B
  compounding pharmacies" statement remain flagged in "Known issues
  (deferred)" and are not edited here — they are factual-accuracy
  issues tied to operational status, not rhetoric issues, and the
  business prerequisites have not changed.
- The fabricated `AVAILABLE_STATES` list in `/get-started`, and the
  provider-recruitment framing of `/providers`, remain unchanged for
  the same reason.

### Known issues (carried over, still deferred)

All items from Iterations 1 and 2 remain in place. See those
sections for the full list and file/line references.

### Verification steps owed

Carried over from Iterations 1 and 2 (no Node toolchain available in
this authoring environment), plus the following Iteration-3-specific
checks:

1. `npm run dev` — confirm the home hero right column renders the
   new three-step card at 375 px, 768 px, and 1440 px, that the
   decorative dotted tile doesn't overflow, and that the "Gentle ·
   Guided" pill stays legible in the bottom-left.
2. Confirm the trust strip under the hero CTA wraps correctly on
   narrow screens with the fourth item added ("No insurance
   needed").
3. On `/`, scroll through "Care that feels different" and confirm
   the monogram numerals (01–06) align on a hairline baseline and
   that the grid doesn't collapse awkwardly at `sm` / `lg`.
4. On `/get-started`, reach both result screens (eligible and
   not-eligible) and confirm: the eligible view shows the new
   "We'll be in touch about next steps" pill (not a dead button),
   and the not-eligible view shows the softer headline + neutral
   star glyph.
5. On `/terms`, confirm the updated §§2, 4, 5, 6, 8, 9, 10 render
   cleanly with the existing `Prose`/`Section` helpers, and that the
   two new summary bullets are present in the "In plain language"
   box.
6. `npm run build` — no new utility classes were introduced this
   iteration, but verify nothing regressed.
7. `npm run lint` — should remain clean. The `emoji` field on
   `journeySteps` in `how-it-works/page.tsx` is still unused; left
   in place again to minimize diff churn.

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
