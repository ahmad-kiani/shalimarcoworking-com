"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contact } from "@/content/site";
import Icon from "./Icon";

// Styled replacement for the native <select>: a button that opens a listbox.
// The chosen value is posted through a hidden input named "interest".
export default function InterestSelect({ labelId }: { labelId: string }) {
  const options = contact.interests;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const valueId = `${listId}-value`;
  // Type-ahead: letters typed within half a second build up a search, like a native select.
  const typed = useRef({ text: "", at: 0 });

  // Close when clicking or tapping outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    // Bring the whole list into view (it can open near the bottom of a short screen) without the focus jump.
    if (open) {
      list.current?.focus({ preventScroll: true });
      list.current?.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  const openList = (at?: number) => {
    const i = options.findIndex((o) => o.label === value);
    setActive(at ?? (i < 0 ? 0 : i));
    setOpen(true);
  };

  // Index of the next option starting with what's been typed, or -1. A repeated single letter cycles through matches.
  const match = (e: React.KeyboardEvent, from: number) => {
    const key = e.key;
    const now = e.timeStamp;
    const text = now - typed.current.at < 500 ? typed.current.text + key.toLowerCase() : key.toLowerCase();
    typed.current = { text, at: now };
    const cycling = [...text].every((c) => c === text[0]);
    const search = cycling ? text[0] : text;
    const start = cycling ? from + 1 : from;
    for (let k = 0; k < options.length; k++) {
      const i = (((start + k) % options.length) + options.length) % options.length;
      if (options[i].label.toLowerCase().startsWith(search)) return i;
    }
    return -1;
  };
  const isTypeAhead = (e: React.KeyboardEvent) => e.key.length === 1 && e.key !== " " && !e.ctrlKey && !e.metaKey && !e.altKey;

  const choose = (i: number) => {
    setValue(options[i].label);
    setOpen(false);
    button.current?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (isTypeAhead(e)) {
      const i = match(e, active);
      if (i >= 0) setActive(i);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") button.current?.focus();
    }
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name="interest" value={value} />
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${valueId}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openList();
          } else if (isTypeAhead(e)) {
            const i = match(e, options.findIndex((o) => o.label === value));
            if (i >= 0) openList(i);
          }
        }}
        className={`flex w-full items-center justify-between border-b py-3 text-left text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-garden ${
          open ? "border-brass-dark" : "border-ink/50 focus-visible:border-brass-dark"
        } ${value ? "text-ink" : "text-ink/65"}`}
      >
        <span id={valueId}>{value || "Select an option"}</span>
        <Icon name="chevron" className={`size-4 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${listId}-${active}`}
          onKeyDown={onListKey}
          className="absolute inset-x-0 top-full z-[45] mt-1.5 scroll-mt-20 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-md border border-ink/10 bg-[#fbf8f2] p-1.5 shadow-[0_16px_40px_rgb(0_0_0/0.14)] focus:outline-none"
        >
          {options.map((o, i) => {
            const selected = o.label === value;
            return (
              <li
                key={o.label}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded px-3.5 py-2.5 text-[0.96875rem] max-[359px]:gap-2 max-[359px]:px-2.5 ${
                  i === active ? "bg-brass/25 ring-1 ring-brass-dark/40 ring-inset" : ""
                } ${selected ? "font-semibold" : ""}`}
              >
                <Icon name={o.icon} className="size-5 text-brass-dark" />
                <span>{o.label}</span>
                {selected && <Icon name="check" className="ml-auto size-5 text-brass-dark" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
