import Image from "next/image";
import Icon from "./Icon";
import Mark from "./Mark";
import SaleCountdown from "./SaleCountdown";
import { gutter } from "./styles";
import { noWidow, pill, Rich } from "./Listicle";
import { pricing, sale } from "@/content/site";
import { seatsLeft } from "@/content/listicles";
import { lpLinks } from "@/content/landing";
import { bestDeal, type ReasonsPage, type Visual } from "@/content/reasons";

// The "reasons" page (/pages/<slug>, content in src/content/reasons.ts): a narrow numbered article in
// the spirit of NOBL's lp-006 advertorial, in Shalimar's colours (as on shalimarcoworking.com): cream page,
// near-black ink for structure, brass for the buttons, labels and the discount.

const col = `mx-auto max-w-[52rem] ${gutter}`;
const wide = `mx-auto max-w-[60rem] ${gutter}`;
// Montserrat 600 (the only weight loaded): headings, eyebrows and the big numbers.
export const display = "font-(family-name:--font-montserrat) font-semibold tracking-[-0.01em]";
export const eyebrow = "text-[0.75rem] font-semibold tracking-[0.18em] uppercase";
const pad = (n: number) => String(n).padStart(2, "0");
const kpr = (n: number) => `PKR ${n.toLocaleString("en-US")}`;
// Private offices are priced per seat.
const perSeat = (p: { leftUnit: string }) => (p.leftUnit === "office" ? " a seat" : "");

export function ReasonsArticle({ page, deal }: { page: ReasonsPage; deal: string }) {
  return (
    <article className="bg-cream">
      <header data-deal-start className="border-b border-ink/10 bg-sand/45">
        <div className={`mx-auto max-w-[72rem] ${gutter} pt-9 pb-11 text-left sm:pt-16 sm:pb-16 sm:text-center`}>
          <p className={`${eyebrow} flex items-center gap-3 text-brass-dark sm:justify-center`}>
            <span className="h-px w-8 bg-brass max-sm:hidden" aria-hidden="true" />
            {page.eyebrow}
            <span className="h-px w-8 bg-brass max-sm:hidden" aria-hidden="true" />
          </p>
          <h1 className={`${display} mx-auto mt-4 text-[clamp(1.375rem,calc((100vw-2.5rem)/12.6),2.125rem)] leading-[1.12] text-balance text-ink sm:mt-5 sm:max-w-[40rem] sm:max-lg:text-wrap! sm:text-[2.5rem] lg:max-w-none lg:text-[2.75rem]`}>
            <Title text={page.title} breakAfter={page.titleBreakAfter} phoneLines={page.titlePhoneLines} />
          </h1>
          <p className="mx-auto mt-4 max-w-[38rem] text-[0.9375rem] leading-[1.6] text-ink/75 sm:mt-5 sm:text-[1.0625rem] sm:leading-relaxed">{page.intro}</p>
          <QuoteCallout {...page.callout} />
        </div>
      </header>

      <Compare page={page} />

      <ol className={`${col} mt-14 space-y-12 sm:mt-20 sm:space-y-14`}>
        {page.reasons.map((r, i) => (
          <li key={r.title} className="grid items-center gap-5 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10 short:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] short:gap-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm md:aspect-square short:aspect-[4/3]">
              <ReasonVisual visual={r.visual} />
            </div>
            <div>
              <p className={`${eyebrow} text-brass-dark tabular-nums`}>
                <span aria-hidden="true">{pad(i + 1)} / </span>
                {r.tag}
              </p>
              <h2 className={`${display} mt-2 text-[1.375rem] leading-[1.15] text-ink uppercase sm:text-[1.625rem] lg:text-[1.75rem]`}>{r.title}</h2>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink/80 sm:text-base">
                <Rich text={r.body} />
              </p>
            </div>
          </li>
        ))}
      </ol>

      <OfferPanel page={page} deal={deal} />
      <MemberReviews page={page} />
      <PlansLeft page={page} />
      <Faq faq={page.faq} />
      <Closing closing={page.closing} cta={page.offer.cta} deal={deal} />
    </article>
  );
}

