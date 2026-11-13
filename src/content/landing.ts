// Copy for the ad landing pages (/lp/1 and on). Hidden from Google; only reached from ads.
// Each page has a code that is added to its WhatsApp messages, so every enquiry shows which page it came from.

import { pricing, sale, site, usd, whatsapp, whatsappLink } from "./site";

const pkr = (n: number) => `PKR ${n.toLocaleString("en-US")}`;
const dollars = (n: number) => `$${usd(n).toLocaleString("en-US")}`;
// "PKR 27,000 ($95)": every price in the copy shows both currencies.
const both = (n: number) => `${pkr(n)} (${dollars(n)})`;
// A per-seat price for several seats. USD is the per-seat dollar price times the seats, never the PKR total converted.
const seatsTotal = (price: number, seats: number, currency: "USD" | "PKR") =>
  currency === "USD" ? `$${(usd(price) * seats).toLocaleString("en-US")}` : pkr(price * seats);
const plan = (name: string) => pricing.plans.find((p) => p.name === name)!;
const room = (name: string) => pricing.onDemand.items.find((i) => i.name === name)!;
// "Only 7 seats left" for a monthly plan, or "" when it has no count (or isn't a monthly plan).
const seatsLeft = (name: string) => {
  const p = pricing.plans.find((x) => x.name === name);
  return p && p.left > 0 ? `Only ${p.left} ${p.leftUnit}${p.left === 1 ? "" : "s"} left` : "";
};

// Shown near the top of every landing page and beside the prices: members can pay in either currency.
export const payment = {
  title: "Pay in US dollars or Pakistani rupees",
  body: `Every plan has a price in both. A hot desk is ${dollars(plan("Hot Desk").price)} or ${pkr(plan("Hot Desk").price)} a month.`,
};

export const lp1 = {
  code: "LP1",
  meta: {
    title: "10 reasons Islamabad professionals work from Shalimar Coworking",
    description: `Why freelancers, remote professionals and small teams are choosing Shalimar Coworking at ATS Centre, ${site.location}.`,
  },
  eyebrow: `Coworking in ${site.location}`,
  title: ["10 reasons Islamabad's professionals are", "working from Shalimar"],
  intro:
    "Cafés get loud, home gets distracting, and renting an office means a lease, furniture and bills. Here's why freelancers, remote workers and small teams are choosing a desk at ATS Centre instead.",
  heroImage: { src: "/hero/poster.webp", alt: "Inside Shalimar Coworking at ATS Centre" },
  // Each reason shows its photo, or its icon on a green panel when there's no photo.
  reasons: [
    {
      title: "An address your clients already know",
      body: "ATS Centre sits in Blue Area, Islamabad's business district. Easy to find, easy to reach, and an address that looks right on a business card.",
      icon: "pin",
    },
    {
      title: "Ready to work from the first morning",
      body: "High-speed internet across the whole floor and ergonomic furniture at every desk. Bring your laptop and start.",
      image: { src: "/spaces/open-floor.webp", alt: "Desks on the open floor" },
    },
    {
      title: "A meeting room when a client visits",
      body: `Book a conference room by the hour for client meetings, calls and workshops, from ${both(room("Conference Room").price)} an hour.`,
      image: { src: "/spaces/conference-room.webp", alt: "A conference room at Shalimar" },
    },
    {
      title: "Your own room when the team grows",
      body: "Private offices for two to four people, with the quiet to focus and a door that closes.",
      image: { src: "/spaces/private-office.webp", alt: "A private office at Shalimar" },
    },
    {
      title: "Tea and coffee, all day, on the house",
      body: "Complimentary tea and coffee for everyone working here. No paying by the cup to keep your table.",
      icon: "cup",
    },
    {
      title: "Pay in dollars or rupees",
      body: `Paid by clients abroad? Pay for your desk in US dollars. Prefer rupees? Pay in PKR. A dedicated desk is ${dollars(plan("Dedicated Desk").price)} or ${pkr(plan("Dedicated Desk").price)} a month.`,
      icon: "dollar",
    },
    {
      title: "Open from morning to night",
      body: `${site.hours[0]}, ${site.hours[1]}. Early starts and late calls with clients abroad both fit.`,
      icon: "clock",
    },
    {
      title: "Simple monthly pricing",
      body: `A hot desk is ${both(plan("Hot Desk").price)} a month and a desk of your own is ${both(plan("Dedicated Desk").price)}. No furniture to buy and no internet to set up.`,
      icon: "calendar",
    },
    {
      title: "People to work alongside",
      body: "Shared lounges for a break between tasks, plus networking events and workshops to meet the people working around you.",
      image: { src: "/spaces/community-area.webp", alt: "The community area at Shalimar" },
    },
    {
      title: "A Blue Area address without the desk",
      body: `Not ready for a desk yet? A virtual office gives your business a professional address at ATS Centre from ${both(room("Virtual Office").price)} a month.`,
      icon: "mail",
    },
  ],
  // Shown after this many reasons, to catch people who are already convinced.
  midCta: { after: 5, title: "Seen enough?", body: "Come and see the space. A tour takes fifteen minutes." },
  compare: {
    title: ["How Shalimar compares", "with the usual options"],
    columns: ["Shalimar", "Café", "Home", "Renting an office"],
    // true = yes, false = no, text = it depends.
    rows: [
      { label: "Fast, reliable internet", values: [true, "Hit and miss", "Depends", true] },
      { label: "A quiet place to focus", values: [true, false, "Depends", true] },
      { label: "Meeting room for clients", values: ["By the hour", false, false, "Extra space"] },
      { label: "Business address", values: ["Blue Area", false, false, true] },
      { label: "Tea & coffee included", values: [true, "Pay per cup", true, "You stock it"] },
      { label: "Ready on day one", values: [true, true, true, "Furniture, internet, bills"] },
      { label: "People to work alongside", values: [true, false, false, false] },
    ] as { label: string; values: (boolean | string)[] }[],
  },
  offer: {
    eyebrow: sale.name,
    title: `Up to ${sale.upTo}% off`,
    body: "Pick a plan, or book a tour first and decide once you've seen it.",
  },
};

