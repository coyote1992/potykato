import type { Metadata } from "next";
import { Deco } from "@/components/Deco";
import { Inquiry } from "@/components/Inquiry";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { cabins, facts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Szállás – faházak a parkban",
  description: `Bérelhető faházak ${facts.cabinBeds} főnek a Potykató Pihenőparkban, konyhával, hűtővel, ágyneművel. Napi bérleti díjak, sátorozás, és a ${facts.vackorDistance}-re lévő Vackor Vár szálloda.`,
  alternates: { canonical: "/szallas/" },
};

export default function Szallas() {
  return (
    <>
      <PageHero title="Szállás" sub="Faházak a tóparton és a fák között" wash="sage" eyebrow="Potykató Pihenőpark" />

      <section className="section section--flush-top" data-tone="sage" aria-label="Faházak">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="lede" data-reveal>
                Faházak konyhával, hűtőszekrénnyel és eszközökkel felszerelve. Az ágyneműről mi gondoskodunk.
              </p>
              <div className="body" data-reveal>
                <p>
                  Hat bérelhető faházunk közül négy saját fürdőszobás, kettőhöz külön fürdő tartozik; együtt {facts.cabinBeds} vendégnek
                  adnak helyet. Legyen szó esküvőről, kirándulásról, horgászatról vagy egyszerűen kikapcsolódásról, a nálunk töltött
                  idő kényelmes és pihentető.
                </p>
                <p>Örömmel fogadjuk Önt, és mindent megteszünk, hogy az érkezése pillanatától otthon érezze magát.</p>
              </div>
            </div>
            <Photo name="fahaz-to" className="split__photo photo--round" sizes="(max-width: 860px) 92vw, 460px" />
          </div>
        </div>
      </section>

      <section className="section" data-tone="sage" aria-labelledby="dijak">
        <Deco art="reeds" style={{ left: "-2vw", bottom: "-3vw", width: "clamp(140px, 15vw, 240px)" }} speed={0.06} />
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <p className="eyebrow">Napi bérleti díjak</p>
              <h2 id="dijak" className="display mt-s">
                Bérelhető faházak
              </h2>
              <p className="body mt-s">
                Foglalás és szabad időpontok telefonon: <a href={site.phoneHref}>{site.phone}</a>, vagy írjon a{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a> címre.
              </p>
            </div>
            <div data-reveal>
              <ul className="prices">
                {cabins.map((c) => (
                  <li key={c.name}>
                    <span className="prices__name">{c.name}</span>
                    <span className="prices__price">
                      {c.price}
                      <small>{c.unit}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="note mt-s">Bankkártya és SZÉP Kártya elfogadóhely.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush-top" data-tone="sage" aria-label="Fotók a faházakról">
        <div className="wrap">
          <div className="mosaic">
            <Photo name="fahaz-1" className="photo--round" sizes="(max-width: 800px) 92vw, 560px" />
            <Photo name="fahaz-konyha" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="fahaz-halo" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="fahaz-terasz" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="fahaz-furdo" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
          </div>
        </div>
      </section>

      <section className="section" data-tone="sky" aria-labelledby="tobb-szallas">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <h2 id="tobb-szallas" className="display">
                Sátorral, vagy több vendéggel
              </h2>
            </div>
            <div className="body" data-reveal>
              <p>
                <strong style={{ fontWeight: 400, color: "var(--ink)" }}>Sátorozás.</strong> Sátorral érkező vendégeinknek külön
                vizesblokkokban biztosított a tisztálkodási lehetőség.
              </p>
              <p>
                <strong style={{ fontWeight: 400, color: "var(--ink)" }}>Vackor Vár.</strong> Ha egy nagyobb rendezvényhez a
                faházaknál több szállás kell, {facts.vackorDistance}-re, a Vackor Vár erdei iskola területén {facts.vackorBeds} fős,
                kétcsillagos szállodában lehet szobát foglalni. Ott a vendégek egyénileg, közvetlenül foglalnak.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Inquiry defaultType="Szállás / horgászat" tone="sand" />
    </>
  );
}
