import { site, siteUrl } from "@/content/site";

// Structured data (schema.org JSON-LD) that tells Google this site belongs to the Shalimar Coworking listing on
// Google Maps: same name, address, phone, hours and map pin as the Business Profile. Invisible to visitors.
// No prices on purpose: they stay on the website only (see data-nosnippet on the pricing section).
const business = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "Shalimar Coworking",
  description:
    "Coworking space at ATS Centre, Blue Area, Islamabad: hot desks, dedicated desks, private offices, conference rooms by the hour and virtual offices.",
  url: `${siteUrl}/`,
  telephone: site.phoneHref,
  email: site.email,
  image: `${siteUrl}/spaces/open-floor.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 1, Floor 1, ATS Centre, AKM Fazl-ul-Haq Road, Blue Area, G-6/3",
    addressLocality: "Islamabad",
    addressRegion: "Islamabad Capital Territory",
    postalCode: "44000",
    addressCountry: "PK",
  },
  // The Business Profile's map pin (from Google Maps, 2026-11-18).
  geo: { "@type": "GeoCoordinates", latitude: 33.7245729, longitude: 73.0860015 },
  hasMap: `https://www.google.com/maps/place/?q=place_id:${site.mapPlaceId}`,
  // Open past midnight: closes at 3 AM the next morning.
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "03:00",
    },
  ],
  areaServed: { "@type": "City", name: "Islamabad" },
  amenityFeature: [
    "High-speed internet",
    "Complimentary tea and coffee",
    "Conference rooms",
    "Heating and air conditioning",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export default function BusinessSchema() {
  return (
    <script
      type="application/ld+json"
      // "<" escaped so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, "\\u003c") }}
    />
  );
}
