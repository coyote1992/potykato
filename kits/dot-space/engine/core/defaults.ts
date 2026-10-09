// The approved look and motion. These are the client's preferences: keep them unless the
// client asks otherwise (see reference/preferences.md for what each one means and why).
export const DEFAULTS = {
  /** [desktop, phone ≤768 px]. Fewer than this and the shapes stop reading as solid forms. */
  count: [7000, 3000] as [number, number],
  /** accent, light, warm, secondary. Replace with the site's brand colours (light-on-dark). */
  palette: ["#e6e28c", "#f5f0e6", "#e5875a", "#c9d34f"],
  blend: "add" as "add" | "normal",
  /** Overall opacity: dots stay behind the content, never compete with text. */
  alpha: 0.62,
  /** 10% of the dots never join a shape: a starfield that is always there. */
  halo: 0.1,
  /** The loose starfield drifts past with the scroll, nearer (bigger) dots faster. */
  parallax: 0.25,
  /** The ball turns about once every 15 s. */
  ballSpin: 0.0004,
  /** The slow, lazy glide between shapes (fraction of the remaining way per ms). */
  pace: 0.0022,
  font: "italic 400 230px Georgia, serif",
};

/** The quieter field for pages without shapes: a third of the dots, dimmer. */
export const QUIET = { count: [2400, 1100] as [number, number], alpha: 0.5 };
