import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Libre_Baskerville } from "next/font/google";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteUrl } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Used only for the "Shalimar" wordmark in the logo.
const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shalimar Coworking | Coworking Space in Blue Area, Islamabad",
  description:
    "Hot desks, dedicated desks, private offices, conference rooms and virtual offices at ATS Centre, Blue Area, Islamabad. Book a tour.",
};

export const viewport: Viewport = {
  themeColor: "#1d211f",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${instrumentSerif.variable} ${libreBaskerville.variable} antialiased`}>
      <body className="font-sans">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-cream focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-brass"
        >
          Skip to content
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
