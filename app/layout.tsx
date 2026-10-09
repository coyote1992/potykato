import type { Metadata, Viewport } from "next";
import { ActionBar } from "@/components/ActionBar";
import { ArchDefs } from "@/components/Arch";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { SpaceBackground } from "@/components/SpaceBackground";
import { sans, script, serif } from "@/lib/fonts";
import { facts, site } from "@/lib/site";
import "./globals.css";

// Link previews (og.jpg) come from wherever the site is deployed; canonical URLs stay on potykato.hu.
const deployedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : site.url);

export const metadata: Metadata = {
  metadataBase: new URL(deployedUrl),
  title: {
    default: "Potykató Pihenőpark · Esküvő a tóparton, a Nyíri erdőben",
    template: "%s · Potykató Pihenőpark",
  },
  description: `Esküvő- és rendezvényhelyszín Kecskemét–Hetényegyházán: ${facts.parkHa} hektáros park, ${facts.lakeHa} hektáros tó, eső ellen zárható pavilon ${facts.mainPavilionGuests} vendégnek, faházak és horgászat. Családi vállalkozás.`,
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: site.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Szabadtéri esküvői szertartás a Potykató Pihenőparkban" }],
  },
  alternates: { canonical: `${site.url}/` },
};

export const viewport: Viewport = {
  themeColor: "#f2eee4",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EventVenue", "LodgingBusiness"],
  name: site.name,
  description: metadata.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${deployedUrl}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressCountry: "HU",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "07:00", closes: "18:00" },
  ],
  maximumAttendeeCapacity: facts.pavilionsTotalGuests,
  paymentAccepted: "Készpénz, bankkártya, SZÉP Kártya",
  sameAs: [site.social.facebook, site.social.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`no-js ${serif.variable} ${script.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <div className="backdrop" aria-hidden />
        <ArchDefs />
        <SpaceBackground />
        <Header />
        <main id="tartalom">{children}</main>
        <Footer />
        <ActionBar />
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
