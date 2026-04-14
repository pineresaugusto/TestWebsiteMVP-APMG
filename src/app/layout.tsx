import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display serif for headlines. Optical sizing + soft-but-authoritative feel
// suits a warm wellness brand; pairs cleanly with Inter for body copy.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "Nuvela — GLP-1 Weight Loss Treatment Online",
  description:
    "Nuvela connects you with licensed healthcare providers for clinically-proven GLP-1 weight loss treatment. All-inclusive monthly plans with medication, consultations, and home delivery.",
  openGraph: {
    title: "Nuvela — GLP-1 Weight Loss Treatment Online",
    description:
      "Clinically-proven GLP-1 weight loss treatment with licensed providers. All-inclusive plans starting at $199/mo.",
    type: "website",
    locale: "en_US",
    siteName: "Nuvela",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
