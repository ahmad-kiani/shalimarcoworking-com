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
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
