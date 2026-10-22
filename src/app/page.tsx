import AmenitiesGrid from "@/components/AmenitiesGrid";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroVideo from "@/components/HeroVideo";
import Pricing from "@/components/Pricing";
import Icon from "@/components/Icon";
import LocationMap from "@/components/LocationMap";
import Mark from "@/components/Mark";
import MotionToggle from "@/components/MotionToggle";
import ScrollArea from "@/components/ScrollArea";
import SpacesGrid from "@/components/SpacesGrid";
import { btn, gutter } from "@/components/styles";
import { amenities, contact, hero, location, marquee, site, spaces, why } from "@/content/site";

const container = `mx-auto max-w-7xl ${gutter}`;
const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;

export default function Home() {
  return (
    <>
      <Header />
      <main id="content" tabIndex={-1} className="outline-none">
        {/* Hero */}
        <section className="jali relative flex min-h-[100dvh] items-center overflow-hidden bg-linear-to-br from-garden-deep via-garden to-ink pt-24 pb-16 max-sm:portrait:pb-24 squat:pt-20 short:pt-20 short:pb-10 shorter:pt-[4.25rem] shorter:pb-4 text-cream">
          <HeroVideo />
          {/* Darken the video evenly behind the text. */}
          <div className="absolute inset-0 bg-ink/55 max-sm:portrait:hidden" aria-hidden="true" />
          <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-ink/40 max-sm:portrait:hidden" aria-hidden="true" />
          {/* Phones held upright: the still is already dark, so the lamps under the header stay bright and the band
              behind the text (where the sign glows softly) is darkened. */}
          <MotionToggle />
          <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgb(29_33_31/0.5)_0%,rgb(29_33_31/0.15)_16%,rgb(29_33_31/0.6)_28%,rgb(29_33_31/0.6)_76%,rgb(29_33_31/0.1)_84%,rgb(29_33_31/0.3)_100%)] max-sm:portrait:block" aria-hidden="true" />
          <div className={`${container} relative w-full`}>
            {/* On laptops the headline also shrinks with the window height, so short screens (e.g. 150% scaling) keep room around it. */}
            <h1 className="max-w-4xl font-serif text-[2.6rem] leading-[1.02] min-[360px]:text-[3.2rem] sm:text-7xl lg:text-[clamp(4rem,12.5svh,6.5rem)] short:text-5xl! shorter:text-4xl!">
              {hero.lead[0]}
              <br />
              {hero.lead[1]} <span className="text-brass-light italic">{hero.accent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed min-[360px]:mt-8 min-[360px]:text-lg text-cream/85 sm:text-xl short:mt-4! short:max-w-[30rem] short:text-base! shorter:mt-2! shorter:max-w-none shorter:text-[0.9375rem]! shorter:leading-normal">{hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 min-[360px]:mt-10 min-[30rem]:flex-row min-[30rem]:gap-4 squat:mt-6! short:mt-6! short:flex-row shorter:mt-3!">
              <a
                href={hero.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn} bg-brass text-ink hover:bg-brass-light`}
              >
                {hero.primary.label}
              </a>
              <a href={hero.secondary.href} className={`${btn} border border-cream/70 hover:bg-cream hover:text-ink`}>
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <ScrollArea
          label="Highlights"
          region
          className="overflow-hidden bg-sand py-5 text-garden max-sm:portrait:overflow-x-auto max-sm:portrait:overscroll-x-contain max-sm:portrait:[scrollbar-width:none] max-sm:portrait:[&::-webkit-scrollbar]:hidden"
        >
          <p className="sr-only">{marquee.join(", ")}</p>
          <div className="animate-marquee flex w-max hover:[animation-play-state:paused]" aria-hidden="true">
            {/* Four copies: the strip slides by half, which must stay wider than the widest screen. */}
            {[...marquee, ...marquee, ...marquee, ...marquee].map((text, i) => (
              <span
                key={i}
                // Upright phones show one set to swipe through; the copies only exist to loop the animation.
                className={`flex items-center font-serif text-2xl whitespace-nowrap italic sm:text-3xl ${i >= marquee.length ? "max-sm:portrait:hidden" : ""}`}
              >
                <span className="px-8">{text}</span>
                <Mark className="h-6 w-auto shrink-0 text-brass-dark sm:h-7" />
              </span>
            ))}
          </div>
        </ScrollArea>

        {/* Why */}
        <section id="about" className="py-20 sm:py-28 short:py-14">
          <div className={container}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-brass-dark uppercase">
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
                {why.eyebrow}
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
              </p>
              <h2 className="mt-5 font-serif text-[2.25rem] leading-[1.05] min-[360px]:text-[2.6rem] sm:text-5xl lg:text-[4rem]">
                {why.title[0]} {why.title[1]} <span className="text-brass-dark italic">{why.title[2]}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">{why.intro}</p>
            </div>
            {/* Phones: one centred column under the centred header. From md: three columns whose titles and bodies
                line up across columns (subgrid), with no space held for titles that don't wrap. */}
            <ul className="mx-auto mt-12 grid max-w-md gap-9 text-center sm:mt-16 md:max-w-none md:grid-cols-3 md:grid-rows-[auto_auto_1fr] md:gap-0 md:text-left">
              {why.points.map((p) => (
                <li key={p.title} className="md:row-span-3 md:grid md:grid-rows-subgrid md:gap-y-0 md:px-6 lg:px-10 md:first:pl-0 md:last:pr-0 md:not-first:border-l md:not-first:border-ink/12">
                  <Icon name={p.icon} className="mx-auto size-7 text-brass-dark md:mx-0" />
                  <h3 className="mt-4 font-serif text-[1.6rem] leading-tight sm:mt-5 sm:text-[1.85rem] md:text-[1.6rem] lg:text-[1.85rem]">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" className="bg-ink py-20 text-cream sm:py-28 short:py-14">
          <div className={container}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-brass-light uppercase">
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
                {amenities.eyebrow}
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
              </p>
              <h2 className="mt-5 font-serif text-[2.25rem] leading-[1.05] min-[360px]:text-[2.6rem] sm:text-5xl lg:text-[4rem]">
                {amenities.title[0]} <span className="text-brass italic">{amenities.title[1]}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-cream/70">{amenities.intro}</p>
            </div>
            <AmenitiesGrid items={amenities.items} />
          </div>
        </section>

        {/* Spaces */}
        <section id="spaces" className="overflow-hidden py-20 sm:py-28 short:py-14">
          <div className={container}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-brass-dark uppercase">
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
                {spaces.eyebrow}
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
              </p>
              <h2 className="mt-5 font-serif text-[2.25rem] leading-[1.05] min-[360px]:text-[2.6rem] sm:text-5xl lg:text-[4rem]">
                {spaces.title[0]} <span className="text-brass-dark italic">{spaces.title[1]}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted">{spaces.intro}</p>
            </div>
            <div className="mt-10">
              <SpacesGrid />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-ink py-20 text-cream sm:py-28 short:py-14">
          <Pricing />
        </section>

        {/* Location */}
        <section id="location" className="py-20 sm:py-28 short:py-14">
          <div className={container}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="flex items-center justify-center gap-4 text-xs font-medium tracking-[0.3em] text-brass-dark uppercase">
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
                {location.eyebrow}
                <span className="h-px w-7 bg-brass" aria-hidden="true" />
              </p>
              <h2 className="mt-5 font-serif text-[2.25rem] leading-[1.05] min-[360px]:text-[2.6rem] sm:text-5xl lg:text-[4rem]">
                {location.title[0]} <span className="text-brass-dark italic">{location.title[1]}</span>
              </h2>
            </div>
            <div className="mt-12 grid overflow-hidden rounded-sm bg-[#f2ebdf] lg:grid-cols-[5fr_7fr] xl:grid-cols-[4fr_8fr]">
              <div className="flex flex-col gap-8 p-6 min-[375px]:p-7 sm:p-10 lg:justify-center">
                <div>
                  <p className="leading-relaxed text-ink/80">{location.body}</p>
                  <address className="mt-6 text-base leading-relaxed text-balance not-italic min-[375px]:text-lg">
                    {site.address[0]}
                    <br />
                    {site.address[1]}
                  </address>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <a
                    href={directionsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btn} bg-brass text-ink hover:bg-brass-light`}
                  >
                    Get directions
                  </a>
                  <a href={`tel:${site.phoneHref}`} className={`${btn} gap-2 border border-ink/30 whitespace-nowrap max-[359px]:px-5 hover:bg-ink hover:text-cream`}>
                    <Icon name="phone" className="size-4" />
                    {site.phone}
                  </a>
                </div>
              </div>
              <LocationMap />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-ink py-20 text-cream sm:py-28 short:py-14">
          <div className={`${container} grid gap-10 sm:gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20`}>
            <div>
              <p className="flex items-center gap-4 text-xs font-medium tracking-[0.3em] text-brass uppercase">
                <span className="h-px w-8 bg-brass" aria-hidden="true" />
                {contact.eyebrow}
              </p>
              <h2 className="mt-6 font-serif text-[2.25rem] leading-[1.05] min-[360px]:text-[2.6rem] sm:text-5xl">{contact.title}</h2>
              <p className="mt-6 text-cream/70">{contact.visit}</p>
              <ul className="mt-8 grid gap-5 sm:mt-10 sm:gap-7">
                {[
                  {
                    icon: "pin",
                    label: "Address",
                    value: site.address[0],
                    sub: site.address[1],
                    link: { label: "Get directions", href: directionsLink, external: true },
                  },
                  { icon: "clock", label: "Hours", value: site.hours[0], sub: site.hours[1] },
                  { icon: "phone", label: "Phone", value: site.phone, link: { label: "Call us", href: `tel:${site.phoneHref}` } },
                  { icon: "mail", label: "Email", value: site.email, link: { label: "Email us", href: `mailto:${site.email}` } },
                ].map((d) => (
                  <li key={d.label} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brass/12 text-brass">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">{d.label}</p>
                      <p className="mt-1.5 leading-relaxed [overflow-wrap:anywhere] max-[359px]:text-[0.9375rem]">{d.value}</p>
                      {d.sub && <p className="text-cream/60">{d.sub}</p>}
                      {d.link && (
                        <a
                          href={d.link.href}
                          {...(d.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-1 -mb-2 inline-flex min-h-11 items-center gap-1.5 text-sm text-brass-light underline-offset-4 hover:underline"
                        >
                          {d.link.label}
                          <Icon name="arrowRight" className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
