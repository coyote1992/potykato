# dot-space

The dot background from the Gellért tennis site, packaged so Claude can put it on another site:
thousands of small dots float behind the page, gather into shapes as you scroll (a court, a
racket, the club's own year or emblem, a big spinning ball) and fall into a black hole at the
end. Subpages get a quiet starfield.

The look and motion are fixed (your approved preferences). What changes per site: which
shapes, where they stand, when they form, and how the page's content is arranged around them.

## How to use it

**Claude Code (recommended).** Copy this folder into the new project as a skill:

```
<project>/.claude/skills/dot-space/      ← the contents of this folder
```

Then, in that project, a one-line prompt is enough:

> Add the dot-space background to this site.

Claude reads `SKILL.md`, finds the site's own story (founding year, emblem, a number the club is
proud of), writes the choreography, restyles the site into the dark space theme, moves content
out of the shapes' way, and checks every stage with screenshots. Optional extras in the prompt:
"use the crest at /img/crest.svg as one shape", "the year should be 1978", "leave the subpages
light".

To have it available in every project, put the folder in `~/.claude/skills/dot-space/` instead.

**Claude on the web (claude.ai).** Upload `dot-space.zip` as a skill in Settings → Capabilities
(Skills), or attach the zip to the conversation and ask Claude to follow `SKILL.md`.

## What is inside

```
SKILL.md                    instructions Claude follows
reference/preferences.md    your approved look and motion, with the numbers
reference/recipe.md         how to choose, place and time shapes for a new site
reference/theme.md          how to turn a site into the dark "space" theme
reference/screenshots/      the approved result on Gellért
reference/examples/         Gellért's config, theme CSS and wiring
engine/                     the engine (TypeScript): core, React wrappers
dist/                       prebuilt dot-space.js (three.js included) + space.css, for plain HTML
theme/space.css             base CSS of the dark theme
check/stages.mjs            screenshots every stage, measures text under shapes
examples/plain.html         minimal plain-HTML page
```

## Rebuilding the bundle

After changing `engine/`, rebuild `dist/dot-space.js` from a project that has `three` and
`esbuild` installed: `node <path-to-kit>/engine/build.mjs`.
