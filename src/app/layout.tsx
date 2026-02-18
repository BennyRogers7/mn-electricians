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
  title: {
    default: "MN Plumbers Directory | Find Licensed Plumbers in Minnesota",
    template: "%s | MN Plumbers Directory",
  },
  description:
    "Find trusted, licensed plumbers in Minnesota. Browse 628+ plumbers across 62 cities. Read reviews, compare ratings, and get quotes from local plumbing professionals.",
  keywords: [
    "Minnesota plumbers",
    "MN plumbers",
    "plumbers near me",
    "licensed plumbers Minnesota",
    "plumbing services MN",
  ],
  openGraph: {
    title: "MN Plumbers Directory | Find Licensed Plumbers in Minnesota",
    description:
      "Find trusted, licensed plumbers in Minnesota. Browse 628+ plumbers across 62 cities.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
