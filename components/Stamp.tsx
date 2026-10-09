/** A postage stamp with the park's carp: the seal on the inquiry "letter". */
export function Stamp({ className = "stamp" }: { className?: string }) {
  // perforated edge: a row of half-circles cut from each side
  const holes: string[] = [];
  const W = 120, H = 144, r = 4.2, step = 12;
  for (let x = step / 2; x < W; x += step) holes.push(`M${x - r},0a${r},${r} 0 0 0 ${2 * r},0`, `M${x - r},${H}a${r},${r} 0 0 1 ${2 * r},0`);
  for (let y = step / 2; y < H; y += step) holes.push(`M0,${y - r}a${r},${r} 0 0 1 0,${2 * r}`, `M${W},${y - r}a${r},${r} 0 0 0 0,${2 * r}`);
  return (
    <svg className={className} viewBox={`-2 -2 ${W + 4} ${H + 4}`} role="img" aria-label="Potykató Pihenőpark bélyeg">
      <defs>
        <mask id="perf">
          <rect x="-2" y="-2" width={W + 4} height={H + 4} fill="#fff" />
          <path d={holes.join("")} fill="#000" />
        </mask>
      </defs>
      <g mask="url(#perf)">
        <rect width={W} height={H} fill="#7593a9" />
      </g>
      <rect x="9" y="9" width={W - 18} height={H - 18} fill="none" stroke="#fff" strokeOpacity=".7" />
      <path d="M22,60 C22,40 38,26 60,22 C82,26 98,40 98,60 L98,112 L22,112 Z" fill="none" stroke="#fff" strokeOpacity=".85" />
      <image href="/art/carp.webp" x="27" y="62" width="66" height="33" style={{ filter: "brightness(0) invert(1)" }} opacity=".92" />
      <text x="60" y="54" textAnchor="middle" fontSize="7.5" letterSpacing="1.6" fill="#fff">
        1 HA · TÓ
      </text>
      <text x="60" y="127" textAnchor="middle" fontSize="7" letterSpacing="1.5" fill="#fff">
        POTYKATÓ
      </text>
      <text x="60" y="105" textAnchor="middle" fontSize="5.2" letterSpacing="1.3" fill="#fff" fillOpacity=".85">
        HETÉNYEGYHÁZA
      </text>
    </svg>
  );
}
