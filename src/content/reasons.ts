// "Reasons" pages (/pages/<slug>): a numbered advertorial with a comparison table, an offer panel,
// member reviews, plans left and an FAQ (src/components/Reasons.tsx). Separate from the story-style
// listicles in listicles.ts, which share the same /pages route; a slug must be unique across both.
// In body text, **double asterisks** make a phrase bold. Every price comes from site.ts, so it stays current.

import { annualPrice, pricing, sale, site } from "./site";
import { dollars, pkr, seatsTotal } from "./landing";
import { member, type Review } from "./reviews";
import { listicles } from "./listicles";

// One space that never breaks: "PKR 2,500" never splits across two lines.
const price = (n: number) => pkr(n).replace(" ", " ");
// "PKR 27,000 ($95)"
const both = (n: number) => `${price(n)} (${dollars(n)})`;
const plan = (name: string) => pricing.plans.find((p) => p.name === name)!;
const onDemand = (name: string) => pricing.onDemand.items.find((p) => p.name === name)!;

// The biggest saving on offer (the "up to" in the sale): the plan whose annual price is furthest below its old price.
export const bestDeal = (() => {
  const best = pricing.plans.map((p) => ({ name: p.name, now: annualPrice(p.price), was: p.was })).sort((a, b) => b.was / b.now - a.was / a.now)[0];
  return {
    ...best,
    off: Math.round((1 - best.now / best.was) * 100),
    nowText: price(best.now),
    wasText: price(best.was),
  };
})();

// A member's own words: throws at build time if `excerpt` isn't word for word from their review.
const verbatim = (review: Review, excerpt: string) => {
  if (!review.quote.replaceAll("**", "").includes(excerpt)) throw new Error(`Not in ${review.name}'s review: "${excerpt}"`);
  return { quote: excerpt, name: review.name };
};

// A shorter version of a member's review for the review cards: the same title and name, with the quote cut to
// sentences taken word for word from the full review (bold marks allowed). Throws at build time if they aren't.
const excerpt = (review: Review, quote: string): Review => {
  if (!review.quote.replaceAll("**", "").includes(quote.replaceAll("**", ""))) throw new Error(`Not in ${review.name}'s review: "${quote}"`);
  return { ...review, quote };
};

export type Visual = { src: string; alt: string; position?: string };

export type ReasonsPage = {
  slug: string;
  // Added to WhatsApp messages so every enquiry shows which page it came from.
  code: string;
  // false keeps the page out of Google and the sitemap.
  index: boolean;
  meta: { title: string; description: string; image: string };
  eyebrow: string;
  title: string;
  // On laptops the title breaks onto a second line after these words (two even lines instead of a ragged three).
  titleBreakAfter?: string;
  // On phones the title is set on exactly these lines (they must join back into `title`), sized to fit the longest.
  titlePhoneLines?: string[];
  intro: string;
  callout: { quote: string; name: string };
  compare: {
    title: string;
    them: string;
    rows: { label: string; us: string; them: string }[];
    summary: string;
  };
  reasons: { tag: string; title: string; body: string; visual: Visual }[];
  offer: {
    body: string;
    cta: string;
    included: { icon: string; label: string }[];
    chips: string[];
  };
  reviews: { heading: string; intro: string; items: Review[] };
  plans: { eyebrow: string; body: string; image: { src: string; alt: string } };
  faq: { q: string; a: string }[];
  closing: {
    title: string;
    body: string;
    facts: { icon: string; label: string }[];
  };
  // Which layout renders the page: the default (Reasons.tsx) or "abroad" (Abroad.tsx, built for LS4).
  layout?: "abroad" | "teams";
};

const hours = `${site.hours[0]}, ${site.hours[1]}`;

