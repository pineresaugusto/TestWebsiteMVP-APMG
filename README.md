# Nuvela — GLP-1 Weight Loss Telehealth MVP

> **Quick start:** Run `/load-context` in Claude Code to bootstrap a session.

## Session Log

Reverse-chronological. Add an entry when you finish a work session.
Format: `### YYYY-MM-DD — github-username`

### 2026-04-24 — adpineres-ef
- Iter C of demo flow landed: Progress, Resources, Account, and
  a design-rebuilt Not-Eligible page. Sidebar now 6 links
  (Resources added between Progress and Account) per user
  Option 3 — designs only had Resources in that slot, but user
  opted to keep Account too.
- `/app/dashboard/progress`: 4 hero stat cards, pure-SVG line
  chart (polyline + area gradient + dashed goal line + hover
  tooltip), log-today's-weight form (range-validated,
  Enter-to-submit), recent-5 entries with signed delta, 0-log
  and 1-log empty states.
- `/app/dashboard/resources`: 6-card educational grid with
  inline SVG illustrations, category pills, modal dialog for
  article body (ESC + outside-click + scroll-lock). Content
  imported verbatim from `docs/designs/resources.html`.
- `/app/dashboard/account`: profile header + field grid, plan
  card, masked billing, notifications toggles (display-only),
  soft-accent sign-out section. No design file existed —
  built under design language; flagged as delta.
- `/app/not-eligible`: rebuilt per design (empathy icon, H1,
  reason interpolated from `state.quiz.contraindicationReason`
  with fallback, bullet card, CTA + disclaimer link).
- `src/lib/demoState.ts`: added optional `dashboard.goalWeight`,
  exported `logWeight(weightLbs)` helper, seeded Week 4 with
  `goalWeight: 185`. `STORAGE_KEY` unchanged — field is
  optional, Iter B snapshots stay forward-compatible.
- Verified at 1440×900 across populated / empty / one-log
  states, modal open/close, and not-eligible reason
  interpolation. `npm run build` clean; lint has no new
  errors (2 pre-existing Iter B + Reveal debt remain).

### 2026-04-24 — adpineres-ef
- Iter B of demo flow landed: logged-in patient dashboard behind
  `/app/dashboard/*` with persistent `Sidebar` (Dashboard /
  Messages / Orders / Progress / Account + user block with
  sign-out), `dashboard/layout.tsx` sub-layout, and four widgets
  (NextInjection, InboxPreview, Orders, ProgressMini with
  pure-SVG sparkline)
- New full-page surfaces: `/app/dashboard/messages` (thread
  list + pane with auto-select, auto-mark-read, send input
  wired through `sendMessage`) and `/app/dashboard/orders`
  (filter pills, grid table, status pills, empty state)
- Reshaped `src/lib/demoState.ts` messages from flat
  `Message[]` to `Thread[]` with `ThreadMessage[]` nested;
  added `sendMessage`, `markThreadRead`, `getUnreadCount`;
  bumped `STORAGE_KEY` v1 → v2 so stale Iter A state is
  discarded on load
- Designs treated as visual authority per instructions; added
  design-sourced unread-messages CTA bar on the dashboard (not
  in plan scope); confirmed with user before commit
- `/app/dashboard/progress` + `/app/dashboard/account`
  intentionally 404 — Iter C scope
- Verified end-to-end via preview at 1440×900 (dashboard,
  messages, orders, empty states); lint/build not re-run,
  carrying forward existing verification debt

### 2026-04-23 — adpineres-ef
- Iter A of demo flow landed: `/app/*` funnel (signup → select-plan
  → checkout → welcome) backed by localStorage `demoState` and a
  versioned schema covering quiz/plan/payment/dashboard
- Added `?demo=1` `DemoToolbar` for pitch walkthroughs
  (Reset / New user / Week 4 / Not eligible / Hide) and a
  `ChromeGate` that hides marketing nav + footer on funnel routes
  without a route group
- Shared `src/lib/plans.ts` now consumed by pricing page + quiz
  recommendation + funnel — marketing site unchanged visually
- Wrap-up fixes before Iter B: removed nested `<main>` in app
  layout, welcome screen now preserves the funnel-captured user
  instead of seeding "Demo Patient", FunnelHeader hides on
  `/app/dashboard` so Iter B's sidebar won't double up
- Verified via preview: full funnel + skip-quiz + toolbar paths
  all green; build clean, no new lint errors

