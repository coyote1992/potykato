"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TONES: Record<string, string> = {
  cream: "#f2eee4",
  blush: "#f0e2db",
  sky: "#d9e3e8",
  sage: "#e1e8e2",
  sand: "#f2ebdd",
};

/**
 * One controller for the page's quiet motion:
 *  - [data-reveal] elements fade up as they enter,
 *  - [data-parallax="0.08"] decorations drift against the scroll,
 *  - [data-tone] sections tint the paper backdrop while they hold the middle of the screen.
 */
export function Motion() {
  const path = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const backdrop = document.querySelector<HTMLElement>(".backdrop");

    // reveals
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const reveals = document.querySelectorAll("[data-reveal]");
    reveals.forEach((el) => (reduce ? el.classList.add("is-in") : io.observe(el)));

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const tones = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    let raf = 0;
    let current = "";

    const update = () => {
      raf = 0;
      const vh = innerHeight;
      if (!reduce) {
        for (const el of parallax) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const speed = parseFloat(el.dataset.parallax || "0.08");
          const d = r.top + r.height / 2 - vh / 2;
          el.style.transform = `translate3d(0, ${(-d * speed).toFixed(1)}px, 0)`;
        }
      }
      // the section across the middle of the screen sets the paper tone
      let tone = "cream";
      for (const s of tones) {
        const r = s.getBoundingClientRect();
        if (r.top <= vh * 0.55 && r.bottom >= vh * 0.45) {
          tone = s.dataset.tone || "cream";
          break;
        }
      }
      if (tone !== current && backdrop) {
        current = tone;
        backdrop.style.backgroundColor = TONES[tone] ?? TONES.cream;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [path]);

  return null;
}