const islamabad: ReasonsPage = {
  slug: "5-reasons-islamabad-professionals-work-from-shalimar",
  code: "LS2",
  index: true,
  meta: {
    title: "5 Reasons Why Islamabad's Professionals Are Working From Shalimar | Shalimar Coworking",
    description: "High-speed internet, backup power through load-shedding, client-ready meeting rooms and a Blue Area address. Here's why Islamabad's freelancers, remote workers and teams work from Shalimar Coworking at ATS Centre.",
    image: "/listicles/reception-desk.webp",
  },
  eyebrow: "Coworking in Blue Area, Islamabad",
  title: "5 Reasons Why Islamabad's Professionals Are Working From Shalimar",
  titleBreakAfter: "Professionals",
  titlePhoneLines: ["5 Reasons", "Why Islamabad's", "Professionals Are", "Working From Shalimar"],
  intro: "Cafés with patchy Wi-Fi, a home desk that goes dark at load-shedding, client meetings at a noisy table. Here's why Islamabad's freelancers, remote workers and teams are moving to ATS Centre, Blue Area instead...",
  callout: verbatim(member.ruhan, member.ruhan.quote),
  compare: {
    title: "Shalimar vs. Cafés & Home",
    them: "Cafés & home",
    rows: [
      { label: "Internet", us: "High-speed, every desk", them: "Hit and miss" },
      { label: "Load-shedding", us: "Backup power", them: "Lights go out" },
      {
        label: "Focus",
        us: "Quiet & comfortable",
        them: "Noise & distractions",
      },
      {
        label: "Client meetings",
        us: `Rooms from ${price(onDemand("Conference Room").price)}/hr`,
        them: "A noisy table",
      },
      { label: "Business address", us: "ATS Centre, Blue Area", them: "None" },
      {
        label: "Security",
        us: "CCTV & staffed reception",
        them: "Watch your laptop",
      },
    ],
    summary: "One monthly price covers your desk, high-speed internet, backup power and all-day tea and coffee, with meeting rooms on hand when a client visits.",
  },
  reasons: [
    {
      tag: "High-speed internet",
      title: "Internet That Keeps Up With Your Calls",
      body: "Café Wi-Fi drops the moment the room fills up. At Shalimar, **every desk and office runs on high-speed internet**, so client calls stay clear, uploads finish and nobody asks you to repeat yourself. It works the same at 9 AM as it does at midnight.",
      visual: {
        src: "/spaces/community-area.webp",
        alt: "The lounge at Shalimar Coworking",
      },
    },
    {
      tag: "Backup power",
      title: "Load-Shedding Doesn't Stop Your Day",
      body: "At home, load-shedding means a dead router and a laptop on its last 10%. Shalimar runs on **backup power**, so the lights, the desks and the Wi-Fi keep going when the grid doesn't. No UPS to buy, no meeting cut short.",
      visual: {
        src: "/spaces/open-floor.webp",
        alt: "Desks with the lights on across the open floor at Shalimar Coworking",
      },
    },
    {
      tag: "Client-ready rooms",
      title: "Meeting Rooms That Impress Clients",
      body: `Pitching at a noisy café table says the wrong thing about your business. Book a **well-equipped conference room by the hour from ${price(onDemand("Conference Room").price)}** for presentations, client meetings and workshops. Your guests are welcomed at reception and shown straight in.`,
      visual: {
        src: "/spaces/conference-room.webp",
        alt: "A conference room with a projector screen at Shalimar Coworking",
      },
    },
    {
      tag: "Blue Area address",
      title: "An Address Your Clients Already Know",
      body: `**ATS Centre, Blue Area** is Islamabad's business district: easy to find, easy to reach and right at home on a business card. Only need the address? The virtual office gives you one from ${price(onDemand("Virtual Office").price)} a month, no desk required.`,
      visual: {
        src: "/listicles/reception-desk.webp",
        alt: "The Shalimar reception desk under the lit Shalimar sign",
      },
    },
    {
      tag: "Room to grow",
      title: "From One Desk To Your Own Office",
      body: "Start with a hot desk. Take a dedicated desk when you want your own spot, then a **private office for 2⁠–⁠4 people** when the team grows. Same building, same address, same faces at reception.",
      visual: {
        src: "/spaces/private-office.webp",
        alt: "A private office at Shalimar Coworking",
      },
    },
  ],
  offer: {
    body: "Every plan is discounted for a limited time. Pick a desk, or book a free tour first.",
    cta: `Claim ${sale.upTo}% off deal`,
    included: [
      { icon: "wifi", label: "High-speed internet" },
      { icon: "cup", label: "Tea & coffee" },
      { icon: "thermometer", label: "Heated & cooled" },
      { icon: "people", label: "Community areas" },
    ],
    chips: ["Free tour", "Pay in USD or PKR"],
  },
  reviews: {
    heading: "Hear It From Our Members",
    intro: "Freelancers, remote workers and teams who work at Shalimar every day.",
    // Each member's strongest one or two sentences, word for word.
    items: [
      member.hamza,
      excerpt(member.farah, "The rooms are professional, well-maintained, and have everything we need to run a proper meeting. First impressions matter, and this place gets that right."),
      member.ayeshaMetro,
      member.ahmed,
    ],
  },
  plans: {
    eyebrow: "Limited availability",
    body: "Seats at the offer price are limited. Pick a plan and message us on WhatsApp to reserve it.",
    image: {
      src: "/listicles/private-office-portrait.webp",
      alt: "A private office at Shalimar Coworking, with desks, monitors and a window onto the trees",
    },
  },
  faq: [
    {
      q: "What's included in every plan?",
      a: "High-speed internet, ergonomic furniture, complimentary tea and coffee all day, heating in winter and cooling in summer, and access to the community areas.",
    },
    {
      q: "How much does a desk cost?",
      a: `With the ${sale.name}: a hot desk is ${both(plan("Hot Desk").price)} a month (was ${price(plan("Hot Desk").was)}), a dedicated desk ${both(plan("Dedicated Desk").price)} (was ${price(plan("Dedicated Desk").was)}), and a seat in a private office ${both(plan("Private Office").price)} (was ${price(plan("Private Office").was)}).`,
    },
    {
      q: "Can I pay annually?",
      a: `Yes. Paying for the year saves about ${Math.round(pricing.annualDiscount * 100)}% on every plan.`,
    },
    {
      q: "Can I pay in US dollars?",
      a: "Yes. Every plan can be paid in US dollars or Pakistani rupees.",
    },
    {
      q: "How big are the private offices?",
      a: "Private offices are for two to four people, with a door that closes and the quiet to focus.",
    },
    {
      q: "Do you have meeting rooms?",
      a: `Yes. Conference rooms for meetings, calls and workshops, bookable by the hour from ${both(onDemand("Conference Room").price)}.`,
    },
    {
      q: "I only need a business address. Is that possible?",
      a: `Yes. A virtual office gives you a professional address at ATS Centre, Blue Area from ${both(onDemand("Virtual Office").price)} a month.`,
    },
    {
      q: "How secure is the space?",
      a: "The floor is covered by CCTV, there's a staffed reception, and entry is access-controlled, so only members and their guests get in.",
    },
    { q: "When are you open?", a: `${hours}.` },
    {
      q: "Where are you, and can I visit first?",
      a: `${site.address[0]}, ${site.address[1]}. Of course you can visit: book a free tour on WhatsApp or call ${site.phone}.`,
    },
  ],
  closing: {
    title: "Your Desk In Blue Area Is Waiting",
    body: `${site.address[0]}, ${site.location}. Open ${hours}.`,
    facts: [
      { icon: "shield", label: "CCTV & reception" },
      { icon: "wifi", label: "High-speed internet" },
      { icon: "clock", label: "Open till 3 AM" },
    ],
  },
};

