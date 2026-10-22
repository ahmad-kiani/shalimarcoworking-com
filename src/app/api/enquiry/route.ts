import { after } from "next/server";
import { Resend } from "resend";
import { contact, site } from "@/content/site";
import { enquiryReply, enquiryReplyText } from "@/content/enquiry-reply";
import { confirmationHtml, notificationEmail } from "./emails";

// Sends the contact form to the Shalimar inbox through Resend, then a one-time
// confirmation to the visitor. Replying to the enquiry in Gmail answers the visitor.
// The confirmation is BCC'd to info@ so the Apps Script auto-reply labels its
// conversation, and a visitor's reply to it never gets a second auto-reply.

const ENQUIRY_FROM = "Shalimar Website <website@shalimarcoworking.com>";
const REPLY_FROM = "Shalimar Coworking <info@shalimarcoworking.com>";
const DOMAIN = "shalimarcoworking.com";
const interests = new Set(contact.interests.map((i) => i.label));
const emailPattern = /^[^\s@,;<>"()\\]+@[^\s@,;<>"()\\]+\.[^\s@,;<>"()\\]{2,}$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Best-effort limits, kept per server instance.
const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;
const hits = new Map<string, number[]>(); // 5 enquiries per IP every 10 minutes
const acked = new Map<string, number>(); // 1 confirmation per address per day
const ackDay = { date: "", count: 0 }; // at most 40 confirmations per day, to save quota for enquiries

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * MINUTE);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return recent.length > 5;
}

function mayAcknowledge(address: string) {
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  if (ackDay.date !== today) Object.assign(ackDay, { date: today, count: 0 });
  if (address.endsWith(`@${DOMAIN}`)) return false;
  if (now - (acked.get(address) ?? 0) < DAY) return false;
  if (ackDay.count >= 40) return false;
  if (acked.size > 1000) acked.clear();
  acked.set(address, now);
  ackDay.count++;
  return true;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneLine = (v: unknown, max: number) => clean(v, max).replace(/\s+/g, " ");
export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > 16000) return Response.json({ error: "invalid" }, { status: 413 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "invalid" }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (clean(body.hp_extra, 200)) {
    console.warn("enquiry: honeypot hit", ip);
    return Response.json({ ok: true });
  }

  if (limited(ip)) return Response.json({ error: "rate" }, { status: 429 });

  const data = {
    name: oneLine(body.name, 100),
    company: oneLine(body.company, 120),
    email: clean(body.email, 254).toLowerCase(),
    phone: oneLine(body.phone, 40),
    interest: oneLine(body.interest, 60),
    note: clean(body.note, 3000),
  };
  if (!data.name || !emailPattern.test(data.email)) return Response.json({ error: "invalid" }, { status: 400 });
  if (data.phone && !/^[+\d(][\d\s()-]{5,}$/.test(data.phone)) return Response.json({ error: "invalid" }, { status: 400 });
  if (data.interest && !interests.has(data.interest)) data.interest = "";
  const id = typeof body.id === "string" && uuidPattern.test(body.id) ? body.id : crypto.randomUUID();

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("enquiry: RESEND_API_KEY is not set");
    return Response.json({ error: "server" }, { status: 500 });
  }
  const resend = new Resend(key);

  const { text, html } = notificationEmail(data);

  const { error } = await resend.emails.send(
    {
      from: ENQUIRY_FROM,
      to: site.email,
      replyTo: data.email,
      subject: `Enquiry: ${data.interest || "General"} – ${data.name}`,
      text,
      html,
    },
    { idempotencyKey: `enq-${id}` },
  );
  if (error) {
    console.error("enquiry: resend failed", error);
    return Response.json({ error: "server" }, { status: 502 });
  }

  // The enquiry is safely with us; confirm to the visitor after responding.
  if (mayAcknowledge(data.email)) {
    after(async () => {
      const { error } = await resend.emails.send(
        {
          from: REPLY_FROM,
          to: data.email,
          bcc: site.email,
          subject: enquiryReply.subject,
          text: enquiryReplyText,
          html: confirmationHtml,
          headers: { "Auto-Submitted": "auto-generated" },
        },
        { idempotencyKey: `ack-${id}` },
      );
      if (error) console.error("enquiry: confirmation failed", error);
    });
  } else {
    console.info("enquiry: confirmation skipped (internal address or limit reached)");
  }

  return Response.json({ ok: true });
}