export const lp2 = {
  code: "LP2",
  meta: {
    title: "Your desk in Blue Area, Islamabad | Shalimar Coworking",
    description: `Hot desks, dedicated desks and private offices at ATS Centre, ${site.location}. Up to ${sale.upTo}% off for a limited time.`,
  },
  eyebrow: `ATS Centre, ${site.location}`,
  title: ["Your desk in Blue Area.", "Everything included."],
  intro: "High-speed internet, ergonomic furniture, meeting rooms on hand and tea and coffee all day. Pick a plan and bring your laptop.",
  // Main photo first, then the small ones underneath.
  gallery: [
    { src: "/spaces/open-floor.webp", alt: "The open floor at Shalimar Coworking" },
    { src: "/spaces/private-office.webp", alt: "A private office" },
    { src: "/spaces/conference-room.webp", alt: "A conference room" },
    { src: "/spaces/community-area.webp", alt: "The community area" },
  ],
  picker: {
    title: "Choose your plan",
    cta: "Reserve on WhatsApp",
    tour: "Or book a tour first",
    note: `Monthly prices. Pay annually and save about ${Math.round(pricing.annualDiscount * 100)}%.`,
  },
  benefits: {
    title: ["Six reasons to", "work from here"],
    items: [
      { icon: "pin", title: "A Blue Area address", body: "ATS Centre, in Islamabad's business district. Easy for clients to find." },
      { icon: "wifi", title: "Ready from day one", body: "High-speed internet across the floor and ergonomic furniture at every desk." },
      { icon: "people", title: "Meeting rooms on hand", body: `Book a conference room by the hour, from ${both(room("Conference Room").price)}.` },
      { icon: "cup", title: "Tea & coffee all day", body: "Complimentary, for everyone working here. No paying by the cup." },
      { icon: "thermometer", title: "Comfortable all year", body: "Heated in winter and cooled in summer." },
      { icon: "clock", title: "Morning to night", body: `Open ${site.hours[0]}, ${site.hours[1]}.` },
    ],
  },
  steps: {
    title: ["Three steps to", "your desk"],
    items: [
      { title: "Message us", body: "Tap Reserve on WhatsApp and tell us which plan you'd like." },
      { title: "Visit", body: "Come to ATS Centre and see the floor, the rooms and your desk." },
      { title: "Start working", body: "Pick your plan, bring your laptop and get started." },
    ],
  },
  faq: [
    {
      q: "Can I pay in US dollars?",
      a: `Yes. Every plan can be paid in US dollars or Pakistani rupees. A hot desk is ${dollars(plan("Hot Desk").price)} or ${pkr(plan("Hot Desk").price)} a month, a dedicated desk ${dollars(plan("Dedicated Desk").price)} or ${pkr(plan("Dedicated Desk").price)}, and a private office ${dollars(plan("Private Office").price)} or ${pkr(plan("Private Office").price)}.`,
    },
    {
      q: "What's included in the price?",
      a: "Every plan includes high-speed internet, complimentary tea and coffee and access to the community areas. A dedicated desk is yours every day; a private office is a room for two to four people.",
    },
    { q: "When are you open?", a: `${site.hours[0]}, ${site.hours[1]}.` },
    { q: "Where exactly are you?", a: `${site.address[0]}, ${site.address[1]}.` },
    {
      q: "Can I pay annually?",
      a: `Yes. Paying for the year saves about ${Math.round(pricing.annualDiscount * 100)}% on every plan.`,
    },
    {
      q: "Do you have meeting rooms?",
      a: `Yes, conference rooms for meetings, calls and workshops, bookable by the hour from ${both(room("Conference Room").price)}.`,
    },
    {
      q: "I only need a business address. Is that possible?",
      a: `Yes. A virtual office gives you a professional address at ATS Centre from ${both(room("Virtual Office").price)} a month.`,
    },
    { q: "Can I see the space before deciding?", a: `Of course. Book a tour on WhatsApp or call ${site.phone}.` },
  ],
};

