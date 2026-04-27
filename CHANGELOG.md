# Changelog

All notable changes to the Nuvela marketing site will be documented here.

The format is loosely based on [Keep a Changelog](https://keepachangelog.com/).
This project does not currently use semantic versioning; entries are grouped by
iteration until a release cadence is established.

## [Unreleased] — Iteration 10: pitch-readiness polish + social proof

Branched as `claude/iter-7-polish-social` before merging the SEO
work; renumbered to 10 to follow the iter-9 SEO pass already in
this section. Two scopes, landed in order: (1) pitch-readiness
polish — kill the inherited lint debt, ship responsive coverage at
375 / 768 / 1440, wire scroll-reveal animations on the legal +
informational pages where the rest of the site already had them;
(2) social proof — Combo D (stats + trust badges, no fake
testimonials), and an illustrative OG alternative for the team to
compare against the existing photographic OG.

### Added
- `src/app/page.tsx`: new "Numbers worth knowing" proof strip
  between the four-step path and the four-feature grid. Three
  stats — `~14.9%` (STEP 1 trial), `~5 min` (assessment),
  `1 day` (typical message reply) — with the trial citation
  reprinted under the row, and four operational-posture badges
  (board-certified providers, HIPAA-compliant platform, discreet
  home delivery, cancel anytime). Stats and badges chosen to
  avoid the deferred 503B-pharmacy and state-list claims tracked
  in "Known issues."
- `docs/designs/og-illustrative.svg`: alternative OG card for
  team review. Editorial wordmark + serif headline + trust strip
  + "from $199 / month" pill, in brand palette. Compare against
  the existing `public/images/home-bedroom.jpg` photographic OG;
  no swap performed — this is a deliverable for the comparison.
- `src/components/app/Sidebar.tsx`: off-canvas drawer pattern on
  mobile (hamburger top bar, backdrop, body-scroll lock, ESC to
  close, route-change auto-close), pinned at md+ unchanged.

### Changed
- `src/components/Reveal.tsx`: kept the legacy IntersectionObserver-
  undefined fallback (so old browsers don't see hidden content
  forever) and silenced the new `react-hooks/set-state-in-effect`
  rule with a one-line disable + comment explaining why a
  one-shot mount-time setState is intentional.
- `src/app/app/dashboard/messages/page.tsx`: replaced the
  auto-select effect with a derived selectedId computed during
  render (user pick + fallback to most-recent thread); memoized
  threads array; added a mobile list/thread tab switcher with a
  back chevron in the thread header so the 2-pane layout works
  at 375. Hides the "typical response within 1 business day"
  caption below `lg` to give the header room.
- `src/app/app/dashboard/orders/page.tsx`: 6-column table now
  collapses to a card layout below `md` (order id + status pill
  share a top row, then medication / dose, ordered date, est.
  delivery, disabled track button). Memoized orders array.
- `src/app/app/dashboard/layout.tsx`: responsive padding —
  `pt-20` on mobile to clear the new sidebar top-bar,
  `md:ml-[260px]` and `md:pt-9` to restore the desktop layout.
- `src/app/faq/page.tsx`, `/privacy/page.tsx`, `/terms/page.tsx`,
  `/medical-disclaimer/page.tsx`: section primitives now wrap
  content in `<Reveal>` so the same fade-in-on-scroll behavior
  the rest of the site uses now applies here too. Iter 9's
  FAQPage / BreadcrumbList JSON-LD additions preserved verbatim.
- `eslint.config.mjs`: globalIgnores now covers `**/.next/**`
  and `.claude/worktrees/**` so sibling worktrees don't pollute
  lint output.

### Removed
- The auto-select `useEffect` in messages — replaced by render-
  phase derivation.
- The route-change `useEffect` in Sidebar that called
  `setOpen(false)` — replaced by the React-docs render-phase
  pattern (track `lastPath`, compare, update). Same behavior,
  no lint rule violation.

### Verification
- `npm run lint`: 0 errors. 11 warnings remain, all pre-existing
  and unactionable: 10 in `docs/designs/shared.js` (mock helpers
  shipped alongside the HTML designs, not imported by the app);
  1 in `src/app/get-started/page.tsx` (`react-hook-form`
  `watch()` flagged by `react-hooks/incompatible-library` —
  upstream limitation, no remediation available).
- `npm run build`: clean. All 24 routes prerendered as static.
- Manual responsive sweep at 375 / 768 / 1440 across marketing
  and `/app/*`. Sidebar drawer, messages list/thread switcher,
  orders card layout all verified at 375.

### Known issues (unchanged)
The deferred items from earlier iterations remain in place:
fabricated state list in `/get-started`, illustrative pricing
on `/pricing`, provider-recruitment page, dead "Schedule
Consultation" CTA, and the 503B-pharmacy claim in the footer.
Iter 10 deliberately avoided overlap with these — the new stats
and badges were chosen to be defensible without touching any
of them.

## [Unreleased] — Iteration 9: SEO foundations

First real search-engine optimization pass on the site. Photography
work in Iter 7/8 took the visual layer to a shippable bar; this
iteration takes the discoverability layer to the same bar without
disturbing any of the warm, frictionless commercial copy already in
place. The skill brief was the `seo` skill (technical correctness
first, then on-page), with `legal-nuvela` riding shotgun to keep
softened claims softened (e.g. "clinically-studied," not
"clinically-proven") and `frontend-design` informing the
restraint — no SEO-driven copy ballast added, no visible UI changes.

The work breaks into five layers:

1. **Foundations.** A `metadataBase` so every relative OG/canonical
   URL resolves to absolute. A title-template (`%s | Nuvela`) so
   per-page titles read naturally without each page repeating the
   brand. A real Twitter card. Robots defaults that opt-in to
   `max-image-preview: large` for richer SERP rendering. A
   `viewport` export carrying the brand `themeColor` (cream
   `#FAF8F5`) instead of leaving it browser-default. An
   Organization JSON-LD block on every page (delivered via the
   root layout) describing Nuvela conservatively as a
   platform — not a medical practice — to match the wording in
   `/faq` and `/about`.
2. **Crawlability.** New `src/app/robots.ts` allows `/`, blocks
   `/app/*` (the demo funnel + dashboard), and points to the
   sitemap. New `src/app/sitemap.ts` enumerates the 10 marketing
   URLs with sane priorities (home 1.0, commercial-intent 0.9,
   FAQ 0.7, about 0.6, providers 0.4, legal 0.3). `/app/layout.tsx`
   now exports `robots: { index:false, follow:false, nocache:true }`
   as belt-and-suspenders so any agent that ignores robots.txt still
   gets a directive on the page itself. Verified at runtime: `curl
   /robots.txt` returns the expected directives, `curl /sitemap.xml`
   returns ten `<url>` entries, and `<meta name="robots">` on
   `/app/signup`, `/app/dashboard`, `/app/checkout` reads
   `noindex, nofollow, nocache`.
3. **Per-page metadata.** Every marketing page now has its own
   `title`, `description`, `alternates.canonical`, and Open Graph
   block. Two server components (`/`, `/about`, `/pricing`)
   added the metadata directly. Three client components
   (`/how-it-works`, `/get-started`, `/providers`) gained a
   colocated `layout.tsx` that owns their metadata + JSON-LD
   without forcing a refactor of their interactive logic. Titles
   lead with the primary keyword for the page's search intent
   ("GLP-1 Weight Loss Treatment Online — Licensed Providers,"
   "GLP-1 Weight Loss Pricing — Plans from $199/Month,"
   "Free GLP-1 Eligibility Assessment — Start Online,"
   "How GLP-1 Weight Loss Treatment Works — Step by Step,"
   etc.) and stay inside the 50-65-character SERP-truncation band.
4. **Structured data.** Beyond the site-wide Organization,
   per-page JSON-LD is now in place where it actually maps to
   real content: `WebSite` + `Service` (with AggregateOffer
   `$199-$399`) on the home page; three `Service` + `Offer`
   blocks on `/pricing` (Start, Accelerate, Transform — each
   rendered straight from `PLAN_LIST` so prices in JSON-LD can
   never drift from prices on screen); `BreadcrumbList` on
   `/about`, `/pricing`, `/how-it-works`, `/faq`; full
   `FAQPage` on `/faq` with all 18 Q&A pairs. The FAQ JSON-LD
   uses a parallel plain-text mirror (`FAQ_JSONLD`) sitting
   beside the rich React `SECTIONS` so any drift between the
   structured data and the rendered DOM is visible at a glance
   during edits — Google demotes rich results when the two
   diverge, so colocation is the cleanest defense.
5. **Light on-page polish.** The home page's "Without leaving
   home" kicker — purely brand voice, no keyword — became
   "Online GLP-1 weight loss treatment," matching the search
   intent of the section it precedes without making the page
   feel keyword-stuffed (the H2 below it stays unchanged: "A
   consultation, then your medication. That's it."). The footer
   tagline "Clinically-proven GLP-1 weight loss treatment"
   softened to "Clinically-studied" to align with the wording on
   `/`, `/how-it-works`, and `/about` — pure `legal-nuvela`
   consistency hygiene, also caught by this pass. No other
   visible copy changed.

### Decisions worth recording

- **MedicalBusiness schema deliberately not used.** It would have
  given a small SERP boost, but Nuvela's positioning across the site
  (especially `/faq` "Is Nuvela a pharmacy or a medical practice?"
  and `/about` "Nuvela is not a medical practice") is that it is a
  platform, not a clinic. Schema that contradicts on-page copy is
  worse than no schema — Google's structured-data guidelines
  treat it as a quality signal, and an inconsistent claim is
  exactly the kind of thing an enforcement agent could later cite.
  Stuck with `Organization` + `Service`, both of which fit.
- **`metadataBase` is env-overridable.** A new `src/lib/seo.ts`
  reads `process.env.NEXT_PUBLIC_SITE_URL` and falls back to
  `https://nuvela.health`. On Vercel the team can set the env
  var to the real production domain when it lands without
  touching code. The fallback keeps `next build` from blowing up
  locally and on preview builds.
- **`/get-started` stays indexable.** It's a quiz-style intake
  form, but it's also the conversion page for high-intent queries
  like "free GLP-1 eligibility assessment." Indexing it gets
  Nuvela in front of those searches; the form itself is
  client-side and submits to localStorage demo state, so there's
  no PHI-exposure risk from indexing the rendered HTML.
- **Home H1 left untouched.** "A provider, a plan, and nothing in
  the way" doesn't carry the primary keyword, but the title tag
  ("GLP-1 Weight Loss Treatment Online — Licensed Providers")
  and the kicker ("Online GLP-1 weight loss treatment") do, and
  the H2 in the next section ("What are GLP-1 medications?")
  reinforces it. Per the `seo` skill — "write for users first" —
  the H1 carries warmth, the head + nearby H2s carry the
  keyword. No reason to break a working hero.
- **Title template (`%s | Nuvela`) accepted longer-than-ideal
  page titles.** `/pricing` lands at 64 characters when fully
  templated. Google's SERP truncation is pixel-based (~580px),
  not character-based, and the rendered titles all read cleanly
  at desktop+mobile widths. Not worth tightening at the cost of
  brand-suffix consistency across the site.

### Added

- `src/lib/seo.ts` — single source of truth for `SITE_URL`,
  `SITE_NAME`, `SITE_TAGLINE`, an `absoluteUrl()` helper, a
  `breadcrumbJsonLd()` helper used on four interior pages, and a
  small `jsonLdScript()` shape (currently unused by callers — they
  inline `<script type="application/ld+json">` directly so the
  JSON renders before React hydration — kept exported for future
  refactors).
- `src/app/robots.ts` — Next 16 metadata-route file producing
  `/robots.txt`. Allows `/`, disallows `/app/`, points at
  `${SITE_URL}/sitemap.xml`.
- `src/app/sitemap.ts` — Next 16 metadata-route file producing
  `/sitemap.xml`. Ten URLs, lastModified set at build time.
- `src/app/how-it-works/layout.tsx` — owns metadata +
  `BreadcrumbList` JSON-LD for the route. Pass-through children
  so `page.tsx` stays a `"use client"` interactive page.
- `src/app/get-started/layout.tsx` — owns metadata for the
  conversion page. Pass-through children.
- `src/app/providers/layout.tsx` — owns metadata for the B2B
  page (different keyword cluster: "GLP-1 telehealth provider
  partner," not "GLP-1 weight loss"). Pass-through children.

### Changed

- `src/app/layout.tsx` — `metadata` expanded with
  `metadataBase`, title `template`, full Open Graph block with
  hero image at known dimensions (1400×1750), Twitter
  `summary_large_image` card, robots defaults
  (`max-image-preview: large`, `max-snippet: -1`), `category:
  "health"`. New `viewport` export carries `themeColor`
  `#FAF8F5` and `colorScheme: "light"`. Body now also renders an
  `Organization` JSON-LD `<script>` so brand-level structured
  data appears on every page automatically.
- `src/app/page.tsx` — added `metadata` export, added
  `WebSite` + `Service` JSON-LD with `AggregateOffer`. Kicker
  text under the hero CTAs changed from "Without leaving home"
  to "Online GLP-1 weight loss treatment" to bring the primary
  keyword into the section eyebrow without overwriting the warm
  H1. No other visible copy or layout changes.
- `src/app/about/page.tsx` — added `metadata` export and
  `BreadcrumbList` JSON-LD.
- `src/app/pricing/page.tsx` — added `metadata` export and
  three plan-bound `Service` + `Offer` JSON-LD entries
  (Start/Accelerate/Transform) plus `BreadcrumbList`. Prices
  read straight from `PLAN_LIST` so they cannot drift from the
  visible cards.
- `src/app/faq/page.tsx` — strengthened `metadata` (title was
  the very generic "FAQ — Nuvela," now "GLP-1 Weight Loss
  FAQ — Eligibility, Pricing, Safety"). Added a `FAQ_JSONLD`
  parallel plain-text mirror of the React `SECTIONS` content,
  emitted as `FAQPage` JSON-LD with all 18 Q&A pairs and a
  `BreadcrumbList`.
- `src/app/app/layout.tsx` — added `metadata` with
  `robots: { index:false, follow:false, nocache:true }` so the
  entire `/app/*` demo funnel + dashboard is uncrawlable
  regardless of `robots.txt` compliance.
- `src/components/Footer.tsx` — "Clinically-proven GLP-1 weight
  loss treatment" → "Clinically-studied GLP-1 weight loss
  treatment." Aligns with the rest of the site.

### Verification

- `npm run build` — **clean**. Compiled in ~1.3s, TypeScript
  passed in ~1.4s, all 24 routes statically prerendered (was 22
  in Iter 8 — `/robots.txt` and `/sitemap.xml` are now in the
  build).
- Runtime smoke test via `npm run start` + `curl` on every
  marketing route. Verified per route: title tag, meta
  description, canonical link, OG title, robots directive, and
  JSON-LD `@type` enumeration. Sample output below (collapsed).
  - `/` → title "GLP-1 Weight Loss Treatment Online — Licensed
    Providers," canonical `https://nuvela.health`, robots
    `index, follow`, JSON-LD types `[WebSite, Service,
    Organization]` + site-wide Organization.
  - `/pricing` → canonical `…/pricing`, JSON-LD types
    `[BreadcrumbList, Service ×3, Offer ×3, UnitPriceSpecification ×3]`.
  - `/faq` → JSON-LD types `[BreadcrumbList, FAQPage,
    Question ×18, Answer ×18]`.
  - `/how-it-works`, `/about` → BreadcrumbList present.
  - `/get-started`, `/providers` → site-wide Organization only
    (intentional — no extra structured data needed).
- `/robots.txt` → returns `User-Agent: *`, `Allow: /`,
  `Disallow: /app/`, `Disallow: /app/*`, `Host:
  https://nuvela.health`, `Sitemap: …/sitemap.xml`.
- `/sitemap.xml` → ten `<url>` entries, lastModified set at
  build time, priorities as designed.
- `/app/signup`, `/app/dashboard`, `/app/checkout` → all return
  `<meta name="robots" content="noindex, nofollow, nocache">`.
- `npm run lint` — not re-run in this iteration (carrying
  forward the two pre-existing findings from Iter 7: `Reveal.tsx`
  set-state-in-effect, `get-started/page.tsx` watch()
  incompatible-library). No new lint debt introduced — all
  changes are TypeScript metadata exports and JSX `<script>`
  blocks, no new hooks.

### What still needs the business

Two items in this iteration are placeholders awaiting business
inputs and are flagged here so they aren't lost:

- **`SITE_URL` fallback is `https://nuvela.health`.** If the
  production domain is different, set
  `NEXT_PUBLIC_SITE_URL=https://...` in Vercel Project →
  Environment Variables. No code change required.
- **No verified Google Search Console / Bing Webmaster Tools
  claim.** When the production domain is live, the team should
  add a `google-site-verification` meta tag to `metadata.other`
  in `src/app/layout.tsx` and submit `sitemap.xml` to GSC.
  Tracked here so it doesn't block this iteration's merge.

---

## [Unreleased] — Iteration 8: Photography curation

User clarified that the previously-agreed photo set was a SUBSET of
the photos the site had been carrying, not the full library. This
iteration removes five photos that weren't in the agreed set,
re-sources two photos (`home-bedroom.jpg`, `about-coastal.jpg`)
that hadn't been on the site before, swaps the GLP-1 product shot
to its full uncropped frame, and rewrites the home page so the
single hero portrait matches the agreed photo and the photo band
drops to two tiles instead of three.

The hard rule for this pass: **no photo gets cropped at any
breakpoint.** Each container's aspect ratio matches the source
frame, so `object-cover` doesn't slice anything off. Resizing for
web is fine (and was done) — pixel cropping is not.

The other rule was **no model repeats**: of the two female-model
photos chosen (one outdoor, one indoor), each woman appears on
exactly one page. W2 outdoors with the ocean lives on `/about`
(mission section); W1 indoors at the kitchen lives on the home
page (mid-page editorial).

### Added

- `public/images/home-bedroom.jpg` (841×1051, native ~4:5
  portrait, q=88) — man relaxing in bed smiling at his phone.
  Lives in the home-page hero on the right column. Replaces the
  previous W2 indoor silk-shirt hero photo. Reads more "telehealth
  from your couch" on first impression and broadens the implied
  audience beyond a single demographic.
- `public/images/about-coastal.jpg` (1125×785, native ~3:2
  landscape, q=88) — woman walking on a tree-lined path with the
  ocean visible in the distance. Lives in the `/about` mission
  section on the right column at native 3:2 (replaces the prior
  `about-outdoor.jpg` portrait). User explicitly preferred this
  framing over the indoor W2 silk-shirt.
- `public/images/glp1-medications.jpg` (1536×1024, native ~3:2,
  q=90) — full uncropped GLP-1 product shot showing the tablet
  bottle, loose tablets, AND both injection pens on the same
  countertop. Replaces the cropped pens-only `glp1-pens.jpg`.
- Tiny attribution line directly under the GLP-1 photo on
  `/how-it-works`: "For illustration only. Nuvela providers
  prescribe weekly injectable compounded semaglutide." This keeps
  the brand's actual offering unambiguous given the photo now
  shows multiple medication forms.

### Changed

- `src/app/page.tsx` — hero portrait `<Image>` now points at
  `/images/home-bedroom.jpg`; container aspect changed from
  `aspect-[3/2]` to `aspect-[4/5]` to match the source. Home
  photo band reduced from 3 tiles (assessment / consultation /
  delivery) to 2 tiles (consultation / delivery), `grid-cols-3`
  → `grid-cols-2` on `sm` and up. Section kicker reworded
  from "From your couch" to "Without leaving home", H2 from
  "Care that fits inside your day." to "A consultation, then
  your medication. That's it." Mid-page editorial photo swapped
  from `lifestyle-smoothie.jpg` to `kitchen-portrait.jpg`
  (W1 indoors), alt text rewritten to describe the new image.
  `homeBandPhotos` data array shortened from 3 entries to 2.
- `src/app/about/page.tsx` — mission-section photo swapped from
  `about-outdoor.jpg` (portrait `aspect-[4/5]`) to
  `about-coastal.jpg` (landscape `aspect-[3/2]`) so the source
  frame plays at native ratio. Decorative coral block + ring
  treatment added to match the home hero's framing language.
  "Photography is illustrative — models shown" attribution sits
  directly under the photo.
- `src/app/how-it-works/page.tsx` — GLP-1 photo `<Image>` src
  changed from `/images/glp1-pens.jpg` to
  `/images/glp1-medications.jpg`; alt text rewritten to describe
  what's actually visible (tablet bottle, loose tablets, two
  injection pens). Container aspect kept at `aspect-[3/2]` since
  the new source is also 3:2. Comment block updated.

### Removed

- `public/images/about-jeans.jpg` (Iter 7 polish addition).
  Photo not in the agreed set — the trope is too close to the
  weight-loss-scheme aesthetic the brand wants to avoid, even
  with the "Photography is illustrative" attribution.
- `public/images/lifestyle-smoothie.jpg` (Iter 7 polish addition).
  W1 outdoors photo with the "GOOD FOOD GOOD MOOD" sandwich
  board behind her — a touch on-the-nose, and the no-repeat-
  woman rule means W1 can only appear once anyway.
- `public/images/home-hero.jpg` (Iter 7 polish addition,
  W2 indoors silk-shirt). Removed because we chose W2 outdoors
  for `/about`, and the no-repeat-woman rule means W2 can't
  appear in two places.
- `public/images/home-assessment.jpg` (original Iter 7 photo,
  used as the third home-band tile). Not in the agreed set, and
  the home band is now just two tiles anyway.
- `public/images/about-outdoor.jpg` (original Iter 7 photo,
  prior `/about` mission portrait). Replaced by the agreed
  `about-coastal.jpg`.
- `public/images/glp1-pens.jpg` (cropped pens-only frame).
  Replaced by the full uncropped `glp1-medications.jpg`.
- The "Beyond the prescription" big-jeans editorial section on
  `/about` (was the entire JSX block between "Why traditional
  approaches" and "How the Platform Works") — the photo is gone,
  so the section goes with it. The platform-works section now
  follows the stats grid directly.
- The "Day to day" kitchen-portrait editorial section on
  `/how-it-works` (between the journey-steps and the GLP-1
  explainer). The kitchen-portrait photo moved to the home page,
  and the no-repeat-woman rule means it can't appear here too.

### Decisions worth recording

- **Bedroom photo wins the hero over kitchen-portrait W1.** Both
  are strong, but bedroom is more demographically broad (male,
  reads as "anyone could be doing this"), more specifically
  "telehealth from home" (he's literally using his phone in
  bed), and the kitchen-portrait then has a perfect home in the
  mid-page editorial where it pairs with "Beyond the
  prescription / Small, daily things" copy.
- **Photo band reduced to 2 tiles, not 3.** With assessment
  removed (not in agreed set), forcing a 3rd tile would have
  meant either repeating a model or pulling something semi-
  appropriate. Two larger tiles (consultation + delivery) read
  better visually anyway and tell the same story more directly.
- **GLP-1 photo carries an attribution line, not a cropped
  bottle.** The user's "no cropping" rule is firm. The risk —
  showing a tablet bottle when Nuvela only offers injectables —
  is mitigated with a one-line attribution directly beneath the
  photo, not by editing the source pixels.
- **W2 outdoors with the ocean on `/about`, not on the home
  page.** `/about` is the right place for an aspirational,
  brand-mission photograph (the mission section frames
  values, not features). The coastal background also gives the
  about page an outdoor, breathing-room moment that the rest of
  the site doesn't have.

### Verification

- `npm run build` — clean, all 22 routes prerender (the dev
  branch's demo-flow `/app/*` routes plus the marketing pages).
- Puppeteer-driven headless Chromium, force-revealed
  IntersectionObserver, scroll-through pass for lazy-loaded
  images, then `await img.complete` on every `<img>` before
  screenshotting. 12 screenshots at 375 / 768 / 1440 across
  home / about / how-it-works / pricing — all four pages render
  full-frame photos at every breakpoint with no edge cropping.

### Verification still owed

- `npm run lint` — last full run was end of Iteration 7 polish,
  showed 2 errors / 15 warnings, all in pre-existing files
  outside the photography scope. Not re-run after this pass; no
  new lint debt is expected.

---

## [Unreleased] — Iteration 7: Photography polish (same-day follow-up)

Same-day follow-up to Iteration 7's first photography landing.
User feedback on review: (1) the pricing photo was visibly cropped
at the chosen aspect — wanted it full; (2) the GLP-1 product shot
on `/how-it-works` was still the original tight crop because the
re-saved 1200×800 file never actually landed on disk in the prior
pass; (3) several photos that had been discussed (notably
"nuvela w1") were not on the site anywhere; (4) the three home-
page lifestyle tiles sat too far down the page — "below
'Everything handled from home'" — which defeated the warmth the
photography was supposed to bring on first impression.

This pass addresses all four. The home page is restructured so
photography enters in the hero itself, the 3-photo band moves up
to the section immediately after the hero, and a new editorial
moment with a kitchen-portrait photo lands mid-page. `/about`
gets a new editorial section with a "real change is gradual"
photo. `/how-it-works` and `/pricing` re-source their existing
photos so the source frames match the container aspect ratios
(no `object-cover` cropping). All photos remain illustrative —
the brand-model identity is intentionally distributed across
pages (not stacked on one page) and labeled "Photography is
illustrative — models shown" at every appearance.

### Added

- `public/images/home-hero.jpg` (1500×1048, q=88) — kitchen +
  beige linen lifestyle portrait, cropped from the "nuvela w2"
  source. Lives in the home hero on the right column at
  `aspect-[3/2]` with `ring-1` and `shadow-2xl`, replacing the
  prior right-side "Three simple steps" card.
- `public/images/lifestyle-smoothie.jpg` (900×1352, q=86) —
  portrait shot used in a new mid-home editorial section
  ("Beyond the prescription / Small, daily things — done with
  the support of a real care team."). Renders at `aspect-[2/3]`
  on the right column, copy on left.
- `public/images/about-jeans.jpg` (900×1352, q=86) — portrait
  used in a new editorial section on `/about` between
  "Why traditional approaches" and "How the Platform Works".
  Framed as "Real change is gradual — and it's easier with
  people in your corner.", deliberately not as a before/after
  trope. The "Photography is illustrative — models shown"
  attribution sits directly under the photo to keep the brand's
  legal posture consistent.
- `src/app/page.tsx` — hero now ships with a real photograph
  rather than a typographic card; "FROM YOUR COUCH / Care that
  fits inside your day." section moved up to immediately after
  the hero (was previously deeper in the page); 3-photo band
  re-labeled with `<figcaption>` chips ("01 · Assessment",
  "02 · Consultation", "03 · Delivery"); new "Beyond the
  prescription" editorial section with `lifestyle-smoothie.jpg`;
  bottom features section retitled "Why Nuvela / Built around
  how care should feel."
- `src/app/about/page.tsx` — new editorial section between the
  "Why traditional approaches" section and the "How the
  Platform Works" section, with `about-jeans.jpg` portrait at
  `aspect-[2/3]` and "Sustained change" kicker copy on the
  right column.
- `src/app/how-it-works/page.tsx` — new editorial section with
  `kitchen-portrait.jpg` between the journey-steps section and
  "Understanding GLP-1 medications". Frames day-to-day life
  (hydration, nutrition, sleep, movement) as part of a broader
  plan, deliberately avoiding outcome claims.

### Changed

- `public/images/glp1-pens.jpg` — re-cropped from PIL box
  `(600, 200, 1536, 824)` and re-saved at 1200×800 q=88. The
  prior pass logged "Wrote glp1-pens.jpg: (1200, 800)" but the
  file on disk was still the 900×506 tight crop, which is why
  the user reported "didn't see any update." Verified on disk
  via `sips -g pixelWidth -g pixelHeight` post-write.
- `public/images/kitchen-portrait.jpg` (900×1352, q=86) —
  re-created from "nuvela w1" source. The prior pass's write
  did not actually land on disk, so this is a corrective
  re-save rather than a new asset.
- `public/images/pricing-couple.jpg` — re-saved at 1600×1067
  (3:2 native) at q=88 so the photo can render at its source
  aspect without `object-cover` cropping the edges off.
- `src/app/pricing/page.tsx` — pricing band container changed
  from `aspect-[16/9] md:aspect-[21/9]` to `aspect-[3/2]` so it
  matches the source image's native 3:2. No more letterbox-style
  vertical cropping at desktop.
- `src/app/how-it-works/page.tsx` — GLP-1 product container
  changed from `aspect-[16/9]` to `aspect-[3/2]` to match the
  re-cropped 1200×800 source. Pens render with the tablet
  bottle removed (the source had been cropped specifically to
  exclude the bottle so the site doesn't imply oral semaglutide).

### Removed

- The "Three simple steps" hero card on the home page, replaced
  by the lifestyle portrait. The card's content (assessment /
  consult / shipped) is preserved in the 3-photo band's
  `<figcaption>` labels, so no information is lost — only the
  card itself goes away.
- `JourneyStep` helper component on the home page (no longer
  referenced after the hero rebuild).

### Decisions worth recording

- **"One face, one page" relaxed slightly.** Iteration 7's first
  pass committed to never reusing the same model across pages.
  The user's "use all photos discussed" instruction makes that
  rule unworkable for the available asset set, so the rule is
  softened to "no two photos of the same model on the same page,
  and 'Photography is illustrative — models shown' attribution
  on every appearance." The visual identity stays consistent
  without reading as a fabricated patient testimonial.
- **Home hero gets a portrait, not a product or environment
  shot.** The user's framing ("comfier, friendlier, more real
  than just a bunch of words") pointed away from the editorial-
  card-stack hero and toward something inhabited. The
  kitchen-linen portrait on the right column is the one
  decision that does the most work for that goal.
- **Big-jeans photo lives on `/about`, not the home page.** The
  trope is closer to weight-loss-scheme aesthetic than the
  brand wants on a first-impression surface, but it carries
  honest meaning ("real change is gradual"), and `/about` is the
  right surface for that more reflective register.

### Verification

- `sips -g pixelWidth -g pixelHeight` checked against every new
  and re-saved file in `public/images/` — all dimensions match
  the values asserted in this changelog entry.
- Visual responsive pass via Puppeteer-driven headless Chromium
  at 375 / 768 / 1440 across home, about, how-it-works, pricing
  — 12 screenshots, all four pages compose cleanly at every
  width.

### Verification still owed

- `npm run build` after these edits (final-pass build clean
  was confirmed at the end of Iteration 7's first landing,
  but not re-run after this same-day polish).
- `npm run lint` — Iteration 7's first landing surfaced 1 pre-
  existing error and 1 pre-existing warning, both outside scope.
  No new lint debt is expected from this pass, but it has not
  been re-confirmed.

---

## [Unreleased] — Iteration 7: Photography

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

---

## [Unreleased] — Iteration 6: Patient dashboard (Iter C)

Iter C of the demo-flow plan. Fills the last four dashboard
surfaces — Progress, Resources, Account, and a redesigned
Not-Eligible funnel screen — and expands the sidebar from 5 to
6 links. Designs under `docs/designs/` were the visual
authority for Progress, Resources, and Not-Eligible. Account
has no design file; built design-language-consistent per
user direction to keep a 6-link sidebar (Option 3).

### Added

- `src/app/app/dashboard/progress/page.tsx` — full Progress
  surface: 4 hero stat cards (Starting / Current / Total Change
  / Goal Weight) when `weightLogs.length >= 2`, pure-SVG line
  chart with polyline + area gradient + dashed goal line +
  hover tooltips, "Log today's weight" form (number input
  50–500 lb, Enter-to-submit, flash confirmation), recent 5
  entries with per-entry signed delta (green down / coral up),
  and two empty states (0-log and 1-log) per design.
- `src/app/app/dashboard/resources/page.tsx` — 6-card
  educational grid with per-card pastel gradient + inline SVG
  illustrations + category pill + preview + read-time. Click
  opens a modal dialog with full article body, scroll-locked
  background, ESC-to-close, and outside-click-to-close. All 6
  articles' content imported verbatim from the design file
  (Getting Started / Side Effects / Nutrition / Mindset /
  Plateaus / Community).
- `src/app/app/dashboard/account/page.tsx` — profile header
  (avatar + name + email + member-since), editable-look field
  grid (read-only, "coming in future release" caveat), current
  plan card pulled from `state.plan.tier` via `PLANS[...]`,
  billing card showing masked card + last 4, notification
  preferences list with 4 toggle rows (display-only), and a
  soft-accented sign-out "danger zone" card.
- `src/app/app/not-eligible/page.tsx` — replaced stub per
  design. Empathy heart icon, H1 + empathetic body quoting
  `state.quiz.contraindicationReason` (with fallback copy when
  state is unseeded), mid-page call-to-action border band,
  "What to tell your doctor" bullet card, Return-to-home
  primary CTA, and medical-disclaimer subtle link.

### Changed

- `src/components/app/Sidebar.tsx` — expanded from 5 to 6
  links: added `Resources` between Progress and Account.
  Included new `IconResources` (book/clipboard glyph).
  `activeKey()` now also matches `/app/dashboard/resources`.
  `NavKey` union extended accordingly.
- `src/lib/demoState.ts` —
  - `DemoState.dashboard` gains optional `goalWeight?: number`.
  - New exported helper `logWeight(weightLbs)` mirrors
    `sendMessage`: range-validates (50–500), ISO-date-stamps,
    appends to `dashboard.weightLogs`, writes + notifies.
  - Week 4 seed now includes `goalWeight: 185` so the Progress
    hero shows a 4th card and the chart draws its dashed goal
    line immediately.
  - `STORAGE_KEY` unchanged (`nuvela_demo_v2`) — the new
    `goalWeight` field is optional, so existing Iter B
    localStorage snapshots stay forward-compatible.

### Deltas from design

- **Account page has no design file.** Built under design
  language (white cards, sage/coral accents, Fraunces display
  font, tabular pricing) but layout choices (notification
  toggles, soft-accent sign-out card) are mine — flagged per
  convention. User opted for Option 3 (build Account anyway)
  rather than dropping it.
- **`weightLbs` field name retained.** Designs consistently
  reference `.weight`; we kept `weightLbs` per Iter B
  convention to avoid a storage migration. Internally-only
  visible; all UI still renders "lb" as the unit.
- **Not-eligible disclaimer link.** Design links to `#`; wired
  to `/medical-disclaimer` (the real page).

### Deferred

- Profile editing, notification-toggle persistence, and
  payment-method update remain display-only. Documented
  inline ("available in a future release").
- Article content in Resources is hard-coded; no CMS
  integration — appropriate for a pitch demo.

### Verification

- `npm run build` — ✓ clean (all 24 routes pre-rendered,
  including new `/app/dashboard/progress`, `/resources`,
  `/account`).
- `npm run lint` — ✓ no new errors introduced. Two pre-existing
  errors remain and are explicitly out of scope per Iter B
  handover:
  - `src/app/app/dashboard/messages/page.tsx:75` —
    set-state-in-effect (Iter B debt).
  - `src/components/Reveal.tsx:38` — set-state-in-effect
    (pre-Iter-A debt).
- Preview-verified at 1440×900: seeded Week 4 → Progress
  (4 stat cards + chart + goal line + dated entries with
  deltas), Resources (6-card grid + modal open/ESC close),
  Account (all four sections rendered with Sarah Mitchell's
  seeded data). Seeded Not Eligible → not-eligible page
  shows the seeded contraindication reason inline. Seeded
  New User → Progress empty state + logWeight flow:
  submitting 195.5 transitioned the chart to the "one data
  point so far" state and the entry appeared in Recent
  Entries immediately.

## [Unreleased] — Iteration 5: Patient dashboard

Iter B of the demo-flow plan. Adds the logged-in patient
dashboard behind `/app/dashboard/*` with a persistent sidebar,
four dashboard widgets, and two new full-page surfaces
(Messages and Orders). Designs under `docs/designs/` were the
visual authority; the plan/scope was followed for structure.
Marketing site unchanged; funnel (Iter A) unchanged.

### Added

- `src/components/app/Sidebar.tsx` — fixed 260px left rail.
  Links: Dashboard, Messages, Orders, Progress, Account. Active
  state via pathname prefix; coral accent strip on active link.
  Unread badge on Messages when `getUnreadCount(state) > 0`.
  Bottom user block: initials avatar, firstName + lastName,
  `${planName} Plan`, sign-out button (calls `reset()` then
  routes to `/`).
- `src/app/app/dashboard/layout.tsx` — sub-layout composing
  Sidebar + content. No separate `AppHeader`; greeting and plan
  badge live in `page.tsx`.
- `src/components/app/widgets/NextInjectionCard.tsx` — gradient
  card showing date / "In N days" / current dose / "Week N"
  derived from `payment.subscribedAt`.
- `src/components/app/widgets/InboxPreview.tsx` — latest 2
  threads sorted by `lastTimestamp`, provider initials, unread
  dot, short preview. Links to `/app/dashboard/messages`.
- `src/components/app/widgets/OrdersCard.tsx` — latest 2
  orders + status pills. Empty state when `orders.length === 0`.
  Computes next refill as a 28-day cycle from `subscribedAt`.
- `src/components/app/widgets/ProgressMiniCard.tsx` — pure-SVG
  sparkline with polyline + area gradient when
  `weightLogs.length >= 2`. Single centered dot when
  `length === 1`. Empty-state CTA otherwise. Start weight,
  current weight, delta rendered alongside.
- `src/app/app/dashboard/messages/page.tsx` — two-pane view:
  thread list (with `All` / `Unread` filter) + active thread
  pane. Auto-selects most recent thread, auto-marks it read on
  select. Textarea auto-grows, Enter-to-send, Shift+Enter for
  newline. Scroll-pins to bottom when thread changes.
- `src/app/app/dashboard/orders/page.tsx` — header bar
  (Next Refill / Auto-ship Active / Total Orders), filter pills
  (All / Shipped / Delivered), 6-column grid table with status
  pills, disabled "Track" buttons, and a "Tracking unavailable
  in demo mode" note.
- Unread-messages CTA bar on the dashboard page when
  `getUnreadCount(state) > 0` (design-sourced, not in plan
  scope — flagged and approved).

### Changed

- `src/app/app/dashboard/page.tsx` — replaced the Iter A stub
  with a real dashboard: greeting by time-of-day, plan badge
  pill, optional unread CTA bar, 2-col widget grid.
- `src/lib/demoState.ts` — messaging reshape from a flat
  `Message[]` to a threaded model:
  ```ts
  type ThreadMessage = { from: "provider" | "user"; text: string; timestamp: string; };
  type Thread = { id: string; sender: string; unread: boolean;
                  lastTimestamp: string; preview: string;
                  messages: ThreadMessage[]; };
  ```
  New helpers: `sendMessage(threadId, text)`,
  `markThreadRead(threadId)`, `getUnreadCount(state)`.
  `seed("newUser")` now seeds a single unread welcome thread
  from Dr. Sarah Chen, NP. `seed("week4")` now seeds three
  threads including an unread dose-adjustment message.
- Bumped `STORAGE_KEY` from `nuvela_demo_v1` → `nuvela_demo_v2`
  so stale Iter A state (flat messages shape) is discarded on
  first load. No migration path — demo data only.
- `src/app/app/welcome/page.tsx` — `goToDashboard` now seeds
  the dashboard slice using the new `Thread` shape.

### Deferred to Iter C

- `/app/dashboard/progress` and `/app/dashboard/account` are
  linked from the sidebar but not yet built — they currently
  404. Intentional Iter C scope.

### Verification

- Full preview walkthrough at 1440×900:
  - Dashboard (week4 seed): greeting, plan badge, unread CTA,
    all 4 widgets populated correctly.
  - Messages: 3 threads, auto-select of latest, send input
    persists through `sendMessage` to localStorage.
  - Orders: table + filters + header bar; empty state verified
    separately via New User seed.
- No runtime errors after `STORAGE_KEY` bump.
- Lint / typecheck / build not re-run this session — carry
  forward the existing verification debt from prior iterations.

## [Unreleased] — Iteration 4: Demo flow foundation

This iteration adds the logged-in demo funnel behind `/app/*`:
signup → select-plan → checkout → welcome, plus stub destinations
for `/app/dashboard` (next iteration) and `/app/not-eligible`
(Iteration C). The marketing site remains unchanged visually; it
now hands off to the funnel via the assessment result.

Brief on scope: this is "Iteration A" of the demo-flow plan
(`.claude/plans/whimsical-puzzling-chipmunk.md`). It wires the
four-step sign-up funnel end-to-end against a local-storage
demo state with no network calls. Payment is a stubbed visual
form with a 1.5s processing delay and a `TODO(stripe)` marker
so the real Stripe Elements swap is a contained change later.

### Added

- `src/lib/plans.ts` — single source of truth for plan catalog
  (`PLANS` record + `PLAN_LIST`). `PlanTier = "start" | "accelerate"
  | "transform"`. Copy preserved verbatim from the existing pricing
  page so the refactor is zero-visual-change.
- `src/lib/demoState.ts` — versioned `localStorage` helpers
  (`get` / `set` / `reset`) keyed on `nuvela_demo_v1`, plus a
  `seed("newUser" | "week4" | "notEligible")` helper used by the
  demo toolbar and the welcome screen. SSR-safe: all writes guard
  on `typeof window`. Schema covers quiz, plan, payment, and
  dashboard state (messages / orders / weight logs) so later
  iterations can consume the same store.
- `src/components/DemoToolbar.tsx` — a fixed bottom-right toolbar
  visible only when the URL has `?demo=1` or
  `sessionStorage.nuvela_demo_mode === "1"`. Buttons: Reset, Jump
  "New user", Jump "Week 4", Jump "Not eligible", Hide. Rich-er than
  the designer's `.demo-toggle` because it has to drive the pitch.
- `src/components/ChromeGate.tsx` — `GatedNavbar` /
  `GatedFooter` wrappers that hide the marketing chrome on any
  `/app/*` route. Client-side only, one `usePathname()` read each.
  Added instead of a route group so the existing marketing chrome
  keeps rendering unchanged.
- `src/app/app/layout.tsx` — funnel shell: cream background,
  sticky `FunnelHeader`, no footer.
- `src/app/app/_components/FunnelHeader.tsx` — sticky header with
  Nuvela wordmark, `Step N of 4` indicator derived from
  `usePathname`, and a sign-out that calls `reset()` then routes
  to `/`. Sign-out is hidden on `/app/signup` (nothing yet to
  abandon).
- `src/app/app/signup/page.tsx` — email / password stub form with
  `?from=quiz` pre-fill, "Continue as guest →" link to
  `/app/select-plan`, two-column panel with the Nuvela quote and
  three trust points.
- `src/app/app/select-plan/page.tsx` — three-card plan picker.
  Pre-selects from `demoState.quiz.recommendedPlan`, shows a
  "Recommended for you" ribbon on the quiz-recommended card only
  when coming from a completed quiz, and routes to checkout on
  confirm.
- `src/app/app/checkout/page.tsx` — stubbed Stripe-style form with
  card-brand detection (VISA / MC / AMEX), formatted card / expiry
  inputs, sticky order summary, 1.5 s processing spinner, and a
  `TODO(stripe)` comment marking where real Stripe Elements will
  drop in.
- `src/app/app/welcome/page.tsx` — success state with a three-step
  timeline (provider review → pharmacy ships → day 5–7 check-in).
  "Go to your dashboard" calls `seed("newUser")` so the dashboard
  lands in a realistic first-day state.
- `src/app/app/dashboard/page.tsx` — stub page ("Dashboard coming
  in next iteration"). Keeps the welcome → dashboard hand-off from
  erroring and gives the demo toolbar's "New user" / "Week 4"
  buttons a landing target.
- `src/app/app/not-eligible/page.tsx` — stub parallel to the
  dashboard stub. Inline not-eligible on `/get-started` stays the
  canonical disqualification surface for Iteration A; the funnel
  version lands in Iteration C.
- `--primary-light: #a3bda8` in `src/app/globals.css` plus
  `--color-primary-light` in `@theme inline`. Used nowhere yet —
  added so the dashboard iteration has a warmer primary tint ready.

### Changed

- `src/app/pricing/page.tsx` now imports `PLAN_LIST` from
  `src/lib/plans.ts` instead of declaring an inline `tiers` array.
  Zero visual change; the copy is identical (it was the source the
  new constant was seeded from).
- `src/app/get-started/page.tsx` — on submit, writes the quiz
  result to `demoState.quiz` and branches: eligible redirects to
  `/app/signup?from=quiz` (the funnel picks up the recommended
  plan); not-eligible stays on the existing inline disqualification
  screen and also records the disqualifying condition. Added a
  "Skip the assessment →" link on Step 1 that jumps to
  `/app/signup?skipped=quiz`. Removed the inline "You're a good
  match so far" recommended-plan card — it is now unreachable
  (eligible users redirect before they can see it) and was the
  precursor to what the funnel now does properly.
- `src/app/layout.tsx` — swaps `Navbar` / `Footer` for
  `GatedNavbar` / `GatedFooter` and mounts `<DemoToolbar />` at
  the body root so `?demo=1` works from any route.

### Known issues (deferred)

- Checkout is a visual stub — swap for real Stripe Elements when
  a `pk_test_` key is available. The `TODO(stripe)` marker in
  `src/app/app/checkout/page.tsx` flags the exact swap point, and
  the `payment` shape in `demoState` already records what the real
  integration will persist (`cardLast4`, `subscribedAt`).
- `/app/dashboard` and `/app/not-eligible` are intentional stubs.
  Dashboard lands in Iteration B; the funnel-version not-eligible
  surface lands in Iteration C.
- Pre-existing `Reveal.tsx` lint error (setState in effect) is
  untouched.

### Verification steps owed

- `npm run lint` (only the pre-existing Reveal error is acceptable).
- `npm run build`.
- Walk through scenario 1 (full flow: `/get-started` →
  `/app/signup?from=quiz` → select-plan → checkout → welcome →
  dashboard stub).
- Walk through scenario 2 (skip quiz: `/app/signup?skipped=quiz`
  → select-plan without ribbon → checkout → welcome).
- Walk through scenario 3 (skip signup: marketing site → `?demo=1`
  → toolbar "Jump New user" → dashboard stub; "Reset" → `/`).

## [Unreleased] — Iteration 7: Photography


### Photography polish — same-day follow-up

User feedback after first visual pass: the pricing band and the
GLP-1 product shot both read as cropped. Two targeted fixes:

- `src/app/pricing/page.tsx` — band container changed from
  `aspect-[16/9] md:aspect-[21/9]` to `aspect-[3/2]`, matching the
  native ratio of `pricing-couple.jpg` (1536×1024). At desktop the
  21:9 framing was eating the top sky and bottom road context; the
  3:2 frame shows the full image with no crop. Vertical area is
  larger as the user requested.
- `src/app/how-it-works/page.tsx` — GLP-1 band changed from
  `aspect-[16/9]` to `aspect-[3/2]`, and `glp1-pens.jpg` was
  re-cropped from the source `GLP-1.png` with a more generous
  frame: PIL crop box `(600, 200, 1536, 824)` → 936×624 (exact 3:2),
  resized to 1200×800. Tablet bottle still excluded; pens now sit
  with kitchen-counter breathing room above and below them rather
  than the previous tight-on-pens look.
- `public/images/kitchen-portrait.jpg` — added (full `nuvela w1.png`
  re-encoded at 900×1352, ~2:3 portrait). New editorial section on
  `/how-it-works` between the journey steps and the GLP-1 explainer:
  sage-tinted band with grain, portrait left, "Day to day" copy
  right framing the at-home care routine. Copy intentionally avoids
  outcome claims (no "most people lose…", no "you'll feel…") —
  describes logistics + care-team-included context only.

Files touched in this polish pass: two page edits, three
`public/images/` writes (one new, two re-saved). No CHANGELOG
restructure of the original Iter 7 entry below; this is an
addendum.

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
  outside Iteration 7 scope.**
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

---

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
