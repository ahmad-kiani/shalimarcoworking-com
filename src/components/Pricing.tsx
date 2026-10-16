"use client";

import { useState } from "react";
import { pricing, whatsappLink } from "@/content/site";

type Currency = "USD" | "PKR";

const fmt = (n: number) => n.toLocaleString("en-US");
// Annual price in PKR, rounded down to the nearest 100.
const annual = (n: number) => Math.floor((n * (1 - pricing.annualDiscount)) / 100) * 100;
// USD rounded down to the nearest 10 (137 → 130). Under $100 it rounds down to the dollar instead,
// so small prices like the conference room don't drop to $0.
const usd = (pkr: number) => {
  if (pricing.usdFixed[pkr]) return pricing.usdFixed[pkr];
  const d = pkr / pricing.usdRate;
  return d >= 100 ? Math.floor(d / 10) * 10 : Math.floor(d);
};
const amount = (pkr: number, c: Currency) => (c === "USD" ? usd(pkr) : pkr);
const money = (pkr: number, c: Currency) => (c === "USD" ? `$${fmt(usd(pkr))}` : `PKR ${fmt(pkr)}`);

const btn =
  "inline-flex min-h-12 items-center justify-center rounded-sm px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors active:scale-[0.98]";

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

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
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

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {/* Billing switch */}
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="flex w-max items-center gap-1 rounded-full border border-cream/15 bg-black/15 p-1"
      >
        {[
          { label: "Monthly", value: false },
          { label: "Annually", value: true },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={yearly === o.value}
            onClick={() => setYearly(o.value)}
            className={`flex min-h-11 items-center gap-2 rounded-full px-3.5 text-sm min-[360px]:px-5 font-medium transition-colors ${
              yearly === o.value ? "bg-[#f2ebdf] text-ink" : "text-cream/70 hover:text-cream"
            }`}
          >
            {o.label}
            {o.value && (
              <span className="rounded-full bg-brass-light px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-ink">
                <span className="max-[359px]:hidden">Save </span>
                <span className="min-[360px]:hidden">−</span>
                {Math.round(pricing.annualDiscount * 100)}%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Currency switch */}
      <div role="radiogroup" aria-label="Currency" className="flex w-max items-center gap-1 rounded-full border border-cream/15 bg-black/15 p-1">
        {(["USD", "PKR"] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={currency === c}
            onClick={() => setCurrency(c)}
            className={`flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
              currency === c ? "bg-[#f2ebdf] text-ink" : "text-cream/70 hover:text-cream"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      </div>

      {/* Plans */}
      <ul className="mx-auto mt-14 grid max-w-2xl gap-5 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
        {pricing.plans.map((plan) => {
          const featured = "featured" in plan && plan.featured;
          const ribbon = "ribbon" in plan ? plan.ribbon : "";
          const shown = yearly ? annual(plan.price) : plan.price;
          return (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-md p-6 min-[400px]:p-8 lg:p-7 xl:p-8 ${
                featured
                  ? "bg-[#f2ebdf] text-ink shadow-[0_24px_60px_rgb(0_0_0/0.35)] lg:-translate-y-3.5"
                  : "border border-cream/12 bg-ink-card/55"
              } ${ribbon ? "mt-3 lg:mt-0" : ""}`}
            >
              {featured && ribbon && (
                <span className="absolute -top-3 left-6 min-[400px]:left-8 lg:left-7 xl:left-8 rounded-sm bg-brass px-3 py-1.5 text-[0.6875rem] font-semibold tracking-[0.18em] text-ink uppercase">
                  {ribbon}
                </span>
              )}
              <span
                className={`text-[0.6875rem] font-semibold tracking-[0.2em] uppercase ${featured ? "text-brass-dark" : "text-brass-light"}`}
              >
                {plan.tag}
              </span>
              <h3 className="mt-2.5 font-serif text-[2.1rem] leading-tight">{plan.name}</h3>
              <p className={`mt-2 text-[0.9375rem] leading-relaxed lg:min-h-[3.2em] ${featured ? "text-muted" : "text-cream/65"}`}>
                {plan.body}
              </p>
              <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
                {currency === "PKR" && (
                  <span className={`text-sm tracking-wide ${featured ? "text-muted" : "text-cream/60"}`}>PKR</span>
                )}
                <span className="text-[2.5rem] leading-none min-[400px]:text-[3.25rem] lg:text-[2.6rem] xl:text-[3.25rem] font-light tracking-tight tabular-nums">
                  {currency === "USD" ? "$" : ""}
                  {fmt(amount(shown, currency))}
                </span>
                <s className={`text-lg tabular-nums ${featured ? "text-muted" : "text-cream/50"}`}>{money(plan.was, currency)}</s>
                <span className={`text-sm whitespace-nowrap ${featured ? "text-muted" : "text-cream/60"}`}>/ {plan.unit}</span>
              </p>
              <p className={`mt-2 text-[0.8125rem] lg:min-h-[2.6em] xl:min-h-0 ${featured ? "text-muted" : "text-cream/55"}`}>
                {yearly ? (
                  <>billed annually · {money(plan.price, currency)} if paid monthly</>
                ) : (
                  <>or {money(annual(plan.price), currency)} / {plan.unit} paid annually</>
                )}
              </p>

              <a
                href={whatsappLink(
                  `Hi Shalimar, I'm interested in the ${plan.name} plan (${money(shown, currency)} / ${plan.unit}${
                    yearly ? ", paid annually" : ""
                  }). Could you share more details?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn} mt-7 ${
                  featured
                    ? "bg-ink text-cream hover:bg-ink-soft"
                    : "border border-cream/35 hover:bg-cream hover:text-ink"
                }`}
              >
                {plan.cta}
              </a>

              <div className={`mt-7 border-t pt-6 ${featured ? "border-ink/12" : "border-cream/12"}`}>
                <p className={`text-[0.6875rem] font-semibold tracking-[0.2em] uppercase ${featured ? "text-muted" : "text-cream/50"}`}>
                  Includes
                </p>
                <ul className="mt-4 grid gap-3">
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
            className="flex flex-col gap-6 rounded-sm bg-ink-card/70 p-7 ring-1 ring-cream/10 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:items-end"
          >
            <div>
              <h3 className="font-serif text-3xl">{item.name}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-cream/70">{item.body}</p>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                <span className="text-3xl font-light tabular-nums">{money(item.price, currency)}</span>
                <s className="text-base text-cream/50 tabular-nums">{money(item.was, currency)}</s>
                <span className="text-sm text-cream/60">/ {item.unit}</span>
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
