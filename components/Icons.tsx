import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const Sparkle = (p: P) => (
  <svg viewBox="0 0 20 20" aria-hidden {...p}>
    <path d="M10 0C10.6 6.4 13.6 9.4 20 10 13.6 10.6 10.6 13.6 10 20 9.4 13.6 6.4 10.6 0 10 6.4 9.4 9.4 6.4 10 0Z" fill="currentColor" />
  </svg>
);

/** A long line ending in a four-point star: the slider arrows. */
export const StarArrow = ({ flip, ...p }: P & { flip?: boolean }) => (
  <svg viewBox="0 0 40 40" aria-hidden {...p} style={{ transform: flip ? "scaleX(-1)" : undefined, ...p.style }}>
    <path d="M3 20h22" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <path d="M27 9c.5 6.8 3.2 10.4 10 11-6.8.6-9.5 4.2-10 11-.5-6.8-3.2-10.4-10-11 6.8-.6 9.5-4.2 10-11Z" fill="currentColor" />
  </svg>
);

export const Arrow = (p: P) => (
  <svg viewBox="0 0 22 10" aria-hidden {...p}>
    <path d="M0 5h20M16 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const ArrowDown = (p: P) => (
  <svg viewBox="0 0 12 16" aria-hidden {...p}>
    <path d="M6 0v15M1 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Menu = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Pin = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="12" cy="9.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Facebook = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" fill="currentColor" />
  </svg>
);

export const TikTok = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.5a7 7 0 0 1-3.8-1.2v5.6c0 3.5-2.5 6.3-6 6.3a5.8 5.8 0 0 1-5.9-5.8c0-3.4 2.8-6 6.4-5.8v2.6c-1.8-.3-3.6.9-3.6 3.1 0 1.8 1.4 3.2 3.1 3.2 1.9 0 3.1-1.4 3.1-3.4V3h2.8Z"
      fill="currentColor"
    />
  </svg>
);

export const Sound = ({ on, ...p }: P & { on?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4v-5Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    {on ? (
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.3" />
    ) : (
      <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="1.3" />
    )}
  </svg>
);
