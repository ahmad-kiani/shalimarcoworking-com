"use client";

import { useEffect, useState } from "react";

const KEY = "motion-paused";

function apply(paused: boolean) {
  document.documentElement.dataset.motion = paused ? "paused" : "";
  const v = document.querySelector<HTMLVideoElement>("#hero-video");
  if (v?.getAttribute("src")) {
    if (paused) v.pause();
    else v.play().catch(() => {});
  }
}

// Pauses and resumes everything that moves on its own: the hero video and the scrolling banner.
// The choice is kept on <html data-motion="paused"> (the banner's CSS and HeroVideo read it) and
// remembered for later visits. Bottom-left of the hero; on short landscape screens, top-right under the header,
// where the hero buttons and the WhatsApp button leave no room at the bottom. Hidden when the device asks for reduced motion, since nothing moves then,
// and on phones held upright, which show a still instead of the video.
export default function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let saved = false;
    try {
      saved = localStorage.getItem(KEY) === "1";
    } catch {}
    if (saved) apply(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the choice saved in the browser
    setPaused(saved);
  }, []);

  const toggle = () => {
    const p = !paused;
    setPaused(p);
    apply(p);
    try {
      localStorage.setItem(KEY, p ? "1" : "0");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label="Pause background motion"
      title={paused ? "Play background motion" : "Pause background motion"}
      className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-10 grid size-11 place-items-center rounded-full border border-cream/35 bg-ink/40 text-cream backdrop-blur-sm transition-colors hover:bg-ink/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:hidden max-sm:portrait:hidden sm:left-[max(2rem,env(safe-area-inset-left))] short:top-[4.5rem] short:right-[max(1.25rem,env(safe-area-inset-right))] short:bottom-auto short:left-auto short:size-10 sm:short:right-[max(2rem,env(safe-area-inset-right))]"
    >
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="size-4">
        {paused ? <path d="M5 3.2v9.6a.6.6 0 0 0 .92.5l7.2-4.8a.6.6 0 0 0 0-1l-7.2-4.8A.6.6 0 0 0 5 3.2Z" /> : <path d="M4.5 3h2v10h-2zM9.5 3h2v10h-2z" />}
      </svg>
    </button>
  );
}
