import { photos, type PhotoKey } from "@/lib/images";

type Props = {
  name: PhotoKey;
  sizes?: string;
  className?: string;
  alt?: string;
  priority?: boolean;
  /** object-position, e.g. "50% 70%" */
  focus?: string;
};

/** A responsive photo from the optimized set in public/img (see scripts/optimize-images.py). */
export function Img({ name, sizes = "100vw", className, alt, priority, focus }: Props) {
  const p = photos[name];
  const widths: readonly number[] = p.widths;
  const largest = widths[widths.length - 1];
  const mid = widths.find((w) => w >= 960) ?? largest;
  return (
    <img
      src={`/img/${name}-${mid}.webp`}
      srcSet={widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
      style={{ backgroundColor: p.color, objectPosition: focus }}
    />
  );
}

/** A photo in a cropping box (the box sets the shape, the photo covers it). */
export function Photo({ className = "", reveal = true, ...props }: Props & { reveal?: boolean }) {
  return (
    <div className={`photo ${reveal ? "photo--reveal" : ""} ${className}`} data-reveal={reveal ? "fade" : undefined}>
      <Img {...props} />
    </div>
  );
}
