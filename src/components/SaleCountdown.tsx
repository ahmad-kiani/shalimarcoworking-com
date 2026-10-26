"use client";

import { useEffect, useState } from "react";
import { sale } from "@/content/site";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const PKT = 5 * HOUR; // Pakistan is UTC+5 all year, no daylight saving
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// The next sale.endsEvery after `now`, in Pakistan time. Once it passes, the following week's is next.
function nextEnd(now: number) {
  const local = now + PKT;
  const midnight = Math.floor(local / DAY) * DAY;
  const ahead = (DAYS.indexOf(sale.endsEvery.day) - new Date(midnight).getUTCDay() + 7) % 7;
  let end = midnight + ahead * DAY + sale.endsEvery.hour * HOUR;
  if (end <= local) end += 7 * DAY;
  return end - PKT;
}

// Time left until the next sale.endsEvery, as white boxes (DAYS, HRS, MIN, SEC) like a shop's sale bar.
// Starts after the page loads, so the server and the browser render the same thing first.
export default function SaleCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;

  const s = Math.floor((nextEnd(now) - now) / 1000);
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
