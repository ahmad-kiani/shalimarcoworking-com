"use client";

import { useRef } from "react";
import { spaces } from "@/content/site";
import Icon from "./Icon";
import Photo from "./Photo";

export default function SpacesCarousel() {
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 hidden justify-end gap-3 sm:flex">
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
        className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {spaces.items.map((space) => (
          <li key={space.name} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
            <Photo label={space.name} className="aspect-[4/3.4]" />
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-serif text-3xl">{space.name}</h3>
              <span className="text-[11px] font-medium tracking-[0.2em] text-garden uppercase">{space.meta}</span>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{space.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
