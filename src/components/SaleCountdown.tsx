"use client";

import { useEffect, useState } from "react";
import { sale } from "@/content/site";

// Time left until sale.endsAt, as white boxes (DAYS, HRS, MIN, SEC) like a shop's sale bar.
// Shows nothing when no end date is set or the date has passed. Starts after the page loads,
// so the server and the browser render the same thing first.
export default function SaleCountdown() {
  const end = sale.endsAt ? Date.parse(sale.endsAt) : NaN;
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (Number.isNaN(end)) return;
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (now === null || Number.isNaN(end) || end <= now) return null;

  const s = Math.floor((end - now) / 1000);
  const parts = [
    { value: Math.floor(s / 86400), label: "Days" },
    { value: Math.floor(s / 3600) % 24, label: "Hrs" },
    { value: Math.floor(s / 60) % 60, label: "Min" },
    { value: s % 60, label: "Sec" },
  ].filter((p, i) => i > 0 || p.value > 0);

  return (
    <span className="flex items-center gap-1" role="timer" aria-label={`Sale ends in ${parts.map((p) => `${p.value} ${p.label}`).join(" ")}`}>
      {parts.map((p, i) => (
        <span key={p.label} className="flex items-center gap-1" aria-hidden="true">
          {i > 0 && <span className="font-semibold text-white">:</span>}
          <span className="flex size-[1.875rem] flex-col items-center justify-center rounded-[2px] bg-white text-[#054b48]">
            <span className="text-[0.9375rem] leading-[0.9] font-semibold tabular-nums">{String(p.value).padStart(2, "0")}</span>
            <span className="text-[0.5rem] leading-none font-semibold uppercase">{p.label}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