// A/B test of the headline: the Islamabad page word for word, but addressed to the Twin Cities (Islamabad and
// Rawalpindi). Only the headline, the intro's audience and the meta text change, so any difference in WhatsApp
// leads (Ref: LS3 vs LS2) comes from the wording. Kept out of Google so the two near-identical pages don't compete.
const twinCities: ReasonsPage = {
  ...islamabad,
  slug: "5-reasons-twin-cities-professionals-work-from-shalimar",
  code: "LS3",
  index: false,
  meta: {
    ...islamabad.meta,
    title: "5 Reasons Why Twin Cities Professionals Are Working From Shalimar | Shalimar Coworking",
    description:
      "High-speed internet, backup power through load-shedding, client-ready meeting rooms and a Blue Area address. Here's why freelancers, remote workers and teams across Islamabad and Rawalpindi work from Shalimar Coworking at ATS Centre.",
  },
  title: "5 Reasons Why Twin Cities Professionals Are Working From Shalimar",
  titlePhoneLines: ["5 Reasons", "Why Twin Cities", "Professionals Are", "Working From Shalimar"],
  intro: "Cafés with patchy Wi-Fi, a home desk that goes dark at load-shedding, client meetings at a noisy table. Here's why freelancers, remote workers and teams across the Twin Cities are moving to ATS Centre, Blue Area instead...",
};

