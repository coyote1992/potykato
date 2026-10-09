// The "space" background: one dot field fixed behind the whole page. The content floats over it;
// as the visitor scrolls past chosen sections, the dots slowly reshape for each one.
import { createDotField, type DotFieldHandle, type Place, type ShapeSpec } from "./dot-field";
import { DEFAULTS, QUIET } from "./defaults";

/**
 * One shape in the sequence. Its ramp starts when `anchor`'s top is just below the viewport
 * (115%) and completes about one screen later. With `done`, the ramp instead completes when the
 * anchor's vertical centre reaches that fraction of the viewport (0.5 = mid-screen): use it to
 * time a shape to a heading.
 */
export type SpaceStep = {
  anchor: string;
  shape: ShapeSpec;
  /** Placement above 900 px wide, and below (phones, small tablets). */
  wide: Place;
  narrow: Place;
  /** Opacity for this shape; use about 0.85 for big shapes centred behind content. */
  alpha?: number;
  done?: number;
};

export type SpaceOptions = {
  /** The homepage choreography. Leave empty (or set quiet) for a starfield only. */
  steps?: SpaceStep[];
  quiet?: boolean;
  palette?: string[];
  font?: string;
  /** Where the fixed field goes; defaults to document.body. */
  parent?: HTMLElement;
  /** Skip drawing while true (e.g. a preloader). */
  paused?: () => boolean;
  /** "add" glows on dark pages (default); "normal" for light pages. */
  blend?: "add" | "normal";
  /** Overall dot opacity (default 0.62; the quiet field keeps its own). */
  alpha?: number;
};

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const at = (x: number, y: number, sw: number, sh = 0.3): Place => ({ x, y, sw, sh });

/** Mounts the field and adds `html.space` (the dark theme hook) if the page has not set it. */
export function mountSpace(opts: SpaceOptions = {}): DotFieldHandle {
  const quiet = opts.quiet || !opts.steps?.length;
  // a quiet field still needs one (never formed) shape
  const steps: SpaceStep[] = quiet ? [{ anchor: "body", shape: "ball", wide: at(0.5, 0.5, 0.2), narrow: at(0.5, 0.5, 0.3) }] : opts.steps!;
  const root = document.documentElement;
  const addedClass = !root.classList.contains("space");
  root.classList.add("space");

  const host = document.createElement("div");
  host.className = "space-field";
  host.setAttribute("aria-hidden", "true");
  (opts.parent ?? document.body).prepend(host);

  const stage = () => {
    if (quiet) return 0;
    const vh = innerHeight;
    let s = 0;
    for (const st of steps) {
      const el = document.querySelector(st.anchor);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (st.done !== undefined) s += clamp01((st.done * vh + vh - (r.top + r.height / 2)) / vh);
      else s += clamp01((1.15 * vh - r.top) / (1.1 * vh));
    }
    return s;
  };

  const field = createDotField(host, {
    shapes: steps.map((s) => s.shape),
    places: steps.map((s) => ({ wide: s.wide, narrow: s.narrow, alpha: s.alpha })),
    stage,
    palette: opts.palette ?? DEFAULTS.palette,
    font: opts.font ?? DEFAULTS.font,
    paused: opts.paused,
    blend: opts.blend ?? DEFAULTS.blend,
    ...(quiet ? QUIET : {}),
    ...(opts.alpha !== undefined ? { alpha: opts.alpha } : {}),
  });

  const handle: DotFieldHandle = {
    ...field,
    destroy() {
      field.destroy();
      host.remove();
      if (addedClass) root.classList.remove("space");
      if ((window as unknown as { __dotSpace?: unknown }).__dotSpace === api) delete (window as unknown as { __dotSpace?: unknown }).__dotSpace;
    },
  };
  // for check/stages.mjs: shape boxes and anchors, to measure overlap with text
  const label = (sh: ShapeSpec) => (typeof sh === "string" ? sh : "word" in sh ? sh.word : "image" in sh ? "image" : "custom");
  const api = {
    rects: field.rects,
    progress: field.progress,
    // big shapes centred behind the content (alpha < 1) may overlap text by design
    steps: quiet ? [] : steps.map((s) => ({ anchor: s.anchor, done: s.done, shape: label(s.shape), behind: (s.alpha ?? 1) < 1 || s.shape === "blackhole" })),
  };
  (window as unknown as { __dotSpace?: unknown }).__dotSpace = api;
  return handle;
}

export { at };
