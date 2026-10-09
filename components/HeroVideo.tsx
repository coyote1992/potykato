"use client";

import { useEffect, useRef } from "react";

/** The wedding film of the park, muted and looping; phones get the lighter cut, reduced motion the still. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.src = innerWidth < 900 ? "/video/eskuvo-sm.mp4" : "/video/eskuvo.mp4";
    v.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster="/video/eskuvo-poster.webp"
      aria-hidden
      tabIndex={-1}
    />
  );
}
