import "server-only";
import { site, siteUrl, tourLink, whatsapp } from "./site";

// The confirmation emailed to visitors who send the enquiry form.
// Keep the wording in sync with the info@ Apps Script auto-reply.
export const enquiryReply = {
  subject: "Thank you for contacting Shalimar Coworking",
  preheader: "We've received your message and will get back to you within 48 hours.",
  greeting: "Hello,",
  intro:
    "Thank you for contacting Shalimar Coworking. We've received your message and a member of our team will get back to you within 48 hours.",
  urgent: "For urgent matters, you can reach us directly:",
  details: [
    { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
    { label: "WhatsApp", value: whatsapp.display, href: `https://wa.me/${whatsapp.number}` },
    {
      label: "Address",
      value: site.address.join(", "),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    },
    { label: "Hours", value: site.hours.join(", ") },
  ],
  visit: "You're also welcome to visit us for a tour of the space.",
  buttons: [
    { label: "Book a tour", href: `${siteUrl}${tourLink}` },
    {
      label: "Get directions",
      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`,
    },
  ],
  signoff: ["Best regards,", "Shalimar Coworking", "shalimarcoworking.com"],
};

// Plain-text version: word for word the Apps Script auto-reply.
export const enquiryReplyText = [
  enquiryReply.greeting,
  "",
  enquiryReply.intro,
  "",
  enquiryReply.urgent,
  "",
  ...enquiryReply.details.map((d) => `${d.label}: ${d.value}`),
  "",
  enquiryReply.visit,
  "",
  ...enquiryReply.signoff,
].join("\n");
