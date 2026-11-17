import { annualPrice, pricing, site, siteUrl, usd } from "@/content/site";

// /llms.txt: a plain-text summary of Shalimar for AI assistants (ChatGPT, Claude, Perplexity...), following the
// llms.txt convention. Built from site.ts, so prices and contact details stay in step with the website.
const fmt = (n: number) => n.toLocaleString("en-US");
const both = (pkr: number) => `PKR ${fmt(pkr)} (US$${fmt(usd(pkr))})`;

// Private office prices are per seat, not per room.
const per = (p: { name: string; unit: string }) => (p.name === "Private Office" ? `per seat per ${p.unit}` : `per ${p.unit}`);
const plans = pricing.plans.map(
  (p) => `- ${p.name}: ${both(p.price)} ${per(p)}, or ${both(annualPrice(p.price))} ${per(p)} paid annually. ${p.body}`,
);
const onDemand = pricing.onDemand.items.map((i) => `- ${i.name}: ${both(i.price)} per ${i.unit}. ${i.body}`);

const body = `# Shalimar Coworking

> Coworking space at ATS Centre, Blue Area, Islamabad, Pakistan. Hot desks, dedicated desks, private offices for 2 to 4 people, conference rooms by the hour and virtual offices.

## Contact
- Address: ${site.address.join(", ")} (AKM Fazl-ul-Haq Road, postcode 44000)
- Phone: ${site.phone}
- Email: ${site.email}
- Hours: ${site.hours[1]}, ${site.hours[0]}. Closed Sunday.
- Google Maps: https://www.google.com/maps/place/?q=place_id:${site.mapPlaceId}
- Website: ${siteUrl}/

## Prices
Members can pay in Pakistani rupees or US dollars.
${plans.join("\n")}
${onDemand.join("\n")}

## Included with every plan
High-speed internet, complimentary tea and coffee all day, ergonomic furniture, heating in winter and cooling in summer, shared lounges, networking events and workshops.

## Visiting
Call, WhatsApp or email to book a tour of the space.

## Pages
- [Home, spaces and pricing](${siteUrl}/)
- [Privacy Policy](${siteUrl}/privacy-policy)
`;

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
