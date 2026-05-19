import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/seo";

// /get-started is the conversion page (the assessment quiz). We DO want
// it indexed — many high-intent searches like "free GLP-1 eligibility
// quiz" or "see if I qualify for semaglutide" should land here. Title
// leads with weight-loss keyword surface; description broadens to the
// other programs added in Iter 13. The form itself is client-side;
// metadata lives here.
export const metadata: Metadata = {
  title: "Free 2-Minute GLP-1 & Peptide Program Assessment — Nuvela",
  description:
    "Take Nuvela's free 2-minute assessment. Pick a program — weight management, vitality, or sexual & intimacy — and see if doctor-prescribed treatment with a licensed provider may be right for you.",
  alternates: { canonical: "/get-started" },
  openGraph: {
    url: "/get-started",
    title: `Free 2-Minute Program Assessment | ${SITE_NAME}`,
    description:
      "Pick a program (weight management, vitality, or sexual & intimacy) and see if doctor-prescribed treatment with a licensed provider may be right for you. Takes under 2 minutes.",
  },
};

export default function GetStartedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
