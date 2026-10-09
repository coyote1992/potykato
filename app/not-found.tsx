import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero title="Eltévedt?" sub="Ez az oldal nem található" wash="sage" />
      <section className="section section--flush-top" data-tone="cream">
        <div className="wrap center">
          <Link href="/" className="ticket">
            Vissza a főoldalra
          </Link>
        </div>
      </section>
    </>
  );
}
