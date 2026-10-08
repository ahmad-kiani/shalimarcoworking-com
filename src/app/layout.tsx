import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Shalimar Coworking | Private Offices, Desks & Meeting Rooms",
  description:
    "Private offices, dedicated desks and meeting rooms at Shalimar Coworking. Book a tour or try a day pass.",
};

export const viewport: Viewport = {
  themeColor: "#1d211f",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
