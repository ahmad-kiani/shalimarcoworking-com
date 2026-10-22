import "server-only";
import { site, whatsapp } from "./site";

// The confirmation emailed to visitors who send the enquiry form.
// Keep the body word for word in sync with the info@ Apps Script auto-reply.
export const enquiryReply = {
  subject: "Thank you for contacting Shalimar Coworking",
  body: [
    "Hello,",
    "",
    "Thank you for contacting Shalimar Coworking. We've received your message and a member of our team will get back to you within 48 hours.",
    "",
    "For urgent matters, you can reach us directly:",
    "",
    `Phone: ${site.phone}`,
    `WhatsApp: ${whatsapp.display}`,
    `Address: ${site.address.join(", ")}`,
    `Hours: ${site.hours.join(", ")}`,
    "",
    "You're also welcome to visit us for a tour of the space.",
    "",
    "Best regards,",
    "Shalimar Coworking",
    "shalimarcoworking.com",
  ].join("\n"),
};
