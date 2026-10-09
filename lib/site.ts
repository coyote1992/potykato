// Every fact on the site comes from here, and every fact here comes from potykato.hu
// (or the owner's own e-mail answers). Change a number once, and it changes everywhere.

export const site = {
  name: "Potykató Pihenőpark",
  company: "Potykató Kft.",
  tagline: "Esküvő- és rendezvényhelyszín a Nyíri erdőben",
  url: "https://potykato.hu",
  phone: "+36 20 802 3403",
  phoneHref: "tel:+36208023403",
  email: "potykato@gmail.com",
  address: { street: "Belsőnyír 203.", zip: "6044", city: "Kecskemét", full: "6044 Kecskemét, Belsőnyír 203." },
  geo: { lat: 46.95287, lng: 19.57195 },
  mapsUrl:
    "https://www.google.com/maps/dir//Potykat%C3%B3+Pihen%C5%91park,+Kecskem%C3%A9t,+Bels%C5%91ny%C3%ADr+203,+6044/@46.9528693,19.5719479,14z",
  hours: { days: "Szombat–vasárnap", time: "7.00–18.00", note: "Látogatás előtt telefonos egyeztetés szükséges." },
  manager: "Kaluja Szilvia",
  managerRole: "cégvezető",
  social: {
    facebook: "https://www.facebook.com/kecskemetipotykato",
    tiktok: "https://www.tiktok.com/@potykato.pihenpark",
  },
  legal: { reg: "03-09-123897", tax: "23773996-2-03" },
} as const;

export const facts = {
  parkHa: 10,
  lakeHa: 1,
  forestHa: 7,
  lakeDepth: "2,5 m",
  fromKecskemet: "15 km",
  pavilions: 2,
  pavilionsTotalGuests: 200,
  mainPavilionGuests: 150,
  cabinBeds: 30,
  vackorBeds: 44,
  vackorDistance: "500 m",
  hubertuszDistance: "500 m",
} as const;

export const nav = [
  { href: "/eskuvo/", label: "Esküvő" },
  { href: "/eskuvo/#rendezvenyek", label: "Rendezvények" },
  { href: "/szallas/", label: "Szállás" },
  { href: "/horgaszat/", label: "Horgászat" },
] as const;

export const navRight = [
  { href: "/galeria/", label: "Galéria" },
  { href: "/arak/", label: "Árak" },
  { href: "/kapcsolat/", label: "Kapcsolat" },
] as const;

export const cabins = [
  { name: "4 ágyas faház fürdőszobával", price: "45 000 Ft", unit: "/ nap" },
  { name: "4 ágyas faház külön fürdővel", price: "40 000 Ft", unit: "/ nap" },
  { name: "3 ágyas faház külön fürdővel", price: "35 000 Ft", unit: "/ nap" },
] as const;

export const dayTickets = [
  { name: "Felnőtt napijegy", price: "5 000 Ft", unit: "/ nap" },
  { name: "Gyermek napijegy (10 éves korig)", price: "2 000 Ft", unit: "/ nap" },
  { name: "Sétálójegy a horgász kísérőjének", price: "1 000 Ft", unit: "" },
] as const;

export const amenities = [
  "2 fedett rendezvénypavilon, együtt kb. 200 fő részére",
  "Eső ellen zárható pavilon 150 vendégnek",
  "Bérelhető faházak 30 fő részére",
  "Felszerelt konyha és szabadtéri főzési lehetőség",
  "Kültéri kemence",
  "Gyorsbüfé",
  "Piknik- és tűzrakóhelyek a tóparton",
  "Sátorozási lehetőség, külön vizesblokkokkal",
  "Horgászat stégekről, minden stéghez fedett kiülő",
  "Focipálya és játszótér",
  "Bankkártya és SZÉP Kártya elfogadóhely",
] as const;

export const reviews = [
  {
    text: "Csodás hely, nekünk pedig emlékezetes!",
    name: "Bodor Imre",
  },
  {
    text: "Szép környezetben, nyugalomban. Igazi felüdülést nyújtó hely, szívesen ajánlom.",
    name: "Stefy Danis",
  },
  {
    text: "Nagyon szépen rendben tartott horgásztó és pihenőpark, rendezvények megtartása is lehetséges, kirándulni, pihenni tökéletes hely.",
    name: "Horváth Edit",
  },
  {
    text: "A vendéglátók minden szavunkat figyelik és megtesznek mindent, hogy jól érezzük magunkat. […] Esküvőknek és céges összejöveteleknek is kiváló helyszín. Mindenkinek ajánlom, aki szereti a természetet.",
    name: "Sárosi Gábor",
  },
  {
    text: "Szuper kis magán pecató! Nagyon szépen ki van építve, összkomfortos kényelem!",
    name: "Vidéki András",
  },
] as const;

export const eventTypes = ["Esküvő", "Családi vagy baráti esemény", "Céges rendezvény", "Szállás / horgászat", "Egyéb"] as const;
