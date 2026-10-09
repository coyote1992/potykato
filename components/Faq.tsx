export function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="faq" data-reveal>
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}</summary>
          <p className="body">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
