"use client";

import { useState } from "react";

// "Copy link" button for the internal page list: copies the URL and says "Copied" for two seconds.
export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: select the URL text instead so it can be copied by hand.
      window.prompt("Copy this link:", url);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 min-w-28 items-center justify-center rounded-full bg-ink px-5 text-[0.75rem] font-semibold tracking-[0.08em] text-cream uppercase transition-colors hover:bg-ink/85 active:scale-[0.98]"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy link"}</span>
    </button>
  );
}
