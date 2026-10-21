"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav, site, tourLink } from "@/content/site";
import Icon from "./Icon";
import { gutter } from "./styles";
import Logo from "./Logo";

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  // The hero has its own Book a tour button, so the header one waits until the hero is scrolled past.
  const [pastHero, setPastHero] = useState(alwaysSolid);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (!alwaysSolid) setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysSolid]);

  // While the mobile menu is open: lock page scroll, make the page behind it unreachable by Tab
  // (inert on main, footer and the WhatsApp button only, so Next's route announcer keeps working),
  // close on Escape, and close if the window grows to the desktop layout (e.g. a tablet rotated).
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const behind = [...document.querySelectorAll<HTMLElement>("body > main, body > footer, #whatsapp-button")];
    behind.forEach((el) => (el.inert = true));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const solid = alwaysSolid || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        // Fully opaque while the menu is open, so the bar matches the menu panel below it.
        open ? "bg-cream text-ink" : solid ? "bg-cream/95 text-ink shadow-[0_1px_0_rgb(0_0_0/0.08)] backdrop-blur" : "text-cream"
      }`}
    >
      <div className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 ${gutter} lg:h-20`}>
        <Link href="/" className="flex min-h-11 items-center" aria-label={`${site.name} ${site.tagline}, home`}>
          <Logo />
        </Link>

        {/* Centred on the bar: the hidden "Book a tour" button would otherwise push it left. */}
        <nav aria-label="Main" className="hidden lg:absolute lg:left-1/2 lg:block lg:-translate-x-1/2">
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
            ref={toggle}
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
        className={`h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto overscroll-contain bg-cream ${gutter} pb-[calc(2rem+env(safe-area-inset-bottom))] lg:hidden`}
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
