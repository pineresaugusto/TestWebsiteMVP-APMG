import type { Metadata } from "next";
import type { ReactNode } from "react";
import FunnelHeader from "./_components/FunnelHeader";

// Funnel + dashboard are demo surfaces only — we never want them in
// the search index. robots.ts also blocks the path; this metadata is
// belt-and-suspenders so any agent that crawls the path anyway
// (ignoring robots.txt) still sees the directive on the page itself.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <FunnelHeader />
      {children}
    </div>
  );
}
