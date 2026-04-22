# Design Brief — Nuvela `/app/*` Surface

> **Audience:** designer-Claude (run separately with the `frontend-design`
> skill) or a human designer.
> **Deliverables target directory:** `docs/designs/`
> **Companion plan:** `C:\Users\USUARIO\.claude\plans\whimsical-puzzling-chipmunk.md`

---

## 1. Project context

**Nuvela** is a GLP-1 weight-loss telehealth concept — a consumer-styled
demo website used to pitch potential medical-group partners in the US.
It is **not live for real patients** and has no healthcare infrastructure
behind it yet. The marketing site already exists and works; this brief
covers the **patient-app surfaces** that sit behind the "Get Started"
flow: signup, plan selection, checkout, welcome, and the full patient
dashboard.

The people seeing this design are **medical-group partners during pitch
meetings**, not real patients. The design must make those partners
believe: "this is a real, polished product — we'd want our providers in
it." A prototype that looks like a prototype loses the pitch. Warm,
trustworthy, a little editorial. Calm, not clinical. Premium-wellness,
not hospital-IT.

---

## 2. Brand identity (existing tokens — do not change without reason)

### Colors
Defined in `src/app/globals.css` as CSS variables consumed by Tailwind v4.

| Token | Hex | Role |
|---|---|---|
| `--background` | `#FAF8F5` | Cream — page background |
| `--foreground` | `#2D2D2D` | Warm charcoal — body text |
| `--primary` | `#7C9A82` | Sage green — primary brand |
| `--primary-dark` | `#5F7F66` | Deeper sage — hover/focus |
| `--accent` | `#E07A5F` | Warm coral — CTA, highlights |
| `--accent-dark` | `#C9604A` | Deeper coral — hover/focus |
| `--secondary` | `#D4C5B2` | Soft tan — muted surfaces |
| `--secondary-light` | `#E8DDD0` | Lighter tan — card surfaces |
| `--white` | `#FFFFFF` | Pure white |

Tailwind utilities already exist for all of these
(`bg-primary`, `text-accent-dark`, `border-secondary`, etc.). Designer
may propose additional semantic tokens (e.g. `success`, `warning`,
`info`, `danger`) but they must slot into `@theme inline` in
`globals.css` without breaking existing usage.

### Typography
- **Inter** is the locked primary font (loaded via `next/font/google`).
  It is used everywhere for body and UI.
- **Fraunces** is already in use as a display serif for marketing
  headlines (class `font-display`). Designer may reuse `font-display`
  for dashboard hero/welcome moments but should not introduce a **third**
  typeface. If a numeric mono is wanted for data (weight logs, dates,
  card numbers), use `font-variant-numeric: tabular-nums` on Inter
  instead of a new font.

### Tone
- Warm wellness, approachable but polished
- **Not** clinical (avoid hospital blues, red cross iconography,
  stethoscopes)
- **Not** playful (no big bouncy animations, cartoon illustrations,
  emoji-driven UI)
- **Not** luxury-cold (avoid pure-black-on-white editorial; our cream
  base keeps things human)

### Reference aesthetics to study
- **Hims/Hers patient portal** — warm tones, clean typography, very
  close spiritual cousin
- **Ro telehealth dashboard** — minimal, content-first, trust through
  restraint
- **Headspace** — warm-minimal, generous whitespace, friendly without
  being juvenile
- **Oura app** — data-dense but calm; good model for the progress chart

### Explicitly NOT
- **WebMD / MyChart / Epic** — clinical, cold, institutional
- **Bank-app aesthetic** — too sterile for wellness
- **Fitness-bro aesthetic** (MyFitnessPal, LoseIt) — we are medical,
  not gamified

---

## 3. Tech constraints (designer must respect)

