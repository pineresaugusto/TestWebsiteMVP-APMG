import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { GatedFooter, GatedNavbar } from "@/components/ChromeGate";
import DemoToolbar from "@/components/DemoToolbar";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display serif for headlines. Lora: clean, warm, conventional letterforms —
// no quirky terminals. Pairs naturally with Inter for body copy.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// SEO root: title template lets per-page titles read like
// "Pricing | Nuvela — GLP-1 Weight Loss Treatment" without each page
// having to repeat the brand suffix. metadataBase lets Next.js resolve
// relative URLs (canonical, OG image) into absolute ones.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Nuvela's GLP-1 weight loss program leads doctor-prescribed peptide care, with vitality and sexual health programs alongside. Connects you with licensed providers for clinically-studied treatment, delivered to your door — no insurance required, cancel anytime.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "health",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "GLP-1 weight loss treatment plus vitality and sexual health programs. Licensed providers, clinically-studied treatment, home delivery. From $159/month.",
    images: [
      {
        url: "/images/home-bedroom.jpg",
        width: 1400,
        height: 1750,
        alt: "Person relaxing at home, smiling at their phone — Nuvela telehealth peptide programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "GLP-1 weight loss treatment plus vitality and sexual health programs. Licensed providers, home delivery, from $159/month.",
    images: ["/images/home-bedroom.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

// Organization JSON-LD: tells search engines who Nuvela is at the brand
// level. Used site-wide. Kept deliberately conservative — no
// MedicalBusiness type because Nuvela is a platform, not a practice
// (see /faq "Is Nuvela a pharmacy or a medical practice?").
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Online doctor-prescribed peptide care — led by GLP-1 weight management, with vitality and sexual health programs alongside. Connects patients with licensed healthcare providers across the United States.",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "GLP-1 weight loss treatment",
    "Compounded semaglutide",
    "Compounded tirzepatide",
    "Telehealth weight loss",
    "Online weight loss program",
    "Compounded peptide treatments",
    "Sermorelin therapy",
    "Tesamorelin therapy",
    "PT-141 bremelanotide",
    "Sexual health telehealth",
    "Vitality and recovery programs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <GatedNavbar />
        <main className="flex-1">{children}</main>
        <GatedFooter />
        <DemoToolbar />
        <script
          type="application/ld+json"
          // Inline JSON-LD is the canonical way to deliver structured data;
          // dangerouslySetInnerHTML avoids React string-escaping that would
          // break the JSON.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
