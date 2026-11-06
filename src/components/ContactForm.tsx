"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { chatLink, site } from "@/content/site";
import Icon from "./Icon";
import InterestSelect from "./InterestSelect";

const field =
  "w-full border-0 border-b border-ink/50 bg-transparent px-0 py-3 text-ink placeholder:text-ink/65 focus:border-garden focus:shadow-[inset_0_-2px_0_var(--color-garden)] focus:ring-0 focus:outline-none";
const label = "block text-xs font-medium tracking-[0.2em] text-muted uppercase";

type Status = "idle" | "sending" | "sent" | "invalid" | "rate" | "error";
type Field = "name" | "email" | "phone";

const fieldErrors: Record<Field, string> = {
  name: "Please enter your name.",
  email: "Please check your email address.",
  phone: "Please check your phone number.",
};
const Required = () => (
  <span aria-hidden="true" className="text-brass-dark">
    {" "}*
  </span>
);

// Posts the enquiry to /api/enquiry, which emails it to the Shalimar inbox
// and sends the visitor a confirmation.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [round, setRound] = useState(0);
  // errorField picks the message; badField marks the input and clears once the visitor edits it.
  const [errorField, setErrorField] = useState<Field | null>(null);
  const [badField, setBadField] = useState<Field | null>(null);
  const form = useRef<HTMLFormElement>(null);
  // One id per enquiry, so a retry after a network error never sends it twice.
  const id = useRef<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "sent") heading.current?.focus();
  }, [status]);
  useEffect(() => {
    if (round > 0) nameInput.current?.focus();
  }, [round]);
  // Point the visitor to the field the server rejected.
  useEffect(() => {
    if (badField) form.current?.querySelector<HTMLInputElement>(`[name="${badField}"]`)?.focus();
  }, [badField]);

  // Props that mark a field as the one needing attention, and clear it once edited.
  const invalidProps = (name: Field) =>
    badField === name
      ? { "aria-invalid": true, "aria-describedby": "form-error", onInput: () => setBadField(null) }
      : {};

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setBadField(null);
    setErrorField(null);
    id.current ??= crypto.randomUUID();
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), id: id.current };
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        const { field } = await res.json().catch(() => ({}));
        if (field in fieldErrors) {
          setErrorField(field);
          setBadField(field);
        }
      }
      setStatus(res.ok ? "sent" : res.status === 400 ? "invalid" : res.status === 429 ? "rate" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-start justify-center rounded-sm bg-cream p-6 text-ink shadow-2xl max-[359px]:p-5 sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-garden/10 text-garden">
          <Icon name="check" className="size-6" />
        </span>
        <h3 ref={heading} tabIndex={-1} className="mt-6 font-serif text-3xl outline-none sm:text-4xl">
          Thank you, we&apos;ve got it.
        </h3>
        <p className="mt-3 max-w-md text-muted">
          We&apos;ll get back to you within 48 hours. A confirmation email is on its way; if you don&apos;t see it,
          please check your spam folder.
        </p>
        <button
          type="button"
          onClick={() => {
            id.current = null;
            setRound((r) => r + 1);
            setStatus("idle");
          }}
          className="mt-8 inline-flex min-h-11 items-center gap-1.5 text-sm text-brass-dark underline-offset-4 hover:underline"
        >
          Send another enquiry
          <Icon name="arrowRight" className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <form ref={form} key={round} onSubmit={onSubmit} aria-busy={status === "sending"} className="rounded-sm bg-cream p-6 text-ink shadow-2xl max-[359px]:p-5 sm:p-10 lg:flex lg:flex-col">
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-6 lg:flex-1 lg:grid-rows-[auto_auto_auto_1fr]">
        <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          Leave this empty
          <input name="hp_extra" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          <span className={label}>
            Name
            <Required />
          </span>
          <input ref={nameInput} name="name" required {...invalidProps("name")} autoComplete="name" enterKeyHint="next" placeholder="Your full name" className={field} />
        </label>
        <label>
          <span className={label}>Company</span>
          <input name="company" autoComplete="organization" enterKeyHint="next" placeholder="Optional" className={field} />
        </label>
        <label>
          <span className={label}>
            Email
            <Required />
          </span>
          <input
            {...invalidProps("email")}
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
            {...invalidProps("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            pattern="[+\d\(][\d\s\(\)\-]{5,}"
            title="Digits, spaces and an optional + only"
            autoComplete="tel"
            enterKeyHint="next"
            placeholder="+92 …"
            className={field}
          />
        </label>
        <div className="sm:col-span-2">
          <span id="interest-label" className={label}>
            Interested in
          </span>
          <InterestSelect labelId="interest-label" />
        </div>
        <label className="sm:col-span-2 lg:flex lg:flex-col">
          <span className={label}>Note</span>
          <textarea
            name="note"
            rows={3}
            placeholder="A line about your work and when you'd like to visit."
            className={`${field} field-sizing-content min-h-24 resize-none lg:flex-1`}
          />
        </label>
      </div>
      <button
        type="submit"
        aria-disabled={status === "sending"}
        className="mt-8 flex min-h-12 w-full items-center justify-center rounded-sm bg-brass px-8 text-xs font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:bg-brass-light active:scale-[0.98] aria-disabled:cursor-wait aria-disabled:opacity-70 sm:w-auto lg:self-start"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your enquiry…" : ""}
      </p>
      {(status === "invalid" || status === "rate") && (
        <p id="form-error" role="alert" className="mt-4 text-sm text-[#a33a2b]">
          {status === "rate"
            ? "Too many attempts. Please try again in a few minutes."
            : errorField
              ? fieldErrors[errorField]
              : "Please check your email address and phone number."}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-[#a33a2b]">
          Sorry, that didn&apos;t send. Please try again, or{" "}
          <a href={chatLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            message us on WhatsApp
          </a>{" "}
          or email{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="mt-4 text-[0.8125rem] text-muted">
        <span aria-hidden="true">
          <span className="text-brass-dark">*</span> Required.{" "}
        </span>
        By sending this you agree to our{" "}
        <Link href="/privacy-policy" className="text-brass-dark underline underline-offset-4 hover:text-ink">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
