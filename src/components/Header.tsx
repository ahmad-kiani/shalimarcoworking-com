"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/content/site";
import Icon from "./Icon";
import Logo from "./Logo";

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
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

  // Smoked glass throughout: lighter over the hero photo, deeper once scrolled over the page.
  // The open mobile menu uses cream so it matches the menu panel below it.
  const tone = open
    ? "bg-cream text-ink shadow-[0_1px_0_rgb(0_0_0/0.08)]"
    : alwaysSolid || scrolled
      ? "bg-ink/85 text-cream shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md"
      : "bg-black/35 text-cream shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        tone
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        <Link href="/" className="flex min-h-11 items-center" aria-label={`${site.name} ${site.tagline}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center px-4 text-[15px] opacity-85 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden min-h-11 items-center rounded-sm bg-brass px-5 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:bg-brass-light sm:flex"
          >
            Book a tour
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex size-11 items-center justify-center rounded-full lg:hidden ${
              open ? "bg-ink text-cream" : "bg-white/15 text-cream"
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
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center font-serif text-3xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="mt-8 flex min-h-13 items-center justify-center rounded-sm bg-brass text-sm font-semibold tracking-[0.14em] text-ink uppercase"
        >
          Book a tour
        </Link>
        <p className="mt-8 text-sm text-muted">
          <a href={`tel:${site.phoneHref}`} className="block py-2">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="block py-2">{site.email}</a>
        </p>
      </div>
    </header>
  );
}
