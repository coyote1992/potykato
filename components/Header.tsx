"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, navRight, site } from "@/lib/site";
import { Close, Menu, Phone } from "./Icons";

const menuLinks = [
  { href: "/", label: "Főoldal", note: "" },
  { href: "/eskuvo/", label: "Esküvő", note: "150 főig" },
  { href: "/eskuvo/#rendezvenyek", label: "Rendezvények", note: "" },
  { href: "/szallas/", label: "Szállás", note: "faházak" },
  { href: "/horgaszat/", label: "Horgászat", note: "napijegy" },
  { href: "/arak/", label: "Árak", note: "" },
  { href: "/galeria/", label: "Galéria", note: "" },
  { href: "/kapcsolat/", label: "Kapcsolat", note: "" },
];

export function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        burger.current?.focus();
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => (href !== "/" && !href.includes("#") && path.startsWith(href) ? "page" : undefined);

  return (
    <>
      <a className="skip" href="#tartalom">
        Ugrás a tartalomra
      </a>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header__inner">
          <nav className="header__nav" aria-label="Fő navigáció">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link" aria-current={isCurrent(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            ref={burger}
            className="icon-btn header__burger"
            aria-label="Menü megnyitása"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>

          <Link href="/" className="header__logo" aria-label="Potykató Pihenőpark – főoldal">
            <img src="/brand/logo-wordmark.png" alt="Potykató Pihenőpark" width={492} height={138} />
          </Link>

          <div className="header__right header__nav--right" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
            <nav className="header__nav header__nav--right" aria-label="További oldalak">
              {navRight.map((l) => (
                <Link key={l.href} href={l.href} className="nav-link" aria-current={isCurrent(l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <a href="#ajanlatkeres" className="ticket ticket--sm header__cta" style={{ marginLeft: 18 }}>
              Ajánlatkérés
            </a>
            <a href={site.phoneHref} className="icon-btn header__phone" aria-label={`Hívás: ${site.phone}`}>
              <Phone />
            </a>
          </div>
        </div>
      </header>

      <div id="menu" className={`menu ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menü" aria-hidden={!open}>
        <div className="menu__top">
          <img src="/brand/logo-wordmark.png" alt="" width={492} height={138} />
          <button ref={closeBtn} className="icon-btn" aria-label="Menü bezárása" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <Close />
          </button>
        </div>
        <ul className="menu__links">
          {menuLinks.map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${0.05 + i * 0.04}s` }} tabIndex={open ? 0 : -1}>
                {l.label}
                {l.note && <small>{l.note}</small>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <a href="#ajanlatkeres" className="ticket" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Ajánlatot kérek
          </a>
          <p>
            <a href={site.phoneHref} tabIndex={open ? 0 : -1}>
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
              {site.email}
            </a>
          </p>
          <p className="note">
            {site.address.full} · Nyitva: {site.hours.days.toLowerCase()} {site.hours.time}
          </p>
        </div>
        <img className="menu__deco" src="/art/reeds.webp" alt="" aria-hidden />
      </div>
    </>
  );
}
