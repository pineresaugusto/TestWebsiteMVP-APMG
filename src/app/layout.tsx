import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "Nuvela — GLP-1 Weight Loss Treatment Online",
  description:
    "Nuvela connects you with licensed healthcare providers for clinically-studied GLP-1 weight loss treatment. All-inclusive monthly plans with medication, consultations, and home delivery.",
  openGraph: {
    title: "Nuvela — GLP-1 Weight Loss Treatment Online",
    description:
      "Clinically-studied GLP-1 weight loss treatment with licensed providers. All-inclusive plans starting at $199/mo.",
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
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