// The title. On phones, when `phoneLines` is given, it is set on exactly those lines (the heading's size scales
// with the screen so the longest fits). On laptops, when `breakAfter` is given, it is set as two whole lines.
// Tablets, and anything not given, wrap naturally.
export function Title({ text, breakAfter, phoneLines }: { text: string; breakAfter?: string; phoneLines?: string[] }) {
  const at = breakAfter ? text.indexOf(breakAfter) : -1;
  const cut = at < 0 ? -1 : at + breakAfter!.length;
  const wide =
    cut < 0 ? (
      text
    ) : (
      <>
        <span className="lg:block lg:whitespace-nowrap">{text.slice(0, cut)}</span>{" "}
        <span className="lg:block lg:whitespace-nowrap">{text.slice(cut).trim()}</span>
      </>
    );
  if (!phoneLines || phoneLines.join(" ") !== text) return wide;
  return (
    <>
      <span className="sm:hidden">
        {phoneLines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
      <span className="max-sm:hidden">{wide}</span>
    </>
  );
}

function QuoteCallout({ quote, name }: { quote: string; name: string }) {
  return (
    <figure className="relative mx-auto mt-10 max-w-[39rem] border border-brass px-5 pt-8 pb-6 sm:mt-12 sm:px-10 sm:pt-9 sm:pb-7">
      <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 border border-brass/35" />
      <span
        className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1 bg-[#efe8dc] px-3 text-brass"
        role="img"
        aria-label="5 out of 5 stars"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="size-3.5 fill-current" aria-hidden="true">
            <path d="M10 1.5l2.6 5.5 6 .7-4.5 4.1 1.2 5.9L10 14.8l-5.3 2.9 1.2-5.9L1.4 7.7l6-.7z" />
          </svg>
        ))}
      </span>
      <blockquote className={`${display} relative text-[1rem] leading-[1.55] text-ink sm:text-[1.3125rem] sm:leading-[1.5]`}>
        &ldquo;{noWidow(quote)}&rdquo;
      </blockquote>
      <figcaption className="relative mt-3 text-left text-[0.75rem] font-bold sm:mt-4 sm:text-[0.8125rem] tracking-[0.12em] text-brass uppercase">
        &mdash; {name}
      </figcaption>
    </figure>
  );
}

