"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PhotoKey } from "@/lib/images";
import { StarArrow } from "./Icons";
import { Img } from "./Photo";

export type Venue = { photo: PhotoKey; name: string; text: string; focus?: string };

/** The places of the day, one at a time: a slow cross-fade, arrows, swipe and dots. */
export function VenueSlider({ venues, label = "További helyszínek" }: { venues: Venue[]; label?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const n = venues.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(1), 6500);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  return (
    <div
      className="slider"
      role="region"
      aria-roledescription="képváltó"
      aria-label="Helyszínek a parkban"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="slider__viewport"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        {venues.map((v, k) => (
          <div
            key={v.photo}
            className={`slider__slide ${k === i ? "is-active" : ""}`}
            aria-hidden={k !== i}
            role="group"
            aria-roledescription="dia"
            aria-label={`${k + 1} / ${n}: ${v.name}`}
          >
            <Img name={v.photo} sizes="100vw" focus={v.focus} />
          </div>
        ))}
        <p className="slider__caption" aria-live="polite">
          {venues[i].text}
        </p>
        <div className="slider__label">
          <span className="ticket ticket--paper ticket--sm">{venues[i].name}</span>
        </div>
        <button className="slider__arrow slider__arrow--prev" aria-label="Előző helyszín" onClick={() => go(-1)}>
          <StarArrow flip />
        </button>
        <button className="slider__arrow slider__arrow--next" aria-label="Következő helyszín" onClick={() => go(1)}>
          <StarArrow />
        </button>
      </div>
      <div className="slider__foot">
        <div className="dots">
          {venues.map((v, k) => (
            <button key={v.photo} aria-label={v.name} aria-current={k === i} onClick={() => setI(k)} />
          ))}
        </div>
        <span className="label">{label}</span>
      </div>
    </div>
  );
}
