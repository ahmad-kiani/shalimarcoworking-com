"use client";

import { usd } from "@/content/site";

type Currency = "USD" | "PKR";
const fmt = (n: number) => n.toLocaleString("en-US");
const amount = (pkr: number, c: Currency) => (c === "USD" ? usd(pkr) : pkr);

// "Save $65" pill: the struck price minus the price shown beside it, in the currency on screen.
export function Save({ was, now, c }: { was: number; now: number; c: Currency }) {
  const off = amount(was, c) - amount(now, c);
  return (
    <span className="shrink-0 rounded-full border border-ink bg-[#f2ebdf] px-3 py-1 text-[0.6875rem] leading-none font-semibold tracking-[0.14em] whitespace-nowrap text-ink uppercase">
      Save {c === "USD" ? `$${fmt(off)}` : `PKR ${fmt(off)}`}
    </span>
  );
}


// Arrow keys, Home and End move the choice within a radio group (the standard ARIA pattern).
// Only the checked option is in the Tab order, so Tab moves on to the next group.
export function radioKeys<T>(
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
