"use client";

import { useEffect, useRef } from "react";

// Phones held upright show only a narrow slice of the wide video, so they get a still made for a
// tall screen instead and never download the video.
export const PHONE_PORTRAIT = "(max-width: 39.9375rem) and (orientation: portrait)";

// Background video for the hero. It plays only when the device hasn't asked for reduced motion and
// isn't a phone held upright; otherwise the still stays up. The still shows straight away and stays
// underneath until the video has frames to show.
export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia(PHONE_PORTRAIT);
    const update = () => {
      if (reduce.matches || phone.matches) {
        v.pause();
      } else {
        // The source is only set here, so phones and reduced-motion visitors download nothing.
        if (!v.getAttribute("src")) v.src = "/hero/hero.mp4";
        v.preload = "auto";
        // play() can be refused (e.g. iOS Low Power Mode); the still simply stays up.
        v.play().catch(() => {});
      }
    };
    update();
    reduce.addEventListener("change", update);
    phone.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      phone.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      <picture>
        <source media={PHONE_PORTRAIT} srcSet="/hero/poster-portrait.webp" />
        <img src="/hero/poster.webp" alt="" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
      </picture>
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover max-sm:portrait:hidden"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </>
  );
}
