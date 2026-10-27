"use client";

import { useRef, useState } from "react";
import { pricing, whatsappLink } from "@/content/site";
import { btn, gutter } from "./styles";

type Currency = "USD" | "PKR";

const fmt = (n: number) => n.toLocaleString("en-US");
// Annual price in PKR, rounded down to the nearest 500.
const annual = (n: number) => Math.floor((n * (1 - pricing.annualDiscount)) / 500) * 500;
// USD rounded down to the nearest 10 (137 → 130). Under $100 it rounds down to the dollar instead,
// so small prices like the conference room don't drop to $0.
const usd = (pkr: number) => {
  if (pricing.usdFixed[pkr]) return pricing.usdFixed[pkr];
  const d = pkr / pricing.usdRate;
  return d >= 100 ? Math.floor(d / 10) * 10 : Math.floor(d);
};
const amount = (pkr: number, c: Currency) => (c === "USD" ? usd(pkr) : pkr);
// Price rows shrink with their column (container query units) so the price, old price and unit share one line
// where they can. Each row takes the smallest of: full size (1rem), what fits once the small labels hit their
// minimum size, and what fits when everything scales together (measured on the longest row of each kind), but
// never below 0.75rem: on the narrowest phones the old price and unit wrap under the price instead.
type Fit = { fixed: number; slope: number; whole: number };
const planFit: Record<Currency, Fit> = { USD: { fixed: 5.1, slope: 9.3, whole: 6.4 }, PKR: { fixed: 7.4, slope: 12.7, whole: 4.6 } };
const roomFit: Record<Currency, Fit> = { USD: { fixed: 4.5, slope: 4.8, whole: 10 }, PKR: { fixed: 5.3, slope: 10.7, whole: 5.9 } };
const fit = ({ fixed, slope, whole }: Fit) => ({
  fontSize: `max(0.75rem, min(1rem, calc((100cqi - ${fixed}rem) / ${slope}), ${whole}cqi))`,
});
// Struck-through price: the PKR label already sits next to the main price, so PKR shows just the number.
const wasLabel = (pkr: number, c: Currency) => (c === "USD" ? `$${fmt(usd(pkr))}` : fmt(pkr));
const money = (pkr: number, c: Currency) => (c === "USD" ? `$${fmt(usd(pkr))}` : `PKR ${fmt(pkr)}`);

// "Save $65" pill: the struck price minus the price shown beside it, in the currency on screen.
function Save({ was, now, c }: { was: number; now: number; c: Currency }) {
  const off = amount(was, c) - amount(now, c);
  return (
    <span className="shrink-0 rounded-full border border-ink bg-[#f2ebdf] px-3 py-1 text-[0.6875rem] leading-none font-semibold tracking-[0.14em] whitespace-nowrap text-ink uppercase">
      Save {c === "USD" ? `$${fmt(off)}` : `PKR ${fmt(off)}`}
    </span>
  );
}


// Arrow keys, Home and End move the choice within a radio group (the standard ARIA pattern).
// Only the checked option is in the Tab order, so Tab moves on to the next group.
function radioKeys<T>(
  e: React.KeyboardEvent,
  values: readonly T[],
  current: T,
  set: (v: T) => void,
  refs: React.RefObject<(HTMLButtonElement | null)[]>,
) {
  {
    const i = values.indexOf(current);
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (i + 1) % values.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (i - 1 + values.length) % values.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? values.length - 1
              : -1;
    if (next < 0) return;
    e.preventDefault();
    set(values[next]);
    refs.current[next]?.focus();
  }
}

