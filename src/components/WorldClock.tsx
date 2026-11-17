"use client";

import { useEffect, useState } from "react";

// Live clocks (Islamabad, London, Dubai, New York) and the hours timeline for the "clients abroad" page. Everything time-related runs only in the browser
// (after mount), so the server-rendered page never disagrees with the visitor's clock: until then the clocks show
// dashes and the timeline uses winter offsets. Daylight saving in London and New York is read from the
// browser's time-zone data, so the bars move by themselves in March and October/November (Dubai has none).

const PK = "Asia/Karachi";
// Shalimar's hours in Pakistan time (24-hour) and its open days (0 = Sunday). Keep in step with site.hours.
const OPEN = 9;
const CLOSE = 27; // 3 AM the next morning
const OPEN_DAYS = [1, 2, 3, 4, 5, 6];

const cities = [
  { name: "Dubai", tz: "Asia/Dubai", winter: 4 },
  { name: "London", tz: "Europe/London", winter: 0 },
  { name: "New York", tz: "America/New_York", winter: -5 },
];

// Hours from UTC for a time zone at a moment (e.g. London: 0 in winter, 1 in summer).
function offset(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const local = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"));
  return Math.round((local - at.getTime()) / 36e5);
}

// Hour (with minutes as a fraction) and weekday in a time zone.
function local(tz: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour12: false, weekday: "short", hour: "numeric", minute: "numeric" }).formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { hour: (Number(get("hour")) % 24) + Number(get("minute")) / 60, day };
}