// Article layout, written for freelancers and remote workers in Islamabad whose clients are abroad.
export const lp3 = {
  code: "LP3",
  meta: {
    title: "Working for clients abroad from Islamabad? | Shalimar Coworking",
    description: `A desk in Blue Area that's open until 10 PM and can be paid for in US dollars or rupees. Shalimar Coworking, ATS Centre, ${site.location}.`,
  },
  kicker: "For freelancers and remote teams",
  title: "Working for clients abroad from Islamabad? Your desk should keep up.",
  standfirst:
    "Late calls, steady internet and a place clients can visit. Here's what a desk at Shalimar Coworking in Blue Area gives people who work across time zones.",
  byline: `Shalimar Coworking · ATS Centre, ${site.location}`,
  heroImage: { src: "/spaces/open-floor.webp", alt: "Desks on the open floor at Shalimar Coworking" },
  // Each section: a heading, its paragraphs and an optional photo after them. midCta goes after the section it names.
  sections: [
    {
      heading: "The problem with working from cafés",
      body: [
        "Most people who freelance from Islamabad start at a café or the dining table. It works, until a client call lands in the middle of a lunch rush, or the internet drops halfway through an upload.",
        "Then there's the cost nobody counts: buying something every hour to keep the table, and losing the first part of the day to finding somewhere to sit.",
      ],
    },
    {
      heading: "Hours that match your clients",
      body: [
        `Shalimar is open ${site.hours[0]}, ${site.hours[1]}. Closing at 10 PM in Islamabad means the whole UK working day and New York mornings fall inside opening hours.`,
        "So the late call with a client in London or New York can happen at your desk, not on the sofa.",
      ],
    },
    {
      heading: "A room for the calls that matter",
      body: [
        `When a client wants to meet, or a call needs a quiet room and a proper screen, book a conference room by the hour from ${both(room("Conference Room").price)}.`,
      ],
      image: { src: "/spaces/conference-room.webp", alt: "A conference room at Shalimar" },
    },
    {
      heading: "Pay the way you're paid",
      body: [
        "If your clients pay you in dollars, you can pay for your desk in dollars too. If you'd rather keep it in rupees, pay in PKR. Every plan has a price in both.",
      ],
      payment: true,
    },
    {
      heading: "Everything else is already there",
      body: [
        "High-speed internet across the floor, ergonomic furniture, complimentary tea and coffee all day, and an address at ATS Centre in Blue Area, Islamabad's business district.",
        "There are shared lounges for a break between tasks, and networking events and workshops to meet the people working around you.",
      ],
      image: { src: "/spaces/community-area.webp", alt: "The community area at Shalimar" },
    },
  ],
  midCta: { after: 2, title: "See the space before you decide", body: "A tour takes fifteen minutes. Message us on WhatsApp to book one." },
  costs: {
    heading: "What it costs",
    body: `Monthly prices, in US dollars or Pakistani rupees. Pay annually and save about ${Math.round(pricing.annualDiscount * 100)}%.`,
  },
  closingLine: "The easiest way to know if it suits you is to sit at a desk for a few minutes. Come and see it.",
};

