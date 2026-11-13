// Listicle pages (/pages/<slug>), laid out like NOBL's /pages/safety advertorial.
// Add a page by adding an object to `listicles`; the route, metadata and sitemap pick it up.
// In body text, **double asterisks** make a phrase bold.

import { pricing, sale } from "./site";
import { member, type Review } from "./reviews";

export type { Review };

export type Listicle = {
  slug: string;
  // Added to WhatsApp messages so every enquiry shows which page it came from.
  code: string;
  // false keeps the page out of Google and the sitemap (e.g. ad-only pages).
  index: boolean;
  meta: { title: string; description: string };
  // position: CSS object-position for the crop (default centre).
  hero: { src: string; alt: string; position?: string };
  title: string;
  intro: string;
  // "As seen in" logos. The row is hidden while this is empty.
  press: { name: string; logo: string }[];
  reasons: { title: string; body: string; image?: { src: string; alt: string } }[];
  offer: {
    image: { src: string; alt: string };
    title: string;
    body: string;
    cta: string;
    // Plan whose "Only X left" count shows beside "Sellout risk".
    scarcityPlan: string;
    perk: string;
  };
  // Grey review band near the end. Hidden while `reviews` is empty; the first review also shows as the pull quote.
  // Quotes support **bold** too.
  reviewsHeading: string;
  reviewsSubheading: string;
  reviews: Review[];
};

// "Only 7 dedicated desks left", or "" when the plan has no count.
export const seatsLeft = (planName: string) => {
  const p = pricing.plans.find((x) => x.name === planName);
  if (!p || p.left <= 0) return "";
  const unit = p.leftUnit === "office" ? "private office" : planName.toLowerCase();
  return `Only ${p.left} ${p.left === 1 ? unit : `${unit}s`} left`;
};


export const listicles: Listicle[] = [
  {
    slug: "most-secure-coworking-space-islamabad",
    code: "LS1",
    index: true,
    meta: {
      title: "Why This Is The Most Secure Coworking Space In Islamabad | Shalimar Coworking",
      description:
        "CCTV, staffed reception, access-controlled entry, lockable private offices and backup power through load-shedding. Here's why Islamabad professionals feel safe working at Shalimar Coworking in Blue Area.",
    },
    hero: { src: "/listicles/reception-welcome.webp", alt: "A member being welcomed at the Shalimar Coworking reception desk", position: "50% 55%" },
    title: "Why This Is THE Most Secure Coworking Space In Blue Area, Islamabad",
    intro:
      "Laptops left on café tables, strangers wandering in off the street, the power cutting out mid-call. Here's how one Blue Area coworking space is making sure none of that happens to its members...",
    press: [],
    reasons: [
      {
        title: "CCTV Coverage + Staffed Reception",
        body: "Step away for a call or a coffee and your laptop is still exactly where you left it. The floor is **covered by CCTV**, and there's **a staffed reception watching who comes and goes**. Nobody walks in without being seen. It's the kind of quiet security you stop thinking about, which is the whole point.",
        image: { src: "/spaces/open-floor.webp", alt: "The open floor at Shalimar Coworking" },
      },
      {
        title: "Controlled Entry, Members Only",
        body: "Picture this: you're deep in a client call at a café when someone sits down at your table and starts reading over your shoulder. We've all been there. At Shalimar, **entry is access-controlled**, so the only people on the floor are members and their invited guests. **No walk-ins, no strangers**, just people who are there to work.",
        image: { src: "/spaces/community-area.webp", alt: "The community area at Shalimar Coworking" },
      },
      {
        title: "Lock-Up-And-Leave Private Offices",
        body: "Shalimar has gone a step further than an open-plan floor. For teams that keep documents, equipment or client files on site, **private offices for 2–4 people lock behind you**. Close the door at night and everything is exactly where you left it the next morning.",
        image: { src: "/spaces/private-office.webp", alt: "A private office at Shalimar Coworking" },
      },
      {
        title: "Work Straight Through Load-Shedding",
        body: "Do you hate it when the power cuts out halfway through a meeting? Your laptop's on its last 10%, the router's dead and the client is waiting. Shalimar runs on **backup power**, so the lights, the desks and the internet **keep going when the grid doesn't**. Your work never stops for load-shedding.",
        image: { src: "/spaces/conference-room.webp", alt: "A conference room at Shalimar Coworking" },
      },
    ],
    offer: {
      image: { src: "/spaces/open-floor.webp", alt: "Desks on the open floor at Shalimar Coworking" },
      title: sale.name,
      body: "This limited-time deal is in high demand and desks keep filling up.",
      cta: `Claim ${sale.upTo}% off deal`,
      scarcityPlan: "Dedicated Desk",
      perk: "Free tour",
    },
    reviewsHeading: "The #1 Choice For Islamabad's Professionals",
    reviewsSubheading: "See why members trust Shalimar",
    // The first is the pull quote under the reasons; the rest fill the grey band.
    reviews: [member.ahmed, member.hamza, member.ayeshaMetro, member.farah],
  },
];

export const getListicle = (slug: string) => listicles.find((l) => l.slug === slug);
