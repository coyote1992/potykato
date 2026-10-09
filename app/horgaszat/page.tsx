import type { Metadata } from "next";
import { Deco } from "@/components/Deco";
import { Inquiry } from "@/components/Inquiry";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { dayTickets, facts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Horgászat",
  description: `Sporthorgászat a Potykató ${facts.lakeHa} hektáros, ${facts.lakeDepth} mély tavában: ponty, amur, csuka. Napijegy a helyszínen, fedett kiülős stégek, fogd meg és engedd vissza.`,
  alternates: { canonical: "/horgaszat/" },
};

const fish = [
  {
    photo: "ponty" as const,
    name: "Ponty",
    text: "Legismertebb és legnépszerűbb halunk. Melegben a hajnali, kora reggeli és a napnyugta előtti órák a legjobbak; kora tavasszal és késő ősszel a kapások zöme a déli és délutáni órákra esik. Módszerek: fenekezés, úszózás, bojlizás.",
  },
  {
    photo: "amur" as const,
    name: "Amur",
    text: "Nevét az Amur folyóról kapta. Rendkívül izmos, nagytestű, torpedó alakú hal; háta zöldesbarna, oldala a pikkelyek fekete kontúrja miatt szürkésezüst, úszói kissé vörhenyesek.",
  },
  {
    photo: "csuka" as const,
    name: "Csuka",
    text: "Teste hosszúkás és erőteljes, színe a halvány ezüst-aranyostól az olajzöld alapon aranyfoltos változatokig terjed. Erős hátúszója a teste hátsó részén ül.",
  },
];

export default function Horgaszat() {
  return (
    <>
      <PageHero title="Horgászat" sub="Kellemes időtöltés gyönyörű környezetben" wash="sage" eyebrow="A tó" />

      <section className="section section--flush-top" data-tone="sky" aria-label="A tó">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="lede" data-reveal>
                A {facts.parkHa} hektáros parkból {facts.lakeHa} hektár a tó: {facts.lakeDepth} mély, körülötte fűzfák, nádas és
                stégek.
              </p>
              <div className="body" data-reveal>
                <p>
                  Horgászni stégekről lehet, és minden stéghez fedett kiülő tartozik. A tavon kizárólag sporthorgászat folyik: a
                  kifogott halakat fotózás és fertőtlenítés után vissza kell engedni a tóba, elvinni szigorúan tilos.
                </p>
              </div>
            </div>
            <Photo name="to-1" className="split__photo photo--round" sizes="(max-width: 860px) 92vw, 460px" />
          </div>
        </div>
      </section>

      <section className="section" data-tone="sky" aria-labelledby="halallomany">
        <Deco art="carp" style={{ right: "-4vw", top: "2%", width: "clamp(220px, 28vw, 420px)" }} speed={0.05} />
        <div className="wrap">
          <h2 id="halallomany" className="script center mb-l" data-reveal>
            Halállomány
          </h2>
          <div className="fish">
            {fish.map((f, i) => (
              <article key={f.name} className="fish__card" data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }}>
                <Photo name={f.photo} className="photo--round" sizes="(max-width: 860px) 92vw, 360px" reveal={false} />
                <h3>{f.name}</h3>
                <p className="body">{f.text}</p>
                <span className="label">Fogd meg és engedd vissza</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-tone="cream" aria-labelledby="napijegy">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <p className="eyebrow">Árak</p>
              <h2 id="napijegy" className="display mt-s">
                Napijegy
              </h2>
              <div className="body mt-s">
                <p>
                  A napijegy két botra, botonként egy-egy horogra szól, és a helyszínen váltható. Az árát nem tudjuk visszafizetni.
                </p>
                <p>
                  Nyitva: {site.hours.days.toLowerCase()}, {site.hours.time}. {site.hours.note}
                </p>
              </div>
            </div>
            <div data-reveal>
              <ul className="prices">
                {dayTickets.map((t) => (
                  <li key={t.name}>
                    <span className="prices__name">{t.name}</span>
                    <span className="prices__price">
                      {t.price}
                      <small>{t.unit}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="note mt-s">Bankkártya és SZÉP Kártya elfogadóhely.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top" data-tone="cream" aria-labelledby="szabalyzat">
        <div className="wrap">
          <div className="panel" data-reveal>
            <div className="two-col">
              <div>
                <h2 id="szabalyzat" className="display" style={{ fontSize: "clamp(26px, 2.6vw, 34px)" }}>
                  Szabályzat
                </h2>
              </div>
              <div className="body">
                <p>
                  A tó területén csak sporthorgászatra van lehetőség. A kifogott halakat fotózás és fertőtlenítés után vissza kell
                  engedni; elvinni szigorúan tilos. Ez a pontyra, az amurra és a csukára egyaránt vonatkozik.
                </p>
                <p>
                  A MOHOSZ érvényes horgászrendjéről itt tájékozódhat:{" "}
                  <a href="https://nyito.mohosz.hu" target="_blank" rel="noopener" style={{ textDecoration: "underline" }}>
                    nyito.mohosz.hu
                  </a>{" "}
                  ·{" "}
                  <a href="https://horgaszjegy.hu" target="_blank" rel="noopener" style={{ textDecoration: "underline" }}>
                    horgaszjegy.hu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top" data-tone="cream" aria-label="Fotók a tóról">
        <div className="wrap">
          <div className="mosaic">
            <Photo name="steg-pad" className="photo--round" sizes="(max-width: 800px) 92vw, 560px" />
            <Photo name="horgasz-gyerekek" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="horgasz-botok" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="to-fuz" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="hal-tabla" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
          </div>
        </div>
      </section>

      <Inquiry defaultType="Szállás / horgászat" />
    </>
  );
}