// LS4: for freelancers and remote workers whose clients are abroad (the angle of /lp/3). Same layout as LS2, with
// its own copy: late hours in London and New York time, backup power for calls, paying in dollars, client rooms
// and the address. Pakistan stays on UTC+5 all year, so 3 AM here is 10 PM London / 5 PM New York in winter and
// 11 PM / 6 PM in summer.
const clientsAbroad: ReasonsPage = {
  slug: "5-reasons-freelancers-with-clients-abroad-work-from-shalimar",
  code: "LS4",
  layout: "abroad",
  index: true,
  meta: {
    title: "5 Reasons Freelancers With Clients Abroad Are Working From Shalimar | Shalimar Coworking",
    description:
      "Open until 3 AM, backup power for client calls, prices in US dollars or rupees and an address in Blue Area. Why freelancers and remote workers with clients abroad work from Shalimar Coworking at ATS Centre, Islamabad.",
    image: "/hero/poster.webp",
  },
  eyebrow: "For freelancers & remote workers",
  title: "5 Reasons Freelancers With Clients Abroad Are Working From Shalimar",
  titleBreakAfter: "Abroad",
  titlePhoneLines: ["5 Reasons", "Freelancers With", "Clients Abroad Are", "Working From Shalimar"],
  intro:
    "Your clients are in London, Singapore or New York. Your call starts as the café gets loud, or just as the power goes. Here's why freelancers and remote workers in Islamabad are taking a desk at ATS Centre, Blue Area instead...",
  callout: verbatim(member.hafsa, member.hafsa.quote),
  compare: {
    title: "Shalimar vs. Cafés & Home",
    them: "Cafés & home",
    rows: [
      { label: "Late client calls", us: "Open till 3 AM", them: "Noise or closing time" },
      { label: "Load-shedding", us: "Backup power", them: "Call drops" },
      { label: "Internet", us: "High-speed, every desk", them: "Hit and miss" },
      { label: "Paying", us: "USD or PKR", them: "Pay per cup" },
      { label: "Client meetings", us: `Rooms from ${price(onDemand("Conference Room").price)}/hr`, them: "A noisy table" },
      { label: "Your laptop", us: "CCTV & staffed reception", them: "Watch your laptop" },
    ],
    summary: "One monthly price, in dollars or rupees, covers your desk, high-speed internet, backup power and tea and coffee until 3 AM, with a meeting room on hand when a client visits.",
  },
  reasons: [
    {
      tag: "Open till 3 AM",
      title: "Hours That Match Your Clients",
      body: `Shalimar is open **${site.hours[0]}, ${site.hours[1]}**. In winter, 3 AM here is 10 PM in London and 5 PM in New York. In summer, it's 11 PM and 6 PM. So a whole New York working day, and every late call with a UK client, happens at your desk, not on the sofa.`,
      visual: { src: "/hero/poster.webp", alt: "The lit Shalimar sign on the brick wall at Shalimar Coworking" },
    },
    {
      tag: "Backup power",
      title: "Calls That Don't Drop At 9 PM",
      body: "Load-shedding doesn't check your client's calendar. Shalimar runs on **backup power with high-speed internet at every desk**, so the lights, the laptop charger and the Wi-Fi keep going through the call, the deadline and the late upload.",
      visual: { src: "/spaces/open-floor.webp", alt: "Desks with the lights on across the open floor at Shalimar Coworking" },
    },
    {
      tag: "USD or PKR",
      title: "Pay The Way You're Paid",
      body: `Paid in dollars? Pay for your desk in dollars too, or keep it in rupees. **Every plan has a price in both**: a dedicated desk is ${dollars(plan("Dedicated Desk").price)} or ${price(plan("Dedicated Desk").price)} a month at this month's offer price.`,
      visual: { src: "/spaces/private-office.webp", alt: "A private office at Shalimar Coworking" },
    },
    {
      tag: "Client-ready rooms",
      title: "A Room For The Calls That Matter",
      body: `The desks are on a shared floor. For a pitch, a long call or a client who's in town, book a **conference room by the hour from ${price(onDemand("Conference Room").price)}**, or take a private office with a door that closes.`,
      visual: { src: "/spaces/conference-room.webp", alt: "A conference room with a projector screen at Shalimar Coworking" },
    },
    {
      tag: "Blue Area address",
      title: "An Address Clients Abroad Can Trust",
      body: `Contracts, invoices and your LinkedIn all read better with **ATS Centre, Blue Area, Islamabad** on them. Only need the address? The virtual office gives you one from ${price(onDemand("Virtual Office").price)} a month, no desk required.`,
      visual: { src: "/spaces/community-area.webp", alt: "The lounge at Shalimar Coworking" },
    },
  ],
  offer: {
    body: "Every plan is discounted for a limited time, in dollars or rupees. Pick a desk, or book a free tour first.",
    cta: `Claim ${sale.upTo}% off deal`,
    included: [
      { icon: "wifi", label: "High-speed internet" },
      { icon: "clock", label: "Open till 3 AM" },
      { icon: "cup", label: "Tea & coffee" },
      { icon: "dollar", label: "Pay in USD or PKR" },
    ],
    chips: ["Free tour", "Open Mon–Sat"],
  },
  reviews: {
    heading: "Hear It From Our Members",
    intro: "Freelancers, remote workers and teams who work at Shalimar every day.",
    items: [
      member.ahmed,
      excerpt(member.usman, "I can spend a full workday here without feeling drained. It’s become my favourite place to get things done."),
      excerpt(member.farah, "The rooms are professional, well-maintained, and have everything we need to run a proper meeting. First impressions matter, and this place gets that right."),
      member.hamza,
    ],
  },
  plans: islamabad.plans,
  faq: [
    {
      q: "Can I pay in US dollars?",
      a: `Yes. Every plan has a price in US dollars and in rupees: a hot desk is ${dollars(plan("Hot Desk").price)} or ${price(plan("Hot Desk").price)} a month at the offer price. Message us on WhatsApp and we'll tell you how to pay in dollars.`,
    },
    {
      q: "How late are you open?",
      a: `${hours}. In winter that's until 10 PM in London and 5 PM in New York; in summer, until 11 PM and 6 PM.`,
    },
    { q: "Are you open on Sundays?", a: "No. Shalimar is open Monday to Saturday." },
    { q: "What happens during load-shedding?", a: "Shalimar runs on backup power, so the lights, the desks and the internet keep going when the grid goes down." },
    {
      q: "Can I take calls at my desk?",
      a: `Desks are on a shared floor. For long or confidential calls, book a conference room by the hour from ${both(onDemand("Conference Room").price)}, or take a private office with a door that closes.`,
    },
    {
      q: "Is my laptop safe if I stay late?",
      a: "The floor is covered by CCTV, there's a staffed reception, and entry is access-controlled, so only members and their guests get in. Private offices lock behind you.",
    },
    {
      q: "How much does a desk cost?",
      a: `With the ${sale.name}: a hot desk is ${both(plan("Hot Desk").price)} a month (was ${price(plan("Hot Desk").was)}), a dedicated desk ${both(plan("Dedicated Desk").price)} (was ${price(plan("Dedicated Desk").was)}), and a seat in a private office ${both(plan("Private Office").price)} (was ${price(plan("Private Office").was)}).`,
    },
    {
      q: "I only need a business address. Is that possible?",
      a: `Yes. A virtual office gives you a professional address at ATS Centre, Blue Area from ${both(onDemand("Virtual Office").price)} a month.`,
    },
    {
      q: "Where are you, and can I visit first?",
      a: `${site.address[0]}, ${site.address[1]}. Of course you can visit: book a free tour on WhatsApp or call ${site.phone}.`,
    },
  ],
  closing: {
    title: "Your Desk For The Late Client Call",
    body: `${site.address[0]}, ${site.location}. Open ${hours}.`,
    facts: [
      { icon: "clock", label: "Open till 3 AM" },
      { icon: "dollar", label: "Pay in USD or PKR" },
      { icon: "shield", label: "CCTV & reception" },
    ],
  },
};

