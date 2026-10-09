"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Pin } from "./Icons";
import { Img } from "./Photo";

/** Google's map loads only on request (no third-party cookies until the visitor asks for it). */
export function MapEmbed() {
  const [on, setOn] = useState(false);
  return (
    <div className="map-frame" data-reveal>
      {on ? (
        <iframe
          title="A Potykató Pihenőpark a térképen"
          src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=13&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          <Img name="to-legi-3" sizes="(max-width: 860px) 92vw, 560px" alt="A park felülről" focus="62% 72%" />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(40,34,26,.18)" }}>
            <button className="ticket ticket--paper" onClick={() => setOn(true)}>
              <Pin /> Térkép betöltése
            </button>
          </div>
        </>
      )}
    </div>
  );
}
