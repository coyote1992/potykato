import type { Metadata } from "next";
import Link from "next/link";
import { Arch } from "@/components/Arch";
import { Deco } from "@/components/Deco";
import { Faq } from "@/components/Faq";
import { Arrow } from "@/components/Icons";
import { Inquiry } from "@/components/Inquiry";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { facts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Esküvő és rendezvények",
  description: `Esküvő a tóparton, a Nyíri erdő közepén: polgári szertartás a helyszínen, eső ellen zárható pavilon ${facts.mainPavilionGuests} vendégnek, faházak a vendégeknek. Családi és céges rendezvények Kecskemét mellett.`,
  alternates: { canonical: "/eskuvo/" },
};

const faq = [
  {
    q: "Hány vendéget tudnak fogadni?",
    a: `A nagyobbik, eső ellen zárható pavilon ${facts.mainPavilionGuests} fő ültetett vendéglátására alkalmas; a két fedett pavilon együtt mintegy ${facts.pavilionsTotalGuests} vendéget fogad.`,
  },
  {
    q: "Mi a terv, ha esik?",
    a: "A rendezvénypavilon fedett, oldalfalai zárhatók, így a vacsora és a mulatság az időjárástól függetlenül megtartható.",
  },
  {
    q: "Megtartható a szertartás a helyszínen?",
    a: "Igen. A polgári szertartás a parkban is megtartható, az időpontot az anyakönyvvezetővel kell egyeztetni. Egyházi esküvőhöz a közelben felszentelt kápolna áll rendelkezésre.",
  },
  {
    q: "Hol szállnak meg a vendégek?",
    a: `A parkban bérelhető faházak ${facts.cabinBeds} főnek adnak helyet. Ha ennél több szállás kell, ${facts.vackorDistance}-re, a Vackor Vár erdei iskolában ${facts.vackorBeds} fős, kétcsillagos szálloda foglalható; ezt a vendégek maguk intézik.`,
  },
  {
    q: "Mennyibe kerül egy esküvő?",
    a: "Minden esküvő más, ezért személyes egyeztetés után egyedi árajánlatot adunk, hogy a lehető legmegfizethetőbb és legmegfelelőbb megoldást találjuk meg.",
  },
  {
    q: "Megnézhetjük előre a helyszínt?",
    a: `Természetesen: a helyszíni bejárás az első igazi lépés. Az időpontot telefonon egyeztetjük, hívjon a ${site.phone} számon, vagy írjon nekünk.`,
  },
];