const show = (tz: string, at: Date) => new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", weekday: "short" }).format(at);

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // Set after mount, then refreshed every 20 seconds.
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// Hero card: Islamabad, Dubai, London and New York right now, with whether Shalimar is open and who's at work.
export function ClockCard() {
  const now = useNow();
  const pk = now ? local(PK, now) : null;
  // Before 3 AM it is still the previous day's opening (Saturday night runs into Sunday, Sunday night is closed).
  const open = pk ? (pk.hour >= OPEN && OPEN_DAYS.includes(pk.day)) || (pk.hour < CLOSE - 24 && OPEN_DAYS.includes((pk.day + 6) % 7)) : null;
  return (
    <div className="rounded-md border border-cream/15 bg-cream/[0.06] p-5 backdrop-blur-sm sm:p-6">
      <p className="flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.14em] text-cream/85 uppercase" aria-live="polite">
        <span className={`size-2 rounded-full ${open === null ? "bg-cream/40" : open ? "bg-[#6fcf8a]" : "bg-brass-light"}`} aria-hidden="true" />
        {open === null ? "Open 9 AM to 3 AM, Mon to Sat" : open ? "Shalimar is open now, until 3 AM" : "Shalimar is closed now, opens at 9 AM"}
      </p>
      <ul className="mt-4 divide-y divide-cream/10 border-t border-cream/10">
        {[{ name: "Islamabad", tz: PK, home: true }, ...cities.map((c) => ({ ...c, home: false }))].map((c) => {
          const l = now ? local(c.tz, now) : null;
          const working = l ? l.day >= 1 && l.day <= 5 && l.hour >= 9 && l.hour < 17 : null;
          return (
            <li key={c.name} className="flex items-baseline justify-between gap-3 py-3">
              <span className="text-[0.9375rem] font-semibold text-cream">
                {c.name}
                <span className="ml-2 text-[0.75rem] font-normal text-cream/60">{c.home ? "Your desk" : working === null ? "" : working ? "Working hours" : "After hours"}</span>
              </span>
              <span className="font-(family-name:--font-montserrat) text-[1.125rem] font-semibold text-cream tabular-nums sm:text-[1.25rem]">{now ? show(c.tz, now) : "--:--"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// A full 24 hours, 4 AM to 4 AM Islamabad time, so every city's whole day fits without wrapping past midnight.
// Shalimar's hours are a band behind every row, and each client
// city's 9-to-5 converted to Islamabad time, so the overlap is plain to see. A line marks "now" when it's in range.
const FROM = 4;
const TO = 28;
const pct = (h: number) => `${((Math.min(Math.max(h, FROM), TO) - FROM) / (TO - FROM)) * 100}%`;
const label = (h: number) => {
  const x = ((h % 24) + 24) % 24;
  return `${x % 12 === 0 ? 12 : x % 12} ${x < 12 ? "AM" : "PM"}`;
};

export function HoursTimeline() {
  const now = useNow();
  const h = now ? local(PK, now).hour : null;
  const pkNow = h === null ? null : h < FROM ? h + 24 : h;
  const rows = cities.map((c) => {
    const off = now ? offset(c.tz, now) : c.winter;
    const start = 9 + (5 - off);
    return { ...c, start, end: start + 8 };
  });
  return (
    <div>
      <div className="relative">
        {/* Shalimar's open hours, behind every row */}
        <div className="pointer-events-none absolute inset-y-0 rounded-sm bg-brass/12" style={{ left: pct(OPEN), right: `calc(100% - ${pct(CLOSE)})` }} aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 border-l-2 border-dashed border-brass" style={{ left: pct(CLOSE) }} aria-hidden="true" />
        {pkNow !== null && pkNow >= FROM && pkNow < TO && (
          <div className="pointer-events-none absolute -top-2 -bottom-2 z-10 w-0.5 bg-[#b3261e]" style={{ left: pct(pkNow) }} aria-hidden="true">
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[0.6875rem] font-bold tracking-[0.08em] text-[#b3261e] uppercase">Now</span>
          </div>
        )}
        <ul className="relative space-y-3 py-3">
          <li>
            <p className="mb-1 text-[0.75rem] font-semibold tracking-[0.08em] text-ink uppercase">Shalimar, Islamabad</p>
            <div className="relative h-9">
              <div className="absolute inset-y-0 flex items-center rounded-sm bg-brass px-2.5 text-[0.75rem] font-semibold text-ink" style={{ left: pct(OPEN), right: `calc(100% - ${pct(CLOSE)})` }}>
                9 AM – 3 AM
              </div>
            </div>
          </li>
          {rows.map((r) => (
            <li key={r.name}>
              <p className="mb-1 text-[0.75rem] font-semibold tracking-[0.08em] text-ink uppercase">
                {r.name} <span className="font-normal tracking-normal text-ink/60 normal-case">9 to 5 their time</span>
              </p>
              <div className="relative h-9">
                <div
                  className={`absolute inset-y-0 flex items-center overflow-hidden bg-ink px-2.5 text-[0.75rem] font-semibold whitespace-nowrap text-cream ${r.end > TO ? "rounded-l-sm" : r.start < FROM ? "rounded-r-sm" : "rounded-sm"}`}
                  style={{ left: pct(r.start), right: `calc(100% - ${pct(r.end)})` }}
                >
                  {label(r.start)} – {label(r.end)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mt-2 h-5 border-t border-ink/15 text-[0.6875rem] text-ink/60 tabular-nums" aria-hidden="true">
        {[4, 8, 12, 16, 20, 24, 28].map((h) => (
          <span key={h} className={`absolute top-1.5 whitespace-nowrap ${h === FROM ? "" : h === TO ? "-translate-x-full" : "-translate-x-1/2"} ${(h - FROM) % 8 ? "max-sm:hidden" : ""}`} style={{ left: pct(h) }}>
            {label(h)}
          </span>
        ))}
      </div>
      <p className="sr-only">
        Shalimar is open 9 AM to 3 AM Islamabad time, Monday to Saturday.
        {rows.map((r) => ` A 9 to 5 day in ${r.name} is ${label(r.start)} to ${label(r.end)} in Islamabad.`).join("")}
      </p>
    </div>
  );
}
