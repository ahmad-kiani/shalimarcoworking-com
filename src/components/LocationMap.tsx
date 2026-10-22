"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { site } from "@/content/site";
import Icon from "./Icon";

// Google's embed is heavy, so:
// 1. the browser opens its connections to Google as soon as the page loads,
// 2. the map starts loading on the visitor's first scroll (or when it nears the screen),
// 3. a branded placeholder sits underneath until the map has loaded, then the map fades in.
export default function LocationMap() {
  preconnect("https://www.google.com");
  preconnect("https://maps.googleapis.com");
  preconnect("https://maps.gstatic.com", { crossOrigin: "anonymous" });

  const box = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (start) return;
    const go = () => setStart(true);
    window.addEventListener("scroll", go, { once: true, passive: true });
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && go(), {
      rootMargin: "1500px 0px",
    });
    if (box.current) io.observe(box.current);
    return () => {
      window.removeEventListener("scroll", go);
      io.disconnect();
    };
  }, [start]);

  return (
    <div ref={box} className="relative h-80 w-full bg-sand sm:h-96 lg:h-full lg:min-h-[28rem]">
      <div
        aria-hidden={loaded}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-brass/15 text-brass-dark">
          <Icon name="pin" className="size-7" />
        </span>
        <p className="font-serif text-2xl">{site.mapQuery.split(",")[0]}</p>
        <p className="text-sm text-ink/75">{site.address[1]}</p>
        {!loaded && <p className="mt-2 text-xs tracking-[0.2em] text-ink/75 uppercase">Loading map…</p>}
      </div>
      {start && (
        <iframe
          title={`Map showing ${site.mapQuery}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 size-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
