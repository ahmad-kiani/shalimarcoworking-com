// Every piece of copy on the page lives here.

export const site = {
  name: "Shalimar",
  tagline: "Coworking",
  location: "Blue Area, Islamabad",
  address: ["Office 1, Floor 1, ATS Centre", "Blue Area, Islamabad, Pakistan"],
  email: "info@shalimarcoworking.com",
  phone: "+92 314 5323372",
  phoneHref: "+923145323372",
  mapQuery: "ATS Centre, Blue Area, Islamabad",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Spaces", href: "#spaces" },
  { label: "Pricing", href: "#pricing" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lead: ["Room to think.", "Space to"],
  accent: "grow.",
  body: `Hot desks, dedicated desks, private offices and conference rooms at ATS Centre, ${site.location}. Built for freelancers, remote professionals and teams working with clients around the world.`,
  primary: { label: "Book a tour", href: "#contact" },
  secondary: { label: "See pricing", href: "#pricing" },
};

export const marquee = [
  "ATS Centre, Blue Area",
  "Private offices for 2–3 people",
  "Complimentary tea & coffee",
  "Virtual office from PKR 5,000 a month",
  "Book a tour",
];

export const why = {
  eyebrow: "Why Shalimar",
  title: ["A workspace laid out like a garden:", "calm, ordered,", "made to stay in."],
  points: [
    {
      title: "Ready to work from day one",
      body: "High-speed internet, ergonomic furniture, complimentary tea and coffee all day, and laptops and headphones if you need them. Heated in winter, cooled in summer.",
    },
    {
      title: "Rooms worth inviting clients to",
      body: "Conference rooms for client calls, team meetings and workshops, bookable by the hour.",
    },
    {
      title: "An address in Blue Area",
      body: "Work from Islamabad's business district, or use our virtual office for a professional address without the desk.",
    },
  ],
};

export const amenities = {
  eyebrow: "Amenities",
  title: ["Everything a working day needs,", "already taken care of."],
  items: [
    { icon: "desk", title: "Hot desks", body: "Take any open seat on the shared floor, whenever you need one." },
    { icon: "chair", title: "Dedicated desks", body: "A desk that's yours every day, set up just the way you like it." },
    { icon: "door", title: "Private offices", body: "Private offices for two or three people, with the quiet to focus." },
    { icon: "people", title: "Conference rooms", body: "Well-equipped rooms for meetings, client calls and workshops." },
    { icon: "mail", title: "Virtual office", body: "A professional Blue Area address for your business, without renting a desk." },
    { icon: "wifi", title: "Internet & equipment", body: "Fast, reliable internet across the floor, with laptops and headphones available if you need them." },
    { icon: "cup", title: "Tea & coffee", body: "Complimentary tea and coffee, all day, for everyone working here." },
    { icon: "calendar", title: "Community & events", body: "Shared lounges, networking events and workshops to meet other members." },
  ],
};

export const spaces = {
  eyebrow: "Our spaces",
  title: ["Four spaces, each built for", "a different way of working."],
  items: [
    { name: "The Open Floor", meta: "Hot & dedicated desks", body: "A shared floor with flexible workstations and ergonomic furniture. Good for freelancers and remote professionals." },
    { name: "Private Offices", meta: "2–3 seats", body: "Your own room within the space, for people who need privacy and focus. Good for small teams, business partners and consultants." },
    { name: "Conference Rooms", meta: "By the hour", body: "Well-equipped rooms for team discussions, client meetings and workshops. Bookable by the hour." },
    { name: "Community Areas", meta: "Lounges & events", body: "Shared lounges for a break between tasks, plus regular networking events and workshops." },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: ["Plans that grow", "with your"],
  accent: "work.",
  note: "All prices in PKR. Discounts are available on long-term and annual plans. Final terms are confirmed on your tour.",
  plans: [
    {
      name: "Hot Desk",
      body: "Any open seat on the shared floor.",
      price: "27,000",
      unit: "month",
      features: ["Shared workstations", "High-speed internet", "Complimentary tea & coffee", "Community areas"],
      cta: "Enquire",
    },
    {
      name: "Dedicated Desk",
      body: "A desk that's yours, every working day.",
      price: "29,000",
      unit: "month",
      features: ["Your own fixed desk", "High-speed internet", "Complimentary tea & coffee", "Community areas"],
      cta: "Enquire",
    },
    {
      name: "Private Office",
      body: "A private office for two or three people.",
      price: "38,000",
      unit: "seat / month",
      features: ["Private room for 2–3 people", "High-speed internet", "Complimentary tea & coffee", "Community areas"],
      cta: "Enquire",
    },
  ],
  extras: [
    {
      name: "Conference Room",
      body: "Book a conference room for meetings, calls and workshops.",
      price: "2,500",
      unit: "hour",
      cta: "Book a room",
    },
    {
      name: "Virtual Office",
      body: "A professional address at ATS Centre, Blue Area, without renting a desk.",
      price: "5,000",
      unit: "month",
      cta: "Enquire",
    },
  ],
};

export const location = {
  eyebrow: "Location",
  title: ["In the heart of", "Blue Area."],
  body: "Find us on the first floor of ATS Centre, in Islamabad's main business district. Call ahead and we'll show you around.",
};

export const contact = {
  eyebrow: "Visit Shalimar",
  title: "Come and see it for yourself.",
  visit: "Call or email to book a tour of the space.",
  interests: ["Hot desk", "Dedicated desk", "Private office", "Conference room", "Virtual office", "Something else"],
};
