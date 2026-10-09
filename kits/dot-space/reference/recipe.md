# Recipe: the site-specific choreography

The homepage gets a short sequence of steps. Each step names the section (anchor) that brings
a shape, the shape, and where it stands on the screen. The field starts as a starfield, forms
each shape in turn as the visitor scrolls, and ends in a black hole.

```ts
import { at, type SpaceStep } from "<kit>/engine";
// at(x, y, sw, sh): centre at x·width, y·height of the viewport;
// scale (px per shape unit) = min(width·sw, height·sh)
const phone = at(0.5, 0.3, 0.34, 0.2);

export const HOME_STEPS: SpaceStep[] = [
  { anchor: "#courts", shape: "courtLines", wide: at(0.84, 0.64, 0.12, 0.3), narrow: phone },
  { anchor: "#booking", shape: "racket", wide: at(0.515, 0.62, 0.1, 0.28), narrow: phone },
  { anchor: "#history-title", done: 0.5, shape: { word: "1996" }, wide: at(0.7, 0.5, 0.2, 0.3), narrow: at(0.5, 0.42, 0.34, 0.2) },
  { anchor: "#school", shape: "ball", wide: at(0.5, 0.5, 0.24, 0.42), narrow: at(0.5, 0.45, 0.42, 0.3), alpha: 0.85 },
  { anchor: ".final", shape: "blackhole", wide: at(0.5, 0.5, 0.1, 0.1), narrow: at(0.5, 0.5, 0.1, 0.1) },
];
```

The engine supports up to 6 steps, and 4–5 is the sweet spot. Static shapes (everything except
`ball` and `blackhole`) can be at most 5.

## 1. Choose the shapes

The arc: **starfield → recognisable tennis shapes → one shape that is this club's own → the
big spinning ball → black hole.**

| Shape | Use for | Default size (`sw`, `sh`) |
|---|---|---|
| `"courtLines"` | the courts section | 0.12, 0.3 |
| `"racket"` | booking, lessons, equipment hire | 0.10, 0.28 |
| `{ word: "…" }` | **the site-specific moment**: founding year, a number the club is proud of (courts, members, titles), or initials. Keep it to 2–6 characters. It is set in the site's display font (pass `font`, e.g. `'italic 400 230px "Playfair Display", serif'`). | 0.20, 0.30 |
| `{ image: "/logo.svg" }` | a silhouette from the site: the club's crest, a trophy, the clubhouse outline. Use a transparent PNG or SVG; dark-on-light images work too. | about 0.15, 0.3 |
| `"ball"` | a section with breathing room, near the end; always large, centred, `alpha: 0.85` | 0.24, 0.42 |
| `"blackhole"` | the last step, on the final call-to-action or contact section | 0.1, 0.1 (centre only) |
| `{ cloud: fn }` | anything else, from your own point generator (see `fromCanvas` in `core/shapes.ts`) | |

The site-specific moment matters most for "native" feel. Pick the fact the homepage is proud
of (Gellért: "Itt Davis Kupát játszottak" → `1996`, the year the centre opened), and anchor it
to that fact's heading with `done: 0.5`, so it completes when the heading is mid-screen. Other
sports: keep the arc and swap the tennis shapes for `image` silhouettes (a padel racket, a
golf flag), but ask the user first.

## 2. Anchor and time them

- Anchor each step to the section where the shape belongs. Use an existing `id`, or add one.
- Default timing: the shape starts forming as its section's top comes up from the bottom of
  the screen, and completes about one screen later.
- For the moment shape, anchor to the **heading** and add `done: 0.5`.
- **Anchors must be at least ~1.3 screens apart**, or the next shape starts before the
  previous one has formed and the two blend into a blob. The checker reports this as
  `NOT FULLY FORMED`. If sections are short, skip one or anchor to a later element.
- A shape stays until the next step begins, so it is visible while the visitor scrolls on.
  Plan its position for the whole stretch, not just the moment it forms.

## 3. Place them (desktop, > 900 px)

Positions are fixed to the viewport, not to the page: the content scrolls past a standing
shape. So place each shape in a **column the section leaves empty**, at a height where it
looks deliberate:

- Measure the section's layout at 1440×900 with the page scrolled to where the step completes
  (the checker's screenshots show exactly this). Find the free area: a side column, the gap
  between a text column and a card, the space beside a heading.
- `x` = the free area's centre ÷ viewport width; `y` = its centre ÷ viewport height.
- Size: the default sizes above suit a 1440×900 viewport. If the gap is narrower, reduce `sw`
  a little, but keep shapes at least at the default size × 0.8, or they read as noise.
- Alternate sides between steps (Gellért: court right, racket centre-right between the steps
  and the phone card, year right of its heading).
- Big centred shapes (`ball`) are the exception: they sit **behind** the content at
  `alpha: 0.85`; overlap is intended there.

## 4. Move content, not dots

If no free area exists, or the checker reports overlap, change the layout around the shape:

- Narrow the section's content to the left ~70% while a shape stands on the right. Gellért
  does this for the courts and Proflex sections:
  ```css
  @media (min-width: 901px) {
    html.space :is(#courts, #surface) > .container {
      max-width: none;
      padding-left: max(var(--gutter), calc((100vw - var(--max)) / 2));
      padding-right: 30vw;
    }
  }
  ```
- Move a card or image to the other column, or put two columns into one with the shape beside.
- Add vertical breathing room above a heading so the shape forms in it.
- Never move, shrink or fade the shape to dodge text: the client explicitly preferred the text
  to move.

## 5. Phones (≤ 900 px)

A shape standing still while text scrolls past will always cross some text on a narrow
screen. Use the defaults (`at(0.5, 0.3, 0.34, 0.2)` for most shapes) so the shape sits in the
top third, scale words down so they fit the width (`sw` about 0.3–0.36), and keep the big
shapes centred. Report phone overlaps to the user; do not rearrange phone layouts unless asked.

## 6. Subpages

They get the quiet starfield only: the same dark theme, no steps (`<DotSpace />` without
`steps`, or `mountSpace()`).

## Checklist

- [ ] 4–5 steps, ending in `blackhole`; one site-specific shape tied to a real fact
- [ ] the moment shape uses `done: 0.5` on its heading and sits beside it
- [ ] the checker reports desktop `clear` (or a few per cent) for every non-"behind" shape
- [ ] the checker reports no `NOT FULLY FORMED`
- [ ] the court is `courtLines`, not `court`
- [ ] subpages show the quiet starfield; no light flash on load or navigation
