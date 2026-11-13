"use client";

import { useEffect, useRef, useState } from "react";
import { chatLink } from "@/content/site";

// Official WhatsApp glyph (Simple Icons, CC0) in WhatsApp's brand green.
// Says hello once per visit: on the first page view of a session it opens into a "Chat with us" pill for a few
// seconds, tucks back into the round icon, then gives two soft pulses and stays still. Hover or keyboard focus
// brings the label back. With reduced motion it opens and closes without animating and skips the pulses.
// Always visible. Where the footer is short (laptops) the button rides up and parks just above it instead of
// covering it; on phones and tablets, where the footer is tall, it keeps its corner over the footer's
// reserved bottom space.
export default function WhatsAppButton() {
  const href = chatLink;
  const button = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Hidden on this page (e.g. listicle pages on phones): skip the hello so it still greets on the next page.
    if (button.current && getComputedStyle(button.current).display === "none") return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("wa-hello") === "1";
      sessionStorage.setItem("wa-hello", "1");
    } catch {
      // storage blocked (private mode etc.): greet anyway
    }
    if (seen) return;
    const timers = [
      setTimeout(() => setOpen(true), 600),
      setTimeout(() => setOpen(false), 4600),
      setTimeout(() => setPulse(true), 5200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = button.current;
    const footer = document.querySelector<HTMLElement>("body > footer");
    if (!el || !footer) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const bottomOffset = parseFloat(getComputedStyle(el).bottom) || 0;
      // Park only if the parked button would still sit in the lower half of the screen; on phones the footer
      // is nearly screen-tall, so parking would lift the button up by the header, which looks stray.
      const fits = footer.offsetHeight + el.offsetHeight + bottomOffset + 16 <= window.innerHeight / 2;
      const gap = window.innerHeight - footer.getBoundingClientRect().top;
      const lift = fits ? Math.min(Math.max(gap, 0), footer.offsetHeight) : 0;
      // Written straight to the element (no re-render); translate is a separate property from the hover scale.
      el.style.translate = lift ? `0 ${-lift}px` : "";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
    };
  }, []);

  // Wrapped in a landmark so screen-reader users can find it like the rest of the page.
  return (
    <aside aria-label="WhatsApp chat">
      <a
        ref={button}
        id="whatsapp-button"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        className={`group fixed right-[calc(1.25rem+env(safe-area-inset-right))] bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 flex h-14 min-w-14 items-center justify-end rounded-full bg-[#25D366] text-ink shadow-[0_6px_20px_rgb(0_0_0/0.25)] transition-[opacity,scale] duration-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:border-2 before:border-[#25D366] before:opacity-0 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink focus-visible:ring-2 focus-visible:ring-cream active:scale-95 motion-reduce:transition-none motion-reduce:before:hidden sm:right-[calc(1.75rem+env(safe-area-inset-right))] sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] short:h-12 short:min-w-12 ${
          pulse ? "before:animate-[wa-ring_1.8s_ease-out_2]" : ""
        }`}
      >
        <span
          aria-hidden="true"
          className={`overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:max-w-40 group-hover:pl-5 group-focus-visible:max-w-40 group-focus-visible:pl-5 motion-reduce:transition-none ${
            open ? "max-w-40 pl-5" : "max-w-0 pl-0"
          }`}
        >
          Chat with us
        </span>
        <span className="grid size-14 shrink-0 place-items-center short:size-12">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </span>
      </a>
    </aside>
  );
}
