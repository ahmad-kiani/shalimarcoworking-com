"use client";

import { useEffect, useRef } from "react";

// A container that may scroll sideways (the swipe rows on phones). While it actually overflows, it joins the
// Tab order so keyboard users can reach it and scroll it with the arrow keys; when it fits, it stays out of the way.
export default function ScrollArea({
  as: Tag = "div",
  label,
  region = false,
  className = "",
  children,
}: {
  as?: "div" | "ul";
  label: string;
  // Give it a named region role while scrollable (for a plain div; lists keep their list role).
  region?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const scrolls = ["auto", "scroll"].includes(getComputedStyle(el).overflowX);
      if (scrolls && el.scrollWidth > el.clientWidth + 1) {
        el.tabIndex = 0;
        el.setAttribute("aria-label", label);
        if (region) el.setAttribute("role", "region");
      } else {
        el.removeAttribute("tabindex");
        if (region) {
          el.removeAttribute("role");
          el.removeAttribute("aria-label");
        }
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [label, region]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${className} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-garden`}
    >
      {children}
    </Tag>
  );
}
