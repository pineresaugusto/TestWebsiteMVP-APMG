import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-20 text-center md:py-28">
      <span className="inline-flex rounded-full border border-secondary bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
        Coming in Iteration B
      </span>
      <h1 className="mt-6 font-display text-3xl font-medium text-foreground md:text-4xl">
        Dashboard coming in next iteration
      </h1>
      <p className="mt-3 text-sm text-foreground/55 md:text-base">
        The patient dashboard — next injection, orders, messages, weight
        tracking — lands in the next iteration. For now, the funnel flow is
        wired end-to-end.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
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
