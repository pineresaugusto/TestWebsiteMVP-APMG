<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Recent changes

A running changelog lives at [`CHANGELOG.md`](./CHANGELOG.md). Read it before
starting new work — it is the canonical record of what has landed and what
remains intentionally deferred. The short version as of the most recent
iteration:

- **Iteration 1 (information + legal scaffolding)** added four pages —
  `/faq`, `/privacy`, `/terms`, `/medical-disclaimer` — plus a `FAQItem`
  client component, a real footer (replacing `href="#"` placeholders), and
  softer home-page drug-efficacy copy with a proper citation. See
  `CHANGELOG.md` for the full diff summary.
- **Known issues still in the codebase** (intentionally deferred, not bugs to
  fix reflexively): fabricated state list in `src/app/get-started/page.tsx`,
  advertised pricing for medication that cannot currently be dispensed in
  `src/app/pricing/page.tsx`, provider-recruitment page that describes a
  network that does not operationally exist, dead "Schedule Your
  Consultation" CTA, and a footer 503B-pharmacy claim that is not currently
  accurate. These are tracked in `CHANGELOG.md` under "Known issues
  (deferred)" and should only be touched when the business-side prerequisites
  (licensure, pharmacy partnership, provider group) are actually in place.
- **Verification debt:** the authoring environment had no Node toolchain, so
  `npm install`, `npm run dev`, `npm run build`, and `npm run lint` were
  **not** run against Iteration 1. Anyone continuing work should run these
  before adding new code on top.

### Working conventions for future agent sessions

- Append a new `## [Unreleased] — Iteration N: <theme>` section to
  `CHANGELOG.md` whenever you start a new iteration. Keep Added / Changed /
  Removed / Known issues / Verification-steps-owed as sub-headings so the
  file stays scannable.
- Do not commit `.claude/settings.local.json`. It is gitignored; each
  developer's machine writes its own copy. If you see it in `git status`,
  something has gone wrong.
- When in doubt about a Next.js 16 API, the bundled docs at
  `node_modules/next/dist/docs/` are authoritative. They ship with the
  installed version, unlike anything in training data.
