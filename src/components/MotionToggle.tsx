"use client";

import { useEffect, useState } from "react";

// Earlier versions remembered the choice across visits; that read as "the video doesn't start", so it's cleared.
const OLD_KEY = "motion-paused";
// The video fades in from black, so pausing in its first moments would hold a black frame. The still
// (poster.webp) is taken at 2s, so a paused video shows that frame instead.
const STILL_AT = 2;

function apply(paused: boolean) {
  document.documentElement.dataset.motion = paused ? "paused" : "";
  const v = document.querySelector<HTMLVideoElement>("#hero-video");
  if (v?.getAttribute("src")) {
    if (paused) {
      v.pause();
      if (v.currentTime < STILL_AT) v.currentTime = STILL_AT;
    } else v.play().catch(() => {});
  }
}

// Pauses and resumes everything that moves on its own: the hero video and the scrolling banner, for this page
// view (every visit starts playing). The state sits on <html data-motion="paused">, which the banner's CSS and
// HeroVideo read. Bottom-left of the hero; on short landscape screens, top-right under the header, where the hero
// buttons and the WhatsApp button leave no room at the bottom. Hidden when the device asks for reduced motion, since
// nothing moves then, and on phones held upright, which show a still instead of the video.
export default function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem(OLD_KEY);
    } catch {}
  }, []);

  const toggle = () => {
    setPaused(!paused);
    apply(!paused);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label="Pause background motion"
      title={paused ? "Play background motion" : "Pause background motion"}
      className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-10 grid size-11 place-items-center rounded-full border border-cream/35 bg-ink/40 text-cream backdrop-blur-sm transition-colors hover:bg-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:hidden max-sm:portrait:hidden sm:left-[max(2rem,env(safe-area-inset-left))] short:top-[7rem] short:right-[max(1.25rem,env(safe-area-inset-right))] short:bottom-auto short:left-auto short:size-10 sm:short:right-[max(2rem,env(safe-area-inset-right))]"
    >
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
        {paused ? <path d="M5 3.2v9.6a.6.6 0 0 0 .92.5l7.2-4.8a.6.6 0 0 0 0-1l-7.2-4.8A.6.6 0 0 0 5 3.2Z" /> : <path d="M4.5 3h2v10h-2zM9.5 3h2v10h-2z" />}
      </svg>
    </button>
  );
}
