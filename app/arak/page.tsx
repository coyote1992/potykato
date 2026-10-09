import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Icons";
import { Inquiry } from "@/components/Inquiry";
import { PageHero } from "@/components/PageHero";
import { cabins, dayTickets, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Árak",
  description: "Napijegy, faházbérlés és esküvői, rendezvényi árajánlat a Potykató Pihenőparkban. Bankkártya és SZÉP Kártya elfogadóhely.",
  alternates: { canonical: `${site.url}/arak/` },
};

function PriceList({ items }: { items: readonly { name: string; price: string; unit: string }[] }) {
  return (
    <ul className="prices">
      {items.map((i) => (
        <li key={i.name}>
          <span className="prices__name">{i.name}</span>
          <span className="prices__price">
            {i.price}
            <small>{i.unit}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Arak() {
  return (
    <>
      <PageHero title="Árak" sub="Legyen a vendégünk" wash="sand" eyebrow="Bankkártya és SZÉP Kártya elfogadóhely" />

      <section className="section section--flush-top" data-tone="sand" aria-labelledby="eskuvo-ar">
        <div className="wrap">
          <div className="panel" data-reveal>
            <div className="two-col">
              <div>
                <p className="eyebrow">Esküvő és rendezvény</p>
                <h2 id="eskuvo-ar" className="display mt-s">
                  Egyedi ajánlat
                </h2>
              </div>
              <div className="body">
                <p>
                  Minden esküvő más és más, ezért személyes egyeztetés után egyedi árajánlatot adunk, hogy a lehető
                  legmegfizethetőbb és legmegfelelőbb megoldást találjuk meg.
                </p>
                <div className="actions mt-m">
                  <a href="#ajanlatkeres" className="ticket">
                    Ajánlatot kérek
                  </a>
                  <a href={site.phoneHref} className="link">
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-tone="sand" aria-labelledby="szallas-ar">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <p className="eyebrow">Szállás</p>
              <h2 id="szallas-ar" className="display mt-s">
                Faházak
              </h2>
              <p className="body mt-s">Napi bérleti díj. Konyhával, hűtőszekrénnyel, eszközökkel, ágyneművel.</p>
              <Link href="/szallas/" className="link mt-s">
                A faházakról <Arrow />
              </Link>
            </div>
            <div data-reveal>
              <PriceList items={cabins} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" data-tone="sky" aria-labelledby="napijegy-ar">
        <div className="wrap">
          <div className="two-col">
            <div data-reveal>
              <p className="eyebrow">Horgászat</p>
              <h2 id="napijegy-ar" className="display mt-s">
                Napijegy
              </h2>
              <div className="body mt-s">
                <p>
                  Két botra, botonként egy-egy horogra. A helyszínen váltható, az árát nem tudjuk visszafizetni. Csak sporthorgászat:
                  a kifogott halakat vissza kell engedni.
                </p>
              </div>
              <Link href="/horgaszat/" className="link mt-s">
                A horgászatról <Arrow />
              </Link>
            </div>
            <div data-reveal>
              <PriceList items={dayTickets} />
            </div>
          </div>
        </div>
      </section>

      <Inquiry />
    </>
  );
}
