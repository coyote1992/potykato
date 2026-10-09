// Point clouds the dots can form. Every shape returns exactly `n` points (world units, about
// -1.6..1.6, y up) and a colour role per point:
//   0 accent (e.g. lime strings, highlights)  1 light (lines, frames, letters)
//   2 warm (e.g. clay, grip)                  3 secondary (e.g. felt)
// Roles map to the four palette colours, so every shape adopts the site's brand colours.

export type Role = 0 | 1 | 2 | 3;
export type Cloud = { pos: Float32Array; role: Uint8Array };

export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

class Builder {
  pos: Float32Array;
  role: Uint8Array;
  i = 0;
  constructor(public n: number) {
    this.pos = new Float32Array(n * 3);
    this.role = new Uint8Array(n);
  }
  push(x: number, y: number, z: number, role: Role) {
    if (this.i >= this.n) return;
    this.pos.set([x, y, z], this.i * 3);
    this.role[this.i++] = role;
  }
  /** Fill any remainder by repeating random existing points (the count stays fixed). */
  done(r: () => number): Cloud {
    const filled = Math.max(1, this.i);
    while (this.i < this.n) {
      const j = Math.floor(r() * filled);
      this.push(this.pos[j * 3] + (r() - 0.5) * 0.01, this.pos[j * 3 + 1] + (r() - 0.5) * 0.01, this.pos[j * 3 + 2], this.role[j] as Role);
    }
    return { pos: this.pos, role: this.role };
  }
}

/** A racket standing upright: oval frame, a light string bed, throat, shaft and grip. */
export function racket(n: number): Cloud {
  const r = rng(2);
  const b = new Builder(n);
  const cy = 0.42, a = 0.42, e = 0.54;
  const frame = n * 0.44, strings = n * 0.2, throat = n * 0.13;
  for (let i = 0; i < frame; i++) {
    const t = r() * Math.PI * 2, rr = 1 + (r() - 0.5) * 0.07;
    b.push(Math.cos(t) * a * rr, cy + Math.sin(t) * e * rr, (r() - 0.5) * 0.06, i % 9 === 0 ? 2 : 1);
  }
  const mains = 8, crosses = 10;
  for (let i = 0; i < strings; i++) {
    if (r() < 0.47) {
      const x = -a + ((Math.floor(r() * mains) + 0.5) / mains) * 2 * a;
      const h = e * Math.sqrt(Math.max(0, 1 - (x / a) ** 2));
      b.push(x, cy + (r() * 2 - 1) * h * 0.97, 0, 0);
    } else {
      const y = -e + ((Math.floor(r() * crosses) + 0.5) / crosses) * 2 * e;
      const w = a * Math.sqrt(Math.max(0, 1 - (y / e) ** 2));
      b.push((r() * 2 - 1) * w * 0.97, cy + y, 0, 0);
    }
  }
  const t0 = -Math.PI / 2 - 0.85, t1 = -Math.PI / 2 + 0.85;
  for (let i = 0; i < throat; i++) {
    const side = r() < 0.5 ? t0 : t1, u = r();
    const sx = Math.cos(side) * a, sy = cy + Math.sin(side) * e;
    const ex = Math.sign(sx) * 0.03, ey = -0.42;
    b.push(sx + (ex - sx) * (1 - (1 - u) ** 2) + (r() - 0.5) * 0.03, sy + (ey - sy) * u, (r() - 0.5) * 0.05, 1);
  }
  while (b.i < n) {
    const y = -0.42 - r() * 0.66, grip = y < -0.6, w = grip ? 0.07 : 0.045, th = r() * Math.PI * 2;
    b.push(Math.cos(th) * w * 0.5, y, Math.sin(th) * w * 0.5, grip ? 2 : 1);
  }
  return b.done(r);
}

/**
 * A court in perspective with real proportions (23.77 x 10.97 m, service line 6.40 m, net
 * 0.914 m / 1.07 m at the posts). `field: false` keeps only the white lines and the net.
 */
