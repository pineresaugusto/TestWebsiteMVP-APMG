import Link from "next/link";

export default function NotEligiblePage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-20 text-center md:py-28">
      <span className="inline-flex rounded-full border border-secondary bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
        Coming in Iteration C
      </span>
      <h1 className="mt-6 font-display text-3xl font-medium text-foreground md:text-4xl">
        Not-eligible screen coming soon
      </h1>
      <p className="mt-3 text-sm text-foreground/55 md:text-base">
        For the demo walkthrough, this screen mirrors the inline disqualification
        result on the assessment. A dedicated funnel version lands in Iteration C.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Link
          href="/get-started"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Retake the assessment
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-primary-dark transition-colors hover:text-accent"
        >
          ← Back to homepage
        </Link>
      </div>
    </div>
  );
}
