import { enquiryReply } from "@/content/enquiry-reply";
import { site } from "@/content/site";

// Email HTML: tables and inline styles only, so it renders the same in Gmail,
// Outlook and Apple Mail. The wordmark is text, so nothing waits on images.

const c = { ink: "#1d211f", cream: "#f5f0e6", paper: "#fffdf8", sand: "#e8dfcf", brass: "#c08a3e", brassDark: "#8a5f22", muted: "#5f665f" };
const sans = "Helvetica,Arial,sans-serif";
const serif = "Georgia,'Times New Roman',serif";

export const escape = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

const link = (href: string, text: string, color = c.brassDark) =>
  `<a href="${escape(href)}" style="color:${color};text-decoration:underline;text-underline-offset:3px">${escape(text)}</a>`;

// Two buttons sharing one row at equal width.
const buttonPair = (a: [string, string], b?: [string, string]) => {
  const cell = ([href, text]: [string, string]) =>
    `<td class="btn" width="48%" style="background:${c.brass};border-radius:3px;text-align:center">
<a href="${escape(href)}" style="display:block;padding:14px 8px;font:bold 11px/1.3 ${sans};letter-spacing:1.5px;text-transform:uppercase;color:${c.ink};text-decoration:none">${escape(text)}</a></td>`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
${cell(a)}<td class="btn-gap" width="4%" style="font-size:0;line-height:0">&nbsp;</td>${b ? cell(b) : `<td class="btn-gap" width="48%">&nbsp;</td>`}
</tr></table>`;
};

// Label/value rows, e.g. PHONE  +92 314 5323372
const rows = (items: { label: string; value: string; href?: string }[]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${c.sand}">${items
    .map(
      (d) => `<tr>
<td class="lbl" valign="top" style="padding:12px 16px 12px 0;border-bottom:1px solid ${c.sand};font:bold 11px/20px ${sans};letter-spacing:2px;text-transform:uppercase;color:${c.brassDark};white-space:nowrap;width:1%">${escape(d.label)}</td>
<td valign="top" style="padding:12px 0;border-bottom:1px solid ${c.sand};font:15px/20px ${sans};color:${c.ink};overflow-wrap:anywhere;word-break:break-word">${d.href ? link(d.href, d.value, c.ink) : escape(d.value)}</td>
</tr>`,
    )
    .join("")}</table>`;

function frame({ preheader, eyebrow, body, footer }: { preheader: string; eyebrow: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<style>
@media (max-width:480px){.px{padding-left:20px!important;padding-right:20px!important}}
@media (max-width:359px){.outer{padding:16px 6px!important}.lbl{white-space:normal!important}.btn,.btn-gap{display:block!important;width:100%!important}.btn-gap{height:10px!important}}
</style></head>
<body style="margin:0;padding:0;background:${c.cream}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${c.cream}">${escape(preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${c.cream}"><tr><td class="outer" align="center" style="padding:32px 12px">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px">
<tr><td class="px" style="background:${c.ink};padding:28px 36px;border-radius:4px 4px 0 0">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td>
    <div style="font:30px/1 ${serif};color:${c.cream}">Shalimar</div>
    <div style="font:bold 10px/1 ${sans};letter-spacing:6.3px;color:${c.brass};padding-top:8px">COWORKING</div>
  </td></tr></table>
</td></tr>
<tr><td style="background:${c.brass};height:3px;line-height:3px;font-size:0">&nbsp;</td></tr>
<tr><td class="px" style="background:${c.paper};padding:36px">
  <div style="font:bold 11px/1 ${sans};letter-spacing:3px;text-transform:uppercase;color:${c.brassDark};padding-bottom:16px">${escape(eyebrow)}</div>
  ${body}
</td></tr>
<tr><td class="px" style="background:${c.ink};padding:22px 36px;border-radius:0 0 4px 4px;font:12px/18px ${sans};color:#b9bdb7">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const p = (html: string, extra = "") => `<p style="margin:0 0 16px;font:15px/24px ${sans};color:${c.ink};${extra}">${html}</p>`;

// The visitor's confirmation. Fixed text only: nothing the visitor typed goes in it.
export const confirmationHtml = (() => {
  const r = enquiryReply;
  return frame({
    preheader: r.preheader,
    eyebrow: "Enquiry received",
    body: `<h1 style="margin:0 0 16px;font:normal 30px/1.15 ${serif};color:${c.ink}">${escape(r.greeting)}</h1>
${p(escape(r.intro))}
${p(escape(r.urgent), "margin-bottom:12px")}
${rows(r.details)}
${p(escape(r.visit), "margin:24px 0 16px")}
${buttonPair([r.buttons[0].href, r.buttons[0].label], [r.buttons[1].href, r.buttons[1].label])}
<p style="margin:28px 0 0;font:15px/24px ${sans};color:${c.ink}">${escape(r.signoff[0])}<br><span style="font:18px/28px ${serif}">${escape(r.signoff[1])}</span><br>${link(`https://www.${r.signoff[2]}`, r.signoff[2])}</p>`,
    footer: `${escape(site.address.join(", "))}<br>You're receiving this because you sent an enquiry on our website. If that wasn't you, you can ignore this email.`,
  });
})();

type Enquiry = { name: string; company: string; email: string; phone: string; interest: string; note: string };

// A wa.me number from what the visitor typed, assuming Pakistan for local numbers.
function whatsappNumber(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `92${d.slice(1)}`;
  else if (d.length === 10 && d.startsWith("3")) d = `92${d}`;
  return d.length >= 10 ? d : "";
}

// The enquiry as it lands in info@. Replying answers the visitor (reply-to).
export function notificationEmail(e: Enquiry) {
  const head = [{ label: "Name", value: e.name }, ...(e.company ? [{ label: "Company", value: e.company }] : [])];
  const details = [
    { label: "Email", value: e.email, href: `mailto:${e.email}` },
    ...(e.phone ? [{ label: "Phone", value: e.phone, href: `tel:${e.phone.replace(/[^\d+]/g, "")}` }] : []),
    { label: "Interested in", value: e.interest || "Not specified" },
  ];
  const wa = e.phone ? whatsappNumber(e.phone) : "";
  const text = [
    ...[...head, ...details].map((d) => `${d.label}: ${d.value}`),
    "",
    e.note || "(no note)",
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
  const html = frame({
    preheader: `${e.interest || "General enquiry"} from ${e.name}`,
    eyebrow: "New website enquiry",
    body: `<h1 style="margin:0 0 20px;font:normal 30px/1.15 ${serif};color:${c.ink}">${escape(e.name)}${
      e.company ? `<span style="color:${c.muted}"> · ${escape(e.company)}</span>` : ""
    }</h1>
${rows(details)}
<div style="margin:24px 0 0;padding:18px 20px;background:${c.cream};border-left:3px solid ${c.brass};font:15px/24px ${sans};color:${c.ink};white-space:pre-wrap">${
      e.note ? escape(e.note) : `<span style="color:${c.muted}">No note</span>`
    }</div>
<div style="height:28px;line-height:28px;font-size:0">&nbsp;</div>
${buttonPair(
  [`mailto:${e.email}?subject=${encodeURIComponent("Re: Your enquiry at Shalimar Coworking")}`, "Reply by email"],
  wa ? [`https://wa.me/${wa}`, "WhatsApp them"] : undefined,
)}`,
    footer: `Sent from the enquiry form on the Shalimar website. Pressing Reply answers ${escape(e.name)} directly.`,
  });
  return { text, html };
}