| Constraint | Detail |
|---|---|
| Framework | Next.js 16 App Router + React 19 + TypeScript |
| Styling | Tailwind CSS v4 utility classes. No CSS-in-JS, no CSS modules. |
| Tokens | Reuse `src/app/globals.css` tokens; propose new ones only if needed and they must integrate with the `@theme inline` block. |
| Images | **No stock photography. No external image deps** (no Unsplash, no Pexels). Inline SVG, CSS gradients, and composed shapes only. |
| Icons | **Inline SVG only.** No icon fonts (no Font Awesome, Lucide-as-font, etc.). The existing marketing pages use hand-crafted SVGs — match that style (2px stroke, rounded line caps, no fill). |
| Motion | CSS-only or lightweight. No GSAP, no Framer Motion unless strongly justified for a specific moment. There is an existing `<Reveal>` scroll-reveal component — reuse it for viewport-entry fades. |
| Responsive | **Desktop-first (1440px primary).** Must not break at 1024px. Mobile (375px / 768px) is nice-to-have but not the priority; partners view on laptops during pitches. |
| Dependencies | **No new npm deps** except `recharts` (approved for the progress chart in Iter C). Do not design anything that requires a new library. |
| Accessibility | Semantic HTML, visible focus states, sufficient contrast (AA minimum for body text on cream). Full WCAG audit is out of scope. |

---

## 4. Scope — screens to design (priority order)

Designer may deliver all screens or, if time-constrained, stop after
**Priority 1**. Priority 2 and 3 screens can fall back to brand tokens
applied sensibly by coding-Claude.

### Priority 1 — Dashboard surfaces (highest impact)

These are what partners will spend the most time looking at during a
pitch. Invest disproportionately here.

1. `dashboard.html` — home view (widget grid)
2. `messages.html` — inbox list + selected thread view with input
3. `orders.html` — order history table
4. `progress.html` — weight chart + log-today form
5. `resources.html` — educational content card grid + article modal

### Priority 2 — Purchase funnel (flow screens)

6. `signup.html` — name/email/password + "Continue as guest" link
7. `select-plan.html` — 3-tier comparison with radio selection,
   pre-selected recommendation
8. `checkout.html` — stubbed Stripe-style card form with plan summary
   sidebar
9. `welcome.html` — success screen with what-happens-next timeline

### Priority 3 — Oops branch

10. `not-eligible.html` — respectful screen-out page

---

## 5. Per-screen requirements

Each spec lists: **Purpose / Content inventory / States / User actions /
Connects to**. Designer should treat the content inventory as mandatory
(every item must appear somewhere) but is free to group/reorder.

---

### 5.1 `dashboard.html` — Dashboard home

**Purpose:** Give the patient a single-glance view of their active
treatment: what's next, what's new, what's shipping.

**Content inventory:**
- Greeting with first name ("Good morning, Sarah")
- Current plan badge (Start / Accelerate / Transform) + monthly price
- "Next injection" card: date, countdown, current dose, "View
  instructions" link
- Inbox preview: latest 2 messages, unread count, "View all" link
- Orders preview: latest order status (processing / shipped / delivered),
  next refill date, "View all orders" link
- Optional mini progress chart (only appears if ≥ 2 weight logs exist,
  otherwise an "Add your first weight log" empty-state card)
- Quiet secondary nav back to `Account` / `Settings` (stubbed links,
  no pages built yet)

**States:**
- **Populated (newUser seed):** plan selected, payment complete, next
  injection ~7 days out, 1 unread welcome message, no orders yet,
  no weight logs
- **Populated (week4 seed):** richer — 2 orders, 3 messages (unread
  count 1), 4 weight logs forming a visible trend
- **Empty/new:** right after welcome, before any activity
- There is no "loading" state to design — state is read synchronously
  from localStorage

**User actions:**
- Click any widget to navigate to its full page
- Click plan badge to view plan details (stub)
- Primary CTA if inbox unread > 0: "View new message"

**Connects to:** `messages`, `orders`, `progress` (if shown), account
stubs. Left sidebar is persistent across all dashboard routes.

---

### 5.2 `messages.html` — Inbox + thread view

**Purpose:** Feel like a real patient-provider messaging product. This
is the single most "is-it-real?" test partners will run.

