import Image from "next/image";
import Icon from "./Icon";
import Photo from "./Photo";
import SaleCountdown from "./SaleCountdown";
import { gutter } from "./styles";
import { sale } from "@/content/site";
import { seatsLeft, type Listicle, type Review } from "@/content/listicles";

// Pieces of the listicle pages (/pages/<slug>), laid out like NOBL's /pages/safety advertorial.

export const wrap = `mx-auto max-w-[69rem] ${gutter}`;
export const heading = "font-(family-name:--font-montserrat) font-semibold tracking-[-0.01em] text-ink";
export const pill =
  "inline-flex min-h-12 w-full max-w-[24rem] items-center justify-center rounded-full bg-brass px-8 text-[0.8125rem] font-semibold tracking-[0.04em] text-ink uppercase transition-colors hover:bg-brass-light active:scale-[0.98]";

// "Some **bold** words" → Some <strong>bold</strong> words.
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part))}
    </>
  );
}

// Joins the last three words with non-breaking spaces so a quote never ends on a lone word or two,
// in every browser (text-wrap: balance isn't supported everywhere).
export const noWidow = (text: string) => {
  const words = text.split(" ");
  return words.length < 4 ? text : `${words.slice(0, -3).join(" ")} ${words.slice(-3).join(" ")}`;
};

// Black bar across the top with the sale and its countdown. Jumps to the offer card.
export function SaleBar() {
  return (
    <a
      href="#offer"
      className="sticky top-0 z-50 block bg-black pt-[env(safe-area-inset-top)] text-[0.75rem] font-medium tracking-[0.06em] text-white uppercase transition-colors active:bg-ink-soft sm:text-[0.8125rem]"
    >
      <span className="flex h-11 items-center justify-center gap-3 px-4">
        <span>
          <span className="max-sm:hidden">{sale.name} - </span>
          Up to {sale.upTo}% Off
        </span>
        <SaleCountdown />
      </span>
    </a>
  );
}

// Full-width photo: a 16:9 banner on phones, a tall band from tablets up, kept short in phone landscape.
export function Hero({ page }: { page: Listicle }) {
  return (
    <div className="relative aspect-[16/9] sm:aspect-auto sm:h-[clamp(22rem,39vw,35rem)] short:h-[40dvh]">
      <Image src={page.hero.src} alt={page.hero.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: page.hero.position }} />
    </div>
  );
}

export function Title({ page }: { page: Listicle }) {
  return (
    <header data-deal-start className={`${wrap} pt-6 sm:pt-10 sm:text-center`}>
      <h1 className={`${heading} text-[1.75rem] leading-[1.15] sm:text-[2.75rem] sm:leading-[1.12]`}>{page.title}</h1>
      <p className="mx-auto mt-4 max-w-[62rem] text-[0.9375rem] leading-relaxed text-ink/85 sm:mt-3 sm:text-[1.0625rem]">
        {page.intro}
      </p>
    </header>
  );
}

export function PressStrip({ page }: { page: Listicle }) {
  if (page.press.length === 0) return null;
  return (
    <section aria-label="As seen in" className="pt-8 sm:pt-10">
      <p className="text-center text-sm text-ink/80">As seen in</p>
      <ul className="mx-auto mt-4 flex max-w-[90rem] items-center justify-between gap-8 overflow-x-auto px-6">
        {page.press.map((p) => (
          <li key={p.name} className="relative h-10 w-28 shrink-0 sm:h-12 sm:w-36">
            <Image src={p.logo} alt={p.name} fill sizes="9rem" className="object-contain" />
          </li>
        ))}
      </ul>
    </section>
  );
}

// One numbered reason. Odd rows have the photo on the left, even rows on the right; stacked on phones.
export function ReasonRow({ n, reason }: { n: number; reason: Listicle["reasons"][number] }) {
  const flip = n % 2 === 0;
  return (
    <li className="grid items-center gap-6 py-10 sm:gap-12 sm:py-16 md:grid-cols-2">
      <div className={`relative aspect-[4/3] overflow-hidden rounded-sm ${flip ? "md:order-2" : ""}`}>
        {reason.image ? (
          <Image src={reason.image.src} alt={reason.image.alt} fill sizes="(min-width: 48rem) 34rem, 100vw" className="object-cover" />
        ) : (
          <Photo label={reason.title} className="size-full" />
        )}
      </div>
      <div>
        <h2 className={`${heading} text-[1.75rem] leading-[1.15] sm:text-[2rem]`}>
          {n}. {reason.title}
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-[1.75] text-ink/85 sm:mt-5">
          <Rich text={reason.body} />
        </p>
      </div>
    </li>
  );
}

