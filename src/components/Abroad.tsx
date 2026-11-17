import Image from "next/image";
import SaleCountdown from "./SaleCountdown";
import { ClockCard, HoursTimeline } from "./WorldClock";
import { gutter } from "./styles";
import { noWidow, pill, Rich } from "./Listicle";
import { Closing, display, eyebrow, Faq, MemberReviews, Title } from "./Reasons";
import { sale } from "@/content/site";
import { lpLinks } from "@/content/landing";
import AbroadPrices from "./AbroadPrices";
import { bestDeal, type ReasonsPage } from "@/content/reasons";

// The "clients abroad" page (LS4): same content model and colours as the reasons pages, its own layout.
// A dark hero over the lit Shalimar sign with live clocks for Islamabad, London, Dubai and New York; a timeline of
// their working day against Shalimar's hours; the reasons as a bento of photo cards; a dark full-width member quote;
// prices with a USD / PKR switch then the same review cards as LS2, FAQ and the closing call to visit.

const wide = `mx-auto max-w-[72rem] ${gutter}`;
const pad = (n: number) => String(n).padStart(2, "0");
const h2 = `${display} text-[1.75rem] leading-[1.1] text-ink uppercase sm:text-[2.5rem]`;

export function AbroadArticle({ page, deal }: { page: ReasonsPage; deal: string }) {
  const [first, ...rest] = page.reasons;
  return (
    <article className="bg-cream">
      {/* Hero */}
      <header data-deal-start className="relative isolate overflow-hidden bg-ink text-cream">
        <Image src={page.meta.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/80 to-ink" aria-hidden="true" />
        <div className={`${wide} grid gap-10 pt-12 pb-14 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:gap-16`}>
          <div>
            <p className={`${eyebrow} flex items-center gap-3 text-brass-light`}>
              <span className="h-px w-8 bg-brass-light max-sm:hidden" aria-hidden="true" />
              {page.eyebrow}
            </p>
            <h1
              className={`${display} mt-4 text-[clamp(1.375rem,calc((100vw-2.5rem)/12.6),2.125rem)] leading-[1.12] text-balance text-cream sm:mt-5 sm:text-[2.5rem] lg:text-[2.875rem]`}
            >
              <Title text={page.title} phoneLines={page.titlePhoneLines} />
            </h1>
            <p className="mt-4 max-w-[36rem] text-[0.9375rem] leading-[1.65] text-cream/75 sm:mt-5 sm:text-[1.0625rem]">{page.intro}</p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a href={deal} target="_blank" rel="noopener noreferrer" className={`${pill} sm:w-auto`}>
                {page.offer.cta}
              </a>
              <a
                href="#hours"
                className="inline-flex min-h-11 items-center justify-center gap-2 text-[0.8125rem] font-semibold tracking-[0.08em] text-cream uppercase underline-offset-4 hover:underline"
              >
                See the hours <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>
          <ClockCard />
        </div>
      </header>

      {/* Hours */}
      <section id="hours" aria-labelledby="hours-title" className={`${wide} scroll-mt-16 pt-14 sm:pt-20`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center lg:gap-14">
          <div>
            <p className={`${eyebrow} text-brass-dark`}>{first.tag}</p>
            <h2 id="hours-title" className={`${h2} mt-2`}>
              {first.title}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-ink/80 sm:text-base">
              <Rich text={first.body} />
            </p>
          </div>
          <div className="rounded-md border border-ink/10 bg-white px-4 pt-7 pb-4 sm:px-7 sm:pt-8 sm:pb-5">
            <HoursTimeline />
            <p className="mt-3 text-[0.75rem] text-ink/60">All times in Islamabad time. The shaded area is when Shalimar is open.</p>
          </div>
        </div>
      </section>

      {/* The other reasons, as photo cards: the first full width, then two by two */}
      <section aria-labelledby="reasons-title" className={`${wide} pt-16 sm:pt-24`}>
        <h2 id="reasons-title" className={`${h2} text-center`}>
          And {rest.length} More Reasons
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-2 sm:mt-10">
          {rest.map((r, i) => {
            const full = i === 0 || i === rest.length - 1;
            const flip = full && i !== 0;
            return (
              <li
                key={r.title}
                className={`overflow-hidden rounded-md border border-ink/10 bg-white ${full ? `md:col-span-2 md:grid ${flip ? "md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" : "md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"}` : "flex flex-col"}`}
              >
                <div className={`relative ${full ? "aspect-[16/10] md:aspect-auto md:min-h-[20rem]" : "aspect-[16/10]"} ${flip ? "md:order-2" : ""}`}>
                  <Image
                    src={r.visual.src}
                    alt={r.visual.alt}
                    fill
                    sizes={full ? "(min-width: 72rem) 38rem, (min-width: 48rem) 53vw, 100vw" : "(min-width: 72rem) 34rem, (min-width: 48rem) 48vw, 100vw"}
                    className="object-cover"
                    style={r.visual.position ? { objectPosition: r.visual.position } : undefined}
                  />
                </div>
                <div className={`p-6 sm:p-8 ${full ? "md:self-center md:p-10" : ""}`}>
                  <p className="flex items-baseline gap-3">
                    <span className={`${display} text-[2rem] leading-none text-brass`} aria-hidden="true">
                      {pad(i + 2)}
                    </span>
                    <span className={`${eyebrow} text-brass-dark`}>{r.tag}</span>
                  </p>
                  <h3 className={`${display} mt-3 text-[1.25rem] leading-[1.15] text-ink uppercase sm:text-[1.5rem]`}>{r.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink/80">
                    <Rich text={r.body} />
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Member quote, full width on dark */}
      <figure className="mt-16 bg-ink px-5 py-14 text-center text-cream sm:mt-24 sm:py-20">
        <span className="tracking-[0.3em] text-brass" role="img" aria-label="5 out of 5 stars">
          ★★★★★
        </span>
        <blockquote className={`${display} mx-auto mt-5 max-w-[46rem] text-[1.25rem] leading-[1.45] sm:text-[1.875rem] sm:leading-[1.4]`}>
          &ldquo;{noWidow(page.callout.quote)}&rdquo;
        </blockquote>
        <figcaption className="mt-6 text-[0.8125rem] font-bold tracking-[0.14em] text-brass-light uppercase">&mdash; {page.callout.name}</figcaption>
      </figure>

      <Prices page={page} />
      <MemberReviews page={page} />
      <div className="pt-4">
        <Faq faq={page.faq} />
      </div>
      <Closing closing={page.closing} cta={page.offer.cta} deal={deal} />
    </article>
  );
}

// The plans: a USD / PKR switch and three cards (AbroadPrices), then the countdown, chips and a tour link.
function Prices({ page }: { page: ReasonsPage }) {
  const links = lpLinks(page.code);
  return (
    <section id="offer" aria-labelledby="offer-title" className={`${wide} scroll-mt-[-2rem] py-16 sm:py-24`}>
      <div data-deal-card>
        <div className="text-center">
          <p className={`${eyebrow} flex items-center justify-center gap-3 text-ink/70`}>
            <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
            {sale.name}
            <span className="h-px w-8 bg-ink/20" aria-hidden="true" />
          </p>
          <h2 id="offer-title" className={`${h2} mt-3`}>
            Up to {sale.upTo}% off, in dollars or rupees
          </h2>
          <p className="mx-auto mt-3 max-w-[34rem] text-[0.9375rem] text-ink/75 sm:text-base">{page.offer.body}</p>
        </div>
        <AbroadPrices code={page.code} />
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-[0.875rem] text-ink/80">
            Deal ending in:{" "}
            <span className="text-base font-semibold text-ink">
              <SaleCountdown variant="inline" />
            </span>
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {page.offer.chips.map((c) => (
              <li key={c} className="rounded-sm bg-sand px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.1em] text-ink uppercase">
                {c}
              </li>
            ))}
          </ul>
          <a
            href={links.tour}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-[0.875rem] font-semibold text-ink underline underline-offset-4 hover:text-brass-dark"
          >
            Not sure yet? Book a free tour first
          </a>
          <p className="max-w-[36rem] text-[0.8125rem] leading-snug text-ink/70 italic">
            Up to {bestDeal.off}% off is a {bestDeal.name} seat paid annually: {bestDeal.nowText} a month, was {bestDeal.wasText}.
          </p>
        </div>
      </div>
    </section>
  );
}
