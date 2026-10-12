"use client";

import { useState } from "react";
import { pricing, whatsappLink } from "@/content/site";

const fmt = (n: number) => n.toLocaleString("en-US");
const annual = (n: number) => Math.round(n * (1 - pricing.annualDiscount));

const btn =
  "inline-flex min-h-12 items-center justify-center rounded-sm px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors active:scale-[0.98]";

function Tick() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="size-[11px]">
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-brass-light uppercase">
          <span className="h-px w-7 bg-brass" aria-hidden="true" />
          {pricing.eyebrow}
          <span className="h-px w-7 bg-brass" aria-hidden="true" />
        </p>
        <h2 className="mt-5 font-serif text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
          {pricing.title} <span className="text-brass italic">{pricing.accent}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-cream/70">{pricing.intro}</p>
      </div>

      {/* Billing switch */}
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="mx-auto mt-10 flex w-max items-center gap-1 rounded-full border border-cream/15 bg-black/15 p-1"
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
            className={`flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${
              yearly === o.value ? "bg-cream text-ink" : "text-cream/70 hover:text-cream"
            }`}
          >
            {o.label}
            {o.value && (
              <span className="rounded-full bg-brass-light px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink">
                Save {Math.round(pricing.annualDiscount * 100)}%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plans */}
      <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {pricing.plans.map((plan) => {
          const featured = "featured" in plan && plan.featured;
          const ribbon = "ribbon" in plan ? plan.ribbon : "";
          const shown = yearly ? annual(plan.price) : plan.price;
          return (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-md p-8 ${
                featured
                  ? "bg-cream text-ink shadow-[0_24px_60px_rgb(0_0_0/0.35)] lg:-translate-y-3.5"
                  : "border border-cream/12 bg-ink-card/55"
              } ${ribbon ? "mt-3 lg:mt-0" : ""}`}
            >
              {featured && ribbon && (
                <span className="absolute -top-3 left-8 rounded-sm bg-brass px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-ink uppercase">
                  {ribbon}
                </span>
              )}
              <span
                className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${featured ? "text-brass-dark" : "text-brass-light"}`}
              >
                {plan.tag}
              </span>
              <h3 className="mt-2.5 font-serif text-[2.1rem] leading-tight">{plan.name}</h3>
              <p className={`mt-2 text-[15px] leading-relaxed lg:min-h-[3.2em] ${featured ? "text-muted" : "text-cream/65"}`}>
                {plan.body}
              </p>

              <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
                <span className={`text-sm tracking-wide ${featured ? "text-muted" : "text-cream/60"}`}>PKR</span>
                <span className="text-[3.25rem] leading-none font-light tracking-tight tabular-nums">{fmt(shown)}</span>
                <span className={`text-sm ${featured ? "text-muted" : "text-cream/60"}`}>/ {plan.unit}</span>
              </p>
              <p className={`mt-2 text-[13px] ${featured ? "text-muted" : "text-cream/55"}`}>
                {yearly ? (
                  <>
                    billed annually · <s>PKR {fmt(plan.price)}</s> monthly
                  </>
                ) : (
                  <>or PKR {fmt(annual(plan.price))} / {plan.unit} paid annually</>
                )}
              </p>

              <a
                href={whatsappLink(
                  `Hi Shalimar, I'm interested in the ${plan.name} plan (PKR ${fmt(shown)} / ${plan.unit}${
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
                <p className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${featured ? "text-muted" : "text-cream/50"}`}>
                  Includes
                </p>
                <ul className="mt-4 grid gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex gap-3 text-[15px] ${featured ? "text-ink" : "text-cream/90"}`}>
                      <span
                        className={`mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full ${
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
      <ul className="mt-5 grid gap-5 lg:mt-8 lg:grid-cols-2">
        {pricing.onDemand.items.map((item) => (
          <li
            key={item.name}
            className="flex flex-col gap-6 rounded-sm bg-ink-card/70 p-7 ring-1 ring-cream/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-serif text-3xl">{item.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-cream/70">{item.body}</p>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-sm text-cream/70">PKR</span>
                <span className="text-3xl font-light tabular-nums">{fmt(item.price)}</span>
                <span className="text-sm text-cream/60">/ {item.unit}</span>
              </p>
            </div>
            <a
              href={whatsappLink(
                `Hi Shalimar, I'm interested in the ${item.name} (PKR ${fmt(item.price)} / ${item.unit}). Could you share more details?`,
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

      <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-cream/60">
        {pricing.notes.map((n) => (
          <li key={n} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}
