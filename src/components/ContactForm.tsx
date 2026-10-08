"use client";

import { contact, site } from "@/content/site";
import Icon from "./Icon";

const field =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-ink placeholder:text-ink/55 focus:border-garden focus:ring-0 focus:outline-none";
const label = "block text-[11px] font-medium tracking-[0.2em] text-muted uppercase";

// No backend yet: the form opens the visitor's email app with the enquiry filled in.
export default function ContactForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `Enquiry: ${get("interest") || "Shalimar Coworking"}`;
    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Interested in: ${get("interest")}`,
      "",
      get("note"),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="rounded-sm bg-cream p-6 text-ink shadow-2xl sm:p-10">
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <label>
          <span className={label}>Name</span>
          <input name="name" required autoComplete="name" enterKeyHint="next" placeholder="Your full name" className={field} />
        </label>
        <label>
          <span className={label}>Company</span>
          <input name="company" autoComplete="organization" enterKeyHint="next" placeholder="Optional" className={field} />
        </label>
        <label>
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            enterKeyHint="next"
            placeholder="you@company.com"
            className={field}
          />
        </label>
        <label>
          <span className={label}>Phone</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder="+92 …"
            className={field}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={label}>Interested in</span>
          <span className="relative block">
            <select name="interest" defaultValue="" className={`${field} appearance-none pr-8`}>
              <option value="" disabled>
                Select an option
              </option>
              {contact.interests.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <Icon name="chevron" className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-muted" />
          </span>
        </label>
        <label className="sm:col-span-2">
          <span className={label}>Note</span>
          <textarea
            name="note"
            rows={3}
            placeholder="A line about your work and when you'd like to visit."
            className={`${field} field-sizing-content min-h-24 resize-none`}
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-8 flex min-h-12 w-full items-center justify-center rounded-sm bg-garden px-8 text-xs font-semibold tracking-[0.16em] text-cream uppercase transition-colors hover:bg-garden-deep active:scale-[0.98] sm:w-auto"
      >
        Send enquiry
      </button>
    </form>
  );
}
