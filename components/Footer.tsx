import Link from "next/link";
import { site } from "@/lib/site";
import { Facebook, Pin, TikTok } from "./Icons";
import { Img } from "./Photo";

export function Footer() {
  return (
    <>
      <div className="locate" aria-label="Elhelyezkedés">
        <div className="wrap">
          <div className="locate__card" data-reveal>
            <a className="locate__map" href={site.mapsUrl} target="_blank" rel="noopener" aria-label="Útvonaltervezés a Google Térképen">
              <Img name="to-legi-3" sizes="(max-width: 1200px) 94vw, 1120px" focus="58% 50%" alt="A Potykató tava felülről, a Nyíri erdő közepén" />
              <span className="locate__pin">
                <span className="ticket ticket--paper ticket--sm">
                  <Pin /> Útvonaltervezés
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="wrap">
          <p className="footer__line">
            {site.company.toUpperCase()} · {site.address.full} · <a href={site.phoneHref}>{site.phone}</a> ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <div className="footer__grid">
            <ul className="footer__links">
              <li>
                <Link href="/eskuvo/">Esküvő és rendezvények</Link>
              </li>
              <li>
                <Link href="/szallas/">Szállás</Link>
              </li>
              <li>
                <Link href="/horgaszat/">Horgászat</Link>
              </li>
              <li>
                <Link href="/arak/">Árak</Link>
              </li>
              <li>
                <Link href="/galeria/">Galéria</Link>
              </li>
              <li>
                <Link href="/kapcsolat/">Kapcsolat</Link>
              </li>
            </ul>
            <div className="footer__center">
              <h2 className="footer__title">Nyitvatartás</h2>
              <p>
                {site.hours.days}, {site.hours.time}
              </p>
              <p style={{ opacity: 0.9, fontSize: 16, marginTop: 6 }}>{site.hours.note}</p>
            </div>
            <div className="footer__right">
              <h2 className="footer__title">Kövessen minket</h2>
              <div className="footer__social">
                <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <Facebook />
                </a>
                <a href={site.social.tiktok} target="_blank" rel="noopener" aria-label="TikTok">
                  <TikTok />
                </a>
              </div>
            </div>
          </div>
          <div className="footer__legal">
            <span>
              © {new Date().getFullYear()} {site.company} · Cégjegyzékszám: {site.legal.reg} · Adószám: {site.legal.tax}
            </span>
            <span>
              <Link href="/adatvedelem/">Adatvédelem</Link> · <Link href="/kapcsolat/#impresszum">Impresszum</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
