"use client";

import { useEffect, useState } from "react";
import { reviews } from "@/lib/site";

/** What guests wrote: one quote at a time. */
export function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((x) => (x + 1) % reviews.length), 7000);
    return () => clearTimeout(t);
  }, [i, paused]);
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="reviews__stage" aria-live="polite">
        {reviews.map((r, k) => (
          <figure key={r.name} className={`review ${k === i ? "is-active" : ""}`} aria-hidden={k !== i}>
            <span className="quote-mark" aria-hidden>
              „
            </span>
            <blockquote>{r.text}</blockquote>
            <figcaption className="label">{r.name}</figcaption>
          </figure>
        ))}
      </div>
      <div className="dots">
        {reviews.map((r, k) => (
          <button key={r.name} aria-label={`Vélemény: ${r.name}`} aria-current={k === i} onClick={() => setI(k)} />
        ))}
      </div>
    </div>
  );
}
