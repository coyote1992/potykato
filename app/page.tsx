import Link from "next/link";
import { Arch } from "@/components/Arch";
import { Deco } from "@/components/Deco";
import { HeroVideo } from "@/components/HeroVideo";
import { Arrow, ArrowDown, Sparkle } from "@/components/Icons";
import { Inquiry } from "@/components/Inquiry";
import { Photo } from "@/components/Photo";
import { Reviews } from "@/components/Reviews";
import { VenueSlider, type Venue } from "@/components/VenueSlider";
import { amenities, facts, site } from "@/lib/site";

const venues: Venue[] = [
  {
    photo: "szertartas-sorok",
    name: "Szertartás a kertben",
    text: "Virágkapu a nagy gyepen, a fák árnyékában. A polgári szertartás itt, a helyszínen is megtartható.",
  },
  {
    photo: "asztal-141",
    name: "A rendezvénypavilon",
    text: `Fedett, eső ellen zárható pavilon, ${facts.mainPavilionGuests} vendég ültetett vacsorájához.`,
  },
  {
    photo: "terasz-2",
    name: "Tóparti terasz",
    text: "Fonott székek, fehér függönyök, és a víz egészen közel.",
  },
  {
    photo: "steg-teritek",
    name: "A stég",
    text: "A tó fölé nyúló stégek a park legszebb fotóhelyei közé tartoznak.",
    focus: "50% 60%",
  },
  {
    photo: "pavilon-este",
    name: "Esti fények",
    text: "Alkonyatkor fényfüzérek gyúlnak a pavilon és a fák között.",
  },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <HeroVideo />
        </div>
        <div className="hero__content">
          <p className="hero__kicker">Esküvő- és rendezvényhelyszín · Kecskemét–Hetényegyháza</p>
          <h1 className="hero__title" id="hero-title">
            Feledhetetlen élmények <em>a természetben</em>
          </h1>
        </div>
        <a className="hero__scroll" href="#bemutatkozas" aria-label="Görgessen tovább">
          <span>
            <ArrowDown />
          </span>
          <span>Görgessen</span>
        </a>
      </section>

      {/* ------------------------------------------------------------ statement */}
      <section id="bemutatkozas" className="section" data-tone="cream">
        <div className="wrap">
          <div className="statement-block" data-reveal>
            <p className="statement">
              A Potykató Pihenőpark családi kézben lévő, {facts.parkHa} hektáros park a Nyíri erdő közepén: tó, kert, fedett
              pavilonok és faházak, Kecskeméttől {facts.fromKecskemet}-re.
            </p>
            <div className="actions">
              <Link href="/eskuvo/" className="link">
                Esküvők a parkban <Arrow />
              </Link>
              <a href="#ajanlatkeres" className="link">
                Ajánlatkérés <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ welcome */}
      <section id="udvozoljuk" className="section section--flush-top feature" data-tone="cream">
        <div className="wrap">
          <h2 className="feature__title script" data-reveal>
            Üdvözöljük
          </h2>
          <div className="feature__grid">
            <Arch name="par-steg" wash="sand" focus="58% 50%" />
            <div className="feature__text" data-reveal>
              <p className="lead-caps">Családi vállalkozás, amely több mint tizenöt éve fogad vendégeket.</p>
              <div className="body">
                <p>
                  A park azóta szinte minden évben valami újjal gazdagodott, és a fejlesztés ma is tart. Büszkék vagyunk a
                  gondozott környezetre, az épületekre és a tisztaságra.
                </p>
                <p>
                  Kis vállalkozás vagyunk, ezért rugalmasan állunk a legapróbb kérésekhez is: ha valamire szüksége van, szóljon,
                  és mindent megteszünk, hogy jól érezze magát nálunk.
                </p>
              </div>
              <figure style={{ margin: "34px 0 0" }}>
                <blockquote className="lede" style={{ margin: 0, fontSize: "clamp(20px, 1.7vw, 24px)" }}>
                  „Minden részletet igyekszünk tökéletesre hangolni, hogy a nálunk töltött idő ideális legyen.”
                </blockquote>
                <figcaption className="label" style={{ marginTop: 14 }}>
                  {site.manager}, {site.managerRole}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ location */}
      <section className="section" data-tone="cream" aria-labelledby="hol">
        <Deco art="reeds" style={{ right: "-3vw", bottom: "-4vw", width: "clamp(140px, 15vw, 240px)" }} speed={0.06} />
        <div className="wrap">
          <div className="split split--rev">
            <div>
              <h2 id="hol" className="lede" data-reveal>
                A Kecskemét–Hetényegyháza melletti Nyíri erdőben, a Szulyovszky-féle erdészházzal szemben, egy {facts.parkHa} hektáros
                park közepén.
              </h2>
              <div className="body" data-reveal>
                <p>
                  A parkból {facts.lakeHa} hektárt a {facts.lakeDepth} mély tó foglal el, {facts.forestHa} hektáron erdő terül el. A
                  tópart mentén pihenő- és tűzrakóhelyek, a gyepen sportpálya és játszótér, a fák között a pavilonok és a faházak.
                </p>
                <p>
                  {facts.hubertuszDistance}-re, a Szent Hubertusz Parkban Szulyovszky László erdész 1848–49-es relikviákat őrző
                  múzeuma várja a történelem iránt érdeklődőket.
                </p>
              </div>
              <div className="actions mt-m" data-reveal>
                <Link href="/kapcsolat/" className="link">
                  Megközelítés <Arrow />
                </Link>
                <Link href="/galeria/" className="link">
                  Galéria <Arrow />
                </Link>
              </div>
            </div>
            <Photo name="to-legi" className="split__photo photo--round" sizes="(max-width: 860px) 92vw, 460px" focus="50% 50%" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ weddings */}
      <section id="eskuvok" className="section feature" data-tone="blush">
        <div className="wrap">
          <h2 className="feature__title script" data-reveal>
            Esküvők
          </h2>
          <div className="feature__grid">
            <Arch name="szertartas-kapu" wash="blush" focus="40% 50%" />
            <div className="feature__text" data-reveal>
              <p className="lead-caps">Szertartás, vacsora és mulatság egy helyen, a tó partján.</p>
              <div className="body">
                <p>
                  A polgári szertartás a helyszínen is megtartható, az időpontot az anyakönyvvezetővel kell egyeztetni. Egyházi
                  esküvőhöz a közelben felszentelt kápolna áll rendelkezésre.
                </p>
                <p>
                  A tó, a kert és a hangulatos épületek ötletes hátteret adnak a fotózáshoz, miközben a vendégsereg már a
                  vendégváró falatokat kóstolja.
                </p>
              </div>
              <div className="actions">
                <Link href="/eskuvo/" className="link">
                  Az esküvőkről részletesen <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ wide photo */}
      <section className="section section--flush-top" data-tone="blush" aria-label="Esküvői asztal a pavilonban">
        <div className="wrap" style={{ position: "relative" }}>
          <Deco art="willow" style={{ right: "-2vw", top: "-9vw", width: "clamp(200px, 25vw, 360px)", zIndex: 2 }} speed={0.1} flip />
          <Photo name="asztal-kerek" className="wide-photo" sizes="(max-width: 1200px) 94vw, 1152px" focus="50% 60%" />
        </div>
      </section>

      {/* ------------------------------------------------------------ the places of the day */}
      <section className="section section--flush-top" data-tone="blush" aria-labelledby="helyszinek">
        <div className="wrap wrap--narrow center mb-l" data-reveal>
          <h2 id="helyszinek" className="display">
            A nagy nap helyszínei
          </h2>
          <p className="body mt-s mx-auto" style={{ maxWidth: 640 }}>
            Kis létszámú családi vacsora, modern, kreatív esküvő vagy több napos, hagyományos lagzi legény- és leánybúcsúval: a
            park terei mindegyikhez alkalmazkodnak.
          </p>
        </div>
        <VenueSlider venues={venues} />
      </section>

      {/* ------------------------------------------------------------ under the stars */}
      <section className="section stars" data-tone="sky" aria-labelledby="csillagok">
        <div className="wrap">
          <h2 id="csillagok" className="stars__title script script--gold" data-reveal>
            Csillagok alatt
            <Sparkle className="sparkle" />
          </h2>
          <Photo name="pavilon-este-2" className="stars__photo" sizes="(max-width: 1100px) 94vw, 972px" />
          <p className="stars__text body" data-reveal style={{ maxWidth: 700 }}>
            Ahogy esteledik, a park fényei is meggyúlnak: fényfüzérek a fák között, lámpások a téglaút mentén, gyertyák a
            farönkökben. A nap legszebb része sokszor csak ekkor kezdődik.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ pavilion: the 150 moment */}
      <section id="pavilon" className="section" data-tone="sky" aria-labelledby="pavilon-cim">
        <div className="wrap">
          <div className="moment">
            <div className="moment__text">
              <p className="eyebrow" data-reveal>
                A pavilon
              </p>
              <h2 id="pavilon-cim" className="display moment__heading mt-s" data-reveal>
                Ha esik, akkor is
              </h2>
              <div className="body" data-reveal>
                <p>
                  Két fedett rendezvénypavilonunk együtt mintegy {facts.pavilionsTotalGuests} vendéget fogad. A nagyobbik oldalfalai
                  zárhatók, így egy {facts.mainPavilionGuests} fős ültetett vacsora is biztonságban van, bármit hoz az időjárás.
                </p>
                <p>
                  Mellette felszerelt konyha, kültéri kemence és szabadtéri főzési lehetőség, a tóparton pedig fedett kiülők és
                  tűzrakóhelyek.
                </p>
              </div>
            </div>
            <div className="moment__free" aria-hidden />
          </div>
          <div className="moment__photos">
            <Photo name="pavilon-nappal" className="photo--round" sizes="(max-width: 860px) 92vw, 680px" />
            <Photo name="pavilon-belso" className="photo--round" sizes="(max-width: 860px) 92vw, 460px" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ other events */}
      <section id="rendezvenyek" className="section" data-tone="sage" aria-labelledby="rendezvenyek-cim">
        <Deco art="lily" style={{ left: "-3vw", top: "8%", width: "clamp(180px, 20vw, 320px)" }} speed={0.07} />
        <div className="wrap">
          <h2 id="rendezvenyek-cim" className="script center mb-l" data-reveal>
            Rendezvények
          </h2>
          <div className="zig">
            <div className="zig__row">
              <div className="zig__text" data-reveal>
                <h3>Családi és baráti ünnepek</h3>
                <div className="body">
                  <p>
                    Születésnap, névnap, ballagás, keresztelő, osztálytalálkozó vagy évforduló: tágas szabadtér, esőtől zárt pavilon
                    és festői környezet. A gyerekeknek játszótér és focipálya, a felnőtteknek a tópart.
                  </p>
                </div>
              </div>
              <Photo name="lugas-alkony" className="zig__photo photo--round" sizes="(max-width: 800px) 92vw, 560px" />
            </div>
            <div className="zig__row">
              <Photo name="pavilon-belso-2" className="zig__photo photo--round" sizes="(max-width: 800px) 92vw, 480px" />
              <div className="zig__text" data-reveal>
                <h3>Céges rendezvények</h3>
                <div className="body">
                  <p>
                    Csapatépítés, tréning, partnertalálkozó, családi nap vagy üzleti megbeszélés a természetben, akár szabadtéri
                    főzéssel egybekötve. A program az Önöké, mi szaktudással és lelkesen segítjük a lebonyolítást.
                  </p>
                </div>
                <div className="actions mt-m">
                  <Link href="/eskuvo/#rendezvenyek" className="link">
                    Rendezvények <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ stay */}
      <section id="szallas" className="section feature feature--mirror" data-tone="sage">
        <div className="wrap">
          <h2 className="feature__title script" data-reveal>
            Szállás
          </h2>
          <div className="feature__grid">
            <Arch name="fahaz-to" wash="sage" focus="45% 50%" />
            <div className="feature__text" data-reveal>
              <p className="lead-caps">Faházak a parkban, {facts.cabinBeds} fő részére.</p>
              <div className="body">
                <p>
                  Négy fürdőszobás és két külön fürdős faházunk konyhával, hűtővel és edényekkel felszerelt, az ágyneműről mi
                  gondoskodunk. Sátorral érkezőknek külön vizesblokk áll rendelkezésre.
                </p>
                <p>
                  Nagyobb rendezvényhez {facts.vackorDistance}-re, a Vackor Vár erdei iskolában {facts.vackorBeds} fős, kétcsillagos
                  szálloda is foglalható; ott a vendégek maguk intézik a foglalást.
                </p>
              </div>
              <div className="actions">
                <Link href="/szallas/" className="link">
                  Faházak és árak <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ the lake */}
      <section id="horgaszat" className="section" data-tone="sky" aria-labelledby="to-cim">
        <div className="wrap">
          <h2 id="to-cim" className="giant center mb-l" data-reveal>
            A tó
            <Sparkle className="sparkle" />
          </h2>
          <div className="split">
            <div data-reveal>
              <p className="lead-caps">Egy hektár víz, ponttyal, amurral és csukával.</p>
              <div className="body">
                <p>
                  A tavon sporthorgászat folyik stégekről, minden stéghez fedett kiülő tartozik. A kifogott halakat fotózás és
                  fertőtlenítés után visszaengedjük, elvinni nem lehet őket.
                </p>
                <p>
                  Napijegy a helyszínen váltható: felnőtteknek 5 000 Ft, 10 éves korig 2 000 Ft. A horgászt kísérő sétálójegye
                  1 000 Ft.
                </p>
              </div>
              <div className="actions mt-m">
                <Link href="/horgaszat/" className="link">
                  Horgászat <Arrow />
                </Link>
              </div>
            </div>
            <Photo name="to-tukor" className="split__photo photo--round" sizes="(max-width: 860px) 92vw, 460px" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ reviews */}
      <section className="section reviews reviews--left" data-tone="cream" aria-labelledby="velemenyek">
        <div className="wrap">
          <div className="clear-right">
            <h2 id="velemenyek" className="script script--sm" data-reveal>
              Vendégeink írták
            </h2>
            <Reviews />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ amenities */}
      <section className="section section--flush-top" data-tone="cream" aria-labelledby="felszereltseg">
        <div className="wrap">
          <Photo name="to-4" className="wide-photo mb-l" sizes="(max-width: 1200px) 94vw, 1152px" />
          <div className="clear-right">
            <h2 id="felszereltseg" className="display mb-l" data-reveal>
              Amit a park kínál
            </h2>
            <ul className="ticks ticks--two" data-reveal>
            {amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Inquiry />
    </>
  );
}

