import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { UmamiAnalytics } from "@/components/analytics";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "People's Auditor - Kenya's Public Finance Watchdog",
  description: "Kenya's public finance watchdog. Tracking national debt, county budgets, and corruption exposés.",
  keywords: ["Kenya", "public finance", "corruption", "transparency", "accountability", "county budgets", "national debt"],
  authors: [{ name: "People's Auditor" }],
  openGraph: {
    title: "People's Auditor - Kenya's Public Finance Watchdog",
    description: "Kenya's public finance watchdog. Tracking national debt, county budgets, and corruption exposés.",
    type: "website",
    locale: "en_KE",
    siteName: "People's Auditor",
  },
  twitter: {
    card: "summary_large_image",
    title: "People's Auditor - Kenya's Public Finance Watchdog",
    description: "Kenya's public finance watchdog. Tracking national debt, county budgets, and corruption exposés.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Toaster />
        <UmamiAnalytics />
      </body>
    </html>
  );
}