export default function Eskuvo() {
  return (
    <>
      <PageHero title="Esküvő" sub="Különleges és természetesen feledhetetlen" wash="blush" eyebrow="Esküvő- és rendezvényhelyszín" />

      <section className="section section--flush-top" data-tone="blush" aria-label="Bevezető">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="lede" data-reveal>
                Ragyogó nyári napsütés, felhőtlen kék ég, üde zöld fű, friss levegő, és a vőlegény, aki várja az apja karján
                végigsétáló menyasszonyt.
              </p>
              <div className="body" data-reveal>
                <p>
                  Ez nem csak álom: a Potykató Pihenőparkban megvalósítható. Legyen szó kis létszámú családi vacsoráról, modern,
                  kreatív esküvőről vagy több napos, legény- és leánybúcsúval egybekötött hagyományos lagziról, a természet közepén
                  mesebeli élménnyé válhat a nagy nap.
                </p>
              </div>
            </div>
            <Photo name="szertartas-sorok-2" className="split__photo photo--round" sizes="(max-width: 860px) 92vw, 460px" />
          </div>
        </div>
      </section>

      <section className="section feature" data-tone="blush" aria-labelledby="szertartas">
        <Deco art="flowers" style={{ left: "1vw", bottom: "4%", width: "clamp(140px, 16vw, 250px)" }} speed={0.06} />
        <div className="wrap">
          <h2 id="szertartas" className="feature__title script" data-reveal>
            Az igen
          </h2>
          <div className="feature__grid">
            <Arch name="szertartas-tav" wash="blush" focus="45% 50%" />
            <div className="feature__text" data-reveal>
              <p className="lead-caps">Szertartás a parkban vagy a közeli kápolnában.</p>
              <div className="body">
                <p>
                  A polgári szertartás a helyszínen is megtartható: virágkapu a gyepen, székek a fák árnyékában. Az időpontot az
                  anyakönyvvezetővel kell egyeztetni.
                </p>
                <p>Egyházi esküvőhöz a közelben felszentelt kápolna áll rendelkezésre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section feature feature--mirror" data-tone="sand" aria-labelledby="vacsora">
        <div className="wrap">
          <h2 id="vacsora" className="feature__title script" data-reveal>
            A lagzi
          </h2>
          <div className="feature__grid">
            <Arch name="asztal-mrmrs" wash="sand" focus="50% 50%" />
            <div className="feature__text" data-reveal>
              <p className="lead-caps">{facts.mainPavilionGuests} vendég, fedett és zárható pavilonban.</p>
              <div className="body">
                <p>
                  A fogadás, a vacsora és a buli a fedett, eső ellen zárható rendezvénypavilonban kap helyet. A két pavilon együtt
                  mintegy {facts.pavilionsTotalGuests} vendéget fogad.
                </p>
                <p>Felszerelt konyha, kültéri kemence és szabadtéri főzési lehetőség segíti a vendéglátást.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-tone="sand" aria-labelledby="foto">
        <div className="wrap">
          <div className="center mb-l" data-reveal>
            <h2 id="foto" className="display">
              Háttér a fotókhoz
            </h2>
            <p className="body mt-s mx-auto" style={{ maxWidth: 620 }}>
              A tó, a kert és a hangulatos épületek remek, ötletes hátteret adnak a fotózáshoz, miközben a vendégsereg már a
              vendégváró falatokat és italokat fogyasztja.
            </p>
          </div>
          <div className="mosaic">
            <Photo name="par-steg" className="photo--round" sizes="(max-width: 800px) 92vw, 560px" focus="56% 60%" />
            <Photo name="steg-teritek" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="szertartas-gyertya" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="asztal-reszlet" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
            <Photo name="terasz-1" className="photo--round" sizes="(max-width: 800px) 46vw, 280px" />
          </div>
        </div>
      </section>

      <section className="section" data-tone="sage" aria-labelledby="tapasztalat">
        <div className="wrap wrap--narrow center">
          <p className="quote-mark" aria-hidden>
            „
          </p>
          <blockquote id="tapasztalat" className="lede" data-reveal style={{ margin: 0 }}>
            Több éves tapasztalattal a hátunk mögött mondhatjuk, hogy az esküvő izgalmait és fáradalmait jelentősen csökkenthetjük
            szakértelmünkkel, rugalmas hozzáállásunkkal és pozitív kisugárzásunkkal, hogy a nap felejthetetlen, az izgalom és a
            fáradtság pedig édes legyen.
          </blockquote>
          <p className="label mt-m" data-reveal>
            {site.manager} és csapata
          </p>
        </div>
      </section>

      <section className="section section--tight" data-tone="sage" aria-labelledby="szallas-vendegeknek">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <h2 id="szallas-vendegeknek" className="display">
                Szállás a vendégeknek
              </h2>
            </div>
            <div className="body" data-reveal>
              <p>
                A parkban bérelhető faházak {facts.cabinBeds} fő részére. Nagyobb rendezvénynél {facts.vackorDistance}-re, a Vackor
                Vár erdei iskola területén {facts.vackorBeds} fős, kétcsillagos szállodában lehet szobát foglalni; ott a vendégek
                egyénileg foglalnak.
              </p>
              <Link href="/szallas/" className="link mt-s">
                Faházak és árak <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="rendezvenyek" className="section" data-tone="sky" aria-labelledby="rendezvenyek-cim">
        <Deco art="lily" style={{ right: "-2vw", top: "4%", width: "clamp(160px, 18vw, 280px)" }} speed={0.07} />
        <div className="wrap">
          <h2 id="rendezvenyek-cim" className="script center mb-l" data-reveal>
            Rendezvények
          </h2>
          <div className="zig">
            <div className="zig__row">
              <Photo name="park-jatek" className="zig__photo photo--round" sizes="(max-width: 800px) 92vw, 560px" />
              <div className="zig__text" data-reveal>
                <h3>Családi és baráti összejövetelek</h3>
                <div className="body">
                  <p>
                    A családi és baráti események száma kifogyhatatlan: születésnap, névnap, ballagás, keresztelő, leány- és
                    legénybúcsú, osztálytalálkozó vagy bármilyen évforduló.
                  </p>
                  <p>Ha mindezt festői környezetben, tágas szabadtéren és esőtől zárt pavilonban rendezné meg, keressen minket.</p>
                </div>
              </div>
            </div>
            <div className="zig__row">
              <Photo name="pavilon-belso-3" className="zig__photo photo--round" sizes="(max-width: 800px) 92vw, 480px" />
              <div className="zig__text" data-reveal>
                <h3>Cégeknek</h3>
                <div className="body">
                  <p>
                    Csapatépítő, szellemi és más tréningek, partnertalálkozó, szabadtéri főzéssel egybekötött céges vagy családi
                    nap, vagy üzleti találkozó természetes környezetben.
                  </p>
                  <p>
                    A lehetőségek tárháza az Önök kezében van, mi szaktudásunkkal, bejáratott megoldásainkkal és lelkesen segítjük a
                    rendezvény sikerét.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-tone="cream" aria-labelledby="gyik">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <h2 id="gyik" className="display">
                Gyakori kérdések
              </h2>
              <p className="body mt-s">
                Ha nem találja a választ, hívjon minket: <a href={site.phoneHref}>{site.phone}</a>
              </p>
            </div>
            <Faq items={faq} />
          </div>
        </div>
      </section>

      <Inquiry defaultType="Esküvő" />
    </>
  );
}