// LS5: small teams of 2–4 choosing between renting their own office and a private office here (the angle of /lp/4).
// Its own layout (Teams.tsx): split hero, team cost calculator, "own office vs here" checklist (from `compare`) and
// the reasons as photos with overlapping cards.
const teamOffice = plan("Private Office");
const smallTeams: ReasonsPage = {
  slug: "5-reasons-small-teams-are-moving-to-shalimar",
  code: "LS5",
  layout: "teams",
  index: true,
  meta: {
    title: "5 Reasons Small Teams Are Moving Their Office To Shalimar | Shalimar Coworking",
    description:
      "Private offices for teams of 2 to 4 at ATS Centre, Blue Area, Islamabad: furnished, high-speed internet, backup power and meeting rooms, priced per seat in US dollars or rupees.",
    image: "/listicles/private-office-portrait.webp",
  },
  eyebrow: "For teams of 2 to 4",
  title: "5 Reasons Small Teams Are Moving Their Office To Shalimar",
  titlePhoneLines: ["5 Reasons Small", "Teams Are Moving", "Their Office", "To Shalimar"],
  intro:
    "Skip the lease, the furniture shopping, the internet installation and the separate bills. A private office at ATS Centre, Blue Area is ready when your team moves in. Here's why small teams are choosing it...",
  callout: verbatim(member.ruhan, member.ruhan.quote),
  compare: {
    title: "Your Own Office vs. Moving In Here",
    them: "Your own office",
    rows: [
      { label: "Space", us: "A furnished private office at ATS Centre", them: "Find a space, sign a lease, pay a deposit" },
      { label: "Furniture", us: "Desks and chairs already in place", them: "Buy desks, chairs and storage" },
      { label: "Internet", us: "High-speed internet across the floor", them: "Arrange your own connection" },
      { label: "Power", us: "Backup power through load-shedding", them: "Buy a UPS or a generator" },
      { label: "Bills", us: "One monthly price per seat, in USD or PKR", them: "Rent, electricity and internet, separately" },
      { label: "Tea & coffee", us: "Tea and coffee, complimentary all day", them: "Keep the kitchen stocked" },
      { label: "Meetings", us: `Conference rooms by the hour, from ${price(onDemand("Conference Room").price)}`, them: "Give up a room, or meet clients elsewhere" },
    ],
    summary: "One price per seat covers the room, the furniture, high-speed internet, backup power and tea and coffee.",
  },
  reasons: [
    {
      tag: "Ready on day one",
      title: "Ready The Day You Move In",
      body: "No furniture to buy, no internet to install, no bills to set up. **Desks, chairs and high-speed internet are already in place**, so the team brings laptops and gets straight to work.",
      visual: { src: "/spaces/open-floor.webp", alt: "Desks ready on the open floor at Shalimar Coworking" },
    },
    {
      tag: "Private office",
      title: "A Door That Closes, And Locks",
      body: "A **private office for 2–4 people**, with a door that closes for calls, documents and focus. It locks behind you at night, and the floor is covered by CCTV with a staffed reception.",
      visual: { src: "/spaces/private-office.webp", alt: "A private office at Shalimar Coworking" },
    },
    {
      tag: "Client-ready rooms",
      title: "Meeting Rooms Without Renting One",
      body: `Don't give up a desk to make a meeting room. Book a **conference room by the hour from ${price(onDemand("Conference Room").price)}** when a client visits, and your guests are welcomed at reception.`,
      visual: { src: "/spaces/conference-room.webp", alt: "A conference room with a projector screen at Shalimar Coworking" },
    },
    {
      tag: "Backup power",
      title: "Load-Shedding Doesn't Stop The Team",
      body: "When the power goes, four laptops stop, not one. Shalimar runs on **backup power**, so the lights, the desks and the internet keep going and nobody loses the afternoon.",
      visual: { src: "/listicles/reception-desk.webp", alt: "The Shalimar reception desk under the lit Shalimar sign" },
    },
    {
      tag: "Room to grow",
      title: "Grow Without Moving Office",
      body: "Start with desks for two and take a private office when the team grows. **Same building, same address**, and no new lease every time the team changes.",
      visual: { src: "/spaces/community-area.webp", alt: "The lounge at Shalimar Coworking" },
    },
  ],
  offer: {
    body: "Every plan is discounted for a limited time, priced per seat in dollars or rupees.",
    cta: `Claim ${sale.upTo}% off deal`,
    included: [
      { icon: "door", label: "Private offices" },
      { icon: "wifi", label: "High-speed internet" },
      { icon: "cup", label: "Tea & coffee" },
      { icon: "people", label: "Meeting rooms" },
    ],
    chips: ["Free tour", "Pay in USD or PKR"],
  },
  // Same reviews, in the same order, as LS2/LS3.
  reviews: islamabad.reviews,
  plans: islamabad.plans,
  faq: [
    { q: "How many people fit in a private office?", a: "Private offices are for two to four people." },
    {
      q: "How is the price worked out?",
      a: `Per seat. A private office seat is ${dollars(teamOffice.price)} or ${price(teamOffice.price)} a month at the offer price, so a team of three pays ${seatsTotal(teamOffice.price, 3, "USD")} or ${seatsTotal(teamOffice.price, 3, "PKR")} a month.`,
    },
    {
      q: "Should we take desks or a private office?",
      a: "Dedicated desks give each person a fixed desk on the shared floor. A private office gives the team its own room, with a door that closes for calls, documents and focus.",
    },
    { q: "Can we pay in US dollars?", a: "Yes. Every plan can be paid in US dollars or Pakistani rupees." },
    { q: "Can we pay annually?", a: `Yes. Paying for the year saves about ${Math.round(pricing.annualDiscount * 100)}% on every plan.` },
    {
      q: "Where do we meet clients?",
      a: `Book a conference room by the hour, from ${both(onDemand("Conference Room").price)}, for meetings, calls and workshops.`,
    },
    { q: "What happens during load-shedding?", a: "Shalimar runs on backup power, so the lights, the desks and the internet keep going when the grid goes down." },
    {
      q: "Is our equipment safe overnight?",
      a: "The floor is covered by CCTV, there's a staffed reception, and entry is access-controlled, so only members and their guests get in. Private offices lock behind you.",
    },
    {
      q: "Can we see the offices first?",
      a: `Of course. ${site.address[0]}, ${site.address[1]}. Book a free tour on WhatsApp or call ${site.phone}.`,
    },
  ],
  closing: {
    title: "Your Team's Office Is Ready",
    body: `${site.address[0]}, ${site.location}. Open ${hours}.`,
    facts: [
      { icon: "door", label: "Offices for 2–4" },
      { icon: "shield", label: "CCTV & reception" },
      { icon: "clock", label: "Open till 3 AM" },
    ],
  },
};

export const reasonsPages: ReasonsPage[] = [islamabad, twinCities, clientsAbroad, smallTeams];

if (process.env.NODE_ENV !== "production") {
  const clash = reasonsPages.find((r) => listicles.some((l) => l.slug === r.slug));
  if (clash) throw new Error(`Slug used twice in /pages: ${clash.slug}`);
}

export const getReasonsPage = (slug: string) => reasonsPages.find((p) => p.slug === slug);
