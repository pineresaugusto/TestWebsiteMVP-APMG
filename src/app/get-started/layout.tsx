import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/seo";

// /get-started is the conversion page (the assessment quiz). We DO
// want it indexed — many high-intent searches like "free GLP-1
// eligibility quiz" or "see if I qualify for semaglutide" should
// land here. The form itself is client-side; metadata lives here.
export const metadata: Metadata = {
  title: "Free GLP-1 Eligibility Assessment — Start Online",
  description:
    "Take Nuvela's free 5-minute GLP-1 eligibility assessment. Answer a few questions and see if online GLP-1 weight loss treatment with a licensed provider may be right for you.",
  alternates: { canonical: "/get-started" },
  openGraph: {
    url: "/get-started",
    title: `Free GLP-1 Eligibility Assessment | ${SITE_NAME}`,
    description:
      "Answer a few questions and see if GLP-1 weight loss treatment with a licensed provider may be right for you. Takes about 5 minutes.",
  },
};

export default function GetStartedLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
