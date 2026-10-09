type Art = "willow" | "reeds" | "lily" | "flowers" | "carp";

/** An engraved botanical drifting slowly with the scroll (see Motion.tsx). */
export function Deco({
  art,
  style,
  speed = 0.08,
  flip,
}: {
  art: Art;
  style: React.CSSProperties;
  speed?: number;
  flip?: boolean;
}) {
  return (
    <div className="deco" data-parallax={speed} style={style} aria-hidden>
      <img src={`/art/${art}.webp`} alt="" loading="lazy" style={flip ? { transform: "scaleX(-1)" } : undefined} />
    </div>
  );
}
