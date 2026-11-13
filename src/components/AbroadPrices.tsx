"use client";

import { useRef, useState } from "react";
import { annualPrice, pricing, usd } from "@/content/site";
import { lpLinks } from "@/content/landing";
import { radioKeys, Save } from "./PriceParts";

// The plan cards on the "clients abroad" page (LS4), with the same USD / PKR switch as the pricing section on the
// home page. USD is shown first, since these visitors are paid in dollars. Each Reserve button sends the plan and the
// price in the chosen currency on WhatsApp, with the page's code.

type Currency = "USD" | "PKR";
const fmt = (n: number) => n.toLocaleString("en-US");
const money = (pkr: number, c: Currency) => (c === "USD" ? `$${fmt(usd(pkr))}` : `PKR ${fmt(pkr)}`);
const display = "font-(family-name:--font-montserrat) font-semibold tracking-[-0.01em]";

function Tick({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`mt-[0.3em] size-3 shrink-0 ${className}`}>
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

export default function AbroadPrices({ code }: { code: string }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const links = lpLinks(code);

  return (
    <>
      <div className="mt-7 flex justify-center">
        <div
          role="radiogroup"
          aria-label="Currency"
          onKeyDown={(e) => radioKeys(e, ["USD", "PKR"] as const, currency, setCurrency, refs)}
          className="flex items-center gap-1 rounded-full border border-ink/15 bg-white p-1"
        >
          {(["USD", "PKR"] as const).map((c, i) => (
            <button
              key={c}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={currency === c}
              tabIndex={currency === c ? 0 : -1}
              onClick={() => setCurrency(c)}
              className={`flex min-h-11 min-w-20 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-[0.06em] transition-colors ${
                currency === c ? "bg-ink text-cream" : "text-ink/70 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        Showing prices in {currency}
      </p>

      <ul className="mx-auto mt-10 grid max-w-[64rem] gap-5 md:grid-cols-3 md:items-stretch">
        {pricing.plans.map((p) => {
          const dark = "featured" in p && p.featured;
          const office = p.leftUnit === "office";
          const unit = `a month${office ? " per seat" : ""}`;
          const muted = dark ? "text-cream/70" : "text-ink/70";
          return (
            <li
              key={p.name}
              className={`relative flex flex-col rounded-md p-6 sm:p-7 ${
                dark ? "mt-3 bg-ink text-cream shadow-[0_20px_50px_rgb(0_0_0/0.25)] md:mt-0 md:-translate-y-3" : "border border-ink/10 bg-white text-ink"
              }`}
            >
              {dark && p.ribbon && (
                <span className="absolute -top-3 left-6 rounded-sm bg-brass px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink uppercase sm:left-7">
                  {p.ribbon}
                </span>
              )}
              <span className={`text-[0.75rem] font-semibold tracking-[0.18em] uppercase ${dark ? "text-brass-light" : "text-brass-dark"}`}>{p.tag}</span>
              <h3 className={`${display} mt-3 text-[1.5rem] leading-tight uppercase`}>{p.name}</h3>
              <p className={`mt-2 text-[0.9375rem] leading-relaxed md:min-h-[4.9em] ${muted}`}>{p.body}</p>

              <div className={`mt-5 border-t pt-5 ${dark ? "border-cream/15" : "border-ink/10"}`}>
                <p className={`${display} text-[2.5rem] leading-none whitespace-nowrap tabular-nums`}>{money(p.price, currency)}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                  <s className={`text-[0.9375rem] tabular-nums ${dark ? "text-cream/55" : "text-ink/55"}`}>
                    <span className="sr-only">was </span>
                    {money(p.was, currency)}
                  </s>
                  <Save was={p.was} now={p.price} c={currency} />
                </p>
                <p className={`mt-3 text-[0.8125rem] leading-snug ${muted}`}>
                  {unit} · {money(annualPrice(p.price), currency)} if paid annually
                </p>
                {p.left > 0 && (
                  <p className={`mt-2 flex items-center gap-2 text-[0.8125rem] font-semibold ${dark ? "text-brass-light" : "text-[#b3261e]"}`}>
                    <span className="size-[7px] rounded-full bg-current" aria-hidden="true" />
                    Only {p.left} {p.leftUnit}
                    {p.left === 1 ? "" : "s"} left
                  </p>
                )}
              </div>

              <ul className={`mt-5 mb-7 space-y-2 text-[0.875rem] ${dark ? "text-cream/85" : "text-ink/80"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Tick className={dark ? "text-brass-light" : "text-brass-dark"} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={links.plan(p.name, p.price, p.unit, currency)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Reserve a ${p.name} on WhatsApp, paying in ${currency}`}
                className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-brass px-6 text-[0.8125rem] font-semibold tracking-[0.06em] text-ink uppercase transition-colors hover:bg-brass-light active:scale-[0.98]"
              >
                Reserve in {currency}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