export function court(n: number, field = true): Cloud {
  const r = rng(4);
  const b = new Builder(n);
  const L = 2.7 / 23.77;
  const hw = (10.97 / 2) * L, hs = (8.23 / 2) * L, hl = (23.77 / 2) * L, sv = 6.4 * L;
  const lines: [number, number, number, number][] = [
    [-hw, -hl, hw, -hl], [-hw, hl, hw, hl], [-hw, -hl, -hw, hl], [hw, -hl, hw, hl],
    [-hs, -hl, -hs, hl], [hs, -hl, hs, hl], [-hs, -sv, hs, -sv], [-hs, sv, hs, sv], [0, -sv, 0, sv],
    [0, -hl, 0, -hl + 0.15 * L * 2], [0, hl, 0, hl - 0.15 * L * 2],
  ];
  const lens = lines.map(([x0, z0, x1, z1]) => Math.hypot(x1 - x0, z1 - z0));
  const tot = lens.reduce((s, v) => s + v, 0);
  const nl = n * (field ? 0.64 : 0.74);
  for (let i = 0; i < nl; i++) {
    let u = r() * tot, k = 0;
    while (u > lens[k] && k < lens.length - 1) u -= lens[k++];
    const [x0, z0, x1, z1] = lines[k], t = u / lens[k];
    b.push(x0 + (x1 - x0) * t + (r() - 0.5) * 0.012, 0, z0 + (z1 - z0) * t + (r() - 0.5) * 0.012, 1);
  }
  const nn = n * (field ? 0.2 : 0.23), ext = hw + 0.914 * L;
  const top = (x: number) => (0.914 + (1.07 - 0.914) * (Math.abs(x) / ext) ** 2) * L * 1.6;
  for (let i = 0; i < nn; i++) {
    const x = (r() * 2 - 1) * ext, grid = r() < 0.5;
    const y = grid ? Math.round((r() * top(x)) / 0.03) * 0.03 : r() * top(x);
    b.push(grid ? x : Math.round(x / 0.03) * 0.03, Math.min(y, top(x)), 0, 1);
  }
  for (let i = 0; i < n * 0.03; i++) {
    const x = (r() * 2 - 1) * ext;
    b.push(x, top(x), 0, 1);
  }
  while (field && b.i < n) b.push((r() * 2 - 1) * (hw + 0.35), -0.005, (r() * 2 - 1) * (hl + 0.4), 2);
  const out = b.done(r);
  // tilt towards the viewer
  const a = 0.62, ca = Math.cos(a), sa = Math.sin(a);
  for (let i = 0; i < n; i++) {
    const y = out.pos[i * 3 + 1], z = out.pos[i * 3 + 2];
    out.pos[i * 3 + 1] = y * ca - z * sa - 0.05;
    out.pos[i * 3 + 2] = y * sa + z * ca;
  }
  return out;
}

/** Nearest colour role for a sampled pixel (used by canvas and image shapes). */
export function roleOf(r: number, g: number, b: number): Role {
  if (r > 0.7 && g < 0.75 && b < 0.65 && r - g > 0.12) return 2;
  if (b < 0.62 && g > 0.7) return r > 0.8 ? 0 : 3;
  return 1;
}

/**
 * Sample a drawing: every opaque pixel is a candidate point. `size` is the shape's width in
 * world units (about 2.6 fills the place like the other shapes). `role` fixes the colour role,
 * otherwise it is taken from each pixel's colour.
 */
export function fromCanvas(cv: HTMLCanvasElement, n: number, opts: { size?: number; depth?: number; seed?: number; role?: (r: () => number) => Role } = {}): Cloud {
  const { size = 2.6, depth = 0.08, seed = 7 } = opts;
  const r = rng(seed);
  const c = cv.getContext("2d")!;
  const { width: W, height: H } = cv;
  const d = c.getImageData(0, 0, W, H).data;
  const px: number[] = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 140) px.push(x, y);
  const b = new Builder(n);
  const cnt = px.length / 2, scale = size / W;
  for (let i = 0; i < n && cnt; i++) {
    const k = Math.floor(r() * cnt) * 2;
    const o = (px[k + 1] * W + px[k]) * 4;
    const role = opts.role ? opts.role(r) : roleOf(d[o] / 255, d[o + 1] / 255, d[o + 2] / 255);
    b.push((px[k] + r() - 0.5 - W / 2) * scale, -(px[k + 1] + r() - 0.5 - H / 2) * scale, (r() - 0.5) * depth, role);
  }
  return b.done(r);
}

/** A word or number in the site's display font, light dots with a few accent ones. */
export async function word(n: number, text: string, font = "italic 400 230px Georgia, serif"): Promise<Cloud> {
  try {
    await document.fonts.load(font, text);
  } catch {}
  const cv = document.createElement("canvas");
  const c = cv.getContext("2d")!;
  c.font = font;
  const w = Math.ceil(c.measureText(text).width) + 80;
  cv.width = Math.max(900, w);
  cv.height = 300;
  c.font = font;
  c.fillStyle = "#fff";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText(text, cv.width / 2, 150);
  return fromCanvas(cv, n, { size: 0.0034 * cv.width, depth: 0.06, seed: 6, role: (r) => (r() < 0.12 ? 0 : 1) });
}

/**
 * Any silhouette from an image (a club logo, a trophy, the outline of a building). Transparent
 * pixels are ignored; on an opaque image, dark pixels on a light background are used instead.
 */
export async function image(n: number, src: string, opts: { size?: number; role?: Role } = {}): Promise<Cloud> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;
  await img.decode();
  const cv = document.createElement("canvas");
  const s = Math.min(1, 600 / Math.max(img.naturalWidth, img.naturalHeight));
  cv.width = Math.round(img.naturalWidth * s);
  cv.height = Math.round(img.naturalHeight * s);
  const c = cv.getContext("2d")!;
  c.drawImage(img, 0, 0, cv.width, cv.height);
  const data = c.getImageData(0, 0, cv.width, cv.height);
  const d = data.data;
  let opaque = 0;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 250) opaque++;
  if (opaque > (d.length / 4) * 0.95) {
    // no transparency: keep the dark marks
    for (let i = 0; i < d.length; i += 4) d[i + 3] = (d[i] + d[i + 1] + d[i + 2]) / 3 < 128 ? 255 : 0;
    c.putImageData(data, 0, 0);
  }
  const fixed = opts.role;
  return fromCanvas(cv, n, { size: opts.size ?? 2.4, role: fixed === undefined ? undefined : () => fixed });
}
