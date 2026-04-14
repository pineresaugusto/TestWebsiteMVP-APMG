import type { ReactNode } from "react";

type PageHeroProps = {
  /** Small uppercase kicker above the headline (e.g. "About", "Pricing"). */
  kicker?: string;
  /** Headline. Rendered with the display serif. */
  title: ReactNode;
  /** Optional supporting paragraph below the headline. */
  description?: ReactNode;
  /** Optional slot for CTAs or extra content below the description. */
  children?: ReactNode;
  /** Overall vertical rhythm. Defaults to `md`. */
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<PageHeroProps["size"]>, string> = {
  sm: "py-14 md:py-20",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

/**
 * Shared page hero for all secondary pages (not the home hero, which is
 * editorial and custom). Gives every non-home page the same warm atmospheric
 * top-of-page: glow gradient, grain texture, serif headline, optional kicker.
 *
 * Server component — no client state needed.
 */
export default function PageHero({
  kicker,
  title,
  description,
  children,
  size = "md",
}: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden bg-glow-sage ${sizeClasses[size]}`}>
      <div
        aria-hidden
        className="absolute inset-0 bg-grain opacity-[0.35] pointer-events-none mix-blend-multiply"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {kicker && (
          <p className="rule-kicker text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-dark mb-5">
            {kicker}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground max-w-3xl mx-auto">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