**Content inventory:**
- **Left pane:** thread list. Each thread row shows: sender name (e.g.
  "Dr. Sarah Chen, NP"), timestamp, 1-line preview, unread dot
- **Right pane:** selected thread view. Shows avatar/initials, sender
  role, message bubbles (patient-right, provider-left with different
  bubble colors), timestamps, and a text input with "Send" button
- Empty state for right pane when no thread selected
- "Typical response time: within 1 business day" reassurance label
  somewhere

**States:**
- **Empty inbox:** "Your care team will reach out here" illustration
- **1 thread, unread:** welcome message from Dr. Chen
- **Multiple threads, some unread:** inbox filtering by unread vs all
- **Active thread + composing:** input with character count or just a
  simple growing textarea

**User actions:**
- Click a thread → right pane shows that thread
- Type in input → "Send" button enables
- Send → message appended to thread with user's avatar; provider does
  NOT reply (honest demo — no fake AI replies)

**Connects to:** sidebar `Dashboard` link, header sign-out. Provider
profile links are stubs.

---

### 5.3 `orders.html` — Order history

**Purpose:** Reassure that medication is actually being shipped on
schedule.

**Content inventory:**
- Table or card list of orders. Each row: order #, date, medication +
  dose, status badge (Processing / Shipped / Delivered), tracking
  button, estimated delivery
- Summary header: "Next refill on [date]" and "Auto-ship: on"
- Filter: All / Shipped / Delivered (optional)
- Disclaimer below table: "Tracking unavailable in demo mode" (honest
  about the stub — tracking buttons are `disabled`)

**States:**
- **Empty (newUser):** "Your first shipment is being prepared"
  empty-state card with a cream illustration
- **Populated (week4):** 2 rows — month 1 delivered, month 2 shipped

**User actions:**
- Click tracking button → disabled, tooltip "Tracking unavailable in
  demo"
- Click order row → stub detail view (out of scope; OK to render as
  `disabled: cursor-not-allowed`)

**Connects to:** sidebar.

---

### 5.4 `progress.html` — Weight chart + log form

**Purpose:** Show longitudinal data prettily. Partners know the GLP-1
conversation is "does it work?" — this screen answers that visually.

**Content inventory:**
- Hero stat: starting weight, current weight, total change (e.g.
  "−5.2 lb since starting")
- Line chart (recharts `<LineChart>`) of `weightLogs` over time
  - X axis: dates
  - Y axis: weight (lb)
  - Line color: sage (`--primary`)
  - Point markers with hover tooltips
  - Optional goal line (dashed) if a goal weight is set
- "Log today's weight" form: single numeric input + Save button
- Recent entries list below chart (last 5)
- Disclaimer: "Results vary. Individual results not typical."

**States:**
- **Empty (0 logs):** empty chart with "Log your first weight to see
  your progress" CTA
- **1 log:** single dot, no line yet, "Keep logging weekly for best
  trends"
- **Many logs:** full chart

**User actions:**
- Enter a weight → Save → chart updates immediately, entry appended to
  list, persists to localStorage
- Click a data point → small tooltip with date + weight

**Connects to:** sidebar. Link to "Learn about weight plateaus" in
Resources.

---

### 5.5 `resources.html` — Educational content

**Purpose:** Signal that Nuvela cares about the journey, not just
dispensing drugs.

**Content inventory:**
- Grid of 6 content cards, each with: category pill (Getting Started /
  Side Effects / Nutrition / Mindset / Plateaus / Community), title,
  2-line preview, reading time (e.g. "4 min read")
- Card image area: use composed CSS shapes or muted color blocks (no
  photos). Designer should propose a repeatable decorative treatment —
  maybe 6 abstract swatches that pair with each category
- Article modal: opens on card click. Contains title, metadata,
  placeholder body copy (`lorem ipsum` is acceptable; real articles
  TBD), close button

**States:**
- **All cards unread** (default; no "read" tracking in MVP)
- **Modal open:** overlay + centered article card

