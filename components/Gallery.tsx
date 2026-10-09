"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { photos, type PhotoKey } from "@/lib/images";
import { Close, StarArrow } from "./Icons";

const CATS = [
  { id: "all", label: "Mind" },
  { id: "eskuvo", label: "Esküvő" },
  { id: "pavilon", label: "Pavilonok és terasz" },
  { id: "to", label: "A tó" },
  { id: "fahazak", label: "Faházak" },
  { id: "park", label: "A park" },
  { id: "muzeum", label: "Múzeum és kápolna" },
] as const;

const ALL = (Object.keys(photos) as PhotoKey[]).filter((k) => photos[k].cat);
const largest = (k: PhotoKey) => {
  const w: readonly number[] = photos[k].widths;
  return w[w.length - 1];
};

export function Gallery() {
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const touch = useRef<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const list = useMemo(() => (cat === "all" ? ALL : ALL.filter((k) => photos[k].cat === cat)), [cat]);

  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [open, go, close]);

  const current = open !== null ? list[open] : null;

  return (
    <>
      <div className="filters" role="group" aria-label="Szűrés">
        {CATS.map((c) => (
          <button key={c.id} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="masonry">
        {list.map((k, i) => {
          const p = photos[k];
          const w: readonly number[] = p.widths;
          return (
            <button
              key={k}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Nagyítás: ${p.alt}`}
            >
              <img
                src={`/img/${k}-${w[0]}.webp`}
                srcSet={w.filter((x) => x <= 960).map((x) => `/img/${k}-${x}.webp ${x}w`).join(", ")}
                sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px"
                width={p.w}
                height={p.h}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                style={{ backgroundColor: p.color }}
              />
            </button>
          );
        })}
      </div>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[current].alt}
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <button ref={closeBtn} className="icon-btn lightbox__close" aria-label="Bezárás" onClick={close}>
            <Close />
          </button>
          <img
            key={current}
            src={`/img/${current}-${largest(current)}.webp`}
            alt={photos[current].alt}
            width={photos[current].w}
            height={photos[current].h}
          />
          <div className="lightbox__bar">
            <button className="icon-btn" aria-label="Előző kép" onClick={() => go(-1)}>
              <StarArrow flip style={{ width: 34, height: 34 }} />
            </button>
            <span>
              {photos[current].alt} · {(open ?? 0) + 1} / {list.length}
            </span>
            <button className="icon-btn" aria-label="Következő kép" onClick={() => go(1)}>
              <StarArrow style={{ width: 34, height: 34 }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
