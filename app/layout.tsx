import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AlertBanner from "@/components/layout/AlertBanner";
import DataPrivacyModal from "@/components/layout/DataPrivacyModal";
import BackToTop from "@/components/layout/BackToTop";
import AccessibilityWidget from "@/components/layout/AccessibilityWidget";
import MaintenanceOverlay from "@/components/layout/MaintenanceOverlay";

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
  verification: {
    google: "4j1wF_pAsF52nzOS_XCbtiULQx7jjSKeFGTsoYVV7Tc",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "Trece Martires City Water District",
    images: [
      {
        url: "/OG-IMG.png",
        width: 1200,
        height: 630,
        alt: "Trece Martires City Water District — Serbisyong Malinis, Tapat, at Maaasahan.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/OG-IMG.png"],
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
      <head>
        {/* Preload the first hero image so LCP is fast */}
        <link rel="preload" as="image" href="/imgv3.jpg" fetchPriority="high" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <DataPrivacyModal />
        <MaintenanceOverlay />
        <AlertBanner />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <BackToTop />
        <AccessibilityWidget />
        <Footer />
      </body>
    </html>
  );
}
