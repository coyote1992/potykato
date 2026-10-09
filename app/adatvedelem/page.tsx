import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Adatvédelem",
  description: "Adatkezelési tájékoztató a Potykató Pihenőpark weboldalához.",
  alternates: { canonical: "/adatvedelem/" },
  robots: { index: false },
};

export default function Adatvedelem() {
  return (
    <>
      <PageHero title="Adatvédelem" sub="Röviden arról, mi történik az adataival" wash="sage" />
      <section className="section section--flush-top" data-tone="cream" aria-label="Adatkezelési tájékoztató">
        <div className="wrap wrap--narrow">
          <div className="panel body" data-reveal>
            <h2 className="lead-caps">Az adatkezelő</h2>
            <p>
              {site.company}, {site.address.full}. Telefon: {site.phone}, e-mail: {site.email}.
            </p>
            <h2 className="lead-caps mt-m">Az ajánlatkérés</h2>
            <p>
              A weboldal nem tárol személyes adatot. Az ajánlatkérő űrlap a látogató saját levelezőprogramjában nyit meg egy kész
              üzenetet; az adatok (név, e-mail, telefonszám, a rendezvény adatai) csak akkor jutnak el hozzánk, ha az üzenetet
              elküldi. Ezeket kizárólag az érdeklődés megválaszolására és az ajánlat elkészítésére használjuk, adatbázist nem
              építünk belőlük, és a kapcsolatfelvétel után töröljük őket.
            </p>
            <h2 className="lead-caps mt-m">Sütik és külső szolgáltatások</h2>
            <p>
              A weboldal nem használ követő vagy hirdetési sütiket. A Kapcsolat oldalon a Google Térkép csak akkor töltődik be, ha a
              látogató erre kifejezetten rákattint; ekkor a Google saját adatkezelési szabályai érvényesek.
            </p>
            <h2 className="lead-caps mt-m">Az Ön jogai</h2>
            <p>
              Kérhet tájékoztatást a kezelt adatairól, kérheti azok helyesbítését vagy törlését a fenti elérhetőségeken. Panasszal a
              Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, naih.hu) fordulhat. Személyes adatot 16 év alatti
              látogatóktól nem kérünk.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
