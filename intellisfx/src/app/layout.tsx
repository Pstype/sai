import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IntelliSFX",
    template: "%s | IntelliSFX",
  },
  description: "AI-powered video sound design and music generation platform. Transform your videos with intelligent audio enhancement, automatic music scoring, and professional sound effects.",
  keywords: [
    "AI video editing",
    "sound design",
    "music generation",
    "video enhancement",
    "audio AI",
    "automatic scoring",
    "sound effects",
    "video production",
  ],
  authors: [{ name: "IntelliSFX Team" }],
  creator: "IntelliSFX",
  publisher: "IntelliSFX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://intellisfx.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intellisfx.com",
    title: "IntelliSFX - AI-Powered Video Sound Design",
    description: "Transform your videos with intelligent audio enhancement, automatic music scoring, and professional sound effects.",
    siteName: "IntelliSFX",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliSFX - AI-Powered Video Sound Design",
    description: "Transform your videos with intelligent audio enhancement, automatic music scoring, and professional sound effects.",
    creator: "@intellisfx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8B5CF6" },
    { media: "(prefers-color-scheme: dark)", color: "#8B5CF6" },
  ],
};

import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <div id="root" className="relative min-h-screen">
          

        
