import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { Inquiry } from "@/components/Inquiry";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Galéria",
  description: "Fotók a Potykató Pihenőparkról: esküvők és dekorációk, a pavilonok és a tóparti terasz, a tó, a faházak és a park mindennapjai.",
  alternates: { canonical: "/galeria/" },
};

export default function Galeria() {
  return (
    <>
      <PageHero title="Galéria" sub="Esküvők, pavilonok, a tó és a park mindennapjai" wash="blush" eyebrow="Potykató Pihenőpark" />
      <section className="section section--flush-top" data-tone="cream" aria-label="Fotók">
        <div className="wrap wrap--wide">
          <Gallery />
        </div>
      </section>
      <Inquiry />
    </>
  );
}
