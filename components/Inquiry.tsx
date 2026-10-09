"use client";

import { useId, useState } from "react";
import { eventTypes, site } from "@/lib/site";
import { Arrow } from "./Icons";
import { Stamp } from "./Stamp";

/**
 * The inquiry "letter". The site is static, so sending opens the visitor's own e-mail app with a
 * ready-written message to the park (nothing is stored on the way).
 */
function Letter({ defaultType }: { defaultType?: string }) {
  const id = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const type = v("type") || "Érdeklődés";
    const date = v("date");
    const subject = `Ajánlatkérés – ${type}${date ? ` – ${date}` : ""}`;
    const lines = [
      `Név: ${v("name")}`,
      `E-mail: ${v("email")}`,
      v("phone") ? `Telefon: ${v("phone")}` : null,
      `Rendezvény: ${type}`,
      date ? `Tervezett dátum: ${date}` : null,
      v("guests") ? `Vendégek száma: kb. ${v("guests")} fő` : null,
      "",
      v("message"),
    ].filter((l): l is string => l !== null);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <form className="letter" onSubmit={onSubmit} data-reveal>
      <div className="letter__head">
        <div>
          <h2 className="display">Ajánlatkérés</h2>
          <p className="body">
            Írja meg a dátumot és a létszámot: visszajelzünk, és egyeztetünk egy időpontot a helyszíni bejárásra.
          </p>
        </div>
        <Stamp />
      </div>

      <div className="letter__grid">
        <div className="field field--message">
          <label htmlFor={`${id}-message`}>Üzenet</label>
          <textarea
            id={`${id}-message`}
            name="message"
            placeholder="Milyen napot képzelnek el? Szertartás a helyszínen, vacsora, szállás…"
          />
        </div>
        <div className="letter__divider" aria-hidden>
          <img src="/art/flowers.webp" alt="" loading="lazy" />
        </div>
        <div className="fields">
          <div className="field">
            <label htmlFor={`${id}-name`}>Név *</label>
            <input id={`${id}-name`} name="name" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor={`${id}-type`}>Rendezvény</label>
            <select id={`${id}-type`} name="type" defaultValue={defaultType ?? eventTypes[0]}>
              {eventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor={`${id}-date`}>Tervezett dátum</label>
            <input id={`${id}-date`} name="date" type="date" />
          </div>
          <div className="field">
            <label htmlFor={`${id}-guests`}>Vendégek (kb.)</label>
            <input id={`${id}-guests`} name="guests" type="number" min={1} max={500} inputMode="numeric" />
          </div>
          <div className="field field--full">
            <label htmlFor={`${id}-email`}>E-mail *</label>
            <input id={`${id}-email`} name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field field--full">
            <label htmlFor={`${id}-phone`}>Telefon</label>
            <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" />
          </div>
          <label className="consent field--full">
            <input type="checkbox" name="consent" required />
            <span>
              Hozzájárulok, hogy adataimat az érdeklődésem megválaszolásához kezeljék. Adatbázist nem építenek belőle.{" "}
              <a href="/adatvedelem/" style={{ textDecoration: "underline" }}>
                Adatvédelem
              </a>
            </span>
          </label>
        </div>
      </div>

      <div className="letter__foot">
        <p className="letter__note">
          A küldés gomb az Ön levelezőprogramjában nyit meg egy kész üzenetet a {site.email} címre. Sietne? Hívjon minket:{" "}
          <a href={site.phoneHref} style={{ color: "var(--ink)" }}>
            {site.phone}
          </a>
          .
        </p>
        <button type="submit" className="ticket">
          Üzenet küldése <Arrow style={{ width: 22, height: 10 }} />
        </button>
      </div>
      {sent && (
        <p className="form-status" role="status">
          Megnyitottuk a levelezőprogramját a kitöltött üzenettel. Ha nem jelent meg, írjon közvetlenül a{" "}
          <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>
            {site.email}
          </a>{" "}
          címre, vagy hívjon a {site.phone} számon.
        </p>
      )}
    </form>
  );
}

export function Inquiry({ defaultType, tone = "sand" }: { defaultType?: string; tone?: string }) {
  return (
    <section id="ajanlatkeres" className="section" data-tone={tone} aria-labelledby="hogyan">
      <div className="wrap">
        <div className="center mb-l" data-reveal>
          <h2 className="script script--sm" id="hogyan">
            Hogyan tovább?
          </h2>
        </div>
        <ol className="steps mb-l">
          <li data-reveal>
            <h3>Írjon vagy hívjon</h3>
            <p className="body">A dátum, a létszám és néhány mondat arról, milyen napot szeretnének: ennyi elég az első lépéshez.</p>
          </li>
          <li data-reveal style={{ ["--d" as string]: ".12s" }}>
            <h3>Helyszíni bejárás</h3>
            <p className="body">Egyeztetünk egy időpontot, és végigsétálunk a parkon: a pavilon, a tópart, a kert és a faházak.</p>
          </li>
          <li data-reveal style={{ ["--d" as string]: ".24s" }}>
            <h3>Egyedi ajánlat</h3>
            <p className="body">Minden esküvő más, ezért a személyes egyeztetés után az Önök napjára szabott árajánlatot adunk.</p>
          </li>
        </ol>
        <Letter defaultType={defaultType} />
      </div>
    </section>
  );
}
