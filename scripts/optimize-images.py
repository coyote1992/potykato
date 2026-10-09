"""Builds the responsive photo set in public/img and the manifest in lib/images.ts.

Source: the original photos of potykato.hu (WordPress media library), downloaded to SRC.
Usage:  python3 scripts/optimize-images.py <SRC>
Every photo gets a gentle shared grade (slightly softer colour and lifted blacks) so the older,
strongly saturated shots sit together with the newer airy ones and the pastel palette.
"""
import json, os, sys
from PIL import Image, ImageEnhance, ImageOps

SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "img")
WIDTHS = [480, 960, 1440]

# key, source file, gallery category (None = not in gallery), alt text
PHOTOS = [
    # --- esküvő
    ("par-steg", "potykato_pihenopark_12.jpg", "eskuvo", "Ifjú pár a tóparti stégen, a háttérben a nádas és az erdő"),
    ("par-asztal", "potykato_pihenopark_10.jpg", "eskuvo", "Menyasszony és vőlegény terített asztalnál a stégen"),
    ("steg-teritek", "potykato_pihenopark_28.jpg", "eskuvo", "Virágokkal díszített asztal a tó vize fölött, a stégen"),
    ("steg-pad", "potykato_pihenopark_13.jpg", "to", "Zöld pad és csónak a stégen, tükörsima víz"),
    ("szertartas-kapu", "potykato_pihenopark_168.jpg", "eskuvo", "Fehér virágkapu a gyepen, mögötte a rendezvénypavilon"),
    ("szertartas-sorok", "potykato_pihenopark_165.jpg", "eskuvo", "Szertartási virágkapu és fehér székek a park gyepén"),
    ("szertartas-sorok-2", "potykato_pihenopark_166.jpg", "eskuvo", "Fehér masnis székek sorai a szabadtéri szertartáshoz"),
    ("szertartas-gyertya", "potykato_pihenopark_171.jpg", "eskuvo", "Gyertyák és fehér rózsák a szertartási asztalon"),
    ("szertartas-virag", "potykato_pihenopark_167.jpg", "eskuvo", "Fehér rózsadísz a szertartási asztalon, mögötte a zöld park"),
    ("szertartas-tav", "potykato_pihenopark_169.jpg", "eskuvo", "Szabadtéri szertartás helyszíne a pavilon előtt"),
    ("szertartas-pavilon", "potykato_pihenopark_164.jpg", "eskuvo", "Virágkapu és székek a pavilon mellett"),
    ("asztal-mrmrs", "potykato_pihenopark_146.jpg", "eskuvo", "Főasztal virágfallal és Mr & Mrs felirattal"),
    ("asztal-kerek", "potykato_pihenopark_147.jpg", "eskuvo", "Terített kerek asztal rózsaszín szalagokkal és virágokkal"),
    ("asztal-reszlet", "potykato_pihenopark_148.jpg", "eskuvo", "Mr & Mrs felirat, gyertyák és fehér rózsák a főasztalon"),
    ("asztal-teritek", "potykato_pihenopark_145.jpg", "eskuvo", "Esküvői teríték pasztell szalagos székekkel"),
    ("asztal-tanyer", "potykato_pihenopark_143.jpg", "eskuvo", "Fehér tányér és evőeszköz közelről"),
    ("asztal-hosszu", "potykato_pihenopark_150.jpg", "eskuvo", "Hosszú, fehérre terített asztal virágdísszel"),
    ("asztal-141", "potykato_pihenopark_141.jpg", "eskuvo", "Virágfal és díszített asztalok a pavilonban"),
    ("asztal-142", "potykato_pihenopark_142.jpg", "eskuvo", "Fehér virágok és terítékek az ünnepi asztalon"),
    ("asztal-144", "potykato_pihenopark_144.jpg", "eskuvo", "Esküvői asztaldísz fehér virágokkal"),
    ("asztal-149", "potykato_pihenopark_149.jpg", "eskuvo", "Virágfal előtt a főasztal"),
    ("gyertyas-asztal", "potykato_pihenopark_34.jpg", "eskuvo", "Gyertyafényes teríték virágcsokorral"),
    # --- tóparti terasz
    ("terasz-1", "potykato_pihenopark_178.jpg", "pavilon", "Fonott székek és díszített asztal a tóparti teraszon"),
    ("terasz-2", "potykato_pihenopark_189.jpg", "pavilon", "Terített asztalok a tóra néző fedett teraszon"),
    ("terasz-3", "potykato_pihenopark_191.jpg", "pavilon", "Fényfüzérek és fonott székek a tóparti teraszon"),
    ("terasz-4", "potykato_pihenopark_187.jpg", "pavilon", "Hosszú asztal fonott székekkel a teraszon"),
    ("terasz-5", "potykato_pihenopark_188.jpg", "pavilon", "Asztalsor kilátással a tóra"),
    ("terasz-6", "potykato_pihenopark_190.jpg", "pavilon", "Fehér függönyök és terített asztal a teraszon"),
    ("terasz-7", "potykato_pihenopark_176.jpg", "pavilon", "Fonott bútorok a tó fölötti teraszon"),
    ("terasz-8", "potykato_pihenopark_179.jpg", "pavilon", "A terasz ablakain át a tó és a fák látszanak"),
    ("terasz-9", "potykato_pihenopark_180.jpg", "pavilon", "Ünnepi asztal virágokkal a teraszon"),
    # --- pavilonok
    ("pavilon-este", "pavilon_1.jpg", "pavilon", "A kivilágított rendezvénypavilon esti fényfüzérekkel"),
    ("pavilon-este-2", "potykato_pihenopark_4.jpg", "pavilon", "Fényfüzérek a pavilon és a fák között alkonyatkor"),
    ("pavilon-alkony", "potykato_pihenopark_61.jpg", "pavilon", "A pavilon és a gyep alkonyatkor, lámpásokkal"),
    ("pavilon-ut", "potykato_pihenopark_62.jpg", "pavilon", "Kivilágított téglaút vezet a pavilonhoz"),
    ("pavilon-nappal", "potykato_pihenopark_124.jpg", "pavilon", "A zárható oldalfalú rendezvénypavilon nappal"),
    ("pavilon-nappal-2", "potykato_pihenopark_170.jpg", "pavilon", "A nyolcszögletű pavilon a park fái között"),
    ("pavilon-belso", "pavilon_8.jpg", "pavilon", "A pavilon fa tetőszerkezete lámpákkal, belülről"),
    ("pavilon-belso-2", "pavilon_3.jpg", "pavilon", "Fonott székek és hosszú asztalok a pavilonban"),
    ("pavilon-belso-3", "pavilon_4-1.jpg", "pavilon", "A pavilon belső tere kilátással a parkra"),
    ("pavilon-este-3", "pavilon_2.jpg", "pavilon", "Esti fények a pavilon körül"),
    ("pavilon-gyep", "pavilon_10.jpg", "pavilon", "A pavilon és a nyírt gyep"),
    ("pavilon-legi", "potykato_pihenopark_27-1.jpg", "to", "Légifotó a pavilonról és a faházakról az erdő közepén"),
    ("gyertyak", "potykato_pihenopark_64.jpg", "pavilon", "Gyertyák farönkökben az esti kertben"),
    ("lugas-este", "pihenopark_21.jpg", "park", "Kivilágított fa lugas esti fényben"),
    ("lugas-alkony", "potykato_pihenopark_63.jpg", "pavilon", "Fa lugas és a pavilon alkonyatkor"),
    ("park-este", "potykato_pihenopark_7.jpg", "park", "Fényfüzérek a park fölött az esti égen"),
    # --- tó
    ("to-legi", "potykato_pihenopark_42.jpg", "to", "A tó és a park légifotón, körülötte az erdő"),
    ("to-legi-2", "potykato_pihenopark_44.jpg", "to", "A kerek tó felülnézetből, a parton a házakkal"),
    ("to-legi-3", "potykato_pihenopark_29-1.jpg", "to", "A tó felülről, az erdő közepén"),
    ("to-legi-4", "potykato_pihenopark_3-1.jpg", "to", "A tó és a fűzfák légifotón"),
    ("to-legi-5", "potykato_pihenopark_36-1.jpg", "to", "A tópart házai és stégjei légifotón"),
    ("to-legi-6", "potykato_pihenopark_5-1.jpg", "to", "Szomorúfűzek a tó partján, felülről"),
    ("to-legi-7", "potykato_pihenopark_105.jpg", "to", "A tó és a tóparti épület a fák között"),
    ("to-legi-8", "potykato_pihenopark_48.jpg", "to", "Az erdő és a tó a magasból"),
    ("to-1", "to_1.jpg", "to", "A tó és a tóparti lugas napsütésben"),
    ("to-3", "to_3.jpg", "to", "A tó tükre kék ég alatt"),
    ("to-4", "to_4.jpg", "to", "Stég a tó partján"),
    ("to-tukor", "potykato_pihenopark_123.jpg", "to", "A tóparti házak tükörképe a vízen"),
    ("to-24", "potykato_pihenopark_24.jpg", "to", "Csendes víztükör, mögötte az erdő"),
    ("to-37", "potykato_pihenopark_37.jpg", "to", "A tó és a parti fák"),
    ("to-fuz", "potykato_pihenopark_185.jpg", "to", "Fűzfaágak mögött a tó és egy faház"),
    ("tohaz", "potykato_pihenopark_162.jpg", "to", "A tóparti épület és terasz a víz fölött"),
    # --- szállás
    ("fahaz-to", "potykato_pihenopark_27.jpg", "fahazak", "Faház a tó partján, tükröződik a vízben"),
    ("fahaz-1", "fahazak_1.jpg", "fahazak", "Fürdőszobás faház fedett terasszal"),
    ("fahaz-terasz", "fahazak_2-1.jpg", "fahazak", "A faház fedett terasza kerti bútorokkal"),
    ("fahaz-konyha", "fahazak_3.jpg", "fahazak", "A faház felszerelt konyhája"),
    ("fahaz-furdo", "fahazak_4.jpg", "fahazak", "Zuhanyzós fürdőszoba a faházban"),
    ("fahaz-halo", "fahazak_5.jpg", "fahazak", "A faház hálószobája"),
    ("fahaz-6", "fahazak_6-1.jpg", "fahazak", "Faház és kemence a parkban"),
    ("fahaz-nadas", "4_agyas_kulon_furdovel-1.jpg", "fahazak", "Négyágyas faház a nádas mellett, a tóparton"),
    ("fahaz-173", "potykato_pihenopark_173.jpg", "fahazak", "Faház a nagy gyep szélén"),
    ("fahaz-hal", "potykato_pihenopark_175.jpg", "fahazak", "Hal alakú tábla a faház falán"),
    ("fahaz-177", "potykato_pihenopark_177.jpg", "fahazak", "Faház virágládákkal"),
    ("fahaz-181", "potykato_pihenopark_181.jpg", "fahazak", "Faház a fák árnyékában"),
    ("fahaz-to-2", "potykato_pihenopark_174.jpg", "fahazak", "Faház a tó túlpartján"),
    # --- horgászat
    ("ponty", "ponty_potykato.jpg", None, "Ponty a víz alatt"),
    ("amur", "amur_potykato.jpg", None, "Amur a víz alatt"),
    ("csuka", "csuka_potykato.jpg", None, "Csuka a víz alatt"),
    ("horgasz-gyerekek", "potykato_pihenopark_15.jpg", "park", "Gyerekek a stégen horgásznak"),
    ("horgasz-botok", "potykato_pihenopark_66.jpg", "to", "Horgászbotok a tó partján"),
    ("horgasz-steg", "potykato_pihenopark_73.jpg", "to", "Horgászstég a tóparton"),
    ("hal-tabla", "potykato_pihenopark_71.jpg", "park", "Hal formájú tábla a tóparton"),
    # --- park, részletek
    ("park-jatszo", "pihenopark_14.jpg", "park", "Játszótér hintákkal a fák alatt"),
    ("park-kemence", "pihenopark_15.jpg", "park", "A kültéri kemence"),
    ("park-lugas", "pihenopark_2.jpg", "park", "Fa lugas a tóparton"),
    ("park-gyep", "pihenopark_5.jpg", "park", "A nagy gyep és a park fái"),
    ("park-jatek", "pihenopark_19.jpg", "park", "Vendégek játszanak a gyepen"),
    ("park-osz", "pihenopark_4.jpg", "park", "Ősz a parkban"),
    ("park-to-haz", "pihenopark_12.jpg", "park", "A tóparti ház és faház"),
    ("park-fahaz-este", "pihenopark_20.jpg", "park", "Kivilágított faház este"),
    ("park-legi", "pihenopark_18.jpg", "park", "A park sportpályái és gyepe felülről"),
    ("park-tel", "pihenopark_1.jpg", "park", "Téli hó a parkban"),
    ("ajto-hal", "potykato_pihenopark_20.jpg", "park", "Faragott kapu hal alakú koszorúval"),
    ("koszoru", "potykato_pihenopark_29.jpg", "park", "Virágkoszorú hal motívummal"),
    ("italok", "potykato_pihenopark_23.jpg", "park", "Rozé és szódásszifon a tóparton"),
    ("muskatli", "potykato_pihenopark_35.jpg", "park", "Piros muskátlik"),
    ("bisztro", "potykato_pihenopark_52.jpg", "park", "A Bisztró terasza fehér székekkel"),
    ("bisztro-2", "potykato_pihenopark_51.jpg", "park", "Teraszbútorok a tó mellett"),
    ("bisztro-3", "potykato_s3.jpg", "park", "A tóparti Bisztró épülete"),
    ("kut", "potyka2.jpg", "park", "Virágos kőkút a pavilon előtt"),
    ("erdo-ut", "potykato_pihenopark_19.jpg", "park", "Erdei út a Nyíri erdőben"),
    # --- múzeum, kápolna
    ("kapolna", "kapolna_1.jpg", "muzeum", "A közeli fakápolna télen"),
    ("kapolna-2", "kapolna_2.jpg", "muzeum", "Faragott oszlop és fa épület a Szent Hubertusz Parkban"),
    ("muzeum", "muzeum2.jpg", "muzeum", "Az 1848–49-es relikviák múzeumának belső tere"),
    # --- család
    ("csalad", "potykato-kaluja-2.jpg", None, "Kaluja Szilvia, a Potykató Pihenőpark cégvezetője"),
]

