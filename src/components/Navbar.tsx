"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary-dark">
            Nuvela
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-started"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground/70"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-secondary-light transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="block rounded-full bg-accent px-6 py-2.5 text-center text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
