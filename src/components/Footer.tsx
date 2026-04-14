import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl text-white tracking-[-0.01em]"
            >
              Nuvela
            </Link>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Clinically-proven GLP-1 weight loss treatment, guided by licensed providers.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/how-it-works", label: "How It Works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/about", label: "About Us" },
                { href: "/get-started", label: "Get Started" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/providers", label: "For Providers" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/medical-disclaimer", label: "Medical Disclaimer" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="text-xs leading-5 text-white/40">
            Nuvela connects patients with independent licensed healthcare providers. All medical
            decisions are made by your provider. Compounded medications are not FDA-approved but are
            prepared in FDA-regulated 503B pharmacies. Individual results vary. Not available in all
            states.
          </p>
          <p className="mt-4 text-xs text-white/40">
            &copy; {new Date().getFullYear()} Nuvela. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
