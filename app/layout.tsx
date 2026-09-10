import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AlertBanner from "@/components/layout/AlertBanner";

/* ── Fonts ─────────────────────────────────────────────────────────────
   next/font self-hosts both — no runtime requests to Google.
──────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

/* ── Site-wide metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Trece Martires City Water District",
    template: "%s | TMCWD",
  },
  description:
    "Official website of the Trece Martires City Water District — providing safe, reliable water service to Trece Martires City, Cavite.",
  keywords: [
    "TMCWD",
    "Trece Martires City Water District",
    "water district",
    "Cavite",
    "water service",
    "government",
  ],
  metadataBase: new URL("https://tmcwd.gov.ph"),
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Trece Martires City Water District",
  },
};

/* ── Root layout ───────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PH" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <AlertBanner />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
