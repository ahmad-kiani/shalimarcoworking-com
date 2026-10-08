// Every piece of copy on the page lives here. Values in [brackets] are
// placeholders waiting for real Shalimar details.

export const site = {
  name: "Shalimar",
  tagline: "Coworking",
  location: "[Area, City]",
  address: ["[Floor, Building, Street]", "[Area, City, Postcode]"],
  email: "hello@shalimarcoworking.com",
  phone: "+92 300 0000000",
  phoneHref: "+923000000000",
  hours: { label: "Members · 9 AM to 9 PM", days: "Monday to Saturday" },
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Spaces", href: "#spaces" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lead: ["Room to think.", "Space to"],
  accent: "grow.",
  body: `Private offices, dedicated desks and meeting rooms in ${site.location}. Built for founders, small teams and independent professionals who want a calm room, a proper address and a space they're proud to bring clients to.`,
  primary: { label: "Book a tour", href: "#contact" },
  secondary: { label: "Try a day pass", href: "#membership" },
};

export const marquee = [
  "Founding memberships now open",
  "Limited desks available",
  "Day passes from day one",
  "Book a tour this week",
];

export const why = {
  eyebrow: "Why Shalimar",
  title: ["A workspace laid out like a garden:", "calm, ordered,", "made to stay in."],
  points: [
    {
      title: "Quiet enough to focus",
      body: "Phone booths for calls, quiet hours across the floor and desks spaced so you can hear yourself think.",
    },
    {
      title: "Rooms worth inviting clients to",
      body: "Meeting rooms set up before you arrive, with screens, whiteboards and tea on request. Bookable by the hour.",
    },
    {
      title: "An address that works for you",
      body: `A registered business address in ${site.location}, with mail and courier handled at the front desk.`,
    },
  ],
};

export const amenities = {
  eyebrow: "Amenities",
  title: ["Everything a working day needs,", "already taken care of."],
  items: [
    { icon: "desk", title: "Hot desks & day passes", body: "Drop in for a day or a week. Open seating, café access and no commitment." },
    { icon: "chair", title: "Dedicated desks", body: "Your own desk in the open hall, with storage and an ergonomic chair." },
    { icon: "door", title: "Private offices", body: "Lockable, furnished offices for teams of two to eight, with your own signage." },
    { icon: "people", title: "Meeting rooms", body: "Rooms for four to ten people, bookable by the hour, plus phone booths for calls." },
    { icon: "cup", title: "In-house café", body: "Coffee, tea and snacks through the day. Tea is on the house for members." },
    { icon: "wifi", title: "Backup power & fast internet", body: "Generator and UPS backup with more than one internet provider, so outages don't stop work." },
    { icon: "shield", title: "Secure access", body: "Biometric entry, CCTV and a staffed front desk during working hours." },
    { icon: "pin", title: "Central location", body: "Easy to reach for your team and your clients, with parking nearby." },
  ],
};

export const spaces = {
  eyebrow: "Our spaces",
  title: ["Four spaces, each built for", "a different way of working."],
  items: [
    { name: "The Open Hall", meta: "[00] desks", body: "A bright shared floor with hot desks and dedicated desks. Good for solo work, remote professionals and day-pass visitors." },
    { name: "Private Offices", meta: "[0] offices · 2–8 seats", body: "Lockable offices with daylight, storage and your own signage. Good for startup teams, agencies and small firms." },
    { name: "Meeting Rooms", meta: "4–10 seats", body: "Set up for pitches, reviews and workshops, with screens and whiteboards. Bookable by the hour." },
    { name: "Phone Booths", meta: "[0] booths", body: "Soundproofed booths for calls and interviews, so the open floor stays quiet." },
  ],
};

export const membership = {
  eyebrow: "Membership",
  title: ["Plans that grow", "with your"],
  accent: "work.",
  note: "Prices in PKR, including utilities and amenities. Final terms are shared on your tour.",
  plans: [
    {
      name: "Day Pass",
      body: "A desk for a day, whenever you need one.",
      from: true,
      price: "[0,000]",
      unit: "day",
      features: ["Open-floor seating", "Café access", "Complimentary tea", "High-speed Wi-Fi"],
      cta: "Reserve a day",
    },
    {
      name: "Hot Desk",
      body: "Any open seat, every working day.",
      from: false,
      price: "[00,000]",
      unit: "month",
      features: ["Open-floor seating", "Lounge & café access", "4 hrs meeting room credit / month", "Biometric entry"],
      cta: "Enquire",
    },
    {
      name: "Dedicated Desk",
      body: "A desk that's yours, with storage and a business address.",
      from: false,
      price: "[00,000]",
      unit: "month",
      features: ["Your own desk & storage", "Registered business address", "8 hrs meeting room credit / month", "Mail & courier handling"],
      cta: "Apply",
      featured: true,
    },
    {
      name: "Private Office",
      body: "A furnished, lockable office for your team.",
      from: true,
      price: "[000,000]",
      unit: "month",
      features: ["Lockable private office", "Custom signage", "Dedicated storage", "Priority room booking"],
      cta: "Enquire",
    },
  ],
};

export const contact = {
  eyebrow: "Visit Shalimar",
  title: "Come and see it for yourself.",
  interests: ["Day pass", "Hot desk", "Dedicated desk", "Private office", "Meeting room", "Something else"],
};