### 2026-04-22 — adpineres-ef
- Kicked off demo-flow plan (signup → plan → payment → dashboard) for
  pitching medical-group partners; plan file lives at
  `.claude/plans/whimsical-puzzling-chipmunk.md`
- Phase 0 delivered: wrote `docs/DESIGN_BRIEF_APP.md` — spec for
  designer-Claude covering all 10 `/app/*` screens
- Investigated `claude-mem` plugin install; parked after Windows PATH
  blocker (plugin package on disk, but `/plugin install` in-app
  registration still owed before hooks/mem-search activate)
- Build clean; pre-existing `Reveal.tsx` lint error remains from
  earlier iteration verification debt

### 2026-04-16 — Mauger00
- Iteration 3 (UX + legal refinement): softer home hero — new H1
  "Real weight-loss care, made simple.", efficacy moved out of first
  impression, 3-step "how it starts" card replaces the STEP 1 stat
- "Why Choose Nuvela" icons removed; replaced with typographic
  monogram grid ("Care that feels different")
- Hero trust strip gains "No insurance needed" and "Cancel anytime"
- `/get-started`: softer disqualification copy; dead
  "Schedule Your Consultation" CTA replaced with honest
  "We'll be in touch" handoff
- Terms of Service strengthened: explicit non-guarantee clauses
  around prescription, availability, and fulfillment timing;
  third-party provider/pharmacy responsibility; user duty of truthful
  information; broader limitation of liability
- Tone pass on `/how-it-works`, `/about`, `/pricing` — removed a
  couple of outcome-promise phrasings, retitled a few CTAs
- Verification debt from Iterations 1–3 still owed (no Node toolchain
  in this env)

### 2026-04-14 — Mauger00
- Iteration 2 (aesthetic pass): paired Inter with Fraunces display serif
- Added `<Reveal>` scroll-reveal component and shared `<PageHero>`
- Rebuilt home hero (editorial card-stack with STEP 1 stat, no more SVG-heart placeholder)
- Swapped emoji tiles on /how-it-works with iconographic SVGs
- Added grain + radial-glow atmosphere utilities; unified section rhythm site-wide
- Verification debt from Iteration 1 + Iteration 2 still owed (no Node toolchain in this env)

### 2026-04-14 — Mauger00
- Iteration 1: Added /faq, /privacy, /terms, /medical-disclaimer
- Updated Footer with real routes, extracted FAQItem client component
- Softened drug-efficacy copy with STEP 1 trial citation (Wilding et al., NEJM 2021)
- Added Medical Disclaimer link to pricing fine print

### 2026-04-14 — adpineres-ef
- Built initial MVP site: 6 core pages (Home, How It Works, Pricing, About, Assessment Quiz, Providers)
- Established brand: Nuvela, warm wellness aesthetic, color tokens, Inter font
- Tech stack: Next.js 16 + Tailwind v4 + react-hook-form
- Interactive 7-step health assessment quiz with eligibility/disqualification paths
- Provider partner page with inquiry form

## Backlog / What's Next

Priority order. Check items off or move to CHANGELOG.md when completed.

- [ ] Run verification debt from Iteration 1 (npm install, dev, build, lint — see CHANGELOG.md)
- [ ] Social proof decision: mock testimonials/stats/trust badges? (deferred from initial build)
- [ ] Decide on specific US states for "available" list in quiz
- [ ] Responsive polish pass: test all pages at 375px, 768px, 1440px
- [ ] Scroll animations (fade-in on viewport entry)
- [ ] OG image for social link previews
- [ ] Reconcile known issues when business prerequisites are met (see CHANGELOG.md § Known issues)

## Known Issues

> Detailed tracking with file paths and line numbers lives in
> [`CHANGELOG.md`](./CHANGELOG.md) under "Known issues (deferred)."
> These are intentional placeholders, NOT bugs to fix — they require
> real business infrastructure (licensure, pharmacy partner, provider group).

Summary: fabricated state list, placeholder pricing for undispensable medication,
provider recruitment for non-existent network, dead "Schedule Consultation" CTA,
inaccurate 503B pharmacy claim in footer, PHI-adjacent form with no backend.

---

## Project Overview

### What is Nuvela?

Nuvela is a **GLP-1 weight loss telehealth concept**. This repo is a
consumer-styled **demo website** used to present to potential medical group
partners in the US. It is NOT live for real patients and has no healthcare
infrastructure behind it (no providers, pharmacies, or telehealth platform).

