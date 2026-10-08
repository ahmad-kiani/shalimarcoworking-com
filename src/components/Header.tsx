"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import Icon from "./Icon";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? "bg-cream/95 text-ink shadow-[0_1px_0_rgb(0_0_0/0.08)] backdrop-blur" : "text-cream"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        <a href="#top" className="flex min-h-11 items-center" aria-label={`${site.name} ${site.tagline}, back to top`}>
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-11 items-center px-4 text-[15px] opacity-85 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden min-h-11 items-center rounded-sm bg-brass px-5 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-brass-light sm:flex"
          >
            Book a tour
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex size-11 items-center justify-center rounded-full lg:hidden ${
              solid ? "bg-ink text-cream" : "bg-white/15 text-cream backdrop-blur"
            }`}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-cream px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-8 lg:hidden"
      >
        <ul className="divide-y divide-ink/10 border-b border-ink/10">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center font-serif text-3xl"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-8 flex min-h-13 items-center justify-center rounded-sm bg-brass text-sm font-semibold tracking-[0.14em] text-ink uppercase"
        >
          Book a tour
        </a>
        <p className="mt-8 text-sm text-muted">
          <a href={`tel:${site.phoneHref}`} className="block py-2">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="block py-2">{site.email}</a>
        </p>
      </div>
    </header>
  );
}
