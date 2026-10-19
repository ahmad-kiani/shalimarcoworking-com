"use client";

import { useEffect, useRef } from "react";

// Background video for the hero. It plays only when the device hasn't asked for reduced motion;
// otherwise the poster stays up as a still image. The poster shows straight away and stays up until
// the video can play.
export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (reduce.matches) {
        v.pause();
      } else {
        v.preload = "auto";
        // play() can be refused (e.g. iOS Low Power Mode); the poster simply stays up.
        v.play().catch(() => {});
      }
    };
    update();
    reduce.addEventListener("change", update);
    return () => reduce.removeEventListener("change", update);
  }, []);

  return (
    <video
      ref={video}
      className="absolute inset-0 size-full object-cover"
      src="/hero/hero.mp4"
      poster="/hero/poster.webp"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
