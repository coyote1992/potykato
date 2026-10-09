type Wash = "blush" | "sage" | "sand";

/** Subpage opening: a script title over a watercolour wash, with a short line under it. */
export function PageHero({ title, sub, wash = "sand", eyebrow }: { title: string; sub?: React.ReactNode; wash?: Wash; eyebrow?: string }) {
  return (
    <section className="phero" aria-labelledby="oldal-cim">
      <img className="phero__wash" src={`/art/wc-${wash}.webp`} alt="" aria-hidden />
      <div className="wrap">
        {eyebrow && (
          <p className="eyebrow" data-reveal style={{ marginBottom: 18 }}>
            {eyebrow}
          </p>
        )}
        <h1 id="oldal-cim" className="script" data-reveal>
          {title}
        </h1>
        {sub && (
          <p className="phero__sub lead-caps" data-reveal style={{ ["--d" as string]: ".15s" }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}