// Small teams (2–4 people) weighing up renting their own office. The calculator multiplies the per-seat prices.
export const lp4 = {
  code: "LP4",
  meta: {
    title: "An office for your team in Blue Area | Shalimar Coworking",
    description: `Private offices for teams of two to four at ATS Centre, ${site.location}. Furnished, connected and priced per seat in US dollars or rupees.`,
  },
  eyebrow: "For teams of 2 to 4",
  title: ["Your team's office in Blue Area,", "without setting one up."],
  intro:
    "Skip the furniture shopping, the internet installation and the separate bills. A private office at ATS Centre is ready the day your team moves in.",
  heroImage: { src: "/spaces/private-office.webp", alt: "A private office at Shalimar Coworking" },
  calculator: {
    title: "What it costs for your team",
    sizeLabel: "Team size",
    sizes: [2, 3, 4],
    // The plans compared, by name in pricing.plans. Prices are per seat, so the total is seats × price.
    options: [
      { plan: "Private Office", note: "Your own room with a door that closes" },
      { plan: "Dedicated Desk", note: "A fixed desk each on the shared floor" },
    ],
    cta: "Ask about an office for my team",
    note: `Monthly prices per seat × team size. Pay annually and save about ${Math.round(pricing.annualDiscount * 100)}%.`,
  },
  compare: {
    title: ["Setting up your own office", "vs moving in here"],
    own: {
      heading: "Your own office",
      items: [
        "Find a space, sign a lease and pay a deposit",
        "Buy desks, chairs and storage",
        "Arrange an internet connection",
        "Pay electricity and other bills separately",
        "Keep the kitchen stocked with tea and coffee",
        "Give up a room for meetings, or meet clients elsewhere",
      ],
    },
    here: {
      heading: "A private office at Shalimar",
      items: [
        "Move into a furnished room at ATS Centre, Blue Area",
        "Ergonomic desks and chairs already in place",
        "High-speed internet across the floor",
        "One monthly price per seat, in US dollars or rupees",
        "Complimentary tea and coffee all day",
        `Conference rooms by the hour, from ${both(room("Conference Room").price)}`,
      ],
    },
  },
  faq: [
    { q: "How many people fit in a private office?", a: "Our private offices are for two to four people." },
    {
      q: "How is the price worked out?",
      a: `Per seat. A private office seat is ${dollars(plan("Private Office").price)} or ${pkr(plan("Private Office").price)} a month, so a team of three pays ${seatsTotal(plan("Private Office").price, 3, "USD")} or ${seatsTotal(plan("Private Office").price, 3, "PKR")}.`,
    },
    { q: "Can we pay in US dollars?", a: "Yes. Every plan can be paid in US dollars or Pakistani rupees." },
    {
      q: "Where do we meet clients?",
      a: `Book a conference room by the hour, from ${both(room("Conference Room").price)}, for meetings, calls and workshops.`,
    },
    { q: "When can the team come in?", a: `${site.hours[0]}, ${site.hours[1]}.` },
    { q: "Can we see the offices first?", a: `Of course. Book a tour on WhatsApp or call ${site.phone}.` },
  ],
};

