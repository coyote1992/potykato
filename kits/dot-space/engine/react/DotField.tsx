"use client";

import { useEffect, useRef } from "react";
import { createDotField, type DotFieldOptions } from "../core/dot-field";

/**
 * A dot field inside a box of your own (for a pinned section rather than the page background).
 * Options are read once on mount; `stage` and `onFrame` may change between renders.
 */
export function DotField({ className, ...options }: DotFieldOptions & { className?: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const live = useRef(options);
  live.current = options;
  useEffect(() => {
    const h = createDotField(holder.current!, {
      ...live.current,
      stage: () => live.current.stage(),
      onFrame: (p) => live.current.onFrame?.(p),
    });
    return () => h.destroy();
  }, []);
  return <div ref={holder} className={className} aria-hidden />;
}
