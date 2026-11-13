import { Montserrat } from "next/font/google";

// Montserrat 600 for headings on the ad pages (/pages and /lp), instead of the main site's Instrument Serif.
// One config shared by both layouts, so the font is loaded once.
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600"],
  style: ["normal", "italic"],
});
