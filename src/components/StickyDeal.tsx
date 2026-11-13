"use client";

import { useEffect, useState } from "react";
import SaleCountdown from "./SaleCountdown";
import { gutter } from "./styles";
import { sale } from "@/content/site";

// Bar fixed to the bottom of the screen on phones and tablets (hidden on laptops and in phone landscape),
// so the deal is always in thumb reach on the listicle pages. It appears once the headline has scrolled away
// and steps aside while a deal card ([data-deal-card]) is on screen and from the final button down, so it never covers either.
// Rendered hidden on the server; the position check runs on mount and on every scroll/resize (one per frame).
export default function StickyDeal({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const title = document.querySelector("[data-deal-start]");
    const offers = [...document.querySelectorAll("[data-deal-card]")];
    const end = document.querySelector("[data-deal-end]");
    if (!title || offers.length === 0 || !end) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const pastTitle = title.getBoundingClientRect().bottom < 0;
      const offerOnScreen = offers.some((offer) => {
        const o = offer.getBoundingClientRect();
        return o.top < vh && o.bottom > 0;
      });
      const reachedEnd = end.getBoundingClientRect().top < vh;
      setShow(pastTitle && !offerOnScreen && !reachedEnd);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <aside
      aria-label="Deal"
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-transform duration-300 motion-reduce:transition-none lg:hidden short:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className={`mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 ${gutter}`}>
        <p className="min-w-0 text-[0.8125rem] leading-tight">
          <span className="block truncate font-semibold text-ink">Up to {sale.upTo}% off</span>
          <span className="block truncate text-ink/70">
            <SaleCountdown variant="inline" />
          </span>
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-brass px-5 text-[0.8125rem] font-semibold tracking-[0.04em] text-ink uppercase transition-colors hover:bg-brass-light active:scale-[0.98]"
        >
          {label}
        </a>
      </div>
    </aside>
  );
}
