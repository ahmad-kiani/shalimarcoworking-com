"use client";

import { useRef, useState } from "react";
import { annualPrice, pricing, usd } from "@/content/site";
import { lpLinks } from "@/content/landing";
import { radioKeys } from "./PriceParts";

// Team cost on the small-teams page (LS5), light theme: pick a team size and a currency, see the monthly total for a
// private office and for dedicated desks (per-seat price × seats; USD is the per-seat dollar price × seats, never the
// PKR total converted), and ask on WhatsApp with the team size and total typed in.

type Currency = "USD" | "PKR";
const fmt = (n: number) => n.toLocaleString("en-US");
const seatPrice = (pkr: number, c: Currency) => (c === "USD" ? usd(pkr) : pkr);
const total = (pkr: number, seats: number, c: Currency) => {
  const n = seatPrice(pkr, c) * seats;
  return c === "USD" ? `$${fmt(n)}` : `PKR ${fmt(n)}`;
};
const display = "font-(family-name:--font-montserrat) font-semibold tracking-[-0.01em]";
const SIZES = [2, 3, 4] as const;
const CURRENCIES = ["USD", "PKR"] as const;
const OPTIONS = [
  { plan: "Private Office", note: "Your own room, with a door that closes and locks" },
  { plan: "Dedicated Desk", note: "A fixed desk each on the shared floor" },
];

export default function TeamCost({ code }: { code: string }) {
  const [seats, setSeats] = useState<(typeof SIZES)[number]>(3);
  const [currency, setCurrency] = useState<Currency>("USD");
  const sizeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moneyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const links = lpLinks(code);

  const group = <T extends string | number>(label: string, values: readonly T[], current: T, set: (v: T) => void, refs: React.RefObject<(HTMLButtonElement | null)[]>, text: (v: T) => string) => (
    <div>
      <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-ink/70 uppercase">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        onKeyDown={(e) => radioKeys(e, values, current, set, refs)}
        className="mt-2 inline-flex items-center gap-1 rounded-full border border-ink/15 bg-white p-1"
      >
        {values.map((v, i) => (
          <button
            key={v}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={current === v}
            tabIndex={current === v ? 0 : -1}
            onClick={() => set(v)}
            className={`flex min-h-11 min-w-14 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors ${
              current === v ? "bg-ink text-cream" : "text-ink/70 hover:text-ink"
            }`}
          >
            {text(v)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-5">
        {group("Team size", SIZES, seats, setSeats, sizeRefs, (n) => `${n} people`)}
        {group("Currency", CURRENCIES, currency, setCurrency, moneyRefs, (c) => c)}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing prices for a team of {seats} in {currency}
      </p>

      <ul className="mx-auto mt-8 grid max-w-[52rem] gap-5 md:grid-cols-2">
        {OPTIONS.map((o, i) => {
          const p = pricing.plans.find((x) => x.name === o.plan)!;
          const main = i === 0;
          const save = (seatPrice(p.was, currency) - seatPrice(p.price, currency)) * seats;
          return (
            <li key={o.plan} className={`relative flex flex-col rounded-md p-6 sm:p-7 ${main ? "bg-ink text-cream shadow-[0_20px_50px_rgb(0_0_0/0.22)]" : "border border-ink/10 bg-white text-ink"}`}>
              {main && <span className="absolute -top-3 left-6 rounded-sm bg-brass px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-ink uppercase sm:left-7">Best for teams</span>}
              <h3 className={`${display} text-[1.25rem] uppercase`}>{o.plan === "Dedicated Desk" ? `${seats} Dedicated Desks` : "Private Office"}</h3>
              <p className={`mt-1 text-[0.875rem] ${main ? "text-cream/70" : "text-ink/70"}`}>{o.note}</p>
              <p className={`${display} mt-5 text-[2.5rem] leading-none whitespace-nowrap tabular-nums`}>{total(p.price, seats, currency)}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <s className={`text-[0.9375rem] tabular-nums ${main ? "text-cream/55" : "text-ink/55"}`}>
                  <span className="sr-only">was </span>
                  {total(p.was, seats, currency)}
                </s>
                <span
                  className={`rounded-full border px-3 py-1 text-[0.6875rem] leading-none font-semibold tracking-[0.14em] whitespace-nowrap uppercase ${main ? "border-brass-light text-brass-light" : "border-ink bg-[#f2ebdf] text-ink"}`}
                >
                  Save {currency === "USD" ? `$${fmt(save)}` : `PKR ${fmt(save)}`}
                </span>
              </p>
              <p className={`mt-3 mb-6 text-[0.8125rem] leading-snug ${main ? "text-cream/70" : "text-ink/70"}`}>
                a month for {seats} seats · {total(annualPrice(p.price), seats, currency)} a month if paid annually
              </p>
              <a
                href={links.team(o.plan, p.price, seats, currency)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex min-h-12 items-center justify-center rounded-full px-6 text-center text-[0.8125rem] font-semibold tracking-[0.04em] uppercase transition-colors active:scale-[0.98] ${
                  main ? "bg-brass text-ink hover:bg-brass-light" : "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream"
                }`}
              >
                Ask about this for my team of {seats}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
