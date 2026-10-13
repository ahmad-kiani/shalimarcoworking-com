"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site, tourLink } from "@/content/site";
import Icon from "./Icon";
import Logo from "./Logo";

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  // The hero has its own Book a tour button, so the header one waits until the hero is scrolled past.
  const [pastHero, setPastHero] = useState(alwaysSolid);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!alwaysSolid) setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = alwaysSolid || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? "bg-cream/95 text-ink shadow-[0_1px_0_rgb(0_0_0/0.08)] backdrop-blur" : "text-cream"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:h-20">
        <Link href="/" className="flex min-h-11 items-center" aria-label={`${site.name} ${site.tagline}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center px-3 text-[0.9375rem] xl:px-4 opacity-85 transition-opacity hover:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={tourLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden min-h-11 items-center rounded-sm bg-brass px-5 text-xs font-semibold tracking-[0.14em] text-ink uppercase transition-[background-color,opacity,visibility] duration-300 hover:bg-brass-light sm:flex ${
              pastHero ? "visible opacity-100" : "invisible opacity-0"
            }`}
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
        <ul className="divide-y divide-ink/10 border-b border-ink/10 short:grid short:grid-cols-2 short:gap-x-8 short:divide-y-0 short:border-b-0">
          {nav.map((item) => (
            <li key={item.href} className="short:border-b short:border-ink/10">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center font-serif text-3xl short:min-h-14 short:text-2xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={tourLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-8 flex min-h-13 items-center short:mt-5 justify-center rounded-sm bg-brass text-sm font-semibold tracking-[0.14em] text-ink uppercase"
        >
          Book a tour
        </a>
        <p className="mt-8 text-sm text-muted">
          <a href={`tel:${site.phoneHref}`} className="flex min-h-11 items-center">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="flex min-h-11 items-center">{site.email}</a>
        </p>
      </div>
    </header>
  );
}
