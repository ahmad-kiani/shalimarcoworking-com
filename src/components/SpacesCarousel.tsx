"use client";

import { useRef } from "react";
import { spaces } from "@/content/site";
import Icon from "./Icon";
import Image from "next/image";

export default function SpacesCarousel() {
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap) : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 hidden justify-end gap-3 sm:flex">
        {(["arrowLeft", "arrowRight"] as const).map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => scrollBy(i === 0 ? -1 : 1)}
            aria-label={i === 0 ? "Previous space" : "Next space"}
            className="flex size-12 items-center justify-center rounded-full border border-ink/30 transition-colors hover:border-ink hover:bg-ink hover:text-cream"
          >
            <Icon name={name} className="size-5" />
          </button>
        ))}
      </div>

      <ul
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 xl:mx-[calc(50%-50vw)] xl:scroll-px-[max(2rem,calc(50vw-38rem))] xl:px-[max(2rem,calc(50vw-38rem))] [&::-webkit-scrollbar]:hidden"
      >
        {spaces.items.map((space) => (
          <li key={space.name} className="w-[82%] shrink-0 snap-start min-[520px]:w-[64%] sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
            <div className="relative aspect-[4/3.4] overflow-hidden bg-sand">
              <Image
                src={space.image}
                alt={space.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 82vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5 flex flex-col items-start gap-1">
              <h3 className="font-serif text-3xl">{space.name}</h3>
              <span className="text-xs font-medium tracking-[0.2em] text-brass-dark uppercase">{space.meta}</span>
            </div>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{space.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