def grade(im, newer):
    im = ImageEnhance.Color(im).enhance(0.94 if newer else 0.84)
    im = ImageEnhance.Contrast(im).enhance(0.97 if newer else 0.93)
    # lift the blacks a touch: a soft, matte finish
    lut = [int(10 + v * (245 - 10) / 255) for v in range(256)]
    return im.point(lut * 3)

def is_newer(fn):
    try:
        n = int(fn.split("_")[-1].split(".")[0].split("-")[0])
        return fn.startswith("potykato_pihenopark_") and 141 <= n <= 194
    except ValueError:
        return False

manifest = {}
os.makedirs(OUT, exist_ok=True)
for key, fn, cat, alt in PHOTOS:
    im = Image.open(os.path.join(SRC, fn)).convert("RGB")
    im = ImageOps.exif_transpose(im)
    im = grade(im, is_newer(fn))
    W, H = im.size
    widths = [w for w in WIDTHS if w < W] + [min(W, WIDTHS[-1])]
    widths = sorted(set(widths))
    for w in widths:
        r = im if w == W else im.resize((w, round(H * w / W)), Image.LANCZOS)
        r.save(os.path.join(OUT, f"{key}-{w}.webp"), quality=74 if w > 900 else 76, method=6)
    tiny = im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    manifest[key] = {"w": W, "h": H, "widths": widths, "alt": alt, "cat": cat, "color": "#%02x%02x%02x" % tiny}
    print(key, W, H, widths)

ts = "// Generated by scripts/optimize-images.py. Do not edit by hand.\n"
ts += "export type PhotoMeta = { w: number; h: number; widths: number[]; alt: string; cat: string | null; color: string };\n"
ts += "export const photos = " + json.dumps(manifest, ensure_ascii=False, indent=2) + " as const satisfies Record<string, PhotoMeta>;\n"
ts += "export type PhotoKey = keyof typeof photos;\n"
open(os.path.join(ROOT, "lib", "images.ts"), "w", encoding="utf-8").write(ts)
