# Nuvela App Design — Design Notes

## New Tokens Proposed

| Token | Hex | Usage |
|---|---|---|
| `--primary-light` | `#a3bda8` | Lighter sage for subtle backgrounds |
| `--danger` | `#E07A5F` | Alias of accent — error states |
| `--success` | `#7C9A82` | Alias of primary — success states |
| `--info` | `#8BA4C4` | Soft blue — informational badges (unused in MVP) |
| `--warning` | `#D4A857` | Warm gold — warning states (unused in MVP) |

## Motion

- **Page entry:** `fadeInUp` 500ms ease, staggered 80ms per element (cards, sections)
- **Hover states:** 200ms ease on cards (translateY -1px + shadow increase), buttons (background darken)
- **Chart tooltip:** 150ms opacity fade
- **Checkout processing:** CSS spinner 0.6s linear infinite
- **Welcome checkmark:** `scaleIn` 500ms with overshoot (scale 1.15 → 1)
- **Modal overlay:** 250ms opacity + card translateY
- **Toast:** 300ms slide-up + fade, auto-dismiss 3s

## Responsive Behavior

- **Primary breakpoint:** 1440px (desktop-first as specified)
- **Sidebar:** Fixed 260px left rail. At ≤1024px would collapse to icons — not implemented, deferred
- **Funnel screens:** Centered max-width containers (960px checkout, 1080px plans, 640px welcome/not-eligible)
- **Signup:** 2-column grid (form + decorative panel) — would stack on mobile
- **Dashboard grid:** 2-column — would stack to single column on tablet
- **Messages:** 340px thread list + fluid thread view — would need mobile drawer pattern

## Architecture

- `shared.css` — All tokens, sidebar, header, cards, forms, badges, buttons, animations
- `shared.js` — Demo state (localStorage), seed data (newUser / week4), SVG icons, date helpers
- Each screen is a self-contained HTML file referencing the shared assets
- State toggle (bottom-right) switches between newUser and week4 seeds

## Deliberate Departures from Spec

- **Sidebar active state:** Uses coral left-border accent + white background (spec said "slightly darker cream bg" — white felt cleaner against the gradient sidebar)
- **Messages:** Used iMessage-style rounded bubbles with sage for user messages instead of a neutral color — felt more branded
- **Chart:** Pure SVG rather than recharts (since these are static HTML files without npm). Coding-Claude should swap in recharts `<LineChart>` during implementation
- **Empty states:** Used abstract geometric shapes (circles, dashed boxes, lines) in brand colors — minimal and consistent
- **Icon style:** All inline SVG, 1.8px stroke, round caps/joins — consistent with existing marketing site style

## Files Delivered

1. `dashboard.html` — Dashboard home (P1)
2. `messages.html` — Inbox + thread view (P1)
3. `orders.html` — Order history table (P1)
4. `progress.html` — Weight chart + log form (P1)
5. `resources.html` — Educational content grid + article modal (P1)
6. `signup.html` — Account creation (P2)
7. `select-plan.html` — 3-tier plan selector (P2)
8. `checkout.html` — Stubbed payment form (P2)
9. `welcome.html` — Post-payment success timeline (P2)
10. `not-eligible.html` — Respectful screen-out (P3)