function Tick() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-[0.6875rem]">
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const billingRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const currencyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Announced to screen readers when either switch changes (empty until then, so nothing is read on load).
  const [announce, setAnnounce] = useState("");
  const setBilling = (v: boolean) => {
    setYearly(v);
    setAnnounce(`Showing ${v ? "annual" : "monthly"} prices in ${currency}`);
  };
  const setMoney = (c: Currency) => {
    setCurrency(c);
    setAnnounce(`Showing ${yearly ? "annual" : "monthly"} prices in ${c}`);
  };

  return (
    <div className={`mx-auto max-w-7xl ${gutter}`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-brass-light uppercase">
          <span className="h-px w-7 bg-brass" aria-hidden="true" />
          {pricing.eyebrow}
          <span className="h-px w-7 bg-brass" aria-hidden="true" />
        </p>
        <h2 className="mt-5 font-serif text-[2.25rem] leading-[1.05] min-[360px]:text-[2.6rem] sm:text-5xl lg:text-[4rem]">
          {pricing.title} <span className="text-brass italic">{pricing.accent}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-cream/70">{pricing.intro}</p>
      </div>

      {/* Both switches share a row from 360px; below that they stack at the same width. */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {/* Billing switch */}
      <div
        role="radiogroup"
        aria-label="Billing period"
        onKeyDown={(e) => radioKeys(e, [false, true], yearly, setBilling, billingRefs)}
        className="flex w-max items-center gap-1 rounded-full border border-cream/15 bg-black/15 p-1 max-[359px]:w-full max-[359px]:max-w-64"
      >
        {[
          { label: "Monthly", value: false },
          { label: "Annually", value: true },
        ].map((o, i) => (
          <button
            key={o.label}
            ref={(el) => {
              billingRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={yearly === o.value}
            tabIndex={yearly === o.value ? 0 : -1}
            onClick={() => setBilling(o.value)}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors max-[359px]:flex-1 min-[400px]:px-5 ${
              yearly === o.value ? "bg-[#f2ebdf] text-ink" : "text-cream/70 hover:text-cream"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Currency switch */}
      <div
        role="radiogroup"
        aria-label="Currency"
        onKeyDown={(e) => radioKeys(e, ["USD", "PKR"] as const, currency, setMoney, currencyRefs)}
        className="flex w-max items-center gap-1 rounded-full border border-cream/15 bg-black/15 p-1 max-[359px]:w-full max-[359px]:max-w-64">
        {(["USD", "PKR"] as const).map((c, i) => (
          <button
            key={c}
            ref={(el) => {
              currencyRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={currency === c}
            tabIndex={currency === c ? 0 : -1}
            onClick={() => setMoney(c)}
            className={`flex min-h-11 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors max-[359px]:flex-1 min-[400px]:px-4 ${
              currency === c ? "bg-[#f2ebdf] text-ink" : "text-cream/70 hover:text-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>

      {/* Plans */}
      <ul className="mx-auto mt-14 grid max-w-2xl gap-5 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
        {pricing.plans.map((plan) => {
          const featured = "featured" in plan && plan.featured;
          const ribbon = "ribbon" in plan ? plan.ribbon : "";
          const shown = yearly ? annual(plan.price) : plan.price;
          return (
            <li
              key={plan.name}
              // Tablets (sm to lg): two columns inside each card (price and button left, what's included right), so three
              // full-width cards don't leave half of each empty. Phones and laptops: one column.
              className={`@container relative flex flex-col rounded-md p-6 min-[400px]:p-8 sm:grid sm:grid-cols-2 sm:gap-x-10 lg:flex lg:p-7 xl:p-8 ${
                featured
                  ? "bg-[#f2ebdf] pt-9 text-ink shadow-[0_24px_60px_rgb(0_0_0/0.35)] min-[400px]:pt-11 lg:-translate-y-3.5 lg:pt-10 xl:pt-11"
                  : "border border-cream/12 bg-ink-card/55"
              } ${ribbon ? "mt-3 lg:mt-0" : ""}`}
            >
              {featured && ribbon && (
                <span className="absolute -top-3 left-6 min-[400px]:left-8 lg:left-7 xl:left-8 rounded-sm bg-brass px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-ink uppercase">
                  {ribbon}
                </span>
              )}
              {/* The left column on tablets; dissolves into the card on laptops. Price rows measure against it. */}
              <div className="@container flex flex-col lg:contents">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-xs font-semibold tracking-[0.2em] uppercase ${featured ? "text-brass-dark" : "text-brass-light"}`}
                  >
                    {plan.tag}
                  </span>
                  <Save was={plan.was} now={shown} c={currency} />
                </div>
                <h3 className="mt-2.5 font-serif text-[2.1rem] leading-tight">{plan.name}</h3>
                <p className={`mt-2 text-[0.9375rem] leading-relaxed lg:min-h-[3.2em] ${featured ? "text-muted" : "text-cream/65"}`}>
                  {plan.body}
                </p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-[0.5em] gap-y-1 sm:mt-7 [&>*]:shrink-0" style={fit(planFit[currency])}>
                  {currency === "PKR" && (
                    <span className={`text-[max(0.75rem,0.875em)] tracking-wide ${featured ? "text-muted" : "text-cream/60"}`}>PKR</span>
                  )}
                  <span className="text-[3.25em] leading-none font-light tracking-tight whitespace-nowrap tabular-nums">
                    {currency === "USD" ? "$" : ""}
                    {fmt(amount(shown, currency))}
                  </span>
                  <span className="flex items-baseline gap-x-[0.5em] whitespace-nowrap">
                    <s className={`text-[max(0.8125rem,1.125em)] tabular-nums ${featured ? "text-muted" : "text-cream/60"}`}>
                      <span className="sr-only">was </span>
                      {wasLabel(plan.was, currency)}
                    </s>
                    <span className={`text-[max(0.75rem,0.875em)] ${featured ? "text-muted" : "text-cream/60"}`}>/ {plan.unit}</span>
                  </span>
                </p>
                <p className={`mt-2 text-[0.8125rem] lg:min-h-[2.6em] xl:min-h-0 ${featured ? "text-muted" : "text-cream/55"}`}>
                  {yearly ? (
                    <>billed annually · {money(plan.price, currency)} if paid monthly</>
                  ) : (
                    <>or {money(annual(plan.price), currency)} / {plan.unit} paid annually</>
                  )}
                </p>
                {plan.left > 0 && (
                  <p className={`mt-1.5 flex items-center gap-2 text-[0.8125rem] font-semibold ${featured ? "text-brass-dark" : "text-brass-light"}`}>
                    <span className="size-[7px] rounded-full bg-current" aria-hidden="true" />
                    Only {plan.left} {plan.leftUnit}
                    {plan.left === 1 ? "" : "s"} left
                  </p>
                )}

                <a
                  href={whatsappLink(
                    `Hi Shalimar, I'm interested in the ${plan.name} plan (${money(shown, currency)} / ${plan.unit}${
                      yearly ? ", paid annually" : ""
                    }). Could you share more details?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btn} mt-5 sm:mt-7 ${
                    featured
                      ? "bg-ink text-cream hover:bg-ink-soft"
                      : "border border-cream/35 hover:bg-cream hover:text-ink"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>

              <div
                className={`mt-5 border-t pt-5 sm:mt-0 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-10 lg:mt-7 lg:border-t lg:border-l-0 lg:pt-6 lg:pl-0 ${
                  featured ? "border-ink/12" : "border-cream/12"
                }`}
              >
                <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${featured ? "text-muted" : "text-cream/60"}`}>
                  Includes
                </p>
                <ul className="mt-4 grid gap-2.5 sm:gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex gap-3 text-[0.9375rem] ${featured ? "text-ink" : "text-cream/90"}`}>
                      <span
                        className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${
                          featured ? "bg-brass/15 text-brass-dark" : "bg-brass/18 text-brass-light"
                        }`}
                      >
                        <Tick />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      {/* On demand: conference room and virtual office */}
      <ul className="mx-auto mt-5 grid max-w-2xl gap-5 lg:mt-8 lg:max-w-none lg:grid-cols-2">
        {pricing.onDemand.items.map((item) => (
          <li
            key={item.name}
            className="relative flex flex-col gap-6 rounded-sm bg-ink-card/70 p-7 ring-1 ring-cream/10 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-end"
          >
            <div className="@container min-w-0 flex-1 self-stretch">
              {/* The pill sits beside the name on phones and in the card's top-right corner from sm up. */}
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 sm:pr-28 sm:[&>span]:absolute sm:[&>span]:top-[2.2rem] sm:[&>span]:right-7">
                <h3 className="font-serif text-3xl">{item.name}</h3>
                <Save was={item.was} now={item.price} c={currency} />
              </div>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/70">{item.body}</p>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-[0.5em] gap-y-1 [&>*]:shrink-0" style={fit(roomFit[currency])}>
                <span className="text-[1.875em] font-light whitespace-nowrap tabular-nums">{money(item.price, currency)}</span>
                <span className="flex items-baseline gap-x-[0.5em] whitespace-nowrap">
                  <s className="text-[max(0.8125rem,1em)] text-cream/60 tabular-nums">
                    <span className="sr-only">was </span>
                    {wasLabel(item.was, currency)}
                  </s>
                  <span className="text-[max(0.75rem,0.875em)] text-cream/60">/ {item.unit}</span>
                </span>
              </p>
            </div>
            <a
              href={whatsappLink(
                `Hi Shalimar, I'm interested in the ${item.name} (${money(item.price, currency)} / ${item.unit}). Could you share more details?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} shrink-0 bg-brass text-ink hover:bg-brass-light`}
            >
              {item.cta}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
