// The homepage choreography for the dot-space background (kits/dot-space).
// Starfield → the carp the park is named after (potyka) → two wedding rings →
// "150", the guests the closable pavilion seats → a cabin from the park → black hole.
import { at, type SpaceStep } from "@/kits/dot-space/engine/core/space";
import { fromCanvas, rng, type Cloud } from "@/kits/dot-space/engine/core/shapes";

/** Dot colours on paper (accent, main, warm, secondary): dusty blue, gold, blush, sage. */
export const DOT_PALETTE = ["#8aa3b6", "#a3854f", "#cf9d92", "#9db6a8"];

/** Two interlocked rings in 3D, with a small stone set on top of the first one. */
export function rings(n: number): Cloud {
  const r = rng(11);
  const pos = new Float32Array(n * 3);
  const role = new Uint8Array(n);
  const R = 0.56, tube = 0.055;
  // a point on ring k (u around the ring, v around the band), tilted towards the viewer
  const ringPoint = (k: 0 | 1, u: number, v: number, lift = 0): [number, number, number] => {
    const x = (R + lift + tube * Math.cos(v)) * Math.cos(u);
    const y = (R + lift + tube * Math.cos(v)) * Math.sin(u);
    const z = tube * Math.sin(v);
    const tilt = k ? -0.95 : 0.95, ry = k ? 0.5 : -0.5;
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
    const z1 = y * Math.sin(tilt) + z * Math.cos(tilt);
    const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
    const z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    return [x2 + (k ? 0.36 : -0.36), y2 + (k ? -0.08 : 0.08), z2];
  };
  const stone = Math.floor(n * 0.08);
  for (let i = 0; i < n - stone; i++) {
    const k = (i % 2) as 0 | 1;
    const u = r() * Math.PI * 2;
    pos.set(ringPoint(k, u, r() * Math.PI * 2), i * 3);
    // a few glints on the near side of each band
    role[i] = Math.cos(u - (k ? 2.2 : 0.9)) > 0.93 ? 0 : 1;
  }
  // the stone: a small cut outline sitting on the top of the first ring
  const [sx, sy, sz] = ringPoint(0, Math.PI / 2, 0, 0.02);
  const outline = [
    [-0.085, 0.05], [-0.05, 0.11], [0.05, 0.11], [0.085, 0.05], [0, -0.02], [-0.085, 0.05], [0.085, 0.05],
  ];
  for (let i = n - stone; i < n; i++) {
    const k = Math.floor(r() * (outline.length - 1)), t = r();
    const [ax, ay] = outline[k], [bx, by] = outline[k + 1];
    pos.set([sx + ax + (bx - ax) * t, sy + ay + (by - ay) * t, sz], i * 3);
    role[i] = r() < 0.6 ? 0 : 1;
  }
  return { pos, role };
}

/** A log cabin of the park: gable roof, porch posts and its pointed-arch windows. */
export function cabin(n: number): Cloud {
  const cv = document.createElement("canvas");
  cv.width = 640;
  cv.height = 470;
  const c = cv.getContext("2d")!;
  c.lineCap = "round";
  c.lineJoin = "round";
  const stroke = (col: string, w: number, f: () => void) => {
    c.strokeStyle = col;
    c.lineWidth = w;
    c.beginPath();
    f();
    c.stroke();
  };
  const WALL = "#ffffff", ROOF = "#e8705a", WIN = "#f2e45c", GRASS = "#88e04a";
  // roof
  stroke(ROOF, 9, () => {
    c.moveTo(40, 190);
    c.lineTo(320, 40);
    c.lineTo(600, 190);
  });
  stroke(ROOF, 6, () => {
    c.moveTo(78, 176);
    c.lineTo(320, 58);
    c.lineTo(562, 176);
  });
  // walls and logs
  stroke(WALL, 7, () => {
    c.moveTo(100, 180);
    c.lineTo(100, 400);
    c.lineTo(540, 400);
    c.lineTo(540, 180);
  });
  for (let y = 214; y < 395; y += 30) stroke(WALL, 2.4, () => {
    c.moveTo(104, y);
    c.lineTo(536, y);
  });
  // porch posts and rail
  for (const x of [100, 245, 395, 540]) stroke(WALL, 7, () => {
    c.moveTo(x, 180);
    c.lineTo(x, 400);
  });
  // pointed-arch windows (like the cabins') and the door
  const arch = (x: number, y: number, w: number, h: number) => {
    c.moveTo(x, y + h);
    c.lineTo(x, y + w * 0.55);
    c.quadraticCurveTo(x, y + w * 0.1, x + w / 2, y);
    c.quadraticCurveTo(x + w, y + w * 0.1, x + w, y + w * 0.55);
    c.lineTo(x + w, y + h);
    c.closePath();
  };
  stroke(WIN, 6, () => arch(140, 236, 66, 96));
  stroke(WIN, 6, () => arch(434, 236, 66, 96));
  stroke(WALL, 6, () => arch(282, 226, 76, 174));
  // grass line
  stroke(GRASS, 5, () => {
    c.moveTo(10, 428);
    c.bezierCurveTo(200, 412, 440, 440, 630, 422);
  });
  return fromCanvas(cv, n, { size: 2.7, seed: 9 });
}

const WORD_FONT = (family: string) => `400 250px ${family}`;

export function homeSteps(displayFamily: string): SpaceStep[] {
  return [
    {
      anchor: "#udvozoljuk",
      shape: { image: "/art/carp-dots.png", size: 2.9 },
      wide: at(0.19, 0.6, 0.11, 0.3),
      narrow: at(0.5, 0.3, 0.26, 0.2),
    },
    {
      anchor: "#eskuvok",
      shape: { cloud: rings },
      wide: at(0.19, 0.6, 0.14, 0.3),
      narrow: at(0.5, 0.3, 0.34, 0.2),
    },
    {
      anchor: "#pavilon-cim",
      done: 0.5,
      shape: { word: "150", font: WORD_FONT(displayFamily) },
      wide: at(0.73, 0.5, 0.17, 0.32),
      narrow: at(0.5, 0.3, 0.36, 0.2),
    },
    {
      anchor: "#szallas",
      shape: { cloud: cabin },
      wide: at(0.8, 0.6, 0.1, 0.28),
      narrow: at(0.5, 0.3, 0.26, 0.2),
    },
    {
      anchor: "#ajanlatkeres",
      shape: "blackhole",
      wide: at(0.5, 0.5, 0.1, 0.1),
      narrow: at(0.5, 0.5, 0.1, 0.1),
    },
  ];
}
