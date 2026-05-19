import type { Metadata } from "next";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, SITE_NAME } from "@/lib/seo";

// page.tsx is a client component (it has interactive FAQ items at the
// bottom), so the metadata can't live on it. This layout owns the
// per-route metadata and the BreadcrumbList JSON-LD without changing
// the page's interactivity.
export const metadata: Metadata = {
  title: "How Nuvela Works — GLP-1 Weight Loss & Other Peptide Programs",
  description:
    "See how Nuvela's online GLP-1 weight loss treatment works — plus a brief look at vitality and sexual health programs. Short assessment, virtual consultation with a licensed provider, prescription if appropriate, and home delivery.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    url: "/how-it-works",
    title: `How GLP-1 Weight Loss & Other Programs Work | ${SITE_NAME}`,
    description:
      "From assessment to delivery — a calm, step-by-step look at the online GLP-1 weight loss experience, plus other Nuvela peptide programs.",
  },
};

const howItWorksBreadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
]);

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howItWorksBreadcrumb),
        }}
      />
    </>
  );
}
