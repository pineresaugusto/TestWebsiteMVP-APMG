"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger child reveals by applying an animation-delay, in ms. */
  delay?: number;
  /** Render as a different element. Defaults to `div`. */
  as?: ElementType;
  className?: string;
};

/**
 * Lightweight scroll-reveal wrapper. Adds `is-visible` to the element the
 * first time it intersects the viewport, which triggers the `reveal-up`
 * keyframe animation defined in globals.css. Honors prefers-reduced-motion
 * automatically (the CSS disables the animation in that case).
 *
 * Kept intentionally tiny so no animation library dependency is needed.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref as never}
      className={`reveal${visible ? " is-visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
