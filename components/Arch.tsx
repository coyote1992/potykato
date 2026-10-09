import type { PhotoKey } from "@/lib/images";
import { Img } from "./Photo";

// The pointed arch of the park's own cabin windows, in 0..1 box units.
export const ARCH_PATH = "M0,1 L0,0.37 C0,0.2 0.2,0.05 0.5,0 C0.8,0.05 1,0.2 1,0.37 L1,1 Z";
const INNER = "M0.04,0.975 L0.04,0.38 C0.04,0.225 0.22,0.09 0.5,0.045 C0.78,0.09 0.96,0.225 0.96,0.38 L0.96,0.975 Z";

/** Defines the clip path once per page (rendered in the root layout). */
export function ArchDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <defs>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}

type Wash = "blush" | "sage" | "sand";

export function Arch({
  name,
  wash,
  focus,
  className = "",
  sizes = "(max-width: 900px) 78vw, 300px",
}: {
  name: PhotoKey;
  wash?: Wash;
  focus?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={`arch ${className}`} data-reveal="fade">
      {wash && <img className="arch__wash" src={`/art/wc-${wash}.webp`} alt="" aria-hidden loading="lazy" />}
      <div className="arch__clip">
        <Img name={name} sizes={sizes} focus={focus} />
      </div>
      <svg className="arch__line" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden>
        <path d={ARCH_PATH} />
        <path d={INNER} />
      </svg>
    </div>
  );
}
