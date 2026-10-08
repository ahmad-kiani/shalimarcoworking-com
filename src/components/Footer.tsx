import { legal, nav, site } from "@/content/site";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink pb-[calc(2rem+env(safe-area-inset-bottom))] text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 border-t border-cream/10 pt-12 md:flex-row md:items-start md:justify-between">
          <Link href="/" aria-label={`${site.name} ${site.tagline}, home`}>
            <Logo large />
          </Link>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 sm:grid-cols-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-cream/75 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm text-cream/75">
            <a href={`tel:${site.phoneHref}`} className="flex min-h-11 items-center hover:text-cream">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center hover:text-cream">
              {site.email}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-4 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="py-2">
            © 2026 {site.name} {site.tagline} · ATS Centre, Blue Area, Islamabad
          </p>
          <ul className="-mx-2 flex flex-wrap">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center px-2 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
