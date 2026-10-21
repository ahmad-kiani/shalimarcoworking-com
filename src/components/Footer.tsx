import { legal, nav, site } from "@/content/site";
import Link from "next/link";
import Logo from "./Logo";
import { gutter } from "./styles";

export default function Footer() {
  return (
    <footer className="bg-ink pb-[calc(6rem+env(safe-area-inset-bottom))] text-cream lg:pb-[calc(2rem+env(safe-area-inset-bottom))]">
      <div className={`mx-auto max-w-7xl ${gutter}`}>
        <div className="grid gap-8 border-t border-cream/10 pt-8 sm:grid-cols-[1fr_auto] sm:pt-12 sm:gap-x-12 lg:grid-cols-[1fr_auto_auto] lg:gap-x-20">
          <Link href="/" aria-label={`${site.name} ${site.tagline}, home`} className="w-max sm:col-span-2 lg:col-span-1">
            <Logo large />
          </Link>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 min-[480px]:grid-cols-3 sm:gap-x-12">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-cream/75 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-cream/75 lg:text-sm">
            <a href={`tel:${site.phoneHref}`} className="flex min-h-11 items-center hover:text-cream">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center hover:text-cream">
              {site.email}
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-4 text-sm text-cream/50 lg:flex-row lg:items-center lg:justify-between lg:pr-20 lg:[@media(min-height:44rem)]:pr-0">
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
