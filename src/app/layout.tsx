import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mnelectricians.com"),
  title: {
    default: "MN Electricians Directory | Find Licensed Electricians in Minnesota",
    template: "%s | MN Electricians Directory",
  },
  description:
    "Find trusted, licensed electricians in Minnesota. Browse 670+ electricians across 62 cities. Read reviews, compare ratings, and get quotes from local electrical professionals.",
  keywords: [
    "Minnesota electricians",
    "MN electricians",
    "electricians near me",
    "licensed electricians Minnesota",
    "electrical services MN",
  ],
  openGraph: {
    title: "MN Electricians Directory | Find Licensed Electricians in Minnesota",
    description:
      "Find trusted, licensed electricians in Minnesota. Browse 670+ electricians across 62 cities.",
    type: "website",
    locale: "en_US",
    siteName: "MN Electricians Directory",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "MN Electricians Directory - Find Licensed Electricians in Minnesota",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MN Electricians Directory | Find Licensed Electricians in Minnesota",
    description:
      "Find trusted, licensed electricians in Minnesota. Browse 670+ electricians across 62 cities.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MN Electricians Directory",
  url: "https://mnelectricians.com",
  logo: "https://mnelectricians.com/images/og-image.png",
  description:
    "Find trusted, licensed electricians in Minnesota. Browse 670+ electricians across 62 cities.",
  areaServed: {
    "@type": "State",
    name: "Minnesota",
    addressCountry: "US",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MN Electricians Directory",
  url: "https://mnelectricians.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://mnelectricians.com/{city}",
    "query-input": "required name=city",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
