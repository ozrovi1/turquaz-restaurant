import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StickyHeader } from "@/components/StickyHeader";
import { MobileFloatingButton } from "@/components/MobileFloatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turquaz | Turkish Kitchen Across the UK",
  description: "Authentic Turkish and Mediterranean cuisine at four locations across the UK.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a1f0a] text-[#faf8f5]`}
      >
        <StickyHeader />
        {children}
        <MobileFloatingButton />
      </body>
    </html>
  );
}
