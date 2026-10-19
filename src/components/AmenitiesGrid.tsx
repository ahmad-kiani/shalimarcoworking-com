"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";
import { btn } from "./styles";

type Amenity = { icon: string; title: string; body: string };

// Phones show the first four (two rows of two) plus a one-way "Show 4 more" button; tablets and up show all.
// Every card stays in the HTML, so search engines and screen readers get the full list.
const FIRST = 4;

export default function AmenitiesGrid({ items }: { items: Amenity[] }) {
  const [expanded, setExpanded] = useState(false);
  const justExpanded = useRef(false);
  const firstHidden = useRef<HTMLLIElement>(null);
  const listId = useId();

  // After revealing, move focus to the first new card so keyboard and screen reader users land on it.
  useEffect(() => {
    if (expanded && justExpanded.current) {
      justExpanded.current = false;
      firstHidden.current?.focus({ preventScroll: true });
    }
  }, [expanded]);

  return (
    <>
      <ul id={listId} className="mt-12 grid grid-cols-2 gap-3 min-[400px]:gap-4 sm:mt-14 lg:grid-cols-4 lg:gap-5 xl:gap-6">
        {items.map((a, i) => (
          <li
            key={a.title}
            ref={i === FIRST ? firstHidden : undefined}
            tabIndex={i === FIRST ? -1 : undefined}
            // Subgrid lines up icon, title and body across each row; gap-y-0 stops it inheriting the list's gap.
            className={`row-span-3 grid grid-rows-subgrid gap-y-0 rounded-sm bg-ink-card p-3.5 [overflow-wrap:anywhere] outline-none min-[360px]:p-4 min-[400px]:p-5 sm:p-6 xl:p-7 ${
              i >= FIRST && !expanded ? "max-sm:hidden" : ""
            }`}
          >
            <Icon name={a.icon} className="size-6 text-brass sm:size-7" />
            <h3 className="mt-3 font-serif text-[1.25rem] leading-tight min-[400px]:text-[1.375rem] sm:mt-5 sm:text-[1.625rem] lg:text-[1.5rem] xl:text-[1.75rem]">
              {a.title}
            </h3>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-cream/70 min-[400px]:text-sm sm:mt-3 sm:text-[0.9375rem]">{a.body}</p>
          </li>
        ))}
      </ul>
      {!expanded && (
        <button
          type="button"
          aria-expanded={false}
          aria-controls={listId}
          onClick={() => {
            justExpanded.current = true;
            setExpanded(true);
          }}
          className={`${btn} mt-4 w-full gap-2 border border-cream/30 hover:bg-cream hover:text-ink sm:hidden`}
        >
          Show {items.length - FIRST} more
          <Icon name="chevron" className="size-4" />
        </button>
      )}
    </>
  );
}
