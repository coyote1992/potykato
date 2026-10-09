# Approved preferences (fixed)

These came out of many rounds of feedback on the Gellért tennis site. The engine's defaults
(`engine/core/defaults.ts`) already encode them, so the site needs no extra settings. Keep
them unless the user explicitly asks for a change.

## Concept

- The dots are **behind everything**. The page's content is in the foreground "as if it were
  in space"; cards are frosted glass the dots show through. The feeling comes from thedent.ai's
  ambient background.
- The background is **one fixed field for the whole page**, not a section of its own. As the
  visitor **scrolls gently**, the dots change shape for certain sections, slowly.
- Every page is dark. The homepage has the shapes; **subpages have a quiet starfield** (a third
  of the dots, dimmer), so moving between pages never jumps from dark to light.

## Dots

| What | Value | Why |
|---|---|---|
| Rendering | WebGL (three.js), points in a vertex shader | The 2D-canvas version with fewer dots felt sluggish. |
| Count | 7,000 desktop, 3,000 phones (≤768 px) | The client asked for 7,000. Phones need at least ~1,100 for shapes to read; 3,000 keeps them crisp. |
| Subpages | 2,400 / 1,100, opacity 0.5 | "Quiet starfield". |
| Size | radius 0.75–2.1 px, crisp edge, soft falloff | "Fewer, bigger dots" than a fog of particles. |
| Colours | four brand colours: accent, light, warm, secondary; additive blending on dark | Shapes use the roles (lines light, strings accent, grip warm). |
| Opacity | 0.62 overall; twinkle 0.34–0.82 per dot | The dots never compete with text. |
| Starfield | 10% of the dots never join a shape | There are always stars. |
| Drift | every dot wanders slowly; loose dots more (up to ~15 px), shaped dots only breathe (~3 px) | "They move around." |
| Parallax | loose dots drift with the scroll, bigger (nearer) dots faster | Depth. |

## Motion

| What | Value | Why |
|---|---|---|
| Pace | the field closes 0.22% of the remaining distance per ms (`pace: 0.0022`) | "Reorganise a bit slower"; the client confirmed "pace is perfect". |
| Glide | each dot moves with its own delay (0–25% of the transition) | Organic gathering rather than a block move. |
| Step ramp | starts as the section's top is just below the viewport and completes about one screen later | The shape is formed as the section arrives. |
| Moment shapes | a step can complete exactly when a heading reaches mid-screen (`done: 0.5`) | "1996 fully formed by the time the Davis Kupa title is in the middle". |
| Ball | turns in 3D about once every 15 s | "Large and spinning." |
| Ending | the last shape's dots spiral into one point and vanish; the stars stay | "Like a black hole." No name or logo at the end. |

## Cursor

- Dots near the cursor slide out of its way inside a **small circle** (about 100 px across on
  a laptop, scaling a little with the screen). They drift back when the cursor moves on; the
  gap fades rather than snapping shut. Works with touch.
- Rejected alternatives: an oval (screen-stretched) area, a larger area, and pushing the whole
  shape away.

## Shapes the client liked

- **Court**: lines and net only (`"courtLines"`). The version with the darker clay-field dots
  was rejected.
- **Racket**: "perfect" as it is.
- **A number or year** set in the site's display font, placed **beside** its heading, at the
  heading's own height (not centred on the page, not in the upper third).
- **Ball**: large, centred, faint (alpha 0.85), spinning, behind the content.
- **Black hole** to finish.
- Rejected: the serving player (skipped), the club name as a final shape, a light (cream)
  page, big faint shapes everywhere, and shapes that follow page elements.
