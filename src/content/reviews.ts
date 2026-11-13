export type Review = { title: string; quote: string; name: string };

// Member reviews, shared by the pages. In quotes, **double asterisks** make a phrase bold.
export const member = {
  ahmed: {
    title: "Peaceful And Quiet Environment",
    quote:
      "What I like most about this place is the peace. No unnecessary noise or distractions. You can just put your headphones on and focus on your work for hours.",
    name: "Anjum R.",
  },
  farah: {
    title: "Our Clients Love Coming Here",
    quote:
      "We started using the meeting rooms for client presentations and never really went back to cafés or hotel lobbies. The rooms are professional, well-maintained, and have everything we need to run a proper meeting. First impressions matter, and this place gets that right.",
    name: "Farah T.",
  },
  usman: {
    title: "Eight Hours Never Felt This Easy",
    quote:
      "I’ve worked from enough offices to know that a comfortable workspace makes a real difference. The seating, lighting, temperature, and overall environment are thoughtfully taken care of. I can spend a full workday here without feeling drained. It’s become my favourite place to get things done.",
    name: "Usman R.",
  },
  hafsa: {
    title: "A Proper Desk Makes The Difference",
    quote:
      "I’ve tried working from home and cafés, but honestly, having a proper desk and a quiet place to work makes a big difference. I can just sit down, open my laptop, and get my work done without any distractions.",
    name: "Hafsa J.",
  },
  ayeshaMetro: {
    title: "A Short Walk From The Metro",
    quote:
      "The location is really convenient, especially for someone like me who uses the metro. The station is just a short walk away, so getting here is pretty easy.",
    name: "Izma W.",
  },
  ruhan: {
    title: "More Than A Better Workspace",
    quote:
      "We moved to Shalimar for a better workspace and found much more. The environment is professional yet relaxed, our team enjoys being here, and work feels a lot less like a routine.",
    name: "Ruhan K.",
  },
  hamza: {
    title: "Warm, Cozy And Comfortable",
    quote:
      "The warm yellow lights give this place such a cozy vibe. Honestly, it doesn’t even feel like a typical office. Really comfortable place to sit and work.",
    name: "Rowaim S.",
  },
  ayesha: {
    title: "It’s the Details That Make the Difference",
    quote:
      "From having a clean kitchen and fresh coffee to always finding the common areas tidy, someone clearly pays attention to the little things. Even when we have a packed day, we don’t have to worry about basic office arrangements. It makes the whole workday feel a lot more seamless.",
    name: "Ayesha K.",
  },
} satisfies Record<string, Review>;
