import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WealthForge - Forge Your Path to Wealth",
  description: "AI-powered platform that helps you build profitable income streams and launch businesses in 24 hours. Get personalized strategies, business blueprints, and AI coaching.",
  keywords: ["AI business", "income strategies", "business blueprint", "side hustle", "entrepreneurship", "wealth building"],
  authors: [{ name: "WealthForge" }],
  creator: "WealthForge",
  publisher: "WealthForge",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wealthforge.online",
    siteName: "WealthForge",
    title: "WealthForge - Forge Your Path to Wealth",
    description: "AI-powered platform that helps you build profitable income streams and launch businesses in 24 hours.",
    images: [
      {
        url: "https://wealthforge.online/logo.png",
        width: 1200,
        height: 630,
        alt: "WealthForge - AI Business Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WealthForge - Forge Your Path to Wealth",
    description: "AI-powered platform that helps you build profitable income streams and launch businesses in 24 hours.",
    images: ["https://wealthforge.online/logo.png"],
    creator: "@wealthforge",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
  },
  alternates: {
    canonical: "https://wealthforge.online",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
