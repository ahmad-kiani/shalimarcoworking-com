import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import SectionHeading from "@/components/SectionHeading";
import SpacesCarousel from "@/components/SpacesCarousel";
import { amenities, contact, hero, marquee, membership, nav, site, spaces, why } from "@/content/site";

const container = "mx-auto max-w-7xl px-5 sm:px-8";
const btn =
  "inline-flex min-h-12 items-center justify-center rounded-sm px-7 text-xs font-semibold tracking-[0.16em] uppercase transition-colors active:scale-[0.98]";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        {/* Hero */}
        <section className="jali relative flex min-h-[100dvh] items-center overflow-hidden bg-linear-to-br from-garden-deep via-garden to-ink pt-24 pb-16 text-cream">
          <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-ink/40" aria-hidden="true" />
          <div className={`${container} relative w-full`}>
            <h1 className="max-w-4xl font-serif text-[3.2rem] leading-[1.02] sm:text-7xl lg:text-[6.5rem]">
              {hero.lead[0]}
              <br />
              {hero.lead[1]} <span className="text-brass-light italic">{hero.accent}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85 sm:text-xl">{hero.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href={hero.primary.href} className={`${btn} bg-brass text-ink hover:bg-brass-light`}>
                {hero.primary.label}
              </a>
              <a href={hero.secondary.href} className={`${btn} border border-cream/70 hover:bg-cream hover:text-ink`}>
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden bg-garden py-5 text-cream" aria-label={marquee.join(", ")}>
          <div className="animate-marquee flex w-max" aria-hidden="true">
            {[...marquee, ...marquee].map((text, i) => (
              <span key={i} className="flex items-center font-serif text-2xl whitespace-nowrap italic sm:text-3xl">
                <span className="px-8">{text}</span>
                <span className="text-brass not-italic">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Why */}
        <section id="about" className="py-20 sm:py-28">
          <div className={container}>
            <SectionHeading eyebrow={why.eyebrow} lines={why.title} />
            <ol className="mt-14 grid border-t border-ink/15 md:grid-cols-3">
              {why.points.map((p, i) => (
                <li
                  key={p.title}
                  className="border-b border-ink/15 py-8 md:border-b-0 md:px-8 md:py-10 md:not-first:border-l md:first:pl-0"
                >
                  <span className="font-serif text-4xl text-brass italic">0{i + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Amenities */}
        <section id="amenities" className="bg-ink py-20 text-cream sm:py-28">
          <div className={container}>
            <SectionHeading eyebrow={amenities.eyebrow} lines={amenities.title} dark />
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {amenities.items.map((a) => (
                <li key={a.title} className="rounded-sm bg-ink-card p-6 sm:p-7">
                  <Icon name={a.icon} className="size-7 text-brass" />
                  <h3 className="mt-5 text-sm font-semibold tracking-[0.08em] uppercase">{a.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-cream/70">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Spaces */}
        <section id="spaces" className="overflow-hidden py-20 sm:py-28">
          <div className={container}>
            <SectionHeading eyebrow={spaces.eyebrow} lines={spaces.title} />
            <div className="mt-12">
              <SpacesCarousel />
            </div>
          </div>
        </section>

        {/* Membership */}
        <section id="membership" className="bg-ink-soft py-20 text-cream sm:py-28">
          <div className={container}>
            <SectionHeading eyebrow={membership.eyebrow} lines={membership.title} accent={membership.accent} dark />
            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {membership.plans.map((plan) => (
                <li
                  key={plan.name}
                  className={`relative flex flex-col rounded-sm p-7 ${
                    plan.featured ? "bg-ink-card ring-2 ring-brass" : "bg-ink-card/70 ring-1 ring-cream/10"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 right-6 rounded-sm bg-brass px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-ink uppercase">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-serif text-3xl">{plan.name}</h3>
                  <p className="mt-3 min-h-12 text-[15px] leading-relaxed text-cream/70">{plan.body}</p>
                  <p className="mt-6 text-xs text-cream/60">{plan.from ? "Starting from" : " "}</p>
                  <p className="mt-1 flex items-baseline gap-1.5 border-b border-cream/10 pb-6">
                    <span className="text-sm text-cream/70">PKR</span>
                    <span className="text-3xl font-light">{plan.price}</span>
                    <span className="text-sm text-cream/60">/ {plan.unit}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-[15px] text-cream/85">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-brass" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`${btn} mt-8 ${
                      plan.featured ? "bg-brass text-ink hover:bg-brass-light" : "border border-cream/40 hover:bg-cream hover:text-ink"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-cream/60">{membership.note}</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-ink py-20 text-cream sm:py-28">
          <div className={`${container} grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20`}>
            <div>
              <p className="flex items-center gap-4 text-xs font-medium tracking-[0.3em] text-brass uppercase">
                <span className="h-px w-8 bg-brass" aria-hidden="true" />
                {contact.eyebrow}
              </p>
              <h2 className="mt-6 font-serif text-[2.6rem] leading-[1.05] sm:text-5xl">{contact.title}</h2>
              <dl className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Address</dt>
                  <dd className="mt-2 leading-relaxed">
                    {site.address[0]}
                    <br />
                    <span className="text-cream/60">{site.address[1]}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Hours</dt>
                  <dd className="mt-2 leading-relaxed">
                    {site.hours.label}
                    <br />
                    <span className="text-cream/60">{site.hours.days}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all underline-offset-4 hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.2em] text-brass uppercase">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${site.phoneHref}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-[calc(2rem+env(safe-area-inset-bottom))] text-cream">
        <div className={container}>
          <div className="flex border-t border-cream/10 pt-12 flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <Logo large />
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-12 sm:grid-cols-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="flex min-h-11 items-center text-cream/75 hover:text-cream">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="-mx-2 flex gap-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="flex min-h-11 items-center px-2 text-sm text-cream/75 hover:text-cream">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 border-t border-cream/10 pt-6 text-sm text-cream/50">
            © 2026 {site.name} {site.tagline}
          </p>
        </div>
      </footer>
    </>
  );
}