// A three-question quiz that recommends one plan. Each answer either asks the next question or names a result.
export const lp5 = {
  code: "LP5",
  meta: {
    title: "Which Shalimar Coworking plan suits you?",
    description: `Answer three quick questions and see the plan and price that fit how you work, at ATS Centre, ${site.location}.`,
  },
  eyebrow: `Coworking at ATS Centre, ${site.location}`,
  title: ["Which plan fits", "the way you work?"],
  intro: "Three quick questions, then the plan and its price in US dollars and rupees. Takes about ten seconds.",
  quiz: {
    start: "who",
    questions: {
      who: {
        q: "Who is the space for?",
        answers: [
          { label: "Just me", next: "often" },
          { label: "My team of 2 to 4", result: "team" },
          { label: "I only need a business address", result: "address" },
        ],
      },
      often: {
        q: "How often will you come in?",
        answers: [
          { label: "A few days a week", result: "hot" },
          { label: "Most days", next: "door" },
        ],
      },
      door: {
        q: "Do you need a room with a door?",
        answers: [
          { label: "No, a desk is fine", result: "dedicated" },
          { label: "Yes, for calls and focus", result: "office" },
        ],
      },
    },
    // plan: a name in pricing.plans or pricing.onDemand.items.
    results: {
      hot: { plan: "Hot Desk", why: "You come in when you need to and take any open seat on the shared floor." },
      dedicated: { plan: "Dedicated Desk", why: "A fixed desk that's yours every day, set up the way you like and waiting when you arrive." },
      office: { plan: "Private Office", why: "A seat in a private office, so calls and focused work happen behind a closed door." },
      team: { plan: "Private Office", why: "A private office for two to four people. The price is per seat, so a team of three pays three seats." },
      address: { plan: "Virtual Office", why: "A professional address at ATS Centre, Blue Area, for your business, without renting a desk." },
    },
    restart: "Start again",
  },
  glance: { title: ["All plans", "at a glance"] },
};

// Shared by every landing page.
// Real quotes only. Until they arrive, the placeholders below show on the local preview but never on the live site.
export const testimonials: { quote: string; name: string; role: string }[] = [];
export const placeholderTestimonials = [
  { quote: "Placeholder: a member's quote about why they work from Shalimar goes here.", name: "Member name", role: "Job title, company" },
  { quote: "Placeholder: a second quote, ideally from someone who moved from a café or from home.", name: "Member name", role: "Job title, company" },
  { quote: "Placeholder: a third quote, ideally from a small team in a private office.", name: "Member name", role: "Job title, company" },
];

export const closing = {
  title: ["Come and see it", "for yourself."],
  body: `Office 1, Floor 1, ATS Centre, ${site.location}. Open ${site.hours[0]}, ${site.hours[1]}.`,
};

// "a month", "an hour".
const per = (unit: string) => `${unit === "hour" ? "an" : "a"} ${unit}`;

// WhatsApp links for a landing page, with its code at the end of the message.
export const lpLinks = (code: string) => ({
  tour: whatsappLink(`${whatsapp.tourMessage} (Ref: ${code})`),
  // With a currency, the message says they'd like to pay in it.
  // yearly: the price is the monthly rate when paid annually.
  plan: (name: string, price: number, unit: string, currency?: "USD" | "PKR", yearly = false) =>
    whatsappLink(
      currency
        ? `Hi Shalimar, I'm interested in the ${name} plan (${currency === "USD" ? dollars(price) : pkr(price)} ${per(unit)}${yearly ? ", paid annually" : ""}) and would like to pay in ${currency}. Could you share more details? (Ref: ${code})`
        : `Hi Shalimar, I'm interested in the ${name} plan (${dollars(price)} / ${pkr(price)} ${per(unit)}). Could you share more details? (Ref: ${code})`,
    ),
  // A team enquiry: the plan, how many seats and the monthly total in the chosen currency.
  team: (name: string, price: number, seats: number, currency: "USD" | "PKR") =>
    whatsappLink(
      `Hi Shalimar, we're a team of ${seats} and interested in a ${name} (${seatsTotal(price, seats, currency)} a month for ${seats} seats), paying in ${currency}. Could you share more details? (Ref: ${code})`,
    ),
});

export { dollars, pkr, seatsLeft, seatsTotal };
