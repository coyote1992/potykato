import type { Metadata } from "next";
import { Deco } from "@/components/Deco";
import { Inquiry } from "@/components/Inquiry";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { facts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kapcsolat és megközelítés",
  description: `Potykató Pihenőpark, ${site.address.full}. Telefon: ${site.phone}. Kecskeméttől ${facts.fromKecskemet}-re, a hetényegyházi Nyíri erdő főbejáratával szinte szemben.`,
  alternates: { canonical: "/kapcsolat/" },
};

export default function Kapcsolat() {
  return (
    <>
      <PageHero title="Kapcsolat" sub="Forduljon hozzánk bizalommal" wash="sand" eyebrow="Potykató Pihenőpark" />

      <section className="section section--flush-top" data-tone="cream" aria-label="Elérhetőségek">
        <Deco art="flowers" style={{ right: "-1vw", top: "-4%", width: "clamp(140px, 14vw, 220px)" }} speed={0.05} />
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <ul className="contact-list">
                <li>
                  <span className="label">Telefon</span>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
                <li>
                  <span className="label">E-mail</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span className="label">Cím</span>
                  <a href={site.mapsUrl} target="_blank" rel="noopener">
                    {site.address.full}
                  </a>
                </li>
                <li>
                  <span className="label">Nyitvatartás</span>
                  <strong>
                    {site.hours.days}, {site.hours.time}
                  </strong>
                  <span className="body">{site.hours.note}</span>
                </li>
              </ul>
            </div>
            <div>
              <MapEmbed />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-tone="cream" aria-labelledby="megkozelites">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <h2 id="megkozelites" className="display">
                Megközelítés
              </h2>
            </div>
            <div className="body" data-reveal>
              <p>
                Pihenőparkunk Kecskeméttől {facts.fromKecskemet}-re, a hetényegyházi Nyíri erdő főbejáratával szinte szemben, a
                Szulyovszky-féle erdészházzal szemközt található.
              </p>
              <p>
                GPS: {site.geo.lat}, {site.geo.lng}. Autóval könnyen megközelíthető; a parkhoz vezető út utolsó szakasza homokos.
              </p>
              <a href={site.mapsUrl} target="_blank" rel="noopener" className="link mt-s">
                Útvonaltervezés a Google Térképen
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="impresszum" className="section section--tight" data-tone="cream" aria-labelledby="impresszum-cim">
        <div className="wrap">
          <div className="panel" data-reveal>
            <div className="two-col">
              <h2 id="impresszum-cim" className="display" style={{ fontSize: "clamp(26px, 2.6vw, 34px)" }}>
                Impresszum
              </h2>
              <dl className="body" style={{ margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 24px" }}>
                <dt className="label">Cégnév</dt>
                <dd style={{ margin: 0 }}>{site.company}</dd>
                <dt className="label">Cím</dt>
                <dd style={{ margin: 0 }}>{site.address.full}</dd>
                <dt className="label">Cégjegyzékszám</dt>
                <dd style={{ margin: 0 }}>{site.legal.reg}</dd>
                <dt className="label">Adószám</dt>
                <dd style={{ margin: 0 }}>{site.legal.tax}</dd>
                <dt className="label">Telefon</dt>
                <dd style={{ margin: 0 }}>{site.phone}</dd>
                <dt className="label">E-mail</dt>
                <dd style={{ margin: 0 }}>{site.email}</dd>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Inquiry />
    </>
  );
}
