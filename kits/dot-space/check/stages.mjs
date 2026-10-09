// Visits a page that runs dot-space, steps through every shape, and for each one:
//   - scrolls to where the shape is fully formed and screenshots it (desktop and phone)
//   - measures which lines of text the shape's box covers
// Usage: node check/stages.mjs http://localhost:3000/ [--out ./dot-space-check] [--sizes 1440x900,390x844]
// Needs Playwright with Chromium (npx playwright install chromium, if it is not there yet).
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000/";
const opt = (name, def) => {
  const i = args.indexOf("--" + name);
  return i >= 0 ? args[i + 1] : def;
};
const out = opt("out", "./dot-space-check");
const sizes = opt("sizes", "1440x900,390x844").split(",").map((s) => s.split("x").map(Number));
mkdirSync(out, { recursive: true });

const require = createRequire(import.meta.url);
let pw;
for (const p of ["playwright", "@playwright/test", process.env.PLAYWRIGHT_PATH, "/opt/node22/lib/node_modules/playwright"].filter(Boolean)) {
  try {
    pw = require(p);
    break;
  } catch {}
}
if (!pw) throw new Error("Playwright not found: npm i -D playwright && npx playwright install chromium");

const browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const report = [];

for (const [W, H] of sizes) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "load" });
  // walk the page once so lazy content settles, then wait for the engine
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    scrollTo(0, 0);
  });
  await page.waitForFunction(() => window.__dotSpace && window.__dotSpace.rects().length > 0, null, { timeout: 20000 }).catch(() => {});
  const steps = await page.evaluate(() => window.__dotSpace?.steps ?? []);
  if (!steps.length) {
    report.push({ size: `${W}x${H}`, error: "no window.__dotSpace steps: is mountSpace running with steps on this page?", errors });
    continue;
  }
  await page.screenshot({ path: join(out, `${W}x${H}-0-start.png`) });

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    // scroll to where step i is complete (see core/space.ts for the ramp formula)
    for (let k = 0; k < 2; k++) {
      await page.evaluate(({ anchor, done }) => {
        const el = document.querySelector(anchor);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const target = done !== undefined && done !== null ? r.top + r.height / 2 - done * innerHeight : r.top - 0.03 * innerHeight;
        scrollTo(0, scrollY + target);
      }, s);
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(2800); // the glide is slow on purpose
    const m = await page.evaluate((i) => {
      const progress = window.__dotSpace.progress();
      const box = window.__dotSpace.rects()[i];
      if (!box) return { box: null, hits: [], progress };
      const hits = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let area = 0;
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        if (!n.textContent.trim()) continue;
        const pe = n.parentElement;
        if (!pe || pe.closest(".space-field, [aria-hidden='true'], script, style, noscript")) continue;
        const cs = getComputedStyle(pe);
        if (cs.visibility === "hidden" || Number(cs.opacity) < 0.05) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        for (const r of range.getClientRects()) {
          const x0 = Math.max(r.left, box.left), x1 = Math.min(r.right, box.right);
          const y0 = Math.max(r.top, box.top), y1 = Math.min(r.bottom, box.bottom);
          if (x1 - x0 > 2 && y1 - y0 > 2 && r.bottom > 0 && r.top < innerHeight) {
            area += (x1 - x0) * (y1 - y0);
            hits.push(n.textContent.trim().slice(0, 50));
          }
        }
      }
      const shapeArea = Math.max(1, (box.right - box.left) * (box.bottom - box.top));
      return { box, hits: [...new Set(hits)], covered: area / shapeArea, progress };
    }, i);
    const file = `${W}x${H}-${i + 1}-${String(s.shape).replace(/[^a-z0-9]+/gi, "")}.png`;
    await page.screenshot({ path: join(out, file) });
    report.push({
      size: `${W}x${H}`,
      step: i + 1,
      anchor: s.anchor,
      shape: s.shape,
      behind: s.behind,
      // the shape is fully formed only if the field is at stage i + 1 here; otherwise the next
      // anchor starts too early (anchors closer than ~1.3 screens) and the shapes blend
      formed: Math.abs(m.progress - (i + 1)) < 0.08,
      stage: Math.round(m.progress * 100) / 100,
      textLinesUnderShape: m.hits.length,
      coveredShare: m.covered === undefined ? null : Math.round(m.covered * 1000) / 10 + "%",
      examples: m.hits.slice(0, 4),
      screenshot: file,
    });
  }
  if (errors.length) report.push({ size: `${W}x${H}`, errors });
  await page.close();
}
await browser.close();

writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
for (const r of report) {
  if (r.error || r.errors) {
    console.log(r.size, r.error ?? "", (r.errors ?? []).join(" | "));
    continue;
  }
  const flag = r.behind ? "behind (overlap allowed)" : r.textLinesUnderShape === 0 ? "clear" : `OVERLAPS ${r.textLinesUnderShape} text line(s), ${r.coveredShare} of the shape`;
  const formed = r.formed ? "" : `  NOT FULLY FORMED (stage ${r.stage}, expected ${r.step}): move anchors further apart`;
  console.log(`${r.size}  step ${r.step} ${r.shape} @ ${r.anchor}: ${flag}${formed}${r.examples?.length && !r.behind ? "  e.g. " + JSON.stringify(r.examples.slice(0, 2)) : ""}`);
}
console.log(`screenshots + report.json in ${out}`);