export function PullQuote({ review }: { review?: Review }) {
  if (!review) return null;
  return (
    <figure className="mx-auto mt-2 max-w-[49rem] border-l-[3px] border-ink py-1 pl-5 sm:pl-6">
      <blockquote className="text-[1.0625rem] leading-[1.45] font-semibold text-pretty text-ink sm:text-[1.1875rem]">&ldquo;<Rich text={noWidow(review.quote)} />&rdquo;</blockquote>
      <figcaption className="mt-5 text-[1.0625rem] font-semibold text-ink sm:text-[1.1875rem]">- {review.name}</figcaption>
    </figure>
  );
}

// Deal card: photo with a round discount badge, the sale, a pill button, countdown, sellout risk and a perk.
export function OfferCard({ page, href }: { page: Listicle; href: string }) {
  const { offer } = page;
  const left = seatsLeft(offer.scarcityPlan);
  return (
    <section id="offer" aria-labelledby="offer-title" className={`${wrap} scroll-mt-[-3rem] py-12 sm:scroll-mt-[-4rem] sm:py-16`}>
      <div data-deal-card className="mx-auto grid max-w-[51rem] items-center gap-5 rounded-md border border-ink/10 bg-white p-5 shadow-[0_4px_24px_rgb(0_0_0/0.18)] sm:grid-cols-[13rem_1fr] sm:gap-8 sm:p-6">
        <h2 id="offer-title" className={`${heading} text-center text-[1.625rem] sm:hidden`}>
          {offer.title}
        </h2>
        <div className="relative mx-auto aspect-square w-full max-w-[18rem] overflow-hidden rounded-sm bg-cream sm:max-w-none">
          <Image src={offer.image.src} alt={offer.image.alt} fill sizes="(min-width: 40rem) 13rem, 18rem" className="object-cover" />
          <span className="absolute top-3 right-3 grid size-16 place-items-center rounded-full bg-[#e8202a] text-center text-[0.9375rem] leading-[1.05] font-bold text-white uppercase shadow-md">
            {sale.upTo}%
            <br />
            Off
          </span>
        </div>
        <div className="text-center">
          <p className={`${heading} text-[1.375rem] max-sm:hidden`} aria-hidden="true">
            {offer.title}
          </p>
          <p className="mt-2 text-[0.8125rem] text-ink/80">{offer.body}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className={`${pill} mt-5`}>
            {offer.cta}
          </a>
          <p className="mt-4 text-[0.8125rem] text-ink/85">
            Deal ending in: <span className="text-base text-ink"><SaleCountdown variant="inline" /></span>
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8125rem] text-ink/85 sm:text-[0.75rem]">
            <li>
              Sellout Risk: <strong className="font-bold text-[#e8202a]">HIGH</strong>
              {left && <span className="ml-1 text-ink/60">({left})</span>}
            </li>
            <li className="flex items-center gap-1.5">
              <Icon name="calendar" className="size-4" />
              <strong className="font-semibold uppercase">{offer.perk}</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stars({ className = "size-3.5" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-[#f5a623]" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`${className} fill-current`} aria-hidden="true">
          <path d="M10 1.5l2.6 5.5 6 .7-4.5 4.1 1.2 5.9L10 14.8l-5.3 2.9 1.2-5.9L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </span>
  );
}

// Grey band: centred heading and stars, then left-aligned reviews (name on the right). Hidden until there are reviews.
// The pull quote shows reviews[0], so the band shows the rest (or all of them if there are three or fewer).
export function ReviewBand({ page, reviews }: { page: Listicle; reviews: Review[] }) {
  if (reviews.length === 0) return null;
  const shown = reviews.length > 3 ? reviews.slice(1) : reviews;
  return (
    <section aria-labelledby="reviews-title" className="bg-[#f6f6f4] py-14 sm:py-20">
      <div className={wrap}>
        <h2 id="reviews-title" className={`${heading} text-center text-[1.625rem] leading-tight text-balance sm:text-[2.625rem]`}>
          {page.reviewsHeading}
        </h2>
        <div className="mt-3 flex flex-col items-center gap-2">
          <Stars className="size-4 sm:size-5" />
          <p className="text-base font-semibold text-ink sm:text-[1.1875rem]">{page.reviewsSubheading}</p>
        </div>
        <ul className="mx-auto mt-10 max-w-[46rem] space-y-10 sm:mt-14 sm:space-y-12">
          {shown.map((r) => (
            <li key={r.name}>
              <Stars className="size-4 sm:size-[1.125rem]" />
              <h3 className={`${heading} mt-3 text-[1.25rem] leading-snug sm:text-[1.6875rem]`}>{r.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.6] text-ink/80 sm:text-[1.1875rem]">&ldquo;<Rich text={noWidow(r.quote)} />&rdquo;</p>
              <p className="mt-2 text-right text-[0.875rem] font-semibold text-ink sm:text-[1.0625rem]">- {r.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