**User actions:**
- Click card → modal opens
- Click overlay or close button → modal closes
- `Esc` closes modal (accessibility nicety)

**Connects to:** sidebar.

---

### 5.6 `signup.html` — Account creation

**Purpose:** Collect identity quickly, offer to skip.

**Content inventory:**
- Logo top-left (Nuvela wordmark)
- Heading: "Create your Nuvela account"
- Subheading: "So we can save your progress and connect you with your
  care team."
- Fields: first name, last name, email, password (show/hide toggle)
- Primary CTA: "Continue"
- Secondary link below CTA: "Continue as guest →" (smaller,
  foreground/60)
- "Already have an account? Sign in" link at bottom (stub — no sign-in
  route yet, OK to be disabled)
- Legal fine print: "By continuing, you agree to our Terms and Privacy."
  Links to existing `/terms` and `/privacy`.
- **Right side of desktop layout:** a warm illustrative panel or
  testimonial-style quote block (no photos; composed shapes OK). Fills
  dead space on wide screens.

**States:**
- **Pre-filled from quiz** (`?from=quiz`): first name / last name /
  email populated, focus lands on password
- **Empty** (direct navigation or `?skipped=quiz`)
- **Validation error:** inline field errors in coral

**User actions:**
- Submit form → writes to `demoState.user` → redirects to
  `/app/select-plan`
- Click "Continue as guest" → redirects to
  `/app/select-plan?skipped=signup`

**Connects to:** `/app/select-plan`, `/terms`, `/privacy`.

---

### 5.7 `select-plan.html` — 3-tier selector

**Purpose:** Let the patient pick a plan. Recommendation shown if quiz
was completed.

**Content inventory:**
- Heading: "Choose your plan"
- Subheading varies:
  - If quiz completed: "Based on your answers, we recommend
    **Accelerate**. You can change this anytime."
  - If quiz skipped: "Not sure? Take the assessment anytime for a
    personalized recommendation."
- 3 plan cards: **Start $199 / Accelerate $299 / Transform $399**
  (exact copy lives in `src/lib/plans.ts`; designer uses those strings)
- Each card: name, tagline, price/mo, dose range, ~6-8 features with
  check icons, radio-button selection state
- Recommended tier has a coral "Recommended for you" chip at the top
- Below cards: summary row ("Selected: Accelerate — $299/mo") +
  "Continue to checkout" primary CTA
- Fine print: "Pricing shown is illustrative. Cancel anytime. No
  insurance required." Links to `/medical-disclaimer`.

**States:**
- **Pre-selected (quiz completed):** recommendation's radio is checked
  on load
- **None selected (quiz skipped):** CTA disabled until user picks one
- **Hover:** card lifts; selected card has visible ring

**User actions:**
- Click card / radio → select that tier → summary updates
- Click CTA → writes to `demoState.plan` → redirects to
  `/app/checkout`

**Connects to:** `/app/checkout`. No link back to signup (user is past
that gate).

---

### 5.8 `checkout.html` — Stubbed Stripe-style payment

**Purpose:** Feel like Stripe Payment Element. Critical "is this real?"
moment.

**Content inventory:**
- **Left (form, ~60% width):**
  - Heading: "Payment details"
  - Billing name (editable text field — required if `?skipped=signup`,
    otherwise pre-filled read-only)
  - Billing email (same rule)
  - Card number field with card-brand icon on the right (Visa / MC /
    Amex detection by first digit — purely visual, no validation
    beyond format)
  - Expiration MM/YY and CVC side-by-side
  - Postal code
  - Save-card-for-future checkbox (cosmetic only)
  - "Pay $299/mo" primary CTA (price reflects selected plan)
  - Small lock icon + "Payments are encrypted" microcopy
- **Right (order summary, ~40% width):**
  - Selected plan name + tagline
  - Line: "Today's charge $299"
  - Line: "Billed monthly — cancel anytime"
  - Thin divider
  - 3 feature bullets from the plan