The website is the pitch tool: show medical groups what the patient experience
would look like so they want to join as the provider network.

**Modeled after:** [Medvi](https://home.medvi.org/) — but focused exclusively
on GLP-1 weight loss (not multi-service).

### Business Model

| Layer | How it works |
|-------|--------------|
| Patient acquisition | Marketing site → health assessment quiz → lead capture |
| Consultation | Licensed provider conducts virtual visit via telehealth platform |
| Prescription | Provider prescribes compounded semaglutide (not brand Ozempic/Wegovy) |
| Fulfillment | FDA-regulated 503B compounding pharmacy prepares & ships medication |
| Ongoing care | Regular provider check-ins, dose adjustments, messaging support |
| Revenue | All-inclusive monthly subscription: $199 / $299 / $399 tiers |

**Target partners:** Medical groups / licensed providers (the real audience).
**Target market:** US, specific states (TBD which ones).
**Compounded meds:** Same active ingredient as brand-name at a fraction of cost.

### Brand Identity

| Element | Value |
|---------|-------|
| Name | Nuvela |
| Style | Warm & approachable wellness (not clinical) |
| Primary color | Sage green `#7C9A82` |
| Accent color | Warm coral `#E07A5F` |
| Background | Cream `#FAF8F5` |
| Text | Warm charcoal `#2D2D2D` |
| Secondary | Soft tan `#D4C5B2` |
| Font | Inter (Google Fonts) |
| Tone | Supportive, empowering, simple — no medical jargon |
| Logo | Text wordmark "Nuvela" (no graphic for MVP) |

### Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.2.3 | App Router. **Warning: breaking changes** — check `node_modules/next/dist/docs/` |
| React | 19.2.4 | |
| TypeScript | 5 | |
| Tailwind CSS | 4 | Utility-first, v4 syntax |
| react-hook-form | 7.72.1 | Multi-step assessment quiz |
| Hosting | Vercel | Free tier, auto-deploy from GitHub |

### Site Map

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Hero, GLP-1 explainer, how it works, why Nuvela, CTA |
| `/how-it-works` | How It Works | Patient journey, medication info, compounded meds, 10 FAQs |
| `/pricing` | Pricing | 3 tiers (Start/Accelerate/Transform), all-inclusive |
| `/about` | About Us | Mission, problem/solution, platform model, trust elements |
| `/get-started` | Assessment Quiz | 7-step form → eligible/not-eligible result → plan recommendation |
| `/providers` | For Providers | Partner value prop + inquiry form. **Footer link only, not in main nav** |
| `/faq` | FAQ | 18 questions across 6 sections |
| `/privacy` | Privacy Policy | 12 sections, plain language |
| `/terms` | Terms of Service | 14 sections |
| `/medical-disclaimer` | Medical Disclaimer | Side effects, disqualifications, emergencies |

### Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Scope | GLP-1 only | Focused pitch > diluted multi-service. Show depth, not breadth. |
| Medication | Compounded semaglutide | Enables ~$199-399 pricing vs $1,300+ brand-name. Standard in market. |
| Quiz disqualification | Yes — screens for contraindications | Medical partners will test this. A quiz that qualifies everyone looks irresponsible. |
| "For Providers" placement | Footer link only | Keeps consumer-facing illusion intact. Show providers page directly in meetings. |
| Social proof | TBD (deferred) | Haven't decided on mock testimonials vs stats-only vs none. |
| Pricing display | Placeholder with disclaimer | "Illustrative" fine print. Can't dispense medication yet. |

## Team

| GitHub | Role |
|--------|------|
| adpineres-ef | Co-founder, initial MVP build |
| Mauger00 | Co-founder, Iteration 1 (legal/info scaffolding) |

## Conventions

- **Start every Claude Code session** with `/load-context`
- **End every session** by adding a Session Log entry to this README
- **Each iteration** gets a new `## [Unreleased] — Iteration N` section in `CHANGELOG.md`
- Don't commit `.claude/settings.local.json` (gitignored, per-developer)
- Check `node_modules/next/dist/docs/` for Next.js 16 API questions
- See [`AGENTS.md`](./AGENTS.md) for agent-specific behavioral rules
- See [`CHANGELOG.md`](./CHANGELOG.md) for detailed iteration diffs and known issue tracking
