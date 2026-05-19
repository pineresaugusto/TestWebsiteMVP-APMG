import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your Nuvela patient account to message your care team, view orders, and track progress.",
  alternates: { canonical: absoluteUrl("/signin") },
  openGraph: {
    title: "Sign in to Nuvela",
    description:
      "Sign in to message your care team, view orders, and track progress.",
    url: absoluteUrl("/signin"),
    type: "website",
  },
  // Sign-in is a utility page, not a marketing landing surface — keep it out
  // of the index but allow follow so internal link equity propagates.
  robots: { index: false, follow: true },
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children;
}