- Footer fine print: "By confirming, you authorize Nuvela to charge
  your card monthly until cancelled."

**States:**
- **Default:** all fields empty (or pre-filled if user exists)
- **Invalid card:** inline error "Please enter a valid card number"
- **Processing:** CTA shows spinner, text becomes "Processing
  payment...", form fields disabled, all for ~1.5s
- **Success:** redirect to `/app/welcome` (no intermediate success
  state on this page)

**User actions:**
- Type card `4242 4242 4242 4242` + any valid MM/YY + any 3-digit CVC
  + any 5-digit zip → submit → processing animation → welcome
- Submitting invalid card → inline error

**Connects to:** `/app/welcome`.

**Visual intent:** The pattern partners will unconsciously pattern-match
to is Stripe's Payment Element. Stacked fields with generous touch
targets, subtle input backgrounds (cream-tinted, not pure white),
branded card-brand icons. **Do NOT write "Powered by Stripe."** We
are not using Stripe in the demo.

---

### 5.9 `welcome.html` — Post-payment success

**Purpose:** Close the loop; transition the patient from "I just paid"
to "I have a care team."

**Content inventory:**
- Hero heading: "Welcome to Nuvela, [first name]"
- Subheading: "Your care team has been notified. Here's what happens
  next."
- **What-happens-next timeline (3 steps, vertical):**
  1. "Within 24 hours — your provider reviews your intake"
  2. "2-3 days — your medication ships from our partner pharmacy"
  3. "Day 5-7 — your first injection + your provider checks in"
  - Each step has: small icon circle, step heading, 1-line description
  - Connector lines between steps
- Primary CTA: "Go to your dashboard →"
- Secondary: "Questions? Message your care team" (links to messages
  once in dashboard)
- Order summary chip at top: "Plan: Accelerate — $299/mo,
  billed monthly"

**States:**
- One state. Content varies by plan/user but layout is fixed.

**User actions:**
- Click CTA → triggers `seed('newUser')` (populates dashboard state) →
  navigates to `/app/dashboard`

**Connects to:** `/app/dashboard`.

---

### 5.10 `not-eligible.html` — Oops branch

**Purpose:** Respectfully screen out patients with contraindications.
Do NOT make them feel rejected or punished — redirect them toward
their PCP.

**Content inventory:**
- Heading: "We're not able to serve you at this time"
- Empathetic paragraph: "Based on your answers — specifically
  **[contraindicationReason]** — GLP-1 medications may not be right for
  you. This isn't a reflection on you; it's how we keep treatment
  safe."
- Recommended next step: "Please talk to your primary care physician
  about weight-loss options that fit your health history."
- Secondary info card: "What to tell your doctor" — 3 bullets the
  patient can take to a PCP visit
- Footer actions: "Return to home" (primary) and "Read our medical
  disclaimer" (secondary, links to `/medical-disclaimer`)
- No CTA to retake the quiz — that would encourage lying about health
  history

**States:**
- One state. `contraindicationReason` is variable text read from
  `demoState.quiz.contraindicationReason`.

**User actions:**
- Click home → `/`
- Click disclaimer → `/medical-disclaimer`

**Connects to:** home, medical disclaimer.

