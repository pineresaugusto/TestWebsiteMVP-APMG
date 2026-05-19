import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/seo";

// /providers is a B2B page targeting clinicians, not patients.
// Different keyword cluster: "GLP-1 telehealth provider partner",
// "join GLP-1 telehealth network", "compounded semaglutide
// prescribing platform". We deliberately keep this lower-priority
// in the sitemap so it doesn't compete with /pricing or /how-it-works
// for B2C intent.
export const metadata: Metadata = {
  title: "For Healthcare Providers — Join the Nuvela Peptide Network",
  description:
    "Partner with Nuvela's peptide telehealth platform — GLP-1 weight management leads, with vitality and sexual health programs. We handle patient acquisition, technology, and operations so licensed providers can focus on care.",
  alternates: { canonical: "/providers" },
  openGraph: {
    url: "/providers",
    title: `For Healthcare Providers — Join the ${SITE_NAME} Network`,
    description:
      "Grow your practice with peptide telehealth — GLP-1 weight loss leads. Nuvela handles patient flow, scheduling, and operations — you focus on practicing medicine.",
  },
};

export default function ProvidersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