// Three columns that fit a 320px screen without scrolling, so both sides of the comparison stay in view.
function Compare({ page }: { page: ReasonsPage }) {
  const { compare } = page;
  return (
    <section aria-labelledby="compare-title" className={`${col} pt-12 sm:pt-16`}>
      <h2 id="compare-title" className={`${display} text-center text-[1.5rem] leading-tight text-ink sm:text-[2.25rem]`}>
        {compare.title}
      </h2>
      <table className="mt-6 w-full table-fixed border-collapse text-[0.8125rem] leading-snug sm:mt-8 sm:text-[0.9375rem]">
        <colgroup>
          <col className="w-[30%] sm:w-[28%]" />
          <col className="w-[37%] sm:w-[38%]" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <td />
            <th scope="col" className="rounded-t-md bg-ink px-3 py-4 text-left text-cream sm:px-6">
              <span className="flex items-center gap-2">
                <Mark className="h-5 w-6 shrink-0 text-brass-light max-sm:hidden" />
                <span className="font-logo text-[1.0625rem] font-normal sm:text-[1.375rem]">Shalimar</span>
              </span>
            </th>
            <th scope="col" className={`${eyebrow} px-3 py-4 text-left text-[0.75rem] text-ink sm:px-6 sm:text-[0.8125rem]`}>
              {compare.them}
            </th>
          </tr>
        </thead>
        <tbody>
          {compare.rows.map((row, i) => {
            const last = i === compare.rows.length - 1;
            return (
              <tr key={row.label} className="border-t border-ink/12">
                <th scope="row" className="py-3.5 pr-2 text-left text-[0.75rem] font-semibold tracking-[0.04em] text-ink uppercase sm:pr-4 sm:text-[0.8125rem] sm:tracking-[0.06em]">
                  {row.label}
                </th>
                <td className={`border-t border-cream/15 bg-ink px-3 py-3.5 text-left text-cream sm:px-6 ${last ? "rounded-b-md" : ""}`}>
                  <span className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brass text-ink">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    {row.us}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-left text-ink/70 sm:px-6">
                  <span className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink/8 text-ink/50">
                      <Icon name="close" className="size-3.5" />
                    </span>
                    {row.them}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-6 border-l-4 border-brass bg-sand/60 px-5 py-4 sm:mt-8">
        <p className="text-[0.75rem] font-bold tracking-[0.14em] text-ink uppercase">Summary:</p>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/85">{compare.summary}</p>
      </div>
    </section>
  );
}

function ReasonVisual({ visual }: { visual: Visual }) {
  return (
    <Image
      src={visual.src}
      alt={visual.alt}
      fill
      sizes="(orientation: landscape) and (max-height: 31.25rem) 40vw, (min-width: 52rem) 22rem, (min-width: 48rem) 40vw, 100vw"
      className="object-cover"
      style={{ objectPosition: visual.position }}
    />
  );
}

// The deal: brand panel and what's included on the left, the discount, prices and button on the right.
// On phones held upright: the deal first (no panel), then what's included.
function OfferPanel({ page, deal }: { page: ReasonsPage; deal: string }) {
  const { offer } = page;
  return (
    <section id="offer" aria-labelledby="offer-title" className={`${wide} scroll-mt-[-3rem] pt-12 pb-12 sm:scroll-mt-[-4rem] sm:pt-16 sm:pb-16 md:scroll-mt-[-5rem] md:pt-20`}>
      <div
        data-deal-card
        className="grid grid-cols-1 overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_4px_24px_rgb(0_0_0/0.14)] md:grid-cols-[21rem_1fr] md:grid-rows-[auto_1fr] short:grid-cols-[14rem_1fr] short:grid-rows-[auto_1fr]"
      >
        {/* Branded panel instead of a photo: every good photo of the space is already used in the reasons.
            Hidden on phones held upright, so the deal and its button come first after the sale-bar jump. */}
        <div className="bg-sand p-4 pb-0 max-sm:hidden md:col-start-1 md:row-start-1 short:col-start-1 short:row-start-1 short:block">
          <div className="jali relative grid aspect-[4/3] place-items-center overflow-hidden rounded-sm bg-ink text-cream md:aspect-square short:aspect-square">
            <div aria-hidden="true" className="flex flex-col items-center px-6 text-center">
              <Mark className="h-9 w-12 text-brass sm:h-11 sm:w-14" />
              <span className="mt-4 font-logo text-[2rem] leading-none sm:text-[2.5rem]">Shalimar</span>
              <span className="mt-2 pl-[0.62em] text-[0.625rem] font-semibold tracking-[0.62em] text-brass-light uppercase">Coworking</span>
              <span className="mt-5 h-px w-12 bg-brass/60" />
              <span className="mt-4 pl-[0.22em] text-[0.75rem] font-semibold tracking-[0.22em] text-cream/75 uppercase">ATS Centre · Blue Area</span>
            </div>
          </div>
        </div>

        <div className="px-5 py-7 text-center sm:px-9 sm:py-9 md:col-start-2 md:row-span-2 md:row-start-1 md:self-center short:col-start-2 short:row-span-2 short:row-start-1 short:self-center short:py-6">
          <p className="flex items-center gap-3 text-[0.75rem] font-semibold tracking-[0.18em] text-ink/70 uppercase">
            <span className="h-px flex-1 bg-ink/20" />
            {sale.name}
            <span className="h-px flex-1 bg-ink/20" />
          </p>
          <h2 id="offer-title" className={`${display} mt-3 text-[2.25rem] leading-none text-ink uppercase sm:text-[2.75rem]`}>
            Up to {sale.upTo}% off
          </h2>
          <p className="mt-3 text-[0.9375rem] text-ink/75">{offer.body}</p>
          <ul className="mx-auto mt-5 max-w-[24rem] divide-y divide-ink/10 border-y border-ink/10 text-left text-[0.875rem]">
            {pricing.plans.map((p) => (
              <li key={p.name} className="flex items-baseline justify-between gap-3 py-2.5">
                <span className="font-medium text-ink">
                  {p.name}
                  {perSeat(p) && <span className="block text-[0.75rem] font-normal text-ink/70">per seat</span>}
                </span>
                <span className="tabular-nums">
                  <s className="mr-2 text-[0.8125rem] text-ink/65">{p.was.toLocaleString("en-US")}</s>
                  <strong className="font-semibold text-ink">{kpr(p.price)}</strong>
                  <span className="text-ink/60">/mo</span>
                </span>
              </li>
            ))}
          </ul>
          <a href={deal} target="_blank" rel="noopener noreferrer" className={`${pill} mt-6`}>
            {offer.cta}
          </a>
          <p className="mt-4 text-[0.8125rem] text-ink/80">
            Deal ending in: <span className="text-base text-ink"><SaleCountdown variant="inline" /></span>
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {offer.chips.map((c) => (
              <li key={c} className="rounded-sm bg-cream px-3 py-1.5 text-[0.75rem] font-semibold tracking-[0.1em] text-ink uppercase">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.8125rem] leading-snug text-ink/70 italic">
            Up to {bestDeal.off}% off is a {bestDeal.name} seat paid annually: {bestDeal.nowText} a month, was {bestDeal.wasText}.
          </p>
        </div>

        <ul aria-label="Included in every plan" className="grid grid-cols-2 gap-2 bg-sand p-4 md:col-start-1 md:row-start-2 md:self-stretch short:col-start-1 short:row-start-2 short:self-stretch">
          {offer.included.map((item) => (
            <li key={item.label} className="flex flex-col items-center gap-1.5 rounded-sm bg-white px-2 pt-0 pb-3 text-center">
              <span className="-mt-px rounded-b-sm bg-ink px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.1em] text-cream uppercase">Included</span>
              <Icon name={item.icon} className="mt-1 size-6 text-brass-dark" />
              <span className="text-[0.75rem] leading-tight font-semibold text-ink">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Also used on the "clients abroad" page.
export function MemberReviews({ page }: { page: ReasonsPage }) {
  const { reviews } = page;
  if (reviews.items.length === 0) return null;
  return (
    <section aria-labelledby="reviews-title" className="bg-sand/70 py-14 sm:py-20">
      <div className={wide}>
        <h2 id="reviews-title" className={`${display} text-center text-[1.75rem] leading-tight text-ink uppercase sm:text-[2.5rem]`}>
          {reviews.heading}
        </h2>
        <p className="mt-2 text-center text-[0.9375rem] text-ink/70 sm:text-base">{reviews.intro}</p>
        <ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5">
          {reviews.items.map((r) => (
            <li key={r.name} className="flex flex-col rounded-sm bg-white p-6 sm:p-7">
              <Mark className="h-4 w-5 text-brass" />
              <h3 className={`${display} mt-3 text-[1.0625rem] leading-snug text-ink uppercase sm:text-[1.125rem]`}>{r.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.65] text-ink/80">
                &ldquo;<Rich text={r.quote} />&rdquo;
              </p>
              <p className="mt-5 text-[0.75rem] font-semibold tracking-[0.12em] text-ink/70 uppercase">
                <span className="text-ink">{r.name}</span> | Member
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Each plan's offer price, old price and seats left, with its own WhatsApp link.
// The counts come from `left` in site.ts pricing.plans; keep them current.
function PlansLeft({ page }: { page: ReasonsPage }) {
  const links = lpLinks(page.code);
  const offices = seatsLeft("Private Office");
  return (
    <section aria-labelledby="plans-title" className={`${wide} py-14 sm:py-20`}>
      <div data-deal-card className="grid grid-cols-1 overflow-hidden rounded-md border border-ink/10 bg-white md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="relative max-md:hidden">
          <Image src={page.plans.image.src} alt={page.plans.image.alt} fill sizes="(min-width: 60rem) 28rem, 46vw" className="object-cover" />
        </div>
        <div className="px-5 py-7 sm:px-9 sm:py-9">
          <p className={`${eyebrow} text-brass-dark`}>{page.plans.eyebrow}</p>
          <h2 id="plans-title" className={`${display} mt-2 text-[1.5rem] leading-tight text-ink uppercase sm:text-[1.875rem]`}>
            {offices ? `${offices} at this price` : "Plans at this price"}
          </h2>
          <p className="mt-3 text-[0.9375rem] text-ink/75">{page.plans.body}</p>
          <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
            {pricing.plans.map((p) => {
              const left = seatsLeft(p.name);
              return (
                <li key={p.name} className="flex items-center justify-between gap-3 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">
                      {p.name}
                      {perSeat(p) && <span className="ml-1.5 text-[0.75rem] font-normal text-ink/70">per seat</span>}
                    </p>
                    <p className="text-[0.875rem] text-ink/70 tabular-nums">
                      <s className="mr-1.5 text-ink/65">{kpr(p.was)}</s>{" "}
                      <span className="whitespace-nowrap">
                        <strong className="font-semibold text-ink">{kpr(p.price)}</strong>/month
                      </span>
                    </p>
                    {left && <p className="mt-0.5 text-[0.8125rem] font-semibold text-[#b3261e]">{left}</p>}
                  </div>
                  <a
                    href={links.plan(p.name, p.price, p.unit)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Reserve a ${p.name} on WhatsApp`}
                    className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-brass px-5 text-[0.75rem] font-semibold tracking-[0.08em] text-ink uppercase transition-colors hover:bg-brass-light active:scale-[0.98] lg:min-h-12"
                  >
                    Reserve
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Its own function so other page types can reuse it.
export function Faq({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <section aria-labelledby="faq-title" className={`${col} pb-16 sm:pb-20`}>
      <h2 id="faq-title" className={`${display} text-center text-[1.75rem] text-ink uppercase sm:text-[2.5rem]`}>
        FAQs
      </h2>
      <div className="mt-6 border-t border-ink/15 sm:mt-8">
        {faq.map((f, i) => (
          <details key={f.q} className="group border-b border-ink/15">
            <summary className="-mx-2 flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-sm px-2 py-4 transition-colors motion-reduce:transition-none active:bg-ink/[0.04] text-[0.875rem] font-semibold tracking-[0.03em] text-ink uppercase sm:gap-4 sm:text-[0.9375rem] [&::-webkit-details-marker]:hidden">
              <span className="w-6 shrink-0 text-brass-dark tabular-nums sm:w-7" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <span className="flex-1">{f.q}</span>
              <span className="relative size-3.5 shrink-0" aria-hidden="true">
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink transition-transform motion-reduce:transition-none group-open:rotate-45" />
                <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-ink transition-transform motion-reduce:transition-none group-open:rotate-45" />
              </span>
            </summary>
            <p className="pr-7 pb-5 pl-9 text-[0.9375rem] leading-relaxed text-ink/80 sm:pl-11">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Its own function so other page types can reuse it.
export function Closing({ closing, cta, deal }: { closing: ReasonsPage["closing"]; cta: string; deal: string }) {
  return (
    <section data-deal-end aria-labelledby="closing-title" className="bg-sand py-14 text-center text-ink sm:py-20">
      <div className={`mx-auto max-w-[44rem] ${gutter}`}>
        <Mark className="mx-auto h-7 w-9 text-brass-dark" />
        <h2 id="closing-title" className={`${display} mt-4 text-[1.75rem] leading-tight uppercase sm:text-[2.5rem]`}>
          {closing.title}
        </h2>
        <p className="mt-3 text-[0.9375rem] text-ink/75 sm:text-base">{closing.body}</p>
        <a href={deal} target="_blank" rel="noopener noreferrer" className={`${pill} mt-7`}>
          {cta}
        </a>
        <ul className="mt-7 flex flex-col items-center gap-3 text-[0.75rem] font-semibold tracking-[0.12em] text-ink/80 uppercase sm:flex-row sm:justify-center sm:gap-8">
          {closing.facts.map((f) => (
            <li key={f.label} className="flex items-center gap-2">
              <Icon name={f.icon} className="size-5 text-brass-dark" />
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
