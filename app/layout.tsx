import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "Abdullah Usama - Software Engineer & AI Developer",
    template: "%s | Abdullah Usama"
  },
  description: "I'm a final-year Software Engineering student at NUST with expertise in AI Agents, Automations, and Web Development. Building innovative solutions with modern technologies.",
  keywords: [
    "Abdullah Usama",
    "Software Engineer",
    "AI Developer",
    "NUST",
    "Software Engineering",
    "AI Agents",
    "Web Development",
    "Automation",
    "Machine Learning",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer"
  ],
  authors: [{ name: "Abdullah Usama" }],
  creator: "Abdullah Usama",
  publisher: "Abdullah Usama",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdullahusama.site',
    title: 'Abdullah Usama - Software Engineer & AI Developer',
    description: "I'm a final-year Software Engineering student at NUST with expertise in AI Agents, Automations, and Web Development. Building innovative solutions with modern technologies.",
    siteName: 'Abdullah Usama Portfolio',
    images: [
      {
        url: 'https://abdullahusama.site/me.jpg',
        width: 1200,
        height: 630,
        alt: 'Abdullah Usama - Software Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Usama - Software Engineer & AI Developer',
    description: "I'm a final-year Software Engineering student at NUST with expertise in AI Agents, Automations, and Web Development. Building innovative solutions with modern technologies.",
    images: ['https://abdullahusama.site/me.jpg']
  },
  alternates: {
    canonical: 'https://abdullahusama.site'
  },
  other: {
    'google-site-verification': 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/me.jpg" />
        <link rel="apple-touch-icon" href="/me.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