**Tone:** warm, not corporate. This is the screen most likely to be
tested by a skeptical medical partner ("what happens if I answer
yes to thyroid cancer?"). It must feel responsible, not legalistic.

---

## 6. Shared components

Call these out as reusable patterns the designer should define once
and apply consistently across screens.

### 6.1 Sidebar navigation (persistent on `/app/dashboard/*`)
- Left rail, ~240px desktop / collapsed-icons at 1024px
- Logo at top (Nuvela wordmark, link to `/app/dashboard`)
- Nav items: Dashboard, Messages, Orders, Progress, Resources
- Each item: inline SVG icon + label
- Active route: coral left-border accent + slightly darker cream bg
- Unread message count badge on Messages item
- Bottom: user avatar/initials + first name + caret to open sign-out
  menu

### 6.2 App header (persistent on `/app/*` non-dashboard)
- Thin top bar for signup / select-plan / checkout / welcome
- Logo left, step indicator center (e.g. "Step 2 of 4"), "Sign out"
  right (hidden on signup)

### 6.3 Card container
- Default: `bg-white rounded-2xl border border-secondary/40 shadow-sm`
- Hover (interactive cards): lift + shadow increase
- Designer may propose refinements

### 6.4 Status badges
- Unread (messages): coral dot, 8px
- Order status: pill with bg-tint + darker text (processing =
  tan tint, shipped = sage tint, delivered = sage-dark tint)
- Plan tier: cream pill with brand-colored ring

### 6.5 Empty states
- Composed CSS illustration (abstract shapes, no photos)
- Heading + 1-line explanation
- Optional CTA
- Used on: empty inbox, empty orders, empty weight logs

### 6.6 Inline feedback
- Success: sage check icon + text
- Error: coral icon + text (never raw red; coral is our error color)
- Toast (optional, for message-sent confirmation): bottom-center
  rounded-full pill, auto-dismiss 3s

### 6.7 Forms
- Labels above inputs, not inside (float labels are overkill for MVP)
- Inputs: cream-tinted bg, sage focus ring, coral error ring
- Buttons: primary = sage, secondary = outlined, accent = coral (used
  sparingly for the "pay" CTA)

---

## 7. Demo toolbar — out of scope for design

The `?demo=1` floating toolbar is a founder/dev utility, not a patient-
facing surface. It is **not part of this brief.** A functional minimum
style is fine — designer does not need to produce a comp for it.

---

## 8. Deliverables format

### Preferred: static HTML files with inline `<style>`
- One file per screen, self-contained (no external deps)
- Named exactly as listed in Section 4 (e.g. `dashboard.html`)
- Class names don't need to match Tailwind — coding-Claude will port
  styles to Tailwind utilities
- Saved to `docs/designs/` in this repo

### Acceptable alternative: PNG screenshots + NOTES.md
- One PNG per screen, 1440px-wide artboards
- A `docs/designs/NOTES.md` with enough layout/spacing/color detail to
  reconstruct (e.g. "32px card padding, 16px gap, primary button
  48px tall")
- Pure screenshots without notes are NOT sufficient

### Either way: include a short `docs/designs/NOTES.md` covering
- Any new color tokens proposed (with hex + intended usage)
- Motion preferences (which screens have entrance animations, how
  long, what easing)
- Responsive behavior where it differs from "stack and shrink" defaults
- Any deliberate departures from the spec above

---

## 9. Explicit non-goals

Designer must **not** touch any of the following:

| Out of scope | Why |
|---|---|
| Marketing pages (`/`, `/pricing`, `/how-it-works`, `/about`, `/providers`, `/faq`) | They already have a working visual direction |
| Legal pages (`/privacy`, `/terms`, `/medical-disclaimer`) | Intentionally plain-text |
| Navbar and Footer | In place; reused on `/app/*` is optional but they aren't to be redesigned |
| `/get-started` quiz | Existing, works, out of scope |
| Demo toolbar | See Section 7 |
| Mobile-first breakpoints | Desktop-first is pitch-optimal |
| Accessibility audit beyond semantic HTML + focus states | Not a WCAG-compliance deliverable |
| Backend/API design | There is no backend; everything is localStorage |
| Real medical content in resources modal | Lorem ipsum is fine; real copy comes later |

---

## Hand-off checklist for designer

- [ ] Priority 1 screens designed (dashboard + 4 subpages)
- [ ] Priority 2 screens designed OR explicitly deferred to brand-token
      fallback
- [ ] Priority 3 screen designed (not-eligible)
- [ ] Files saved to `docs/designs/` in the repo
- [ ] `NOTES.md` written covering new tokens, motion, responsive
- [ ] No new npm deps introduced in any design
- [ ] No external images or icon fonts used

Once delivered, coding-Claude (Phase 1 of the plan) reads from
`docs/designs/` and implements against those references.
