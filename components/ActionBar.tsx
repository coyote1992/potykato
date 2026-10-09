"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Phone } from "./Icons";

/** Phones: a call button and the inquiry, always one thumb away once the hero is passed. */
export function ActionBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const form = document.getElementById("ajanlatkeres");
      const r = form?.getBoundingClientRect();
      const atForm = r ? r.top < innerHeight * 0.8 && r.bottom > 0 : false;
      setShow(scrollY > innerHeight * 0.55 && !atForm);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`actionbar ${show ? "is-visible" : ""}`} aria-hidden={!show}>
      <a href={site.phoneHref} className="ticket ticket--paper" tabIndex={show ? 0 : -1}>
        <Phone /> Hívás
      </a>
      <a href="#ajanlatkeres" className="ticket" tabIndex={show ? 0 : -1}>
        Ajánlatot kérek
      </a>
    </div>
  );
}
